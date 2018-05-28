// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority() {
    // return localStorage.getItem('etsip-authority') || 'admin';
    return localStorage.getItem('etsip-authority') || 'guest';
}

export function setAuthority(authority) {
    return localStorage.setItem('etsip-authority', authority);
}
