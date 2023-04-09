import classNames from 'classnames/bind';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './Payment.module.scss';
import 'react-toastify/dist/ReactToastify.css';

import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import Button from '~/components/Button/Button';

const cx = classNames.bind(styles);

function PaymentFailure() {
    const { state } = useLocation();

    const data = state.data;

    useEffect(() => {}, []);

    return (
        <div className={cx('container')}>
            <div className={cx('row')}>
                <div className={cx('failure-info')}>
                    <div className={cx('image-layout')}>
                        <img
                            className={cx('image')}
                            src="https://salt.tikicdn.com/ts/upload/5a/f7/f7/4ce925ffff6449700efdc46a98112f88.jpg"
                        />
                    </div>
                    <div className={cx('content')}>
                        <div className={cx('title')}>Thanh toán không thành công</div>
                        <div className={cx('error-block')}>
                            <span className={cx('generic')}>Thanh toán thất bại.</span>
                            <span className={cx('spec')}>
                                Vui lòng thanh toán lại hoặc chọn phương thức thanh toán khác
                            </span>
                        </div>
                        <div className={cx('order-info')}>
                            <div className={cx('label')}>Mã đơn hàng</div>
                            <div className={cx('label')}>{data?.orderId}</div>
                        </div>
                        <div className={cx('order-info')}>
                            <div className={cx('label')}>Phương thức thanh toán</div>
                            <div className={cx('label')}>
                                {data?.idPayment === 1 ? 'Thanh toán bằng tiền mặt' : 'Thanh toán qua Momo'}
                            </div>
                        </div>
                        <div className={cx('order-info')}>
                            <div className={cx('label')}>Tổng tiền</div>
                            <div className={cx('label')}>{data.amount * 100} ₫</div>
                        </div>
                        <div className={cx('btn-layout')}>
                            <Button to={'/cart'} className={cx('btn')} large primary border>
                                Giỏ hàng
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PaymentFailure;
