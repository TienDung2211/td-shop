import classNames from 'classnames/bind';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './Payment.module.scss';
import 'react-toastify/dist/ReactToastify.css';

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Button from '~/components/Button/Button';

const cx = classNames.bind(styles);

function PaymentSucess() {
    const { state } = useLocation();

    const data = state.data;

    useEffect(() => {}, []);

    return (
        <div className={cx('container')}>
            <div className={cx('row', 'mb-5')}>
                <div className={cx('success-info')}>
                    <div className={cx('image-layout')}>
                        <img
                            className={cx('image')}
                            src="https://1.bp.blogspot.com/-cDTv91FdVm4/WDv2fOmF1CI/AAAAAAALljc/KE_mbzCayJ0TBViywHGXXnf7CH8EWIdEQCLcB/s1600/AS001654_17.gif"
                            alt="Ảnh thành công"
                        />
                    </div>
                    <div className={cx('content')}>
                        <div className={cx('title')}>Thanh toán thành công</div>
                        <div className={cx('sucess-block')}>
                            <span className={cx('generic')}>Thanh toán thành công. </span>
                            <span className={cx('spec')}>Have a nice day</span>
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
                            <div className={cx('label')}>{data.amount} ₫</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('row', 'd-flex', 'justify-content-end', 'single-btn-layout')}>
                <div className={cx('col-12', 'col-sm-9', 'col-md-6', 'col-lg-4', 'col-xl-4')}>
                    <Button to={'/cart'} large primary border>
                        Giỏ hàng
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default PaymentSucess;
