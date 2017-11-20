/**
 * session过期调用客户端登录 , 新版已弃用 , 直接调用clientCheckLogin()
 */
function clientCheckSession(){
	try{
		window.object.checkSession();
	}catch(e){ }
}

/**
 * 禁用客户端返回按钮
 * string:提示文字
 */
function clientGoBackForbidden(string) {
	try{
		window.object.LotteryButtonClick(string);
	}catch(e){}
}

/**
 * 客户端返回按钮解除禁用
 */
function clientLotteryCompleted() {
	try{
        window.object.LotterySucceed();
	}catch(e){}
}

/**
 * 调用客户端登录
 * 登录成功之后客户端调用loginRefresh() 在global.js中
 */
function clientCheckLogin(){
	try{
		window.object.checkLogin();
	}catch(e){}
}

/**
 * 嘉宾投票成功或者互动参与成功,调用客户端刷新列表
 */
function clientJoinSuccess(){ 
	try{
		window.object.joinSuccess();
	}catch(e){}
}

/**
 * 图片上传活动
 * 调用上传照片
 */
function clientUploadImage(){
	try{
		window.object.uploadImage();
	}catch(e){ }
}

/**
 * 点击回复按钮调用输入框
 * 数据类型:string
 * nickname:当前昵称
 */
function clientReplay(nickName){
	try{
		window.object.replayComment(nickName);
	}catch(e){}
}

/**
 * 互动列表调用视频 
 */
function clientMovie(operateId){
	try{
		window.object.videoDetail(operateId);
	}catch(e){}
}

/**
 * 互动列表为空,点击调用互动频道
 */
function clientInteract(){
	try{
		window.object.InteractiveChannel();
	}catch(e){}
}

/**
 * 判断是否断网,默认为1 
 * 数据类型:int
 * 1-数据流量，2-wifi ,0-断网
 */
function clientIsNetwork(){
	try{
		return window.object.isNetwork();
	}catch(e){
		return 2;
	}
}

/**
 * 互动页面返回到列表更新人数
 * 数据类型:json
 * interactId
 * count:当前参与人数
 * status：1-活动开始前,2-活动正在进行,3-活动已结束
 * modeId:1=娱乐, 2=视频,3=互动,4=嘉宾,5=明星动态,6=粉丝动态,7=明星问答, 8=明星公益 ,9=明星票务, 10=手游帖子
 */
function clientInteractIdNum(data){
	window.object.activeInteractIdNum(JSON.stringify(data));
}

/**
 * 返回到webview的首页
 */
function clientGoBackTop(){
	try{
		window.object.goBackTop();
	}catch(e){
		setTimeout(function(){
			try{
				window.object.goBackTop();
			}catch(ev){}
		},1000);
	}
}

 /**
  * close webview
  */
function closeWebview(){
	try{
		window.object.closeWebview();
	}catch(e){
		setTimeout(function(){
			try{
				window.object.closeWebview();
			}catch(ev){}
		},1000);
	}
}

/**
 * old version
 * 兼容老版本,嘉宾详情评论
 */
function clientNewVersion(){
	try{
		window.object.newVersion();
	}catch(e){
		setTimeout(function(){
			try{
				window.object.newVersion();
			}catch(ev){}
		},1000);
	}
}

/**
 * 判断新老版本新加返回参数
 */
function clientIsNewVersion(){ 
	try{
		return window.object.isNewVersion();
	}catch(e){
		setTimeout(function(){
			try{
				return window.object.isNewVersion();
			}catch(ev){}
		},1000);
	}
}

/**
 * 显示评论条
 * title:分享标题
 * content:分享内容
 * url:分享地址
 */
function clientOldShowBottom(title,content,url){
	try{
		window.object.showBottom(title,content,url);
	}catch(e){}
}

/**
 * 我的奖品页面类型
 * 数据类型:int
 * 0-互动奖品;1-积分奖品
 */
function clientSetPrizePageType(pageType){ 
	try {
		window.object.setPageType(pageType);
	}catch(e){}
}

/**
 * 我的奖品页面类型
 * 数据类型:int
 * 0-互动奖品;1-积分奖品
 */
function clientGetPrizePageType(){ // 
	try{
		return window.object.getPageType();
	}catch(e){}
}

/**
 * 跳转到外部浏览器,
 * 数据类型:json
 * url:地址
 */
function clientExternalBrowser(data){ 
	try{
		window.object.goExternalBrowser(JSON.stringify(data));
	}catch(e){}
}

