import defaultTemplate from "../components/template/index";
import { PARTS_MAP, COMMON_OCEAN_COMPONENT, OCEAN_APPID, CUSTOM_OCEAN_COMPONENT, OCEAN_APP_ID, MAX_NUMBER, MIN_H, MIN_W } from "../constants";
import innerTemplates from "@talentui/page-templates";
import componentRegistry from "@talentui/external-component-registry";
import React from "react";
import EmptyComponent from "../components/emptyComponent/index.js";
import CommonIframe from "../components/common-iframe";
import { uid } from "../interface";
import component from '&/index';
export function getQueryString(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
//依据页面信息获取当前页面所用的页面模版
export var getCurPageTemplate = function getCurPageTemplate(_ref) {
    var page = _ref.page;

    var templates = innerTemplates.default.pbTemplates;
    var _page$pageProperty = page.pageProperty,
        template = _page$pageProperty.template,
        parts = _page$pageProperty.parts;

    if (templates[template]) return templates[template](PARTS_MAP[parts]);
    return templates[Object.keys(templates)[0]](PARTS_MAP[parts]); //返回一个默认的
};
//获取外部组件
export var mergeComponents = function mergeComponents() {
    var eLementCollections = Object.assign({}, componentRegistry.get());
    return { eLementCollections: eLementCollections };
};
//获取需要渲染的组件class
export var getComponentClass = function getComponentClass(data) {
    var _mergeComponents = mergeComponents(),
        eLementCollections = _mergeComponents.eLementCollections;

    var appId = data.appId,
        cType = data.cType,
        displayMode = data.displayMode,
        url = data.url,
        editableData = data.editableData;
    // let path = `${
    //     BSGlobal.titaHost
    // }/${uid}/widget/iframecomponent?componentName=${cType}&appId=${appId}&to_user_id=${uid}`;
    // //ocean组件的特殊处理模式
    // if (appId === OCEAN_APP_ID) {
    //     if (cType === CUSTOM_OCEAN_COMPONENT) {
    //         if (
    //             eLementCollections[OCEAN_APP_ID] &&
    //             eLementCollections[OCEAN_APP_ID][cType]
    //         ) {
    //             return eLementCollections[OCEAN_APP_ID][cType];
    //         }
    //         return EmptyComponent;
    //     }
    //     return CommonIframe(path);
    // }
    // if (displayMode === 2 || cType === "CommonIframeComponent") {
    //     // let path = `/${uid}/${url || editableData.url}`
    //     return CommonIframe(path);
    // }
    // if (eLementCollections[appId] && eLementCollections[appId][cType]) {
    //     return eLementCollections[appId][cType];
    // }

    return component || EmptyComponent;
};
//保存之前序列化editableData
export var stringifyEditableData = function stringifyEditableData(data) {
    var pageData = data.pageSettings.editableData || {};
    data.pageSettings.editableData = JSON.stringify(pageData);
    data.componentList.forEach(function (comp) {
        var editableData = comp.editableData || {};
        comp.editableData = JSON.stringify(editableData);
    });
    return data;
};

//反序列化editableData
export var parseEditableData = function parseEditableData(data) {
    var OperationObject = data.OperationObject;
    var pageSettings = OperationObject.pageSettings,
        componentList = OperationObject.componentList,
        sectionList = OperationObject.sectionList;

    var pageData = pageSettings.editableData;
    if (typeof pageData === "string" && pageData !== "") {
        pageSettings.editableData = JSON.parse(pageData);
    }
    if (pageData == "") {
        pageSettings.editableData = {};
    }
    componentList.forEach(function (comp) {
        var editableData = comp.editableData;

        if (typeof editableData === "string") {
            comp.editableData = JSON.parse(editableData);
        }
    });
    // 兼容下保存的旧尺寸限制🚫数据
    sectionList.forEach(function (section) {
        var _section = section,
            maxH = _section.maxH,
            maxW = _section.maxW,
            minH = _section.minH,
            minW = _section.minW;

        section = Object.assign(section, {
            maxH: maxH == null ? MAX_NUMBER : maxH,
            maxW: maxW == null ? MAX_NUMBER : maxW,
            minH: minH == null ? MIN_H : minH,
            minW: minW == null ? MIN_W : minW
        });
    });
    return data;
};