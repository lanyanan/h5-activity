'use strict';

import ajax from './ajax.js'
import tools from './tools.js'
import client from './client.interactive.js'

let request = {
    ajax: (url, type, data) => {
        let promise = new Promise((resolve, reject) => {
            $.ajax({
                type: type,
                url: ajax.drawUrl(url),
                data: data,
                beforeSend: ajax.beforeAjax,
                dataType: "json",
                success: res => {
                    if (res && !res.code) {
                        resolve(res);
                    }
                },
                error: error => {
                    //判断是否断网
                    if(client.clientIsNetwork() == '0'){
                        tools.promptMsg('网络已断开','center');
                        return
                    }
                    tools.promptMsg('请求数据失败', 'center');
                    reject(error);
                }
            });
        });
        return promise;
    },
    doPost: (url, data) => request.ajax(url, 'POST', data),
    doGet: (url, data) => request.ajax(url, 'GET', data)
};

export default request;