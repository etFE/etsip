import { report } from '../services/api';
import { mockPromise } from '../utils/utils.js'

// 遍历数据及子数据，增加s_key字段
const loopAndSetKey = (data, prekey) => {
    const dataSource = data.map((record, index) => {
        record.s_key = prekey ? `${prekey}-${index+1}` : `${index+1}`

        if (record.children) {
            // if (record.children.length > 0) {
            record.children = loopAndSetKey(record.children, record.s_key)
            // } else {
            //     delete record.children
            // }
        }
        return record
    })
    return dataSource
}

// 遍历，过滤出key相同的数据
const loopAndFilter = (data, s_key) => {
    const dataSource = data.filter((item) => {
        if (item.children) {
            item.children = loopAndFilter(item.children, s_key)
        }
        return item.s_key !== s_key
    })
    return dataSource
}

// 递归数据，并做什么事情
// 必须无副作用回调函数
const loopDataAndDo = (data, callback) => {
    data.forEach((record) => {
        callback(record)

        if (record.children) {
            record.children = loopDataAndDo(record.children, callback)
        }
    })
    return data
}

export default {
    namespace: 'report',

    state: {
        dataSource: [],
        pagination: {},
    },

    effects: {
        *fetch(_, { call, put }) {
            // const response = yield call(report.query);
            const response = yield call(mockPromise, {
                list: [
                    {
                        dataIndex: 'col1',
                        title: '列一',
                        isShow: true,
                        align: 'left',
                        width: 'auto',
                        sorter: false,
                        fixed: 'false',
                        children: [
                            {
                                dataIndex: 'col1-1',
                                title: '列一中一',
                                isShow: true,
                                align: 'left',
                                width: 'auto',
                                sorter: false,
                                fixed: 'false',
                                children: [
                                    {
                                        dataIndex: 'col1-1-1',
                                        title: '列一中一中一',
                                        isShow: true,
                                        align: 'left',
                                        width: 'auto',
                                        sorter: false,
                                        fixed: 'false',
                                    },
                                ],
                            },
                            {
                                dataIndex: 'col1-1',
                                title: '列一中一',
                                isShow: true,
                                align: 'left',
                                width: 'auto',
                                sorter: false,
                                fixed: 'false',
                            },
                        ],
                    },
                    {
                        dataIndex: 'col2',
                        title: '列二',
                        isShow: true,
                        align: 'left',
                        width: 'auto',
                        sorter: true,
                        fixed: 'false',
                        children: [],
                    },
                    {
                        dataIndex: 'col3',
                        title: '列三',
                        isShow: false,
                        align: 'center',
                        width: '200',
                        sorter: false,
                        fixed: 'false',
                    },
                ],
                pager: {},
            })
            yield put({
                type: 'save',
                payload: response,
            });
        },
        *add({ payload }, { call, put }) {
            const { record } = payload
            // const response = yield call(report.add, payload.rowData);
            const response = yield call(mockPromise, { ok: true })
            if (response && response.ok) {
                yield put({
                    type: 'changeCell',
                    payload: {
                        key: record.s_key,
                        dataIndex: 's_editable',
                        value: false,
                    },
                })
                yield put({
                    type: 'changeCell',
                    payload: {
                        key: record.s_key,
                        dataIndex: 's_newrow',
                        value: false,
                    },
                })
            }
        },
        *update({ payload }, { call, put }) {
            const { record } = payload
            // const response = yield call(report.update, payload.rowData);
            const response = yield call(mockPromise, { ok: true })
            if (response && response.ok) {
                yield put({
                    type: 'changeCell',
                    payload: {
                        key: record.s_key,
                        dataIndex: 's_editable',
                        value: false,
                    },
                })
            }
        },
        *delete({ payload }, { call, put }) {
            // const response = yield call(report.update, payload.rowData);
            const { record } = payload
            let response
            if (!record.s_newrow) {
                response = yield call(mockPromise, { ok: true })
            }
            if ((response && response.ok) || record.s_newrow) {
                yield put({
                    type: 'deleteRecord',
                    payload: record,
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
        addNewRecord (state, action) {
            const { defaultRow } = action.payload
            const { dataSource } = state
            const lastRow = dataSource[dataSource.length - 1]
            const newRecord = Object.assign({}, defaultRow || {}, {
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

        // 遍历，外界页面自定义callback执行
        loopDataAndTodo (state, action) {
            const { callback } = action
            const dataSource = loopDataAndDo([...state.dataSource], (record) => {
                callback(record)
            })
            return {
                ...state,
                dataSource,
            }
        },

    },
};
