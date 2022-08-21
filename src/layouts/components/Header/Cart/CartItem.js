import classNames from 'classnames/bind';
import styles from './Cart.module.scss';

import images from '~/assets/images';

const cx = classNames.bind(styles);

function CartItem() {
    return (
        <div>
            <li className={cx('cart-item')}>
                <div className={cx('cart-item-layout-img')}>
                    <img src={images.imgAccount} alt="" className={cx('cart-item-img')} />
                </div>
                <div className={cx('cart-item-info')}>
                    <div className={cx('cart-item-main-info')}>
                        <h5 className={cx('cart-item-name')}>App Store App Store App Store App Store App Store</h5>
                        <div className={cx('cart-item-total')}>
                            <span className={cx('cart-item-price')}>
                                999999999999999<span>$</span>
                            </span>
                            <span className={cx('cart-item-multiply')}>x</span>
                            <span className={cx('cart-item-amount')}>1</span>
                        </div>
                    </div>
                    <div className={cx('cart-item-extra-info')}>
                        <div className={cx('cart-item-desc')}>
                            The App Store gives people around the world a safe and trusted place to discover apps that
                            meet our high standards for privacy, security, and content.
                        </div>
                        <div className={cx('cart-item-clear')}>Xóa</div>
                    </div>
                </div>
            </li>
        </div>
    );
}

export default CartItem;
