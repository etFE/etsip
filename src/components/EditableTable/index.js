import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Table, Button } from 'antd'
import styles from './index.less'

import { EditCellText, EditCellCheckbox, EditCellSelect, EditCellDatepicker, EditCellOperations } from '../EditableTableCell'

/**
 * 表格内编辑，双击行开启编辑
 * 编辑类型 -> text select checkbox datepicker
 * s_前缀来标识内置属性
 */
export default class EditableTable extends PureComponent {
    constructor (props) {
        super(props)

        this.state = {
            dataSource: [],
            columns: [],
        }
    }

    componentWillReceiveProps (props) {
        console.log('receive')
        this.initDataSource(props.dataSource)
        this.initColumns(props.columns)
    }

    // 单元格数据更改
    onCellChange = (key, dataIndex) => {
        return (value) => {
            // const dataSource = this.loopDataAndDo([...this.state.dataSource], (record) => {
            //     if (record.s_key === key) {
            //         record[dataIndex] = value
            //     }
            // })
            // this.setState({ dataSource });
            this.props.changeCell({ key, dataIndex, value })
        };
    }

    // 递归数据，并做什么事情
    // 必须无副作用回调函数
    // loopDataAndDo = (data, callback) => {
    //     data.forEach((record) => {
    //         callback(record)

    //         if (record.children) {
    //             record.children = this.loopDataAndDo(record.children, callback)
    //         }
    //     })
    //     return data
    // }

    // 查询方法
    handleQuery = () => {
        this.props.queryData()
    }
    // 添加行
    handleRowAdd = () => {
        // const { defaultRow } = this.props
        // const { dataSource } = this.state
        // const lastRow = dataSource[dataSource.length - 1]
        // const newData = [
        //     ...dataSource,
        //     Object.assign({}, defaultRow, {
        //         s_key: lastRow ? `${lastRow.s_key * 1 + 1}` : '1',
        //         s_editable: true,
        //         s_newrow: true,
        //     }),
        // ];
        // this.setState({ dataSource: newData })
        this.props.addNewRecord()
    }
    // 行保存
    handleRowSave = async (record) => {
        // let res
        // if (record.s_newrow) {
        //     res = await this.props.addData(record)
        // } else {
        //     res = await this.props.updateData(record)
        // }
        // if (res && res.ok) {
        //     this.onCellChange(record.s_key, 's_editable')(false)
        // }
        if (record.s_newrow) {
            this.props.addData(record)
        } else {
            this.props.updateData(record)
        }
    }

    // 遍历，过滤出key相同的
    // loopDataAndFilter = (data, s_key) => {
    //     const resData = data.filter((item) => {
    //         if (item.children) {
    //             item.children = this.loopDataAndFilter(item.children, s_key)
    //         }
    //         return item.s_key !== s_key
    //     })
    //     return resData
    // }
    // 行删除
    handleRowDelete = async (record) => {
        // let res
        // if (!record.s_newrow) {
        //     res = await this.props.deleteData(record)
        // }
        // if (res && res.ok || record.s_newrow) {
        //     const dataSource = this.loopDataAndFilter([...this.state.dataSource], record.s_key)
        //     this.setState({ dataSource })
        // }
        this.props.deleteData(record)
    }

    // 递归赋予s_key
    // loopAataAndAddKey = (list, prekey) => {
    //     const dataSource = list.map((item, index) => {
    //         Object.assign(item, { s_key: prekey ? `${prekey}-${index+1}` : `${index+1}` })

