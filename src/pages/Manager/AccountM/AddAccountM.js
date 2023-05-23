import classNames from 'classnames/bind';
import styles from './AccountM.module.scss';
import 'react-toastify/dist/ReactToastify.css';

import { useState, useContext } from 'react';

import Button from '~/components/Button';
import DataContext from '~/context/DataContext';
import userServices from '~/services/userServices';
import { ToastContainer, toast } from 'react-toastify';

const cx = classNames.bind(styles);

function AddAccountM({ onClickCancle }) {
    const { render, setRender } = useContext(DataContext);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [salary, setSalary] = useState(0);
    const [errMsg, setErrMsg] = useState('');

    const handleAddEmployee = async () => {
        try {
            // eslint-disable-next-line
            var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
            // eslint-disable-next-line
            var emailno = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (phone.length < 10) {
                setErrMsg('Số điện thoại phải có 10 chữ số');
                return;
            }
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
            if (salary === 0) {
                setErrMsg('Lương phải lớn hơn 0');
                return;
            }

            const data = {
                FirstName: firstName,
                LastName: lastName,
                Email: email,
                Phone: phone,
                Username: username,
                Password: password,
                Salary: salary,
            };

            let api = await userServices.addEmployee(data);

            if (api?.status === 200) {
                toast.success('Thêm tài khoản nhân viên mới thành công.', {
                    position: toast.POSITION.TOP_RIGHT,
                    className: 'toast-message',
                });
                onClickCancle();
                setRender(!render);
            } else {
                if (api?.status === 400) {
                    if (api.message === 'Email existed') {
                        setErrMsg('Email này đã được đăng ký tài khoản.');
                        toast.info('Email này đã được đăng ký tài khoản.', {
                            position: toast.POSITION.TOP_RIGHT,
                            className: 'toast-message',
                        });
                    } else if (api.message === 'Username existed') {
                        setErrMsg('Tên tài khoản đã tồn tại');
                        toast.info('Tên tài khoản đã tồn tại.', {
                            position: toast.POSITION.TOP_RIGHT,
                            className: 'toast-message',
                        });
                    } else {
                        setErrMsg('Lỗi không xác định, vui lòng thử lại sau');
                    }
                } else {
                    setErrMsg('Đăng ký thất bại');
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={cx('add-employee-layout')}>
            <div className={cx('title')}>Thêm nhân viên</div>
            <div className={cx('group')}>
                <span className={cx('error-msg')}>{errMsg}</span>{' '}
            </div>

            <div className={cx('group-item')}>
                <div className={cx('label-item')}>Họ</div>
                <input
                    type="text"
                    className={cx('input-item')}
                    placeholder="Nhập họ"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
            </div>
            <div className={cx('group-item')}>
                <div className={cx('label-item')}>Tên</div>
                <input
                    type="text"
                    className={cx('input-item')}
                    placeholder="Nhập tên"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
            </div>
            <div className={cx('group-item')}>
                <div className={cx('label-item')}>Email</div>
                <input
                    type="text"
                    className={cx('input-item')}
                    placeholder="Nhập email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className={cx('group-item')}>
                <div className={cx('label-item')}>Phone</div>
                <input
                    type="text"
                    className={cx('input-item')}
                    placeholder="Nhập số điện thoại"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
            </div>
            <div className={cx('group-item')}>
                <div className={cx('label-item')}>Tài khoản</div>
                <input
                    type="text"
                    className={cx('input-item')}
                    placeholder="Nhập tên tài khoản"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div className={cx('group-item')}>
                <div className={cx('label-item')}>Mật khẩu</div>
                <input
                    type="password"
                    className={cx('input-item')}
                    placeholder="Nhập mật khẩu"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className={cx('group-item')}>
                <div className={cx('label-item')}>Mật khẩu xác nhận</div>
                <input
                    type="password"
                    className={cx('input-item')}
                    placeholder="Nhập mật khẩu xác nhận"
                    required
                    value={repeatPassword}
                    onChange={(e) => setRepeatPassword(e.target.value)}
                />
            </div>
            <div className={cx('group-item')}>
                <div className={cx('label-item')}>Lương</div>
                <input
                    type="number"
                    className={cx('input-item')}
                    placeholder="Nhập lương nhân viên"
                    required
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                />
            </div>

            <div className={cx('button-layout')}>
                <Button border transparent onClick={onClickCancle}>
                    Trở lại
                </Button>
                <Button primary border type="submit" onClick={() => handleAddEmployee()}>
                    Đăng ký
                </Button>
            </div>
            <ToastContainer />
        </div>
    );
}

export default AddAccountM;
