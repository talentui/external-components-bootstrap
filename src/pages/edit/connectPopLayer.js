var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//弹层的逻辑
import PopLayer from "../../components/popLayer";
import React from "react";
export default (function (Target) {
    return function (_React$Component) {
        _inherits(Connector, _React$Component);

        function Connector(props) {
            _classCallCheck(this, Connector);

            var _this = _possibleConstructorReturn(this, (Connector.__proto__ || Object.getPrototypeOf(Connector)).call(this, props));

            _this.showPop = function (content) {
                clearInterval(_this.timer);
                _this.setState({
                    pop: true,
                    content: [content]
                });
                _this.timer = setTimeout(function () {
                    _this.hidePop();
                }, 1500);
            };

            _this.state = {
                pop: false,
                content: []
            };
            return _this;
        }

        _createClass(Connector, [{
            key: "hidePop",
            value: function hidePop() {
                this.setState({
                    pop: false,
                    content: []
                });
            }
        }, {
            key: "render",
            value: function render() {
                return React.createElement(
                    "div",
                    null,
                    this.state.pop ? React.createElement(PopLayer, {
                        title: "\u4FDD\u5B58\u5931\u8D25",
                        manualClose: false,
                        content: this.state.content,
                        infoType: "1"
                    }) : null,
                    React.createElement(Target, _extends({ showPop: this.showPop }, this.props))
                );
            }
        }]);

        return Connector;
    }(React.Component);
});