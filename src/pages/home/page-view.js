var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * paeg-builder编辑态页面
 */
import React, { Component } from "react";
import Workspace, { TubState } from "@beisen/grid-page-builder";
import { v1 } from "uuid";
import * as services from "../../service";
import { getQueryString, getCurPageTemplate, mergeComponents } from "../../utils/index";
import { PARTS_MAP, BORDR_STYLE_MAP, GRID_MARGIN_MAP } from "../../constants";

var App = function (_Component) {
    _inherits(App, _Component);

    function App(props) {
        _classCallCheck(this, App);

        // let components = mergeComponents();
        // this.eLementCollections = eLementCollections;
        // this.propsCollections = propsCollections;
        // this.templates = templates; //所有的模版集合
        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

        _this.handleChange = function (tubState) {
            _this.setState({ tubState: tubState });
        };

        _this.handleSave = function (tubState) {
            services.savePage({ tubState: tubState }).then(function (resp) {
                if (resp.Code === 200) {
                    _this.state.tubState.setSavedState();
                }
            });
        };

        _this.getTempAvaliableComponents = function () {
            services.getComponentList().then(function (res) {
                _this.availableComponents = res.OperationObject;
                _this.setState({
                    fetchingComp: false
                });
            });
        };

        _this.curTemplate = null; //当前页面所用的模版
        _this.state = {
            fetchingPage: true,
            fetchingComp: true,
            tubState: TubState.create()
        };
        return _this;
    }
    //保存


    _createClass(App, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            this.fetchPage();
            this.getTempAvaliableComponents();
        }
        //获取页面数据

    }, {
        key: "fetchPage",
        value: function fetchPage() {
            var _this2 = this;

            services.getPage().then(function (resp) {
                var Code = resp.Code,
                    OperationObject = resp.OperationObject;

                if (Code === 200) {
                    document.title = OperationObject.pageSettings.title; //页面title
                    _this2.curTemplate = getCurPageTemplate({
                        page: resp.OperationObject
                    });
                    var _OperationObject$page = OperationObject.pageSettings,
                        componentFrame = _OperationObject$page.componentFrame,
                        componentSpacing = _OperationObject$page.componentSpacing;

                    _this2.componentSpacing = componentSpacing;
                    _this2.componentFrame = componentFrame;
                    _this2.setState({
                        fetchingPage: false,
                        tubState: _this2.state.tubState.setDefault(OperationObject)
                    });
                }
            });
        }
        //数据是从后端获取的 组件列表

    }, {
        key: "render",
        value: function render() {
            var _state = this.state,
                fetchingComp = _state.fetchingComp,
                fetchingPage = _state.fetchingPage,
                tubState = _state.tubState;

            if (fetchingComp || fetchingPage) return null;
            var eLementCollections = this.eLementCollections,
                propsCollections = this.propsCollections,
                pageTemplate = this.pageTemplate,
                availableComponents = this.availableComponents,
                curTemplate = this.curTemplate;

            var a = mergeComponents();
            return React.createElement(Workspace, {
                defaultProps: {
                    component: {
                        __border__: BORDR_STYLE_MAP[this.componentFrame]
                    },
                    page: {
                        __gridItemMargin__: GRID_MARGIN_MAP[this.componentSpacing]
                    }
                },
                tubState: tubState,
                components: mergeComponents()
                // propsComponents={propsCollections}
                , availableComponents: availableComponents,
                onSave: this.handleSave,
                onChange: this.handleChange,
                template: curTemplate,
                previewUrl: "?#preview"
            });
        }
    }]);

    return App;
}(Component);

export default App;