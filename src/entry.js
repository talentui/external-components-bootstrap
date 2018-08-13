var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import '@talentui/page-templates/dist/main.css';
// import "font-awesome/css/font-awesome.min.css";
import '@beisen/pb-svg/pb-svg.css';
import '@beisen/pb-svg/icomoon/style.css';
import '@beisen/nade-style/style.scss';
import '@beisen/up-common-css/src/scss/all.scss';
import './index.scss';
var staticPath = BSGlobal.staticPath;
if (staticPath !== "/dist/") {
    __webpack_public_path__ = staticPath;
}
//你在entry.js中1.1.15

import React, { Component } from "react";
/**
* 必需！！
* 应用组件
* 如果项目中使用了页面对代码进行拆分，需要把页面的代码通过this.props.children来访问页面组件
* 在talent-ui-2.0中如果使用了talent-ui-bootstrap作为项目的entry, 只需要export组件就可以了  version5
*/

var App = function (_React$Component) {
    _inherits(App, _React$Component);

    function App() {
        _classCallCheck(this, App);

        return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
    }

    _createClass(App, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                { className: 'containers' },
                React.createElement(
                    'div',
                    { className: 'content-wrapper' },
                    this.props.children
                )
            );
        }
    }]);

    return App;
}(React.Component);

export { App as default };