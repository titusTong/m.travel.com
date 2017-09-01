import fetch from 'dva/fetch';

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, params,type) {
  let newUrl = `http://47.93.224.33:8001/${url}`;
  let options = {
    method:type,
    header:{
      'Accept':'application/json',
      'Content-Type':'application/json'
    },
    body:JSON.stringify(params)
  }
  if(type==='GET') {
    if(params) {
      let paramsArray = [];
      Object.keys(params).forEach(key => paramsArray.push(key + '=' + encodeURIComponent(params[key])))
      if(newUrl.search(/\?/)===-1) {
        newUrl += '?' + paramsArray.join('&')
      } else {
        newUrl += '&' + paramsArray.join('&')
      }
    }
    options = {};
  }
  return fetch(newUrl,options)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => ({ data }))
    .catch(err => ({ err }));
}
