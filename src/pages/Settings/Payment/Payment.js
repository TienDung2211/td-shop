import classNames from 'classnames/bind';
import styles from './Payment.module.scss';
import images from '~/assets/images';
import Button from '~/components/Button';
import { useState } from 'react';

const cx = classNames.bind(styles);

function Payment() {
    const [view, setView] = useState(true);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>
                <p>Tài khoản thanh toán của bạn</p>
            </div>
            {view ? (
                <div>
                    <div className={cx('momo')}>
                        <img src={images.imgMomo} alt="Momo" className={cx('image')} />
                        <div className={cx('info')}>
                            <p className={cx('info-name')}>TRAN TIEN DUNG</p>
                            <p className={cx('info-stk')}>0123456789</p>
                        </div>
                    </div>
                    <div className={cx('button-layout-view')}>
                        <Button outline border onClick={() => setView(!view)}>
                            Chỉnh sửa
                        </Button>
                    </div>
                </div>
            ) : (
                <form>
                    <div className={cx('group-item')}>
                        <div className={cx('label-item')}>Số tài khoản</div>
                        <input className={cx('input-item')} type="text" name="username" id="username" />
                    </div>
                    <div className={cx('group-item')}>
                        <div className={cx('label-item')}>Mật khẩu</div>
                        <input className={cx('input-item')} type="password" name="password" id="password" />
                    </div>
                    <div className={cx('button-layout-update')}>
                        <Button outline border primary onClick={() => setView(!view)}>
                            Xác nhận
                        </Button>
                        <Button outline border onClick={() => setView(!view)}>
                            Hủy
                        </Button>
                    </div>
                </form>
            )}
        </div>
    );
}

export default Payment;
