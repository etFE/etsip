import React from 'react';
import { Input, Icon } from 'antd';
import styles from './index.less';

const map = {
    UserName: {
        component: Input,
        props: {
            size: 'large',
            prefix: <Icon type="user" className={styles.prefixIcon} />,
            placeholder: '账号',
        },
        rules: [
            {
                required: true,
                message: '请输入账号!',
            },
        ],
    },
    Password: {
        component: Input,
        props: {
            size: 'large',
            prefix: <Icon type="lock" className={styles.prefixIcon} />,
            type: 'password',
            placeholder: '密码',
        },
        rules: [
            {
                required: true,
                message: '请输入密码!',
            },
        ],
    },
    Mobile: {
        component: Input,
        props: {
            size: 'large',
            prefix: <Icon type="mobile" className={styles.prefixIcon} />,
            placeholder: 'mobile number',
        },
        rules: [
            {
                required: true,
                message: '请输入手机号码!',
            },
            {
                pattern: /^1\d{10}$/,
                message: '手机号码格式错误!',
            },
        ],
    },
    Captcha: {
        component: Input,
        props: {
            size: 'large',
            prefix: <Icon type="mail" className={styles.prefixIcon} />,
            placeholder: '验证码',
        },
        rules: [
            {
                required: true,
                message: '请输入验证码!',
            },
        ],
    },
};

export default map;
