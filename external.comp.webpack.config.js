const path = require("path");
const fs = require("fs");
const appRoot = fs.realpathSync(process.cwd());
const { dllList } = require(path.resolve(appRoot, "./src/dll-config.js"));
module.exports = require("@talentui/umd-module-webpack-config")({
    entry: "@talentui/external-component-template-core/src/index.js",
    root: appRoot,
    dllList: dllList,
    moduleScope: path.resolve(appRoot, "./src"),
    alias: {
        "&": path.resolve(appRoot, "./src")
    }
});
