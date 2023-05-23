import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
import 'react-toastify/dist/ReactToastify.css';

import Button from '~/components/Button';
import userServices from '~/services/userServices';
import DataContext from '~/context/DataContext';
import { ToastContainer, toast } from 'react-toastify';
import { useEffect, useState, useContext } from 'react';

const cx = classNames.bind(styles);

function Profile() {
    const [view, setView] = useState(true);
    const [user, setUser] = useState(null);
    const [lname, setLname] = useState('');
    const [fname, setFname] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [gender, setGender] = useState(null);
    const [errMsg, setErrMsg] = useState('');

    const { render, setRender } = useContext(DataContext);

    const handleUpdateInfo = async (e) => {
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

            const data = {
                FirstName: fname,
                LastName: lname,
                Email: email,
                Phone: phone,
                Birthdate: birthDate,
                Gender: gender,
            };

            let api = await userServices.updateInfo(data);

            if (api?.data) {
                console.log(api?.data);
                toast.success('Cập nhập thông tin thành công', {
                    position: toast.POSITION.TOP_RIGHT,
                    className: 'toast-message',
                });
                setView(true);
                setErrMsg('');
                setRender(!render);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handlePassData = (user) => {
        setEmail(user.Email);
        setFname(user.FirstName);
        setLname(user.LastName);
        setBirthDate(user.Birthdate);
        setPhone(user.Phone);
        if (user.Gender === false) {
            setGender(false);
        } else {
            setGender(true);
        }
        setView(!view);
    };

    const getUserInfo = async () => {
        const access = JSON.parse(localStorage.getItem('access'));

        if (access) {
            let dataApi = await userServices.getUser();

            if (dataApi?.data) {
                setUser(dataApi.data);
            }
        } else {
            setUser(null);
        }
    };

    useEffect(() => {
        getUserInfo();
    }, [view, errMsg, render]);

    return user ? (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>
                <p>Hồ sơ của bạn</p>
            </div>
            {view ? (
                <div>
                    <div className={cx('group-item')}>
                        <div className={cx('label-item')}>Tên Người Dùng</div>
                        <div className={cx('value-item')}>
                            {user.LastName} {user.FirstName}
                        </div>
                    </div>
                    <div className={cx('group-item')}>
                        <div className={cx('label-item')}>Giới tính</div>
                        <div className={cx('value-item')}>{user?.Gender || user?.Gender === null ? 'Nam' : 'Nữ'}</div>
                    </div>
                    <div className={cx('group-item')}>
                        <div className={cx('label-item')}>Ngày sinh</div>
                        <div className={cx('value-item')}>{user?.Birthdate}</div>
                    </div>
                    <div className={cx('group-item')}>
                        <div className={cx('label-item')}>Email</div>
                        <div className={cx('value-item')}>{user.Email}</div>
                    </div>
                    <div className={cx('group-item')}>
                        <div className={cx('label-item')}>Số điện thoại</div>
                        <div className={cx('value-item')}>{user.Phone}</div>
                    </div>

                    <div className={cx('button-layout-view')}>
                        <Button
                            outline
                            border
                            onClick={() => {
                                handlePassData(user);
                            }}
                        >
                            Chỉnh sửa
                        </Button>
                    </div>
                </div>
            ) : (
                <form onSubmit={handleUpdateInfo}>
                    <div className={cx('group-item')}>
                        <div className={cx('label-item')}>Email</div>
                        <div className={cx('value-item')}>{email}</div>
                    </div>
                    <div className={cx('group-item')}>
                        <div className={cx('label-item')}>Số điện thoại</div>
                        <div className={cx('value-item')}>{phone}</div>
                    </div>
                    <div className={cx('group')}>
                        <span className={cx('error-msg')}>{errMsg}</span>
                    </div>
                    <div className={cx('group-item')}>
                        <div className={cx('label-item')}>Họ</div>
                        <input
                            className={cx('input-item')}
                            type="text"
                            value={lname}
                            onChange={(e) => setLname(e.target.value)}
                        />
                    </div>
                    <div className={cx('group-item')}>
                        <div className={cx('label-item')}>Tên</div>
                        <input
                            className={cx('input-item')}
                            type="text"
                            value={fname}
                            onChange={(e) => setFname(e.target.value)}
                        />
                    </div>
                    <div className={cx('group-item')}>
                        <div className={cx('label-item')}>Giới tính</div>
                        <div className={cx('gender')}>
                            <input
                                className={cx('male-value')}
                                type="radio"
                                id="male"
                                name="gender"
                                value="male"
                                checked={gender}
                                onChange={(e) => {
                                    if (e.currentTarget.value === 'male') {
                                        setGender(true);
                                    } else {
                                        setGender(false);
                                    }
                                }}
                            />
                            <label className={cx('male-label')} htmlFor="male">
                                Nam
                            </label>
                            <input
                                className={cx('female-value')}
                                type="radio"
                                id="female"
                                name="gender"
                                value="female"
                                checked={gender === false}
                                onChange={(e) => {
                                    if (e.currentTarget.value === 'male') {
                                        setGender(true);
                                    } else {
                                        setGender(false);
                                    }
                                }}
                            />
                            <label className={cx('female-label')} htmlFor="female">
                                Nữ
                            </label>
                        </div>
                    </div>
                    <div className={cx('group-item')}>
                        <div className={cx('label-item')}>Ngày sinh</div>
                        <input
                            type="date"
                            className={cx('date-input')}
                            value={birthDate}
                            onChange={(e) => {
                                setBirthDate(e.target.value);
                            }}
                        />
                    </div>
                    <div className={cx('button-layout-update')}>
                        <Button outline border primary type="submit">
                            Cập nhập
                        </Button>
                        <Button
                            outline
                            border
                            onClick={() => {
                                setView(!view);
                                setErrMsg('');
                            }}
                        >
                            Hủy
                        </Button>
                    </div>
                </form>
            )}
            <ToastContainer />
        </div>
    ) : null;
}

export default Profile;
