import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import { Button } from 'antd'

import ConfigHeader from '../components/ConfigHeader'
import styles from './step.less'

@connect(({report}) => ({
    report,
}))
export default class UpdateHeader extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            customHeader: [],
        }
    }

    componentWillMount () {
        const { report: { currentReport } } = this.props
        this.setState({
            customHeader: currentReport.columns || [],
        })
    }

    handleSave = () => {
        console.log('保存')
    }

    render () {
        return (
            <div className={styles.container}>
                <ConfigHeader
                    customData={this.state.customHeader}
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
