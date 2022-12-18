import classNames from 'classnames/bind';
import styles from '../AuthForm.module.scss';

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';

import Button from '~/components/Button';
import authServices from '~/services/authServices';

const cx = classNames.bind(styles);

function LoginForm({ onLogin, clickBack }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [user, setUser] = useState(false);

    useEffect(() => {
        setErrMsg('');
    }, [username, password]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = {
                Username: username,
                Password: password,
            };

            let dataAPI = await authServices.authLogin(data);

            if (dataAPI?.data) {
                setUser(true);
            } else {
                if (dataAPI.status === 401) {
                    setErrMsg('*Sai tài khoản hoặc mật khẩu');
                } else {
                    setErrMsg('*Đăng nhập thất bại');
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={cx('wrapper')} onClick={(e) => e.stopPropagation()}>
            <div className={cx('header')}>
                <h3 className={cx('heading')}>Đăng nhập</h3>
            </div>

            <form className={cx('body')} onSubmit={handleSubmit}>
                <div className={cx('group')}>
                    <span className={cx('error-msg')}>{errMsg}</span>{' '}
                </div>

                <div className={cx('group')}>
                    <input
                        type="text"
                        className={cx('input')}
                        name="username"
                        placeholder="Nhập tài khoản"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className={cx('group')}>
                    <input
                        type="password"
                        className={cx('input')}
                        name="password"
                        placeholder="Nhập mật khẩu"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className={cx('help')}>
                    <a href="/" className={cx('help-link', 'help-foget-pass')}>
                        Quên mật khẩu
                    </a>
                    <span className={cx('help-separation')}></span>
                    <a href="/" className={cx('help-link', 'helping')}>
                        Trợ giúp
                    </a>
                </div>

                {/* <div className={cx('check')}>
                            <div>
                                <input type="checkbox" id="confirm" className={cx('confirm')} value="confirm" />
                            </div>
                            <label htmlFor="confirm">
                                <p className={cx('remember')}>Nhớ đăng nhập</p>
                            </label>

                        </div> */}

                <div className={cx('controls')}>
                    <Button border transparent className={cx('back-btn')} onClick={clickBack}>
                        Trở lại
                    </Button>
                    <Button type="submit" primary border onClick={user ? onLogin() : null}>
                        Đăng nhập
                    </Button>
                </div>
            </form>

            <div className={cx('footer')}>
                <Button
                    large
                    border
                    leftIcon={<FontAwesomeIcon icon={faFacebook} />}
                    className={cx('social-item', 'socials-facebook')}
                >
                    Đăng nhập với Facebook
                </Button>
                <Button
                    large
                    border
                    leftIcon={<FontAwesomeIcon icon={faGoogle} />}
                    className={cx('social-item', 'socials-google')}
                >
                    Đăng nhập với Google
                </Button>
            </div>
        </div>
    );
}

export default LoginForm;
