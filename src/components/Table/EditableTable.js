import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'antd'

import BasicTable from './BasicTable'
import EditableTableCell, { changeToEditCell  } from './EditableTableCell'
import styles from './EditableTable.less'

const {
    EditCellOperations,
} = EditableTableCell

/**
 * 表格内编辑，双击行开启编辑
 * 编辑类型 -> text select checkbox datepicker
 * s_前缀来标识内置属性
 */
export default class EditableTable extends PureComponent {
    // 单元格数据更改
    onCellChange = (key, dataIndex) => {
        return (value) => {
            this.props.changeCell({ key, dataIndex, value })
        };
    }

    // 查询方法
    handleQuery = () => {
        this.props.queryData()
    }
    // 添加行
    handleRowAdd = () => {
        this.props.addNewRecord()
    }
    // 行保存
    handleRowSave = (record) => {
        if (record.s_newrow) {
            this.props.addData(record)
        } else {
            this.props.updateData(record)
        }
    }

    // 行删除
    handleRowDelete = (record) => {
        this.props.deleteData(record)
    }

    // 初始化列
    initColumns () {
        let columns = [...this.props.columns]

        columns.unshift({
            title: '#',
            dataIndex: 's_key',
            width: 60,
            align: 'center',
        })

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
        columns = changeToEditCell(columns, this.onCellChange)

        return columns
    }

    render () {
        const { dataSource, pagination, loading, buttonGroup } = this.props
        const columns = this.initColumns()

        return (
            <div className={styles.editableTable}>
                {buttonGroup !== false ? (
                    <div className={styles.buttonGroup}>
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
                            onClick={this.handleRowAdd}
                        >添加行
                        </Button>
                        { buttonGroup }
                    </div>
                ) : null}
                <BasicTable
                    loading={loading}
                    dataSource={dataSource}
                    columns={columns}
                    pagination={pagination}
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
    loading: false,
    operations: () => [],
    queryData: () => {},
    addNewRecord: () => {},
    addData: () => {},
    updateData: () => {},
    deleteData: () => {},
    changeCell: () => {},
    // pagination: {},
}
EditableTable.propTypes = {
    dataSource: PropTypes.array.isRequired, // 数据
    columns: PropTypes.array.isRequired, // 列
    operations: PropTypes.func, // 自定义操作按钮，传递了record。必须是一个返回数组的函数
    loading: PropTypes.bool, // 加载

    queryData: PropTypes.func, // 查询方法
    addNewRecord: PropTypes.func, // 添加新行
    addData: PropTypes.func, // 添加新数据
    updateData: PropTypes.func, // 更新数据
    deleteData: PropTypes.func, // 删除数据
    changeCell: PropTypes.func, // 单元格更新
    // pagination: PropTypes.object
}
