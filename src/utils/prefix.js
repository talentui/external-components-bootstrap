var prefixAdder = function prefixAdder(rawObj) {
    var keys = Object.keys(rawObj || {});
    var obj = {};
    var prefix = "App" + process.env.appId;
    for (var i = 0; i < keys.length; i++) {
        obj[prefix + "_" + keys[i]] = rawObj[keys[i]];
    }
    return obj;
};
export default prefixAdder;