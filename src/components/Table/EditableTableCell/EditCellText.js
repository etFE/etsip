import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Input } from 'antd'

import styles from './index.less'

export default class EditCellText extends PureComponent {
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
