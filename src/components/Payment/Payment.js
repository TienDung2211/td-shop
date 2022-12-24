import classNames from 'classnames/bind';
import styles from './Payment.module.scss';

import { useEffect, useState } from 'react';
import HeadlessTippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import images from '~/assets/images';
import Button from '~/components/Button';
import userServices from '~/services/userServices';
import Select from 'react-select';

const options = [
    { value: 'Thủ đức, TP.Hồ Chí Minh', label: 1 },
    { value: 'Thành phố Buôn Ma Thuột, Đắk Lắk', label: 2 },
    { value: 'Đà Nẵng', label: 3 },
];

const cx = classNames.bind(styles);

function Payment({ data, clickBack, clickPay }) {
    const [showMethod, setShowMethod] = useState(false);
    const [user, setUser] = useState({});

    const handleChange = (selectedOption) => {
        console.log(`Option selected:`, selectedOption);
    };

    const getUserInfo = async () => {
        const access = JSON.parse(localStorage.getItem('access'));

        if (access) {
            let dataApi = await userServices.getUser();

            if (dataApi?.data) {
                setUser(dataApi.data);
            }
        } else {
            setUser(null);
        }
    };

    const getTotalOrder = () => {
        let total = 0;
        data.forEach((item) => {
            total = total + item?.Quantity * item?.Product.Price;
        });

        return total;
    };

    useEffect(() => {
        getUserInfo();
    }, []);

    return (
        <div className={cx('wrapper')} onClick={(e) => e.stopPropagation()}>
            <div className={cx('header')}>
                <h3 className={cx('heading')}>Thanh toán</h3>
            </div>
            <div className={cx('grid-row')}>
                <div className={cx('grid-column-50percent')}>
                    <div className={cx('list')}>
                        {data.map((item) => {
                            return (
                                <div key={item.id} className={cx('item')}>
                                    <div className={cx('item-layout-img')}>
                                        <img src={item.Product.ImageUrl} alt="" className={cx('item-img')} />
                                    </div>
                                    <div className={cx('item-info')}>
                                        <div className={cx('item-info')}>
                                            <h5 className={cx('item-name')}>{item.Product.Name}</h5>
                                            <div className={cx('item-total')}>
                                                <span className={cx('item-price')}>
                                                    {item.Product.Price}
                                                    <span>$</span>
                                                </span>
                                                <span className={cx('item-amount')}>x {item.Quantity}</span>
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
                        <span className={cx('value')}>
                            {user.LastName} {user.FirstName}
                        </span>
                    </div>
                    <div className={cx('phone')}>
                        <span className={cx('lable')}>SĐT</span>
                        <span className={cx('value')}>{user.Phone}</span>
                    </div>
                    <div className={cx('address')}>
                        <span className={cx('lable')}>Địa chỉ</span>
                        <div className={cx('custom-select')}>
                            <Select options={options} onChange={handleChange} />
                        </div>
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
                    {/* <div className={cx('discount')}>
                        <div className={cx('discount-code')}>
                            Mã giảm giá : <span className={cx('discount-code-primary')}>ABCD</span>
                        </div>
                        <div className={cx('discount-value')}>
                            <span className={cx('discount-value-primary')}>- 10000000 ₫</span>
                        </div>
                    </div> */}
                    <div className={cx('price')}>
                        Tổng giá : <span className={cx('price-value')}>{getTotalOrder()} ₫</span>
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
