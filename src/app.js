import React from 'react';
import { connect } from 'dva';
import {Route, Switch, Link } from 'dva/router';
import { Layout, Menu, Icon } from 'antd';
import menu from './menu';
import Home from './components/Home';
import Scheduler from './components/Scheduler';
import Task from './components/Task';
import Log from './components/Log';
import styles from './index.less';
const { Header, Content, Sider } = Layout;

class App extends React.Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    const {activeKey} = this.props.app
    return (
        <Layout className={styles.layout}>
          <Sider
            trigger={null}
            collapsible
            collapsed={this.state.collapsed}
          >
            <div className={styles.logo} />
            <Menu theme="dark" mode="inline" selectedKeys={[activeKey]}>
              {
                menu.map(({key,path,name,icon})=>{
                  return(
                    <Menu.Item key={key}>
                      <Link to={path}>
                        <Icon type={icon} />
                        <span>{name}</span>
                      </Link>
                    </Menu.Item>
                  )
                })
              }
            </Menu>
          </Sider>
          <Layout>
            <Header className={styles.header}>
              <Icon
                className={styles.trigger}
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}
              />
            </Header>
            <Content className={styles.content}>
                <Switch>
                  <Route path="/" exact component={Home} />
                  <Route path="/scheduler" component={Scheduler} />
                  <Route path="/task" component={Task} />
                  <Route path="/log" component={Log} />
                </Switch>
            </Content>
          </Layout>
        </Layout>

    );
  }

}

App.propTypes = {
};


export default connect((state)=>{
  return{
    app:state.app
  }
})(App);
