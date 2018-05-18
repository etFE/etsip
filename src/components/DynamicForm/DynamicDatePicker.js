import React, { PureComponent } from 'react'
import moment from 'moment'
import { DatePicker } from 'antd'

export default class DynamicDatePicker extends PureComponent {
    constructor(props) {
        super(props)
        const { value } = props
        this.state = {
            value: value ? moment(value, this.props.dateFormat || 'YYYY-MM-DD') : null,
        }
    }
    handleChange = (date, dateString) => {
        this.setState({
            value: date,
        })
        this.props.onChange(dateString)
    }
    render () {
        return (
            <DatePicker
                onChange={this.handleChange}
                value={this.state.value}
                size="small"
            />
        )
    }
}
