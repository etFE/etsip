import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
    Card,
    Button,
} from 'antd';
import EditableTable from 'components/EditableTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './index.less';

const defaultRow = {
    dataIndex: '',
    title: '',
    isShow: true,
    align: 'left',
    width: 'auto',
    sorter: false,
    fixed: 'false',
}
const list = [
    {
        dataIndex: 'col1',
        title: '列一',
        isShow: true,
        align: 'left',
        width: 'auto',
        sorter: false,
        fixed: 'false',
    },
    {
        dataIndex: 'col2',
        title: '列二',
        isShow: true,
        align: 'left',
        width: 'auto',
        sorter: true,
        fixed: 'false',
    },
    {
        dataIndex: 'col3',
        title: '列三',
        isShow: false,
        align: 'center',
        width: '200',
        sorter: false,
        fixed: 'false',
    },
]
const cols = [
    {
        title: '字段名',
        dataIndex: 'dataIndex',
        editor: { type: 'text' },
        width: 120,
    },
    {
        title: '显示名',
        dataIndex: 'title',
        editor: { type: 'text' },
        width: 120,
    },
    {
        title: '是否显示',
        dataIndex: 'isShow',
        editor: { type: 'checkbox' },
        width: 120,
    },
    {
        title: '对齐方式',
        dataIndex: 'align',
        editor: {
            type: 'select',
            options: [
                { value: 'left', text: 'left' },
                { value: 'right', text: 'right' },
                { value: 'center', text: 'center' },
            ],
        },
        width: 120,
    },
    {
        title: '列宽度',
        dataIndex: 'width',
        editor: { type: 'text' },
        width: 120,
    },
    {
        title: '排序功能',
        dataIndex: 'sorter',
        editor: { type: 'checkbox' },
        width: 120,
    },
    {
        title: '固定列',
        dataIndex: 'fixed',
        editor: {
            type: 'select',
            options: [
                { value: 'false', text: '不固定' },
                { value: 'left', text: '向左固定' },
                { value: 'right', text: '向右固定' },
            ],
        },
        width: 120,
    },
]

@connect(({ maSlog, loading }) => ({
    maSlog,
    loading: loading.models.maSlog,
}))
export default class ConfigHeader extends PureComponent {
    constructor (props) {
        super(props)

        this.state = {
            dataSource: list,
            columns: cols,
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
                        <EditableTable
                            dataSource={this.state.dataSource}
                            columns={this.state.columns}
                        />
                    </div>
                </Card>
            </PageHeaderLayout>
        );
    }
}

