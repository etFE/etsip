import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import { Button } from 'antd'

import ConfigHeader from '../components/ConfigHeader'
import styles from './step.less'

@connect(({reportNew}) => ({
    reportNew,
}))
export default class Step3 extends PureComponent {
    componentDidMount () {
        const { reportNew: { customHeader }, dispatch } = this.props

        if (customHeader && customHeader.length === 0) {
            dispatch(
                routerRedux.push('step1')
            )
        }
    }

    handlehandleGoPrev = () => {
        const { dispatch } = this.props
        dispatch(
            routerRedux.push('step2')
        )
    }
    handleComplete = () => {
        const { dataSource } = this.customTable.props
        const { dispatch } = this.props
        dispatch({
            type: 'reportNew/fetchAddCustomHeader',
            payload: dataSource,
        })
    }

    render () {
        const { reportNew: { customHeader } } = this.props

        return (
            <div className={styles.container}>
                <ConfigHeader
                    ref={ref => {this.customTable = ref}}
                    dataSource={customHeader}
                />
                <div className={styles.buttonGroup}>
                    <Button
                        size="small"
                        onClick={this.handlehandleGoPrev}
                    >上一步
                    </Button>
                    <Button
                        size="small"
                        type="primary"
                        onClick={this.handleComplete}
                    >完成
                    </Button>
                </div>
            </div>
        )
    }
}
