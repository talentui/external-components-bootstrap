/***
 * 请求相关
 * **/
import request from "./utils/request";
import interfaces from "./interface.js";
import { isvId } from "./interface";
import { getQueryString } from "./utils/index";

var mock = false;
/**
 * 从url中读取参数配置 pageCode pageId(可能废除) isDev
 * pageId 可以不传，pageCode必须，isDev是否是开发环境默认页面配置
 */

var _getQueryString = getQueryString(),
    _getQueryString$pageI = _getQueryString.pageId,
    pageId = _getQueryString$pageI === undefined ? "" : _getQueryString$pageI,
    pageCode = _getQueryString.pageCode,
    _getQueryString$isDev = _getQueryString.isDev,
    isDev = _getQueryString$isDev === undefined ? false : _getQueryString$isDev;

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
    if (mock) {
        return new Promise(function (resolve) {
            return resolve(interfaces.getComponentList.mock);
        });
    }
    return new Promise(function (resolve) {
        resolve(interfaces.getComponentList.mock);
        // request(
        //     `${
        //         interfaces.getComponentList.path
        //     }pageId=${pageId}&pageCode=${pageCode}`,
        //     {
        //         method: "GET"
        //     }
        // ).then(res => {
        //     //数据处理
        //     //要是是数字类型的，后端数据存储满足不了，暂时先在这里做兼容
        //     res.OperationObject.map(item => {
        //         item.components.map(comp => {
        //             if (comp.gridInitSize) {
        //                 let { w, h } = comp.gridInitSize;
        //                 comp.gridInitSize.w = parseInt(w);
        //                 comp.gridInitSize.h = parseInt(h);
        //             }
        //         });
        //     });
        //     // componentTransfer(res.OperationObject);
        //     resolve(res);
        // });
    });
};
export var savePage = function savePage(_ref) {
    var pageSettings = _ref.pageSettings,
        sectionList = _ref.sectionList,
        componentList = _ref.componentList,
        pageProperty = _ref.pageProperty;

    if (mock) {
        return new Promise(function (resolve) {
            resolve({ Code: 200 });
        });
    }
    var uiInfo = Object.assign({}, {
        pageSettings: pageSettings,
        sectionList: sectionList,
        componentList: componentList
    });
    return request(interfaces.savePage.path, {
        method: "POST",
        body: {
            pageObjectId: pageProperty.pageObjectId,
            metaname: "PageBuilder",
            funname: "SavePage",
            isvId: isvId,
            pageContent: uiInfo,
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