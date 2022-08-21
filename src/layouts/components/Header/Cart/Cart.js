import HeadlessTippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import styles from './Cart.module.scss';
import CartItem from './CartItem';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function Cart() {
    return (
        <div>
            <HeadlessTippy
                interactive
                placement="bottom-end"
                render={(attrs) => (
                    <div className={cx('cart-wrapper')} tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                            <div className={cx('cart-popper')}>
                                {/* <div className={cx('cart--empty')}>
                                    <img src={images.imgCartEmpty} alt="" className={cx('cart-img--empty')} />
                                    <span className={cx('cart-text--empty')}>Chưa có sản phẩm</span>
                                </div> */}
                                <div className={cx('cart-exists')}>
                                    <h3 className={cx('cart-heading')}>Sản phẩm đã thêm</h3>
                                    <div className={cx('cart-list')}>
                                        <CartItem />
                                        <CartItem />
                                        <CartItem />
                                        <CartItem />
                                        <CartItem />
                                        <CartItem />
                                        <CartItem />
                                        <CartItem />
                                    </div>
                                    <div className={cx('cart-btn-all')}>
                                        <Button to="/cart" primary>
                                            Xem tất cả
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </PopperWrapper>
                    </div>
                )}
            >
                <div className={cx('icon-layout')}>
                    <Button
                        transparent
                        iconOnly={<FontAwesomeIcon icon={faCartShopping} className={cx('cart-icon')} />}
                    ></Button>
                </div>
            </HeadlessTippy>
        </div>
    );
}

export default Cart;
