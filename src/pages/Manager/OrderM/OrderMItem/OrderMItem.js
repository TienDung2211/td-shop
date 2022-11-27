import classNames from 'classnames/bind';
import styles from './OrderMItem.module.scss';
import { useState } from 'react';

import images from '~/assets/images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import HeadlessTippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '~/components/Popper';

import Button from '~/components/Button';

const cx = classNames.bind(styles);

function OrderMItem({ data }) {
    const [showOptionsAccount, setShowOptionsAccount] = useState(false);

    const handleClick = () => {
        setShowOptionsAccount(!showOptionsAccount);
    };

    return (
        <div className={cx('item')} onClick={handleClick}>
            <div className={cx('layout-img')}>
                <img src={images.imgAccount} alt="" className={cx('img')} />
            </div>
            <div className={cx('info')}>
                <div className={cx('customer-info')}>
                    <span className={cx('name')}>
                        {data.lname} {data.fname}
                    </span>
                    <span className={cx('phone')}>SĐT : {data.phone}</span>
                    <span className={cx('email')}>Địa chỉ : {data.address}</span>
                </div>
                <div className={cx('product-info')}>
                    <span className={cx('name')}>{data.nameProduct}</span>

                    <div className={cx('total')}>
                        <span className={cx('price')}>
                            {data.price}
                            <span>$</span>
                        </span>
                        <span className={cx('multiply')}> x </span>
                        <span className={cx('amount')}>{data.quantity}</span>
                    </div>
                </div>
            </div>
            <HeadlessTippy
                interactive
                visible={showOptionsAccount}
                placement="bottom-end"
                render={(attrs) => (
                    <div className={cx('options-layout')}>
                        <div className={cx('options')} tabIndex="-1" {...attrs}>
                            <PopperWrapper>
                                <ul className={cx('options-list')}>
                                    <li className={cx('options-item', 'selection-item')}>
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
                                        <span>Hủy đơn hàng</span>
                                    </li>
                                </ul>
                                <Button primary large>
                                    Xác nhận
                                </Button>
                            </PopperWrapper>
                        </div>
                    </div>
                )}
            >
                <div className={cx('status')}>
                    {data.status} <FontAwesomeIcon className={cx('icon-down')} icon={faAngleDown} />
                </div>
            </HeadlessTippy>
        </div>
    );
}

export default OrderMItem;
