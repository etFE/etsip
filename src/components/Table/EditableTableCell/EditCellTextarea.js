import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Input } from 'antd'

import styles from './index.less'

const { TextArea } = Input

export default class EditCellTextarea extends PureComponent {
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
        const { record, onlyNew } = this.props

        let letsEdit = true

        if (onlyNew) {
            if (typeof onlyNew === 'boolean') {
                letsEdit = !!record.s_newrow
            } else if (typeof onlyNew === 'function') {
                letsEdit = onlyNew(record)
            }
        }

        return (
            <div className={`${styles.editableCell} ${styles.cellText}`}>
                {
                    record.s_editable && letsEdit ? (
                        <TextArea
                            autosize={{ minRows: 3, maxRows: 6 }}
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

EditCellTextarea.defaultProps = {
    onChange: () => {},
}
EditCellTextarea.propTypes = {
    onChange: PropTypes.func,
    record: PropTypes.object.isRequired,
}
