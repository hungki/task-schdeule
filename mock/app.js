/**
 * Created by zhangbohan on 17/3/21.
 */
import Mock from 'mockjs';


export default {
    'POST /auth/erp'  (req, res) {
      res.json( Mock.mock({
        "code": "000000",
        "msg": "success",
        "data": {
          "erp":"test",
          "jobNum":"15901",
          "userName":"@cname",
          "authLists":['all','gde_setReport_cawc','gde_settings','gde_reception'],
        }
      }	))
  }
};



