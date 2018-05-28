import React, { PureComponent, Component } from 'react'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import { Button, Modal } from 'antd'

import QueryTable from '../../components/Table/QueryTable'
import DynamicForm from './components/DynamicForm'
import ReportUpdate from './ReportUpdate'

import styles from './ReportContent.less'

@connect(({report, loading}) => ({
    report,
    loading: loading.models.report,
}))
export default class ReportContent extends Component {
    componentDidMount () {
        const { report: { currentReport }, dispatch } = this.props

        if (!currentReport.reportCode) {
            dispatch(
                routerRedux.push('/customize/report/add')
            )
        }
    }

    handleOpenUpdate = (target) => {
        const { dispatch } = this.props
        dispatch({
            type: 'report/openUpdateModal',
            payload: target,
        })
    }
    handleCloseModal = () => {
        const { dispatch } = this.props
        dispatch({ type: 'report/closeUpdateModal' })
    }
    // 删除报表
    handleDelete = () => {
        Modal.confirm({
            title: '警告！',
            content: '此操作将会永久删除该报表！',
            onOk: () => {
                this.props.dispatch({
                    type: 'report/fetchDeleteReport',
                })
            },
        })
    }

    queryData = () => {
        // 获取表单数据并 过滤没有值的
        const formData = this.dynamicForm.props.form.getFieldsValue()
        const keys = Object.keys(formData)
        keys.forEach((key) => {
            if (formData[key] === undefined || formData[key] === null) {
                formData[key] = ''
            }
        })
        const { dispatch } = this.props
        // 查询 表格数据
        dispatch({
            type: 'report/fetchReportBody',
            payload: formData,
        })
    }

    render () {
        const { report: { currentReport, updateModalType, updateModalVisible } } = this.props
        const dataSource = currentReport.dataSource.map((data, index) => {
            data.s_key = index + 1
            return data
        })

        return (
            <div className="container">
                <div className={styles.header}>
                    <h3 className={styles.title}>{currentReport.reportName}</h3>
                    <div className={styles.headerButtons}>
                        <Button
                            size="small"
                            onClick={() => this.handleOpenUpdate('updateBasic')}
                        >配置基础信息
                        </Button>
                        <Button
                            size="small"
                            onClick={() => this.handleOpenUpdate('updateForm')}
                        >配置查询条件
                        </Button>
                        <Button
                            size="small"
                            onClick={() => this.handleOpenUpdate('updateHeader')}
                        >配置表格列头
                        </Button>
                        <Button
                            size="small"
                            type="danger"
                            onClick={this.handleDelete}
                        >删除报表
                        </Button>
                    </div>
                </div>
                <DynamicForm
                    wrappedComponentRef={inst => {this.dynamicForm = inst}}
                    formData={currentReport.formData}
                />
                <QueryTable
                    columns={currentReport.columns}
                    dataSource={dataSource}
                    queryData={this.queryData}
                />
                <ReportUpdate
                    type={updateModalType}
                    visible={updateModalVisible}
                    onCancel={this.handleCloseModal}
                />
            </div>
        )
    }
}
