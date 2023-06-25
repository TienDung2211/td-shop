import classNames from 'classnames/bind';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './OrderM.module.scss';

import Select from 'react-select';
import Button from '~/components/Button';
import DataContext from '~/context/DataContext';
import { useEffect, useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faImagePortrait, faPhoneSquare, faMapLocation } from '@fortawesome/free-solid-svg-icons';
import orderServices from '~/services/orderService';
import { ToastContainer, toast } from 'react-toastify';

const cx = classNames.bind(styles);

const optionsStatus = [
    { value: 'Chờ thanh toán', label: 1 },
    { value: 'Đang xử lý', label: 2 },
    { value: 'Đang vận chuyển', label: 3 },
    { value: 'Đã giao', label: 4 },
    { value: 'Đã hủy', label: 5 },
];

function DetailOrder({ idOrder, onCancleViewDetail, onChangeStatus }) {
    const [status, setStatus] = useState({});
    const [idStatus, setIdStatus] = useState(1);
    const [detailOrder, setDetailOrder] = useState(null);

    const [length, setLength] = useState(0);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [weight, setWeight] = useState(0);

    const [handle, setHandle] = useState('view');

    const { render, setRender } = useContext(DataContext);

    const getOrderById = async () => {
        const api = await orderServices.getOrderById(idOrder);
        console.log(api);

        if (api?.status === 200) {
            setDetailOrder(api.data.content[0]);

            optionsStatus.forEach((item) => {
                if (api.data.content[0].OrderStatus.id === item.label) {
                    setIdStatus(item.label);
                    setStatus(item);
                }
            });
        }
    };

    const handleChangeStatus = (selectOption) => {
        setIdStatus(selectOption.label);
        setStatus(selectOption);
    };

    const getTotalPrice = () => {
        let total = 0;
        detailOrder.OrderDetails.forEach((product) => {
            total = total + Number(product?.FinalPrice) * product?.Quantity;
        });

        total = total + detailOrder?.Ship?.price;

        return total;
    };

    const handleClickChangeStatus = () => {
        onChangeStatus(detailOrder.Id, idStatus);
    };

    const handleCreateShipOrder = async () => {
        const data = {
            orderId: detailOrder.Id,
            length: parseFloat(length),
            width: parseFloat(width),
            height: parseFloat(height),
            weight: parseFloat(weight),
        };
        const api = await orderServices.createShipOrder(detailOrder.Ship.id, data);

        if (api?.status === 200) {
            toast.success('Tạo đơn giao hàng thành công.', {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-message',
            });
            setRender(!render);
            setHandle('view');
        } else {
            toast.warning('Có lỗi xảy ra, vui lòng thử lại sau.', {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-message',
            });
        }
    };

    const handleCancleShipOrder = async () => {
        const data = {
            orderId: detailOrder.Id,
        };
        const api = await orderServices.cancleShipOrder(detailOrder.Ship.id, data);
        console.log(api);
        if (api?.status === 200) {
            toast.success('Hủy đơn giao hàng thành công.', {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-message',
            });
            setRender(!render);
        } else {
            toast.warning('Có lỗi xảy ra, vui lòng thử lại sau.', {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-message',
            });
        }
    };

    const handleCancleOrder = async () => {
        const api = await orderServices.cancelOrder(detailOrder.Id);
    };

    const renderButton = () => {
        if (handle === 'view') {
            if (
                ((detailOrder.Ship.id === 1 && ['not_created', 'cancel'].includes(detailOrder.ShipStatusCode)) ||
                    (detailOrder.Ship.id === 3 &&
                        ['NOT_CREATED', 'CANCELED', 'EXPIRED'].includes(detailOrder.ShipStatusCode))) &&
                detailOrder.OrderStatus.id === 2
            ) {
                return (
                    <div className={cx('button-layout')}>
                        <Button outline border transparent onClick={() => onCancleViewDetail()}>
                            Quay lại
                        </Button>
                        <Button primary border onClick={() => setHandle('create-order')}>
                            Tạo đơn giao
                        </Button>
                        <Button primary border onClick={() => {}}>
                            Hủy đơn hàng
                        </Button>
                        {/* <Button primary border onClick={() => setHandle('change-status')}>
                            Cập nhập
                        </Button> */}
                    </div>
                );
            } else if (
                ((detailOrder.Ship.id === 1 &&
                    ['ready_to_pick', 'money_collect_picking', 'picking'].includes(detailOrder.ShipStatusCode)) ||
                    (detailOrder.Ship.id === 3 && ['ASSIGNING_DRIVER'].includes(detailOrder.ShipStatusCode))) &&
                detailOrder.OrderStatus.id === 3
            ) {
                <div className={cx('button-layout')}>
                    <Button outline border transparent onClick={() => onCancleViewDetail()}>
                        Quay lại
                    </Button>
                    <Button primary border onClick={() => handleCancleShipOrder()}>
                        Hủy đơn giao
                    </Button>
                    {/* <Button primary border onClick={() => setHandle('change-status')}>
                        Cập nhập
                    </Button> */}
                </div>;
            } else {
                return (
                    <div className={cx('button-layout')}>
                        <Button outline border transparent onClick={() => onCancleViewDetail()}>
                            Quay lại
                        </Button>
                        {/* <Button primary border onClick={() => setHandle('change-status')}>
                            Cập nhập
                        </Button> */}
                    </div>
                );
            }
        } else if (handle === 'change-status') {
            return (
                <div className={cx('button-layout')}>
                    <Button outline border transparent onClick={() => setHandle('view')}>
                        Hủy
                    </Button>
                    <Button primary border onClick={() => handleClickChangeStatus()}>
                        Cập nhập
                    </Button>
                </div>
            );
        } else if (handle === 'create-order') {
            return (
                <div className={cx('button-layout')}>
                    <Button outline border transparent onClick={() => setHandle('view')}>
                        Hủy
                    </Button>
                    <Button primary border onClick={() => handleCreateShipOrder()}>
                        Xác nhận
                    </Button>
                </div>
            );
        }
    };

    useEffect(() => {
        getOrderById();
    }, [idOrder, render]);

    return detailOrder ? (
        <div className={cx('detail')}>
            <span className={cx('title')}>Chi tiết đơn hàng</span>
            <div className={cx('receiver-info')}>
                <h5 className={cx('name')}>
                    <FontAwesomeIcon icon={faImagePortrait} className={cx('icon', 'name-icon')} />
                    <span className={cx('text')}>{detailOrder?.Address.name}</span>
                </h5>
                <h5 className={cx('phone')}>
                    <FontAwesomeIcon icon={faPhoneSquare} className={cx('icon', 'phone-icon')} />
                    <span className={cx('text')}>{detailOrder?.Address.phone}</span>
                </h5>
                <div className={cx('map')}>
                    <FontAwesomeIcon icon={faMapLocation} className={cx('icon', 'map-icon')} />
                    <span className={cx('text')}>
                        {detailOrder?.Address.wards.Name}, {detailOrder?.Address.district.Name},{' '}
                        {detailOrder?.Address.province.Name}
                    </span>
                </div>
                <h5 className={cx('address')}>
                    <FontAwesomeIcon icon={faLocationDot} className={cx('icon', 'address-icon')} />
                    <span className={cx('text')}>{detailOrder?.Address.addressDetail}</span>
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
            <span className={cx('title2')}>Thông tin giao hàng</span>
            <div className={cx('ship-order')}>
                <div className={cx('label')}>
                    Phương thức thanh toán : <span className={cx('value')}>{detailOrder?.PaymentMethod.name}</span>
                </div>
                <div className={cx('label')}>
                    Đơn vị vận chuyển : <span className={cx('value')}>{detailOrder?.Ship.name}</span>
                </div>
                <div className={cx('label')}>
                    Phí ship :{' '}
                    <span className={cx('value')}>
                        {detailOrder?.Ship.price} {'₫'}
                    </span>
                </div>
                <div className={cx('label')}>
                    Tổng giá trị đơn hàng :{' '}
                    <span className={cx('value')}>
                        {getTotalPrice()} {'₫'}
                    </span>
                </div>
                <div className={cx('label')}>
                    Tình trạng đơn giao hàng : <span className={cx('value')}>{detailOrder?.ShipStatusDescription}</span>
                </div>
            </div>

            {(handle === 'view' || handle === 'create-order') && (
                <div className={cx('status-detail')}>
                    Tình trạng đơn hàng : <span className={cx('value')}>{status.value}</span>
                </div>
            )}
            {handle === 'change-status' && (
                <div className={cx('status-detail')}>
                    Tình trạng đơn hàng :{' '}
                    <div className={cx('value-select')}>
                        <Select
                            formatOptionLabel={(option) => `${option.value}`}
                            value={status}
                            placeholder="Chọn tình trạng đơn hàng"
                            onChange={handleChangeStatus}
                            options={optionsStatus}
                        />
                    </div>
                </div>
            )}
            {handle === 'create-order' && (
                <div className={cx('row')}>
                    <div className={cx('separation')}></div>
                    <div className={cx('group-item', 'col-xl-6', 'col-md-6', 'col-sm-12', 'mt-2')}>
                        <div className={cx('label-item')}>Chiều cao(cm) </div>
                        <input
                            className={cx('input-item')}
                            type="number"
                            required
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                        />
                    </div>
                    <div className={cx('group-item', 'col-xl-6', 'col-md-6', 'col-sm-12', 'mt-2')}>
                        <div className={cx('label-item')}>Chiều dài(cm) </div>
                        <input
                            className={cx('input-item')}
                            type="number"
                            required
                            value={length}
                            onChange={(e) => setLength(e.target.value)}
                        />
                    </div>
                    <div className={cx('group-item', 'col-xl-6', 'col-md-6', 'col-sm-12', 'mt-2')}>
                        <div className={cx('label-item')}>Chiều rộng(cm) </div>
                        <input
                            className={cx('input-item')}
                            type="number"
                            required
                            value={width}
                            onChange={(e) => setWidth(e.target.value)}
                        />
                    </div>
                    <div className={cx('group-item', 'col-xl-6', 'col-md-6', 'col-sm-12', 'mt-2')}>
                        <div className={cx('label-item')}>Cân nặng(kg) </div>
                        <input
                            className={cx('input-item')}
                            type="number"
                            required
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                        />
                    </div>
                </div>
            )}
            {renderButton()}
            <ToastContainer />
        </div>
    ) : null;
}

export default DetailOrder;
