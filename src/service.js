/***
 * 请求相关
 * **/
import request from "./utils/request";
import interfaces from "./interface.js";
import { isvId } from "./interface";
import { getQueryString, parseEditableData, stringifyEditableData } from "./utils/index";

var mock = false;
/**
 * pageId 可以不传，pageCode必须，
 */
var pageId = getQueryString("pageId") || "";
var pageCode = getQueryString("pageCode");
var toUserId = getQueryString("to_user_id");
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
    // if (mock) {
    return new Promise(function (resolve) {
        return resolve(interfaces.getComponentList.mock);
    });
    // }
    // return new Promise(resolve => {
    //     request(
    //         `${
    //             interfaces.getComponentList.path
    //         }pageId=${pageId}&pageCode=${pageCode}`,
    //         {
    //             method: "GET"
    //         }
    //     ).then(res => {
    //         //数据处理
    //         //要是是数字类型的，后端数据存储满足不了，暂时先在这里做兼容
    //         res.OperationObject.map(item => {
    //             item.components.map(comp => {
    //                 if (comp.gridInitSize) {
    //                     let { w, h } = comp.gridInitSize;
    //                     comp.gridInitSize.w = parseInt(w);
    //                     comp.gridInitSize.h = parseInt(h);
    //                 }
    //             });
    //         });
    //         // componentTransfer(res.OperationObject);
    //         resolve(res);
    //     });
    // });
};
export var savePage = function savePage(_ref) {
    // if (mock) {
    //     return new Promise(resolve => {
    //         resolve({ Code: 200 });
    //     });
    // }
    // let uiInfo = Object.assign(
    //     {},
    //     {
    //         pageSettings,
    //         sectionList,
    //         componentList
    //     }
    // );
    // uiInfo = stringifyEditableData(uiInfo);
    // return request(interfaces.savePage.path, {
    //     method: "POST",
    //     body: {
    //         pageCode: pageProperty.pageCode,
    //         metaname: "PageBuilder",
    //         funname: "SavePage",
    //         isvId: isvId,
    //         pageContent: uiInfo
    //     }
    // });

    var pageSettings = _ref.pageSettings,
        sectionList = _ref.sectionList,
        componentList = _ref.componentList,
        pageProperty = _ref.pageProperty;
};
export var getPage = function getPage() {
    if (mock) {
        return new Promise(function (resolve) {
            return resolve(interfaces.getPage.mock);
        });
    }
    var url = "";
    if (pageCode || pageId) {
        url = interfaces.getPage.path + "pageId=" + pageId + "&pageCode=" + pageCode;
    }
    //荣耀页面的特殊处理
    if (toUserId) {
        url = "" + interfaces.getHounorPage.path + toUserId;
    }
    return request(url, {
        method: "GET"
    }).then(function (data) {
        //后端数据兼容
        data = parseEditableData(data);
        return data;
    });
};