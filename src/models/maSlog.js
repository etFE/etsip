import { maSlog } from '../services/api';

export default {
    namespace: 'maSlog',

    state: {
        data: {
            list: [],
            pagination: {},
        },
    },

    effects: {
        *fetch(_, { call, put }) {
            const response = yield call(maSlog.query);
            yield put({
                type: 'save',
                payload: response,
            });
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
