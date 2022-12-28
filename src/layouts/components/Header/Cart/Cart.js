import HeadlessTippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';

import styles from './Cart.module.scss';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect, useContext } from 'react';

import CartItem from './CartItem';
import images from '~/assets/images';
import Button from '~/components/Button';
import DataContext from '~/context/DataContext';
import cartServices from '~/services/cartServices';

const cx = classNames.bind(styles);

function Cart() {
    const [products, setProducts] = useState([]);

    const { render, renderCart, setRenderCart } = useContext(DataContext);

    const removeCart = async (id) => {
        let api = await cartServices.removeCart(id);
        if (api?.status === 200) {
            setRenderCart(!renderCart);
        }
    };

    useEffect(() => {
        const fetchAPI = async () => {
            var dataAPI = await cartServices.getMyCart();
            if (dataAPI?.CartItems) {
                setProducts(dataAPI?.CartItems);
            } else setProducts([]);
        };
        fetchAPI();
    }, [render, renderCart]);
    return (
        <div>
            <HeadlessTippy
                interactive
                placement="bottom-end"
                render={(attrs) => (
                    <div className={cx('cart-wrapper')} tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                            <div className={cx('cart-popper')}>
                                {products.length > 0 ? (
                                    <div className={cx('cart-exists')}>
                                        <h3 className={cx('cart-heading')}>Sản phẩm đã thêm</h3>
                                        <div className={cx('cart-list')}>
                                            {products.map((item) => (
                                                <CartItem key={item.Id} data={item} onRemoveProduct={removeCart} />
                                            ))}
                                        </div>
                                        <div className={cx('cart-btn-all')}>
                                            <Button to="/cart" outline border primary>
                                                Xem tất cả
                                            </Button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className={cx('cart--empty')}>
                                        <img src={images.imgCartEmpty} alt="" className={cx('cart-img--empty')} />
                                        <span className={cx('cart-text--empty')}>Chưa có sản phẩm</span>
                                    </div>
                                )}
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
