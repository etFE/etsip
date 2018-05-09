import React from 'react'
import { connect } from 'dva';
import { Card, Spin } from 'antd';
import { Route, Redirect, Switch, routerRedux } from 'dva/router';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import ReportList from './ReportList'

import { getRoutes } from '../../utils/utils';
import styles from './ReportLayout.less'

@connect(({ report, loading }) => ({
    report,
    loading: loading.models.report,
}))
export default class ReportLayout extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
        }
    }

    componentDidMount () {
        this.queryReports()
    }

    queryReports () {
        const { dispatch } = this.props
        dispatch({
            type: 'report/fetchReports',
        })
    }

    selectReport = (reportKey) => {
        const { dispatch, location } = this.props
        const path = `/report/${reportKey}`
        if (reportKey && location.pathname !== path) {
            dispatch(
                routerRedux.push(path)
            )
        }
    }

    addReport = () => {
        const { dispatch, location } = this.props

        if (location.pathname !== '/report/add') {
            dispatch(
                routerRedux.push('/report/add')
            )
        }
    }

    render () {
        const { report: { reports }, loading, match, routerData } = this.props
        return (
            <PageHeaderLayout>
                <Card bordered={false}>
                    <Spin spinning={loading}>
                        <div className={styles.container}>
                            <div className={styles.side}>
                                <ReportList
                                    reports={reports}
                                    selectReport={this.selectReport}
                                    addReport={this.addReport}
                                />
                            </div>
                            <div className={styles.content}>
                                <Switch>
                                    {getRoutes(match.path, routerData).map(item => (
                                        <Route
                                            key={item.key}
                                            path={item.path}
                                            component={item.component}
                                            exact={item.exact}
                                        />
                                    ))}
                                    <Redirect exact from="/report" to="/report/add" />
                                </Switch>
                            </div>
                        </div>
                    </Spin>
                </Card>
            </PageHeaderLayout>
        )
    }
}
