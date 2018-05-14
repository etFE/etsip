import React, { PureComponent } from 'react'
import { Select } from 'antd'

const { Option } = Select

export default class DynamicSelect extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value,
        }
    }

    handleChange = (value) => {
        this.setState({
            value,
        })
        this.props.onChange(value)
    }

    render () {
        return (
            <Select
                allowClear
                size="small"
                showSearch
                defaultActiveFirstOption={false}
                style={{width: '200px'}}
                value={this.state.value}
                onChange={this.handleChange}
            >
                {this.props.options.map((option) => (
                    <Option key={option.id}>{option.text}</Option>
                ))}
            </Select>
        )
    }
}
