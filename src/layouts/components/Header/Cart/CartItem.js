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
                <div className={cx('layout-img')}>
                    <img src={data?.Product?.ImageUrl} alt="" className={cx('img')} />
                </div>
                <div className={cx('info')}>
                    <h5 className={cx('name')}>{data?.Product?.Name}</h5>
                    <div className={cx('other')}>
                        <div className={cx('total')}>
                            <span className={cx('price')}>
                                {data?.Product?.Price}
                                <span>₫</span>
                            </span>
                            <span className={cx('multiply')}>x</span>
                            <span className={cx('amount')}>{data?.Quantity}</span>
                        </div>
                        <div
                            className={cx('clear')}
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
