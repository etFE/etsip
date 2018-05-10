import React from 'react'
import { Form, Input } from 'antd'

const FormItem = Form.Item
const { TextArea } = Input

const CustomizedForm = (props) => {
    const { getFieldDecorator } = props.form
    return (
        <Form onSubmit={props.onSubmit} layout="inline">
            <FormItem label="报表编号">
                {getFieldDecorator('reportCode', {
                    rules: [{ required: true, message: '报表编号必填！' }],
                })(<Input size="small"  style={{width: '200px'}} />)}
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

const AddForm = Form.create({
    onFieldsChange(props, changedFields) {
        props.onChange(changedFields);
    },
    mapPropsToFields(props) {
        return {
            reportCode: Form.createFormField({
                ...props.reportCode,
                value: props.reportCode.value,
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

export default AddForm
