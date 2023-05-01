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

    const getMyOrder = async () => {
        const access = JSON.parse(localStorage.getItem('access'));

        if (access) {
            let dataApi = await orderServices.getMyOrder(active);

            if (dataApi?.content) {
                setOrders(dataApi.content);
            } else setOrders([]);
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
            <div className={cx('title')}>
                <p>Đơn hàng của bạn</p>
            </div>
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
                            <div className={cx('product--list')}>
                                <span className={cx('title')}>Danh sách sản phẩm</span>
                                {detailOrder.OrderDetails.map((product) => (
                                    <div className={cx('product--item')} key={product.Id}>
                                        <div className={cx('layout-img')}>
                                            <img src={product.ImageUrl} alt="" className={cx('img')} />
                                        </div>
                                        <div className={cx('info')}>
                                            <h5 className={cx('name')}>{product.Name}</h5>
                                            <div className={cx('total')}>
                                                <span className={cx('price')}>
                                                    {product.Price}
                                                    <span>$</span>
                                                </span>
                                                <span className={cx('multiply')}>x</span>
                                                <span className={cx('amount')}>{product.Quantity}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className={cx('payment')}>
                                Phương thức thanh toán :{' '}
                                <span className={cx('value')}>{detailOrder.PaymentMethod.name}</span>
                            </div>
                            <div className={cx('ship')}>
                                Cách thức vận chuyển :{' '}
                                <span className={cx('value')}>
                                    {detailOrder.Ship.name} - {detailOrder.Ship.price}
                                </span>
                            </div>
                            <div className={cx('total-order')}>
                                Tổng giá trị đơn hàng :{' '}
                                <span className={cx('value')}>
                                    {getTotalPrice()} {'₫'}
                                </span>
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
                                {detailOrder.OrderStatus.id === 1 || detailOrder.OrderStatus.id === 2 ? (
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
                                ) : (
                                    <Button outline border approach disable>
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
