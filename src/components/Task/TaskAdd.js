/**
 * Created by liuzhaozhao on 2017/12/29.
 */
import React from 'react';
import {message } from 'antd'
import request from '../../utils/request'
import TaskForm from './TaskForm'


class TaskAdd extends React.Component {

  render(){

    return(
      <div>
        <div className='title_1'>新增任务</div>
        <div style={{marginTop:'50px'}}>
          <TaskForm onSubmit={(values)=>{
            request(`/wedtbs/task/add`,{},values).then(({data:{code,msg}})=>{
              if(code==='000000'){
                message.success('新增成功')
                this.props.history.push('/task')
              }
            })
          }}/>
        </div>
      </div>
    );
  }
}

export default TaskAdd
