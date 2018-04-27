import { maUser } from '../services/api';

export default {
    namespace: 'maUser',

    state: {
        data: {
            list: [],
            pagination: {},
        },
    },

    effects: {
        *fetch(_, { call, put }) {
            const response = yield call(maUser.query);
            yield put({
                type: 'save',
                payload: response,
            });
        },
        *add({ payload }, { call, put }) {
            const response = yield call(maUser.add, payload.record);
            console.log('add response', response)
            // yield put({
            //     type: 'save',
            //     payload: response,
            // });
            return response
        },
        *update({ payload }, { call, put }) {
            const response = yield call(maUser.update, payload.record);
            // yield put({
            //     type: 'save',
            //     payload: response,
            // });
            console.log('update response', response)
            return response
        },
    },

    reducers: {
        // TODO: 分页数据 pager格式转换 => pagination: { current, pageSize, total }
        save(state, action) {
            return {
                ...state,
                data: action.payload,
            };
        },
    },
};
