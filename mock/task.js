/**
 * Created by zhangbohan on 17/3/21.
 */
import Mock from 'mockjs';



let all = Mock.mock({
  'task|23': [
    {
      name: '@cword(3,5)',
      schedulerName: '@cword(3,5)',
      speingBean: '@word(5,10)',
      serverList: ['192.168.0.1','192.168.0.2','192.168.0.3'],
      registerTime: '@datetime',
      lastExcuteTime: '@datetime',
      nextExcuteTime: '@datetime',
      nextStopExcuteTime: '@datetime',
      'status|1':['0','1'],
    }
  ],
})

export default {
  'POST /wedtbs/task/queryByScheduler': (req, res)=> {
    let {pageNum = 1, pageSize = 10} = req.params;
    pageNum *= 1;
    pageSize *= 1;
    let list = all.task;
    const info = list.slice((pageNum - 1) * pageSize, pageNum * pageSize);
    res.json({code: '000000', msg: "success", total: list.length, pageNum, pageSize, info})
  },
  'POST /wedtbs/task/execute': (req, res)=> {
    res.json({code: '000000', msg: "success"})
  },
  'POST /wedtbs/task/delete': (req, res)=> {
    res.json({code: '000000', msg: "success"})
  },
  'POST /wedtbs/task/add': (req, res)=> {
    res.json({code: '000000', msg: "success"})
  },
};



