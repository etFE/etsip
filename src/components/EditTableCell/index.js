import React, { Component  } from 'react'
import { Input, Checkbox, Select } from 'antd'

import styles from './index.less'

// 普通文本框编辑单元格
export class EditCellText extends Component {
    state = {
        value: this.props.value,
        editable: false,
    }
    handleChange = (e) => {
        const { value } = e.target;
        this.setState({ value });
    }
    check = () => {
        this.setState({ editable: false });
        if (this.props.onChange) {
            this.props.onChange(this.state.value);
        }
    }
    edit = () => {
        this.setState({ editable: true });
    }
    render() {
        const { value, editable } = this.state;
        return (
            <div className={`${styles.editableCell} ${styles.cellText}`}>
                {
                    editable ? (
                        <div>
                            <Input
                                value={value}
                                onChange={this.handleChange}
                                onPressEnter={this.check}
                            />
                        </div>
                    ): (
                        <div onDoubleClick={this.edit}>
                            {value || ' '}
                        </div>
                    )}
            </div>
        );
    }
}

// 复选框编辑单元格
export class EditCellCheckbox extends Component {
    state = {
        checked: this.props.value,
    }
    handleChange = (e) => {
        const { checked } = e.target;
        this.setState({ checked });

        if (this.props.onChange) {
            this.props.onChange(checked);
        }
    }
    render() {
        const { checked } = this.state;
        return (
            <div className={`${styles.editableCell} ${styles.cellCheckbox}`}>
                <Checkbox
                    checked={checked}
                    onChange={this.handleChange}
                />
            </div>
        );
    }
}

// 复选框编辑单元格
export class EditCellSelect extends Component {
    state = {
        value: this.props.value,
        options: this.props.options,
    }
    handleChange = (value) => {
        this.setState({ value });

        if (this.props.onChange) {
            this.props.onChange(value);
        }
    }
    render() {
        const { value, options } = this.state;
        const optionEl = options.map((item) => (
            <Select.Option key={item.value} value={item.value}>{item.text}</Select.Option>
        ))

        return (
            <div className={`${styles.editableCell} ${styles.cellCheckbox}`}>
                <Select
                    defaultValue={value}
                    onChange={this.handleChange}
                >
                    { optionEl }
                </Select>
            </div>
        );
    }
}
