import classNames from 'classnames/bind';
import styles from './Settings.module.scss';

import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const controls = [
    {
        id: 0,
        name: 'Hồ sơ',
        key: 'profile',
    },
    {
        id: 1,
        name: 'Địa chỉ',
        key: 'address',
    },
    {
        id: 2,
        name: 'Đơn hàng',
        key: 'order',
    },
];

function Settings() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('grid-full-width')}>
                <div className={cx('control-list')}>
                    {controls.map((control) => {
                        return (
                            <Link to={'/setting/' + control.key} className={cx('control-item')} key={control.id}>
                                {control.name}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Settings;
