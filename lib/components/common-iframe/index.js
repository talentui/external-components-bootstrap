/**
 * 通用iframe渲染组件 所有 displayMode=1 的组件都走这里的渲染逻辑，
 * 和之前的旧的Ocean组件渲染逻辑类似
 */
import React from "react";
import "./index.scss";

const style = {
    border: "none",
    width: "100%",
    height: "100%"
};
export default url =>
    class CommonIframeComponent extends React.Component {
        constructor(props) {
            super(props);
        }

        render() {
            let { mode } = this.props;
            let ele = (
                <div className="common-iframe-wrapper">
                    <iframe style={style} src={url} frameBorder="0" />
                </div>
            );
            if (mode == 2) {
                return (
                    <div className="iframe-holder">
                        <div className="iframe-com-cover" />
                        {ele}
                    </div>
                );
            }
            return ele;
        }
    };
