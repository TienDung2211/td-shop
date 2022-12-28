import classNames from 'classnames/bind';
import styles from './AccountMItem.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserSlash, faPen } from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function AccountMItem({ data, onBanAccount }) {
    return (
        <div className={cx('account-layout')}>
            <div className={cx('info')}>
                <div className={cx('main-info')}>
                    <div className={cx('info-item')}>
                        Họ Tên : {data.LastName} {data.FirstName}
                    </div>
                    <div className={cx('info-item')}>{data.role.name}</div>
                </div>
                <div className={cx('info-item')}>SĐT : {data.Phone}</div>
                <div className={cx('info-item')}>Email : {data.Email}</div>
            </div>
            <Button className={cx('button')} transparent rounded iconOnly={<FontAwesomeIcon icon={faPen} />}></Button>
            <Button
                className={cx('button')}
                transparent
                rounded
                iconOnly={<FontAwesomeIcon icon={faUserSlash} />}
                onClick={onBanAccount}
            ></Button>
        </div>
    );
}

export default AccountMItem;
