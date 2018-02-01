//组件注册防范，防恶意篡改
export default function componentRegistry() {
    const componentList = [];
    const apiObj = {};
    Object.defineProperty(apiObj, 'push', {
        value: function (component) {
            if (true) {//check something here
                componentList.push(component);
            }
        },
        writable: false,
        enumerable: false,
        configurable: false
    })
    Object.defineProperty(apiObj, 'get', {
        value: function () {
            return componentList
        },
        writable: false,
        enumerable: false,
        configurable: false
    })
    return apiObj;
}