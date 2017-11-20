// JavaScript Document
import tools from '../common/tools';
import ajax from '../common/ajax';
import client from '../common/client.interactive';
import '../plane/plane.plug';

Array.prototype.sort = function(fn){
	var fn = fn || function(a, b){ return a > b;};
	for(var i=0; i<this.length; i++){
		for(var j=i; j<this.length; j++){
			if(fn(this[i], this[j]) > 0){
				var t = this[i];
				this[i] = this[j];
				this[j] = t;
			}
		}
	}
	return this;
}; 

var DETAILINFO = {};

function starButtonStatus(data){ // 活动正在进行按钮状态
	var currentTime = (new Date(data.now).format('yyyy-MM-dd'));
	var endTime = (new Date(data.detail.pickup.endTime).format('yyyy-MM-dd'));
	
	var status = ''; // 显示的文字状态
	if(data.playCount < data.detail.commonCount){ // 还能玩游戏
		status = '再来一次';
		DETAILINFO.disabled = false; // false-可以玩,true-不能玩
		DETAILINFO.share = false; // false-不分享, true-分享
	}else if(data.detail.commonCount <= data.playCount && data.playCount < data.detail.commonCount+data.detail.shareCount){ // 没有游戏次数,但分享可玩
		status = '分享给好友奖励一次';
		DETAILINFO.disabled = true;
		DETAILINFO.share = true;
	}else{
		status = (currentTime != endTime ? '明天再玩' : '次数已用完');  // 最后一天显示次数已用完
		DETAILINFO.disabled = true;
		DETAILINFO.share = false;
		$('#start-game-button').css({'background':'url(../../../images/app/plane/over-game.png) no-repeat','background-size':'100% 100%'});
	}
	$('#start-game-button').text(status).show();
}

function initData(){
	var pickupId = tools.getUrlParam('interactId');
	var session = tools.getUrlParam('session')||client.clientGetSession();
	var params = {
		pickupId:pickupId,
		session:session
	};
	$.ajax({
        type: "post",
        url: ajax.drawUrl("/router?method=jz.planet.interact.pickup.detail.info"),
        beforeSend: ajax.beforeAjax,
        dataType: "json",
        data:params,
        success: function(data) {
        	DETAILINFO = data;
        	gameRules(data);
        	shareOut(data);
        	if(DETAILINFO.detail.pickup.isDelete == 1 || DETAILINFO.detail.pickup.status == 0){
        		tools.promptMsg('活动已下线', 'center');
        		setTimeout(function(){
        			history.back();
        		},3000);
        	}
        },
        error: function() {
            tools.promptMsg('系统异常，请稍后再试~', 'center');
        }
    });
}

function gameRules(data){ // 显示游戏规则
	var tags = '';
	tags += '<div class="dialog-rules">';
		tags += '<div class="rules">';
			tags += '<div class="t">游戏规则</div>';
			tags += '<div class="r">'+ (data.detail.pickup.detail).replace(/(\r)?\n/ig,'<br\/>') +'</div>';
		tags += '</div>';
		tags += '<a href="javascript:void(0)" class="star-game-btn" id="star-game-btn">开始游戏</a>';
	tags += '</div>';
	$('.active').after(tags);
	
	$('#star-game-btn').on('click',function(){
		$(this).parents('.dialog-rules').remove();
		
		playcount()
	});
}

function shareOut(data){
	var data = data || {};
	var url = location.origin + location.pathname + '?interactId='+ tools.getUrlParam('interactId') +'&v='+(+new Date());
	var shareData = {
		type:1,
		title:data.detail.interact.title,
		detail:data.detail.interact.detail.replace(/<[^>]+>/ig,'').replace(/\&nbsp\;/ig,'').substring(0,30),
		url:url.replace('active','share'),
		img:data.detail.interact.shareImageUrl,
		nativeShareBtn:1	
	}
	client.clientShareOut(shareData);	
}

