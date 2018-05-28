import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { DatePicker } from 'antd'
import moment from 'moment'

import styles from './index.less'

export default class EditCellDatepicker extends PureComponent {
    state = {
        value: this.props.value,
    }
    handleChange = (date, dateString) => {
        this.setState({ value: dateString });

        this.props.onChange(dateString);
    }
    render() {
        const { value } = this.state;
        const { record, onlyNew, format } = this.props

        let letsEdit = true

        if (onlyNew) {
            if (typeof onlyNew === 'boolean') {
                letsEdit = !!record.s_newrow
            } else if (typeof onlyNew === 'function') {
                letsEdit = onlyNew(record)
            }
        }

        return (
            <div className={`${styles.editableCell} ${styles.cellDatepicker}`}>
                {
                    record.s_editable && letsEdit ? (
                        <DatePicker
                            defaultValue={moment(value || new Date(), format)}
                            format={format}
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
    onChange: () => {},
    format: 'YYYY-MM-DD',
    value: '',
}
EditCellDatepicker.propTypes = {
    record: PropTypes.object.isRequired,
    onChange: PropTypes.func,
    format: PropTypes.string,
    value: PropTypes.string,
}
