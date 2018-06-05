import { routerRedux } from 'dva/router'
import { message } from 'antd'
import { user, fakeAccountLogin } from '../services/api'
import { query as queryUsers, queryCurrent } from '../services/user'
import { setAuthority, setUserMessage, getUserMessage } from '../utils/authority'
import { reloadAuthorized } from '../utils/Authorized'

export default {
    namespace: 'user',

    state: {
        status: undefined,
        list: [],
        currentUser: {},
    },

    effects: {
        *login ({ payload }, { call, put }) {
            const response = yield call(user.login, {
                data: payload,
            })
            if (response.ok) {
                message.success('登录成功！')

                const userMsg = JSON.parse(response.user)

                setUserMessage({
                    userName: userMsg.username,
                    userId: userMsg.id,
                    nickName: userMsg.nickname,
                })
                yield put({
                    type: 'changeLoginStatus',
                    payload: {
                        status: true,
                        type: 'normal',
                        currentAuthority: userMsg.menus || 'admin',
                    },
                })
                reloadAuthorized()
                yield put(routerRedux.push('/'))
            }
        },
        *logout(_, { put, select }) {
            try {
                // get location pathname
                const urlParams = new URL(window.location.href);
                const pathname = yield select(state => state.routing.location.pathname);
                // add the parameters in the url
                urlParams.searchParams.set('redirect', pathname);
                window.history.replaceState(null, 'login', urlParams.href);
            } finally {
                setUserMessage()
                yield put({
                    type: 'changeLoginStatus',
                    payload: {
                        status: false,
                        currentAuthority: 'guest',
                    },
                });
                reloadAuthorized();
                yield put(routerRedux.push('/user/login'));
            }
        },
        *fetch (_, { call, put }) {
            const response = yield call(queryUsers);
            yield put({
                type: 'save',
                payload: response,
            });
        },
        *fetchCurrent (_, { put }) {
            const userMsg = getUserMessage()
            if (!userMsg || !userMsg.userName) {
                yield put({ type: 'logout' })
            } else {
                const res = {
                    name: userMsg.nickName || userMsg.userName,
                    userid: userMsg.userId,
                }
                yield put({
                    type: 'saveCurrentUser',
                    payload: res,
                });
            }
        },
    },

    reducers: {
        save (state, action) {
            return {
                ...state,
                list: action.payload,
            };
        },
        saveCurrentUser (state, action) {
            return {
                ...state,
                currentUser: action.payload,
            };
        },
        changeNotifyCount (state, action) {
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    notifyCount: action.payload,
                },
            };
        },

        changeLoginStatus(state, { payload }) {
            setAuthority(payload.currentAuthority);
            return {
                ...state,
                status: payload.status,
                type: payload.type,
            };
        },
    },
};