function shareOutBtn(data){
	var data = data || {};
	var url = location.origin + location.pathname + '?interactId='+ tools.getUrlParam('interactId') +'&v='+(+new Date());
	var shareData = {
		type:1,
		title:data.detail.interact.title,
		detail:data.detail.interact.detail.replace(/<[^>]+>/ig,'').replace(/\&nbsp\;/ig,'').substring(0,30),
		url:url.replace('active','share'),
		img:data.detail.interact.shareImageUrl
	}
	client.clientShareOut(shareData);	
}

function shareSuccess(platform){
	if(DETAILINFO.detail.commonCount <= DETAILINFO.playCount && DETAILINFO.playCount < DETAILINFO.detail.commonCount+DETAILINFO.detail.shareCount){
		$('#start-game-button').text('开始游戏');
		DETAILINFO.disabled = false;
		DETAILINFO.share = false;
	}
}

function gameResultList(data){
	var data = data || [];
	var tags = '';
	tags += '<div class="dialog-game-result">';
		tags += '<div class="rt">';
			tags += '<div class="t">本轮贡献情况</div>';
			tags += '<div class="r">';
				if(data.length == 0){
					tags += '<div class="no-list">';
					tags += '<img src="../../../images/app/plane/dialog-none.png" class="n-h"/>';
					tags += '<p class="n-f">你也是够了，居然一个也没有接到！</p>';
					tags += '</div>';
				}else{
					if(data.length == 1){
						data[0].num = data[0].integral;
						data[0].integral = data[0].integral * 2;
					}
					tags += '<ul class="list '+ (data.length<3?'list-vm':'') +'" id="gameResultList">';
						data = data.sort(function(a,b){
							return a.integral < b.integral;
						});
						for(var i = 0 , len = data.length; i < len; i++){
							tags += '<li>';
								tags += '<div class="h"><img src="'+ data[i].portrait +'"/></div>';
								tags += '<span class="n">'+ data[i].realName +'</span>';
								
								if(data.length == 1){
									var integral = (data[i].integral < 10 ? '0' + data[i].integral : data[i].integral.toString()).split('');
									tags += '<span class="num-two">';
										tags += '<img src="../../../images/app/plane/star-'+ integral[0] +'.png"/>';
										tags += '<img src="../../../images/app/plane/star-'+ integral[1] +'.png"/>';
									tags += '</span>';
									
									var num = (data[i].num < 10 ? '0' + data[i].num : data[i].num.toString()).split('');
									tags += '<span class="num">';
										tags += '<img src="../../../images/app/plane/star-'+ num[0] +'.png"/>';
										tags += '<img src="../../../images/app/plane/star-'+ num[1] +'.png"/>';
									tags += '</span>';
								}else{
									var integral = (data[i].integral < 10 ? '0' + data[i].integral : data[i].integral.toString()).split('');
									tags += '<span class="num">';
										tags += '<img src="../../../images/app/plane/star-'+ integral[0] +'.png"/>';
										tags += '<img src="../../../images/app/plane/star-'+ integral[1] +'.png"/>';
									tags += '</span>';
								}
								
							tags += '</li>';
						}
					tags += '</ul>';
					if(data.length == 1){
						tags += '<p class="n-ff">恭喜你，只接了一个爱豆，数量X2</p>';
					}
				}
				tags += '<a href="javascript:void(0)" class="start-game-button" id="start-game-button"></a>';
				tags += '<div class="btn">';
					tags += '<a href="javascript:void(0)" class="back" onclick="history.back()">返回</a>';
					var url = 'rank.html?interactId='+ tools.getUrlParam('interactId') +'&v='+(+new Date());
					tags += '<a href="javascript:void(0)" class="rank" onclick="location.replace(\''+ url +'\')">查看实时榜单</a>';
				tags += '</div>';
			tags += '</div>';
		tags += '</div>';
	tags += '</div>';
	$('.active').after(tags);
	starButtonStatus(DETAILINFO);
	
	//为1的动画
	if(data.length == 1){
		var durTime = 150;
		setTimeout(function(){
			$('#gameResultList').find('.num-two').css('display','-webkit-box');
			
			$('#gameResultList').find('.num img:eq(0)').animate({'top':'5px','opacity':'0'},durTime,'linear',function(){
				$('#gameResultList').find('.num-two img:eq(0)').animate({'top':'12px','opacity':'1'},durTime,'linear');
			});
			setTimeout(function(){
				$('#gameResultList').find('.num img:eq(1)').animate({'top':'5px','opacity':'0'},durTime,'linear',function(){
					$('#gameResultList').find('.num-two img:eq(1)').animate({'top':'12px','opacity':'1'},durTime,'linear');
				});
			},durTime);
		},800);
	}
	
	$('#start-game-button').on('click',function(){
		if(DETAILINFO.detail.pickup.isDelete == 1 || DETAILINFO.detail.pickup.status == 0){
			return;
		}
		
		if(DETAILINFO.disabled == false){ // 可以玩
			$(this).parents('.dialog-game-result').remove();
			$('#receiveStarList').html(''); // 明星列表清空
			playcount();
		}else{
			if(DETAILINFO.share == true){ // 分享
				shareOutBtn(DETAILINFO);
			}
		}
	});
}

