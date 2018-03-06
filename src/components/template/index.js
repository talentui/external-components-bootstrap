var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component, PropTypes } from "react";
//支持grid分数的配置
export default (function () {
    var _class, _temp;

    var grid = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 5;
    return _temp = _class = function (_Component) {
        _inherits(FreeLayout, _Component);

        function FreeLayout() {
            _classCallCheck(this, FreeLayout);

            return _possibleConstructorReturn(this, (FreeLayout.__proto__ || Object.getPrototypeOf(FreeLayout)).apply(this, arguments));
        }

        _createClass(FreeLayout, [{
            key: "render",
            value: function render() {
                var connectLayoutItem = this.props.connectLayoutItem;

                return connectLayoutItem("layout1", grid)(React.createElement("div", { className: "pg-tmpl-defaul" }));
            }
        }]);

        return FreeLayout;
    }(Component), _class.defaultTemplateProps = ["__background__", "__toTop__"], _temp;
});