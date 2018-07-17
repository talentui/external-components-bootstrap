//对照表：页面几等分:0:5、1:6、2:12等份
export const PARTS_MAP = {
    0: 5,
    1: 6,
    2: 12
};
export const BORDR_STYLE_MAP = {
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
export const GRID_MARGIN_MAP = {
    0: 10,
    1: 15,
    2: 20
};
export const CUSTOM_OCEAN_COMPONENT = "CustomOceanComponent";
export const OCEAN_APP_ID = 930;

//默认的限制尺寸
export const  MAX_NUMBER = 999999999;
export const  MIN_H = 0;
export const  MIN_W = 1;
export const DEFAULT_GRID_SIME_LIMIT = {
    minH: MIN_H,
    maxH: MAX_NUMBER,
    minW: MIN_W,
    maxW: MAX_NUMBER
};
//平台类型枚举
export const PLATFORM = {
    pc: 0,
    mobile: 1
};
