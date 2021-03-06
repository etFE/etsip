import React, { PureComponent } from 'react'
import { connect } from 'dva';
import { Card, Spin } from 'antd';
import { Route, Redirect, Switch, routerRedux } from 'dva/router';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import ReportList from './ReportList'

import { getRoutes } from '../../utils/utils';
import styles from './ReportLayout.less'

@connect(({ report, reportNew, loading }) => ({
    report,
    reportNew,
    loading: loading.models.reportNew || loading.models.report,
}))
export default class ReportLayout extends PureComponent {
    componentDidMount () {
        this.queryReports()
    }

    queryReports () {
        const { dispatch } = this.props
        dispatch({
            type: 'report/fetchReportList',
        })
    }

    selectReport = (reportKey) => {
        const { dispatch, location } = this.props
        const path = `/customize/report/${reportKey}`
        if (reportKey && location.pathname !== path) {
            // 设置active
            dispatch({
                type: 'report/changeCurrentReport',
                payload: reportKey,
            })
            // 跳转路由
            dispatch(
                routerRedux.push(path)
            )
            dispatch({ type: 'report/fetchReport' })
        }
    }

    addReport = () => {
        const { dispatch, location } = this.props

        if (location.pathname !== '/customize/report/add') {
            // 清空状态
            dispatch({
                type: 'reportNew/clearStore',
            })
            // 跳转路由
            dispatch(
                routerRedux.push('/customize/report/add')
            )
            // 设置active为空
            dispatch({
                type: 'report/changeCurrentReport',
                payload: null,
            })
        }
    }

    render () {
        const { report: { reportList, currentReport }, loading, match, routerData } = this.props
        const redirectRoute = currentReport.reportCode ? `/customize/report/${currentReport.reportCode}` : '/customize/report/add'

        return (
            <PageHeaderLayout>
                <Card bordered={false}>
                    <Spin spinning={loading}>
                        <div className={styles.container}>
                            <div className={styles.side}>
                                <ReportList
                                    reports={reportList}
                                    reportCode={currentReport.reportCode}
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
                                    <Redirect exact from="/customize/report" to={redirectRoute} />
                                </Switch>
                            </div>
                        </div>
                    </Spin>
                </Card>
            </PageHeaderLayout>
        )
    }
}