/**
 * 新版已弃用
 * 回复底部显示输入框 ,
 * 数据类型:json
 * commentId:评论Id
 * modelId:1=娱乐, 2=视频,3=互动,4=嘉宾,5=明星动态,6=粉丝动态,7=明星问答, 8=明星公益 ,9=明星票务, 10=手游帖子
 * bussinessId:业务id
 */
function clientShowInputBox(data){ 
	try{
		window.object.showInputBox(JSON.stringify(data));
	}catch(e){
		setTimeout(function(){
			try{
				window.object.showInputBox(JSON.stringify(data));
			}catch(ev){}
		},1000);
	}
}

/**
 * 删除列表项后回调,
 * 数据类型:int  
 * type:1-我的互动,2-我的奖品,3-我的积分
 */
function clientDelListItem(type){ 
	try{
		window.object.delListItem(type);
	}catch(e){}
}

/**
 * 分享
 * 数据类型:json
 * type:1-图文,2-视频,3-纯图
 * title:标题
 * detail:详情
 * url:路径
 * img:分享小图标
 * statistics:是否上报,0-不上报,1-上报
 * infoType:上报类型,1 资讯  2 视频  3 广告  4 嘉宾投票 5 软件  6互动明星, 7 兑奖页面， 8 我的兑奖奖品页，9 明星动态分享，10粉丝动态分享 ， 11  公益分享， 12 公益动态分享， 13 手游帖子分享 ，
    14 票务分享， 15 互动分享  (上报给文登辉用) 21 直播分享 22 晚会专区分享 , 23 晚会专区投票分享
 * platform:分享平台,0-全部,1-微信好友,2-朋友圈,3-qq好友,4-qq空间,5-新浪微博
 * nativeShareBtn:原生按钮,1-显示,0-不显示
 * isCallback:0 调,非0不回调，默认为0
 * platformArr:[1,2,3]没这个参数,默认为全部 ,分享面板改成可配的
 * 
 * 分享成功回调方法shareSuccess(platform) platform-平台参数
 */
function clientShareOut(data){ 
	try{
		window.object.shareOut(JSON.stringify(data));
	}catch(e){
		setTimeout(function(){
			try{
				window.object.shareOut(JSON.stringify(data));
			}catch(err){}
		},2000);
	}
}

/**
 * 获取手机序列号udid
 */
function clientGetUdid(){ 
	try{
		return window.object.getUdid();
	}catch(e){
		return '';
	}
}

/**
 * 获取session
 */
function clientGetSession(){
	try{
		return window.object.getSession();
	}catch(e){
		return '';
	}
}

/**
 * 获取用户信息
 * 数据类型:json
 * udid
 * session
 * id:用户id
 * guid
 * mobile:手机号
 * nickName:昵称
 * portrait:头像
 * signature:个性签名
 * age:年龄,-1保密
 * sex:性别,1-保密,2-男,3-女
 * userName:用户名称
 * userType:是否名星帐号
 * realName:明星真实姓名
 */
function clientGetUserInfo(){
	try{
		return window.object.getUserInfo();
	}catch(e){
		return '';
	}
}

/**
 * 铁杆粉丝榜领奖成功后调用
 */
function clientIsSuccess(){ 
	try{
		window.object.isSuccess();
	}catch(e){
		setTimeout(function(){
			try{
				window.object.isSuccess();
			}catch(ev){}
		},1000);
	}
}

/**
 * 回复功能,判断是否支持回复功能
 * 数据类型:string
 * url:回复地址
 */
function clientIsReplay(url){ 
	try{
		window.object.isReplay();
		location.href = url;
	}catch(e){ }
}

/**
 * 牙牙直播-我的星钻,获取星钻余额
 */
function clientGetDiamonds() {
	try {
		return window.object.getDiamonds();
	} catch(e){}
}

/**
 * web跳转原生
 * 数据类型:json
 * type:类型（1-视频;2-资讯;3-直播;4-明星;5-晒图(预留);6-公益(预留);7-商城(预留);8-应援(预留);9-专题;10-帖子,11-图集,12-明星大厅,13-社区解签,14-补充生日信息）
 * id:活动ID
 * title:活动名称
 * url:路径
 * pullUrl720:拉流地址（720P）
 * pullUrl480:拉流地址（480P）
 * pullUrl360:拉流地址（320P）
 * liveKey:房间号
 * shareVo:{
 * 	title:
 *  detail:
 *  img:
 *  url:
 * }
 */
