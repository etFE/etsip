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
        fields: {
            reportCode: '',
            reportName: '',
            reportBody: '',
        },
        customForm: [],
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
                { text: '是否吃饭', id: 'isEat', type: 'checkbox' },
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

        // 添加新报表 step2
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

        // 新增报表数据 step2
        saveNewReport (state, action) {
            return {
                ...state,
                fields: action.payload,
            }
        },
        // 通过sql，生成自定义表单数据 step2
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
        clearFields (state) {
            return {
                ...state,
                fields: {
                    reportCode: '',
                    reportName: '',
                    reportBody: '',
                },
            }
        },
        // 改变表单数据 step2
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
