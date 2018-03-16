// 这是使用pop-Layer封装的提示弹层
import React, { Component } from 'react';
import PopLayer from '@beisen/pop-layer';
import './index.scss';

const PopData = {
    "hidden": false, //是否使用组件
    "popType": "0",
    /**共2种：为"0"时，是提示弹层；为"1"时，是确认弹层**/
    "disappearTime": "1500", //自动消失时间，默认为1.5s，可选值有1.5,3,5,10
    "target": "",
    "left": 0,
    "top": 0
}

const PopLayerPrompt = function (props) {
    const { left, top } = props;

    return <div className='upaas-pop-layer-prompt' style={{ left: left && left, top: top && top }} ><PopLayer {...PopData} {...props} /></div>
}

export default PopLayerPrompt;

