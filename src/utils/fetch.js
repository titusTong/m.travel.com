/*
 对于fetch请求的封装
 参数：
 url：请求的地址；
 params：传给后台的参数ps:{username:tongshuo,password:123456}；
 type：请求的类型；http://develop.noahapi.test.dabanma.com;
 formData： 用于提交文件发起请求，留空不传参数则会按照正常的post方式请求；
 http://develop.noahapi.test.dabanma.com
 */

export default function sendFetch (url, parmas, type, formData,test) {
  let reg=/^local.dabanma.com/;
  let reg1=/^m.travel.com/;
  if(reg.test(window.location.host)||reg1.test(window.location.host)){
    var newUrl=`http://47.93.224.33:8001/${url}`;
  }else{
    var newUrl=`/${url}`;
  }
  if(type=='post') {
    if(!formData) {
      var options = {
        method:'POST',
        credentials:'include',
        header:{
          'Accept':'application/json',
          'Content-Type':'application/json'
        },
        body:JSON.stringify(parmas)
      };
    } else if((test == true) && formData) {
      newUrl = url;
      var options = {
        method:'POST',
        // 每次fetch请求都携带cookie
        /*credentials:'include',*/
        body:parmas
      };
    } else {
      var options = {
        method:'POST',
        // 每次fetch请求都携带cookie
        credentials:'include',
        body:parmas
      };
    };
    return new Promise (function(resolve, reject) {
      fetch(newUrl, options)
        .then((response) => {
          if(response.ok) {
            return response.json()
          } else {
            console.log(response);
            if(response.status == 404) {
              console.log(response);
            }
            if(response.status >= 500){
              alert('服务器繁忙,请重试；\r\nCode:'+ response.status)
            }
          }
        })
        .then((data) => {
          if(data) {
            // 成功！
            console.log(data.msg);
            resolve(data)
          } else {
            // 失败
            reject(data.msg)
          }
        })
    })
  } else {
    // GET请求；
    if(test == true){
      newUrl = url;
    }
    if(parmas) {
      let parmasArray = [];
      Object.keys(parmas).forEach(key => parmasArray.push(key + '=' + encodeURIComponent(parmas[key])))
      if(newUrl.search(/\?/)===-1) {
        newUrl += '?' + parmasArray.join('&')
      } else {
        newUrl += '&' + parmasArray.join('&')
      }
    }
    return new Promise (function(resolve, reject) {
      fetch(newUrl,{credentials:'include'})
        .then((response) => {
          if(response.ok) {
            return response.json()
          } else {
            if(response.status == 404) {
              console.log(response);
            }
            if(response.status >= 500){
              alert('服务器繁忙,请重试；\r\nCode:'+ response.status)
            }
          }
        })
        .then((data) => {
          if(data) {
            // 成功！
            console.log(data.msg)
            if(data.code==1008){//如果用户未登录的情况
              location.href='#/'
            }
            resolve(data)
          } else {
            // 失败
            reject(data.msg)
          }
        })
    })
  }
}
