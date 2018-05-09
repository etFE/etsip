import React, { PureComponent } from 'react'
import { PropTypes } from 'prop-types'
import { Tree, Button } from 'antd'

import styles from './ReportList.less'

const { TreeNode } = Tree

export default class ReportList extends PureComponent {
    render () {
        const { reports, loading } = this.props

        return (
            <div className={styles.container}>
                <div className={styles.sideButton}>
                    <Button
                        size="small"
                        onClick={this.props.addReport}
                    >添加报表
                    </Button>
                </div>

                <Tree
                    showLine
                    onSelect={(selectedKeys) => {
                        this.props.selectReport(selectedKeys[0])
                    }}
                >
                    {reports.map((item) => (
                        <TreeNode
                            title={item.text}
                            key={item.id}
                        />
                    ))}
                </Tree>
            </div>
        )
    }
}

ReportList.defaultProps = {
    selectReport: () => {},
    addReport: () => {},
}
ReportList.propTypes = {
    reports: PropTypes.array.isRequired,
    selectReport: PropTypes.func,
    addReport: PropTypes.func,
}
