import React, { PureComponent } from 'react';
import { Table } from 'antd';
import styles from './index.less';

class BasicTable extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            selectedRowKeys: [],
        };
    }

    handleRowSelectChange = (selectedRowKeys, selectedRows) => {
        if (this.props.onSelectRow) {
            this.props.onSelectRow(selectedRows);
        }

        this.setState({ selectedRowKeys });
    };

    render() {
        const { selectedRowKeys } = this.state;
        const { data: { list }, loading, columns, rowKey } = this.props;

        const rowSelection = {
            selectedRowKeys,
            onChange: this.handleRowSelectChange,
            getCheckboxProps: record => ({
                disabled: record.disabled,
            }),
        }

        return (
            <div className={styles.basicTable}>
                <Table
                    bordered
                    loading={loading}
                    rowKey={rowKey || ((record, index) => index)}
                    dataSource={list}
                    columns={columns}
                    rowSelection={rowSelection}
                    size="middle"
                />
            </div>
        );
    }
}

export default BasicTable;