    //         if (item.children) {
    //             Object.assign(item, { children: this.loopAataAndAddKey(item.children, item.s_key) })
    //         }
    //         return item
    //     })
    //     return dataSource
    // }
    // 初始化数据
    initDataSource (list) {
        // 手动给数据添加key的字段，来表示唯一字段
        // const dataSource = this.loopAataAndAddKey(list)
        this.setState({ dataSource: list })
    }
    // 初始化列
    initColumns (cols) {
        let columns = [...cols]
        // 添加显示序列的列
        columns.unshift({
            title: '#',
            dataIndex: 's_key',
            width: 80,
            // align: 'center',
            // fixed: 'left',
        })

        if (this.props.editable) {
            // 增加编辑操作按钮列
            columns.push({
                title: '操作',
                dataIndex: 's_operations',
                width: 100,
                align: 'center',
                fixed: 'right',
                render: (text, record) => (
                    <EditCellOperations
                        editable={record.s_editable}
                        rowSave={() => this.handleRowSave(record)}
                        rowDelete={() => this.handleRowDelete(record)}
                        operations={this.props.operations(record)}
                    />
                ),
            })
            // 根据编辑类型，渲染不用编辑类型的单元格
            columns = columns.map((item) => {
                if (item.editor) {
                    switch (item.editor.type) {
                    case 'text':
                        Object.assign(item, {
                            render: (text, record) => (
                                <EditCellText
                                    value={text}
                                    editable={record.s_editable}
                                    onChange={this.onCellChange(record.s_key, item.dataIndex)}
                                />
                            ),
                        })
                        break;
                    case 'checkbox':
                        Object.assign(item, {
                            render: (text, record) => (
                                <EditCellCheckbox
                                    value={text}
                                    editable={record.s_editable}
                                    onChange={this.onCellChange(record.s_key, item.dataIndex)}
                                />
                            ),
                        })
                        break;
                    case 'select':
                        Object.assign(item, {
                            render: (text, record) => {
                                return (
                                    <EditCellSelect
                                        value={text}
                                        editable={record.s_editable}
                                        options={item.editor.options}
                                        onChange={this.onCellChange(record.s_key, item.dataIndex)}
                                    />
                                )
                            },
                        })
                        break;
                    case 'date':
                        Object.assign(item, {
                            render: (text, record) => {
                                return (
                                    <EditCellDatepicker
                                        value={text}
                                        editable={record.s_editable}
                                        onChange={this.onCellChange(record.s_key, item.dataIndex)}
                                    />
                                )
                            },
                        })
                        break;
                    default:
                        break;
                    }
                }
                return item
            })
        }
        this.setState({ columns })
    }

    render () {
        const { dataSource, columns } = this.state
        const { editable, loading } = this.props
        return (
            <div className={styles.editableTable}>
                <div className={styles.editableButtonGroup}>
                    <Button
                        type="primary"
                        icon="search"
                        size="small"
                        onClick={this.handleQuery}
                    >查询
                    </Button>
                    {editable ? (
                        <Button
                            icon="plus-circle-o"
                            size="small"
                            onClick={this.handleRowAdd}
                        >添加行
                        </Button>
                    ) : null}
                </div>
                <Table
                    bordered
                    rowKey='s_key'
                    loading={loading}
                    dataSource={dataSource}
                    columns={columns}
                    size="middle"
                    scroll={{ x: true }}
                    onRow={(record) => {
                        if (editable) {
                            return {
                                onDoubleClick: () => {
                                    this.onCellChange(record.s_key, 's_editable')(true)
                                },
                            }
                        }
                        return {}
                    }}
                />
            </div>
        )
    }
}

EditableTable.defaultProps = {
    // defaultRow: {},
    editable: false,
    loading: false,
    operations: () => [],
    queryData: () => {},
    addNewRecord: () => {},
    addData: () => {},
    updateData: () => {},
    deleteData: () => {},
    changeCell: () => {},
}
EditableTable.propTypes = {
    dataSource: PropTypes.array.isRequired, // 数据
    columns: PropTypes.array.isRequired, // 列
    // defaultRow: PropTypes.object, // 添加行时的默认数据
    editable: PropTypes.bool, // 是否是编辑表格
    operations: PropTypes.func, // 自定义操作按钮，传递了record。必须是一个返回数组的函数
    loading: PropTypes.bool, // 加载

    queryData: PropTypes.func, // 查询方法
    addNewRecord: PropTypes.func, // 添加新行
    addData: PropTypes.func, // 添加新数据
    updateData: PropTypes.func, // 更新数据
    deleteData: PropTypes.func, // 删除数据
    changeCell: PropTypes.func, // 单元格更新
}
