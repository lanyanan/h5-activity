/*
 *  date format
 */
Date.prototype.format = function(f){ //date_format
    var o ={
        "M+" : this.getMonth()+1, //month
        "d+" : this.getDate(),    //day
        "h+" : this.getHours(),   //hour
        "m+" : this.getMinutes(), //minute
        "s+" : this.getSeconds(), //second
        "q+" : Math.floor((this.getMonth()+3)/3),  //quarter
        "S" : this.getMilliseconds() //millisecond
    }
    if(/(y+)/.test(f))f=f.replace(RegExp.$1,(this.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(var k in o)
        if(new RegExp("("+ k +")").test(f))f = f.replace(RegExp.$1,RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));return f
}

/*
 * 获取cookie
 */
function getCookie(name){ 
	var arr,reg=new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	if(arr=document.cookie.match(reg))
	return unescape(arr[2]);
	else return null;
}

/*
 * 设置cookie
 */
function setCookie(name,value){
	var Days = 30;
	var exp = new Date();
	exp.setTime(exp.getTime() + Days*24*60*60*1000);
	document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}

function uuid() {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";
 
    var uuid = s.join("");
    return uuid;
}

/*  表情替换     */
String.prototype.expression = function(lagerIcon,path){
	var lagerIcon = lagerIcon || 3; //0-小图标不替换,1-中图标不替换,2-大图标不替换 ,默认不替换
	var path = path || '/h5/common/images/emoji/';
	var emoArr = {
		emo:['expression','emoji','yaya'],
		w:[20,20,100]
	};
	var icons = {
		'[呵呵]' : 'expression_01_45.png', '[愁]' : 'expression_02_45.png', '[花心]' : 'expression_03_45.png', 
		'[思考]' : 'expression_04_45.png', '[酷]' : 'expression_05_45.png', '[大哭]' : 'expression_06_45.png', 
		'[卖萌]' : 'expression_07_45.png', '[闭嘴]' : 'expression_08_45.png', '[睡觉]' : 'expression_09_45.png', 
		'[快哭了]' : 'expression_10_45.png', '[尴尬]' : 'expression_11_45.png', '[怒]' : 'expression_12_45.png', 
		'[挤眼]' : 'expression_13_45.png', '[呲牙大笑]' : 'expression_14_45.png', '[惊讶]' : 'expression_15_45.png', 
		'[挥泪]' : 'expression_16_45.png', '[爱你]' : 'expression_17_45.png', '[加我]' : 'expression_18_45.png', 
		'[抓狂]' : 'expression_19_45.png', '[吐]' : 'expression_20_45.png', '[偷笑]' : 'expression_21_45.png', 
		'[微笑]' : 'expression_22_45.png', '[没看见]' : 'expression_23_45.png', '[懒得理你]' : 'expression_24_45.png', 
		'[馋嘴]' : 'expression_25_45.png', '[困]' : 'expression_26_45.png', '[惊恐]' : 'expression_27_45.png', 
		'[汗]' : 'expression_28_45.png', '[哈哈]' : 'expression_29_45.png', '[加油]' : 'expression_30_45.png', 
		'[奋斗]' : 'expression_31_45.png', '[怒骂]' : 'expression_32_45.png', '[疑问]' : 'expression_33_45.png', 
		'[嘘]' : 'expression_34_45.png', '[晕]' : 'expression_35_45.png', '[哼]' : 'expression_36_45.png', 
		'[哀]' : 'expression_37_45.png', '[奥特曼]' : 'expression_38_45.png', '[敲打]' : 'expression_39_45.png', 
		'[拜拜]' : 'expression_40_45.png', '[太开心]' : 'expression_41_45.png', '[挖鼻屎]' : 'expression_42_45.png', 
		'[鼓掌]' : 'expression_43_45.png', '[生病]' : 'expression_44_45.png', '[坏笑]' : 'expression_45_45.png', 
		'[左哼哼]' : 'expression_46_45.png', '[捂脸]' : 'expression_47_45.png', '[压历大]' : 'expression_48_45.png', 
		'[鄙视]' : 'expression_49_45.png', '[委屈]' : 'expression_50_45.png', '[钱]' : 'expression_51_45.png', 
		'[阴险]' : 'expression_52_45.png', '[亲亲]' : 'expression_53_45.png', '[黑线]' : 'expression_54_45.png', 
		'[可怜]' : 'expression_55_45.png',  '[菜刀]' : 'expression_56_45.png', '[鸡蛋]' : 'expression_57_45.png',  
		'[草泥马]' : 'expression_58_45.png', '[浮云]' : 'expression_59_45.png', '[给力]' : 'expression_60_45.png', 
		'[沙发]' : 'expression_61_45.png', '[兵]' : 'expression_62_45.png', '[猪头]' : 'expression_63_45.png', 
		'[玫瑰花]' : 'expression_64_45.png', '[凋谢]' : 'expression_65_45.png', '[香吻]' : 'expression_66_45.png', 
		'[心]' : 'expression_67_45.png', '[伤心]' : 'expression_68_45.png', '[蛋糕]' : 'expression_69_45.png', 
		'[药丸]' : 'expression_70_45.png', '[炸弹]' : 'expression_71_45.png', '[高跟鞋]' : 'expression_72_45.png', 
		'[熊猫]' : 'expression_73_45.png', '[兔子]' : 'expression_74_45.png', '[太阳]' : 'expression_75_45.png', 
		'[晚安]' : 'expression_76_45.png', '[蜡烛]' : 'expression_77_45.png', '[礼物]' : 'expression_78_45.png', 
		'[发财]' : 'expression_79_45.png', '[good]' : 'expression_80_45.png', '[弱]' : 'expression_81_45.png', 
		'[握手]' : 'expression_82_45.png', '[耶]' : 'expression_83_45.png', '[抱拳]' : 'expression_84_45.png', 
		'[来]' : 'expression_85_45.png', '[靠]' : 'expression_86_45.png', '[不要]' : 'expression_87_45.png', 
		'[OK]' : 'expression_88_45.png', '[德州]' : 'expression_89_45.png', '[吉他]' : 'expression_90_45.png', 
		'[话筒]' : 'expression_91_45.png', '[钟]' : 'expression_92_45.png', '[台球]' : 'expression_93_45.png', 
		'[足球]' : 'expression_94_45.png', '[篮球]' : 'expression_95_45.png', '[乒乓球]' : 'expression_96_45.png',
		
		'[笑]' : 'emoji_01.png', '[眯眼笑]' : 'emoji_02.png', '[花痴]' : 'emoji_03.png',
		'[吐舌头]' : 'emoji_04.png', '[大笑]' : 'emoji_05.png', '[耍酷墨镜]' : 'emoji_06.png',
		'[哭]' : 'emoji_07.png', '[拍手]' : 'emoji_08.png', '[吓]' : 'emoji_09.png',
		'[幻想]' : 'emoji_10.png', '[么么]' : 'emoji_11.png', '[自信]' : 'emoji_12.png',
		'[抠鼻]' : 'emoji_13.png', '[睡觉啦]' : 'emoji_14.png', '[生气]' : 'emoji_15.png',
		'[好委屈]' : 'emoji_16.png', '[恶魔]' : 'emoji_17.png', '[天使]' : 'emoji_18.png',
		'[真爱粉气球]' : 'emoji_19.png', '[花]' : 'emoji_20.png', '[我爱你]' : 'emoji_21.png',
		'[OK啦]' : 'emoji_22.png', '[赞]' : 'emoji_23.png', '[噢耶]' : 'emoji_24.png',
		
		'[真爱粉-表情]' : 'yaya_1_key.png', '[送花-表情]' : 'yaya_2_key.png', '[么么哒-表情]' : 'yaya_3_key.png',
		'[走你-表情]' : 'yaya_4_key.png', '[激动大哭-表情]' : 'yaya_5_key.png', '[花痴脸-表情]' : 'yaya_6_key.png',
		'[哼-表情]' : 'yaya_7_key.png', '[爱心-表情]' : 'yaya_8_key.png', '[害羞-表情]' : 'yaya_9_key.png',
		'[好多钱-表情]' : 'yaya_10_key.png', '[感动-表情]' : 'yaya_11_key.png', '[哦-表情]' : 'yaya_12_key.png',
		'[捧腹大笑-表情]' : 'yaya_13_key.png', '[睡觉-表情]' : 'yaya_14_key.png', '[吓-表情]' : 'yaya_15_key.png',
		'[生气-表情]' : 'yaya_16_key.png'
	};
	
	return this.replace(/(\[[\w\-\u4e00-\u9fa5a]+\])/g,function(val){
		var em = icons[val];
		
		for(var i = 0, len = emoArr.emo.length; i < len; i++){
			if(em && em.indexOf(emoArr.emo[i]) != -1) {
				if(i == lagerIcon) return val;
				return '<img class="expression" src="'+path+icons[val]+'" width="'+ emoArr.w[i] +'" style="'+(i==2?'display:block;':'')+' width:'+ emoArr.w[i] +'px;">';	
			}
		}
	});	
};

/*
 * 只有在webview或者网页版的情况下有用
 * 提示信息显示下屏幕下方  
 * msg 提示文字     ,  
 * prompt 提示框对象     ,
 * position显示的位置   值为center显示在中间,值为bottom显示在底部
 * delay默认为2s
 */

function promptMsg(msg,position,flag){
	var flag = flag || 'true';
	var prompt_st = null;
	if(flag == 'true'){
		clearTimeout(prompt_st);
		$('#promptMsg').remove();
	}else{
		if($('#promptMsg').length) return;
	}
	var tags = '<div id="promptMsg"></div>';
	$('body').append(tags);
	var prompt = $('#promptMsg');
	var obj = arguments[3] || {};
	
	var w_width = window.innerWidth || document.documentElement.clientWidth,
		screen_height = window.innerHeight || document.body.clientHeight,
		prompt = prompt;
	prompt.css({
		'position':'fixed',
		'padding':'8px 20px',
		'max-width':'60%',
		'display':'none',
		'z-index':obj.zIndex || '5000',
		'opacity':'0',
		'background':obj.background || '#000',
		'background-size':obj.backgroundSize || '100% 100%',
		'color':obj.color || '#fff',
		'font-size':'14px',
		'line-height':obj.lineHeight || '18px',
		'border-radius':'8px',
		'background-repeat':'no-repeat'
	});
	
	var prompt_top = 0;
	switch(position){
	case 'center':
		prompt_top = (screen_height-prompt.outerHeight())/2;
		break;
	case 'bottom':
		prompt_top = (screen_height - prompt.outerHeight() - 60);
		break;
	default:
		break;
	}
	
	prompt.html(msg).css({'top':prompt_top + 'px' ,'left':(w_width - prompt.innerWidth()) / 2 + 'px'}).show().animate({
		opacity:'0.8'
	},500);
	prompt_st = setTimeout(function(){
		prompt.animate({opacity:'0'},500,function(){
			$(this).remove();
			clearTimeout(prompt_st);
		});
	},obj.delay || 3000);
}

/*
 * 评论时间格式转换
 */
function publishTime(createTime,currentTime){
	var createTime = isNaN(Number(createTime)) ? (new Date(createTime).getTime()) : Number(createTime),
		currentTime = isNaN(Number(currentTime)) ? (new Date(currentTime).getTime()) : Number(currentTime),
		createYear = new Date(createTime).getFullYear(),//发布的年份
		currentYear = new Date(currentTime).getFullYear(),//当前的年份
		timeSpan = currentTime - createTime,
		s = parseInt(timeSpan / 1000),
		h = parseInt(s / (60 * 60)),
		m = parseInt(s / 60);
		
	if(m < 60){
		if(m == 59){
			return 1 + '小时前';
		}else{
			return m + 1 + '分钟前';
		}
	}else if(h < 24){
		return h + 1 + '小时前';
	}else if(currentYear == createYear){
		return new Date(createTime).format("MM-dd hh:mm");	
	}else{
		return new Date(createTime).format("yyyy-MM-dd hh:mm");	
	}
}

/* 牙牙关注分享下载条  */
function yayaDownload(){
	//style:deepRed,white,black
	var obj = arguments[0] || {} , css = {} , style = obj.style || 'white', tags = '';
	if(style === 'deepRed'){
		css.background = 'rgba(51,27,30,1)';
		css.borderColor = '#331b1e';
		css.color = '#fff';
	}else if(style === 'black'){
		css.background = 'rgba(0,0,0,.7)';
		css.borderColor = 'transparent';
		css.color = '#fff';
	}
	tags += '<div style=" width:100%; position:fixed; left:0; bottom:0; z-index:99; ">'
		 
		 +	'<div style="display:box; display:-webkit-box; -webkit-box-align:center; -webkit-box-pack:center; padding:10px;' 
		 +		'box-sizing:border-box; font-size:14px;  background:'+(css.background||'#fff')+'; width:100%; max-width:500px; margin:0 auto;'
		 +		'border-top:1px solid '+(css.borderColor||'#fff')+';">'
		 +		'<div><img src="../../../images/app/common/icon_logo.png" width="36" height="36"></div>'
		 +		'<div style="display:block; -webkit-box-flex:1; margin:0 10px; color:'+(css.color||'#333')+'">'
		 +			'<div>' + (obj.title  || '下载牙牙关注APP') + '</div>'
		 +			'<div style="margin-top:2px;">' + (obj.slogan || '')+ '</div>'
		 +		'</div>'
		 +		'<a href="javascript:yayaDownLoadHref();" style="display:block; width:86px; height:36px; line-height:36px; color:#fff; '
		 +		'background:#E73850;border-radius:36px; text-align:center;">' + (obj.btnText || '马上下载') + '</a>'
		 +	'</div>';
		 +	'</div>';
	var addDiv = (obj.addDiv || 'Y') == 'Y' ? '<div style="height: 60px;"></div>' : '';
	$('body').append(addDiv).append(tags);
}

/* 到计时  */
(function($){
	var CountDown = function(element,options){
		this.timeLength = options.timeLength || 4;	
		this.element = element;
		this.sTime = null;
		this.currentTime = options.currentTime || '';
		this.startTime = options.startTime || '';
		this.endTime = options.endTime || '';
		this.format = options.format || 'dd天hh:mm:ss';
		this.delDay = options.delDay || false; // 天数为0时,是否不显示出来,true不显示,false显示 
	};
	
	CountDown.prototype = {
		init:function(element,options){
			this.activeStatus(element,this.currentTime,this.startTime,this.endTime,options,this.format);	
		},
		tags:function(arrTime,timeLength,format){
			
			var format = format.replace(/\w/g,'').split('');
			
			if(this.delDay && arrTime[0] === '00'){
				arrTime.shift();
				format.shift();	
			}
			
			var tags = '';
			for(var i = 0 , len = arrTime.length; i < len ; i++){ 
				tags += '<span class="numberTime vm">'+ arrTime[i] +'</span>';
				if(i != len - 1){
					tags += '<span class="vm">'+ format[i] +'</span>';		
				}
			}
			
			return tags;	
		},
		activeStatus:function(element,current,start,end,options,format){
			
			var current = current.replace(/-/g,'/'),
				start = start.replace(/-/g,'/'),
				end = end.replace(/-/g,'/'),
				format = format;
			
			var currentTime = Date.parse(new Date(current)),
				startTime = Date.parse(new Date(start)),
				endTime = Date.parse(new Date(end)),
				self = this,
				timeSpan = 0,
				iText = 0,
				activeFlag = true,
				start_time = Date.parse(new Date()) ;
			
			if(endTime >= currentTime){
				if(startTime >= currentTime){ //活动未开始
					timeSpan = startTime - currentTime;
					activeFlag = false;
					options.activeStart(element,this.sTime); //开始前	
				}else if(currentTime > startTime && endTime >= currentTime){ //活动正在进行
					timeSpan = endTime - currentTime;
					options.activeCurrent(element,this.sTime); //正在进行
				}
				
				var arrTime = this.dateFormat(timeSpan);
				var tags = this.tags(arrTime,this.timeLength,format);
				this.element.html(tags);
				this.sTime = setInterval(function(){
					iText = timeSpan + start_time - Date.parse(new Date());	
					
					arrTime = self.dateFormat(iText);
					tags = self.tags(arrTime,self.timeLength,format);
					self.element.html(tags);
					
					if(iText <= 0 && !activeFlag){
						activeFlag = true;
						timeSpan = endTime - currentTime + 1000;
						iText = timeSpan + start_time - Date.parse(new Date());	
						options.activeCurrent(element,self.sTime); // 正在进行	
					}else if(iText <= 0 && activeFlag){
						clearInterval(self.sTime);
						options.activeFinish(element,self.sTime); //结束	
					}
				},1000);
			}else{ //活动已结束
				tags = this.tags(['00'],this.timeLength,format);
				this.element.html(tags);
				options.activeFinish(element,this.sTime); //结束
			}
		},
		dateFormat : function(timeSpan){
			var totals = timeSpan / 1000,
				d = parseInt(totals / (24 * 3600)),
				h = parseInt((totals - d * 24 * 3600) / 3600),
				m = parseInt((totals - d * 24 * 3600 - h * 3600) / 60),
				s = totals - d * 24 * 3600 - h * 3600 - m * 60;
			
			d = (d >= 10) ? d : '0' + d;
			h = (h >= 10) ? h : '0' + h;
			m = (m >= 10) ? m : '0' + m;
			s = (s >= 10) ? s : '0' + s;
			
			return (d + ':' + h + ':' + m + ':' + s).split(':');
		}
	};
	
	$.fn.timeCountDown = function(options){
		var option = new CountDown(this,$.extend({},$.fn.timeCountDown.defaults,options));
		var self = this;
		return this.each(function(){
			option.init(self,$.extend({},$.fn.timeCountDown.defaults,options));	
		});
	}
	$.fn.timeCountDown.defaults = {
		activeStart : function(){},
		activeCurrent : function(){},
		activeFinish : function(){}
	};	
})($);


/*
 * 到计时获取验证码
 * element
 * data{
 * url:请求地址
 * time:倒计时秒数
 * disabled_btn:按钮禁用样式
 * codeText:初始按钮文字
 * mobile:'#mobile'
 * session:'#session'
 * }
 */
function getVerificationCode(element,data){
	if(!$(data.mobile).valid()) return;
	var url = data.url || '',
		time = data.time || 60,
		disabled_btn = data.disabled_btn || 'disabled_btn',
		codeText = data.codeText || '获取验证码',
		params = {
			mobile:$(data.mobile).val() || '',
			session:$(data.session).val() || ''	
		}; 	 
	var codeTime = '',
		iText = 0,
		start_time = Date.parse(new Date())/1000;	
	$(element).val(time + '秒后重新获取').addClass(disabled_btn).attr('disabled','disabled');	
	
	codeTime = setInterval(function(){
		iText = time + start_time - Date.parse(new Date())/1000; 
		
		if(parseInt(iText) <= 0){
			clearInterval(codeTime);
			codeTime = null;
			$(element).removeAttr('disabled').removeClass(disabled_btn).val(codeText);	
		}else{
			$(element).val(iText + '秒后重新获取');
		}
	},1000);
	try{
		$.post(url,params,function(result){
			if(result.code != 100) {
				promptMsg(result.message,'center');
				clearInterval(codeTime);
				codeTime = null;
				$(element).removeAttr('disabled').removeClass(disabled_btn).val(codeText); 
			}
		},'json');		
	}catch(e){
		promptMsg('网络异常','center');
		clearInterval(codeTime);
		codeTime = null;
		$(element).removeAttr('disabled').removeClass(disabled_btn).val(codeText); 		
	}
	
	//改变mobile清除定时器
	$(data.mobile).on('input',function(){
		clearInterval(codeTime);
		codeTime = null;
		$(element).removeAttr('disabled').removeClass(disabled_btn).val(codeText);	
		$(data.mobile).off('input');
	});
}

/*
 * 判断移动手机操作系统
 */
function detectPlatform(){
	var system = '';
	var browser = {
		versions: function() {
			var u = navigator.userAgent, app = navigator.appVersion;
			return {
				trident: u.indexOf('Trident') > -1, 
				presto: u.indexOf('Presto') > -1, 
				webKit: u.indexOf('AppleWebKit') > -1, 
				gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,
				mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), 
				ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), 
				android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, 
				iPhone: u.indexOf('iPhone') > -1 , 
				mac: u.indexOf('Mac') > -1, 
				iPad: u.indexOf('iPad') > -1, 
				webApp: u.indexOf('Safari') == -1 ,
				wx: u.indexOf('MicroMessenger') > -1 ,
				wb: u.indexOf('Weibo') > -1 
			};
		}(),
		language: (navigator.browserLanguage || navigator.language).toLowerCase()
	};
	if (browser.versions.ios || browser.versions.iPhone || browser.versions.iPad) { // ios执行的方法
		system = 'ios';
	} else if (browser.versions.android) { // android执行的方法
		system = 'android';
	}else {
		system = 'pc';
	}
	return system;
}


