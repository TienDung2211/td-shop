import classNames from 'classnames/bind';
import styles from './Cart.module.scss';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faTruckFast } from '@fortawesome/free-solid-svg-icons';

import Button from '~/components/Button';
import Modal from '~/components/Modal';
import Payment from '~/components/Payment';

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

function Cart() {
    const [showPayment, setShowPayment] = useState(false);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('grid-full-width')}>
                <div className={cx('grid-row')}>
                    <div className={cx('path')}>
                        <Button to="/" transparent>
                            Trang chủ
                        </Button>
                        <Button disable transparent iconOnly={<FontAwesomeIcon icon={faAngleRight} />}></Button>{' '}
                        <div className={cx('product-name')}>
                            <span>Giỏ hàng</span>
                        </div>
                    </div>
                </div>
                <div className={cx('grid-row', 'main-layout')}>
                    <div className={cx('grid-column-9')}>
                        <div className={cx('content')}>
                            <div className={cx('column-lable')}>
                                <div className={cx('grid-column-50percent')}>
                                    <div className={cx('select-all-layout')}>
                                        <input type="checkbox" className={cx('check-all')} />
                                        <div className={cx('select-all-lable')}>Chọn tất cả</div>
                                    </div>
                                </div>
                                <div className={cx('grid-column-10percent')}>Giá</div>
                                <div className={cx('grid-column-20percent', 'amount')}>Số lượng</div>
                                <div className={cx('grid-column-10percent')}>Số tiền</div>
                                <div className={cx('grid-column-10percent')}></div>
                            </div>
                            <div className={cx('cart-list')}>
                                {dataCart.map((data) => (
                                    <div key={data.id} className={cx('cart-item')}>
                                        <div className={cx('grid-column-50percent')}>
                                            <div className={cx('select-layout')}>
                                                <input type="checkbox" className={cx('check')} />
                                                <div className={cx('select-lable')}>
                                                    <img src={data.image} className={cx('select-image')} alt="Ảnh" />
                                                    <span className={cx('select-text')}>{data.name}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={cx('grid-column-10percent')}>
                                            {data.price}
                                            <span>₫</span>
                                        </div>
                                        <div className={cx('grid-column-20percent', 'amount-layout')}>
                                            <Button
                                                outline
                                                transparent
                                                iconOnly={<FontAwesomeIcon icon={faAngleLeft} />}
                                            />
                                            <span className={cx('amount-value')}>{data.amount}</span>
                                            <Button
                                                outline
                                                transparent
                                                iconOnly={<FontAwesomeIcon icon={faAngleRight} />}
                                            />
                                        </div>
                                        <div className={cx('grid-column-10percent')}>
                                            {data.price * data.amount}
                                            <span>₫</span>
                                        </div>
                                        <div className={cx('grid-column-10percent')}>
                                            <Button small transparent className={cx('delete-btn')}>
                                                Xóa
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className={cx('grid-column-3')}>
                        <div className={cx('pay')}>
                            <div className={cx('free-ship')}>
                                <FontAwesomeIcon icon={faTruckFast} className={cx('icon')} />
                                <span>Miễn phí giao hàng cho đơn hàng từ 800K</span>
                            </div>
                            <div className={cx('input-layout')}>
                                <input placeholder="Nhập mã giảm giá" className={cx('input-text')}></input>
                                <Button transparent small className={cx('apply-btn')}>
                                    Áp dụng
                                </Button>
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

                            <Button
                                large
                                primary
                                border
                                onClick={() => {
                                    setShowPayment(true);
                                }}
                            >
                                Thanh toán
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {showPayment && (
                <Modal closeModal={() => setShowPayment(false)}>
                    <Payment clickBack={() => setShowPayment(false)} clickPay={() => setShowPayment(false)} />
                </Modal>
            )}
        </div>
    );
}

export default Cart;
