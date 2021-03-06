import '@talentui/page-templates/dist/main.css'
import "font-awesome/css/font-awesome.min.css";
import '@beisen/pb-svg/pb-svg.css';
import '@beisen/pb-svg/icomoon/style.css';
import '@beisen/nade-style/style.scss';
import '@beisen/up-common-css/src/scss/all.scss';
import './index.scss'
const staticPath = BSGlobal.staticPath;
if (staticPath !== "/dist/") {
    __webpack_public_path__ = staticPath;
}
 //你在entry.js中1.1.15

 import React, { Component } from "react";
  /**
  * 必需！！
  * 应用组件
  * 如果项目中使用了页面对代码进行拆分，需要把页面的代码通过this.props.children来访问页面组件
  * 在talent-ui-2.0中如果使用了talent-ui-bootstrap作为项目的entry, 只需要export组件就可以了  version5
  */
  
 export default class App extends React.Component {
     render() {
         return (
             <div className='containers'>
                 <div className="content-wrapper">
                     {this.props.children}
                 </div>
             </div>
         );
     }
 }
 
 