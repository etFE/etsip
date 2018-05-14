import React, { PureComponent } from 'react'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Button } from 'antd'

import BasicForm from '../components/BasicForm'

import styles from './step.less'

@connect(({ reportNew }) => ({
    reportNew,
}))
export default class Step1 extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            fields: {},
        }
    }

    componentWillMount () {
        const { reportNew } = this.props
        const keys = Object.keys(reportNew.fields)
        const data = {}

        keys.forEach((key) => {
            data[key] = { value: reportNew.fields[key] }
        })
        this.setState({
            fields: data,
        })
    }

    handleFormChange = (changedFields) => {
        this.setState(({ fields }) => ({
            fields: { ...fields, ...changedFields },
        }))
    }

    handleGoNext = () => {
        // 表单验证
        this.form.validateFields((err, values) => {
            if (!err) {
                const { dispatch } = this.props
                dispatch({
                    type: 'reportNew/fetchAddReport',
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
                    onChange={this.handleFormChange}
                />
                <div className={styles.buttonGroup}>
                    <Button
                        type="primary"
                        onClick={this.handleGoNext}
                    >保存并下一步
                    </Button>
                </div>
            </div>
        )
    }
}