function playcount(){
	var pickupId = tools.getUrlParam('interactId');
	var session = tools.getUrlParam('session')||client.clientGetSession();
	var params = {
		pickupId:pickupId,
		session:session
	};
	$.ajax({
        type: "post",
        url: ajax.drawUrl("/router?method=jz.planet.interact.pickup.add.user.today.playcount"),
        beforeSend: ajax.beforeAjax,
        dataType: "json",
        data:params,
        success: function(dt) {
        	if(dt == 1){
        		DETAILINFO.playCount += 1; // 游戏次数加1
        		starGame(DETAILINFO);
        	}else{
        		tools.promptMsg('系统异常，请稍后再试~', 'center');
        	}
        },
        error: function() {
            tools.promptMsg('系统异常，请稍后再试~', 'center');
        }
    });
}

function starGame(data){
	$('#active-plane').pickGiftActive({
		starList:data.detail.starList,
		randomNum:data.detail.randonPoint,
		complete : function(elem,data){
			var promptData = {
				status:1,
				msg:'游戏进行中，离开当前页面，将失去本次机会'
			};
			client.clientBackPrompt(promptData);
			
			var pickupId = tools.getUrlParam('interactId');
			var session = tools.getUrlParam('session')||client.clientGetSession();
			var receiveStar = [];
			
			if(data.length == 0){
				gameResultList(data);
			}else{
				var len = data.length;
				$.each(data,function(i){
					receiveStar.push(data[i].starId + '-' + (len == 1 ? data[i].integral*2:data[i].integral));
				});
				var params = {
						pickupId:pickupId,
						session:session,
						starPoints:receiveStar.join(',')
				};
				$.ajax({
					type: "post",
					url: ajax.drawUrl("/router?method=jz.planet.interact.pickup.user.post.points"),
					beforeSend: ajax.beforeAjax,
					dataType: "json",
					data:params,
					success: function(dt) {
						if(dt == 1){ // 数据提交成功
							gameResultList(data);
						}else{
							tools.promptMsg('系统异常，请稍后再试~', 'center');
						}
					},
					error: function() {
						tools.promptMsg('系统异常，请稍后再试~', 'center');
					}
				});
			}
		},
		readyStart:function(elem,options){
			var promptData = {
				status:0,
				msg:'游戏进行中，离开当前页面，将失去本次机会'
			};
			client.clientBackPrompt(promptData);
		}
	});
}

window.shareSuccess = shareSuccess;
initData();