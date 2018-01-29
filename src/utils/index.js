import { PARTS_MAP } from "../constants";
import innerTemplates from "@talentui/page-templates";
import components from '&/index';
export function getQueryString() {
    //获取Url上的参数，以{}返回
    var hash = location.hash;
    var queryObject = {};
    var markIndex = hash.indexOf("?");
    // contain query string in fragments
    if (markIndex > -1) {
        // build query object
        var queryString = hash.slice(markIndex + 1);
        var queryArray = queryString.split("&");
        for (var i = 0; i < queryArray.length; i++) {
            var queryPair = queryArray[i].split("=");
            if (queryPair[0] !== "_k") {
                queryObject[queryPair[0]] = decodeURIComponent(queryPair[1]);
            }
        }
    }
    return queryObject;
}
//依据页面信息获取当前页面所用的页面模版
export var getCurPageTemplate = function getCurPageTemplate(_ref) {
    var page = _ref.page;

    var templates = innerTemplates.pbTemplates;
    var _page$pageSettings = page.pageSettings,
        template = _page$pageSettings.template,
        parts = _page$pageSettings.parts;

    if (templates[template]) return templates[template](PARTS_MAP[parts]);
    return templates[Object.keys(templates)[0]](PARTS_MAP[parts]); //返回一个默认的
};
//得到本地的组件
export var mergeComponents = function mergeComponents() {
    return components;
};
//遍历组件列表，将普通iframe组件使用本地渲染
export var componentTransfer = function componentTransfer(apps) {
    apps.map(function (list) {
        list.components.map(function (comp) {
            if (comp.displayMode === 2) {
                var rawData = comp.editableData;
                Object.assign(comp, {
                    name: "CommonIframe",
                    data: {
                        url: comp.url
                    }
                });
            }
        });
    });
};