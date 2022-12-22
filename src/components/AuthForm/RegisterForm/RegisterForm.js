import classNames from 'classnames/bind';
import styles from '../AuthForm.module.scss';

import { useState, useContext, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';

import Button from '~/components/Button';
import authServices from '~/services/authServices';

const cx = classNames.bind(styles);

function RegisterForm({ clickBack, onSwitchType }) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        setErrMsg('');
    }, [firstName, lastName, email, phone, username, password, repeatPassword]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            var phoneno = /^\d{10}$/;
            var emailno = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (!phone.match(phoneno)) {
                setErrMsg('Vui lòng nhập số điện thoại đúng định dạng');
                return;
            }
            if (!emailno.test(email)) {
                setErrMsg('Vui lòng nhập email đúng định dạng');
                return;
            }
            if (username.length < 6) {
                setErrMsg('Tài khoản phải có tối thiểu 6 kí tự');
                return;
            }
            if (password.length < 8 || repeatPassword < 8) {
                setErrMsg('Mật khẩu phải có tối thiểu 8 kí tự');
                return;
            }
            if (password !== repeatPassword) {
                setErrMsg('Mật khẩu xác nhận không khớp');
                return;
            }

            const data = {
                FirstName: firstName,
                LastName: lastName,
                Email: email,
                Phone: phone,
                Username: username,
                Password: password,
            };

            let dataAPI = await authServices.authRegister(data);

            if (dataAPI?.data) {
                console.log(dataAPI?.data);
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
                <h3 className={cx('heading')}>Đăng ký</h3>
                <Button className={cx('switch-btn')} onClick={onSwitchType}>
                    Đăng nhập
                </Button>
            </div>

            <form className={cx('body')} onSubmit={handleSubmit}>
                <div className={cx('group')}>
                    <span className={cx('error-msg')}>{errMsg}</span>{' '}
                </div>
                <div className={cx('group')}>
                    <input
                        type="text"
                        className={cx('input')}
                        placeholder="Nhập họ"
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>
                <div className={cx('group')}>
                    <input
                        type="text"
                        className={cx('input')}
                        placeholder="Nhập tên"
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </div>
                <div className={cx('group')}>
                    <input
                        type="email"
                        className={cx('input')}
                        placeholder="Nhập email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className={cx('group')}>
                    <input
                        type="text"
                        className={cx('input')}
                        placeholder="Nhập số điện thoại"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
                <div className={cx('group')}>
                    <input
                        type="text"
                        className={cx('input')}
                        placeholder="Tên tài khoản"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className={cx('group')}>
                    <input
                        type="text"
                        className={cx('input')}
                        placeholder="Mật khẩu"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className={cx('group')}>
                    <input
                        type="text"
                        className={cx('input')}
                        placeholder="Nhập lại mật khẩu"
                        required
                        value={repeatPassword}
                        onChange={(e) => setRepeatPassword(e.target.value)}
                    />
                </div>

                <div className={cx('check')}>
                    <div>
                        <input className={cx('confirm')} type="checkbox" id="confirm" value="confirm" required />
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
                <div className={cx('controls-register')}>
                    <Button border transparent className={cx('back-btn')} onClick={clickBack}>
                        Trở lại
                    </Button>
                    <Button primary border /*onClick={clickLogin}*/>
                        Đăng ký
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