/*滑动删除*/
(function($){
	var SlideClass = function(element,options){
		this.element = element;
		this.max_margin_left = options.max_margin_left || 60;
		this.delay = options.delay || 100;	
		this.mask = options.mask || 'deleteMask';
		this.button = options.button || 'deleteButton';
	};
	
	SlideClass.prototype = {
		init:function(element,options){
			var $_this = this;
			this.touhstartEvent($(element));
			//删除遮罩层
			$('body').on('touchstart','#'+$_this.mask,function(ev){
				ev.preventDefault();
				ev.stopPropagation();
				$_this.removeMask($_this.element,$(this));
			});
		},
		createTags:function(){
			var cssText = 'position:absolute; width:'+ this.max_margin_left +'px; height:100%;'
			+				'text-align:center; background:#e73850; font-size:16px; line-height:40px; top:0;'
			+				'right:-'+ this.max_margin_left +'px; color:#fff; z-index:999;'
			+				'display:-webkit-box !important; -webkit-box-align:center; -webkit-box-pack:center;';
			return '<span class="'+this.button+'" style="'+ cssText +'">删除</span>';	
		},	
		createMask:function(){
			return '<div id="'+ this.mask +'" style="position:fixed; background:rgba(0,0,0,0); top:0; left:0; width:100%; height:100%; "></div>';	
		},
		touhstartEvent:function(element){
			var $_this = this;
			$(element).on('touchstart','li',function(evt){
				var max_margin_left = $_this.max_margin_left;
				var start_x = evt.originalEvent.changedTouches[0].clientX;
				var start_y = evt.originalEvent.changedTouches[0].clientY;
				var delay = $_this.delay;
				var scrollFlag = true;
				var length = 0;
				if(!scrollFlag) return;
				$(this).on('touchmove',function(ev){
					var end_x = ev.originalEvent.changedTouches[0].clientX;
					var end_y = ev.originalEvent.changedTouches[0].clientY;
					var m_left = parseInt($(element).css('margin-left'));
					
					length = $(element).find('.'+$_this.button).length;
					
					if(Math.abs(start_y - end_y) > Math.abs(start_x - end_x)){
						scrollFlag = false;
					}else{
						ev.preventDefault();
						scrollFlag = false;
						if(length == 0){
							$(this).append($_this.createTags());
						}
						
						if(end_x < start_x){ //左滑
							if(start_x - end_x >= max_margin_left && length && !scrollFlag){
								$(this).css('margin-left',-max_margin_left+'px');
							}else{
								$(this).css('margin-left',end_x-start_x+'px');	
							}	
						}else{//右滑
							if(m_left < 0){
								$(this).css('margin-left',end_x-start_x+m_left+'px');	
							}else{
								$(this).css('margin-left','0px');
							}	
						}
					}
				});
				
				$(this).on('touchend',function(ev){
					var end_x = ev.originalEvent.changedTouches[0].clientX;
					if(start_x - end_x > 30 && !scrollFlag && length){
						$(this).animate({'margin-left':-$_this.max_margin_left+'px'},delay);	
						$(element).after($_this.createMask());
					}else{
						$(this).animate({'margin-left':'0px'},delay,function(){
							$(element).find('.'+$_this.button).remove();	
						});	
					}
					$(this).off('touchmove');
					$(this).off('touchend');
				});	
			});
		},
		removeMask:function(element,mask){//element is id
			if(typeof mask != 'object') mask = $('#'+mask);
			var $_this = this;
			setTimeout(function(){
				$(mask).remove();
			},500);
			$(element).children().animate({'margin-left':'0px'},this.delay,function(){
				$(element).find('.'+$_this.button).remove();
			});	
		}
	};
	
	$.fn.sliDelete = function(options){
		var opts = new SlideClass(this,$.extend({},$.fn.sliDelete.defaults,options));
		var $_this = this;
		return this.each(function(){
			opts.init($_this,$.extend({},$.fn.sliDelete.defaults,options));	
			
			$($_this).on('touchstart','.'+opts.button,function(ev){
				ev.preventDefault();
				ev.stopPropagation();
				options.delData($(this),opts);
			});
		});	
	};	
	$.fn.sliDelete.defaults = {
		delData:function(element,slide){}	
	};
})($);

