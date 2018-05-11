import React, { PureComponent } from 'react'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Button } from 'antd'

import AddForm from '../components/BasicForm'

import styles from './step.less'

@connect(({ report }) => ({
    report,
}))
export default class Step1 extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            fields: {},
        }
    }

    componentWillMount () {
        const { report } = this.props
        const keys = Object.keys(report.fields)
        const data = {}

        keys.forEach((key) => {
            data[key] = { value: report.fields[key] }
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
                    type: 'report/saveNewReport',
                    payload: values,
                })
                dispatch(routerRedux.push('step2'))
            }
        })
    }

    render () {
        const { fields } = this.state

        return (
            <div className={styles.container}>
                <AddForm
                    {...fields}
                    ref={ref => {this.form = ref}}
                    onChange={this.handleFormChange}
                />
                <div className={styles.buttonGroup}>
                    <Button
                        type="primary"
                        onClick={this.handleGoNext}
                    >保存并预览
                    </Button>
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
