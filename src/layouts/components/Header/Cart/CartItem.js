import classNames from 'classnames/bind';
import styles from './Cart.module.scss';

import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import cartServices from '~/services/cartServices';

const cx = classNames.bind(styles);

function CartItem({ data, onRemoveProduct }) {
    useEffect(() => {}, [data]);
    return (
        <Link to={`/detail-product/${data?.Product.Id}`}>
            <li className={cx('cart-item')}>
                <div className={cx('cart-item-layout-img')}>
                    <img src={data?.Product?.ImageUrl} alt="" className={cx('cart-item-img')} />
                </div>
                <div className={cx('cart-item-info')}>
                    <h5 className={cx('cart-item-name')}>{data?.Product?.Name}</h5>
                    <div className={cx('cart-item-order')}>
                        <div className={cx('cart-item-total')}>
                            <span className={cx('cart-item-price')}>
                                {data?.Product?.Price}
                                <span>₫</span>
                            </span>
                            <span className={cx('cart-item-multiply')}>x</span>
                            <span className={cx('cart-item-amount')}>{data?.Quantity}</span>
                        </div>
                        <div
                            className={cx('cart-item-clear')}
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                onRemoveProduct(data?.Product?.Id);
                            }}
                        >
                            Xóa
                        </div>
                    </div>
                </div>
            </li>
        </Link>
    );
}

export default CartItem;