/*删除提示框*/
(function($){
	var ConfirmRe = function(options){
		this.msg = options.msg || '确定要删除吗?';
		this.cancleText = options.cancleText || '取消';
		this.confirmText = options.confirmText || '确定';
		this.cancleButton = options.cancleButton || 'cancleButton';
		this.confirmButton = options.confirmButton || 'confirmButton';
		this.promitMsgLayerList = options.promitMsgLayerList || 'promitMsgLayerList';
	};
	ConfirmRe.prototype = {
		init:function(options){
			var $_this = this;
			$('body').append(this.createTags(options));
			$('.'+this.confirmButton).on('touchstart',function(ev){
				ev.preventDefault();
				$('#'+$_this.promitMsgLayerList).remove();
				options.confirm();
			});
			$('.'+this.cancleButton).on('touchstart',function(ev){
				ev.preventDefault();
				$('#'+$_this.promitMsgLayerList).remove();
				options.cancle();
			});
		},
		createTags:function(options){
			var promitCss = 'width:100%; height:100%; left:0; top:0; background:rgba(0,0,0,0.4); position:fixed;z-index:9999;display:-webkit-box !important; -webkit-box-align:center; -webkit-box-pack:center;';
			var promitListCss = 'width:80%; background:#f3f3f3; padding:15px; box-sizing:border-box; border-radius:10px;';
			var buttonCss = 'color:#fff; border-radius:5px; text-align:center; font-size:18px; line-height:40px; height:40px;';
			
			var tags = '<div id="'+ this.promitMsgLayerList +'" class="promitMsgLayerList" style="'+ promitCss +'">'
			+				'<div class="promitList" style="'+ promitListCss +'">'
			+					'<p style="text-color:#353535; margin-bottom:15px; text-align:center;">'+ this.msg +'</p>'
			+					'<div style="display:-webkit-box !important; width:100%; -webkit-box-align:center; -webkit-box-pack:center;">'
			+						'<div class="'+ this.confirmButton +'" style="'+ buttonCss +'background:#e53c5f;display:block; -webkit-box-flex:1;">'+ this.confirmText +'</div>'
			+						'<div class="'+ this.cancleButton +'" style="'+ buttonCss +'background:#b3b3b3;display:block; -webkit-box-flex:1; margin-left:10px;">'+ this.cancleText +'</div>'
			+					'</div>'
			+				'</div>'
			+			'</div>';
			return tags;
		}
		
	};
	
	$.ConfirmBox = function(options){
		var options = $.extend({},$.ConfirmBox.defaults,options)
		var opts = new ConfirmRe(options);
		opts.init(options);
	};
	
	$.ConfirmBox.defaults = {
		confirm:function(){},
		cancle:function(){}	
	};
})($);

