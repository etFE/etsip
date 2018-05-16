import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Button, Modal } from 'antd'

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
                            { value: 'date', text: '日期框' },
                            { value: 'checkbox', text: '复选框' },
                        ],
                    },
                },
                // {
                //     title: '更多配置',
                //     dataIndex: 'operation',
                //     editor: { type: 'text' },
                // },
            ],
        }
    }

    render () {
        return (
            <Fragment>
                <CustomTable
                    editable
                    changeCell={this.props.changeCell}
                    dataSource={this.props.dataSource}
                    columns={this.state.columns}
                />
            </Fragment>
        )
    }
}

ConfigForm.propTypes = {
    dataSource: PropTypes.array.isRequired,
    changeCell: PropTypes.func.isRequired,
}
