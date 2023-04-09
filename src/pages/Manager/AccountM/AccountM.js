import classNames from 'classnames/bind';
import styles from './AccountM.module.scss';
import 'react-toastify/dist/ReactToastify.css';

import { useState, useEffect, useContext } from 'react';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Select from 'react-select';
import Button from '~/components/Button';
import AccountMItem from './AccountMItem';
import DataContext from '~/context/DataContext';
import userServices from '~/services/userServices';
import { ToastContainer, toast } from 'react-toastify';

const cx = classNames.bind(styles);

function AccountM() {
    const [accounts, setAccounts] = useState([]);
    const [renderPage, setRenderPage] = useState(true);
    const [action, setAction] = useState('view');

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [salary, setSalary] = useState(0);
    const [errMsg, setErrMsg] = useState('');

    const { render } = useContext(DataContext);

    const getAllAccounts = async () => {
        let api = await userServices.getAllAccounts();

        if (api?.status === 200) {
            setAccounts(api.data.content);
        } else if (api === undefined) {
            toast.error('Tài khoản của bạn không có quyền truy cập.', {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-message',
            });
            setAccounts([]);
        }
    };

    const handleBanAccount = async (id) => {
        let api = await userServices.banAccount(id);

        if (api?.status === 200) {
            toast.success('Tài khoản bị vô hiệu thành công', {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-message',
            });
            setRenderPage(!renderPage);
        } else if (api === undefined) {
            toast.error('Vui lòng đăng nhập để tiếp tục xóa tùy chọn.', {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-message',
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

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
                setRenderPage(!renderPage);
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

    useEffect(() => {
        getAllAccounts();
    }, [renderPage, render, action]);

    return accounts.length > 0 ? (
        <div className={cx('wrapper')}>
            <div className={cx('control')}>
                <Button
                    rounded
                    approach
                    iconOnly={<FontAwesomeIcon icon={faPlus} />}
                    onClick={() => {
                        setAction('add');
                        console.log('Add Employee');
                        console.log(action);
                    }}
                ></Button>
                <form className={cx('control-filt')}>
                    <div className={cx('options-layout')}>
                        <Select
                            formatOptionLabel={(option) => `${option.value}`}
                            placeholder="Chọn loại tài khoản"
                            // onChange={handleChangePayment}
                            options={[
                                { value: 'Tất cả', label: 0 },
                                { value: 'Nhân viên', label: 1 },
                                { value: 'Người dùng', label: 2 },
                                { value: 'Admin', label: 3 },
                            ]}
                        />
                    </div>

                    <div className={cx('input-layout')}>
                        <input className={cx('input')} type="text" placeholder="Nhập tên tìm kiếm"></input>
                    </div>

                    <div className={cx('button-apply')}>
                        <Button primary border>
                            Áp dụng
                        </Button>
                    </div>
                </form>
            </div>
            {action === 'view' && (
                <div className={cx('results')}>
                    {accounts.map((account, index) => {
                        return (
                            <AccountMItem
                                key={index}
                                data={account}
                                onBanAccount={() => {
                                    handleBanAccount(account.id);
                                }}
                            />
                        );
                    })}
                </div>
            )}

            {action === 'add' && (
                <form className={cx('add-employee-layout')} onSubmit={handleSubmit}>
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
                        <Button border transparent onClick={() => setAction('view')}>
                            Trở lại
                        </Button>
                        <Button primary border type="submit">
                            Đăng ký
                        </Button>
                    </div>
                </form>
            )}
            <ToastContainer />
        </div>
    ) : null;
}

export default AccountM;
