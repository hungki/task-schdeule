/**
 * Created by liuzhaozhao on 2017/12/29.
 */
import React from 'react';
import {Route, Switch } from 'dva/router';
import styles from './index.less'
import SettingHome from "./SettingHome";
import SettingAdd from "./SettingAdd";
import SettingEdit from "./SettingEdit";


class Scheduler extends React.Component {
    render(){
      const {match} = this.props
        return(
            <div className={styles.setting}>
              <Switch>
                <Route path={`${match.url}`} exact component={SettingHome} />
                <Route path={`${match.url}/add`} component={SettingAdd} />
                <Route path={`${match.url}/edit`} component={SettingEdit} />
              </Switch>

            </div>
        );
    }
}

export default Scheduler
