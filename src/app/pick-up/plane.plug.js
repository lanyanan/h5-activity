// JavaScript Document
(function(){
	var GiftActive = function(elem,options){
		this.takePos = {}; // 接收礼品物的左位移,高度和宽度
		this.readyTime = options.readyTime || 3; // 倒计时准备时间
		this.countTime = options.countTime || 40; // 活动倒计时时间
		this.intervalTime = options.intervalTime || 500; //两个物品的间隔时间
		this.speed = options.speed || 3; // 礼品下降的速度
		this.totalExp = 0; // 总能量值 
		this.giftSt = null; // 掉落奖品的定时器
		
		this.randomNum = options.randomNum || '5~8'; // 随机范围的分数
		this.starList = options.starList || [];
		this.starMultiple = options.starMultiple || 16; // 明星的掉下的位数
		this.starIds = []; // 接到的明星id
		this.receiveStarListId = '#receiveStarList';
		this.starData = []; // 接到的明星信息
	};
	
	GiftActive.prototype = {
		init : function (elem,options){  //初始化数据
			this.takePosition('#takeTray');
			this.moveTakeTray(this,'#takeTray');
			this.createCountTime(elem,this.countTime);
			this.activeReadyDown(elem,this.readyTime,options,this.countTime,this.intervalTime,this.speed);
		},
		createCountTime: function (elem,num){ // 创建倒计时标签
			if($('#activeCountTime').length == 0){
				var tags = '';
				tags += '<div class="downtime" id="activeCountTime"></div>';
				$(elem).before(tags);
			}
		},
		activeCountTime : function(elem,options,countTime){ // 活动到计时时间
			var countTime = countTime;
			var self = this;
			var iText = 0;
			var start_time = Date.parse(new Date())/1000;	
			
			var st = setInterval(function(){
				iText = countTime + start_time - Date.parse(new Date())/1000; 
				if(Math.floor(iText) < 0){
					clearInterval(st); // 清除倒计时 定时器
					clearInterval(self.giftSt); // 清除掉落物品的定时器
					
					var starIds = self.starIds ;
					options.complete(elem,self.starData);
					
					self.takePos = {};
					self.starData = [];
					self.starIds = [];
//					$('#takePlane').css('-webkit-animation','planeMove 3s linear paused');
				}else{
					$('#activeCountTime').html(self.numArr({num:iText})+'<img src="../../../images/app/plane/time-s.png">');
				}
			},1000);
		},
		
		numArr : function (data){
			var data = data || {};
			var num = data.num.toString().split('');
			if(num < 10 && num > 0){
				num.unshift('0')
			}
			var tags = '';
			$.each(num,function(i){
				tags += '<img src="../../../images/app/plane/'+ (data.url || 'time-') + num[i] +'.png">';
			});
			return tags;
		},
		activeReadyDown : function(elem,readyTime,options,countTime,intervalTime,speed){ //倒计时准备时间
			var readyTime = readyTime;
			var tags = '<div id="activeReadyDown" class="dialog-ready">'
					+		'<img id="activeReadyDownImg" class="ready-down" src="../../../images/app/plane/countdown-'+ readyTime +'.png">'
					+		'<img src="../../../images/app/plane/tip.png" class="tip"/>'
					+	'</div>';
			$(elem).after(tags);
			options.readyStart(elem); //准备倒计时开始执行
			
			$('#takeTray').css('left','37%');
			$('#activeCountTime').html(this.numArr({num:this.countTime})+'<img src="../../../images/app/plane/time-s.png">');
			
			var self = this;
			var iText = 0;
			var start_time = Date.parse(new Date())/1000;	
			var st = setInterval(function(){
				iText = readyTime + start_time - Date.parse(new Date())/1000; 
				if(Math.floor(iText) < 0){
					clearInterval(st); // 清除倒计时 定时器
					$('#activeReadyDown').remove();
					self.starActive(elem,options,intervalTime,speed); // 开始游戏 
					self.activeCountTime(elem,options,countTime); // 开始倒计时
				}else{
					$('#activeReadyDownImg').attr('src','../../../images/app/plane/countdown-'+ iText +'.png');
				}
			},1000);
		},
		starActive : function (elem,options,intervalTime,speed){ // 开始活动
			var starList = this.starList;
			var giftArr = this.giftArray(starList); //生成礼物的数组
			var self = this;
			
//			$('#takePlane').css('-webkit-animation','planeMove 3s linear infinite'); // 飞机动画
			
			this.giftSt = setInterval(function(){
				var random = Math.floor(Math.random()*giftArr.length);
//				self.dropGift(elem,options,giftArr[random],speed);
//				giftArr.splice(random,1); // 从数组中删除掉下的项
//				if(giftArr.length == 0) clearInterval(self.giftSt);
				var gLeft = Math.floor(Math.random()*($(document).width() - $('#takePlane').width()));
				
				$('#takePlane').animate({left:gLeft+'px'},200,'linear',function(){
					self.dropGift(elem,options,giftArr[random],speed);
					giftArr.splice(random,1); // 从数组中删除掉下的项
					if(giftArr.length == 0) clearInterval(self.giftSt);
				});
				
			},intervalTime);
		},
		
		giftArray : function (starList){ //生成礼物的数组
			var giftArr = [];
			
			var starList = starList;
			var randomNum = this.randomNum.split('~');
			var starMultiple = this.starMultiple;
			for(var i = 0 , len = starList.length; i < len ; i++){
				var rdm = Math.floor(Math.random() * (Math.floor(randomNum[1]) - Math.floor(randomNum[0]) + 1)) + Math.floor(randomNum[0]);
				var starMultipleRdm = Math.floor(Math.random() * starMultiple);
				for(var m = 0; m < starMultiple; m++){ // integral
					starList[i].integral = (m == starMultipleRdm ? rdm : 1 ); // 积分赋值为1
					giftArr.push(JSON.stringify(starList[i]));
				}
			}
			return giftArr;
		},
		
		takePosition : function(takeTrayId){
			var left = Math.floor($(takeTrayId).offset().left);
			var width = Math.floor($(takeTrayId).width());
			var height = Math.floor(width*289/184);
			var top = Math.floor($(takeTrayId).offset().top);
			
			this.takePos = {
				width : width,
				left : left,
				height : height,
				top : top
			};
		},
		moveTakeTray : function (elem,takeTrayId){
			var initX = 0; 
			var offsetX = 0; // 物品的左距离
			var startX = 0; // 触点离屏幕左边的距离
			var endX = 0;
			var giftX = 0; // 触点离接收物品左边的距离
			var left = 0; // 接收物品的位移
			
			var takePos = this.takePos;
			
			$(takeTrayId).on('touchstart',function(e){
				e.preventDefault();
				e.stopPropagation();
				
				var maxMoveX = Math.floor($(document).width() - $(this).width());	//物体的最大位移
				
				offsetX = $(this).offset().left;
				startX = e.originalEvent.changedTouches[0].clientX;
				giftX = Math.floor(startX - offsetX); 
				
				$(document).on('touchmove',function(ev){
					ev.preventDefault();
					ev.stopPropagation();
					endX = ev.originalEvent.changedTouches[0].clientX;
					left = endX - giftX; 
					if(left <= 0){
						left = 0;
					}else if(left >= maxMoveX){
						left = maxMoveX;
					}
					$(takeTrayId).css({'left':left + 'px'});
					
					takePos.left = $(takeTrayId).offset().left; //移动后重新设置接收礼品物的左位移
				});
				
				$(document).on('touchend',function(ev){
					ev.preventDefault();
					ev.stopPropagation();
					$(this).off('touchmove');
					$(this).off('touchend');
				});
			});
		},
		receiveStarList:function(star){
			var integral = (star.integral<10?'0'+star.integral:star.integral.toString()).split('');
			var tags = '';
			tags += '<li>';
				tags += '<div class="h" style="background:url('+ star.portrait +') no-repeat; background-size:cover;"></div>';
				tags += '<div class="num">';
					tags += '<img src="../../../images/app/plane/star-'+ integral[0] +'.png"/>';
					tags += '<img src="../../../images/app/plane/star-'+ integral[1] +'.png"/>';
				tags += '</div>';
			tags += '</li>';
			return tags;
		},
		dropGift : function(elem,options,gift,speed){ // 礼品掉落
			var gift = JSON.parse(gift);
			var speed = speed;
			var self = this;
			var takePos = this.takePos; //接收物的位置
			var starIds = this.starIds; // 明星id
			
			var starTag = '';
			starTag += '<li data-id="'+ gift.starId +'">';
				starTag += '<img src="'+ gift.portrait +'"/>';
				if(gift.integral != 1){
					starTag += '<span class="n">'+ gift.integral +'</span>';	
				}
			starTag += '</li>';	
			
			$(elem).find('.star-drop').prepend(starTag);
			var giftElem = $(elem).find('.star-drop li:eq(0)'); //掉下物品的对象
			var gHeight = giftElem.height(); // 掉下物品的高度
			var gWidth = giftElem.width(); //掉下物品宽度
//			var gLeft = Math.floor(Math.random()*($(document).width() - gWidth)); //掉下物品的X坐标
			var gLeft = Math.floor((Math.floor($('#takePlane').width()) - gWidth)/2) + Math.floor($('#takePlane').offset().left); //掉下物品的X坐标
			var giftPos = { // 保存新掉下奖品的信息
				left : gLeft,
				width : gWidth,
				height : gHeight
			};
			
			var top = takePos.top - giftPos.height + 20; 
			giftElem.css({'left':gLeft + 'px','top':gHeight+'px'}).animate({'top':top + 'px'},speed * top,'linear',function(){ //物品掉下的动画
				if((giftPos.left + giftPos.width) > takePos.left+15 && (takePos.left+15 + takePos.width-40) > giftPos.left){ //接到明星
					$(this).stop(true);
					$(this).remove();
					
					// 接到的明星是否存在底部列表中
					if(starIds.indexOf(gift.starId) == -1){ // 不存在
						$(self.receiveStarListId).append(self.receiveStarList(gift));
						self.starIds.push(gift.starId);
						self.starData.push(gift);
					}else{
						try{
							var index = starIds.indexOf(gift.starId);
							var totalIntegral = Math.floor(self.starData[index].integral) + Math.floor(gift.integral);
							
							self.starData[index].integral = totalIntegral;
							$(self.receiveStarListId).find('li:eq('+ index +') .num').html(self.numArr({num:totalIntegral,url:'star-'}));
						}catch(e){}
					}
				}else{ //未接到礼物 , 直接掉下去
					top = $(document).height() - top;
					$(this).animate({'top':$(document).height()+'px'},top * speed,'linear',function(){
						$(this).stop(true);
						$(this).remove(); //删除当前未接到的物品
					});
				}
			});
		}
	};
	
	$.fn.pickGiftActive = function(options){
		var options = $.extend({},$.fn.pickGiftActive.defaults,options);
		var giftActive = new GiftActive(this,options);
		var elem = this;
		return this.each(function(){
			giftActive.init(elem,options);
		});
	};
	
	$.fn.pickGiftActive.defaults = {
		complete : function (elem,options){},
		readyStart : function (elem,options){},
	};
})(jQuery);
