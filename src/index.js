/**在这里输出所有需要打包的组件**/
import eLementCollections from "&/index.js";
import prefixAdder from "./utils/prefix";
__webpack_public_path__ = `//stnew03.beisen.com/ux/upaas/${process.env.packageName} /release/dist/`; //全局变量名
window.pb_umd_components_lists = window.pb_umd_components_lists || [];
window.pb_umd_components_lists.push(process.env.library);
export default {
    eLementCollections: prefixAdder(eLementCollections) //所有的组件
};