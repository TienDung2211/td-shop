import classNames from 'classnames/bind';
import styles from './AuthForm.module.scss';

import Button from '~/components/Button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { useState } from 'react';

const cx = classNames.bind(styles);

function AuthForm({ data = 'login', clickLogin, clickBack }) {
    const [type, setType] = useState(data);

    return (
        <div className={cx('wrapper')} onClick={(e) => e.stopPropagation()}>
            {type === 'login' ? (
                <div>
                    <div className={cx('header')}>
                        <h3 className={cx('heading')}>Đăng nhập</h3>
                        <Button
                            transparent
                            className={cx('switch-btn')}
                            onClick={() => {
                                setType('signin');
                            }}
                        >
                            Đăng ký
                        </Button>
                    </div>

                    <div className={cx('body')}>
                        <div className={cx('group')}>
                            <input type="text" className={cx('input')} placeholder="Nhập tài khoản" />
                        </div>
                        <div className={cx('group')}>
                            <input type="text" className={cx('input')} placeholder="Nhập mật khẩu" />
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

                        <div className={cx('check')}>
                            <div>
                                <input type="checkbox" id="confirm" className={cx('confirm')} value="confirm" />
                            </div>
                            <label htmlFor="confirm">
                                <p className={cx('remember')}>Nhớ đăng nhập</p>
                            </label>
                        </div>

                        <div className={cx('controls')}>
                            <Button border transparent className={cx('back-btn')} onClick={clickBack}>
                                Trở lại
                            </Button>
                            <Button primary border onClick={clickLogin}>
                                Đăng nhập
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
            ) : undefined}
            {type === 'signin' ? (
                <div>
                    <div className={cx('header')}>
                        <h3 className={cx('heading')}>Đăng ký</h3>
                        <Button
                            transparent
                            className={cx('switch-btn')}
                            onClick={() => {
                                setType('login');
                            }}
                        >
                            Đăng nhập
                        </Button>
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
                            <Button primary border onClick={clickLogin}>
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
            ) : undefined}
        </div>
    );
}

export default AuthForm;
