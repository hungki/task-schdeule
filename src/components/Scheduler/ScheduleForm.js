/**
 * Created by liuzhaozhao on 2017/12/29.
 */
import React from 'react';
import {Form, Input, Select, Radio, Button, Icon} from 'antd'
import styles from './index.less'

const FormItem = Form.Item
const Option = Select.Option
const RadioGroup = Radio.Group
let uuid = 1;
class ScheduleForm extends React.Component {
  state={
    list:[]
  }

  componentWillMount(){
    const {getFieldDecorator} = this.props.form;
    const {ipList=[]}=this.props.value||{};
    getFieldDecorator('keys', { initialValue: ipList.map(({},index)=>index) });
    uuid=ipList.length===0?1:ipList.length

    this.setState({
      list:ipList
    })
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


  remove = (k) => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    let list = [...this.state.list]
    list[k]=undefined
    this.setState({
      list
    })
    // We need at least one passenger
    if (keys.length === 1) {
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  }

  add = () => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(uuid);
    uuid++;
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys,
    });
  }

  render(){
    const { getFieldDecorator, getFieldValue } = this.props.form;
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

    const keys = getFieldValue('keys');
    const formItems = keys.map((k, index) => {
      return (
        <FormItem
          {...(index === 0 ? formItemLayout : tailFormItemLayout)}
          label={index === 0 ? 'IP列表' : ''}
          required={false}
          key={k}
        >
          {getFieldDecorator(`ipList[${k}]`, {
            validateTrigger: ['onChange', 'onBlur'],
            rules: [{
              required: true,
              whitespace: true,
              message: "请添加IP地址。",
            }],
          })(
            <Input  style={{ width: '200px', marginRight: 8 }}
                    onChange={(e)=>{
                      let list = [...this.state.list]
                      list[k]=e.target.value
                      this.setState({
                        list
                      })
                    }}/>
          )}
          {keys.length > 1 ? (
            <Icon
              className={styles['dynamic-delete-button']}
              type="minus-circle-o"
              disabled={keys.length === 1}
              onClick={() => this.remove(k)}
            />
          ) : null}
        </FormItem>
      );
    });
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
            <RadioGroup onChange={(e)=>{
              const form = this.props.form
              if(e.target.value!=='1'){
                this.props.form.setFieldsValue({
                  keys: [],
                });
              }else{
                const list=this.state.list
                let key=[]
                let iplist={}
                for(let n in list){
                  if(list[n]){
                    key.push(n)
                    iplist[`ipList[${n}]`]=list[n]
                    form.getFieldValue(`ipList[${n}]`)
                  }
                }
                this.props.form.setFieldsValue({
                  keys: key.length===0?[0]:key,
                  ...iplist
                });
              }
            }}>
              <Radio value='0'>自动发现</Radio>
              <Radio value='1'>指定IP</Radio>
            </RadioGroup>
          )}
        </FormItem>
        {getFieldValue('registerType')==='1'?formItems:null}
        {getFieldValue('registerType')==='1'?
          <FormItem  key='plus' {...tailFormItemLayout}>
            <Button type="dashed" onClick={this.add} style={{ width: '200px' }}>
              <Icon type="plus" /> 添加IP地址
            </Button>
          </FormItem>
          :null}
        <FormItem  key='handle'   {...tailFormItemLayout} >
          <Button htmlType="submit" type="primary" size="large" >确认</Button>
          <Button htmlType="button" type="dash" size="large"  style={{ marginLeft: 8 }} onClick={()=>{}}>返回</Button>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create({
  mapPropsToFields:({value={}})=> {
    let r={};
    for(let key in value){
      if(key==='ipList'){
        const ipList=value.ipList||[]
        for(let index in ipList){
          r[`ipList[${index}]`]=Form.createFormField({value:ipList[index]});
        }
      }
      r[key]=Form.createFormField({value:value[key]});
    }
    return r;

  }})(ScheduleForm)
