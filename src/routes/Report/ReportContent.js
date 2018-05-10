import React from 'react'
import { connect } from 'dva'

import QueryTable from '../../components/Table/QueryTable'
import DynamicForm from './components/DynamicForm'

@connect(({report}) => ({
    report,
}))
export default class ReportContent extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            formData: [
                { text: '人员编码', id: 'menberCode', type: 'input' },
                { text: '所属部门', id: 'dependment', type: 'select',
                    options: [
                        { text: '无线端部门', id: 'fe' },
                        { text: '后端部门', id: 'be' },
                        { text: '设计部门', id: 'ds' },
                    ],
                },
                { text: '是否吃饭', id: 'isEat', type: 'checkbox' },
                { text: '什么时候', id: 'date', type: 'datepicker' },
            ],
        }
    }

    componentDidMount () {
        const { location, dispatch } = this.props
        const { pathname } = location
        const pathArr = pathname.split('/')

        dispatch({
            type: 'report/changeCurrentReport',
            payload: pathArr[pathArr.length - 1],
        })
    }

    render () {
        const { report: { curReportCode, reports } } = this.props
        const curReportObj = reports.filter((item) => item.id === curReportCode)[0]
        return (
            <div className="container">
                <h3>{ curReportObj ? curReportObj.text : null }</h3>
                <DynamicForm
                    formData={this.state.formData}
                />
                <QueryTable
                    columns={[]}
                    dataSource={[]}
                />
            </div>
        )
    }
}
