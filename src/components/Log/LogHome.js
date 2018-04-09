/**
 * Created by liuzhaozhao on 2017/12/29.
 */
import React from 'react';
import {Link } from 'dva/router';
import {Card,  Table, Select, Input,Button, message} from 'antd'
import request from '../../utils/request'
import styles from './index.less'

const Option = Select.Option

export default class LogHome extends React.Component {
  state = {
    list:[],
    pageSize:10,
    pageNum:1,

    options:['ALL'],
    query:{
      schedulerName:'ALL'
    }
  }

  componentWillMount(){
    const {query} = this.state
    const {schedulerName} = this.props.location.query||{}
    this.setState({
      query:{
        ...query,
        schedulerName
      }
    },()=>{
      this.getList()
    })

  }

  getList=(params)=>{
    const {pageSize=10, pageNum=1, query={}}=this.state
    request(`/wedtbs/logs/query`,{},{pageSize, pageNum,...query,...params}).then(({data:{code,msg,info,...params}})=>{
      this.setState({
        list:info,
        ...params
      })
    })
  };

  render(){
    const {list=[],pageSize=10,pageNum=1,total=0, options,query}=this.state
    const columns=[{
      title: '序号',
      dataIndex: 'no',
      key: 'no',
    },{
      title: '执行开始时间',
      dataIndex: 'startTime',
      key: 'startTime',
    },{
      title: '执行完成时间',
      dataIndex: 'endTime',
      key: 'endTime',
    },{
      title: '执行结果',
      dataIndex: 'result',
      key: 'result',
    },{
      title: '执行任务项',
      dataIndex: 'taskItems',
      key: 'taskItems',
    },{
      title: '调度日志',
      dataIndex: 'desc',
      key: 'desc',
    },]

    return(
        <div>
          <Card title={
            <div className='title_1'>
              任务日志
            </div>
          } >
            <div style={{ overflow: 'hidden', marginBottom: '10px' }}>
              <ul className={styles.query}>
                <li>
                  <span>调度器：</span>
                  <Select value={query.schedulerName}
                          style={{width:'150px'}}
                          onChange={(value) => {
                            this.setState({
                              query: {...query,schedulerName:value}
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
                </li>
                <li>
                  <span>执行结果：</span>
                  <Input
                    value={query.result}
                    style={{ width: 200 }}
                    onChange={e => {
                      this.setState({
                        query: {...query,result:e.target.value.trim()}
                      })
                    }}
                  />
                </li>
                <li>
                  <span>执行开始时间：</span>
                  <Input
                    value={query.startTime}
                    style={{ width: 200 }}
                    onChange={e => {
                      this.setState({
                        query: {...query,startTime:e.target.value.trim()}
                      })
                    }}
                  />
                </li>
                <li>
                  <span>执行结束时间：</span>
                  <Input
                    value={query.endTime}
                    style={{ width: 200 }}
                    onChange={e => {
                      this.setState({
                        query: {...query,endTime:e.target.value.trim()}
                      })
                    }}
                  />
                </li>
                <li>
                  <Button type='primary' onClick={()=>this.getList()}>查询</Button>
                </li>

              </ul>
            </div>

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
