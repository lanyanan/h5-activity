'use strict';

import md5utils from "./md5";

var ajax = {
	drawUrl : drawUrl,
	getSign : getSign,
    resetStatic : resetStatic,
    beforeAjax : beforeAjax
}

function drawUrl(url){
	let newUrl = url;
    if(getUrlParam(window.location.href, '_static')){
        let methodparam = getUrlParam(url.split("?")[1], 'method');
        return config.qiniuDomain + "/" + config.staticUrl + '/' + methodparam.replace(/\./g, '-') + '.json';
    }else{
        if(config.mock){
    		newUrl = "/";
            let methodparam = getUrlParam(url.split("?")[1], 'method');
    		// let paramDir = methodparam.split(".");
    		// for(let m in paramDir){
    		// 	newUrl = newUrl + paramDir[m] + "/";
    		// }
    		newUrl += methodparam + ".json";
    	}else{
            newUrl += "&appkey=jz-yaya&v=1.0&locale=zh_CN&format=json"
        }
    	return config.baseUrl + newUrl;
    }
}

function beforeAjax(s, x, excludes){
    if(!config.mock && !getUrlParam(window.location.href, '_static')){  
        let o = s;
        if(!s.url) 
            o = x;
        let sign = ajax.getSign(o.url, o.data, excludes);
        o.url=`${o.url}&sign=${sign}`;
    }
}

function resetStatic(name, content){
    if(getUrlParam(window.location.href, '_restatic')){
        let params = { 'prefix' : config.staticUrl, 'fileName' : name.replace(/\./g, '-') + '.json', 'content': JSON.stringify(content)};
        $.ajax({
         type: "post",
         data: params,
         url: config.restaticUrl + "&appkey=jz-yaya&v=1.0&locale=zh_CN&format=json",
         beforeSend: function (xhr, s) {
            let sign = ajax.getSign(s.url, s.data);
            s.url=`${s.url}&sign=${sign}`;
         },
         dataType: "json",
         success: function(json){
             console.log('resetStatic success!');
         },
         error: function(){
             alert('resetStatic fail!');
         }
        })
    }
}

function getSign(url, args, excludes){
    let secret = "205.204.216.221.203.204";
    let s = '';
    secret.split('.').forEach(value => s+=String.fromCharCode(parseInt(value)-99));
    let params = new Object();
    
    if(url.indexOf( '?' )!=-1){
        let urlParams = url.substring(url.indexOf( '?' )+1).split( '&' );
        urlParams.forEach(function(val){
            let keyval = val.split('=')
            if(excludes && excludes.length>0){
                if($.inArray(keyval[0], excludes)!=-1)
                    return;
            }
            params[keyval[0]] = keyval[1];
        });
    }

    if(args!=null){
        args.split('&').forEach(function(val){
            if(val && val!=''){
                if(excludes && excludes.length>0){
                    if($.inArray(val.split('=')[0], excludes)!=-1)
                        return;
                }
                params[val.split('=')[0]] = val = decodeURIComponent((val.split('=')[1]).replace(/\+/g, " "));
            }
        })
        
    }

    let paramNames = new Array();
    for (let paramName in params) {
        paramNames.push(paramName);
    }
    paramNames = paramNames.sort();

    let e = s;
    paramNames.forEach(function(val){
        e+=val+params[val];
    });
    e+=s;

    return md5utils.md5(e).toUpperCase();
}

//获取url中的参数
function getUrlParam(url, name) {
    if(url.indexOf('?')!=-1){
        url = url.substring(url.indexOf('?')+1);
    }
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = url.match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}



export default ajax;