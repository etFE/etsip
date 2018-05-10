import { routerRedux } from 'dva/router'

import { report } from '../services/api';
import { mockPromise } from '../utils/utils.js'

export default {
    namespace: 'report',

    state: {
        reports: [],
        curReportCode: null,
        fields: {
            reportCode: '',
            reportName: '',
            reportBody: '',
        },
        customForm: [],
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
            yield put({
                type: 'saveReports',
                payload: res,
            });
        },

        *addNewReport({ payload }, {call, put}) {
            // 保存基本信息
            const resBasic = yield call(report.add, payload.fields)
            // 保存自定义表单
            const resForm = yield call(report.addOrEditWhere, payload.customForm)

            if (resBasic && resForm) {
                yield put(routerRedux.push('step3'))
            }
        },
    },

    reducers: {
        // 报表列表数据
        saveReports (state, action) {
            return {
                ...state,
                reports: action.payload,
            }
        },
        changeCurrentReport (state, action) {
            return {
                ...state,
                curReportCode: action.payload,
            }
        },
        // 新增报表数据
        saveNewReport (state, action) {
            return {
                ...state,
                fields: action.payload,
            }
        },
        // 通过sql，生成自定义表单数据
        generateCustomForm (state) {
            const { reportBody } = state.fields
            const paramArray = reportBody.match(/@[a-zA-Z_]+/g)
            const customForm = []
            if (paramArray) {
                paramArray.forEach((item, index) => {
                    const id = item.split('@')[1]
                    customForm.push(
                        { id, text: id, type: 'text', s_editable: true, s_key: index + 1 }
                    )
                })
            }
            return {
                ...state,
                customForm,
            }
        },
        // 改变表单数据
        changeCustomForm (state, action) {
            const { payload: { key, dataIndex, value } } = action
            const dataSource = [...state.customForm]
            dataSource.forEach((item) => {
                if (item.s_key === key) {
                    item[dataIndex] = value
                }
            })

            return {
                ...state,
                customForm: dataSource,
            }
        },
    },
};
