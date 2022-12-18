import classNames from 'classnames/bind';
import styles from './Manager.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const controls = [
    {
        id: 0,
        name: 'Quản lí tài khoản',
        key: 'account',
    },
    {
        id: 1,
        name: 'Quản lí danh mục',
        key: 'category',
    },
    {
        id: 2,
        name: 'Quản lí sản phẩm',
        key: 'product',
    },
    {
        id: 3,
        name: 'Quản lí đơn hàng',
        key: 'order',
    },
    {
        id: 4,
        name: 'Quản lí khuyến mãi',
        key: 'sale',
    },
    {
        id: 5,
        name: 'Quản lí bình luận',
        key: 'comment',
    },
];

function Manager() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('grid-full-width')}>
                <div className={cx('control-list')}>
                    {controls.map((control) => {
                        return (
                            <Link to={'/manager/' + control.key} className={cx('control-item')} key={control.id}>
                                {control.name}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Manager;
