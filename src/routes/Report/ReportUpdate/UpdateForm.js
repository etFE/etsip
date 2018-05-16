import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import { Button } from 'antd'

import ConfigForm from '../components/ConfigForm'

import styles from './step.less'

@connect(({report}) => ({
    report,
}))
export default class UpdateForm extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            customForm: [],
        }
    }

    componentWillMount () {
        const { report: { currentReport } } = this.props
        const customForm = currentReport.formData || []
        customForm.forEach((item, index) => {
            item.s_key = index + 1
            item.s_editable = true
        })
        this.setState({
            customForm,
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

    handleChangeTable = () => {
        console.log('change')
    }

    render () {
        const { customForm } = this.state

        return (
            <div className={styles.container}>
                <ConfigForm
                    dataSource={customForm}
                    changeCell={this.handleChangeTable}
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