/*! jquery.finger - v0.1.6 - 2016-10-05
* https://github.com/ngryman/jquery.finger
* Copyright (c) 2016 Nicolas Gryman; Licensed MIT */
/*
(function (factory) {
	if (typeof define === 'function' && define.amd)
		define(['jquery'], factory);
	else if (typeof exports === 'object')
		factory(require('jquery'));
	else
		factory(jQuery);
}(function ($) {

	var ua = navigator.userAgent,
		isChrome = /chrome/i.exec(ua),
		isAndroid = /android/i.exec(ua),
		hasTouch = 'ontouchstart' in window && !(isChrome && !isAndroid),
		startEvent = hasTouch ? 'touchstart' : 'mousedown',
		stopEvent = hasTouch ? 'touchend touchcancel' : 'mouseup mouseleave',
		moveEvent = hasTouch ? 'touchmove' : 'mousemove',

		namespace = 'finger',
		rootEl = $('html')[0],

		start = {},
		move = {},
		motion,
		safeguard,
		timeout,
		prevEl,
		prevTime,

		Finger = $.Finger = {
			pressDuration: 300,
			doubleTapInterval: 300,
			flickDuration: 150,
			motionThreshold: 5
		};

	function preventDefault(event) {
		event.preventDefault();
		$.event.remove(rootEl, 'click', preventDefault);
	}

	function page(coord, event) {
		return (hasTouch ? event.originalEvent.touches[0] : event)['page' + coord.toUpperCase()];
	}

	function trigger(event, evtName, remove) {
		var fingerEvent = $.Event(evtName, move);
		$.event.trigger(fingerEvent, { originalEvent: event }, event.target);

		if (fingerEvent.isDefaultPrevented()) {
			if (~evtName.indexOf('tap') && !hasTouch)
				$.event.add(rootEl, 'click', preventDefault);
			else
				event.preventDefault();
		}

		if (remove) {
			$.event.remove(rootEl, moveEvent + '.' + namespace, moveHandler);
			$.event.remove(rootEl, stopEvent + '.' + namespace, stopHandler);
		}
	}

	function startHandler(event) {
		if (event.which > 1)
			return;

		var timeStamp = event.timeStamp || +new Date();

		if (safeguard == timeStamp) return;
		safeguard = timeStamp;

		// initializes data
		start.x = move.x = page('x', event);
		start.y = move.y = page('y', event);
		start.time = timeStamp;
		start.target = event.target;
		move.orientation = null;
		move.end = false;
		motion = false;
		timeout = setTimeout(function() {
			trigger(event, 'press', true);
		}, Finger.pressDuration);

		$.event.add(rootEl, moveEvent + '.' + namespace, moveHandler);
		$.event.add(rootEl, stopEvent + '.' + namespace, stopHandler);

		// global prevent default
		if (Finger.preventDefault) {
			event.preventDefault();
			$.event.add(rootEl, 'click', preventDefault);
		}
	}

	function moveHandler(event) {
		// motion data
		move.x = page('x', event);
		move.y = page('y', event);
		move.dx = move.x - start.x;
		move.dy = move.y - start.y;
		move.adx = Math.abs(move.dx);
		move.ady = Math.abs(move.dy);

		// security
		motion = move.adx > Finger.motionThreshold || move.ady > Finger.motionThreshold;
		if (!motion) return;

		// moves cancel press events
		clearTimeout(timeout);

		// orientation
		if (!move.orientation) {
			if (move.adx > move.ady) {
				move.orientation = 'horizontal';
				move.direction = move.dx > 0 ? +1 : -1;
			}
			else {
				move.orientation = 'vertical';
				move.direction = move.dy > 0 ? +1 : -1;
			}
		}

		// for delegated events, the target may change over time
		// this ensures we notify the right target and simulates the mouseleave behavior
		while (event.target && event.target !== start.target)
			event.target = event.target.parentNode;
		if (event.target !== start.target) {
			event.target = start.target;
			stopHandler.call(this, $.Event(stopEvent + '.' + namespace, event));
			return;
		}

		// fire drag event
		trigger(event, 'drag');
	}

	function stopHandler(event) {
		var timeStamp = event.timeStamp || +new Date(),
			dt = timeStamp - start.time,
			evtName;

		// always clears press timeout
		clearTimeout(timeout);

		// tap-like events
		if (!motion) {
      // triggered only if targets match
      if (event.target === start.target) {
        var doubleTap = prevEl === event.target && timeStamp - prevTime < Finger.doubleTapInterval;
  			evtName = doubleTap ? 'doubletap' : 'tap';
  			prevEl = doubleTap ? null : start.target;
  			prevTime = timeStamp;
      }
		}
		// motion events
		else {
			// ensure last target is set the initial one
			event.target = start.target;
			if (dt < Finger.flickDuration) trigger(event, 'flick');
			move.end = true;
			evtName = 'drag';
		}

    if (evtName)
		  trigger(event, evtName, true);
	}

	// initial binding
	$.event.add(rootEl, startEvent + '.' + namespace, startHandler);

	// expose events as methods
	$.each('tap doubletap press drag flick'.split(' '), function(i, name) {
		$.fn[name] = function(fn) {
			return fn ? this.on(name, fn) : this.trigger(name);
		};
	});

	return Finger;

}));
*/

