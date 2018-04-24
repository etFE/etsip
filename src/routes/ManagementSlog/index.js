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

        // this.state = {
        //     selectedRows: [],
        // }
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

    // handleSelectRows = rows => {
    //     this.setState({
    //         selectedRows: rows,
    //     });
    // };

    render() {
        const { maSlog, loading } = this.props;
        // const { selectedRows } = this.state;

        const columns = [
            {
                title: '用户',
                dataIndex: 'username',
            },
            {
                title: 'uid',
                dataIndex: 'uid',
            },
            {
                title: 't',
                dataIndex: 't',
            },
            {
                title: 'source',
                dataIndex: 'source',
            },
            {
                title: 'ip',
                dataIndex: 'ip',
            },
            {
                title: '信息',
                dataIndex: 'msg',
            },
            {
                title: '标签',
                dataIndex: 'tag',
            },
            {
                title: '创建时间',
                dataIndex: 'createTime',
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
                            // onSelectRow={this.handleSelectRows}
                        />
                    </div>
                </Card>
            </PageHeaderLayout>
        );
    }
}