function clientWebGotoNative(data) {
	try {
		window.object.webGotoNative(JSON.stringify(data));
	} catch(e){}
}

/**
 * 发表/回复评论 , 评论成功后客户端回调 pubComment()
 * 数据类型:json
 * nickname:用户昵称
 * modelId:1=娱乐, 2=视频,3=互动,4=嘉宾,5=明星动态,6=粉丝动态,7=明星问答, 8=明星公益 ,9=明星票务, 10=手游帖子
 * bussinessId:业务id
 * categoryId:0
 * toNickName:对评论回复的昵称
 * toUserId:对评论回复的用户Id
 * commentId：回复ID
 * showInput:1-显示，0-不显示，默认不显示
 * countLimit:100,默认为不限制
 * commentStatus:是否开启评论 1-打开, 0 – 关闭
 * share:是否显示分享按钮 1-显示, 0-不显示  , 点击按扭客户端调commentShare()
 */
function clientEnterComment(data) {
	try {
		window.object.enterComment(JSON.stringify(data));
	} catch(e){
		setTimeout(function(){
			try{
				window.object.enterComment(JSON.stringify(data));
			}catch(err){}
		},2000);
	}
}

/**
 * 获取用户的设备信息
 * 数据类型:json
 * imsi:
 * imei:
 * src:
 * cInt:
 * appVer:
 * appCode:
 * androidid:
 * platform:
 */ 
function clientGetDeviceInfo() {
	try {
		return window.object.getDeviceInfo();
	} catch(e){
		return '';
	}
}

/**
 * 申请圈主成功回调
 */
function clientApplyHeader(){
	try{
		window.object.applyHeader();
	}catch(e){}
}

/**
 * 评论头像跳转到个人中心
 * userId:用户id
 */
function clientUserCenter(userId){
	try{
		window.object.userCenter(userId);
	}catch(e){}
}

/**
 * 上传图片交互 
 * 数据类型 : json
 * {
 * 	count:1,	最多选择的图片张数
 * 	limit:true, true-强制 , false-不强制
 * 	id:id , 上传成功后把这个id再传过来
 * }
 * 上传成功调用js方法 fileUploadSuccess(data) 
 * data : json
 * {id:"", img:[{url:"xxx", wAndH:"100x200"},{url:"xxx", wAndH:"100x200"}]}
 */
function clientFileUpload(data){
	try{
		window.object.fileUpload(JSON.stringify(data));
	}catch(err){}
}

/**
 * 明星大厅
 */
function clientStarHall(){
	try{
		window.object.starHall();
	}catch(err){}
}

/*
 * 判断yaya-app ,微信,和其它平台
 */
function clientPlatform(){
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
	if (browser.versions.ios || browser.versions.iPhone || browser.versions.iPad || browser.versions.android) { // ios执行的方法
		try{
			window.object.isNetwork();
			system = 'yayaApp';	
		}catch(e){
			if(browser.versions.wx){
				system = 'wxApp'; 	
			}else{
				system = 'otherApp';	
			}	
		}
	}else{
		system = 'pc';	
	}
	return system;
}

/*
 * 图片流  
 * 上传成功回调fileBase64Success(url)
 */
function clientFileBase64(file){
	try{
		window.object.fileBase64(file);
	}catch(err){}
}

/*loadReady() 客户端webview初始化完成后调用的方法*/

/**/
export default {
	clientCheckSession,
	clientGoBackForbidden,
	clientLotteryCompleted,
	clientCheckLogin,
	clientJoinSuccess,
	clientUploadImage,
	clientReplay,
	clientMovie,
	clientInteract,
	clientIsNetwork,
	clientInteractIdNum,
	clientGoBackTop,
	closeWebview,
	clientNewVersion,
	clientIsNewVersion,
	clientOldShowBottom,
	clientSetPrizePageType,
	clientGetPrizePageType,
	clientExternalBrowser,
	clientShowInputBox,
	clientDelListItem,
	clientShareOut,
	clientGetUdid,
	clientGetSession,
	clientGetUserInfo,
	clientIsSuccess,
	clientIsReplay,
	clientGetDiamonds,
	clientWebGotoNative,
	clientEnterComment,
	clientGetDeviceInfo,
	clientApplyHeader,
	clientUserCenter,
	clientPlatform,
	clientFileUpload
}
