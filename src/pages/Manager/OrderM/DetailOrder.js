import classNames from 'classnames/bind';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './OrderM.module.scss';

import Select from 'react-select';
import { useEffect, useState } from 'react';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faImagePortrait, faPhoneSquare, faMapLocation } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const optionsStatus = [
    { value: 'Chờ thanh toán', label: 1 },
    { value: 'Đang xử lý', label: 2 },
    { value: 'Đang vận chuyển', label: 3 },
    { value: 'Đã nhận hàng', label: 4 },
    { value: 'Đã hủy', label: 5 },
];

function DetailOrder({ detailOrder, onCancleViewDetail, onChangeStatus }) {
    const [status, setStatus] = useState({});
    const [idStatus, setIdStatus] = useState(1);

    const getStatus = () => {
        optionsStatus.forEach((item) => {
            if (detailOrder.OrderStatus.id === item.label) {
                setIdStatus(item.label);
                setStatus(item);
            }
        });
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
        getStatus();
    }, [idStatus, detailOrder]);

    return (
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
            <div className={cx('product--list')}>
                <span className={cx('title')}>Danh sách sản phẩm</span>
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
            <div className={cx('payment')}>
                Phương thức thanh toán : <span className={cx('value')}>{detailOrder?.PaymentMethod.name}</span>
            </div>
            <div className={cx('ship')}>
                Cách thức vận chuyển :{' '}
                <span className={cx('value')}>
                    {detailOrder?.Ship.name} - {detailOrder?.Ship.price}
                </span>
            </div>
            <div className={cx('total-order')}>
                Tổng giá trị đơn hàng :{' '}
                <span className={cx('value')}>
                    {getTotalPrice()} {'₫'}
                </span>
            </div>
            <div className={cx('status-detail')}>
                Tình trạng đơn hàng : <span className={cx('value')}>{detailOrder?.OrderStatus.name}</span>
            </div>
            <div className={cx('button-layout')}>
                <Button outline border transparent onClick={() => onCancleViewDetail()}>
                    Quay lại
                </Button>
                <div className={cx('options-layout')}>
                    <Select
                        formatOptionLabel={(option) => `${option.value}`}
                        value={status}
                        placeholder="Chọn tình trạng đơn hàng"
                        onChange={(option) => {
                            if (option.label !== idStatus) {
                                const result = onChangeStatus(detailOrder.Id, option.label);
                                if (result) {
                                    setIdStatus(option.label);
                                    setStatus(option);
                                }
                            }
                        }}
                        options={optionsStatus}
                    />
                </div>
            </div>
        </div>
    );
}

export default DetailOrder;
