import defaultTemplate from "../components/template/index";
import {
    PARTS_MAP,
    COMMON_OCEAN_COMPONENT,
    OCEAN_APPID,
    CUSTOM_OCEAN_COMPONENT,
    OCEAN_APP_ID,
    MAX_NUMBER,
    MIN_H,
    MIN_W,
    PLATFORM
} from "../constants";
import innerTemplates from "@talentui/page-templates";
import componentRegistry from "@talentui/external-component-registry";
import React from "react";
import EmptyComponent from "../components/emptyComponent/index.js";
import CommonIframe from "../components/common-iframe";
import { uid } from "../interface";
import components from '&/index'
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
    return components[cType] || EmptyComponent;
};
//保存之前序列化editableData
export const stringifyEditableData = data => {
    let pageData = data.pageSettings.editableData || {};
    data.pageSettings.editableData = JSON.stringify(pageData);
    data.componentList.forEach(comp => {
        let editableData = comp.editableData || {};
        comp.editableData = JSON.stringify(editableData);
    });
    return data;
};

//反序列化editableData
export const parseEditableData = function(data) {
    let { OperationObject } = data;
    let { pageSettings, componentList, sectionList } = OperationObject;
    let pageData = pageSettings.editableData;
    if (typeof pageData === "string" && pageData !== "") {
        pageSettings.editableData = JSON.parse(pageData);
    }
    if (pageData == "") {
        pageSettings.editableData = {};
    }
    componentList.forEach(comp => {
        let { editableData } = comp;
        if (typeof editableData === "string") {
            comp.editableData = JSON.parse(editableData);
        }
    });
    // 兼容下保存的旧尺寸限制🚫数据
    sectionList.forEach(section =>{
        let {maxH,maxW,minH,minW} = section ;
        section = Object.assign(section,{
            maxH: maxH == null ? MAX_NUMBER : maxH,
            maxW: maxW == null ? MAX_NUMBER : maxW,
            minH: minH == null ? MIN_H : minH,
            minW: minW == null ? MIN_W: minW,
        })
    })
    return data;
};
//return the current platform value : 0 / 1
export const getCurPlatForm = function() {
    const platform = getQueryString("platform");
    return platform || PLATFORM.pc;//the default value is pc
};
