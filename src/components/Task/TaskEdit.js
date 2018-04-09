/**
 * Created by liuzhaozhao on 2017/12/29.
 */
import React from 'react';
import {message } from 'antd'
import request from '../../utils/request'
import TaskForm from './TaskForm'


class TaskEdit extends React.Component {


  componentWillMount() {
    const { params: { name, schedulerName } } = this.props.match;
    request(`/wedtbs/task/detail`,{},{schedulerName,taskName:name}).then(({data:{code,msg,info}})=>{
      if(code!=='000000'){
        return false
      }
      this.setState({
        info:info
      })
    })
  }

  render(){

    return(
      <div>
        <div className='title_1'>编辑任务</div>
        <div style={{marginTop:'50px'}}>
          <TaskForm value={this.state.info||{}} onSubmit={(values)=>{
            request(`/wedtbs/task/modify`,{},values).then(({data:{code,msg}})=>{
              if(code==='000000'){
                message.success('修改成功')
                this.props.history.push('/task')
              }
            })
          }}/>
        </div>
      </div>
    );
  }
}

export default TaskEdit
