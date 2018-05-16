import { message } from 'antd'
import { routerRedux } from 'dva/router'


import { report } from '../services/api';

export default {
    namespace: 'reportNew',
    state: {
        // step1
        fields: {
            modCode: '04',
            reportCode: '01',
            reportName: 'report 01',
            reportBody: `select name,code,date as month, c1.desc from chart c2 where c2.code=@code and c2.name=@name and c2.date=@date`,
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
            const headerFields = reportBody.match(/select\s.*\sfrom/)[0]
            ;const [,headerField] = headerFields.split(' ')
            // 检查 *
            if (headerField === '*') {
                message.error('请明确写出查询字段，而不是 *', 5)
                return;
            }

            // 判断是否是新增，add 否则 update
            const reportList = yield select(state => state.report.reportList)
            let res
            if (reportList.some(item => item.reportCode === payload.reportCode)) {
                res = yield call(report.update, { data: payload })
            } else {
                res = yield call(report.add, { data: payload })
            }

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
        *fetchAddCustomForm(_, { call, put, select }) {
            const { fields, customForm } = yield select(state => state.reportNew)
            // TODO: 这里还要处理下拉框的 option数据
            const formData = [...customForm]
            formData.forEach((item) => {
                if (item.type === 'select') {
                    item.options = []
                }
            })

            const res = yield call(report.addoreditwhere, {
                params: {
                    reportCode: fields.reportCode,
                    modCode: fields.modCode,
                    whereJson: JSON.stringify(formData),
                },
            })

            if (res && res.ok) {
                yield put(routerRedux.push('step3'))
            }
        },

        *fetchAddCustomHeader({ payload }, { call, put }) {
            const res = yield call(report.addoredithead, { params: payload })

            if (res && res.ok) {
                message.success('保存成功')
                yield put(routerRedux.push(`/report/${payload.reportCode}`))
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
                    s_editable: true,
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
                    modCode: '04',
                    reportCode: '06',
                    reportName: 'report 06',
                    reportBody: `select name,code,date as month, c1.desc from chart c2 where c2.code=@code and c2.name=@name and c2.date=@date`,
                },
                customForm: [],
                customHeader: [],
            }
        },

    },
};
