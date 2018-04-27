import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Input, Checkbox, Select, DatePicker, Popconfirm } from 'antd'
import moment from 'moment'

import styles from './index.less'

/**
 * 普通文本框编辑单元格
 */
export class EditCellText extends PureComponent {
    state = {
        value: this.props.value,
    }
    handleChange = (e) => {
        const { value } = e.target
        this.setState({ value })

        this.props.onChange(value);
    }
    render() {
        const { value } = this.state
        const { editable } = this.props

        return (
            <div className={`${styles.editableCell} ${styles.cellText}`}>
                {
                    editable ? (
                        <Input
                            value={value}
                            size="small"
                            onChange={this.handleChange}
                        />
                    ): (value || ' ')
                }
            </div>
        );
    }
}

EditCellText.defaultProps = {
    editable: false,
    onChange: () => {},
}
EditCellText.propTypes = {
    editable: PropTypes.bool,
    onChange: PropTypes.func,
}

/**
 * 复选框编辑单元格
 */
export class EditCellCheckbox extends PureComponent {
    state = {
        checked: this.props.value,
    }
    handleChange = (e) => {
        const { checked } = e.target;
        this.setState({ checked });

        this.props.onChange(checked);
    }
    render() {
        const { checked } = this.state;
        const { editable } = this.props

        return (
            <div className={`${styles.editableCell} ${styles.cellCheckbox}`}>
                <Checkbox
                    checked={checked}
                    disabled={!editable}
                    onChange={this.handleChange}
                />
            </div>
        );
    }
}

EditCellCheckbox.defaultProps = {
    editable: false,
    onChange: () => {},
}
EditCellCheckbox.propTypes = {
    editable: PropTypes.bool,
    onChange: PropTypes.func,
}

/**
 * 复选框编辑单元格
 */
export class EditCellSelect extends PureComponent {
    state = {
        value: this.props.value,
        options: this.props.options,
    }
    handleChange = (value) => {
        this.setState({ value });

        this.props.onChange(value);
    }
    render() {
        const { value, options } = this.state;
        const { editable } = this.props
        const optionEl = options.map((item) => (
            <Select.Option key={item.value} value={item.value}>{item.text}</Select.Option>
        ))

        return (
            <div className={`${styles.editableCell} ${styles.cellSelect}`}>
                {
                    editable ? (
                        <Select
                            defaultValue={value}
                            size="small"
                            onChange={this.handleChange}
                        >
                            { optionEl }
                        </Select>
                    ) : (() => {
                        const result = options.filter(item => value === item.value)[0]
                        return result ? result.text : ''
                    })()
                }
            </div>
        );
    }
}

EditCellSelect.defaultProps = {
    editable: false,
    onChange: () => {},
    value: '',
    options: [],
}
EditCellSelect.propTypes = {
    editable: PropTypes.bool,
    onChange: PropTypes.func,
    value: PropTypes.string,
    options: PropTypes.array,
}


/**
 * 日期编辑单元格
 */
export class EditCellDatepicker extends PureComponent {
    state = {
        value: this.props.value,
    }
    handleChange = (date, dateString) => {
        this.setState({ value: dateString });

        this.props.onChange(dateString);
    }
    render() {
        const { value } = this.state;
        const { editable, dateFormat } = this.props

        return (
            <div className={`${styles.editableCell} ${styles.cellDatepicker}`}>
                {
                    editable ? (
                        <DatePicker
                            defaultValue={moment(value || new Date(), dateFormat)}
                            format={dateFormat}
                            size="small"
                            onChange={this.handleChange}
                        />
                    ) : value
                }
            </div>
        );
    }
}

EditCellDatepicker.defaultProps = {
    editable: false,
    onChange: () => {},
    dateFormat: 'YYYY-MM-DD',
    value: '',
}
EditCellDatepicker.propTypes = {
    editable: PropTypes.bool,
    onChange: PropTypes.func,
    dateFormat: PropTypes.string,
    value: PropTypes.string,
}

/**
 * 操作列
 */
export class EditCellOperations extends PureComponent {
    handleSave = () => {
        this.props.rowSave()
    }

    handleDelete = () => {
        this.props.rowDelete()
    }

    render() {
        const { editable, operations } = this.props;
        const otherOperations = operations.map((item) => (
            item.hasTip ? (
                <Popconfirm key={item.text} title={`确定${item.text}？`} onConfirm={item.handleClick}>
                    <div className={styles.devider}  />
                    <span>{item.text}</span>
                </Popconfirm>
            ) : (
                <Fragment key={item.text} >
                    <div className={styles.devider}  />
                    <span onClick={item.handleClick}>{item.text}</span>
                </Fragment>
            )
        ))

        return (
            <div className={`${styles.editableCell} ${styles.cellOperations}`}>
                { editable ? (
                    <Fragment>
                        <span onClick={this.handleSave}>保存</span>
                        <div className={styles.devider}  />
                    </Fragment>
                ) : null }
                <Popconfirm title="确定删除？" onConfirm={this.handleDelete}>
                    <span>删除</span>
                </Popconfirm>
                { otherOperations }
            </div>
        );
    }
}

EditCellOperations.defaultProps = {
    editable: false,
    rowSave: () => {},
    rowDelete: () => {},
    operations: [],
}
EditCellOperations.propTypes = {
    editable: PropTypes.bool,
    rowSave: PropTypes.func,
    rowDelete: PropTypes.func,
    operations: PropTypes.array,
}
