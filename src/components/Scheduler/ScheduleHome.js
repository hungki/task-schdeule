/**
 * Created by liuzhaozhao on 2017/12/29.
 */
import React from 'react';
import {Link } from 'dva/router';
import {Card, Button, Table} from 'antd'
import request from '../../utils/request'

export default class SchedulerHome extends React.Component {
  state = {
    list:[]
  }

  componentWillMount(){
    this.getList()
  }

  getList=(params)=>{
    request(`/wedtbs/scheduler/main`,{},{pageSize:10, pageNum:1,...params}).then(({data:{code,msg,info,...params}})=>{
      this.setState({
        list:info,
        ...params
      })
    })
  }

  render(){
    const {list=[],pageSize=10,pageNum=1,total=0}=this.state
    const columns=[{
      title: '调度器名称',
      dataIndex: 'name',
      key: 'name',
    },{
      title: '调度类型',
      dataIndex: 'type',
      key: 'type',
    },{
      title: '绑定任务名',
      dataIndex: 'bindTaskName',
      key: 'bindTaskName',
    },{
      title: '绑定任务参数',
      dataIndex: 'bindTaskParam',
      key: 'bindTaskParam',
    },{
      title: '单机最大线程组数',
      dataIndex: 'threadGroupOfOneServer',
      key: 'threadGroupOfOneServer',
    },{
      title: '集群最大线程组数',
      dataIndex: 'threadGroupOfServerList',
      key: 'threadGroupOfServerList',
    },{
      title: '机器列表',
      dataIndex: 'ipList',
      key: 'ipList',
      render:(ipList)=>{
        return <div>
          {ipList.map(ip=>(<p>{ip}</p>))}
        </div>
      }
    },{
      title: '操作',
      dataIndex: 'name',
      key: 'handle',
      render:()=>{
        return <div>
          <a>修改</a>
          <a style={{marginLeft:'10px'}}>暂停</a>
          <a style={{marginLeft:'10px'}}>删除</a>
        </div>
      }
    },]

    return(
        <div>
          <Card title={
            <div className='title_1'>
              调度器管理
            </div>
          } extra={
            <Link to={'/scheduler/add'}>
              <Button type='primary'>
                +新增调度器
              </Button>
            </Link>

          }>
            <Table dataSource={list}
                   rowKey='name'
                   columns={columns}
                   pagination={{
                     total,
                     current: pageNum * 1,
                     pageSize: pageSize * 1,
                     onChange: (num, size) => {
                       this.getList({
                         pageNum: num,
                         pageSize: size,
                       })
                     },
                   }}/>
          </Card>

        </div>
    );
  }
}
