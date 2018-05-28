import { message } from 'antd'
import { loopAndSetKey, loopAndFilter, loopDataAndDo } from '../utils/editableTable.js'
import { dictionary } from '../services/api';


export default {
    namespace: 'dictionary',
    state: {
        dataSource: [],
        pagination: {},
    },
    effects: {
        *fetch({ payload }, { call, put }) {
            const response = yield call(dictionary.query, { data: payload })
            yield put({
                type: 'save',
                payload: response,
            });
        },
        *add({ payload }, { call, put }) {
            const response = yield call(dictionary.add, { data: payload })
            if (response && response.ok) {
                message.success('添加成功！')
                yield put({
                    type: 'changeCell',
                    payload: {
                        key: payload.s_key,
                        dataIndex: 's_editable',
                        value: false,
                    },
                })
                yield put({
                    type: 'changeCell',
                    payload: {
                        key: payload.s_key,
                        dataIndex: 's_newrow',
                        value: false,
                    },
                })
            }
        },
        *update({ payload }, { call, put }) {
            const response = yield call(dictionary.update, { data: payload })
            if (response && response.ok) {
                message.success('修改成功！')
                yield put({
                    type: 'changeCell',
                    payload: {
                        key: payload.s_key,
                        dataIndex: 's_editable',
                        value: false,
                    },
                })
            }
        },
        *delete({ payload }, { call, put }) {
            let response
            if (!payload.s_newrow) {
                response = yield call(dictionary.delete, { data: payload })
            }
            if ((response && response.ok) || payload.s_newrow) {
                message.success('删除成功！')
                yield put({
                    type: 'deleteRecord',
                    payload,
                })
            }
        },
    },

    reducers: {
        // TODO: 分页数据 pager格式转换 => pagination: { current, pageSize, total }
        save (state, action) {
            const dataSource = loopAndSetKey(action.payload.list)
            // const pagination = formatPagination(action.payload.pager)
            return {
                ...state,
                dataSource,
                // pagination,
            };
        },
        // 删除行
        deleteRecord (state, action) {
            const { s_key } = action.payload
            const dataSource = loopAndFilter(state.dataSource, s_key)
            return {
                ...state,
                dataSource,
            }
        },
        // 添加新行
        addNewRecord (state) {
            const { dataSource } = state
            const lastRow = dataSource[dataSource.length - 1]
            const newRecord = Object.assign({}, {
                s_key: lastRow ? `${lastRow.s_key * 1 + 1}` : '1',
                s_editable: true,
                s_newrow: true,
            })

            return {
                ...state,
                dataSource: [
                    ...dataSource,
                    newRecord,
                ],
            }
        },

        // 改变单元格的值
        // TODO: 考虑节流
        changeCell (state, action) {
            const { key, dataIndex, value } = action.payload
            const dataSource = loopDataAndDo([...state.dataSource], (record) => {
                if (record.s_key === key) {
                    record[dataIndex] = value
                }
            })
            return {
                ...state,
                dataSource,
            }
        },
    },
};
