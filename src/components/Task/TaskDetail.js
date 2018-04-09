/**
 * Created by liuzhaozhao on 2017/12/29.
 */
import React from 'react';
import {Row, Col,Table} from 'antd'
import request from '../../utils/request'


class TaskDetail extends React.Component {

  componentWillMount() {
    const {params: {name, schedulerName}} = this.props.match;
    request(`/wedtbs/task/detail`, {}, {schedulerName, taskName: name}).then(({data: {code, msg, info}}) => {
      if (code !== '000000') {
        return false
      }
      this.setState({
        ...info
      })
    })
  }

  render() {
    const {threadGroupList=[], heartBeatTime, deadTime, pageSize, excuteNum, sleepTimeOfNoData, sleepTimeOfFinish, modeOfExecute, maxTaskNumOfOneThread, startCron, stopCron} = this.state || {}
    const columns=[{
      title:'编号',
      dataIndex:'threadGroupName',
      key:'threadGroupName'
    },{
      title:'IP',
      dataIndex:'ipAddress',
      key:'ipAddress'
    },{
      title:'线程数',
      dataIndex:'threadNum',
      key:'threadNum'
    },{
      title:'执行状态',
      dataIndex:'executeStatus',
      key:'executeStatus'
    },{
      title:'执行轮数',
      dataIndex:'executeCycleCount',
      key:'executeCycleCount'
    },{
      title:'处理总量',
      dataIndex:'executeTotalCount',
      key:'executeTotalCount'
    },{
      title:'成功总量',
      dataIndex:'executeSuccessedCount',
      key:'executeSuccessedCount'
    },{
      title:'失败总量',
      dataIndex:'executeFailedCount',
      key:'executeFailedCount'
    },{
      title:'处理任务项',
      dataIndex:'executeTaskNum',
      key:'executeTaskNum'
    },]
    return (
      <div>
        <div className='title_1'>任务详情</div>
        <div style={{padding: '10px 20px'}}>
          <div style={{
            fontSize: '14px',
            lineHeight: '24px'
          }}>
            <Row>
              <Col span={6}>心跳间隔：{heartBeatTime}</Col>
              <Col span={6}>每次取数：{pageSize}</Col>
              <Col span={6}>无数据休眠：{sleepTimeOfNoData}</Col>
              <Col span={6}>处理模式：{modeOfExecute}</Col>
            </Row>
            <Row>
              <Col span={6}>死亡阈值：{deadTime}</Col>
              <Col span={6}>每次执行：{excuteNum}</Col>
              <Col span={6}>处理完休眠：{sleepTimeOfFinish}</Col>
              <Col span={6}>单线程组最大任务项：{maxTaskNumOfOneThread}</Col>
            </Row>
            <Row>
              <Col span={12}>执行开始Cron：{startCron}</Col>
              <Col span={12}>执行结束Cron：{stopCron}</Col>
            </Row>

          </div>
          <div style={{marginTop:'10px'}}>
            <Table dataSource={threadGroupList} columns={columns}  pagination={false}/>
          </div>
        </div>
      </div>
    );
  }
}

export default TaskDetail
