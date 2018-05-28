import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import styles from './CustomTable.less'
import BasicTable from './BasicTable'
import { changeToEditCell } from './EditableTableCell'

/**
 * 自定义表格 通过 editable控制是否可编辑，没有操作按钮列，别的东西都需要自己在外面配置
 */
export default class EditableTable extends Component {
    // 单元格数据更改
    onCellChange = (key, dataIndex) => {
        return (value) => {
            this.props.changeCell({ key, dataIndex, value })
        };
    }

    // 初始化列
    initColumns () {
        let columns = [...this.props.columns]
        // 添加显示序列的列
        columns.unshift({
            title: '#',
            dataIndex: 's_key',
            width: 60,
            align: 'center',
        })

        if (this.props.editable) {
            // 根据编辑类型，渲染不用编辑类型的单元格
            columns = changeToEditCell(columns, this.onCellChange)
        }
        return columns
    }

    render () {
        const { editable, loading, dataSource } = this.props
        const columns = this.initColumns()
        return (
            <BasicTable
                loading={loading}
                dataSource={dataSource}
                columns={columns}
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
        )
    }
}

EditableTable.defaultProps = {
    editable: false,
    loading: false,
    changeCell: () => {},
}
EditableTable.propTypes = {
    dataSource: PropTypes.array.isRequired, // 数据
    columns: PropTypes.array.isRequired, // 列
    editable: PropTypes.bool, // 是否是编辑表格
    loading: PropTypes.bool, // 加载
    changeCell: PropTypes.func, // 单元格更新
}
