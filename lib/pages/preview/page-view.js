import React, { Component } from "react";
import { TubState, Viewer } from "@beisen/grid-page-builder";
import {
    getCurPageTemplate,
    mergeComponents,
    getComponentClass
} from "../../utils/index";
export default class Preview extends Component {
    constructor(props, contents) {
        super(props);
        let data = JSON.parse(window.localStorage._tubState);
        let { eLementCollections } = mergeComponents();
        this.eLementCollections = eLementCollections;
        this.curTemplate = getCurPageTemplate({
            page: data
        });
        this.state = {
            tubState: TubState.create(data)
        };
    }

    handleChange = tubState => {
        this.setState({ tubState });
    };
    render() {
        return (
            <Viewer
                tubState={this.state.tubState}
                template={this.curTemplate}
                onChange={this.handleChange}
                getComponentClass={getComponentClass}
            />
        );
    }
}
