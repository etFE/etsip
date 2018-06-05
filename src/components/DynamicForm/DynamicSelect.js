import React, { PureComponent } from 'react'
import Debounce from 'lodash-decorators/debounce';
import { Select } from 'antd'
import createAPI from '../../services/createAPI'

export default class DynamicSelect extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value,
            options: [],
        }

        this.handleSearch = this.handleSearch.bind(this)
    }

    componentWillMount () {
        const { options, url } = this.props
        if (options) {
            this.setState({
                options,
            })
        } else if (url) {
            this.fetchOptions()
        }
    }

    fetchOptions = async (params) => {
        const { url, type, data } = this.props
        const res = await createAPI(url, type, {
            data: JSON.stringify(Object.assign(data, params)),
        })
        if (res) {
            this.setState({
                options: res.list,
            })
        }
    }

    generateOptions = (options) => {
        const { valueField, textField } = this.props
        return options.map((item) => {
            // 判断字段名。设置的。还是 默认value text
            const theValue = valueField || 'value'
            const theText = textField || 'text'
            return (
                <Select.Option
                    key={item[theValue]}
                    value={item[theValue]}
                >{item[theText]}
                </Select.Option>
            )
        })
    }

    handleChange = (value) => {
        this.setState({
            value,
        })
        this.props.onChange(value)
    }

    @Debounce(500)
    handleSearch (value) {
        if (this.props.url) {
            this.fetchOptions({ key: value })
        }
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
                disabled={this.props.disabled}
                onChange={this.handleChange}
                onSearch={this.handleSearch}
            >
                { this.generateOptions(this.state.options) }
            </Select>
        )
    }
}
