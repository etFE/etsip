import React, { PureComponent } from 'react'
import { connect } from 'dva';
import { Card, Modal, Icon } from 'antd';
import EditableTable from 'components/Table/EditableTable.js'
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './dictionary.less'

@connect(({ dictionary, loading }) => ({
    dictionary,
    loading: loading.models.dictionary,
}))
export default class DictionaryContent extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            dictionaryTipShow: false,
            columns: [
                {
                    title: '字典编码',
                    dataIndex: 'dictCode',
                    width: 120,
                    editor: {
                        type: 'text',
                        onlyNew: true,
                    },
                },
                {
                    title: '字典名称',
                    dataIndex: 'dictName',
                    width: 140,
                    editor: {
                        type: 'text',
                    },
                },
                {
                    title: (
                        <span>
                            字典SQL
                            <Icon
                                type="question-circle"
                                className={styles.tipIcon}
                                onClick={this.showDictionaryTip}
                            />
                        </span>
                    ),
                    dataIndex: 'dictBody',
                    editor: {
                        type: 'textarea',
                    },
                },
            ],
        }
    }
    componentDidMount () {
        this.queryData()
    }

    showDictionaryTip = () => {
        this.setState({
            dictionaryTipShow: true,
        })
    }
    hideDictionaryTip = () => {
        this.setState({
            dictionaryTipShow: false,
        })
    }

    queryData = () => {
        const { dispatch } = this.props
        dispatch({
            type: 'dictionary/fetch',
        })
    }
    addNewRecord = () => {
        const { dispatch } = this.props
        dispatch({
            type: 'dictionary/addNewRecord',
        })
    }
    addData = (record) => {
        const { dispatch } = this.props
        dispatch({
            type: 'dictionary/add',
            payload: record,
        })
    }
    updateData = (record) => {
        const { dispatch } = this.props
        dispatch({
            type: 'dictionary/update',
            payload: record,
        })
    }
    deleteData = (record) => {
        const { dispatch } = this.props
        dispatch({
            type: 'dictionary/delete',
            payload: record,
        })
    }
    changeCell = (msg) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'dictionary/changeCell',
            payload: msg,
        });
    }

    render () {
        const { dictionary: { dataSource }, loading } = this.props
        return (
            <PageHeaderLayout>
                <Card bordered={false}>
                    <EditableTable
                        dataSource={dataSource}
                        columns={this.state.columns}
                        loading={loading}
                        queryData={this.queryData}
                        addNewRecord={this.addNewRecord}
                        addData={this.addData}
                        updateData={this.updateData}
                        deleteData={this.deleteData}
                        changeCell={this.changeCell}
                    />
                    <Modal
                        title="字典SQL编写 提示"
                        footer={null}
                        className={styles.tipModal}
                        visible={this.state.dictionaryTipShow}
                        onCancel={this.hideDictionaryTip}
                    >
                        <article>
                            <h3>提示</h3>
                            <p>
                                1、SQL中的字段必须要有<code>value</code>和<code>text</code>
                                来适配下拉框。可以通过重命名的方式。
                            </p>
                            <p>
                                2、如果想要下拉框可以后台查询，那么需要手动写查询条件
                            </p>
                            <h3>例子</h3>
                            <pre>
                                <code>{
                                    `select
    id value,username text
from
    sys_user
where
    username like @key '%'`}
                                </code>
                            </pre>
                        </article>

                    </Modal>
                </Card>
            </PageHeaderLayout>
        )
    }
}
