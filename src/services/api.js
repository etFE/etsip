import { stringify } from 'qs';
import request from '../utils/request';

const baseUrl = 'http://localhost:3000/etsip'

// 日志
export const maSlog = {
    query: async () => request(`${baseUrl}/slog/query`),
}
// 用户
export const maUser = {
    query: async () => request(`${baseUrl}/user/query`),
    add: async (rowData) => request(`${baseUrl}/user/add`, { method: 'POST', body: rowData }),
    update: async (rowData) => request(`${baseUrl}/user/update`, { method: 'POST', body: rowData }),
    delete: async (rowData) => request(`${baseUrl}/user/delete`, { method: 'POST', body: rowData }),
    disable: async (rowData) => request(`${baseUrl}/user/disable`, { method: 'POST', body: rowData }),
    enable: async (rowData) => request(`${baseUrl}/user/enable`, { method: 'POST', body: rowData }),
    // index
    // count
    // error
    // login
    // loginPage
}
// 系统模块
export const maMod = {
    query: async () => request(`${baseUrl}/mod/query`),
}
// 角色
export const maRole = {
    query: async () => request(`${baseUrl}/role/query`),
    // add
    // update
    // delete
    // deleteBatch
}
// 系统定时任务
export const maTask = {
    query: async () => request(`${baseUrl}/task/query`),
    // delete
    // disable
    // enable
    // editDo
    // edit
}
// 系统模块菜单
export const maMenu = {
    query: async () => request(`${baseUrl}/menu/query`),
    // delete
    // add
    // update
}

// 资产大屏显示
export const maRep = {
    query: async () => request(`${baseUrl}/rep/query`),
}

// 报表
export const report = {
    query: async () => request(`${baseUrl}/report/query`),
}

// ----------------------------------------- //

export async function queryProjectNotice() {
    return request('/api/project/notice');
}

export async function queryActivities() {
    return request('/api/activities');
}

export async function queryRule(params) {
    return request(`/api/rule?${stringify(params)}`);
}

export async function removeRule(params) {
    return request('/api/rule', {
        method: 'POST',
        body: {
            ...params,
            method: 'delete',
        },
    });
}

export async function addRule(params) {
    return request('/api/rule', {
        method: 'POST',
        body: {
            ...params,
            method: 'post',
        },
    });
}

export async function fakeSubmitForm(params) {
    return request('/api/forms', {
        method: 'POST',
        body: params,
    });
}

export async function fakeChartData() {
    return request('/api/fake_chart_data');
}

export async function queryTags() {
    return request('/api/tags');
}

export async function queryBasicProfile() {
    return request('/api/profile/basic');
}

export async function queryAdvancedProfile() {
    return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
    return request(`/api/fake_list?${stringify(params)}`);
}

export async function fakeAccountLogin(params) {
    return request('/api/login/account', {
        method: 'POST',
        body: params,
    });
}

export async function fakeRegister(params) {
    return request('/api/register', {
        method: 'POST',
        body: params,
    });
}

export async function queryNotices() {
    return request('/api/notices');
}
