import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
    Card,
    Button,
} from 'antd';
import BasicTable from 'components/BasicTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './index.less';

@connect(({ maSlog, loading }) => ({
    maSlog,
    loading: loading.models.maSlog,
}))
export default class ManagementSlog extends PureComponent {
    constructor (props) {
        super(props)

        this.state = {
            selectedRows: [],
        }
        this.handleQuery = this.handleQuery.bind(this)
    }

    componentDidMount() {
        this.handleQuery()
    }

    handleQuery () {
        const { dispatch } = this.props;
        dispatch({
            type: 'maSlog/fetch',
        });
    }

    handleSelectRows = rows => {
        this.setState({
            selectedRows: rows,
        });
    };

    render() {
        const { maSlog, loading } = this.props;
        const { selectedRows } = this.state;

        const columns = [
            {
                title: '信息',
                dataIndex: 'msg',
            },
        ];
        return (
            <PageHeaderLayout>
                <Card bordered={false}>
                    <div className={styles.tableList}>
                        <div className={styles.tableListForm}>
                            <Button
                                type="primary"
                                onClick={this.handleQuery}
                            >
                                查询
                            </Button>
                        </div>
                        <BasicTable
                            loading={loading}
                            data={maSlog.data}
                            columns={columns}
                            onSelectRow={this.handleSelectRows}
                        />
                    </div>
                </Card>
            </PageHeaderLayout>
        );
    }
}

