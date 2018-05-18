import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { Button } from 'antd'

import ConfigHeader from '../components/ConfigHeader'
import styles from './step.less'

@connect(({report}) => ({
    report,
}))
export default class UpdateHeader extends PureComponent {
    handleSave = () => {
        const { dataSource } = this.customTable.props
        const { dispatch } = this.props
        dispatch({
            type: 'report/fetchUpdateCustomHeader',
            payload: dataSource,
        })
    }

    render () {
        const { report: { currentReport } } = this.props
        return (
            <div className={styles.container}>
                <ConfigHeader
                    ref={ref => {this.customTable = ref}}
                    dataSource={currentReport.columns}
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
