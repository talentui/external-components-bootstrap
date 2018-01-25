var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//pageBuilder 运行态页面
/**
 * paeg-builder编辑态页面
 */
import React, { Component } from "react";
import Workspace, { TubState, Viewer } from "@beisen/grid-page-builder";
import * as services from "../../service";
import { getCurPageTemplate, mergeComponents } from "../../utils/index";
import { PARTS_MAP, BORDR_STYLE_MAP, GRID_MARGIN_MAP } from "../../constants";

var App = function (_Component) {
    _inherits(App, _Component);

    function App(props) {
        _classCallCheck(this, App);

        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

        _this.handleChange = function (tubState) {
            _this.setState({ tubState: tubState });
        };

        _this.getTempAvaliableComponents = function () {
            services.getComponentList().then(function (res) {
                _this.setState({
                    availableComponents: res.OperationObject,
                    fetchingComp: false
                });
            });
        };

        var _mergeComponents = mergeComponents(),
            eLementCollections = _mergeComponents.eLementCollections,
            propsCollections = _mergeComponents.propsCollections,
            templates = _mergeComponents.templates;

        _this.eLementCollections = eLementCollections;
        _this.propsCollections = propsCollections;
        _this.templates = templates; //所有的模版集合
        _this.curTemplate = null; //当前页面所用的模版
        _this.state = {
            fetchingPage: true,
            tubState: TubState.create()
        };
        return _this;
    }

    _createClass(App, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            this.fetchPage();
        }
        //数据是从后端获取的 组件列表

    }, {
        key: "fetchPage",

        //获取页面数据
        value: function fetchPage() {
            var _this2 = this;

            services.getPage().then(function (resp) {
                if (resp.Code === 200) {
                    _this2.curTemplate = getCurPageTemplate({
                        page: resp.OperationObject
                    });
                    document.title = resp.OperationObject.pageSettings.title; //页面title
                    _this2.setState({
                        fetchingPage: false,
                        tubState: _this2.state.tubState.setContent(resp.OperationObject)
                    });
                }
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _state = this.state,
                fetchingComp = _state.fetchingComp,
                fetchingPage = _state.fetchingPage;

            if (fetchingComp || fetchingPage) return null;
            var tubState = this.state.tubState;
            var eLementCollections = this.eLementCollections,
                curTemplate = this.curTemplate;

            return React.createElement(Viewer, {
                tubState: tubState,
                components: eLementCollections,
                onChange: this.handleChange,
                template: curTemplate
            });
        }
    }]);

    return App;
}(Component);

export default App;