/**
 * Created by zhangbohan on 17/3/21.
 */
import Mock from 'mockjs';


export default {
    'POST /wedtbs/main'  (req, res) {
      res.json( Mock.mock({
        "code": "000000",
        "msg": "success",
        "info": {
          "totalCount":{
            "now": 13,
            "successed": '1234567890',
            "fialed": '1234567890'
          },
          taskList:[
            {
              "name": 'task1Name',
              "status": '0',
            },{
              "name": 'task2Name',
              "status": '1',
            },{
              "name": 'task3Name',
              "status": '0',
            },{
              "name": 'task4Name',
              "status": '1',
            },{
              "name": 'task1Name',
              "status": '0',
            },{
              "name": 'task2Name',
              "status": '1',
            },{
              "name": 'task3Name',
              "status": '0',
            },{
              "name": 'task4Name',
              "status": '1',
            },
          ],
          chartImage:[
            {
              "name": 'success',
              "count": '99',
            },{
              "name": 'task1Name',
              "count": '20',
            },{
              "name": 'task2Name',
              "count": '9',
            },{
              "name": 'task3Name',
              "count": '32',
            },
          ],
          "logs":[
            'abcdkdjgklajgoajglanglajlfaj',
            'aaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
            'bbbbbbbbbbbbbbbbbbbbb',
          ],
        }
      }	))
  }
};



