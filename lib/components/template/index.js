import React, { Component, PropTypes } from "react";
//支持grid分数的配置
export default (grid = 5) =>
    class FreeLayout extends Component {
        static defaultTemplateProps = ["__background__","__toTop__"]
        render() {
            let { connectLayoutItem } = this.props;
            return connectLayoutItem("layout1", grid)(
                <div className="pg-tmpl-defaul" />
            );
        }
    };
