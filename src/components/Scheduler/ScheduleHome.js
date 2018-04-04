/**
 * Created by liuzhaozhao on 2017/12/29.
 */
import React from 'react';
import {Link } from 'dva/router';
import {Card, Button, Table, Popconfirm, message} from 'antd'
import request from '../../utils/request'
import styles from './index.less'

export default class SchedulerHome extends React.Component {
  state = {
    list:[],
    pageSize:10,
    pageNum:1
  }

  componentWillMount(){
    this.getList()
  }

  getList=(params)=>{
    const {pageSize=10, pageNum=1}=this.state
    request(`/wedtbs/scheduler/main`,{},{pageSize, pageNum,...params}).then(({data:{code,msg,info,...params}})=>{
      this.setState({
        list:info,
        ...params
      })
    })
  };

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
      render:(name,record)=>{
        return <div>
          <Link to={{pathname:'/scheduler/edit',query:record}}>
            <span className={styles.link}>修改</span>
          </Link>
          {
            // eslint-disable-next-line
            record.status==0?
            <Popconfirm title={<div>确认暂停调度器<span style={{color:'red'}}>{name}</span>吗？</div>}
                        okText="确认"
                        cancelText="取消"
                        onConfirm={()=>{
                          request(`/wedtbs/scheduler/pause`,{},{name,bindTaskName:record.bindTaskName}).then(({data:{code,msg}})=>{
                            if(code==='000000'){
                              message.success(`调度器${name}已暂停!`)
                              this.getList();
                            }else {
                              message.error(msg)
                            }
                          })
                        }} >
              <span className={styles.link}>暂停</span>
            </Popconfirm>
            :
            <Popconfirm title={<div>确认恢复调度器<span style={{color:'red'}}>{name}</span>吗？</div>}
                        okText="确认"
                        cancelText="取消"
                        onConfirm={()=>{
                          request(`/wedtbs/scheduler/resume`,{},{name,bindTaskName:record.bindTaskName}).then(({data:{code,msg}})=>{
                            if(code==='000000'){
                              message.success(`调度器${name}已恢复!`)
                              this.getList();
                            }else {
                              message.error(msg)
                            }
                          })
                        }} >
              <span className={styles.link}>恢复</span>
            </Popconfirm>
          }
          <Popconfirm title={<div>确认删除调度器<span style={{color:'red'}}>{name}</span>吗？</div>}
                      okText="确认"
                      cancelText="取消"
                      onConfirm={()=>{
                        request(`/wedtbs/scheduler/delete`,{},{name,bindTaskName:record.bindTaskName}).then(({data:{code,msg}})=>{
                          if(code==='000000'){
                            message.success(`调度器${name}已删除!`)
                            this.getList();
                          }else {
                            message.error(msg)
                          }
                        })
                      }} >
            <span className={styles.link}>删除</span>
          </Popconfirm>
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
