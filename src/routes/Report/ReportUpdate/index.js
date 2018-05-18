import React, { Component } from 'react'
import { Modal } from 'antd'

import UpdateBasic from './UpdateBasic'
import UpdateForm from './UpdateForm'
import UpdateHeader from './UpdateHeader'

export default class ReportAdd extends Component {
    constructor(props) {
        super(props);

        this.state = {
        }
    }

    getCurrentTitle = () => {
        const { type } = this.props;
        switch (type) {
        case 'updateBasic':
            return '配置基础信息';
        case 'updateForm':
            return '配置查询条件';
        case 'updateHeader':
            return '配置表格列头';
        default:
            return '';
        }
    }

    getCurrentModal = () => {
        const { type } = this.props;
        switch (type) {
        case 'updateBasic':
            return <UpdateBasic />;
        case 'updateForm':
            return <UpdateForm />;
        case 'updateHeader':
            return <UpdateHeader />;
        default:
            return null;
        }
    }

    render () {
        return (
            <Modal
                width="800px"
                title={this.getCurrentTitle()}
                visible={this.props.visible}
                onCancel={this.props.onCancel}
                footer={null}
            >
                { this.getCurrentModal() }
            </Modal>
        )
    }
}
