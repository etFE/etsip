import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Select } from 'antd'

import styles from './index.less'

export default class EditCellSelect extends PureComponent {
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
        const { record, onlyNew } = this.props

        let letsEdit = true

        if (onlyNew) {
            if (typeof onlyNew === 'boolean') {
                letsEdit = !!record.s_newrow
            } else if (typeof onlyNew === 'function') {
                letsEdit = onlyNew(record)
            }
        }
        const optionEl = options.map((item) => (
            <Select.Option key={item.value} value={item.value}>{item.text}</Select.Option>
        ))

        return (
            <div className={`${styles.editableCell} ${styles.cellSelect}`}>
                {
                    record.s_editable && letsEdit ? (
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
    onChange: () => {},
    value: '',
    options: [],
}
EditCellSelect.propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.string,
    options: PropTypes.array,
    record: PropTypes.object.isRequired,
}
