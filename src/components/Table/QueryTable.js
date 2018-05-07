import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'antd'

import BasicTable from './BasicTable'
import styles from './QueryTable.less'


export default class QueryTable extends PureComponent {
    // 查询方法
    handleQuery = () => {
        this.props.queryData()
    }

    // 初始化列
    initColumns () {
        const columns = [...this.props.columns]
        // 添加显示序列的列
        columns.unshift({
            title: '#',
            dataIndex: 's_key',
            width: 60,
            align: 'center',
        })
        return columns
    }

    render () {
        const { dataSource, loading, buttonGroup } = this.props
        const columns = this.initColumns()

        return (
            <div className={styles.queryTable}>
                <div className={styles.buttonGroup}>
                    <Button
                        type="primary"
                        icon="search"
                        size="small"
                        onClick={this.handleQuery}
                    >查询
                    </Button>
                    { buttonGroup }
                </div>
                <BasicTable
                    loading={loading}
                    dataSource={dataSource}
                    columns={columns}
                />
            </div>
        )
    }
}

QueryTable.defaultProps = {
    loading: false,
    queryData: () => {},
}
QueryTable.propTypes = {
    dataSource: PropTypes.array.isRequired, // 数据
    columns: PropTypes.array.isRequired, // 列
    loading: PropTypes.bool, // 加载

    queryData: PropTypes.func, // 查询方法
}