/*
 * 登录成功后客户端回调这个方法,刷新页面,拼session ,client.interactive.js中调用 
 * url要跳转的路径,
 * data:json
 * isLogin:是否要登录   1-要登录,0-不用登录
 * replace:是否替换页面刷新  1-不替换 , 0 - 替换
 */
function loginRefresh(url,data){
	var data = data || {};
	var params = [] , keys = [] , vals = [] , pathname= '';
	
	var replace = data.replace || 0;
	var isLogin = data.isLogin || 0;
	
	var session = data.session || clientGetSession() || '';
	
	if(url.indexOf('?') != -1){
		var paramStr = url.substring(url.lastIndexOf('?')+1);
			params = paramStr.split('&');
			pathname = url.substring(0,url.lastIndexOf('?'));
		
		for(var i = 0 , pLen = params.length; i < pLen; i++){
			var arr = params[i].split('=');
			keys.push(arr[0]);
			vals.push(arr[1]);
		}
	}else{
		pathname = url;
	}
	
	if (!session && isLogin){
		clientCheckLogin();
	}else{
		
		var pStr = '' , isFlagSession = false; //判断参数是否存在session,true存在,false不存在
		for(var m = 0 , len = keys.length; m <len; m++){
			if(m == 0) pStr += '?';
			
			if(keys[m] == 'session'){
				vals[m] = session;
				isFlagSession = true;
			}
			
			pStr += keys[m]+'='+vals[m];
			if(m != (len-1)) pStr += '&';
		}
		
		if(!isFlagSession) {
			if(url.indexOf('?') != -1){
				pStr += '&session='+session;
			}else{
				pStr += '?session='+session;
			}
		}
		if(replace){
			window.location.href = pathname + pStr;
		}else{
			window.location.replace(pathname + pStr);
		}
	}
}

