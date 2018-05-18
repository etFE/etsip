import React, { PureComponent } from 'react'
import { Form, Input, Checkbox } from 'antd'
import DynamicDatePicker from 'components/DynamicForm/DynamicDatePicker'
import DynamicSelect from 'components/DynamicForm/DynamicSelect'
import styles from './DynamicForm.less'

const FormItem = Form.Item

class InitForm extends PureComponent {
    setDynamicType = (item) => {
        if (item.type === 'select' && item.options) {
            return (
                <DynamicSelect options={item.options} />
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
                <Form layout="inline">
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
