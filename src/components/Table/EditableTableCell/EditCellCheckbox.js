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
