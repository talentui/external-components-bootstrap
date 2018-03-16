var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp, _initialiseProps;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//pageBuilder 运行态页面
/**
 * paeg-builder预览态页面
 */
import React, { Component } from "react";
import Workspace, { TubState, Viewer } from "@beisen/grid-page-builder";
import defaultTemplate from "../../components/template";
import * as services from "../../service";
import { getCurPageTemplate, mergeComponents, getComponentClass } from "../../utils/index";
import { PARTS_MAP, BORDR_STYLE_MAP, GRID_MARGIN_MAP } from "../../constants";
import componentRegistry from "@talentui/external-component-registry";

var View = (_temp = _class = function (_Component) {
    _inherits(View, _Component);

    function View(props) {
        _classCallCheck(this, View);

        var _this = _possibleConstructorReturn(this, (View.__proto__ || Object.getPrototypeOf(View)).call(this, props));

        _initialiseProps.call(_this);

        var _mergeComponents = mergeComponents(),
            eLementCollections = _mergeComponents.eLementCollections;

        _this.curTemplate = null; //当前页面所用的模版
        componentRegistry.setHook(_this.onComponentLoaded); //注册回调函数
        _this.state = {
            fetchingPage: true,
            eLementCollections: eLementCollections,
            tubState: TubState.create()
        };
        return _this;
    }

    _createClass(View, [{
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
                    document.title = resp.OperationObject.pageProperty.title; //页面title
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
            var _state2 = this.state,
                tubState = _state2.tubState,
                eLementCollections = _state2.eLementCollections;
            var curTemplate = this.curTemplate;

            return React.createElement(Viewer, {
                tubState: tubState,
                onChange: this.handleChange,
                template: curTemplate,
                getComponentClass: getComponentClass
            });
        }
    }]);

    return View;
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

    this.getTempAvaliableComponents = function () {
        services.getComponentList().then(function (res) {
            _this3.setState({
                availableComponents: res.OperationObject,
                fetchingComp: false
            });
        });
    };
}, _temp);
export { View as default };