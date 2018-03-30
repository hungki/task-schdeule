/**
 * Created by liuzhaozhao on 2017/12/29.
 */
import React from 'react';
import ChartCard from '../common/ChartCard'
import Field from '../common/Field'
import {Row, Col, Tooltip, Icon} from 'antd'
import  ReactEcharts from 'echarts-for-react'
import styles from './index.less'


export default class Home extends React.Component {
    render(){
        return(
            <div className={styles.home}>
                <div className='title_1'>
                    首页
                </div>
                <Row gutter={20}>
                    <Col span={8}>
                      <div className={styles.count}>
                        <p>正在执行的任务数：</p>
                        <p>123456</p>
                      </div>
                    </Col>
                    <Col span={8}>
                      <div className={styles.count}>
                        <p>执行成功次数：</p>
                        <p>123456</p>
                      </div>
                    </Col>
                    <Col span={8}>
                      <div className={styles.count}>
                        <p>执行失败次数：</p>
                        <p>123456</p>
                      </div>
                    </Col>
                </Row>

            </div>
        );
    }
}
