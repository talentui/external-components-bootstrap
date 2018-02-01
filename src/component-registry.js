//组件注册防范，防恶意篡改
export default function componentRegistry() {
    var componentList = [];
    var apiObj = {};
    Object.defineProperty(apiObj, 'push', {
        value: function value(component) {
            if (true) {
                //check something here
                componentList.push(component);
            }
        },
        writable: false,
        enumerable: false,
        configurable: false
    });
    Object.defineProperty(apiObj, 'get', {
        value: function value() {
            return componentList;
        },
        writable: false,
        enumerable: false,
        configurable: false
    });
    return apiObj;
}