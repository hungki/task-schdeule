/**
 * Created by liuzhaozhao on 2017/12/29.
 */
import React from 'react';
import { Link } from 'dva/router'
import {Form, Input, Select, Radio, Button, Icon} from 'antd'
import styles from './index.less'

const FormItem = Form.Item
const Option = Select.Option
const RadioGroup = Radio.Group

class SettingForm extends React.Component {

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
        <FormItem key='alias'
          {...formItemLayout}
          label="配置组别名"
        >
          {getFieldDecorator('alias', {
            rules: [{
              required: true, message: '请填写配置组别名！',
            }],
          })(
            <Input style={{width:'300px'}}/>
          )}
        </FormItem>
        <FormItem key='zkAddress'
          {...formItemLayout}
          label="Zookeeper地址"
        >
          {getFieldDecorator('zkAddress', {
            rules: [{
              required: true, message: '请填写Zookeeper地址！',
            }],
          })(
            <Input style={{width:'300px'}}/>
          )}
        </FormItem>
        <FormItem key='zkPath'
          {...formItemLayout}
          label="Zookeeper根目录"
        >
          {getFieldDecorator('zkPath', {
            rules: [{
              required: true, message: '请填写Zookeeper根目录！',
            }],
          })(
            <Input style={{width:'300px'}}/>
          )}
        </FormItem>
        <FormItem key='zkTimeOut'
          {...formItemLayout}
          label="Zookeeper超时"
        >
          {getFieldDecorator('zkTimeOut', {
            rules: [{
              required: true, message: '请填写Zookeeper超时时长！',
            }],
          })(
            <Input style={{width:'300px'}}/>
          )}
        </FormItem>
        <FormItem key='userName'
          {...formItemLayout}
          label="Zookeeper用户"
        >
          {getFieldDecorator('userName', {
            rules: [{
              required: true, message: '请填写Zookeeper用户！',
            }],
          })(
            <Input style={{width:'300px'}}/>
          )}
        </FormItem>
        <FormItem key='pwd'
          {...formItemLayout}
          label="Zookeeper密码"
        >
          {getFieldDecorator('pwd', {
            rules: [{
              required: true, message: '请填写Zookeeper密码！',
            }],
          })(
            <Input style={{width:'300px'}}/>
          )}
        </FormItem>

        <FormItem  key='handle'   {...tailFormItemLayout} >
          <Button htmlType="submit" type="primary" size="large" >确认</Button>
          <Link to='/setting'>
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

  }})(SettingForm)
