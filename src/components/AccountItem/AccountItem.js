import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './AccountItem.module.scss';
import images from '~/assets/images';

const cx = classNames.bind(styles);

function AccountItem({ data, nickname, full_name, avatar, tick }) {
    return (
        <Link to={`/@${nickname}`} className={cx('wrapper', 'item')}>
            <img
                className={cx('account-img')}
                src={avatar}
                onError={(e) => {
                    e.currentTarget.src = images.imgError;
                }}
                alt={full_name}
            ></img>
            <div className={cx('account-info')}>
                <h4 className={cx('account-info-username')}>
                    {nickname}
                    {tick && <FontAwesomeIcon icon={faCheckCircle} className={cx('check')} />}
                </h4>
                <h5 className={cx('account-info-name')}>{full_name}</h5>
            </div>
        </Link>
    );
}

export default AccountItem;
