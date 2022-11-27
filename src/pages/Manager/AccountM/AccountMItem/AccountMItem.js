import classNames from 'classnames/bind';
import styles from './AccountMItem.module.scss';
// import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserSlash, faPen } from '@fortawesome/free-solid-svg-icons';
// import HeadlessTippy from '@tippyjs/react/headless';

// import { Wrapper as PopperWrapper } from '~/components/Popper';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function AccountMItem({ data }) {
    return (
        <div className={cx('account-layout')}>
            <div className={cx('info')}>
                <div className={cx('main-info')}>
                    <span className={cx('info-item')}>
                        Họ Tên : {data.lname} {data.fname}
                    </span>
                    <span className={cx('info-item')}>{data.role}</span>
                </div>
                <span className={cx('info-item')}>SĐT : {data.phone}</span>
                <span className={cx('info-item')}>Email : {data.email}</span>
            </div>
            <Button className={cx('button')} transparent rounded iconOnly={<FontAwesomeIcon icon={faPen} />}></Button>
            <Button
                className={cx('button')}
                transparent
                rounded
                iconOnly={<FontAwesomeIcon icon={faUserSlash} />}
            ></Button>
        </div>
    );
}

export default AccountMItem;
