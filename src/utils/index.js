import defaultTemplate from "../components/template/index";
import { PARTS_MAP, INNER_COMMON_IFRAME_KEY, COMMON_OCEAN_COMPONENT, OCEAN_APPID } from "../constants";
import innerTemplates from "@talentui/page-templates";
import componentRegistry from "@talentui/external-component-registry";
import React from "react";
import EmptyComponent from '../components/emptyComponent/index.js';
import CommonIframe from "../components/common-iframe";
import components from "&/index";

export function getQueryString(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
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
    // let {eLementCollections} = mergeComponents();
    var appId = data.appId,
        cType = data.cType,
        displayMode = data.displayMode,
        url = data.url;
    // if(displayMode === 2){
    //     return CommonIframe(url);
    // }
    // if(eLementCollections[appId] && eLementCollections[appId][cType]){
    //     return eLementCollections[appId][cType];
    // }

    var defaultComp = function defaultComp() {
        return React.createElement(
            "div",
            null,
            "\u672C\u5730\u4E0D\u5B58\u5728\u7684\u7EC4\u4EF6"
        );
    };
    return components[cType] || defaultComp;
};
//遍历组件列表，将普通iframe组件使用本地渲染
// export const componentTransfer = apps => {
//     apps.map(list => {
//         list.components.map(comp => {
//             if (comp.displayMode === 2) {
//                 let rawData = comp.editableData;
//                 Object.assign(comp, {
//                     name: INNER_COMMON_IFRAME_KEY,
//                     data: {
//                         url: comp.url
//                     }
//                 });
//             }
//         });
//     });
// };