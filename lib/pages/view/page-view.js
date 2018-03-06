//pageBuilder 运行态页面
/**
 * paeg-builder预览态页面
 */
import React, { Component } from "react";
import Workspace, { TubState, Viewer } from "@beisen/grid-page-builder";
import defaultTemplate from "../../components/template";
import * as services from "../../service";
import {
    getCurPageTemplate,
    mergeComponents,
    getComponentClass
} from "../../utils/index";
import { PARTS_MAP, BORDR_STYLE_MAP, GRID_MARGIN_MAP } from "../../constants";
import componentRegistry from "@talentui/external-component-registry";

export default class View extends Component {
    constructor(props) {
        super(props);
        let { eLementCollections } = mergeComponents();
        this.curTemplate = null; //当前页面所用的模版
        componentRegistry.setHook(this.onComponentLoaded); //注册回调函数
        this.state = {
            fetchingPage: true,
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
    componentDidMount() {
        this.fetchPage();
    }
    //数据是从后端获取的 组件列表
    getTempAvaliableComponents = () => {
        services.getComponentList().then(res => {
            this.setState({
                availableComponents: res.OperationObject,
                fetchingComp: false
            });
        });
    };
    //获取页面数据
    fetchPage() {
        services.getPage().then(resp => {
            if (resp.Code === 200) {
                this.curTemplate = getCurPageTemplate({
                    page: resp.OperationObject
                });
                document.title = resp.OperationObject.pageProperty.title; //页面title
                this.setState({
                    fetchingPage: false,
                    tubState: this.state.tubState.setContent(
                        resp.OperationObject
                    )
                });
            }
        });
    }
    render() {
        let { fetchingComp, fetchingPage } = this.state;
        if (fetchingComp || fetchingPage) return null;
        let { tubState, eLementCollections } = this.state;
        let { curTemplate } = this;
        return (
            <Viewer
                tubState={tubState}
                onChange={this.handleChange}
                template={curTemplate}
                getComponentClass={getComponentClass}
            />
        );
    }
}
