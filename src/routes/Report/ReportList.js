import React, { PureComponent } from 'react'
import { PropTypes } from 'prop-types'
import { Button, Menu, Icon } from 'antd'

import styles from './ReportList.less'


export default class ReportList extends PureComponent {
    render () {
        const { reports, reportCode } = this.props

        return (
            <div className={styles.container}>
                <div className={styles.sideButton}>
                    <Button
                        size="small"
                        onClick={this.props.addReport}
                    >添加报表
                    </Button>
                </div>
                <Menu
                    selectedKeys={[reportCode]}
                    onSelect={({ key }) => {
                        this.props.selectReport(key)
                    }}
                >
                    {reports.map((item) => (
                        <Menu.Item
                            key={item.reportCode}
                        >
                            <span title={item.reportName}>
                                <Icon type="layout" />{item.reportName}
                            </span>
                        </Menu.Item>
                    ))}
                </Menu>
            </div>
        )
    }
}

ReportList.defaultProps = {
    selectReport: () => {},
    addReport: () => {},
    reportCode: null,
}
ReportList.propTypes = {
    reports: PropTypes.array.isRequired,
    selectReport: PropTypes.func,
    addReport: PropTypes.func,
    reportCode: PropTypes.string,
}
