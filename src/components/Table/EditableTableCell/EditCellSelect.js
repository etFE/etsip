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
