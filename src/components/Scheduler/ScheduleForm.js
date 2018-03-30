/**
 * Created by liuzhaozhao on 2017/12/29.
 */
import React from 'react';
import {Form, Input, Select, Radio, Button} from 'antd'
import styles from './index.less'

const FormItem = Form.Item
const Option = Select.Option
const RadioGroup = Radio.Group

class ScheduleForm extends React.Component {

  onSubmit=(e)=>{
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {

      }
    });
  }

  render(){
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
        md: { span: 4 },
        lg: { span: 4 },
        xl: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
        md: { span: 20 },
        lg: { span: 20 },
        xl: { span: 20 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
        md: {
          span: 20,
          offset: 4,
        },
        lg: {
          span: 20,
          offset: 4,
        },
        xl: {
          span: 20,
          offset: 4,
        },
      },
    };
    return(
      <Form onSubmit={this.onSubmit}>
        <FormItem key='name'
          {...formItemLayout}
          label="调度器名称"
        >
          {getFieldDecorator('name', {
            rules: [{
              required: true, message: '请填写调度器名称！',
            }],
          })(
            <Input style={{width:'300px'}}/>
          )}
        </FormItem>
        <FormItem key='type'
          {...formItemLayout}
          label="调度器类型"
        >
          {getFieldDecorator('type', {
            rules: [{
              required: true, message: '请填写调度器类型！',
            }],
          })(
            <Select style={{width:'300px'}}>
              <Option value='Schedule'>Schedule</Option>
              <Option value='Shell'>Shell</Option>
              <Option value='Python'>Python</Option>
            </Select>
          )}
        </FormItem>
        <FormItem key='bindTaskName'
                  {...formItemLayout}
                  label="绑定任务名称"
        >
          {getFieldDecorator('bindTaskName', {})(
            <Input style={{width:'300px'}}/>
          )}
        </FormItem>
        <FormItem key='bindTaskParam'
                  {...formItemLayout}
                  label="绑定任务参数"
        >
          {getFieldDecorator('bindTaskParam', {})(
            <Input style={{width:'300px'}}/>
          )}
        </FormItem>
        <FormItem key='threadGroupOfOneServer'
                  {...formItemLayout}
                  label="单机线程组数"
        >
          {getFieldDecorator('threadGroupOfOneServer', {})(
            <Input style={{width:'300px'}}/>
          )}
        </FormItem>
        <FormItem key='threadGroupOfServerList'
                  {...formItemLayout}
                  label="集群线程组数"
        >
          {getFieldDecorator('threadGroupOfServerList', {})(
            <Input style={{width:'300px'}}/>
          )}
        </FormItem>
        <FormItem key='registerType'
                  {...formItemLayout}
                  label="调度器注册模式"
        >
          {getFieldDecorator('registerType', {
            initialValue:'0'
          })(
            <RadioGroup>
              <Radio value='0'>自动发现</Radio>
              <Radio value='1'>指定IP</Radio>
            </RadioGroup>
          )}
        </FormItem>
        <FormItem  key='handle'   {...tailFormItemLayout} >
          <Button htmlType="submit" type="primary" size="large" >确认</Button>
          <Button htmlType="button" type="dash" size="large"  style={{ marginLeft: 8 }} onClick={()=>{}}>返回</Button>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(ScheduleForm)
