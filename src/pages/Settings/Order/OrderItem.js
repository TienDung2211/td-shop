import classNames from 'classnames/bind';
import styles from './Order.module.scss';

import images from '~/assets/images';

const cx = classNames.bind(styles);

function OrderItem({ data }) {
    return (
        <div className={cx('item')}>
            <div className={cx('layout-img')}>
                <img src={images.imgAccount} alt="" className={cx('img')} />
            </div>
            <div className={cx('info')}>
                <div className={cx('main-info')}>
                    <h5 className={cx('name')}>App Store App Store App Store App Store App Store</h5>
                    <div className={cx('total')}>
                        <span className={cx('price')}>
                            999999999999999<span>$</span>
                        </span>
                        <span className={cx('multiply')}>x</span>
                        <span className={cx('amount')}>1</span>
                    </div>
                </div>
                <div className={cx('extra-info')}>
                    <div className={cx('desc')}>
                        The App Store gives people around the world a safe and trusted place to discover apps that meet
                        our high standards for privacy, security, and content.
                    </div>
                </div>
            </div>
            <div className={cx('status')}>Đã nhận hàng</div>
        </div>
    );
}

export default OrderItem;
