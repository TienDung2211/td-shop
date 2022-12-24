import classNames from 'classnames/bind';
import 'react-toastify/dist/ReactToastify.css';
import styles from './ResetPassword.module.scss';

import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Button from '~/components/Button';
import authServices from '~/services/authServices';
import { ToastContainer, toast } from 'react-toastify';

const cx = classNames.bind(styles);

function ResetPassword() {
    const [sendEmail, setSendEmail] = useState(false);
    const [verify, setVerify] = useState(false);
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [info, setInfo] = useState('Một mã xác nhận đã được gửi đến gmail của bạn.');

    const handleSubmitEmail = async (e) => {
        e.preventDefault();
        try {
            // eslint-disable-next-line
            var emailno = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (!email.match(emailno)) {
                setErrMsg('Vui lòng nhập email đúng định dạng');
                return;
            }
            const data = {
                Email: email,
            };

            let dataAPI = await authServices.authSendEmailForgotPassword(data);

            if (dataAPI.status === 400) {
                setErrMsg('Email không được đăng ký tài khoản');
            } else {
                setSendEmail(true);
                setErrMsg('');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleReSubmitEmail = async () => {
        try {
            const data = {
                Email: email,
            };

            let dataAPI = await authServices.authSendEmailForgotPassword(data);

            if (dataAPI.status === 400) {
                setErrMsg('Email không được đăng ký tài khoản');
            } else {
                setSendEmail(true);
                setErrMsg('');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmitCode = async (e) => {
        e.preventDefault();
        try {
            const data = {
                Email: email,
                Token: code,
            };

            let dataAPI = await authServices.authVerifyResetPassword(data);

            if (dataAPI.status === 400) {
                setErrMsg('Mã xác nhận không chính xác');
                setInfo('');
            } else {
                setVerify(true);
                setErrMsg('');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        try {
            if (password.length < 8 || repeatPassword.length < 8) {
                setErrMsg('Mật khẩu phải có tối thiểu 8 kí tự.');
                return;
            } else if (password !== repeatPassword) {
                setErrMsg('Mật khẩu nhập lại không khớp.');
                return;
            }

            const data = {
                Email: email,
                NewPassword: password,
                ConfirmPassword: repeatPassword,
            };

            let dataAPI = await authServices.authResetPassword(data);

            if (dataAPI.data) {
                toast.success('Lấy lại mật khẩu thành công! Quay lại trang chủ để đăng nhập', {
                    position: toast.POSITION.TOP_RIGHT,
                    className: 'toast-message',
                });
            } else {
                setErrMsg('Lỗi không xác định, vui lòng thử lại sau.');
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {}, [email, code, password, repeatPassword]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('layout')}>
                <span className={cx('title')}>Lấy lại mật khẩu</span>
                {!sendEmail && !verify && (
                    <form className={cx('body')} onSubmit={handleSubmitEmail}>
                        <div className={cx('group')}>
                            <span className={cx('error-msg')}>{errMsg}</span>
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
                        <div className={cx('controls')}>
                            <Button type="submit" primary border>
                                Tiếp tục
                            </Button>
                        </div>
                    </form>
                )}
                {sendEmail && !verify && (
                    <form className={cx('body')} onSubmit={handleSubmitCode}>
                        <div className={cx('group')}>
                            <span className={cx('info')}>{info}</span>
                        </div>
                        <div className={cx('group')}>
                            <span className={cx('error-msg')}>{errMsg}</span>
                        </div>
                        <div className={cx('group')}>
                            <input
                                type="text"
                                className={cx('input')}
                                placeholder="Nhập mã xác nhận"
                                required
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                            />
                        </div>
                        <div
                            className={cx('group')}
                            onClick={() => {
                                setInfo('Một mã xác nhận khác đã được gửi đến gmail của bạn.');
                                setErrMsg('');
                                handleReSubmitEmail();
                            }}
                        >
                            <span className={cx('re-send')}>Gửi lại mã xác nhận</span>
                        </div>
                        <div className={cx('controls')}>
                            <Button
                                border
                                transparent
                                className={cx('back-btn')}
                                onClick={() => {
                                    setErrMsg('');
                                    setSendEmail(false);
                                }}
                            >
                                Trở lại
                            </Button>
                            <Button type="submit" primary border>
                                Xác nhận
                            </Button>
                        </div>
                    </form>
                )}
                {verify && sendEmail && (
                    <form className={cx('body')} onSubmit={handleResetPassword}>
                        <div className={cx('group')}>
                            <div className={cx('label')}>Email : </div>
                            <div className={cx('value')}>{email}</div>
                        </div>
                        <div className={cx('group')}>
                            <span className={cx('error-msg')}>{errMsg}</span>{' '}
                        </div>
                        <div className={cx('group')}>
                            <input
                                type="password"
                                className={cx('input')}
                                placeholder="Nhập mật khẩu"
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
                        <div className={cx('controls')}>
                            <Button
                                border
                                transparent
                                className={cx('back-btn')}
                                onClick={() => {
                                    setSendEmail(false);
                                    setVerify(false);
                                    setErrMsg('');
                                }}
                            >
                                Trở lại
                            </Button>
                            <Button primary border>
                                Xác nhận
                            </Button>
                        </div>
                    </form>
                )}

                <div className={cx('return-layout')}>
                    <Link to={'/'}>{'<<'}Trở về trang chủ</Link>
                </div>
                <ToastContainer />
            </div>
        </div>
    );
}

export default ResetPassword;
