import { routerRedux } from 'dva/router'

// import { report } from '../services/api';
import { mockPromise } from '../utils/utils.js'

export default {
    namespace: 'report',

    state: {
        reports: [],
        fields: {
            reportCode: '',
            reportName: '',
            reportSql: '',
        },
    },

    effects: {
        *fetchReports(_, { call, put }) {
            const res = yield call(mockPromise, [
                { text: '报表一报表一报表一报表一报表一', id: 'a' },
                { text: '报表二报表二报表二', id: 'b' },
                { text: '报表三', id: 'c' },
                { text: '报表四', id: 'd' },
                { text: '报表五', id: 'e' },
            ]);
            console.log('fetch reports')
            yield put({
                type: 'saveReports',
                payload: res,
            });
        },

        // *addNewReport({payload}, {call, put}) {
        //     const res = yield call(mockPromise, payload)
        // },
    },

    reducers: {
        saveReports (state, action) {
            const { payload } = action
            return {
                ...state,
                reports: payload,
            }
        },
        saveNewReport (state, action) {
            const { payload } = action
            return {
                ...state,
                fields: payload,
            }
        },
    },
};
