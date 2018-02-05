/**
 * 解决 babel: ReferenceError: _regeneratorRuntime is not defined
 */
require("babel-core/register");
require("babel-polyfill");
/**在这里输出所有需要打包的组件**/
import eLementCollections from "&/index.js";
import componentRegistry from '@talentui/external-component-registry'
__webpack_public_path__ = `//stnew03.beisen.com/ux/upaas/${
    process.env.packageName
}/release/dist/`; //全局变量名

componentRegistry.push({
    eLementCollections: eLementCollections
})

// export default {
//     eLementCollections: prefixAdder(eLementCollections) //所有的组件
// };
