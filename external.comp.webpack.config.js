const path = require("path");
const appRoot = process.cwd();
const { dllList } = require(path.resolve(appRoot, "./src/dll-config.js"));
module.exports = require("@talentui/external-components-webpack-config")({
    entry: ["babel-polyfill", "@talentui/external-components-bootstrap"],
    dllList: dllList,
    alias: {
        "&": path.resolve(appRoot, "./src")
    }
});
