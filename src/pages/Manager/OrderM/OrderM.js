import classNames from 'classnames/bind';
import styles from './OrderM.module.scss';

import OrderMItem from './OrderMItem';

import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

import HeadlessTippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

const orders = [
    {
        lname: 'Trần',
        fname: 'Tiến Dũng',
        nameProduct: 'Laptop Acer',
        phone: '0123456789',
        address: 'd@g.com',
        price: '9999999999',
        quantity: 1,
        status: 'Đã đặt hàng',
    },
    {
        lname: 'Trần',
        fname: 'Tiến Đạt',
        phone: '0123456789',
        address: 'd@g.com',
        nameProduct: 'Laptop Acer',
        price: '9999999999',
        quantity: 2,
        status: 'Đã đặt hàng',
    },
    {
        lname: 'Trần',
        fname: 'Tiến Dũng',
        phone: '0123456789',
        address: 'd@g.com',
        nameProduct: 'Laptop Acer',
        price: '9999999999',
        quantity: 1,
        status: 'Đã đặt hàng',
    },
    {
        lname: 'Trần',
        fname: 'Tiến Dũng',
        phone: '0123456789',
        address: 'd@g.com',
        nameProduct: 'Laptop Acer',
        price: '9999999999',
        quantity: 1,
        status: 'Đã đặt hàng',
    },
    {
        lname: 'Trần',
        fname: 'Tiến Dũng',
        phone: '0123456789',
        address: 'd@g.com',
        nameProduct: 'Laptop Acer',
        price: '9999999999',
        quantity: 1,
        status: 'Đã đặt hàng',
    },
    {
        lname: 'Trần',
        fname: 'Tiến Dũng',
        phone: '0123456789',
        address: 'd@g.com',
        nameProduct: 'Laptop Acer',
        price: '9999999999',
        quantity: 1,
        status: 'Đã đặt hàng',
    },
    {
        lname: 'Trần',
        fname: 'Tiến Dũng',
        phone: '0123456789',
        address: 'd@g.com',
        nameProduct: 'Laptop Acer',
        price: '9999999999',
        quantity: 1,
        status: 'Đã đặt hàng',
    },
    {
        lname: 'Trần',
        fname: 'Tiến Dũng',
        phone: '0123456789',
        address: 'd@g.com',
        nameProduct: 'Laptop Acer',
        price: '9999999999',
        quantity: 1,
        status: 'Đã đặt hàng',
    },
    {
        lname: 'Trần',
        fname: 'Tiến Dũng',
        phone: '0123456789',
        address: 'd@g.com',
        nameProduct: 'Laptop Acer',
        price: '9999999999',
        quantity: 1,
        status: 'Đã đặt hàng',
    },
    {
        lname: 'Trần',
        fname: 'Tiến Dũng',
        phone: '0123456789',
        address: 'd@g.com',
        nameProduct: 'Laptop Acer',
        price: '9999999999',
        quantity: 1,
        status: 'Đã đặt hàng',
    },
];

function OrderM() {
    const [showOptionsAccount, setShowOptionsAccount] = useState(false);

    const handleClick = () => {
        setShowOptionsAccount(!showOptionsAccount);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('control')}>
                <form className={cx('control-filt')}>
                    <div className={cx('options-layout')}>
                        <HeadlessTippy
                            interactive
                            visible={showOptionsAccount}
                            placement="bottom-start"
                            render={(attrs) => (
                                <div className={cx('options')} tabIndex="-1" {...attrs}>
                                    <PopperWrapper>
                                        <ul className={cx('options-list')}>
                                            <li className={cx('options-item', 'selection-item')}>
                                                <span>Tất cả</span>
                                            </li>
                                            <li className={cx('options-item')}>
                                                <span>Đã nhận đơn</span>
                                            </li>
                                            <li className={cx('options-item')}>
                                                <span>Đã đóng gói hàng</span>
                                            </li>
                                            <li className={cx('options-item')}>
                                                <span>Đang vận chuyển</span>
                                            </li>
                                            <li className={cx('options-item')}>
                                                <span>Đã nhận hàng</span>
                                            </li>
                                            <li className={cx('options-item')}>
                                                <span>Đã hủy</span>
                                            </li>
                                        </ul>
                                    </PopperWrapper>
                                </div>
                            )}
                        >
                            <div className={cx('label')}>
                                <span>Tình trạng đơn hàng</span>
                                <FontAwesomeIcon icon={faAngleDown} onClick={handleClick} />
                            </div>
                        </HeadlessTippy>
                    </div>

                    <div className={cx('input-layout')}>
                        <input className={cx('input')} type="text" placeholder="Nhập tên tìm kiếm"></input>
                    </div>

                    <div className={cx('button-layout')}>
                        <Button primary border>
                            Áp dụng
                        </Button>
                    </div>
                </form>
            </div>

            <div className={cx('results')}>
                {orders.map((order) => {
                    return <OrderMItem data={order} />;
                })}
            </div>
        </div>
    );
}

export default OrderM;
