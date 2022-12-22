import classNames from 'classnames/bind';
import styles from '../AuthForm.module.scss';

import { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';

import Button from '~/components/Button';
import authServices from '~/services/authServices';
import { ToastContainer, toast } from 'react-toastify';

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
    const [confirmEmail, setConfirmEmail] = useState(false);

    useEffect(() => {
        setErrMsg('');
    }, [firstName, lastName, email, phone, username, password, repeatPassword]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
            var emailno = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (!phone.match(phoneno)) {
                setErrMsg('Vui lòng nhập số điện thoại đúng định dạng');
                return;
            }
            if (!email.match(emailno)) {
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

            console.log(dataAPI);

            if (dataAPI?.data) {
                console.log(dataAPI?.data);
                setConfirmEmail(true);
                toast.success('Đăng ký tài khoản thành công! Vui lòng xác thực gmail để đăng nhập', {
                    position: toast.POSITION.TOP_RIGHT,
                    className: 'toast-message',
                });
            } else {
                if (dataAPI.status === 400) {
                    if (dataAPI.message === 'Email existed') {
                        setErrMsg('Email này đã được đăng ký tài khoản');
                    } else if (dataAPI.message === 'Username existed') {
                        setErrMsg('Tên tài khoản đã tồn tại');
                    } else {
                        setErrMsg('Lỗi không xác định, vui lòng thử lại sau');
                    }
                } else {
                    setErrMsg('*Đăng ký thất bại');
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
            {!confirmEmail ? (
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
                            type="password"
                            className={cx('input')}
                            placeholder="Mật khẩu"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className={cx('group')}>
                        <input
                            type="password"
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
            ) : (
                <div className={cx('confirm-email')}>
                    <h2 className={cx('heading')}>Vui lòng xác nhận Email</h2>

                    <div className={cx('instruction')}>
                        <span className={cx('step')}>B1 : Truy cập vào email đã đăng ký tài khoản.</span>
                        <span className={cx('step')}>
                            B2 : Tìm kiếm thư xác nhận từ <span className={cx('active')}>tdshophcmute</span>.
                        </span>
                        <span className={cx('step')}>
                            B3 : Chọn <span className={cx('active')}>Confirm Your Email</span> để xác nhận tài khoản.
                        </span>
                        <span className={cx('step')}>B4 : Quay trở lại đăng nhập với tài khoản đã đăng ký.</span>
                    </div>
                </div>
            )}

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
            <ToastContainer />
        </div>
    );
}

export default RegisterForm;
