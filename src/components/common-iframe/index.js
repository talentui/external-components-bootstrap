var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 通用iframe渲染组件 所有 displayMode=1 的组件都走这里的渲染逻辑，
 * 和之前的旧的Ocean组件渲染逻辑类似
 */
import React from "react";
import "./index.scss";

var style = {
    border: "none",
    width: "100%",
    height: "100%"
};
export default (function (url) {
    return function (_React$Component) {
        _inherits(CommonIframeComponent, _React$Component);

        function CommonIframeComponent(props) {
            _classCallCheck(this, CommonIframeComponent);

            return _possibleConstructorReturn(this, (CommonIframeComponent.__proto__ || Object.getPrototypeOf(CommonIframeComponent)).call(this, props));
        }

        _createClass(CommonIframeComponent, [{
            key: "render",
            value: function render() {
                var mode = this.props.mode;

                var ele = React.createElement(
                    "div",
                    { className: "common-iframe-wrapper" },
                    React.createElement("iframe", { style: style, src: url, frameBorder: "0" })
                );
                if (mode == 2) {
                    return React.createElement(
                        "div",
                        { className: "iframe-holder" },
                        React.createElement("div", { className: "iframe-com-cover" }),
                        ele
                    );
                }
                return ele;
            }
        }]);

        return CommonIframeComponent;
    }(React.Component);
});