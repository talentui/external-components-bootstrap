/**
 * 解决 babel: ReferenceError: _regeneratorRuntime is not defined
 */
require("babel-core/register");
require("babel-polyfill");

import eLementCollections from "&/index.js";
import componentRegistry from "@talentui/external-component-registry";
/**
 * webpack 按需加载，设置public path
*/
__webpack_public_path__ = "//stnew03.beisen.com/ux/upaas/" + process.env.packageName + "/release/dist/";
/**
 * 组件注册
*/
componentRegistry.set(process.env.appId, eLementCollections);