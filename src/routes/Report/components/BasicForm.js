import React from 'react'
import { Form, Input } from 'antd'
import DynamicSelect from 'components/DynamicForm/DynamicSelect'

const FormItem = Form.Item
const { TextArea } = Input

const modOptions = [
    { value: '01', text: '预算系统' },
    { value: '02', text: '财务系统' },
    { value: '03', text: '人资系统' },
    { value: '04', text: '物流系统' },
]

const CustomizedForm = (props) => {
    const { getFieldDecorator } = props.form
    return (
        <Form onSubmit={props.onSubmit} layout="inline">
            <FormItem label="系统">
                {getFieldDecorator('modCode', {
                    rules: [{ required: true, message: '系统必选！' }],
                })(<DynamicSelect disabled={props.modCode.disabled} options={modOptions} />)}
            </FormItem>

            <FormItem label="报表编号">
                {getFieldDecorator('reportCode', {
                    rules: [{ required: true, message: '报表编号必填！' }],
                })(<Input size="small" disabled={props.reportCode.disabled} style={{width: '200px'}} />)}
            </FormItem>

            <FormItem label="报表名称">
                {getFieldDecorator('reportName', {
                    rules: [{ required: true, message: '报表名称必填！' }],
                })(<Input size="small"  style={{width: '200px'}} />)}
            </FormItem>


            <FormItem label="SQL体" style={{marginTop: '10px'}}>
                {getFieldDecorator('reportBody', {
                    rules: [{ required: true, message: 'SQL必填！' }],
                })(<TextArea rows="4" style={{width: '500px'}} />)}
            </FormItem>
        </Form>
    )
}

const BasicForm = Form.create({
    onFieldsChange(props, changedFields) {
        props.onChange(changedFields);
    },
    mapPropsToFields(props) {
        return {
            modCode: Form.createFormField({
                ...props.modCode,
                value: props.modCode.value,
                disabled: props.modCode.disabled || false,
            }),
            reportCode: Form.createFormField({
                ...props.reportCode,
                value: props.reportCode.value,
                disabled: props.reportCode.disabled || false,
            }),
            reportName: Form.createFormField({
                ...props.reportName,
                value: props.reportName.value,
            }),
            reportBody: Form.createFormField({
                ...props.reportBody,
                value: props.reportBody.value,
            }),
        };
    },
})(CustomizedForm)

export default BasicForm
