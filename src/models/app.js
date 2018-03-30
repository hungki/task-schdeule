import * as appServices from '../services/app'
export default {

  namespace: 'app',

  state: {},

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
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
