import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'

import './BasicTable.less'

export default class BasicTable extends PureComponent {
    render () {
        const { loading, dataSource, pagination, columns } = this.props
        return (
            <Table
                bordered
                rowKey='s_key'
                loading={loading}
                dataSource={dataSource}
                columns={columns}
                pagination={pagination}
                size="middle"
                scroll={{ x: true }}
            />
        )
    }
}

BasicTable.propTypes = {
    dataSource: PropTypes.array.isRequired, // 数据
    columns: PropTypes.array.isRequired, // 列
    loading: PropTypes.bool.isRequired,
    // pagination: PropTypes
}
