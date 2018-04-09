/**
 * Created by liuzhaozhao on 2017/12/29.
 */
import React from 'react';
import {Route, Switch } from 'dva/router';
import styles from './index.less'
import TaskHome from "./TaskHome";
import TaskAdd from "./TaskAdd";
import TaskEdit from "./TaskEdit";
import TaskDetail from "./TaskDetail";


class Task extends React.Component {
    render(){
      const {match} = this.props
        return(
            <div className={styles.task}>
              <Switch>
                <Route path={`${match.url}`} exact component={TaskHome} />
                <Route path={`${match.url}/add`} component={TaskAdd} />
                <Route path={`${match.url}/edit/:name/:schedulerName`} component={TaskEdit} />
                <Route path={`${match.url}/detail/:name/:schedulerName`} component={TaskDetail} />
              </Switch>

            </div>
        );
    }
}

export default Task
