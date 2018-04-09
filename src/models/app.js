import * as appServices from '../services/app'
export default {

  namespace: 'app',

  state: {
    activeKey:'home'
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      return history.listen(({pathname, state}) => {
        console.warn('pathname',pathname)
        let activeKey =  /^\/(scheduler|task|log)/.exec(pathname);
        if(activeKey){
          activeKey = activeKey[0].substr(1);
        }
        else {
          activeKey = 'home';
        }
        dispatch({
          type:'save',
          payload:{
            activeKey
          }
        })
      });
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      const data = yield call(appServices.query,{payload})
      yield put({ type: 'save' ,payload:{data}});
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
