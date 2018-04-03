/**
 * Created by zhangbohan on 17/3/21.
 */
import Mock from 'mockjs';



let all = Mock.mock({
  'schedulers|23': [
    {
      name: '@cword(3,5)',
      bindTaskName: '@cword(3,5)',
      bindTaskParam: '@word(5,10)',
      type: '@cword(2,3)',
      threadGroupOfOneServer: '4',
      threadGroupOfServerList: '5',
      'registerType|1':['0','1'],
      'status|1':['0','1'],
      ipList: ['192.168.0.1','192.168.0.2','192.168.0.3'],
    }
  ],
})

export default {
  'POST /wedtbs/scheduler/main': (req, res)=> {
    let {pageNum = 1, pageSize = 10} = req.params;
    pageNum *= 1;
    pageSize *= 1;
    let list = all.schedulers;
    const info = list.slice((pageNum - 1) * pageSize, pageNum * pageSize);
    res.json({code: '000000', msg: "success", total: list.length, pageNum, pageSize, info})
  },
  'POST /wedtbs/scheduler/add': (req, res)=> {
    res.json({code: '000000', msg: "success"})
  },
  'POST /wedtbs/scheduler/modify': (req, res)=> {
    res.json({code: '000000', msg: "success"})
  },
  'POST /wedtbs/scheduler/pause': (req, res)=> {
    res.json({code: '000000', msg: "success"})
  },
  'POST /wedtbs/scheduler/resume': (req, res)=> {
    res.json({code: '000000', msg: "success"})
  },
  'POST /wedtbs/scheduler/delete': (req, res)=> {
    res.json({code: '000000', msg: "success"})
  },
};



