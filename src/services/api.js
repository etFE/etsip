import { stringify } from 'qs';
import request from '../utils/request';
import createAPI from './createAPI'

// 日志
export const maSlog = {
    query: async config => createAPI('/slog/query', 'get', config),
}
// 用户
export const maUser = {
    query: async config => createAPI('/user/query', 'get', config),
    add: async config => createAPI('/user/add', 'post', config),
    update: async config => createAPI('/user/update', 'post', config),
    delete: async config => createAPI('/user/delete', 'post', config),
    disable: async config => createAPI('/user/disable', 'post', config),
    enable: async config => createAPI('/user/enable', 'post', config),
    // index
    // count
    // error
}
// 系统模块
export const maMod = {
    query: async config => createAPI('/mod/query', 'get', config),
}
// 角色
export const maRole = {
    query: async config => createAPI('/role/query', 'get', config),
    // add
    // update
    // delete
    // deleteBatch
}
// 系统定时任务
export const maTask = {
    // query: async config => createAPI('/task/query', 'get', config),
    // delete
    // disable
    // enable
    // editDo
    // edit
}
// 系统模块菜单
export const maMenu = {
    query: async config => createAPI('/menu/query', 'get', config),
    // delete
    // add
    // update
}

// 资产大屏显示
export const maRep = {
    query: async config => createAPI('/rep/query', 'get', config),
}

// 报表
export const report = {
    query: async config => createAPI('/custom/report/query', 'get', config),
    add: async config => createAPI('/custom/report/add', 'post', config),
    update: async config => createAPI('/custom/report/update', 'post', config),
    delete: async config => createAPI('/custom/report/delete', 'post', config),

    // 添加修改自定义查询条件的表单
    addoreditwhere: async config => createAPI('/custom/report/addoreditwhere', 'post', config),
    // 添加修改自定义表头
    addoredithead: async config => createAPI('/custom/report/addoredithead', 'post', config),
    // 查询自定义表单
    querywhere: async config => createAPI('/custom/report/querywhere', 'post', config),
    querywherejson: async config => createAPI('/custom/report/queryWhereJson', 'post', config),
    // 查询自定义表头
    queryhead: async config => createAPI('/custom/report/queryhead', 'post', config),
    queryheadjson: async config => createAPI('/custom/report/queryHeadJson', 'post', config),
}

export const user = {
    login: async config => createAPI('/user/login', 'post', config),
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
