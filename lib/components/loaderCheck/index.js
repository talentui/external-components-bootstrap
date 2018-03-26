//检测应用的js是否全部加载完毕
import React from "react";
import componentRegistry from "@talentui/external-component-registry";
import { ComponentJsCount } from "../../BSGlobal";

export default Target =>
    class LoaderCheck extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                loaded: false
            };
            this.timer = setInterval(this.check, 30);
            //延时处理
            this.timeout = setTimeout(() => {
                clearInterval(this.timer);
                this.setState({ loaded: true });
            }, 3000);
        }
        check = () => {
            let obj = componentRegistry.get();
            if (Object.keys(obj).length == ComponentJsCount) {
                clearInterval(this.timer);
                clearTimeout(this.timeout)
                this.setState({ loaded: true });
            }
        };
        render() {
            let {loaded} = this.state;
            return <Target {...{loaded}}/> 
        }
    };
