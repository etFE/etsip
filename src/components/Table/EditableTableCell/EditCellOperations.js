import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Popconfirm } from 'antd'

import styles from './index.less'

export default class EditCellOperations extends PureComponent {
    handleSave = () => {
        this.props.rowSave()
    }

    handleDelete = () => {
        this.props.rowDelete()
    }

    render() {
        const { editable, operations } = this.props;
        const otherOperations = operations.map((item) => {
            const operationText = typeof item.text === 'function' ? item.text() : item.text

            return item.hasTip ? (
                <Popconfirm key={operationText} title={`确定${operationText}？`} onConfirm={item.handleClick}>
                    <div className={styles.devider}  />
                    <span>{operationText}</span>
                </Popconfirm>
            ) : (
                <Fragment key={operationText} >
                    <div className={styles.devider}  />
                    <span onClick={item.handleClick}>{operationText}</span>
                </Fragment>
            )
        })

        return (
            <div className={`${styles.editableCell} ${styles.cellOperations}`}>
                { editable ? (
                    <Fragment>
                        <span onClick={this.handleSave}>保存</span>
                        <div className={styles.devider}  />
                    </Fragment>
                ) : null }
                <Popconfirm title="确定删除？" onConfirm={this.handleDelete}>
                    <span>删除</span>
                </Popconfirm>
                { otherOperations }
            </div>
        );
    }
}

EditCellOperations.defaultProps = {
    editable: false,
    rowSave: () => {},
    rowDelete: () => {},
    operations: [],
}
EditCellOperations.propTypes = {
    editable: PropTypes.bool,
    rowSave: PropTypes.func,
    rowDelete: PropTypes.func,
    operations: PropTypes.array,
}