/*
 * 登录成功后客户端回调获取用户信息
 */
function refreshWebView(data){
	var dt = {};
	try{
		dt = JSON.parse(data);
	}catch(e){
		dt = data;
	}
	loginRefresh(location.href,{session:dt.session});
}
window.refreshWebView = refreshWebView;

/*
 * 图片居中显示
 * maxNum:最多显示几个
 * 页面布局 <ul><li><img src=""/></li></ul>
 */
function centerImg(elem,maxNum){
	$.each($(elem),function(m){//图片尺寸控制
		var height = 0;
		$.each($(this).find('li'),function(i){
			if(i == maxNum) {
				$(this).prev().nextAll().remove();
				return false;
			}
			var image = new Image();
			
			if(i == 0) height = Math.floor($(this).width());
			
			var imgSrc = $(this).find('img').attr('src');
			
			if(imgSrc.toLowerCase().indexOf('gifurl') != -1){ //存在gif图片的参数
				imgSrc = imgSrc.substring(imgSrc.lastIndexOf('=')+1);
			}
			
			var self = $(this);
			image.onload = function(){
				var type = image.src.substr(image.src.lastIndexOf('.')+1);
//				if(type == 'gif') return false; //gif图片不做处理
				
				var w = image.width; 
				var h = image.height;
				var imgArr = imageScale(w,h,height,height);
				
				if(w>=h){
					self.css({'height':height+'px','overflow':'hidden'}).find('img')
						.attr({'height':height,'src':imgSrc}).css('margin-left',-(imgArr.width-imgArr.height)/2+'px');
				}else{
					self.css({'height':height+'px','overflow':'hidden'}).find('img')
						.attr({'width':height,'src':imgSrc}).css('margin-top',-(imgArr.height-imgArr.width)/2+'px');
				}
			}
			image.src = imgSrc;
		});
	});
	
	/*
	 * 图片等比缩放
	 * w:原图宽
	 * h:原图高
	 * maxW:最大宽
	 * maxH:最大高
	 */
	function imageScale(width,height,maxWidth,maxHeight){
		var width = width, 
			height = height , 
			maxWidth = maxWidth , 
			maxHeight = maxHeight;
		
		if(width > height){
			width = Math.floor(width*maxHeight/height);
			height = maxHeight;
			
		}else{
			height = Math.floor(height*maxWidth/width);
			width = maxWidth;
		}
		return {width:width,height:height};
	}
}

