/**
 * Created by liuzhaozhao on 2017/12/29.
 */
import React from 'react';
import {Row, Col, Tooltip, Icon} from 'antd'
import styles from './index.less'
import ScheduleForm from './ScheduleForm'


class SchedulerAdd extends React.Component {


  render(){

    return(
      <div>
        <div className='title_1'>新增调度器</div>
        <ScheduleForm/>
      </div>
    );
  }
}

export default SchedulerAdd
