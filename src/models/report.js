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
            modCode: '',
            reportBody: '',
            formData: [],
            columns: [],
            dataSource: [],
        },
    },

    effects: {
        // 查询报表列表 reportlayout TODO: 分页
        *fetchReportList(_, { call, put }) {
            const res = yield call(report.query);
            if (res && res.list) {
                yield put({
                    type: 'saveReportList',
                    payload: res.list,
                });
            }
        },
        // 查询其中一个报表的所有数据
        *fetchReport(_, {call, put, select}) {
            const { reportCode, modCode } = yield select(state => state.report.currentReport);
            // 自定义查询条件
            const formData = yield call(report.querywherejson, {
                data: JSON.stringify({ reportCode, modCode }),
            })
            const columns = yield call(report.queryheadjson, {
                data: JSON.stringify({ reportCode, modCode }),
            })
            // const formData = yield call(mockPromise, [
            //     { text: '人员编码', id: 'menberCode', type: 'input' },
            //     { text: '所属部门', id: 'dependment', type: 'select',
            //         options: [
            //             { text: '无线端部门', id: 'fe' },
            //             { text: '后端部门', id: 'be' },
            //             { text: '设计部门', id: 'ds' },
            //         ],
            //     },
            //     { text: '是否', id: 'isEat', type: 'checkbox' },
            //     { text: '什么时候', id: 'date', type: 'datepicker' },
            // ])
            // const columns = yield call(mockPromise, [
            //     { dataIndex: 'col1', title: '第一列' },
            //     { dataIndex: 'col2', title: '第二列' },
            // ])
            yield put({
                type: 'saveCurrentReport',
                payload: {
                    formData: JSON.parse(formData),
                    columns: JSON.parse(columns),
                },
            })
        },

        *fetchDeleteReport(_, { call, put, select }) {
            const { reportCode, modCode } = yield select(state => state.report.currentReport);

            yield call(report.delete, {
                data: { reportCode },
            })
        },

        *fetchUpdateReport({ payload }, { call }) {
            const res = yield call(report.update, { data: payload })
            if (res && res.ok) {
                message.success('修改成功！')
            }
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
            const currentReport = state.reportList.filter((item) => item.reportCode === action.payload)[0]
            return {
                ...state,
                currentReport: {
                    ...state.currentReport,
                    ...currentReport,
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