/*牙牙下载地址跳转*/
function yayaDownLoadHref(){
	var yayaurl = 'http://api.9zhitx.com/router';
	var yayaparam = {method:'jz.router.download.url', format:'json', appkey:'jz-yaya', v:'1.0', sign:'FD088BA654EFBE2CC6B76EEA99257267'};
	$.post(yayaurl, yayaparam, function(data){
		location.href = 'http://www.9zhitx.com/html/ios_android.html?t='+(+new Date());	
	}, 'json');
}

/*牙牙下载地址跳转*/
function yayaDwonLoadUrl(){
	var browser = {
		versions: function() {
			var u = navigator.userAgent, app = navigator.appVersion;
			return {//移动终端浏览器版本信息
				trident: u.indexOf('Trident') > -1, //IE内核
				presto: u.indexOf('Presto') > -1, //opera内核
				webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
				gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
				mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
				ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
				android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
				iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
				iPad: u.indexOf('iPad') > -1, //是否iPad
				webApp: u.indexOf('Safari') == -1 ,//是否web应该程序，没有头部与底部
				wx: u.indexOf('MicroMessenger') > -1, //微信
				wb: u.indexOf('Weibo') > -1 //微博
			};
		}(),
		language: (navigator.browserLanguage || navigator.language).toLowerCase()
	}
	if (browser.versions.ios || browser.versions.iPhone || browser.versions.iPad) {
		if(browser.versions.wx ){
			window.location="http://a.app.qq.com/o/simple.jsp?pkgname=com.attention.app";
		}else if(browser.versions.wb){
			$('body').append('<div id="wbsharetip" style="width:100%; height:100%; position:fixed; z-index:9999; top:0; left:0; "><img src="http://images.9zhitx.com/a08158f4-3c4d-4280-82e1-f5013e90be59.jpg" style="width:100%;"></div>');
			$('#wxsharetip').on('click',function(){
				$(this).remove();
			});
			window.location="https://itunes.apple.com/cn/app/ya-ya-guan-zhu/id1028788719?l=en&mt=8";
		}else{
			window.location="https://itunes.apple.com/cn/app/ya-ya-guan-zhu/id1028788719?l=en&mt=8";
		}
	}
	else if (browser.versions.android) {
		window.location="http://a.app.qq.com/o/simple.jsp?pkgname=com.attention.app";
	}else {
		window.location="http://www.21yaya.com/";
	}				
}

/*
 * 牙牙下载地址 ios-appstore , wx-应用宝 , 非wx-直接下载
 */
function yayaDownLoadType(){
	var browser = {
			versions: function() {
				var u = navigator.userAgent, 
					app = navigator.appVersion;
				return {//移动终端浏览器版本信息
					trident: u.indexOf('Trident') > -1, //IE内核
					presto: u.indexOf('Presto') > -1, //opera内核
					webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
					gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
					mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
					ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
					android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
					iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
					iPad: u.indexOf('iPad') > -1, //是否iPad
					wx: u.indexOf('MicroMessenger') > -1 ,
					webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
					wb: u.indexOf('Weibo') > -1 //微博
				};
			}(),
			language: (navigator.browserLanguage || navigator.language).toLowerCase()
		}

		if (browser.versions.ios || browser.versions.iPhone || browser.versions.iPad) {
			if(browser.versions.wb){
				$('body').append('<div id="wbsharetip" style="width:100%; height:100%; position:fixed; z-index:9999; top:0; left:0; "><img src="http://images.9zhitx.com/a08158f4-3c4d-4280-82e1-f5013e90be59.jpg" style="width:100%;"></div>');
				$('#wxsharetip').on('click',function(){
					$(this).remove();
				});
			}
			window.location="https://itunes.apple.com/cn/app/ya-ya-guan-zhu/id1028788719?l=en&mt=8";
		}
		else if (browser.versions.android) {
			if(browser.versions.wx){
				window.location="http://a.app.qq.com/o/simple.jsp?pkgname=com.attention.app";
			}else{
				window.location="http://fastdfs.9zhitx.com:10170/apk/yygz.apk";
			}
		}else{
			window.location="http://www.21yaya.com/";	
		}
}

