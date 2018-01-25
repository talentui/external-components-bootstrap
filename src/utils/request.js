var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

// import fetch from 'dva/fetch';
// import { notification } from 'antd';

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  //   notification.error({
  //     message: `请求错误 ${response.status}: ${response.url}`,
  //     description: response.statusText,
  //   });
  var error = new Error(response.statusText);
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
export default function request(url, options) {
  var defaultOptions = {
    credentials: 'include'
  };
  var newOptions = _extends({}, defaultOptions, options);
  if (newOptions.method === 'POST' || newOptions.method === 'PUT') {
    newOptions.headers = _extends({
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8'
    }, newOptions.headers);
    newOptions.body = JSON.stringify(newOptions.body);
  }

  return fetch(url, newOptions).then(checkStatus).then(function (response) {
    return response.json();
  }).catch(function (error) {
    if (error.code) {
      // notification.error({
      //   message: error.name,
      //   description: error.message,
      // });
    }
    if ('stack' in error && 'message' in error) {
      // notification.error({
      //   message: `请求错误: ${url}`,
      //   description: error.message,
      // });
    }
    return error;
  });
}