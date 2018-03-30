/**
 * Created by liuzhaozhao on 2017/12/29.
 */
import React from 'react';
import {Route, Switch, Link } from 'dva/router';
import styles from './index.less'
import ScheduleHome from "./ScheduleHome";
import ScheduleAdd from "./ScheduleAdd";


class Scheduler extends React.Component {
    render(){
      const {match} = this.props
        return(
            <div className={styles.scheduler}>
              <Switch>
                <Route path={`${match.url}`} exact component={ScheduleHome} />
                <Route path={`${match.url}/add`} component={ScheduleAdd} />
              </Switch>

            </div>
        );
    }
}

export default Scheduler
