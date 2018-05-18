// 遍历数据及子数据，增加s_key字段
export const loopAndSetKey = (data, prekey, callback) => {
    const dataSource = data.map((record, index) => {
        record.s_key = prekey ? `${prekey}-${index + 1}` : `${index + 1}`
        if (callback) {
            callback(record)
        }

        if (record.children) {
            // if (record.children.length > 0) {
            record.children = loopAndSetKey(record.children, record.s_key, callback)
            // } else {
            //     delete record.children
            // }
        }
        return record
    })
    return dataSource
}

// 遍历，过滤出key相同的数据
export const loopAndFilter = (data, s_key) => {
    const dataSource = data.filter((item) => {
        if (item.children) {
            item.children = loopAndFilter(item.children, s_key)
        }
        return item.s_key !== s_key
    })
    return dataSource
}

// 递归数据，并做什么事情
// 必须无副作用回调函数
export const loopDataAndDo = (data, callback) => {
    data.forEach((record) => {
        if (callback) {
            callback(record)
        }

        if (record.children) {
            record.children = loopDataAndDo(record.children, callback)
        }
    })
    return data
}

