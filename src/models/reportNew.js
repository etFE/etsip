import { message } from 'antd'
import { routerRedux } from 'dva/router'

import { report } from '../services/api';
import { mockPromise } from '../utils/utils.js'

export default {
    namespace: 'reportNew',
    state: {
        // step1
        fields: {
            mod_code: '01',
            reportCode: '01',
            reportName: 'reportTest',
            reportBody: `select name,code,date as month, c1.desc from (
                select * from chartA c1 where c1.id=1 and c1.name=@name
            ) c2 where c2.code=@code and c2.name=@name and c2.date=@date`,
        },
        // step2
        customForm: [],
        // step3
        customHeader: [],
    },

    effects: {
        // 保存 step1
        *fetchAddReport({ payload }, {call, put}) {
            // 检查 sql
            const { reportBody } = payload
            const headerFields = reportBody.match(/select\s.*\sfrom/)[0]
            ;const [,headerField] = headerFields.split(' ')
            // 检查 *
            if (headerField === '*') {
                message.error('请明确写出查询字段，而不是 *', 5)
                return;
            }
            // fetch
            // const res = yield call(report.add, payload)
            const res = yield call(mockPromise, { ok: true })

            if (res && res.ok) {
                yield put({
                    type: 'saveCustomForm',
                    payload: reportBody,
                })
                yield put({
                    type: 'saveCustomHeader',
                    payload: headerField,
                })
                yield put(
                    routerRedux.push('step2')
                )
            }
        },
        *fetchAddCustomForm({ payload }, { call, put }) {
            // const res = yield call(report.addOrEditWhere, payload)
            const res = yield call(mockPromise, { ok: true })

            if (res && res.ok) {
                yield put(routerRedux.push('step3'))
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
            const reportBody = action.payload
            const paramArray = reportBody.match(/@[a-zA-Z_]+/g)
            const customForm = []
            if (paramArray) {
                paramArray.forEach((item, index) => {
                    const id = item.split('@')[1]
                    customForm.push(
                        { id, text: id, type: 'input', s_editable: true, s_key: index + 1 }
                    )
                })
            }
            return {
                ...state,
                customForm,
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
            let headerFields = action.payload
            headerFields = headerFields.split(',')

            const columns = headerFields.map((field) => {
                let text = field
                if (text.indexOf('as') !== -1) {
                    ;[,text] = text.split(' as ')
                }
                if (text.indexOf('.') !== -1) {
                    ;[,text] = text.split(' ')
                }
                return {
                    dataIndex: text,
                    title: text,
                    isShow: true,
                    align: 'left',
                    width: 'auto',
                    sorter: false,
                    fixed: 'false',
                }
            })
            return {
                ...state,
                customHeader: columns,
            }
        },

        // 重置 所有
        clearStore (state) {
            return {
                ...state,
                fields: {
                    mod_code: '',
                    reportCode: '',
                    reportName: '',
                    reportBody: '',
                },
                customForm: [],
                customHeader: [],
            }
        },

    },
};
