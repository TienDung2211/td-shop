import classNames from 'classnames/bind';
import styles from './OrderMItem.module.scss';

import Select from 'react-select';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

const optionsStatus = [
    { value: 'Chờ thanh toán', label: 1 },
    { value: 'Đang xử lý', label: 2 },
    { value: 'Đang vận chuyển', label: 3 },
    { value: 'Đã giao', label: 4 },
    { value: 'Đã hủy', label: 5 },
];

function OrderMItem({ data, onViewDetail, onChangeStatus }) {
    const [status, setStatus] = useState({});
    const [idStatus, setIdStatus] = useState(1);

    const getStatus = () => {
        optionsStatus.forEach((item) => {
            if (data.OrderStatus.id === item.label) {
                setIdStatus(item.label);
                setStatus(item);
            }
        });
    };

    const getTotalPrice = () => {
        let total = 0;
        data.OrderDetails.forEach((product) => {
            total = total + Number(product?.FinalPrice);
        });

        total = total + data?.Ship?.price;

        return total;
    };

    useEffect(() => {
        getStatus();
    }, [idStatus, data]);

    return (
        <div className={cx('item')} onClick={onViewDetail}>
            <div className={cx('layout-img')}>
                <img src={data.OrderDetails[0].ImageUrl} alt="" className={cx('img')} />
            </div>
            <div className={cx('info')}>
                <div className={cx('customer-info')}>
                    <span className={cx('name')}>{data.Address.name}</span>
                    <span className={cx('phone')}>SĐT : {data.Address.phone}</span>
                    <span className={cx('email')}>Địa chỉ : {data.Address.addressDetail}</span>
                </div>
                <div className={cx('product-info')}>
                    <span className={cx('name')}>{data.OrderDetails.length} sản phẩm</span>

                    <div className={cx('total')}>
                        <span className={cx('price')}>
                            Tổng giá : {getTotalPrice()}
                            <span> ₫</span>
                        </span>
                    </div>
                </div>
            </div>
            <div className={cx('options-layout')} onClick={(e) => e.stopPropagation()}>
                <Select
                    formatOptionLabel={(option) => `${option.value}`}
                    value={status}
                    placeholder="Chọn tình trạng đơn hàng"
                    onChange={(option) => {
                        if (option.label !== idStatus) {
                            const result = onChangeStatus(data.Id, option.label);
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
    );
}

export default OrderMItem;
