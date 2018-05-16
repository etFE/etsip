import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import { Button } from 'antd'

import ConfigForm from '../components/ConfigForm'

import styles from './step.less'

@connect(({reportNew}) => ({
    reportNew,
}))
export default class Step2 extends PureComponent {

    componentDidMount () {
        const { reportNew: { customForm } } = this.props

        if (customForm && customForm.length === 0) {
            this.handleGoPrev()
        }
    }

    handleChangeTable = (params) => {
        const { dispatch } = this.props
        dispatch({
            type: 'reportNew/changeCustomForm',
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
        const { dispatch } = this.props
        dispatch({ type: 'reportNew/fetchAddCustomForm' })
    }

    render () {
        const { reportNew: { customForm } } = this.props

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
                    >保存并下一步
                    </Button>
                </div>
            </div>
        )
    }
}
