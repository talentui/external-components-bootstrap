//对照表：页面几等分:0:5、1:6、2:12等份
export var PARTS_MAP = {
    0: 5,
    1: 6,
    2: 12
};
export var BORDR_STYLE_MAP = {
    0: {
        borderStyle: "shadow",
        hasBorder: false
    },
    1: {
        borderStyle: "shadow",
        hasBorder: true
    },
    2: {
        borderStyle: "solid",
        hasBorder: true
    }
};
export var GRID_MARGIN_MAP = {
    0: 10,
    1: 15,
    2: 20
};
export var CUSTOM_OCEAN_COMPONENT = "CustomOceanComponent";
export var OCEAN_APP_ID = 930;

//默认的限制尺寸
export var MAX_NUMBER = 999999999;
export var MIN_H = 0;
export var MIN_W = 1;
export var DEFAULT_GRID_SIME_LIMIT = {
    minH: MIN_H,
    maxH: MAX_NUMBER,
    minW: MIN_W,
    maxW: MAX_NUMBER
};