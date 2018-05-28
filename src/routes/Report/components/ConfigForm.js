import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import CustomTable from 'components/Table/CustomTable'

export default class ConfigForm extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            columns: [
                {
                    title: '字段名',
                    dataIndex: 'id',
                },
                {
                    title: '显示名',
                    dataIndex: 'text',
                    editor: { type: 'text' },
                },
                {
                    title: '编辑类型',
                    dataIndex: 'type',
                    editor: {
                        type: 'select',
                        options: [
                            { value: 'input', text: '文本框' },
                            { value: 'select', text: '下拉框' },
                            { value: 'datepicker', text: '日期框' },
                            { value: 'checkbox', text: '复选框' },
                        ],
                    },
                },
                {
                    title: '下拉框数据源',
                    dataIndex: 'dictCode',
                    editor: {
                        type: 'select',
                        options: [
                            { value: 'input', text: '文本框' },
                            { value: 'select', text: '下拉框' },
                            { value: 'datepicker', text: '日期框' },
                            { value: 'checkbox', text: '复选框' },
                        ],
                        onlyNew (record) {
                            if (record.type === 'select') {
                                return true
                            }
                            return false
                        },
                    },
                },
            ],
            dataSource: [],
        }
    }

    componentWillMount () {
        const { dataSource } = this.props
        dataSource.forEach((data, index) => {
            data.s_editable = true
            data.s_key = index + 1
        })
        this.setState({
            dataSource,
        })
    }

    changeCell = ({ key, dataIndex, value }) => {
        const { dataSource } = this.state

        dataSource.forEach((data) => {
            if (data.s_key === key) {
                data[dataIndex] = value
            }
        })

        this.setState({
            dataSource,
        })
    }

    render () {
        return (
            <CustomTable
                editable
                changeCell={this.changeCell}
                dataSource={this.state.dataSource}
                columns={this.state.columns}
            />
        )
    }
}

ConfigForm.propTypes = {
    dataSource: PropTypes.array.isRequired,
}
