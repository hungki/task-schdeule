import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';
import {Button} from 'antd'
import request from '../utils/request'

function IndexPage() {
  return (
    // <div className={styles.normal}>
    //   <h1 className={styles.title}>Yay! Welcome to dva!</h1>
    //   <div className={styles.welcome} />
    //   <ul className={styles.list}>
    //     <li>To get started, edit <code>src/index.js</code> and save to reload.</li>
    //     <li><a href="https://github.com/dvajs/dva-docs/blob/master/v1/en-us/getting-started.md">Getting Started</a></li>
    //   </ul>
    // </div>
    <div>
      <Button type="primary" onClick={()=>{
        request("/auth/erp")
      }}>测试</Button>
      <div className={styles.test}>测试</div>
      <a href="www.baidu.com">链接</a>
    </div>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
