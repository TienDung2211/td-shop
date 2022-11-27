import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
import Button from '~/components/Button';
import { useState } from 'react';

const cx = classNames.bind(styles);

const user = {
    id: 120,
    fname: 'Tiến Dũng',
    lname: 'Trần',
    gender: true,
    birthDate: '2001-11-22',
    email: 'tiendung@g.com',
    phone: '0123456789',
    username: 'tiendungabc',
    password: 'tiendung2211',
    role: 'ROLE_CUSTOMER',
    isActive: true,
    verified: 'zja812az',
    createDate: '22/11/2019',
    deleteDate: '',
};

function Profile() {
    const [view, setView] = useState(true);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>
                <p>Hồ sơ của bạn</p>
            </div>
            {view ? (
                <div>
                    <div className={cx('group-item')}>
                        <div className={cx('label-item')}>Tên Người Dùng</div>
                        <div className={cx('value-item')}>
                            {user.lname} {user.fname}
                        </div>
                    </div>
                    <div className={cx('group-item')}>
                        <div className={cx('label-item')}>Giới tính</div>
                        <div className={cx('value-item')}>{user.gender ? 'Nam' : 'Nữ'}</div>
                    </div>
                    <div className={cx('group-item')}>
                        <div className={cx('label-item')}>Ngày sinh</div>
                        <div className={cx('value-item')}>{user.birthDate}</div>
                    </div>
                    <div className={cx('group-item')}>
                        <div className={cx('label-item')}>Email</div>
                        <div className={cx('value-item')}>{user.email}</div>
                    </div>
                    <div className={cx('group-item')}>
                        <div className={cx('label-item')}>Số điện thoại</div>
                        <div className={cx('value-item')}>{user.phone}</div>
                    </div>

                    <div className={cx('button-layout-view')}>
                        <Button outline border onClick={() => setView(!view)}>
                            Chỉnh sửa
                        </Button>
                    </div>
                </div>
            ) : (
                <form>
                    <div className={cx('group-item')}>
                        <div className={cx('label-item')}>Họ</div>
                        <input
                            className={cx('input-item')}
                            type="text"
                            defaultValue={user.lname}
                            name="lname"
                            id="lname"
                        />
                    </div>
                    <div className={cx('group-item')}>
                        <div className={cx('label-item')}>Tên</div>
                        <input
                            className={cx('input-item')}
                            type="text"
                            defaultValue={user.fname}
                            name="fname"
                            id="fname"
                        />
                    </div>
                    <div className={cx('group-item')}>
                        <div className={cx('label-item')}>Giới tính</div>
                        {user.gender ? (
                            <div className={cx('gender')}>
                                <input
                                    className={cx('male-value')}
                                    type="radio"
                                    id="male"
                                    name="gender"
                                    defaultChecked
                                />
                                <label className={cx('male-label')} for="male">
                                    Nam
                                </label>
                                <input className={cx('female-value')} type="radio" id="female" name="gender" />
                                <label className={cx('female-label')} for="female">
                                    Nữ
                                </label>
                            </div>
                        ) : (
                            <div className={cx('gender')}>
                                <input className={cx('male-value')} type="radio" id="male" name="gender" />
                                <label className={cx('male-label')} for="male">
                                    Nam
                                </label>
                                <input
                                    className={cx('female-value')}
                                    type="radio"
                                    id="female"
                                    name="gender"
                                    defaultChecked
                                />
                                <label className={cx('female-label')} for="female">
                                    Nữ
                                </label>
                            </div>
                        )}
                    </div>
                    <div className={cx('group-item')}>
                        <div className={cx('label-item')}>Ngày sinh</div>
                        <input type="date" defaultValue={user.birthDate} />
                    </div>
                    <div className={cx('group-item')}>
                        <div className={cx('label-item')}>Email</div>
                        <input className={cx('input-item')} type="text" defaultValue={user.email} />
                    </div>
                    <div className={cx('group-item')}>
                        <div className={cx('label-item')}>Số điện thoại</div>
                        <input className={cx('input-item')} type="text" defaultValue={user.phone} />
                    </div>
                    <div className={cx('button-layout-update')}>
                        <Button outline border primary onClick={() => setView(!view)}>
                            Xác nhận
                        </Button>
                        <Button outline border onClick={() => setView(!view)}>
                            Hủy
                        </Button>
                    </div>
                </form>
            )}
        </div>
    );
}

export default Profile;
