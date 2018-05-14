import { message } from 'antd'
import { routerRedux } from 'dva/router'

import { report } from '../services/api';
import { mockPromise } from '../utils/utils.js'

export default {
    namespace: 'report',

    state: {
        reportList: [],
        currentReport: {
            reportCode: null,
            reportName: '',
            formData: [],
            columns: [],
            dataSource: [],
        },
    },

    effects: {
        // 查询报表列表 reportlayout
        *fetchReportList(_, { call, put }) {
            const res = yield call(mockPromise, [
                { text: '报表一报表一报表一报表一报表一', id: 'a' },
                { text: '报表二报表二报表二', id: 'b' },
                { text: '报表三', id: 'c' },
                { text: '报表四', id: 'd' },
                { text: '报表五', id: 'e' },
            ]);
            yield put({
                type: 'saveReportList',
                payload: res,
            });
        },
        // 查询其中一个报表的所有数据
        *fetchReport(_, {call, put}) {
            // 自定义查询条件
            const formData = yield call(mockPromise, [
                { text: '人员编码', id: 'menberCode', type: 'input' },
                { text: '所属部门', id: 'dependment', type: 'select',
                    options: [
                        { text: '无线端部门', id: 'fe' },
                        { text: '后端部门', id: 'be' },
                        { text: '设计部门', id: 'ds' },
                    ],
                },
                { text: '是否', id: 'isEat', type: 'checkbox' },
                { text: '什么时候', id: 'date', type: 'datepicker' },
            ])
            const columns = yield call(mockPromise, [
                { dataIndex: 'col1', title: '第一列' },
                { dataIndex: 'col2', title: '第二列' },
            ])
            yield put({
                type: 'saveCurrentReport',
                payload: {
                    formData,
                    columns,
                },
            })
        },
    },

    reducers: {
        // 报表列表数据 reportlayout > reportlist
        saveReportList (state, action) {
            return {
                ...state,
                reportList: action.payload,
            }
        },

        // 切换报表列表 reportlauout > reportlist
        changeCurrentReport (state, action) {
            const currentReport = state.reportList.filter((item) => item.id === action.payload)[0]
            return {
                ...state,
                currentReport: {
                    ...state.currentReport,
                    reportCode: action.payload,
                    reportName: currentReport ? currentReport.text : '',
                },
            }
        },
        // 存储当前报表的 动态表单 动态表头
        saveCurrentReport (state, action) {
            const { payload } = action
            return {
                ...state,
                currentReport: {
                    ...state.currentReport,
                    formData: payload.formData,
                    columns: payload.columns,
                },
            }
        },
    },
};
