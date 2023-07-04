import classNames from 'classnames/bind';
import styles from '../AuthForm.module.scss';

import { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';

import { Link, useNavigate } from 'react-router-dom';
import Button from '~/components/Button';
import DataContext from '~/context/DataContext';
import authServices from '~/services/authServices';

const cx = classNames.bind(styles);

function LoginForm({ onLogin, onSwitchType, clickBack }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isActiveAccount, setIsActiveAccount] = useState(true);
    const [idAccount, setIdAccount] = useState(0);
    const [errMsg, setErrMsg] = useState('');

    const { render, setRender } = useContext(DataContext);

    const navigate = useNavigate();

    useEffect(() => {
        setErrMsg('');
    }, [username, password]);

    const handleLogin = async () => {
        const data = {
            Username: username,
            Password: password,
        };

        let dataAPI = await authServices.authLogin(data);

        if (dataAPI.status === 200) {
            onLogin();
            setRender(!render);
        } else if (dataAPI.status === 10001) {
            setErrMsg('Tài khoản của bạn chưa được kích hoạt.');
            setIsActiveAccount(false);
            setIdAccount(dataAPI.data.id);
        } else {
            if (dataAPI.message === 'Login failed: your account has been banned') {
                setErrMsg('Tài khoản của bạn đã bị vô hiệu hóa');
            } else if (dataAPI.status === 401) {
                setErrMsg('Sai tài khoản hoặc mật khẩu');
            }
        }
    };

    const handleGoToActive = () => {
        navigate('/resend-token', { state: { data: idAccount } });
    };

    return (
        <form className={cx('wrapper')}>
            <div className={cx('header')}>
                <h3 className={cx('heading')}>Đăng nhập</h3>
                <Button className={cx('switch-btn')} onClick={onSwitchType}>
                    Đăng ký
                </Button>
            </div>

            <div className={cx('body')}>
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
                        autoComplete="off"
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
                        autoComplete="off"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className={cx('help')}>
                    <Link to={'/reset-password'}>
                        <div className={cx('help-link', 'help-foget-pass')}>Quên mật khẩu</div>
                    </Link>
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
                    {isActiveAccount ? (
                        <Button primary border onClick={() => handleLogin()}>
                            Đăng nhập
                        </Button>
                    ) : (
                        <Button primary border onClick={() => handleGoToActive()}>
                            Kích hoạt
                        </Button>
                    )}
                </div>
            </div>

            <div className={cx('footer')}>
                <Button
                    large
                    border
                    leftIcon={<FontAwesomeIcon icon={faFacebook} />}
                    className={cx('social-item', 'socials-facebook', 'disable')}
                >
                    Tiếp tục với Facebook
                </Button>
                <Button
                    large
                    border
                    leftIcon={<FontAwesomeIcon icon={faGoogle} />}
                    className={cx('social-item', 'socials-google')}
                    href={process.env.REACT_APP_LOGIN_WITH_GOOGLE}
                >
                    Tiếp tục với Google
                </Button>
            </div>
        </form>
    );
}

export default LoginForm;
