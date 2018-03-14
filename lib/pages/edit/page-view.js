/**
 * paeg-builder编辑态页面
 */
import React, { Component } from "react";
import Workspace, { TubState } from "@beisen/grid-page-builder";
import { v1 } from "uuid";
import * as services from "../../service";
import {
    getQueryString,
    getCurPageTemplate,
    mergeComponents,
    getComponentClass
} from "../../utils/index";
import componentRegistry from "@talentui/external-component-registry";
import { PARTS_MAP, BORDR_STYLE_MAP, GRID_MARGIN_MAP } from "../../constants";

export default class App extends Component {
    constructor(props) {
        super(props);
        let { eLementCollections } = mergeComponents();
        this.curTemplate = null; //当前页面所用的模版
        componentRegistry.setHook(this.onComponentLoaded); //注册回调函数
        this.state = {
            fetchingPage: true,
            fetchingComp: true,
            eLementCollections,
            tubState: TubState.create()
        };
    }
    onComponentLoaded = obj => {
        let { eLementCollections } = mergeComponents();
        this.setState({
            eLementCollections
        });
    };
    handleChange = tubState => {
        this.setState({ tubState });
    };
    //保存
    handleSave = tubState => {
        // services.savePage(tubState).then(resp => {
        //     if (resp.Code === 200) {
        //         this.state.tubState.setSavedState();
        //     }
        // });
    };
    componentDidMount() {
        this.fetchPage();
        this.getTempAvaliableComponents();
    }
    //获取页面数据
    fetchPage() {
        services.getPage().then(resp => {
            let { Code, OperationObject } = resp;
            if (Code === 200) {
                document.title = OperationObject.pageProperty.title; //页面title
                this.curTemplate = getCurPageTemplate({
                    page: resp.OperationObject
                });
                let {
                    componentFrame,
                    componentSpacing
                } = OperationObject.pageProperty;
                this.componentSpacing = componentSpacing;//组件间距
                this.componentFrame = componentFrame;//组件边框
                this.setState({
                    fetchingPage: false,
                    tubState: this.state.tubState.setDefault(OperationObject)
                });
            }
        });
    }
    //数据是从后端获取的 组件列表
    getTempAvaliableComponents = () => {
        services.getComponentList().then(res => {
            this.availableComponents = res.OperationObject;
            this.setState({
                fetchingComp: false
            });
        });
    };
     //扩充组件元数据
     onCreateComponent = (component, data) => {
        return Object.assign(component, {
            displayMode: data.displayMode,
            url: data.url
        });
    };
    

    render() {
        let {
            fetchingComp,
            fetchingPage,
            tubState,
            eLementCollections,
            propsCollections = {}
        } = this.state;
        if (fetchingComp || fetchingPage) return null;
        let { pageTemplate, availableComponents, curTemplate } = this;
        return (
            <Workspace
                defaultProps={{
                    component: {
                        __border__: BORDR_STYLE_MAP[this.componentFrame]
                    },
                    page: {
                        __gridItemMargin__:
                            GRID_MARGIN_MAP[this.componentSpacing]
                    }
                }}
                tubState={tubState}
                propsComponents={propsCollections}
                availableComponents={availableComponents}
                onSave={this.handleSave}
                onChange={this.handleChange}
                template={curTemplate}
                previewUrl={"?#preview"}
                getComponentClass={getComponentClass}
                onCreateComponent={this.onCreateComponent}
            />
        );
    }
}
