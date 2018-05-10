import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import { Button } from 'antd'

import ConfigForm from '../components/ConfigForm'

import styles from './step.less'

@connect(({report}) => ({
    report,
}))
export default class Step2 extends PureComponent {

    componentDidMount () {
        const { report, dispatch } = this.props
        const sql = report.fields.reportBody

        if (!sql) {
            dispatch(routerRedux.push('step1'))
        } else {
            dispatch({
                type: 'report/generateCustomForm',
            })
        }

    }

    handleChangeTable = (params) => {
        const { dispatch } = this.props
        dispatch({
            type: 'report/changeCustomForm',
            payload: params,
        })
    }

    handleGoPrev = () => {
        const { dispatch } = this.props
        dispatch(
            routerRedux.push('step1')
        )
    }
    handleGoNext = () => {
        const { dispatch, report } = this.props
        dispatch({
            type: 'report/addNewReport',
            payload: {
                fields: report.fields,
                customForm: report.customForm,
            },
        })
    }

    render () {
        const { report: { customForm } } = this.props

        return (
            <div className={styles.container}>
                <ConfigForm
                    dataSource={customForm}
                    changeCell={this.handleChangeTable}
                />
                <div className={styles.buttonGroup}>
                    <Button onClick={this.handleGoPrev} >上一步</Button>
                    <Button
                        type="primary"
                        onClick={this.handleGoNext}
                    >下一步
                    </Button>
                </div>
            </div>
        )
    }
}
