import { message } from 'antd'
import { routerRedux } from 'dva/router'

import { report } from '../services/api'

export default {
    namespace: 'report',

    state: {
        updateModalType: '',
        updateModalVisible: false,
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
        // 查询 表单 列头
        *fetchReport(_, {call, put, select}) {
            const { reportCode, modCode } = yield select(state => state.report.currentReport);
            // 自定义查询条件
            let formData = yield call(report.querywherejson, {
                data: JSON.stringify({ reportCode, modCode }),
            })
            let columns = yield call(report.queryheadjson, {
                data: JSON.stringify({ reportCode, modCode }),
            })

            if (!formData || !columns) {
                message.error('请配置自定义查询条件或自定义列头，否则该报表无法正常使用！', 5)
            }

            formData = formData ? JSON.parse(formData) : []
            columns = columns ? JSON.parse(columns) : []

            yield put({
                type: 'saveCurrentReport',
                payload: {
                    formData,
                    columns,
                    dataSource: [],
                },
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

        },
        // 删除
        *fetchDeleteReport(_, { call, put, select }) {
            const { reportList, currentReport: { reportCode, modCode } } = yield select(state => state.report);

            const res = yield call(report.delete, {
                data: { reportCode, modCode },
            })
            if (res && res.ok) {
                let data = [...reportList]
                data = data.filter(item => !(item.reportCode === reportCode && item.modCode === modCode))
                yield put({
                    type: 'saveReportList',
                    payload: data,
                })
                yield put(routerRedux.push('/report/add'))
            }
        },
        // 更新基本信息
        *fetchUpdateReport({ payload }, { call, put }) {
            const res = yield call(report.update, { data: payload })
            if (res && res.ok) {
                message.success('修改成功！')
                yield put({
                    type: 'updateBasicMessage',
                    payload,
                })
                yield put({ type: 'closeUpdateModal' })
            }
        },
        // 更新表单
        *fetchUpdateCustomForm({ payload }, { call, put, select }) {
            const { reportCode, modCode } = yield select(state => state.report.currentReport)
            // TODO: 这里还要处理下拉框的 option数据
            const customForm = [...payload]
            customForm.forEach((item) => {
                if (item.type === 'select') {
                    item.options = []
                }
            })
            const res = yield call(report.addoreditwhere, {
                data: {
                    reportCode,
                    modCode,
                    whereJson: JSON.stringify(customForm),
                },
            })

            if (res && res.ok) {
                message.success('修改成功！')
                yield put({
                    type: 'saveCustomForm',
                    payload,
                })
                yield put({ type: 'closeUpdateModal' })
            }
        },
        // 更新列头
        *fetchUpdateCustomHeader({ payload }, { call, put, select }) {
            const { reportCode, modCode } = yield select(state => state.report.currentReport)
            const res = yield call(report.addoredithead, {
                data: {
                    reportCode,
                    modCode,
                    headJson: JSON.stringify(payload),
                },
            })

            if (res && res.ok) {
                message.success('修改成功！')
                yield put({
                    type: 'saveCustomHeader',
                    payload,
                })
                yield put({ type: 'closeUpdateModal' })
            }
        },
        // 查询表格数据
        *fetchReportBody ({ payload }, { put, call, select }) {
            const { reportCode, modCode } = yield select(state => state.report.currentReport);
            const res = yield call(report.querybody, {
                data: JSON.stringify({
                    reportCode,
                    modCode,
                    ...payload,
                }),
            })
            if (res) {
                yield put({
                    type: 'saveReportBody',
                    payload: res.list,
                })
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
            if (currentReport) {
                return {
                    ...state,
                    currentReport: {
                        ...state.currentReport,
                        ...currentReport,
                    },
                }
            }
            return {
                ...state,
                currentReport: {
                    reportCode: null,
                    reportName: '',
                    modCode: '',
                    reportBody: '',
                    formData: [],
                    columns: [],
                    dataSource: [],
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

        updateBasicMessage (state, action) {
            const { reportList } = state
            const { payload } = action
            reportList.forEach((item) => {
                if (item.reportCode === payload.reportCode && item.modCode === payload.modCode) {
                    Object.assign(item, payload)
                }
            })

            return {
                ...state,
                reportList,
                currentReport: {
                    ...state.currentReport,
                    ...payload,
                },
            }
        },

        saveCustomForm (state, action) {
            return {
                ...state,
                currentReport: {
                    ...state.currentReport,
                    formData: action.payload,
                },
            }
        },
        saveCustomHeader (state, action) {
            return {
                ...state,
                currentReport: {
                    ...state.currentReport,
                    columns: action.payload,
                },
            }
        },

        saveReportBody (state, action) {
            return {
                ...state,
                currentReport: {
                    ...state.currentReport,
                    dataSource: action.payload,
                },
            }
        },

        openUpdateModal (state, action) {
            return {
                ...state,
                updateModalType: action.payload,
                updateModalVisible: true,
            }
        },
        closeUpdateModal (state) {
            return {
                ...state,
                updateModalType: '',
                updateModalVisible: false,
            }
        },
    },
};
