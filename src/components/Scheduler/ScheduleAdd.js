/**
 * Created by liuzhaozhao on 2017/12/29.
 */
import React from 'react';
import {message } from 'antd'
import request from '../../utils/request'
import ScheduleForm from './ScheduleForm'


class SchedulerAdd extends React.Component {

  render(){

    return(
      <div>
        <div className='title_1'>新增调度器</div>
        <div style={{marginTop:'50px'}}>
          <ScheduleForm onSubmit={(values)=>{
            request(`/wedtbs/scheduler/add`,{},values).then(({data:{code,msg}})=>{
              if(code==='000000'){
                message.success('新增成功')
                this.props.history.push('/scheduler')
              }
            })
          }}/>
        </div>
      </div>
    );
  }
}

export default SchedulerAdd
