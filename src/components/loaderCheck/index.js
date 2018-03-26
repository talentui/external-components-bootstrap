var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//检测应用的js是否全部加载完毕
import React from "react";
import componentRegistry from "@talentui/external-component-registry";
import { ComponentJsCount } from "../../BSGlobal";

export default (function (Target) {
    return function (_React$Component) {
        _inherits(LoaderCheck, _React$Component);

        function LoaderCheck(props) {
            _classCallCheck(this, LoaderCheck);

            var _this = _possibleConstructorReturn(this, (LoaderCheck.__proto__ || Object.getPrototypeOf(LoaderCheck)).call(this, props));

            _this.check = function () {
                var obj = componentRegistry.get();
                if (Object.keys(obj).length == ComponentJsCount) {
                    clearInterval(_this.timer);
                    clearTimeout(_this.timeout);
                    _this.setState({ loaded: true });
                }
            };

            _this.state = {
                loaded: false
            };
            _this.timer = setInterval(_this.check, 30);
            //延时处理
            _this.timeout = setTimeout(function () {
                clearInterval(_this.timer);
                _this.setState({ loaded: true });
            }, 3000);
            return _this;
        }

        _createClass(LoaderCheck, [{
            key: "render",
            value: function render() {
                var loaded = this.state.loaded;

                return React.createElement(Target, { loaded: loaded });
            }
        }]);

        return LoaderCheck;
    }(React.Component);
});