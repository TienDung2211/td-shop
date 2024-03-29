import classNames from 'classnames/bind';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './Payment.module.scss';
import 'react-toastify/dist/ReactToastify.css';

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Button from '~/components/Button/Button';

const cx = classNames.bind(styles);

function PaymentFailure() {
    const { state } = useLocation();

    const data = state.data;

    useEffect(() => {}, []);

    return (
        <div className={cx('container')}>
            <div className={cx('row', 'mb-5')}>
                <div className={cx('failure-info')}>
                    <div className={cx('image-layout')}>
                        <img
                            className={cx('image')}
                            src="https://salt.tikicdn.com/ts/upload/5a/f7/f7/4ce925ffff6449700efdc46a98112f88.jpg"
                            alt="Ảnh thất bại"
                        />
                    </div>
                    <div className={cx('content')}>
                        <div className={cx('title')}>Thanh toán không thành công</div>
                        <div className={cx('error-block')}>
                            <span className={cx('generic')}>Thanh toán thất bại. </span>
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
                            <div className={cx('label')}>
                                {parseInt(data.amount).toLocaleString('vi-VN', {
                                    style: 'currency',
                                    currency: 'VND',
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('row', 'd-flex', 'justify-content-end', 'btn-layout')}>
                <div className={cx('col-6', 'col-sm-6', 'col-md-6', 'col-lg-4', 'col-xl-4')}>
                    <Button to={'/cart'} large border outline>
                        Giỏ hàng
                    </Button>
                </div>
                <div className={cx('col-6', 'col-sm-6', 'col-md-6', 'col-lg-4', 'col-xl-4')}>
                    <Button to={'/payment'} large primary border>
                        Thanh toán lại
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default PaymentFailure;
