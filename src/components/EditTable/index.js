import React, { PureComponent } from 'react'
import { Table } from 'antd'
import styles from './index.less'

import { EditCellText, EditCellCheckbox, EditCellSelect } from '../EditTableCell'

const defaultRow = {
    dataIndex: '',
    title: '',
    isShow: true,
    align: 'left',
    width: 'auto',
    sorter: false,
    fixed: 'false',
}
let list = [
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
        sorter: false,
        fixed: 'false',
    },
]

list = list.map((item, index) => {
    Object.assign(item, { key: index + 1 })
    return item
})

const cols = [
    {
        title: '字段名',
        dataIndex: 'dataIndex',
        editor: { type: 'text' },
        width: 100,
    },
    { title: '显示名',
        dataIndex: 'title',
        editor: { type: 'text' },
        width: 100,
    },
    { title: '是否显示',
        dataIndex: 'isShow',
        editor: { type: 'checkbox' },
        width: 100,
    },
    { title: '对齐方式',
        dataIndex: 'align',
        editor: {
            type: 'select',
            options: [
                { value: 'left', text: 'left' },
                { value: 'right', text: 'right' },
                { value: 'center', text: 'center' },
            ],
        },
        width: 100,
    },
    { title: '列宽',
        dataIndex: 'width',
        editor: { type: 'text' },
        width: 100,
    },
    { title: '排序功能',
        dataIndex: 'sorter',
        editor: { type: 'checkbox' },
        width: 100,
    },
    { title: '固定列',
        dataIndex: 'fixed',
        editor: {
            type: 'select',
            options: [
                { value: 'false', text: '不固定' },
                { value: 'left', text: '向左固定' },
                { value: 'right', text: '向右固定' },
            ],
        },
        width: 100,
    },
]

export default class EditTable extends PureComponent {
    constructor (props) {
        super(props)

        this.state = {
            dataSource: list,
            columns: this.initColumns(),
        }
    }

    onCellChange = (key, dataIndex) => {
        return (value) => {
            const dataSource = [...this.state.dataSource];
            // const target = dataSource.find(item => item.key === key);
            const target = dataSource[key - 1];

            if (target) {
                target[dataIndex] = value;
                this.setState({ dataSource });
            }
        };
    }

    initColumns () {
        let columns = [...cols]
        columns.unshift({ title: '#', dataIndex: 'key', width: 40, align: 'center' })
        columns = columns.map((item) => {
            if (item.editor) {
                switch (item.editor.type) {
                case 'text':
                    Object.assign(item, {
                        render: (text, record) => (
                            <EditCellText
                                value={text}
                                onChange={this.onCellChange(record.key, item.dataIndex)}
                            />
                        ),
                    })
                    break;
                case 'checkbox':
                    Object.assign(item, {
                        render: (text, record) => (
                            <EditCellCheckbox
                                value={text}
                                onChange={this.onCellChange(record.key, item.dataIndex)}
                            />
                        ),
                    })
                    break;
                case 'select':
                    Object.assign(item, {
                        render: (text, record) => (
                            <EditCellSelect
                                value={text}
                                options={item.editor.options}
                                onChange={this.onCellChange(record.key, item.dataIndex)}
                            />
                        ),
                    })
                    break;
                default:
                    break;
                }
            }
            return item
        })
        return columns
    }

    render () {
        const { dataSource, columns } = this.state
        console.log(dataSource, columns)
        return (
            <div className={styles.editTable}>
                <Table
                    bordered
                    rowKey={(record, index) => index}
                    dataSource={dataSource}
                    columns={columns}
                    size="middle"
                />
            </div>
        )
    }
}
