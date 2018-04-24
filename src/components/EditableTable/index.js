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

    componentDidMount () {
        this.initDataSource(this.props.dataSource)
        this.initColumns(this.props.columns)
    }

    // 单元格数据更改
    onCellChange = (key, dataIndex) => {
        return (value) => {
            const dataSource = [...this.state.dataSource];
            const target = dataSource.find(item => item.s_key === key);
            if (target) {
                target[dataIndex] = value;
                this.setState({ dataSource });
            }
        };
    }
    // 查询方法
    handleQuery = () => {

    }
    // 添加行
    handleAddRow = () => {
        const { defaultRow } = this.props
        const { dataSource } = this.state
        const lastRow = dataSource[dataSource.length - 1]
        const newData = [
            ...dataSource,
            Object.assign({}, defaultRow, { s_key: lastRow ? lastRow.s_key + 1 : 0 }),
        ];
        this.setState({ dataSource: newData })
    }
    // 行保存
    handleRowSave = (record) => {
        this.onCellChange(record.s_key, 's_editable')(false)
    }
    // 行删除
    handleRowDelete = (record) => {
        const dataSource = [...this.state.dataSource];
        this.setState({ dataSource: dataSource.filter(item => item.s_key !== record.s_key) })
    }
    // 初始化数据
    initDataSource (list) {
        // 手动给数据添加key的字段，来表示唯一字段
        const dataSource = list.map((item, index) => {
            Object.assign(item, { s_key: index })
            return item
        })
        this.setState({ dataSource })
    }
    // 初始化列
    initColumns (cols) {
        let columns = [...cols]
        // 添加显示序列的列
        columns.unshift({
            title: '#',
            dataIndex: 's_key',
            width: 40,
            align: 'center',
            // fixed: 'left',
            render: text => text + 1,
        })
        // 增加编辑操作按钮列
        columns.push({
            title: '操作',
            dataIndex: 's_operations',
            width: 100,
            align: 'center',
            // fixed: 'right',
            render: (text, record) => (
                <EditCellOperations
                    editable={record.s_editable}
                    rowSave={() => this.handleRowSave(record)}
                    rowDelete={() => this.handleRowDelete(record)}
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

        this.setState({ columns })
    }

    render () {
        const { dataSource, columns } = this.state
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
                    <Button
                        icon="plus-circle-o"
                        size="small"
                        onClick={this.handleAddRow}
                    >添加行
                    </Button>
                </div>
                <Table
                    bordered
                    rowKey='s_key'
                    dataSource={dataSource}
                    columns={columns}
                    size="middle"
                    scroll={{ x: true }}
                    onRow={(record) => {
                        return {
                            onDoubleClick: () => {
                                this.onCellChange(record.s_key, 's_editable')(true)
                            },
                        }
                    }}
                />
            </div>
        )
    }
}

EditableTable.defaultProps = {
    defaultRow: {},
}
EditableTable.propTypes = {
    dataSource: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
    defaultRow: PropTypes.object,
}
