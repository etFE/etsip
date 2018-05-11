import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import { Button } from 'antd'

import ConfigHeader from '../components/ConfigHeader'
import styles from './step.less'

@connect(({report}) => ({
    report,
}))
export default class Step3 extends PureComponent {
    componentDidMount () {
        // const { report, dispatch } = this.props
        // if (!report.fields.reportCode) {
        //     dispatch(
        //         routerRedux.push('step1')
        //     )
        // }
    }

    handleComplete = () => {
        console.log('完成')
    }

    render () {
        return (
            <div className={styles.container}>
                <ConfigHeader />
                <div className={styles.buttonGroup}>
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
