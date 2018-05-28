import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { Button } from 'antd'

import ConfigHeader from '../components/ConfigHeader'
import { resolveSqlToHeader } from '../../../utils/utils'
import styles from './step.less'

@connect(({report}) => ({
    report,
}))
export default class UpdateHeader extends PureComponent {
    handleSave = () => {
        const { dispatch } = this.props
        dispatch({
            type: 'report/fetchUpdateCustomHeader',
            payload: this.configHeader.state.dataSource,
        })
    }

    render () {
        const { report: { currentReport } } = this.props

        let dataSource
        if (currentReport.columns.length > 0) {
            dataSource = currentReport.columns
        } else {
            dataSource = resolveSqlToHeader(currentReport.reportBody)
        }

        return (
            <div className={styles.container}>
                <ConfigHeader
                    ref={ref => {this.configHeader = ref}}
                    dataSource={dataSource}
                />
                <div className={styles.buttonGroup}>
                    <Button
                        type="primary"
                        onClick={this.handleSave}
                    >保存
                    </Button>
                </div>
            </div>
        )
    }
}
