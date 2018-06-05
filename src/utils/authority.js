// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority() {
    // return localStorage.getItem('etsip-authority') || 'admin';
    return localStorage.getItem('etsip-authority') || 'guest';
}

export function setAuthority(authority) {
    return localStorage.setItem('etsip-authority', authority);
}

// 设置用户信息，转化成对象
export function getUserMessage () {
    const userMsgStr = localStorage.getItem('etsip-user-message')
    return userMsgStr ? JSON.parse(userMsgStr) : null
}
// 保存用户信息，转化成字符串
export function setUserMessage (userMsg) {
    const userMsgStr = JSON.stringify(userMsg)

    return localStorage.setItem('etsip-user-message', userMsgStr)
}
