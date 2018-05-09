import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import CustomTable from 'components/Table/CustomTable'

const columns = [
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
                { value: 'text', text: '文本框' },
                { value: 'select', text: '下拉框' },
                { value: 'date', text: '日期框' },
                { value: 'checkbox', text: '复选框' },
            ],
        },
    },
]


export default class ConfigForm extends PureComponent {
    render () {
        return (
            <CustomTable
                editable
                dataSource={this.props.dataSource}
                columns={columns}
            />
        )
    }
}

ConfigForm.propTypes = {
    dataSource: PropTypes.array.isRequired,
}
