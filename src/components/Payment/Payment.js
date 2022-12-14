import classNames from 'classnames/bind';
import styles from './Payment.module.scss';
import 'react-toastify/dist/ReactToastify.css';

import { useEffect, useState, useContext } from 'react';
import Select from 'react-select';
import Button from '~/components/Button';
import userServices from '~/services/userServices';
import addressServices from '~/services/addressServices';
import orderServices from '~/services/orderService';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Payment({ data, clickBack, onPayment }) {
    const [user, setUser] = useState({});
    const [optionsAddress, setOptionsAddress] = useState([]);
    const [address, setAddress] = useState({});
    const [idAddress, setIdAddress] = useState(0);
    const [idPayment, setIdPayment] = useState(0);
    const [idShip, setIdShip] = useState(0);
    const [errMsg, setErrMsg] = useState('');

    const handleChangeAddress = (selectedOption) => {
        setAddress(selectedOption);
        setIdAddress(selectedOption.label?.Id);
    };
    const handleChangeShip = (selectedOption) => {
        setIdShip(selectedOption.label);
    };
    const handleChangePayment = (selectedOption) => {
        setIdPayment(selectedOption.label);
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

    const getAddress = async () => {
        const api = await addressServices.getMyAddress();

        if (api.status === 200) {
            var options = [];
            api.data.forEach((item) => {
                options.push({ label: item, value: item.AddressDetail });
                if (item.IsDefault === true) {
                    setAddress({ label: item, value: item.AddressDetail });
                    setIdAddress(item.Id);
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

        console.log(products);

        return products;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const products = getProducts();
            if (products.length < 1) {
                setErrMsg('Vui l??ng ch???n s???n ph???m');
                return;
            }
            if (idAddress === 0) {
                setErrMsg('Vui l??ng ch???n ?????a ch???');
                return;
            }
            if (idPayment === 0) {
                setErrMsg('Vui l??ng ch???n h??nh th???c thanh to??n');
                return;
            }
            if (idShip === 0) {
                setErrMsg('Vui l??ng ch???n h??nh th???c v???n chuy???n');
                return;
            }
            const data = {
                Products: products,
                PaymentMethod: idPayment,
                Ship: idShip,
                Address: idAddress,
            };

            let api = await orderServices.addOrder(data);

            console.log(api);

            if (api.status === 200) {
                onPayment();
            } else {
                setErrMsg('L???i kh??ng x??c ?????nh, vui l??ng th??? l???i.');
                toast.error('L???i kh??ng x??c ?????nh, vui l??ng th??? l???i.', {
                    position: toast.POSITION.TOP_RIGHT,
                    className: 'toast-message',
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getUserInfo();
        getAddress();
    }, [errMsg]);

    return (
        <form onSubmit={handleSubmit} className={cx('wrapper')} onClick={(e) => e.stopPropagation()}>
            <div className={cx('header')}>
                <h3 className={cx('heading')}>Thanh to??n</h3>
            </div>
            <div className={cx('grid-row')}>
                <div className={cx('grid-column-50percent')}>
                    <div className={cx('list')}>
                        {data.map((item, index) => {
                            return (
                                <div key={index} className={cx('item')}>
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
                {user ? (
                    <div className={cx('grid-column-50percent', 'info-layout')}>
                        <div className={cx('group')}>
                            <span className={cx('error-msg')}>{errMsg}</span>{' '}
                        </div>
                        <div className={cx('full-name')}>
                            <span className={cx('lable')}>H??? t??n</span>
                            <span className={cx('value')}>
                                {user.LastName} {user.FirstName}
                            </span>
                        </div>
                        <div className={cx('phone')}>
                            <span className={cx('lable')}>S??T</span>
                            <span className={cx('value')}>{user.Phone}</span>
                        </div>
                        <div className={cx('address')}>
                            <span className={cx('lable')}>?????a ch???</span>
                            {optionsAddress.length > 0 ? (
                                <div className={cx('custom-select')}>
                                    <Select
                                        formatOptionLabel={(option) => `${option.value}`}
                                        value={address}
                                        placeholder="Ch???n ?????a ch???..."
                                        onChange={handleChangeAddress}
                                        options={optionsAddress}
                                    />
                                </div>
                            ) : (
                                <span className={cx('value')}>
                                    <Link to={'/setting/address'}>
                                        Vui l??ng c???p nh???p ?????a ch??? t???i <span className={cx('active')}>????y</span>
                                    </Link>
                                </span>
                            )}
                        </div>
                        <div className={cx('address')}>
                            <span className={cx('lable')}>Thanh to??n</span>
                            <div className={cx('custom-select')}>
                                <Select
                                    formatOptionLabel={(option) => `${option.value}`}
                                    placeholder="Ch???n h??nh th???c thanh to??n"
                                    onChange={handleChangePayment}
                                    options={[
                                        { value: 'Thanh to??n ti???n m???t khi nh???n h??ng', label: 1 },
                                        { value: 'Thanh to??n b???ng v?? MoMo', label: 2 },
                                        { value: 'Thanh to??n b???ng VNPAY', label: 3 },
                                    ]}
                                />
                            </div>
                        </div>
                        <div className={cx('address')}>
                            <span className={cx('lable')}>V???n chuy???n</span>
                            <div className={cx('custom-select')}>
                                <Select
                                    formatOptionLabel={(option) => `${option.value}`}
                                    placeholder="Ch???n h??nh th???c v???n chuy???n"
                                    onChange={handleChangeShip}
                                    options={[
                                        { value: 'Giao h??ng nhanh - 20000???', label: 1 },
                                        { value: 'Giao h??ng ti???t ki???m - 10000???', label: 2 },
                                    ]}
                                />
                            </div>
                        </div>

                        <div className={cx('price')}>
                            <span className={cx('lable')}>T???ng gi??</span>
                            <span className={cx('value')}> {getTotalOrder()} ???</span>
                        </div>
                    </div>
                ) : (
                    <div className={cx('grid-column-50percent', 'info-layout')}>
                        <span className={cx('no-user')}>Vui l??ng ????ng nh???p ????? ti???p t???c</span>
                    </div>
                )}
            </div>
            <div className={cx('footer')}>
                <div className={cx('cancel-btn-layout')}>
                    <Button transparent border onClick={clickBack}>
                        H???y
                    </Button>
                </div>
                <div className={cx('pay-btn-layout')}>
                    <Button large primary border type="submit">
                        Thanh to??n
                    </Button>
                </div>
            </div>
            <ToastContainer />
        </form>
    );
}

export default Payment;

{
    /* <div className={cx('discount')}>
    <div className={cx('discount-code')}>
        M?? gi???m gi?? : <span className={cx('discount-code-primary')}>ABCD</span>
    </div>
    <div className={cx('discount-value')}>
        <span className={cx('discount-value-primary')}>- 10000000 ???</span>
    </div>
</div> */
}
