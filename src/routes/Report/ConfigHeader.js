import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
    Card,
    Button,
} from 'antd';
import EditTable from 'components/EditTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './index.less';

@connect(({ maSlog, loading }) => ({
    maSlog,
    loading: loading.models.maSlog,
}))
export default class ConfigHeader extends PureComponent {
    constructor (props) {
        super(props)

        this.state = {
        }
        this.handleQuery = this.handleQuery.bind(this)
    }

    componentDidMount() {
        this.handleQuery()
    }

    handleQuery () {
        // const { dispatch } = this.props;
        // dispatch({
        //     type: 'maSlog/fetch',
        // });
    }


    render() {
        return (
            <PageHeaderLayout>
                <Card bordered={false}>
                    <div className={styles.tableList}>
                        <div className={styles.tableListForm} />
                        <EditTable />
                    </div>
                </Card>
            </PageHeaderLayout>
        );
    }
}

