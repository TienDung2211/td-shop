import classNames from 'classnames/bind';
import styles from './AccountM.module.scss';
import 'react-toastify/dist/ReactToastify.css';

import { useState, useContext, useEffect } from 'react';

import Button from '~/components/Button';
import DataContext from '~/context/DataContext';
import userServices from '~/services/userServices';
import { ToastContainer, toast } from 'react-toastify';

const cx = classNames.bind(styles);

function UpdateAccountM({ id, onClickCancle }) {
    const { render, setRender } = useContext(DataContext);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [gender, setGender] = useState(null);
    const [salary, setSalary] = useState(0);
    const [errMsg, setErrMsg] = useState('');

    const handleGetEmployee = async () => {
        const api = await userServices.getEmployeeById(id);
        if (api.status === 200) {
            setFirstName(api.data.FirstName);
            setLastName(api.data.LastName);
            setBirthDate(api.data.Birthdate);
            setGender(api.data.Gender);
            setSalary(api.data.Salary);
        }
    };

    const handleUpdateEmployee = async () => {
        try {
            if (salary === 0) {
                setErrMsg('Lương phải lớn hơn 0');
                return;
            }

            const data = {
                FirstName: firstName,
                LastName: lastName,
                Birthdate: birthDate,
                Gender: gender,
                Salary: salary,
            };

            let api = await userServices.updateEmployee(id, data);

            if (api?.status === 200) {
                toast.success('Cập nhập thông tin nhân viên thành công.', {
                    position: toast.POSITION.TOP_RIGHT,
                    className: 'toast-message',
                });
                onClickCancle();
                setRender(!render);
            } else {
                toast.warning('Lỗi không xác định, vui lòng thử lại sau.', {
                    position: toast.POSITION.TOP_RIGHT,
                    className: 'toast-message',
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        handleGetEmployee();
    }, [id]);

    return (
        <div className={cx('add-employee-layout')}>
            <div className={cx('title')}>Cập nhập thông tin nhân viên</div>
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
                <Button primary border type="submit" onClick={() => handleUpdateEmployee()}>
                    Cập nhập
                </Button>
            </div>
            <ToastContainer />
        </div>
    );
}

export default UpdateAccountM;
