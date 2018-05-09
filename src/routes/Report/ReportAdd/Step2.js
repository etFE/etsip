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
        const sql = report.fields.reportSql

        if (!sql) {
            dispatch(routerRedux.push('step1'))
        }
    }

    generateData = () => {
        const { report } = this.props
        const sql = report.fields.reportSql
        const res = sql.match(/@[a-zA-Z_]+/g)
        const dataSource = []

        res.forEach((item, index) => {
            const id = item.split('@')[1]
            dataSource.push(
                { id, text: id, type: 'text', s_editable: true, s_key: index + 1 }
            )
        })
        return dataSource
    }

    handleGoPrev = () => {
        const { dispatch } = this.props
        dispatch(
            routerRedux.push('step1')
        )
    }
    handleGoNext = () => {

    }

    render () {
        return (
            <div className={styles.container}>
                <ConfigForm dataSource={this.generateData()} />
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
