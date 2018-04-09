/**
 * Created by liuzhaozhao on 2017/12/29.
 */
import React from 'react';
import { Row, Col, message } from 'antd'
import {Link} from 'dva/router'
import ReactEcharts from 'echarts-for-react'
import styles from './index.less'
import request from '../../utils/request'


export default class Home extends React.Component {
  state = {}

  componentWillMount() {
    request('/wedtbs/main').then(({data: {code, msg, info}}) => {
      if (code === '000000') {
        this.setState({
          ...info
        })
      } else {
        message.error(msg)
      }
    })
  }

  getOptions=()=>{
    const {chartImage=[]} = this.state
    const pieData=chartImage.map(({name,count})=>{
      // eslint-disable-next-line
      return {value:parseInt(count),name}
    })
    return{
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      title : {
        text: '成功/失败统计',
        x:'left',
        textStyle:{
          fontWeight:'normal',
        }
      },
      series: [
        {
          name:'成功/失败统计',
          type:'pie',
          radius: ['0%', '90%'],
          center: ['40%', '55%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: true,
              position: 'inside',
              formatter: "{b}: （{c}）"
            },

          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data:pieData
        }
      ],
      color:['#5a9fe5','#64e65f','#f4a163','#57ffbf','#fee05a','#f03a3e','#936ffe','#ffffc7']
    }
  }

  render() {
    const {totalCount={}, taskList=[], logs=[]} = this.state
    const {now = 0, successed = 0, fialed = 0} = totalCount

    return (
      <div className={styles.home}>
        <div className='title_1'>
          首页
        </div>
        <Row gutter={20}>
          <Col span={8}>
            <div className={styles.count}>
              <p>正在执行的任务数：</p>
              <p>{now}</p>
            </div>
          </Col>
          <Col span={8}>
            <div className={styles.count}>
              <p>执行成功次数：</p>
              <p>{successed}</p>
            </div>
          </Col>
          <Col span={8}>
            <div className={styles.count}>
              <p>执行失败次数：</p>
              <p>{fialed}</p>
            </div>
          </Col>
        </Row>
        <Row style={{marginTop:'30px'}} gutter={40}>
          <Col span={10}>
            <div className={styles.list}>
              <div className={styles.header}>执行中任务列表：</div>
              <div className={styles.content}>
                {taskList.map(({name})=>{
                  return(<p>{name}</p>)
                })}
              </div>
              <div className={styles.footer}>
                <Link to='/task'>
                  查看更多...
                </Link>
              </div>
            </div>
          </Col>
          <Col span={14}>
            <div style={{marginTop:'10px'}}>
              <ReactEcharts option={this.getOptions()}/>
            </div>
          </Col>
        </Row>
        <Row style={{marginTop:'30px'}}>
          <Col>
            <div className={styles.list}>
              <div className={styles.header}>近期调用日志：</div>
              <div className={styles.content}>
                {logs.map((item)=>{
                  return(<p>{item}</p>)
                })}
              </div>
              <div className={styles.footer}>
                <Link to='/log'>
                  查看更多...
                </Link>
              </div>
            </div>
          </Col>
        </Row>


      </div>
    );
  }
}
