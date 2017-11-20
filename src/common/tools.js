
/**
 * date format
 *
 * @param f (eg: 'yyyy-MM-dd hh:mm:ss.S', 'yyyy年MM月dd日 hh小时mm分钟ss秒S毫秒')
 *
 */
Date.prototype.format = function(f) {
    var o = {
        "M+" : this.getMonth()+1, //month
        "d+" : this.getDate(), //day
        "h+" : this.getHours(), //hour
        "m+" : this.getMinutes(), //minute
        "s+" : this.getSeconds(), //second
        "q+" : Math.floor((this.getMonth()+3)/3), //quarter
        "S"  : this.getMilliseconds() //millisecond
    };
    if (/(y+)/.test(f))
        f = f.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if(new RegExp("(" + k + ")").test(f)) f = f.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)); return f;
};

/**
 * YaYa 下载条
 * obj = {
 *     title: '' || '下载牙牙关注APP',
 *     slogan: '',
 *     btnText: '' || '马上下载',
 * }
 *
 */
function yayaDownloadBar() {
    var obj = arguments[0] || {};
    var tags = '';

    tags += '<div style="position: fixed; left: 0; bottom: 0; z-index: 99999; width: 100%; height: 60px;">';
    tags += '	<div style="position: relative; height: 36px; max-width: 500px; margin: auto; padding: 12px; background: rgba(255, 255, 255, .9);">';
    tags += '		<div style="position: absolute; left: 12px; top: 12px; width: 36px; height: 36px;"><img src="../../../images/app/common/icon_logo.png"></div>';
    tags += '		<p style="padding: 0 94px 0 44px; font-size: 14px; color: #333;">' + (obj.title || '下载牙牙关注APP') + '<br>' + (obj.slogan || '') + '</p>';
    tags += '		<a id="downloadBtn" href="javascript: void(0);" style="position: absolute; right: 12px; top: 12px; width: 86px; height: 36px; font-size: 14px; line-height: 36px; color: #FFF; text-align: center; background: #E73850; border-radius: 50px">' + (obj.btnText || '马上下载') + '</a>';
    tags += '	</div>';
    tags += '</div>';

    $('body').append(tags);
    $('#downloadBtn').on('click', function () {
        var url = 'http://api.9zhitx.com/router';
        var param = {
            v: '1.0',
            format: 'json',
            appkey: 'jz-yaya',
            method: 'jz.router.download.url',
            sign: 'FD088BA654EFBE2CC6B76EEA99257267'
        };
        $.post(url, param, function(data){
            location.href = 'http://www.9zhitx.com/html/ios_android.html?t=' + (+new Date());
        }, 'json');
    });
}

/**
 * 只有在webview或者网页版的情况下有用
 * 提示信息显示下屏幕下方
 * msg 提示文字；
 * prompt 提示框对象；
 * position 显示的位置（值为 center 显示在中间；值为 bottom 显示在底部）
 * delay 默认为2s
 */

function promptMsg(msg, position, flag) {
    var flag = flag || 'true';
    var prompt_st = null;
    if (flag == 'true') {
        clearTimeout(prompt_st);
        $('#promptMsg').remove();
    } else {
        if ($('#promptMsg').length) return;
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
    switch(position) {
        case 'center':
            prompt_top = (screen_height-prompt.outerHeight()) / 2;
            break;
        case 'bottom':
            prompt_top = (screen_height - prompt.outerHeight() - 60);
            break;
        default:
            break;
    }

    prompt.html(msg).css({
        'top': prompt_top + 'px',
        'left': (w_width - prompt.innerWidth()) / 2 + 'px'
    }).show().animate({
        opacity:'1'
    }, 500);
    prompt_st = setTimeout(function(){
        prompt.animate({opacity:'0'},500,function(){
            $(this).remove();
            clearTimeout(prompt_st);
        });
    }, obj.delay || 3000);
}

/**
 * 检测平台系统
 *
 * @return system
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

/**
 * 判断所给版本号是否小于等于线上版本
 *
 * @param version 版本号
 * @return {boolean} true: 线上版本大于等于该版本 false: 线上版本小于该版本
 */
function isLeOnlineVersion(version) {
    // 获取设备信息
    let deviceInfo = clientGetDeviceInfo();

    if (version && deviceInfo) {
        let deviceInfoObj = JSON.parse(deviceInfo);
        let v1 = version.trim();
        let v2 = deviceInfoObj.appVer;
        let v1_arr = v1 ? v1.split('.') : [];
        let v2_arr = v2 ? v2.split('.') : [];
        let len = v1_arr.length <= v2_arr.length ? v1_arr.length : v2_arr.length;

        // alert('v1_arr = ' + v1_arr + ' v2_arr = ' + v2_arr);
        for (let i = 0; i < len; i++) {
            if (v1_arr[i] < v2_arr[i]) {
                return true;
            } else if (v1_arr[i] > v2_arr[i]) {
                return false;
            } else {
                if (i == 2) { // 只需取前三位作比较
                    return true;
                }
            }
        }
    }

    return false;
}

/**
 * loading Toast
 *
 * @param txt
 */
function loadingToast(txt) {
    var loadingToast = $('#loadingToast');
    // console.log('loadingToast.length = ' + loadingToast.length);

    if (loadingToast.length == 0) {
        $('body').append(
            '<div id="loadingToast" class="loading_toast">' +
            // '<div class="mask_transparent"></div>' +
            '<div class="toast">' +
            '<div class="loading">' +
            '<div class="loading_leaf loading_leaf_0"></div>' +
            '<div class="loading_leaf loading_leaf_1"></div>' +
            '<div class="loading_leaf loading_leaf_2"></div>' +
            '<div class="loading_leaf loading_leaf_3"></div>' +
            '<div class="loading_leaf loading_leaf_4"></div>' +
            '<div class="loading_leaf loading_leaf_5"></div>' +
            '<div class="loading_leaf loading_leaf_6"></div>' +
            '<div class="loading_leaf loading_leaf_7"></div>' +
            '<div class="loading_leaf loading_leaf_8"></div>' +
            '<div class="loading_leaf loading_leaf_9"></div>' +
            '<div class="loading_leaf loading_leaf_10"></div>' +
            '<div class="loading_leaf loading_leaf_11"></div>' +
            '</div>' + (txt ? '<p class="toast_content">' + txt + '</p>' : '') +
            '</div>' +
            '</div>'
        );

        if (!txt) {
            $('.toast').css({'width' : '5.6em', 'min-height' : '5.6em'});
            $('.loading').css('top', '50%');
        }
    } else {
        loadingToast.remove();
    }

}

/**
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
 * 获取 Url 参数值
 *
 * @param {String} name 参数名称
 * @return {Object} param  返回参数值
 */
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); // 构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg); // 匹配目标参数
    if (r != null) return decodeURI(r[2]); return null; // 返回参数值
}

export default {
    promptMsg,
    getUrlParam,
    loadingToast,
    detectPlatform,
    yayaDownloadBar,
    isLeOnlineVersion,
    getRandomIntInclusive
}