import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Checkbox } from 'antd'

import styles from './index.less'

export default class EditCellCheckbox extends PureComponent {
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
            <div className={`${styles.editableCell} ${styles.cellCheckbox}`}>
                <Checkbox
                    checked={checked}
                    disabled={!letsEdit}
                    onChange={this.handleChange}
                />
            </div>
        );
    }
}

EditCellCheckbox.defaultProps = {
    onChange: () => {},
}
EditCellCheckbox.propTypes = {
    onChange: PropTypes.func,
    record: PropTypes.object.isRequired,
}
