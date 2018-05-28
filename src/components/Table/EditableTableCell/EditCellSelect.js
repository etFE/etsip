import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Select } from 'antd'
import createAPI from '../../../services/createAPI'

import styles from './index.less'

export default class EditCellSelect extends PureComponent {
    state = {
        value: this.props.value,
        options: [],
    }

    componentWillMount () {
        const { config: { options, url } } = this.props
        if (options) {
            this.setState({
                options,
            })
        } else if (url) {
            this.fetchOptions(url)
        }
    }

    handleChange = (value) => {
        this.setState({ value });

        this.props.onChange(value);
    }

    fetchOptions = async (url) => {
        const res = await createAPI(url, 'get', {
            params: {},
        })
        if (res) {
            this.setState({
                options: res.list,
            })
        }
    }

    generateOptions = (options) => {
        const { config: { valueField, textField } } = this.props
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

    render() {
        const { value, options } = this.state;
        const { record, config: { onlyNew } } = this.props

        let letsEdit = true
        // 什么时候的显示
        if (onlyNew) {
            if (typeof onlyNew === 'boolean') {
                letsEdit = !!record.s_newrow
            } else if (typeof onlyNew === 'function') {
                letsEdit = onlyNew(record)
            }
        }

        return (
            <div className={`${styles.editableCell} ${styles.cellSelect}`}>
                {
                    record.s_editable && letsEdit ? (
                        <Select
                            defaultValue={value}
                            size="small"
                            onChange={this.handleChange}
                        >
                            { this.generateOptions(options) }
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
    onChange: () => {},
    value: '',
}
EditCellSelect.propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.string,
    record: PropTypes.object.isRequired,
    config: PropTypes.object.isRequired,
}
