import React, { Component } from 'react'
import { Form, Input, Icon, Modal } from 'antd'
import DynamicSelect from 'components/DynamicForm/DynamicSelect'
import styles from './BasicForm.less'

const FormItem = Form.Item
const { TextArea } = Input

const modOptions = [
    { value: '01', text: '预算系统' },
    { value: '02', text: '财务系统' },
    { value: '03', text: '人资系统' },
    { value: '04', text: '物流系统' },
]

class CustomizedForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            tipModal: false,
        }
    }

    showSqlTip = () => {
        this.setState({ tipModal: true })
    }

    hideSqlTip = () => {
        this.setState({ tipModal: false })
    }

    render () {
        const { getFieldDecorator } = this.props.form
        return (
            <Form onSubmit={this.props.onSubmit} layout="inline">
                <FormItem label="系统">
                    {getFieldDecorator('modCode', {
                        rules: [{ required: true, message: '系统必选！' }],
                    })(<DynamicSelect disabled={this.props.modCode.disabled} options={modOptions} />)}
                </FormItem>

                <FormItem label="报表编号">
                    {getFieldDecorator('reportCode', {
                        rules: [{ required: true, message: '报表编号必填！' }],
                    })(<Input size="small" disabled={this.props.reportCode.disabled} style={{width: '200px'}} />)}
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
                    <Icon
                        type="question-circle"
                        className={styles.tipIcon}
                        onClick={this.showSqlTip}
                        title="提示"
                    />
                    <Modal
                        title="SQL体书写规则"
                        visible={this.state.tipModal}
                        onCancel={this.hideSqlTip}
                        className={styles.tipModal}
                        footer={null}
                    >
                        <h3>书写规范</h3>
                        <article>
                            <pre>
                                <code>
                                    {
                                        `select id,name from dual
select id,name as name1 from dual
select id,t.name from dual
select id,t.name as name1 from dual
select id,name from dual where id=@id and name=@name
select id,name from (
    select id,name where id=@id and name=@name
) t where id=@id`
                                    }
                                </code>
                            </pre>
                        </article>
                        <h3>说明</h3>
                        <p><code>where</code>后面的条件书写规范 <b>字段=@字段</b></p>
                    </Modal>
                </FormItem>
            </Form>
        )
    }
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
