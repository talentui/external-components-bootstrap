/***
 * 接口
 * **/
export const uid = BSGlobal.loginUserInfo.Id;
export const tenantId = BSGlobal.tenantInfo.Id;
export const isvId = BSGlobal.isv;

const baseUrlV1 = BSGlobal.apiPath + "/api/" + "v1/" + tenantId + "/" + uid;
const baseUrlV2 = BSGlobal.apiPath + "/api/" + "v2/" + tenantId + "/" + uid;
import * as mockData from "./mock-data";

export default {
    getComponentList: {
        path: `${baseUrlV1}/proxy/GetUPaaSCoreGateway?metaname=PageBuilderManagement&funname=GetComponentList&`,
        mock: mockData.componentList
    },
    savePage: {
        path: `${baseUrlV1}/proxy/PostUPaaSCoreGateway`,
        mock: null
    },
    getPage: {
        path: `${baseUrlV1}/proxy/GetUPaaSCoreGateway?metaname=PageBuilder&funname=GetPage&`,
        mock: mockData.pageData
    },
    //获取荣耀页面的数据，暂时特殊处理
    getHounorPage:{
        path:`${baseUrlV1}/proxy/GetUPaaSCoreGateway?metaname=PageBuilder&funname=GetHonourPageByIdentity&isvId=${isvId}&to_user_id=`
    }
};
