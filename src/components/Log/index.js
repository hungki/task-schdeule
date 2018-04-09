/**
 * Created by liuzhaozhao on 2017/12/29.
 */
import React from 'react';
import {Route, Switch } from 'dva/router';
import styles from './index.less'
import LogHome from "./LogHome";


class Scheduler extends React.Component {
    render(){
      const {match} = this.props
        return(
            <div className={styles.log}>
              <Switch>
                <Route path={`${match.url}`} exact component={LogHome} />
              </Switch>

            </div>
        );
    }
}

export default Scheduler
