import defaultTemplate from "../components/template/index";
import {
    PARTS_MAP,
    INNER_COMMON_IFRAME_KEY,
    COMMON_OCEAN_COMPONENT,
    OCEAN_APPID
} from "../constants";
import innerTemplates from "@talentui/page-templates";
import componentRegistry from "@talentui/external-component-registry";
import React from "react";
import EmptyComponent from "../components/emptyComponent/index.js";
import CommonIframe from "../components/common-iframe";
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
export const getCurPageTemplate = ({ page }) => {
    let templates = innerTemplates.default.pbTemplates;
    let { template, parts } = page.pageProperty;
    if (templates[template]) return templates[template](PARTS_MAP[parts]);
    return templates[Object.keys(templates)[0]](PARTS_MAP[parts]); //返回一个默认的
};
//获取外部组件
export const mergeComponents = () => {
    let eLementCollections = Object.assign({}, componentRegistry.get());
    return { eLementCollections };
};
//获取需要渲染的组件class
export const getComponentClass = data => {
    let { eLementCollections } = mergeComponents();
    let { appId, cType, displayMode, url, editableData } = data;
    if (displayMode === 2 || cType === "CommonIframeComponent") {
        return CommonIframe(url || editableData.url);
    }
    if (eLementCollections[appId] && eLementCollections[appId][cType]) {
        return eLementCollections[appId][cType];
    }
    return EmptyComponent;
};
//保存之前序列化editableData
export const stringifyEditableData = data =>{
    let pageData = data.pageSettings.editableData || {};
    data.pageSettings.editableData = JSON.stringify(pageData);
    data.componentList.forEach(comp =>{
        let editableData = comp.editableData || {};
        comp.editableData = JSON.stringify(editableData);
    })
    return data
}

//反序列化editableData
export const parseEditableData = function(data) {
    let { OperationObject } = data;
    let { pageSettings , componentList } = OperationObject;
    let pageData = pageSettings.editableData;
    if (typeof pageData === "string" && pageData !== '' ) {
        pageSettings.editableData = JSON.parse(pageData);
    }
    if(pageData == ''){
        pageSettings.editableData = {}        
    }
    componentList.forEach(comp =>{
        let {editableData} = comp;
        if(typeof editableData === 'string'){
            comp.editableData = JSON.parse(editableData);
        }
    })
    return data;
};
