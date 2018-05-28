import React from 'react'

import EditCellText from './EditCellText'
import EditCellTextarea from './EditCellTextarea'
import EditCellCheckbox from './EditCellCheckbox'
import EditCellSelect from './EditCellSelect'
import EditCellDatepicker from './EditCellDatepicker'
import EditCellOperations from './EditCellOperations'

/**
 * 根据列的编辑类型，渲染不同的编辑单元格
 * editor [object]
 *      type 类型
 *      onlyNew true时，只有新增加行可编辑。为function时，自定义返回true/false控制是否编辑
 *
 *      options type==="select"用，静态数据 格式为 id text
 *
 *      format  type==="datepicker"用，日期格式化
 *
 *      TODO: 加入onChange事件。通过改变其他列的值，重新查新
 * @param {*} data
 */
export const changeToEditCell = (data, onCellChange) => {
    const columns = data.map((item) => {
        if (item.editor) {
            switch (item.editor.type) {
            case 'text':
                Object.assign(item, {
                    render: (text, record) => (
                        <EditCellText
                            value={text}
                            onlyNew={item.editor.onlyNew}
                            record={record}
                            onChange={onCellChange(record.s_key, item.dataIndex)}
                        />
                    ),
                })
                break;
            case 'textarea':
                Object.assign(item, {
                    render: (text, record) => (
                        <EditCellTextarea
                            value={text}
                            onlyNew={item.editor.onlyNew}
                            record={record}
                            onChange={onCellChange(record.s_key, item.dataIndex)}
                        />
                    ),
                })
                break;
            case 'checkbox':
                Object.assign(item, {
                    render: (text, record) => (
                        <EditCellCheckbox
                            value={text}
                            onlyNew={item.editor.onlyNew}
                            record={record}
                            onChange={onCellChange(record.s_key, item.dataIndex)}
                        />
                    ),
                })
                break;
            case 'select':
                Object.assign(item, {
                    render: (text, record) => {
                        return (
                            <EditCellSelect
                                value={text}
                                onlyNew={item.editor.onlyNew}
                                record={record}
                                options={item.editor.options}
                                onChange={onCellChange(record.s_key, item.dataIndex)}
                            />
                        )
                    },
                })
                break;
            case 'date':
                Object.assign(item, {
                    render: (text, record) => {
                        return (
                            <EditCellDatepicker
                                value={text}
                                onlyNew={item.editor.onlyNew}
                                format={item.editor.format}
                                record={record}
                                onChange={onCellChange(record.s_key, item.dataIndex)}
                            />
                        )
                    },
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

export default {
    EditCellText, // 普通文本框编辑单元格
    EditCellTextarea, // 文本域
    EditCellCheckbox, // 复选框编辑单元格
    EditCellSelect, // 复选框编辑单元格
    EditCellDatepicker, // 日期编辑单元格

    EditCellOperations, // 操作列
}