/*
 * 评论数转换
 * elem:class对象
 */
function commentNum(elem){
	$.each($(elem),function(){
		var num = parseInt($(this).text());
		if(!isNaN(num) && num >= 10000){
			var n = Math.ceil(num / 1000);
			$(this).text((n/10)+'万');
		}
	});
}

/*
 * 判断是否为pc端,pc端显示友好提示图片
 */
function sharePageIsPc(elem){
	var elem = $(elem||'#sharePageId');
	if(detectPlatform() == 'pc'){
		var img = '<img src="/h5/common/images/common/shareTipImg.png" width="240">';
		elem.html(img).parents('body').css('background','#fff');
		var top = Math.floor(($(document).height() - 312)/2);
		elem.show().css({'text-align':'center','margin-top':top+'px'});
		$('body').css({'background':'#fff','height':'auto'});
		$('html').css({'background':'#fff','height':'auto'});
	}else{
		elem.show();
	}
}

/**
 * Get GIF url from <img> src 
 * and replace it.
 */
function showGif() {
    $('img').each(function(){
        var old_src = $(this).prop('src');

        if (old_src.indexOf('gifUrl=') != -1)
            $(this).prop('src', old_src.substring(old_src.indexOf('gifUrl=') + 7)); // 'gifUrl='.length = 7
    });
}

/**
 * no source or empty page
 * @param msg
 */
function noSource(msg) {
	var no_source = $('#noSource');
	if (no_source.length == 1) {
		var html = '';
		
		html += '<div style="text-align: center;">';
		html += '<img src="/h5/common/images/common/yaya-normal.png" width="120">';
		html += '<p style="padding: 6px 12px;font-size: 16px;color: #999999;line-height: 1.5;">' + (msg || '找不到资源哦~' ) + '</p>';
		html += '</div>';
		no_source.html(html);
		no_source.css({
			'position': 'fixed',
			'top'     : '0',
			'left'    : '0',
			'width'   : '100%',
			'height'  : '100%',
			'display' : '-webkit-box',
			'display' : '-webkit-flex',
			'display' : 'flex',
			'-webkit-box-pack'       : 'center',
			'-webkit-justify-content': 'center',
			'justify-content'        : 'center',
			'-webkit-box-align'      : 'center',
			'-webkit-align-items'    : 'center',
			'align-items'            : 'center',
			'background'             : '#fff'
		});
	}
}

/**
 * 获取 Url 参数值
 *
 * @param {String} name 参数名称
 * @return {Object} param  返回参数值
 */
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); // 构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg); // 匹配目标参数
    if (r != null) return decodeURIComponent(r[2]); return null; // 返回参数值
}

/**
 * 生成 [min, max] 的随机数
 * Returns a random integer between min (included) and max (included)
 *
 * @param min(included)
 * @param max(included)
 * @return integer number
 * */
function getRandomIntInclusive (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * yaya下载
 */
function yayaDownloadTip(data){ // 'http://www.9zhitx.com/html/ios_android.html?t='+(+new Date())
	var data = data || {};
	var tags = '';
	tags = '<div class="yayaDownloadTip">'+
				'<div class="down">'+
					'<div class="t" style="text-align:center; font-size:18px; color:#333;">温馨提示</div>'+
					'<div style="font-size:16px; text-align:center; color:#333; margin:25px 0 40px;">只有下载app才能参加活动<br/>是否马上下载</div>'+
					'<div class="button">'+
						'<input type="button" value="取消" class="yayaDownloadTipCancel" style="background:#d3d3d3;">'+
						'<input type="button" value="去下载" class="yayaDownloadTipSure" style="background:#fb5776;">'+
					'</div>'+
				'</div>'+
			'</div>';
	$('body').append(tags);
	$('body').on('click','.yayaDownloadTipCancel',function(){
		$(this).parents('.yayaDownloadTip').remove();
	});
	$('body').on('click','.yayaDownloadTipSure',function(){
		try{
			window._hmt && window._hmt.push(['_trackEvent', 'active_yaya_download', 'click', '点击下载的次数']);
		}catch(e){}
		yayaDownLoadType();
	});
	
	$('.yayaDownloadTip').css({
		'background':'rgba(0,0,0,0.5)',
		'display':'-webkit-flex',
		'-webkit-justify-content':'center',
		'-webkit-align-items':'center',
		'position':'fixed',
		'top':'0',
		'left':'0',
		'z-index':'50',
		'width':'100%',
		'height':'100%'
	}).find('.down').css({
		'padding':'20px 20px 15px',
		'width':'88%',
		'background':'#fff',
		'border-radius':'5px',
		'box-sizing':'border-box'
	}).find('.button').css({
		'display':'-webkit-flex',
		'-webkit-justify-content':'space-between'
		
	}).find('input[type=button]').css({
		'width':'120px',
		'height':'40px',
		'border-radius':'40px',
		'font-size':'16px',
		'color':'#fff'
	});
}

/**/
export default {
	getCookie,
	setCookie,
	uuid,
	promptMsg,
	publishTime,
	yayaDownload,
	getVerificationCode,
	detectPlatform,
	centerImg,
	yayaDownLoadHref,
	commentNum,
	sharePageIsPc,
	showGif,
	noSource,
    getUrlParam,
    getRandomIntInclusive,
    yayaDownloadTip,
	yayaDwonLoadUrl
}
