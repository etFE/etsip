import React, { PureComponent } from 'react'
import { Form, Input, Select, Checkbox, DatePicker } from 'antd'

import styles from './DynamicForm.less'

const FormItem = Form.Item
const { Option } = Select

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
                <DatePicker />
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
