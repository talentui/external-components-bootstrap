//弹层的逻辑
import PopLayer from "../../components/popLayer";
import React from "react";
export default Target =>
    class Connector extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                pop: false,
                content: []
            };
        }
        showPop = content => {
            clearInterval(this.timer)
            this.setState({
                pop: true,
                content: [content]
            });
            this.timer = setTimeout(() => {
                this.hidePop();
            }, 1500);
        };
        hidePop() {
            this.setState({
                pop: false,
                content: []
            });
        }
        render() {
            return (
                <div>
                    {this.state.pop ? (
                        <PopLayer
                            title="保存失败"
                            manualClose={false}
                            content={this.state.content}
                            infoType="1"
                        />
                    ) : null}
                    <Target showPop={this.showPop} {...this.props} />
                </div>
            );
        }
    };
