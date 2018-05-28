import React, { PureComponent, Fragment } from 'react'
import { connect } from 'dva'
import { Route, Redirect, Switch } from 'dva/router'
import { Steps } from 'antd'
import { getRoutes } from '../../../utils/utils';

const { Step } = Steps

export default class ReportAdd extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
        }
    }

    getCurrentStep = () => {
        const { location } = this.props;
        const { pathname } = location;
        const pathList = pathname.split('/');
        switch (pathList[pathList.length - 1]) {
        case 'step1':
            return 0;
        case 'step2':
            return 1;
        case 'step3':
            return 2;
        default:
            return 0;
        }
    }

    render () {
        const { match, routerData } = this.props
        return (
            <Fragment>
                <h3>添加报表</h3>

                <Steps
                    size="small"
                    current={this.getCurrentStep()}
                >
                    <Step title="报表基本信息" />
                    <Step title="自定义查询条件" />
                    <Step title="自定义表头" />
                </Steps>
                <Switch>
                    {getRoutes(match.path, routerData).map(item => (
                        <Route
                            key={item.key}
                            path={item.path}
                            component={item.component}
                            exact={item.exact}
                        />
                    ))}
                    <Redirect exact from="/customize/report/add" to="/customize/report/add/step1" />
                </Switch>
            </Fragment>
        )
    }
}
