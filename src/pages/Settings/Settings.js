import classNames from 'classnames/bind';
import styles from './Settings.module.scss';

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
                            <a href={'/setting/' + control.key} className={cx('control-item')} key={control.id}>
                                {control.name}
                            </a>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Settings;
