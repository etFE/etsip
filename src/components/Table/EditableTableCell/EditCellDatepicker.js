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
