/**
 * Created by zhangbohan on 17/3/21.
 */
import Mock from 'mockjs';



let all = Mock.mock({
  'setting|23': [
    {
      no: '@id',
      alias: '@cword(3,5)',
      zkPath: '@word(10,20)',
      zkTimeOut: '6000',
      'zkAddress|1': ['192.168.0.1','192.168.0.2','192.168.0.3'],
      userName: '@cname',
      pwd: 'admin',
    }
  ],
})

export default {
  'POST /wedtbs/profiles/main': (req, res)=> {
    let {pageNum = 1, pageSize = 10} = req.params;
    pageNum *= 1;
    pageSize *= 1;
    let list = all.setting;
    const info = list.slice((pageNum - 1) * pageSize, pageNum * pageSize);
    res.json({code: '000000', msg: "success", total: list.length, pageNum, pageSize, info})
  },
  'POST /wedtbs/profiles/delete': (req, res)=> {
    res.json({code: '000000', msg: "success"})
  },
  'POST /wedtbs/profiles/add': (req, res)=> {
    res.json({code: '000000', msg: "success"})
  },
  'POST /wedtbs/profiles/modify': (req, res)=> {
    res.json({code: '000000', msg: "success"})
  },

};



