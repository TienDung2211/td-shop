import classNames from 'classnames/bind';
import styles from './AccountM.module.scss';
import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faPlus } from '@fortawesome/free-solid-svg-icons';

import HeadlessTippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import Button from '~/components/Button';
import AccountMItem from './AccountMItem';

const cx = classNames.bind(styles);

const accounts = [
    {
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
    },
    {
        id: 120,
        fname: 'Tiến Đạt',
        lname: 'Trần',
        gender: true,
        birthDate: '2001-11-22',
        email: 'tiendung@g.com',
        phone: '0123456789',
        username: 'tiendungabc',
        password: 'tiendung2211',
        role: 'ROLE_ADMIN',
        isActive: true,
        verified: 'zja812az',
        createDate: '22/11/2019',
        deleteDate: '',
    },
    {
        id: 120,
        fname: 'Tiến Đạt',
        lname: 'Trần',
        gender: true,
        birthDate: '2001-11-22',
        email: 'tiendung@g.com',
        phone: '0123456789',
        username: 'tiendungabc',
        password: 'tiendung2211',
        role: 'ROLE_ADMIN',
        isActive: true,
        verified: 'zja812az',
        createDate: '22/11/2019',
        deleteDate: '',
    },
    {
        id: 120,
        fname: 'Tiến Đạt',
        lname: 'Trần',
        gender: true,
        birthDate: '2001-11-22',
        email: 'tiendung@g.com',
        phone: '0123456789',
        username: 'tiendungabc',
        password: 'tiendung2211',
        role: 'ROLE_ADMIN',
        isActive: true,
        verified: 'zja812az',
        createDate: '22/11/2019',
        deleteDate: '',
    },
    {
        id: 120,
        fname: 'Tiến Đạt',
        lname: 'Trần',
        gender: true,
        birthDate: '2001-11-22',
        email: 'tiendung@g.com',
        phone: '0123456789',
        username: 'tiendungabc',
        password: 'tiendung2211',
        role: 'ROLE_ADMIN',
        isActive: true,
        verified: 'zja812az',
        createDate: '22/11/2019',
        deleteDate: '',
    },
    {
        id: 120,
        fname: 'Tiến Đạt',
        lname: 'Trần',
        gender: true,
        birthDate: '2001-11-22',
        email: 'tiendung@g.com',
        phone: '0123456789',
        username: 'tiendungabc',
        password: 'tiendung2211',
        role: 'ROLE_ADMIN',
        isActive: true,
        verified: 'zja812az',
        createDate: '22/11/2019',
        deleteDate: '',
    },
    {
        id: 120,
        fname: 'Tiến Đạt',
        lname: 'Trần',
        gender: true,
        birthDate: '2001-11-22',
        email: 'tiendung@g.com',
        phone: '0123456789',
        username: 'tiendungabc',
        password: 'tiendung2211',
        role: 'ROLE_ADMIN',
        isActive: true,
        verified: 'zja812az',
        createDate: '22/11/2019',
        deleteDate: '',
    },
    {
        id: 120,
        fname: 'Tiến Đạt',
        lname: 'Trần',
        gender: true,
        birthDate: '2001-11-22',
        email: 'tiendung@g.com',
        phone: '0123456789',
        username: 'tiendungabc',
        password: 'tiendung2211',
        role: 'ROLE_ADMIN',
        isActive: true,
        verified: 'zja812az',
        createDate: '22/11/2019',
        deleteDate: '',
    },
    {
        id: 120,
        fname: 'Tiến Đạt',
        lname: 'Trần',
        gender: true,
        birthDate: '2001-11-22',
        email: 'tiendung@g.com',
        phone: '0123456789',
        username: 'tiendungabc',
        password: 'tiendung2211',
        role: 'ROLE_ADMIN',
        isActive: true,
        verified: 'zja812az',
        createDate: '22/11/2019',
        deleteDate: '',
    },
    {
        id: 120,
        fname: 'Tiến Đạt',
        lname: 'Trần',
        gender: true,
        birthDate: '2001-11-22',
        email: 'tiendung@g.com',
        phone: '0123456789',
        username: 'tiendungabc',
        password: 'tiendung2211',
        role: 'ROLE_ADMIN',
        isActive: true,
        verified: 'zja812az',
        createDate: '22/11/2019',
        deleteDate: '',
    },
];

function AccountM() {
    const [showOptionsAccount, setShowOptionsAccount] = useState(false);

    const handleClick = () => {
        setShowOptionsAccount(!showOptionsAccount);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('control')}>
                <Button rounded approach iconOnly={<FontAwesomeIcon icon={faPlus} />}></Button>
                <form className={cx('control-filt')}>
                    <div className={cx('options-layout')}>
                        <HeadlessTippy
                            interactive
                            visible={showOptionsAccount}
                            placement="bottom-start"
                            render={(attrs) => (
                                <div className={cx('options')} tabIndex="-1" {...attrs}>
                                    <PopperWrapper>
                                        <ul className={cx('options-list')}>
                                            <li className={cx('options-item', 'selection-item')}>
                                                <span>Tất cả</span>
                                            </li>
                                            <li className={cx('options-item')}>
                                                <span>Khách hàng</span>
                                            </li>
                                            <li className={cx('options-item')}>
                                                <span>Nhân viên</span>
                                            </li>
                                        </ul>
                                    </PopperWrapper>
                                </div>
                            )}
                        >
                            <div className={cx('label')}>
                                <span>Loại tài khoản</span>
                                <FontAwesomeIcon icon={faAngleDown} onClick={handleClick} />
                            </div>
                        </HeadlessTippy>
                    </div>

                    <div className={cx('input-layout')}>
                        <input className={cx('input')} type="text" placeholder="Nhập tên tìm kiếm"></input>
                    </div>

                    <div className={cx('button-layout')}>
                        <Button primary border>
                            Áp dụng
                        </Button>
                    </div>
                </form>
            </div>

            <div className={cx('results')}>
                {accounts.map((account) => {
                    return <AccountMItem data={account} />;
                })}
            </div>
        </div>
    );
}

export default AccountM;
