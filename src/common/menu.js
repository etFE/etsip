import { isUrl } from '../utils/utils';

const menuData = [
    {
        name: '日志管理',
        icon: 'book',
        path: 'management/slog',
    },
    {
        name: '用户管理',
        icon: 'user',
        path: 'management/user',
    },
    {
        name: '系统模块管理',
        icon: 'dashboard',
        path: 'management/mod',
    },
    {
        name: '角色管理',
        icon: 'team',
        path: 'management/role',
    },
    {
        name: '系统定时任务管理',
        icon: 'clock-circle-o',
        path: 'management/task',
    },
    {
        name: '系统模块菜单管理',
        icon: 'copy',
        path: 'management/menu',
    },
    {
        name: '资产大屏显示管理',
        icon: 'laptop',
        path: 'management/rep',
    },
    {
        name: '自定义报表',
        icon: 'area-chart',
        path: 'report',
    },
]

function formatter(data, parentPath = '/', parentAuthority) {
    return data.map(item => {
        let { path } = item;
        if (!isUrl(path)) {
            path = parentPath + item.path;
        }
        const result = {
            ...item,
            path,
            authority: item.authority || parentAuthority,
        };
        if (item.children) {
            result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
        }
        return result;
    });
}

export const getMenuData = () => formatter(menuData);
