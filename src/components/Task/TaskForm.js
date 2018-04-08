/**
 * Created by liuzhaozhao on 2017/12/29.
 */
import React from 'react';
import { Link } from 'dva/router'
import {Form, Input, Select, Button, Col, Row} from 'antd'
import styles from './index.less'

const FormItem = Form.Item
const Option = Select.Option
const TextArea = Input.TextArea

class TaskForm extends React.Component {

  state={
    options: [ '***1', '****2'],
  }

  onSubmit=(e)=>{
    e.preventDefault();
    const {onSubmit} = this.props
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.warn(values)
        onSubmit(values)
      }
    });
  }


  render(){
    const { getFieldDecorator } = this.props.form;
    const { options } = this.state;
    const formItemLayout = {
      labelCol: {
        span:8
      },
      wrapperCol: {
        span:16
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        span: 20,
        offset: 4,
      },
    };


    return(
      <Form onSubmit={this.onSubmit}>
        <Row>
          <Col span={12}>
            <FormItem key='schedulerName'
                      className={`${styles['ant-form-item']} ${styles['my-form-item']}`}
                      {...formItemLayout}
                      label="调度器"
            >
              {getFieldDecorator('schedulerName', {
                rules: [{
                  required: true, message: '请选择调度器！',
                }],
              })(
                <Select style={{width:'200px'}}>
                  {
                    options.map((item) => {
                      return <Option value={item}>{item}</Option>
                    })
                  }
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem key='bean'
                      className={`${styles['ant-form-item']} ${styles['my-form-item']}`}
                      {...formItemLayout}
                      label="对应bean"
            >
              {getFieldDecorator('bean', {
                rules: [{
                  required: true, message: '请填写对应bean！',
                }],
              })(
                <Input style={{width:'200px'}}/>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem key='pageSize'
                      className={`${styles['ant-form-item']} ${styles['my-form-item']}`}
                      {...formItemLayout}
                      label="每次取数"
            >
              {getFieldDecorator('pageSize', {})(
                <Input style={{width:'200px'}}/>
              )}
            </FormItem>
          </Col>
          <Col  span={12}>
            <FormItem key='executeNum'
                      className={`${styles['ant-form-item']} ${styles['my-form-item']}`}
                      {...formItemLayout}
                      label="每次执行"
            >
              {getFieldDecorator('executeNum', {})(
                <Input style={{width:'200px'}}/>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col  span={12}>
            <FormItem key='startCron'
                      className={`${styles['ant-form-item']} ${styles['my-form-item']}`}
                      {...formItemLayout}
                      label="任务开始时间"
            >
              {getFieldDecorator('startCron', {})(
                <Input style={{width:'200px'}}/>
              )}
            </FormItem>
          </Col>
          <Col  span={12}>
            <FormItem key='stopCron'
                      className={`${styles['ant-form-item']} ${styles['my-form-item']}`}
                      {...formItemLayout}
                      label="任务结束时间"
            >
              {getFieldDecorator('stopCron', {})(
                <Input style={{width:'200px'}}/>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem key='executeThreadNum'
                      className={`${styles['ant-form-item']} ${styles['my-form-item']}`}
                      {...formItemLayout}
                      label="线程数"
            >
              {getFieldDecorator('executeThreadNum', {})(
                <Input style={{width:'200px'}}/>
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem key='modeOfExecute'
                      className={`${styles['ant-form-item']} ${styles['my-form-item']}`}
                      {...formItemLayout}
                      label="处理模式"
            >
              {getFieldDecorator('modeOfExecute', {})(
                <Select style={{width:'200px'}}>
                  <Option value='SLEEP'>SLEEP</Option>
                  <Option value='NOSLEEP'>NOSLEEP</Option>
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem key='sleepTimeOfNoData'
                      className={`${styles['ant-form-item']} ${styles['my-form-item']}`}
                      {...formItemLayout}
                      label="无数据休眠时间"
            >
              {getFieldDecorator('sleepTimeOfNoData', {})(
                <Input style={{width:'200px'}}/>
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem key='sleepTimeOfFinish'
                      className={`${styles['ant-form-item']} ${styles['my-form-item']}`}
                      {...formItemLayout}
                      label="任务完成休眠时间"
            >
              {getFieldDecorator('sleepTimeOfFinish', {})(
                <Input style={{width:'200px'}}/>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem key='taskItems'
                      className={`${styles['ant-form-item']} ${styles['my-form-item']}`}
                      {...formItemLayout}
                      label="任务项"
            >
              {getFieldDecorator('taskItems', {})(
                <Input style={{width:'200px'}}/>
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem key='maxTaskNumOfOneThreadGroup'
                      className={`${styles['ant-form-item']} ${styles['my-form-item']}`}
                      {...formItemLayout}
                      label="单线程组最大任务数"
            >
              {getFieldDecorator('maxTaskNumOfOneThreadGroup', {})(
                <Input style={{width:'200px'}}/>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <FormItem key='taskParam'
                    className={`${styles['ant-form-item']} ${styles['my-form-item']}`}
                    labelCol={{span:4}}
                    wrapperCol={{span:10}}
                    label="自定义参数"
          >
            {getFieldDecorator('taskParam', {})(
              <TextArea autosize={{ minRows: 3, maxRows: 6 }}/>
            )}
          </FormItem>
        </Row>


        <FormItem  key='handle'   {...tailFormItemLayout} >
          <Button htmlType="submit" type="primary" size="large" >确认</Button>
          <Link to='/task'>
            <Button htmlType="button" type="dash" size="large"  style={{ marginLeft: 8 }}>返回</Button>
          </Link>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create({
  mapPropsToFields:({value={}})=> {
    let r={};
    for(let key in value){
      r[key]=Form.createFormField({value:value[key]});
    }
    return r;

  }})(TaskForm)
