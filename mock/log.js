/**
 * Created by zhangbohan on 17/3/21.
 */
import Mock from 'mockjs';



let all = Mock.mock({
  'log|23': [
    {
      no: '@id',
      startTime: '@datetime',
      endTime: '@datetime',
      result: '@cword(2,3)',
      'taskItems|1':[1,2,3,4,5],
      desc: '@word(20,50)',
    }
  ],
})

export default {
  'POST /wedtbs/logs/query': (req, res)=> {
    let {pageNum = 1, pageSize = 10} = req.params;
    pageNum *= 1;
    pageSize *= 1;
    let list = all.log;
    const info = list.slice((pageNum - 1) * pageSize, pageNum * pageSize);
    res.json({code: '000000', msg: "success", total: list.length, pageNum, pageSize, info})
  },
};



