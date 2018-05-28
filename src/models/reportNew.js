import { message } from 'antd'
import { routerRedux } from 'dva/router'

import { report } from '../services/api'
import { resolveSqlToForm, resolveSqlToHeader } from '../utils/utils'
import store from '../index'

export default {
    namespace: 'reportNew',
    state: {
        // step1
        isAdd: true,
        fields: {
            modCode: '',
            reportCode: '',
            reportName: '',
            reportBody: '',
        },
        // step2
        customForm: [],
        // step3
        customHeader: [],
    },

    effects: {
        // 保存 step1
        *fetchAddReport({ payload }, {call, put, select}) {
            // 检查 sql
            const { reportBody } = payload
            const headerFields = reportBody.match(/select\s.*\sfrom/)

            if (!headerFields) {
                message.error('请输入正确的SQL语句', 5)
                return;
            }

            ;const [,headerField] = headerFields[0].split(' ')
            // 检查 *
            if (headerField === '*') {
                message.error('请明确写出查询字段，而不是 *', 5)
                return;
            }

            // 判断是否是新增，add 否则 update
            const isAdd = yield select(state => state.reportNew.isAdd)
            let res
            if (isAdd) {
                res = yield call(report.add, { data: payload })
            } else {
                res = yield call(report.update, { data: payload })
            }

            if (res && res.ok) {
                yield put({
                    type: 'saveNewReport',
                    payload,
                })
                yield put({
                    type: 'saveCustomForm',
                    payload: resolveSqlToForm(reportBody),
                })
                yield put({
                    type: 'saveCustomHeader',
                    payload: resolveSqlToHeader(reportBody),
                })
                yield put(
                    routerRedux.push('step2')
                )
                // 将状态改变
                yield put({
                    type: 'changeAddStatus',
                    payload: false,
                })

                let reportList = yield select(state => state.report.reportList)
                const isAdded = reportList.some(item => item.reportCode === payload.reportCode)

                if (isAdded) {
                    reportList = reportList.map((item) => {
                        if (item.reportCode === payload.reportCode) {
                            return payload
                        }
                        return item
                    })
                } else {
                    reportList.push(payload)
                }
                store.dispatch({
                    type: 'report/saveReportList',
                    payload: reportList,
                })
            }
        },
        *fetchAddCustomForm({ payload }, { call, put, select }) {
            const { fields } = yield select(state => state.reportNew)
            // TODO: 这里还要处理下拉框的 option数据
            const customForm = [...payload]
            customForm.forEach((item) => {
                if (item.type === 'select') {
                    item.options = []
                }
            })

            const res = yield call(report.addoreditwhere, {
                data: {
                    reportCode: fields.reportCode,
                    modCode: fields.modCode,
                    whereJson: JSON.stringify(customForm),
                },
            })

            if (res && res.ok) {
                yield put(routerRedux.push('step3'))
                yield put({
                    type: 'saveCustomForm',
                    payload: customForm,
                })
            }
        },
        *fetchAddCustomHeader({ payload }, { call, put, select }) {
            const { fields } = yield select(state => state.reportNew)

            const res = yield call(report.addoredithead, {
                data: {
                    reportCode: fields.reportCode,
                    modCode: fields.modCode,
                    headJson: JSON.stringify(payload),
                },
            })

            if (res && res.ok) {
                message.success('保存成功')
                store.dispatch({
                    type: 'report/changeCurrentReport',
                    payload: fields.reportCode,
                })
                store.dispatch({ type: 'report/fetchReport' })
                yield put(routerRedux.push(`/customize/report/${fields.reportCode}`))
            }
        },
    },

    reducers: {
        // 基础数据 step1
        saveNewReport (state, action) {
            return {
                ...state,
                fields: action.payload,
            }
        },
        // 解析 生成默认表单数据 step2
        saveCustomForm (state, action) {
            return {
                ...state,
                customForm: action.payload,
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
        // 解析 生成默认表格数据 step3
        saveCustomHeader (state, action) {
            return {
                ...state,
                customHeader: action.payload,
            }
        },
        // 重置 所有
        clearStore (state) {
            return {
                ...state,
                isAdd: true,
                fields: {
                    modCode: '',
                    reportCode: '',
                    reportName: '',
                    reportBody: '',
                },
                customForm: [],
                customHeader: [],
            }
        },
        changeAddStatus (state, action) {
            return {
                ...state,
                isAdd: action.payload,
            }
        },
    },
};
