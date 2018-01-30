const path = require("path");
const appRoot = process.cwd();
const { dllList } = require(path.resolve(appRoot, "./src/dll-config.js"));
module.exports = require("@talentui/umd-module-webpack-config")({
    entry: "@talentui/external-components-bootstrap/src/index.js",
    dllList: dllList,
    alias: {
        "&": path.resolve(appRoot, "./src")
    }
});
