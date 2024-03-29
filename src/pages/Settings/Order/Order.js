import classNames from 'classnames/bind';
import styles from './Order.module.scss';
import 'react-toastify/dist/ReactToastify.css';

import { useEffect, useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faImagePortrait, faPhoneSquare, faMapLocation } from '@fortawesome/free-solid-svg-icons';

import OrderItem from './OrderItem';
import Button from '~/components/Button';
import DataContext from '~/context/DataContext';
import orderServices from '~/services/orderService';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

const options = [
    { id: 0, value: 'Tất cả đơn' },
    { id: 1, value: 'Chờ thanh toán' },
    { id: 2, value: 'Đang xử lý' },
    { id: 3, value: 'Đang vận chuyển' },
    { id: 4, value: 'Đã nhận hàng' },
    { id: 5, value: 'Đã hủy' },
];

function Order() {
    const [orders, setOrders] = useState([]);
    const [viewDetail, setViewDetail] = useState(false);
    const [detailOrder, setDetailOrder] = useState(null);
    const [active, setActive] = useState(0);

    const { render } = useContext(DataContext);
    const [renderPage, setRenderPage] = useState(true);

    const navigate = useNavigate();

    const getMyOrder = async () => {
        const access = JSON.parse(localStorage.getItem('access'));

        if (access) {
            let dataApi = await orderServices.getMyOrder(active);

            if (dataApi?.content) {
                setOrders(dataApi.content);
            } else setOrders([]);
        }
    };

    const handleCancelOrder = async (id) => {
        let api = await orderServices.cancelOrder(id);

        if (api?.status === 200) {
            toast.success('Hủy đơn hàng thành công', {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-message',
            });
            setViewDetail(false);
            setRenderPage(!renderPage);
        } else {
            if (api.message === 'Only awaiting payment order can be canceled') {
                toast.info('Chỉ đơn hàng đang xử lý mới hủy đơn hàng được', {
                    position: toast.POSITION.TOP_RIGHT,
                    className: 'toast-message',
                });
            } else {
                toast.error('Hủy đơn hàng không thành công', {
                    position: toast.POSITION.TOP_RIGHT,
                    className: 'toast-message',
                });
            }
        }
    };

    const handleRePayment = async (id) => {
        const api = await orderServices.rePayment(id);
        console.log(api);
        if (api?.status === 200) {
            navigate('/payment/momo', { state: { data: api.data } });
        } else {
            toast.warning('Đơn hàng của bạn đã bị hủy do quá thời gian quy định.', {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-message',
            });
        }
    };

    const getTotalPrice = () => {
        let total = 0;
        detailOrder.OrderDetails.forEach((product) => {
            total = total + Number(product?.FinalPrice) * product?.Quantity;
        });

        total = total + detailOrder?.Ship?.price;

        return total;
    };

    useEffect(() => {
        getMyOrder();
    }, [render, active, renderPage]);

    return orders ? (
        <div className={cx('wrapper')}>
            {!viewDetail && (
                <div className={cx('title')}>
                    <p>Đơn hàng của bạn</p>
                </div>
            )}
            {!viewDetail && (
                <div className={cx('options')}>
                    {options.map((option, index) => {
                        if (active === index) {
                            return (
                                <div key={option.id} className={cx('option', 'active')}>
                                    {option.value}
                                </div>
                            );
                        } else {
                            return (
                                <div
                                    key={option.id}
                                    className={cx('option')}
                                    onClick={() => {
                                        setActive(option.id);
                                    }}
                                >
                                    {option.value}
                                </div>
                            );
                        }
                    })}
                </div>
            )}
            {viewDetail ? (
                <>
                    {detailOrder && (
                        <div className={cx('detail')}>
                            <span className={cx('title')}>Chi tiết đơn hàng</span>
                            <div className={cx('receiver-info')}>
                                <h5 className={cx('name')}>
                                    <FontAwesomeIcon icon={faImagePortrait} className={cx('icon', 'name-icon')} />
                                    <span className={cx('text')}>{detailOrder.Address.name}</span>
                                </h5>
                                <h5 className={cx('phone')}>
                                    <FontAwesomeIcon icon={faPhoneSquare} className={cx('icon', 'phone-icon')} />
                                    <span className={cx('text')}>{detailOrder.Address.phone}</span>
                                </h5>
                                <div className={cx('map')}>
                                    <FontAwesomeIcon icon={faMapLocation} className={cx('icon', 'map-icon')} />
                                    <span className={cx('text')}>
                                        {detailOrder.Address.wards.Name}, {detailOrder.Address.district.Name},{' '}
                                        {detailOrder.Address.province.Name}
                                    </span>
                                </div>
                                <h5 className={cx('address')}>
                                    <FontAwesomeIcon icon={faLocationDot} className={cx('icon', 'address-icon')} />
                                    <span className={cx('text')}>{detailOrder.Address.addressDetail}</span>
                                </h5>
                            </div>
                            <span className={cx('title2')}>Danh sách sản phẩm</span>
                            <div className={cx('product--list')}>
                                {detailOrder?.OrderDetails.map((product) => (
                                    <div className={cx('product--item')} key={product.Id}>
                                        <div className={cx('layout-img')}>
                                            <img src={product.ImageUrl} alt="" className={cx('img')} />
                                        </div>
                                        <div className={cx('info')}>
                                            <h5 className={cx('name')}>{product.Name}</h5>
                                            <div className={cx('total')}>
                                                <span className={cx('price')}>
                                                    {parseInt(product.Price).toLocaleString('vi-VN', {
                                                        style: 'currency',
                                                        currency: 'VND',
                                                    })}
                                                </span>
                                                <span className={cx('multiply')}>x</span>
                                                <span className={cx('amount')}>{product.Quantity}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <span className={cx('title2')}>Thông tin giao hàng</span>
                            <div className={cx('ship-order')}>
                                <div className={cx('item-ship')}>
                                    <span className={cx('label')}>Phương thức thanh toán </span>
                                    <span className={cx('value')}>{detailOrder?.PaymentMethod.name}</span>
                                </div>
                                <div className={cx('item-ship')}>
                                    <span className={cx('label')}>Đơn vị vận chuyển </span>
                                    <span className={cx('value')}>{detailOrder?.Ship.name}</span>
                                </div>
                                <div className={cx('item-ship')}>
                                    <span className={cx('label')}>Phí ship </span>
                                    <span className={cx('value')}>
                                        {parseInt(detailOrder?.Ship.price).toLocaleString('vi-VN', {
                                            style: 'currency',
                                            currency: 'VND',
                                        })}
                                    </span>
                                </div>
                                <div className={cx('item-ship')}>
                                    <span className={cx('label')}>Tổng giá trị đơn hàng </span>
                                    <span className={cx('value')}>
                                        {parseInt(getTotalPrice()).toLocaleString('vi-VN', {
                                            style: 'currency',
                                            currency: 'VND',
                                        })}
                                    </span>
                                </div>
                                {/* <div className={cx('item-ship')}>
                                    <span className={cx('label')}>Tình trạng đơn giao hàng </span>
                                    <span className={cx('value')}>{detailOrder?.ShipStatusDescription}</span>
                                </div> */}
                            </div>
                            <div className={cx('status-detail')}>
                                Tình trạng đơn hàng :{' '}
                                <span className={cx('value')}>{detailOrder.OrderStatus.name}</span>
                            </div>
                            <div className={cx('button-layout')}>
                                <Button
                                    outline
                                    border
                                    transparent
                                    onClick={() => {
                                        setViewDetail(false);
                                    }}
                                >
                                    Quay lại
                                </Button>
                                {detailOrder.OrderStatus.id === 1 && (
                                    <Button
                                        outline
                                        border
                                        primary
                                        onClick={() => {
                                            handleRePayment(detailOrder.Id);
                                        }}
                                    >
                                        Thanh toán
                                    </Button>
                                )}
                                {(detailOrder.OrderStatus.id === 1 || detailOrder.OrderStatus.id === 2) && (
                                    <Button
                                        outline
                                        border
                                        approach
                                        onClick={() => {
                                            handleCancelOrder(detailOrder.Id);
                                        }}
                                    >
                                        Hủy đơn hàng
                                    </Button>
                                )}
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <>
                    {orders.length > 0 ? (
                        <div className={cx('results')}>
                            {orders.map((order) => {
                                return (
                                    <OrderItem
                                        key={order.Id}
                                        data={order}
                                        onClickViewDetail={() => {
                                            setViewDetail(true);
                                            setDetailOrder(order);
                                        }}
                                    />
                                );
                            })}
                        </div>
                    ) : (
                        <span className={cx('no-order')}>Không có đơn hàng nào.</span>
                    )}
                </>
            )}
            <ToastContainer />
        </div>
    ) : null;
}

export default Order;
