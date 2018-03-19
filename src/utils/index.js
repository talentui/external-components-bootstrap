import defaultTemplate from "../components/template/index";
import { PARTS_MAP, INNER_COMMON_IFRAME_KEY, COMMON_OCEAN_COMPONENT, OCEAN_APPID } from "../constants";
import innerTemplates from "@talentui/page-templates";
import componentRegistry from "@talentui/external-component-registry";
import React from "react";
import EmptyComponent from "../components/emptyComponent/index.js";
import CommonIframe from "../components/common-iframe";
import components from '&/index';
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
    // let { eLementCollections } = mergeComponents();
    var appId = data.appId,
        cType = data.cType,
        displayMode = data.displayMode,
        url = data.url,
        editableData = data.editableData;
    // if (displayMode === 2 || cType === "CommonIframeComponent") {
    //     return CommonIframe(url || editableData.url);
    // }
    // if (eLementCollections[appId] && eLementCollections[appId][cType]) {
    //     return eLementCollections[appId][cType];
    // }

    return components[cType] || EmptyComponent;
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
        componentList = OperationObject.componentList;

    var pageData = pageSettings.editableData;
    if (typeof pageData === "string" && pageData !== '') {
        pageSettings.editableData = JSON.parse(pageData);
    }
    if (pageData == '') {
        pageSettings.editableData = {};
    }
    componentList.forEach(function (comp) {
        var editableData = comp.editableData;

        if (typeof editableData === 'string') {
            comp.editableData = JSON.parse(editableData);
        }
    });
    return data;
};