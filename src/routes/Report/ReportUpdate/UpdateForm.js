import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { Button } from 'antd'

import ConfigForm from '../components/ConfigForm'

import styles from './step.less'

@connect(({report}) => ({
    report,
}))
export default class UpdateForm extends PureComponent {
    handleSave = () => {
        const { dispatch } = this.props

        dispatch({
            type: 'report/fetchUpdateCustomForm',
            payload: this.configForm.props.dataSource,
        })
    }

    render () {
        const { report: { currentReport } } = this.props
        return (
            <div className={styles.container}>
                <ConfigForm
                    ref={ref => {this.configForm = ref}}
                    dataSource={currentReport.formData}
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
