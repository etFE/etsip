import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Button } from 'antd';
import CustomTable from 'components/Table/CustomTable';

import { loopAndSetKey, loopAndFilter, loopDataAndDo } from '../../../utils/editableTable'

import styles from './ConfigHeader.less';

const defaultRow = {
    dataIndex: '',
    title: '',
    isShow: true,
    align: 'left',
    width: 'auto',
    sorter: false,
    fixed: 'false',
    // children: [],
}

@connect(({ table, loading }) => ({
    table,
    loading: loading.models.table,
}))
export default class ConfigHeader extends PureComponent {
    constructor (props) {
        super(props)

        this.state = {
            columns: [
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
                            { value: 'left', text: '向左对齐' },
                            { value: 'right', text: '向右对齐' },
                            { value: 'center', text: '居中' },
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
                {
                    title: '操作',
                    dataIndex: 'decoration',
                    fixed: 'right',
                    render: (text, record) => (
                        <Fragment>
                            <span
                                className={styles.decorationButton}
                                onClick={() => this.handleDeleteRow(record)}
                            >删除
                            </span>
                            <span
                                className={styles.decorationButton}
                                onClick={() => this.handleAddChildren(record)}
                            >添加子列
                            </span>
                        </Fragment>
                    ),
                },
            ],
            dataSource: [],
            // jsonVisible: false,
        }
    }

    componentWillMount () {
        const dataSource = loopAndSetKey(this.props.dataSource, null, (record) => {
            record.s_editable = true
        })
        this.setState({ dataSource })
    }

    addNewRecord = () => {
        const dataSource = [...this.state.dataSource]
        const lastRow = dataSource[dataSource.length - 1]
        const newRecord = Object.assign({}, defaultRow || {}, {
            s_key: lastRow ? `${lastRow.s_key * 1 + 1}` : '1',
            s_editable: true,
        })
        dataSource.push(newRecord)
        this.setState({ dataSource })
    }

    handleDeleteRow = (record) => {
        const dataSource = loopAndFilter(this.state.dataSource, record.s_key)
        this.setState({ dataSource })
    }

    handleAddChildren = ({ s_key }) => {
        const dataSource = loopDataAndDo(this.state.dataSource, (reocrd) => {
            if (reocrd.s_key === s_key) {
                reocrd.children = reocrd.children || []
                const lastRow = reocrd.children[reocrd.children.length - 1]
                let endKey = '1'
                if (lastRow && lastRow.s_key) {
                    const keyArr = lastRow.s_key.split('-')
                    endKey = keyArr[keyArr.length - 1] * 1 + 1
                }
                reocrd.children.push({
                    ...defaultRow,
                    s_key: `${reocrd.s_key}-${endKey}`,
                    s_editable: true,
                })
            }
        })
        this.setState({ dataSource })
    }

    changeCell = ({ key, dataIndex, value }) => {
        const dataSource = loopDataAndDo(this.state.dataSource, (reocrd) => {
            if (reocrd.s_key === key) {
                reocrd[dataIndex] = value
            }
        })
        this.setState({ dataSource })
    }

    // 查看数据格式
    // openJsonView = () => {
    //     this.setState({
    //         jsonVisible: true,
    //     })
    // }
    // closeJsonView = () => {
    //     this.setState({
    //         jsonVisible: false,
    //     })
    // }

    // jsonToHtml = (data) => {
    //     let dataHtml = JSON.stringify(data)
    //     dataHtml = dataHtml.replace(/,|"children":|\[{|{/g, '$&\n')
    //     dataHtml = dataHtml.replace(/\}]|}/g, '\n$&')

    //     return dataHtml
    // }

    render() {
        // const buttonGroup = (
        //     <Fragment>
        //         <Button
        //             icon="profile"
        //             size="small"
        //             onClick={this.openJsonView}
        //         >查看JSON
        //         </Button>
        //     </Fragment>
        // )

        // const dataJsonHtml = this.jsonToHtml(dataSource)
        return (
            <div className={styles.container}>
                <div className={styles.buttonGroup}>
                    <Button
                        size="small"
                        onClick={this.addNewRecord}
                    >添加行
                    </Button>
                </div>
                <CustomTable
                    editable
                    dataSource={this.state.dataSource}
                    columns={this.state.columns}
                    changeCell={this.changeCell}
                />
                {/* <Modal
                    title="JSON 格式"
                    visible={this.state.jsonVisible}
                    onCancel={this.closeJsonView}
                    footer={null}
                >
                    <TextArea
                        autosize
                        value={dataJsonHtml}
                    />
                </Modal> */}
            </div>
        );
    }
}

