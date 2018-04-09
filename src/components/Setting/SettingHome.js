/**
 * Created by liuzhaozhao on 2017/12/29.
 */
import React from 'react';
import {Link } from 'dva/router';
import {Card, Button, Table, Popconfirm, message} from 'antd'
import request from '../../utils/request'
import styles from './index.less'

export default class SettingHome extends React.Component {
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
    request(`/wedtbs/profiles/main`,{},{pageSize, pageNum,...params}).then(({data:{code,msg,info,...params}})=>{
      this.setState({
        list:info,
        ...params
      })
    })
  };

  render(){
    const {list=[],pageSize=10,pageNum=1,total=0}=this.state
    const columns=[{
      title: '配置组',
      dataIndex: 'no',
      key: 'no',
    },{
      title: '分组别名',
      dataIndex: 'alias',
      key: 'alias',
    },{
      title: 'Zookeeper地址',
      dataIndex: 'zkAddress',
      key: 'zkAddress',
    },{
      title: 'Zookeeper根目录',
      dataIndex: 'zkPath',
      key: 'zkPath',
    },{
      title: 'Zookeeper超时',
      dataIndex: 'zkTimeOut',
      key: 'zkTimeOut',
    },{
      title: 'Zookeeper用户',
      dataIndex: 'userName',
      key: 'userName',
    },{
      title: 'Zookeeper密码',
      dataIndex: 'pwd',
      key: 'pwd',
    },{
      title: '操作',
      dataIndex: 'alias',
      key: 'handle',
      width:150,
      render:(alias,record)=>{
        return <div>
          <Link to={{pathname:'/setting/edit',query:record}}>
            <span className={styles.link}>修改</span>
          </Link>
          <Popconfirm title={<div>确认删除连接<span style={{color:'red'}}>{alias}</span>吗？</div>}
                      okText="确认"
                      cancelText="取消"
                      onConfirm={()=>{
                        request(`/wedtbs/profiles/delete`,{},{no:record.no}).then(({data:{code,msg}})=>{
                          if(code==='000000'){
                            message.success(`${alias}已删除!`)
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
              配置管理
            </div>
          } extra={
            <Link to={'/setting/add'}>
              <Button type='primary'>
                +新增配置组
              </Button>
            </Link>

          }>
            <Table dataSource={list}
                   rowKey='no'
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
