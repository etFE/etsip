import React, { Component } from 'react'
import { connect } from 'dva'
import { Button } from 'antd'

import ConfigForm from '../components/ConfigForm'
import { resolveSqlToForm } from '../../../utils/utils'
import styles from './step.less'

@connect(({report}) => ({
    report,
}))
export default class UpdateForm extends Component {
    handleSave = () => {
        const { dispatch } = this.props
        dispatch({
            type: 'report/fetchUpdateCustomForm',
            payload: this.configForm.state.dataSource,
        })
    }

    render () {
        const { report: { currentReport } } = this.props
        let dataSource
        if (currentReport.formData.length > 0) {
            dataSource = currentReport.formData
        } else {
            dataSource = resolveSqlToForm(currentReport.reportBody)
        }
        return (
            <div className={styles.container}>
                <ConfigForm
                    ref={ref => {this.configForm = ref}}
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
