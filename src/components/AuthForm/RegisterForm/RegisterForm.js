import classNames from 'classnames/bind';
import styles from '../AuthForm.module.scss';

import { useState, useContext, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';

import Button from '~/components/Button';
import authServices from '~/services/authServices';

const cx = classNames.bind(styles);

function RegisterForm({ clickBack }) {
    // const [username, setUsername] = useState('');
    // const [password, setPassword] = useState('');
    // const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        // setErrMsg('');
    }, []);

    return (
        <div className={cx('wrapper')} onClick={(e) => e.stopPropagation()}>
            <div className={cx('header')}>
                <h3 className={cx('heading')}>Đăng ký</h3>
            </div>

            <div className={cx('body')}>
                <div className={cx('group')}>
                    <input type="text" className={cx('input')} placeholder="Tên tài khoản" />
                </div>
                <div className={cx('group')}>
                    <input type="text" className={cx('input')} placeholder="Mật khẩu" />
                </div>
                <div className={cx('group')}>
                    <input type="text" className={cx('input')} placeholder="Nhập lại mật khẩu" />
                </div>

                <div className={cx('check')}>
                    <div>
                        <input className={cx('confirm')} type="checkbox" id="confirm" value="confirm" />
                    </div>
                    <label htmlFor="confirm">
                        <p className={cx('policy')}>
                            Bạn xác nhận đồng ý với TD-Shop về{' '}
                            <a href="/" className={cx('policy-link')}>
                                Điều khoản dịch vụ
                            </a>
                            {' & '}
                            <a href="/" className={cx('policy-link')}>
                                Chính sách bảo mật
                            </a>
                        </p>
                    </label>
                </div>
                <div className={cx('controls')}>
                    <Button border transparent className={cx('back-btn')} onClick={clickBack}>
                        Trở lại
                    </Button>
                    <Button primary border /*onClick={clickLogin}*/>
                        Đăng ký
                    </Button>
                </div>
            </div>

            <div className={cx('footer')}>
                <Button
                    large
                    border
                    leftIcon={<FontAwesomeIcon icon={faFacebook} />}
                    className={cx('social-item', 'socials-facebook')}
                >
                    Kết nối với Facebook
                </Button>
                <Button
                    large
                    border
                    leftIcon={<FontAwesomeIcon icon={faGoogle} />}
                    className={cx('social-item', 'socials-google')}
                >
                    Kết nối với Google
                </Button>
            </div>
        </div>
    );
}

export default RegisterForm;
