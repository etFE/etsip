import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { Button } from 'antd'

import BasicForm from '../components/BasicForm'

import styles from './step.less'

@connect(({ report }) => ({
    report,
}))
export default class UpdateBasic extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            fields: {},
        }
    }

    componentWillMount () {
        const { report: { currentReport } } = this.props
        const fields = {
            reportCode: { value: currentReport.reportCode, disabled: true },
            reportName: { value: currentReport.reportName },
            modCode: { value: currentReport.modCode, disabled: true },
            reportBody: { value: currentReport.reportBody },
        }
        this.setState({
            fields,
        })
    }
    handleSave = () => {
        // 表单验证
        this.form.validateFields((err, values) => {
            if (!err) {
                const { dispatch } = this.props
                dispatch({
                    type: 'report/fetchUpdateReport',
                    payload: values,
                })
            }
        })
    }

    render () {
        const { fields } = this.state

        return (
            <div className={styles.container}>
                <BasicForm
                    {...fields}
                    ref={ref => {this.form = ref}}
                    onChange={() => {}}
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
