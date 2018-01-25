/***
 * 请求相关
 * **/
import request from "./utils/request";
import interfaces from "./interface.js";
import { isvId } from "./interface";
import { getQueryString, componentTransfer } from "./utils/index";

var mock = window.location.hostname == "localhost";
/**
 * 从url中读取参数配置 pageCode pageId(可能废除) isDev
 */

var _getQueryString = getQueryString(),
    _getQueryString$pageI = _getQueryString.pageId,
    pageId = _getQueryString$pageI === undefined ? "" : _getQueryString$pageI,
    pageCode = _getQueryString.pageCode,
    _getQueryString$isDev = _getQueryString.isDev,
    isDev = _getQueryString$isDev === undefined ? false : _getQueryString$isDev; //pageId 可以不传，pageCode必须，isDev是否是开发环境默认页面配置

/**
 * mock 装饰器函数
 */


var mockDecorator = function mockDecorator(fn) {
    if (mock) {}
    return fn;
};

/**
 * 实际的数据请求方法
 */
export var getComponentList = function getComponentList() {
    return new Promise(function (resolve) {
        return resolve(interfaces.getComponentList.mock);
    });
};
export var savePage = function savePage(_ref) {
    var tubState = _ref.tubState;

    if (mock) {
        return new Promise(function (resolve) {
            resolve({ Code: 200 });
        });
    }
    return request(interfaces.savePage.path, {
        method: "POST",
        body: {
            metaname: "PageBuilder",
            funname: "SavePage",
            isvId: isvId,
            uiInfo: tubState,
            isDev: isDev
        }
    });
};
export var getPage = function getPage() {
    if (mock) {
        return new Promise(function (resolve) {
            return resolve(interfaces.getPage.mock);
        });
    }
    return request(interfaces.getPage.path + "pageId=" + pageId + "&pageCode=" + pageCode + "&isDev=" + isDev, {
        method: "GET"
    });
};