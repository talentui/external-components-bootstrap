var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _class2, _temp, _initialiseProps;

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
import { getQueryString, getCurPageTemplate, mergeComponents, getComponentClass } from "../../utils/index";
import componentRegistry from "@talentui/external-component-registry";
import { PARTS_MAP, BORDR_STYLE_MAP, GRID_MARGIN_MAP } from "../../constants";
import connectPopLayer from './connectPopLayer';

var App = connectPopLayer(_class = (_temp = _class2 = function (_Component) {
    _inherits(App, _Component);

    function App(props) {
        _classCallCheck(this, App);

        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

        _initialiseProps.call(_this);

        var _mergeComponents = mergeComponents(),
            eLementCollections = _mergeComponents.eLementCollections;

        _this.curTemplate = null; //当前页面所用的模版
        componentRegistry.setHook(_this.onComponentLoaded); //注册回调函数
        _this.state = {
            fetchingPage: true,
            fetchingComp: true,
            eLementCollections: eLementCollections,
            tubState: TubState.create()
        };
        return _this;
    }
    //保存


    _createClass(App, [{
        key: "savePatcher",

        //保存之前的扩展逻辑
        value: function savePatcher(tubState) {
            var onSave = this.curTemplate.onSave;

            if (onSave) {
                return new Promise(function (resolve, reject) {
                    onSave(tubState).then(function (resp) {
                        resolve(resp);
                    }).catch(function (err) {
                        reject(err);
                    });
                });
            }
            return new Promise(function (resolve) {
                resolve();
            });
        }
    }, {
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
                    document.title = OperationObject.pageProperty.title; //页面title
                    _this2.curTemplate = getCurPageTemplate({
                        page: resp.OperationObject
                    });
                    var _OperationObject$page = OperationObject.pageProperty,
                        componentFrame = _OperationObject$page.componentFrame,
                        componentSpacing = _OperationObject$page.componentSpacing;

                    _this2.setState({
                        fetchingPage: false,
                        tubState: _this2.state.tubState.setDefault(OperationObject)
                    });
                }
            });
        }
        //数据是从后端获取的 组件列表

        //扩充组件元数据

    }, {
        key: "render",
        value: function render() {
            var _state = this.state,
                fetchingComp = _state.fetchingComp,
                fetchingPage = _state.fetchingPage,
                tubState = _state.tubState,
                eLementCollections = _state.eLementCollections,
                _state$propsCollectio = _state.propsCollections,
                propsCollections = _state$propsCollectio === undefined ? {} : _state$propsCollectio;

            if (fetchingComp || fetchingPage) return null;
            var pageTemplate = this.pageTemplate,
                availableComponents = this.availableComponents,
                curTemplate = this.curTemplate;

            return React.createElement(Workspace, {
                defaultProps: {
                    component: {}
                },
                tubState: tubState,
                propsComponents: propsCollections,
                availableComponents: availableComponents,
                onSave: this.handleSave,
                onChange: this.handleChange,
                template: curTemplate,
                previewUrl: "?#preview",
                getComponentClass: getComponentClass,
                onCreateComponent: this.onCreateComponent
            });
        }
    }]);

    return App;
}(Component), _initialiseProps = function _initialiseProps() {
    var _this3 = this;

    this.onComponentLoaded = function (obj) {
        var _mergeComponents2 = mergeComponents(),
            eLementCollections = _mergeComponents2.eLementCollections;

        _this3.setState({
            eLementCollections: eLementCollections
        });
    };

    this.handleChange = function (tubState) {
        _this3.setState({ tubState: tubState });
    };

    this.handleSave = function (tubState) {
        var showPop = _this3.props.showPop;

        _this3.savePatcher(tubState).then(function (resp) {
            services.savePage(tubState).then(function (resp) {
                if (resp.Code === 200) {
                    _this3.state.tubState.setSavedState();
                }
            });
        }).catch(function (err) {
            showPop && showPop(err);
        });
    };

    this.getTempAvaliableComponents = function () {
        services.getComponentList().then(function (res) {
            _this3.availableComponents = res.OperationObject;
            _this3.setState({
                fetchingComp: false
            });
        });
    };

    this.onCreateComponent = function (component, data) {
        return Object.assign(component, {
            displayMode: data.displayMode,
            url: data.url,
            name: data.name,
            title: data.title
        });
    };
}, _temp)) || _class;

export { App as default };