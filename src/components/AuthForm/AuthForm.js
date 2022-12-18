import classNames from 'classnames/bind';
import styles from './AuthForm.module.scss';

import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const cx = classNames.bind(styles);

function AuthForm({ data = 'login', onLogin, clickBack }) {
    return (
        <div className={cx('wrapper')} onClick={(e) => e.stopPropagation()}>
            {data === 'login' ? (
                <LoginForm onLogin={onLogin} clickBack={clickBack} />
            ) : (
                <RegisterForm clickBack={clickBack} />
            )}
        </div>
    );
}

export default AuthForm;
