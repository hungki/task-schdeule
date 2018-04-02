/**
 * Created by liuzhaozhao on 2017/12/29.
 */
import React from 'react';
import {message } from 'antd'
import request from '../../utils/request'
import ScheduleForm from './ScheduleForm'


class SchedulerEdit extends React.Component {

  render(){
    const {query={}} = this.props.location

    if(Object.keys(query).length===0){
      return(<div style={{fontSize:'16px'}}>
        请从调度器列表页面进入此页面
      </div>)
    }

    return(
      <div>
        <div className='title_1'>修改调度器</div>
        <div style={{marginTop:'50px'}}>
          <ScheduleForm value={query} onSubmit={(values)=>{
            request(`/wedtbs/scheduler/modify`,{},values).then(({data:{code,msg}})=>{
              if(code==='000000'){
                message.success('保存成功')
                this.props.history.push('/scheduler')
              }
            })
          }}/>
        </div>
      </div>
    );
  }
}

export default SchedulerEdit
