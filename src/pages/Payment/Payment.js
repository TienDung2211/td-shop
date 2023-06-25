import classNames from 'classnames/bind';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './Payment.module.scss';
import 'react-toastify/dist/ReactToastify.css';

import { useEffect, useState } from 'react';
import Select from 'react-select';
import Button from '~/components/Button';
import userServices from '~/services/userServices';
import addressServices from '~/services/addressServices';
import orderServices from '~/services/orderService';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function Payment(props) {
    const { state } = useLocation();

    const data = state.data;

    const [user, setUser] = useState({});
    const [address, setAddress] = useState({});
    const [optionsAddress, setOptionsAddress] = useState([]);
    const [ship, setShip] = useState({ value: 'Chọn đơn vị vận chuyển', label: 0 });
    const [optionsShip, setOptionsShip] = useState([
        { value: 'Giao hàng nhanh', label: 1 },
        { value: 'Lalamove', label: 3 },
    ]);
    const [payment, setPayment] = useState({ value: 'Chọn phương thức thanh toán', label: 0 });
    const [optionPayment, setOptionPayment] = useState([
        { value: 'Thanh toán tiền mặt khi nhận hàng', label: 1 },
        { value: 'Thanh toán bằng ví MoMo', label: 2 },
    ]);

    const [errMsg, setErrMsg] = useState('');

    const [shipFee, setShipFee] = useState('0');
    const [shipDeliveryTime, setShipDeliveryTime] = useState('0');

    const navigate = useNavigate();

    const handleChangeAddress = (selectedOption) => {
        setAddress(selectedOption);
        setShip({ value: 'Chọn đơn vị vận chuyển', label: 0 });
        setPayment({ value: 'Chọn phương thức thanh toán', label: 0 });
        if ([1, 31, 79].includes(selectedOption.label?.ProvinceId)) {
            setOptionsShip([
                { value: 'Giao hàng nhanh', label: 1 },
                { value: 'Lalamove', label: 3 },
            ]);
        } else {
            setOptionsShip([{ value: 'Giao hàng nhanh', label: 1 }]);
        }
    };
    const handleChangeShip = (selectedOption) => {
        setShip(selectedOption);
        setPayment({ value: 'Chọn phương thức thanh toán', label: 0 });
        if (selectedOption.label === 1 && getTotalOrder() <= 10000000) {
            setOptionPayment([
                { value: 'Thanh toán tiền mặt khi nhận hàng', label: 1 },
                { value: 'Thanh toán bằng ví MoMo', label: 2 },
            ]);
        } else {
            setOptionPayment([{ value: 'Thanh toán bằng ví MoMo', label: 2 }]);
        }
    };
    const handleChangePayment = (selectedOption) => {
        setPayment(selectedOption);
    };

    const getUserInfo = async () => {
        const access = JSON.parse(localStorage.getItem('access'));

        if (access) {
            let api = await userServices.getUser();

            if (api?.data) {
                setUser(api.data);
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
        total = total + shipFee;
        return total;
    };

    const getAddress = async () => {
        const api = await addressServices.getMyAddress();

        if (api.status === 200) {
            var options = [];
            api.data.forEach((item) => {
                options.push({ label: item, value: item.AddressDetail });
                if (item.IsDefault === true) {
                    setAddress({ label: item, value: item.AddressDetail });
                }
            });
            setOptionsAddress(options);
        }
    };

    const getProducts = () => {
        let products = [];

        data.forEach((item) => {
            products.push({ ProductId: item.Product.Id, Quantity: item.Quantity });
        });
        return products;
    };

    const getShipFee = async () => {
        const data = {
            Products: getProducts(),
            Ship: ship.label,
            Address: address.label.Id,
        };
        const api = await orderServices.getShipFee(ship.label, data);

        if (api?.status === 200) {
            setShipFee(api.data.total);
        }
    };

    const getShipDeliveryTime = async () => {
        const data = {
            Address: address.label.Id,
        };
        const api = await orderServices.getShipDeliveryTime(ship.label, data);

        if (api?.status === 200) {
            const dateString = api.data.deliveryTime;
            const date = new Date(dateString);

            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();

            const formattedDate = `${day}/${month}/${year}`;
            setShipDeliveryTime(formattedDate);
        }
    };

    const handlePayment = async () => {
        try {
            const products = getProducts();
            if (products.length < 1) {
                setErrMsg('Vui lòng chọn sản phẩm');
                return;
            }
            if (address.label.Id === 0) {
                setErrMsg('Vui lòng chọn địa chỉ');
                return;
            }
            if (payment.label === 0) {
                setErrMsg('Vui lòng chọn hình thức thanh toán');
                return;
            }
            if (ship.label === 0) {
                setErrMsg('Vui lòng chọn hình thức vận chuyển');
                return;
            }

            const data = {
                Products: products,
                PaymentMethod: payment.label,
                Ship: ship.label,
                Address: address.label.Id,
                ShipPrice: shipFee,
            };

            let api = await orderServices.addOrder(data);

            if (payment.label === 1) {
                if (api.status === 200) {
                    toast.success('Đơn đặt hàng của bạn được xác nhận đã thành công.', {
                        position: toast.POSITION.TOP_RIGHT,
                        className: 'toast-message',
                    });

                    var total = getTotalOrder();

                    const dataToSucess = {
                        amount: total / 100,
                        orderId: api.data.Id,
                        idPayment: 1,
                    };
                    navigate('/payment/sucess', { state: { data: dataToSucess } });
                } else {
                    setErrMsg('Lỗi không xác định, vui lòng thử lại.');
                    toast.error('Lỗi không xác định, vui lòng thử lại.', {
                        position: toast.POSITION.TOP_RIGHT,
                        className: 'toast-message',
                    });
                }
            } else if (payment.label === 2) {
                if (api.status === 200) {
                    navigate('/payment/momo', { state: { data: api.data } });
                } else {
                    setErrMsg('Lỗi không xác định, vui lòng thử lại.');
                    toast.error('Lỗi không xác định, vui lòng thử lại.', {
                        position: toast.POSITION.TOP_RIGHT,
                        className: 'toast-message',
                    });
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getUserInfo();
        getAddress();
    }, []);

    useEffect(() => {
        if (ship.label !== 0) {
            getShipFee();
            getShipDeliveryTime();
        }
    }, [ship.label]);

    return (
        <div className={cx('container')}>
            <div className={cx('row')}>
                <div className={cx('header')}>
                    <h3 className={cx('heading')}>Thông tin đơn hàng</h3>
                </div>
            </div>
            <div className={cx('row')}>
                <div className={cx('col-sm-6')}>
                    <div className={cx('list')}>
                        {data.map((item, index) => {
                            return (
                                <div key={index} className={cx('item')}>
                                    <div className={cx('item-layout-img')}>
                                        <img src={item.Product.ImageUrl} alt="" className={cx('item-img')} />
                                    </div>
                                    <div className={cx('item-info')}>
                                        <h5 className={cx('item-name')}>{item.Product.Name}</h5>
                                        <div className={cx('item-total')}>
                                            <span className={cx('item-price')}>
                                                {item.Product.Price}
                                                <span>₫</span>
                                            </span>
                                            <span className={cx('item-amount')}>x {item.Quantity}</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className={cx('col-sm-6')}>
                    {user ? (
                        <div className={cx('info-layout')}>
                            <div className={cx('group')}>
                                <span className={cx('error-msg')}>{errMsg}</span>{' '}
                            </div>
                            {/* <div className={cx('contact-info')}>
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
                            </div> */}
                            <div className={cx('select-layout')}>
                                <span className={cx('lable')}>Địa chỉ</span>
                                {optionsAddress.length > 0 ? (
                                    <div className={cx('custom-select')}>
                                        <Select
                                            formatOptionLabel={(option) => `${option.value}`}
                                            value={address}
                                            placeholder="Chọn địa chỉ..."
                                            onChange={handleChangeAddress}
                                            options={optionsAddress}
                                        />
                                    </div>
                                ) : (
                                    <span className={cx('value')}>
                                        <Link to={'/setting/address'}>
                                            Vui lòng cập nhập địa chỉ tại <span className={cx('active')}>đây</span>
                                        </Link>
                                    </span>
                                )}
                            </div>

                            <div className={cx('select-layout')}>
                                <span className={cx('lable')}>Vận chuyển</span>
                                <div className={cx('custom-select')}>
                                    <Select
                                        formatOptionLabel={(option) => `${option.value}`}
                                        placeholder="Chọn đơn vị vận chuyển"
                                        value={ship}
                                        onChange={handleChangeShip}
                                        options={optionsShip}
                                    />
                                </div>
                            </div>
                            {ship.label !== 0 && (
                                <div className={cx('ship-info')}>
                                    <div className={cx('space')}></div>
                                    <div className={cx('content')}>
                                        <div className={cx('ship-fee')}>
                                            Phí ship : <div className={cx('value')}>{shipFee}₫</div>
                                        </div>
                                        <div className={cx('ship-delivery-time')}>
                                            Thời gian giao hàng dự kiến :
                                            <div className={cx('value')}>{shipDeliveryTime}</div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className={cx('select-layout')}>
                                <span className={cx('lable')}>Thanh toán</span>
                                <div className={cx('custom-select')}>
                                    <Select
                                        formatOptionLabel={(option) => `${option.value}`}
                                        placeholder="Chọn hình thức thanh toán"
                                        value={payment}
                                        onChange={handleChangePayment}
                                        options={optionPayment}
                                    />
                                </div>
                            </div>

                            <div className={cx('price')}>
                                <span className={cx('lable')}>Tổng giá</span>
                                <span className={cx('value')}> {getTotalOrder()} ₫</span>
                            </div>
                        </div>
                    ) : (
                        <span className={cx('no-user')}>Vui lòng đăng nhập để tiếp tục</span>
                    )}
                </div>
            </div>
            <div className={cx('row')}>
                <div className={cx('pay-btn-layout')}>
                    <Button
                        large
                        primary
                        border
                        onClick={() => {
                            handlePayment();
                        }}
                        className={cx('pay-btn')}
                    >
                        Đặt hàng
                    </Button>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Payment;
