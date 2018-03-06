import defaultTemplate from "../components/template/index";
import { PARTS_MAP, INNER_COMMON_IFRAME_KEY, COMMON_OCEAN_COMPONENT, OCEAN_APPID } from "../constants";
import innerTemplates from "@talentui/page-templates";
import componentRegistry from "@talentui/external-component-registry";
import React from "react";
import EmptyComponent from '../components/emptyComponent/index.js'
import CommonIframe from "../components/common-iframe";
import components from "&/index";

export function getQueryString() {
    //获取Url上的参数，以{}返回
    let hash = location.hash;
    let queryObject = {};
    let markIndex = hash.indexOf("?");
    // contain query string in fragments
    if (markIndex > -1) {
        // build query object
        let queryString = hash.slice(markIndex + 1);
        let queryArray = queryString.split("&");
        for (let i = 0; i < queryArray.length; i++) {
            let queryPair = queryArray[i].split("=");
            if (queryPair[0] !== "_k") {
                queryObject[queryPair[0]] = decodeURIComponent(queryPair[1]);
            }
        }
    }
    return queryObject;
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
export const getComponentClass=(data)=>{
    // let {eLementCollections} = mergeComponents();
    let {appId, cType, displayMode, url} = data;
    // if(displayMode === 2){
    //     return CommonIframe(url);
    // }
    // if(eLementCollections[appId] && eLementCollections[appId][cType]){
    //     return eLementCollections[appId][cType];
    // }
    const defaultComp = ()=>{
        return <div>本地不存在的组件</div>
    }
    return components[cType] || defaultComp;
}
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
