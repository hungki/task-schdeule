/**
 * Created by liuzhaozhao on 2017/12/29.
 */
import React from 'react';
import {message } from 'antd'
import request from '../../utils/request'
import SettingForm from './SettingForm'


class SettingAdd extends React.Component {

  render(){

    return(
      <div>
        <div className='title_1'>新增配置项</div>
        <div style={{marginTop:'50px'}}>
          <SettingForm onSubmit={(values)=>{
            request(`/wedtbs/profiles/add`,{},values).then(({data:{code,msg}})=>{
              if(code==='000000'){
                message.success('新增成功')
                this.props.history.push('/setting')
              }
            })
          }}/>
        </div>
      </div>
    );
  }
}

export default SettingAdd
