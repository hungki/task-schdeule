/**
 * Created by liuzhaozhao on 2017/12/29.
 */
import React from 'react';
import {Link} from 'dva/router';
import {Card, Button, Table, Popconfirm, Select, message} from 'antd'
import request from '../../utils/request'
import styles from './index.less'

const Option = Select.Option;

export default class TaskHome extends React.Component {
  state = {
    list: [],
    pageSize: 10,
    pageNum: 1,

    options: ['ALL'],
    selected: 'ALL',

  }

  componentWillMount() {
    this.getList()
  }

  getList = (params) => {
    const {pageSize = 10, pageNum = 1,selected='ALL'} = this.state
    request(`/wedtbs/task/queryByScheduler`, {}, {
      pageSize,
      pageNum,
      schedulerName:selected,
      ...params
    }).then(({data: {code, msg, info, ...params}}) => {
      this.setState({
        list: info,
        ...params
      })
    })
  };

  render() {
    const {list = [], pageSize = 10, pageNum = 1, total = 0, options = []} = this.state;
    const columns = [{
      title: '任务名称',
      dataIndex: 'name',
      key: 'name',
      render:(name,record)=>{
        return <Link to={{pathname: `/task/detail/${name}/${record.schedulerName}`}}>
          <span className={styles.link}>{name}</span>
        </Link>
      }
    }, {
      title: '调度器名称',
      dataIndex: 'schedulerName',
      key: 'schedulerName',
    }, {
      title: '执行Bean',
      dataIndex: 'speingBean',
      key: 'speingBean',
    }, {
      title: '执行机器列表',
      dataIndex: 'serverList',
      key: 'serverList',
      render: (serverList) => {
        return <div>
          {serverList.map(ip => (<p>{ip}</p>))}
        </div>
      }
    }, {
      title: '注册时间',
      dataIndex: 'registerTime',
      key: 'registerTime',
    }, {
      title: '上次执行时间',
      dataIndex: 'lastExecuteTime',
      key: 'lastExecuteTime',
    }, {
      title: '下次执行时间',
      dataIndex: 'nextExecuteTime',
      key: 'nextExecuteTime',
    }, {
      title: '下次结束时间',
      dataIndex: 'nextStopExecuteTime',
      key: 'nextStopExecuteTime',
    }, {
      title: '任务状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        return {
          0: '正常',
          1: '暂停',
        }[status]
      }
    }, {
      title: '操作',
      dataIndex: 'name',
      key: 'handle',
      width: 200,
      render: (name, record) => {
        return <div>
          <Popconfirm title={<div><p>确认立即执行任务？</p><p style={{fontSize: '8px'}}>（与已在执行的任务并行）</p></div>}
                      okText="确认"
                      cancelText="取消"
                      onConfirm={() => {
                        request(`/wedtbs/task/execute`, {}, {
                          name,
                          schedulerName: record.schedulerName
                        }).then(({data: {code, msg}}) => {
                          if (code === '000000') {
                            message.success(`执行成功！`)
                            this.getList();
                          } else {
                            message.error(msg)
                          }
                        })
                      }}>
            <span className={styles.link}>执行</span>
          </Popconfirm>
          <Link to={{pathname: '/log', query: record}}>
            <span className={styles.link}>日志</span>
          </Link>
          <Link to={{pathname: `/task/edit/${name}/${record.schedulerName}`}}>
            <span className={styles.link}>编辑</span>
          </Link>
          <Popconfirm title={<div>确认删除任务<span style={{color: 'red'}}>{name}</span>吗？</div>}
                      okText="确认"
                      cancelText="取消"
                      onConfirm={() => {
                        request(`/wedtbs/task/delete`, {}, {
                          name,
                          schedulerName: record.schedulerName
                        }).then(({data: {code, msg}}) => {
                          if (code === '000000') {
                            message.success(`任务${name}已删除!`)
                            this.getList();
                          } else {
                            message.error(msg)
                          }
                        })
                      }}>
            <span className={styles.link}>删除</span>
          </Popconfirm>
        </div>
      }
    },]

    return (
      <div>
        <Card title={
          <div className='title_1'>
            任务管理
          </div>
        } extra={
          <Link to={'/task/add'}>
            <Button type='primary'>
              +新增任务
            </Button>
          </Link>

        }>
          <div style={{marginBottom: '10px'}}>
            调度器：<Select value={this.state.selected}
                        style={{width:'150px'}}
                        onChange={(value) => {
                          this.setState({
                            selected: value
                          },()=>{
                            this.getList({schedulerName:value,pageNum:1})
                          })
                        }}>
            {
              options.map((item) => {
                if (item === 'ALL') {
                  return <Option value="ALL">全部</Option>
                }
                return <Option value={item}>{item}</Option>
              })
            }
          </Select>
          </div>
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
