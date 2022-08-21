import classNames from 'classnames/bind';
import styles from './Payment.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import HeadlessTippy from '@tippyjs/react/headless';
import { useState } from 'react';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import images from '~/assets/images';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

const dataCart = [
    {
        id: 0,
        name: 'Laptop Lenovo Ideapad Slim 5 15ITL05 82FG01HPVN (15.6" Intel Core i5-1135G7/16GB/512GB SSD/Windows 11 Home SL/1.7kg)',
        price: 17490000,
        amount: 1,
        image: 'https://lh3.googleusercontent.com/iPsbVuP_Dxz5k5IeS0uwyRzZ4YA2Vw4vDt_OraOmvpKGTVBKFXPNqJthrn-PPTTr1E5BaeYAFdZj_Gfjq-3WJxAx-WtecXiR=w500-rw',
    },
    {
        id: 1,
        name: 'Laptop ACER Spin 5 SP513-52N-556V NX.GR7SV.004 (13.3" Full HD/Intel Core i5-8250U/8GB/256GB SSD/Windows 10 Home SL 64-bit/1.5kg)',
        price: 21499000,
        amount: 1,
        image: 'https://lh3.googleusercontent.com/eSTPgChkodGi0H_f0Qp6bvPGDejkhMJTvpmNR-doH0qdNBrFXGcbft7N_BJxoKcfoZ_r1U8M9CcX-Ms9Yw=w500-rw',
    },
    {
        id: 2,
        name: 'Cáp chuyển đổi Type C sang USB Type B Unitek YC474BK',
        price: 132000,
        amount: 3,
        image: 'https://lh3.googleusercontent.com/eE4-ROdHcNqz3VWepK8O9j9SYNHaN_5zegAFxmSPUhIuno0QqX5-iTA6SMkJSUEu82bHr2L0tAG2kldrWKQ=w500-rw',
    },
    {
        id: 3,
        name: 'Tai nghe Bluetooth True Wireless Soundpeats T2 (Đen)',
        price: 1349000,
        amount: 1,
        image: 'https://lh3.googleusercontent.com/jf9IxHr4omwRVLO_plUvwEZqlCeXuDnKhIZZcepDzu8_OaiPPDI5NGJ_LGFKKEupuCkK6lNqdzahijstSpnmr6VgqOZ6e1o=w500-rw',
    },
    {
        id: 4,
        name: 'Laptop ACER Nitro 5 AN515-45-R9SC NH.QBRSV.001 (15.6" Full HD/ 144Hz/Ryzen 7 5800H/8GB/512GB SSD/NVIDIA GeForce RTX 3070/Windows 10 Home 64-bit/2.2kg)',
        price: 36990000,
        amount: 1,
        image: 'https://lh3.googleusercontent.com/c8lEMABOL3Q8i2NxuiK306ID3gnSts2d7h67L-vOfU92Mv0neVYVDGh36vFfQNM3rMG8AM48hwVCjIGqi-NwO1p8nHJ6vb9w=w500-rw',
    },
];

function Payment({ clickBack, clickPay }) {
    const [showMethod, setShowMethod] = useState(false);

    return (
        <div className={cx('wrapper')} onClick={(e) => e.stopPropagation()}>
            <div className={cx('header')}>
                <h3 className={cx('heading')}>Thanh toán</h3>
            </div>
            <div className={cx('grid-row')}>
                <div className={cx('grid-column-50percent')}>
                    <div className={cx('list')}>
                        {dataCart.map((data) => {
                            return (
                                <div key={data.id} className={cx('item')}>
                                    <div className={cx('item-layout-img')}>
                                        <img src={data.image} alt="" className={cx('item-img')} />
                                    </div>
                                    <div className={cx('item-info')}>
                                        <div className={cx('item-info')}>
                                            <h5 className={cx('item-name')}>{data.name}</h5>
                                            <div className={cx('item-total')}>
                                                <span className={cx('item-price')}>
                                                    {data.price}
                                                    <span>$</span>
                                                </span>
                                                <span className={cx('item-amount')}>x {data.amount}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className={cx('grid-column-50percent', 'info-layout')}>
                    <div className={cx('full-name')}>
                        <span className={cx('lable')}>Họ tên</span>
                        <span className={cx('value')}>Trần Tiến Dũng</span>
                    </div>
                    <div className={cx('phone')}>
                        <span className={cx('lable')}>SĐT</span>
                        <span className={cx('value')}>0123xxxxxx</span>
                    </div>
                    <div className={cx('address')}>
                        <span className={cx('lable')}>Địa chỉ</span>
                        <span className={cx('value')}>Thủ Đức, TP Hồ Chí Minh</span>
                    </div>
                    <div className={cx('payment-method')}>
                        <HeadlessTippy
                            interactive
                            visible={showMethod}
                            placement="bottom-start"
                            render={(attrs) => (
                                <div className={cx('payment-method-layout')} tabIndex="-1" {...attrs}>
                                    <PopperWrapper>
                                        <ul className={cx('payment-method-list')}>
                                            <li className={cx('payment-method-item', 'selection-item')}>
                                                <img src={images.imgHome} alt="Home" className={cx('image')} />
                                                <label className={cx('lable')}>Thanh toán khi nhận hàng</label>
                                            </li>
                                            <li className={cx('payment-method-item')}>
                                                <img src={images.imgMomo} alt="Momo" className={cx('image')} />
                                                <label className={cx('lable')}>Thanh toán qua Momo</label>
                                            </li>
                                            <li className={cx('payment-method-item')}>
                                                <img src={images.imgBank} alt="Bank" className={cx('image')} />
                                                <label className={cx('lable')}>Thanh toán qua ngân hàng</label>
                                            </li>
                                        </ul>
                                    </PopperWrapper>
                                </div>
                            )}
                        >
                            <div className={cx('text-layout')} onClick={() => setShowMethod(!showMethod)}>
                                <span className={cx('text')}>Chọn phương thức thanh toán</span>
                                <FontAwesomeIcon icon={faAngleDown} />
                            </div>
                        </HeadlessTippy>
                    </div>
                    <div className={cx('discount')}>
                        <div className={cx('discount-code')}>
                            Mã giảm giá : <span className={cx('discount-code-primary')}>ABCD</span>
                        </div>
                        <div className={cx('discount-value')}>
                            <span className={cx('discount-value-primary')}>- 10000000 ₫</span>
                        </div>
                    </div>
                    <div className={cx('price')}>
                        Tổng giá : <span className={cx('price-value')}>99000000 ₫</span>
                    </div>
                </div>
            </div>
            <div className={cx('footer')}>
                <div className={cx('cancel-btn-layout')}>
                    <Button transparent border onClick={clickBack}>
                        Hủy
                    </Button>
                </div>
                <div className={cx('pay-btn-layout')} onClick={clickPay}>
                    <Button large primary border>
                        Thanh toán
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Payment;
