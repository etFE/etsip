import React, { PureComponent } from 'react'
import moment from 'moment'
import { Form, Input, Select, Checkbox, DatePicker } from 'antd'

import styles from './DynamicForm.less'

const FormItem = Form.Item
const { Option } = Select

// 自定义日期组件，为了集成到 getFieldDecorator
class DynamicDatePicker extends PureComponent {
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

class InitForm extends PureComponent {
    setDynamicType = (item) => {
        if (item.type === 'select' && item.options) {
            return (
                <Select
                    allowClear
                    size="small"
                    showSearch
                    defaultActiveFirstOption={false}
                >
                    {item.options.map((option) => (
                        <Option key={option.id}>{ option.text }</Option>
                    ))}
                </Select>
            )
        } else if (item.type === 'checkbox') {
            return (
                <Checkbox />
            )
        } else if (item.type === 'datepicker') {
            return (
                <DynamicDatePicker />
            )
        }
        return (<Input size="small" />);
    }

    render () {
        const { formData } = this.props
        const { getFieldDecorator  } = this.props.form
        return (
            <div className={styles.container}>
                <Form
                    layout="inline"
                >
                    {formData.map((item) => (
                        <FormItem key={item.id} label={item.text}>
                            {getFieldDecorator(item.id, {})(this.setDynamicType(item))}
                        </FormItem>
                    ))}
                </Form>
            </div>
        )
    }
}

const DynamicForm = Form.create({

})(InitForm)

export default DynamicForm
