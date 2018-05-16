import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { Button, Modal } from 'antd'

import QueryTable from '../../components/Table/QueryTable'
import DynamicForm from './components/DynamicForm'
import ReportUpdate from './ReportUpdate'

import styles from './ReportContent.less'

@connect(({report, loading}) => ({
    report,
    loading: loading.models.report,
}))
export default class ReportContent extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            modalType: '',
            modalVisible: false,

            dataSource: [],
        }
    }


    componentDidMount () {
        const { location, dispatch } = this.props
        const { pathname } = location
        const pathArr = pathname.split('/')
        // 初始根据路由 设置列表的active TODO: 异步
        dispatch({
            type: 'report/changeCurrentReport',
            payload: pathArr[pathArr.length - 1],
        })
        this.queryData()
    }

    handleUpdate = (target) => {
        this.setState({
            modalType: target,
            modalVisible: true,
        })
    }
    handleCloseModal = () => {
        this.setState({
            modalType: '',
            modalVisible: false,
        })
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
                delete formData[key]
            }
        })
        // const { dispatch } = this.props
        // 查询 表格数据
        // dispatch({
        //     type: 'table/fetch',
        //     payload: {},
        // })
    }

    render () {
        const { report: { currentReport }, loading } = this.props
        return (
            <div className="container">
                <div className={styles.header}>
                    <h3 className={styles.title}>{currentReport.reportName}</h3>
                    <div className={styles.headerButtons}>
                        <Button
                            size="small"
                            onClick={() => this.handleUpdate('updateBasic')}
                        >配置基础信息
                        </Button>
                        <Button
                            size="small"
                            onClick={() => this.handleUpdate('updateForm')}
                        >配置查询条件
                        </Button>
                        <Button
                            size="small"
                            onClick={() => this.handleUpdate('updateHeader')}
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
                    dataSource={this.state.dataSource}
                    queryData={this.queryData}
                />
                <ReportUpdate
                    type={this.state.modalType}
                    visible={this.state.modalVisible}
                    onCancel={this.handleCloseModal}
                />
            </div>
        )
    }
}
