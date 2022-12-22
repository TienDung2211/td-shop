import classNames from 'classnames/bind';
import styles from './AuthForm.module.scss';

import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { useEffect } from 'react';

const cx = classNames.bind(styles);

function AuthForm({ data = 'login', onLogin, clickBack, onSwitchType }) {
    useEffect(() => {}, [data]);
    return (
        <div className={cx('wrapper')} onClick={(e) => e.stopPropagation()}>
            {data === 'login' && <LoginForm onLogin={onLogin} onSwitchType={onSwitchType} clickBack={clickBack} />}
            {data === 'register' && <RegisterForm onSwitchType={onSwitchType} clickBack={clickBack} />}
        </div>
    );
}

export default AuthForm;
