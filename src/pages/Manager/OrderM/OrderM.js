import classNames from 'classnames/bind';
import styles from './OrderM.module.scss';
import 'react-toastify/dist/ReactToastify.css';

import Select from 'react-select';
import { useState, useContext, useEffect } from 'react';

import OrderMItem from './OrderMItem';
import Button from '~/components/Button';
import DataContext from '~/context/DataContext';
import orderServices from '~/services/orderService';
import { ToastContainer, toast } from 'react-toastify';

const cx = classNames.bind(styles);

function OrderM() {
    const [orders, setOrders] = useState([]);

    const { render, setRender } = useContext(DataContext);

    const getAllOrder = async () => {
        const access = JSON.parse(localStorage.getItem('access'));

        if (access) {
            let dataApi = await orderServices.getAllOrder();

            console.log(dataApi);

            if (dataApi?.content) {
                setOrders(dataApi.content);
            }
        }
    };

    useEffect(() => {
        getAllOrder();
    }, [render]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('control')}>
                <form className={cx('control-filt')}>
                    <div className={cx('options-layout')}>
                        <Select
                            formatOptionLabel={(option) => `${option.value}`}
                            placeholder="Chọn tình trạng đơn hàng"
                            // onChange={handleChangePayment}
                            options={[
                                { value: 'Tất cả đơn hàng', label: 0 },
                                { value: 'Chờ thanh toán', label: 1 },
                                { value: 'Đang xử lý', label: 2 },
                                { value: 'Đang vận chuyển', label: 3 },
                                { value: 'Đã nhận hàng', label: 4 },
                                { value: 'Đã hủy', label: 5 },
                            ]}
                        />
                    </div>

                    <div className={cx('input-layout')}>
                        <input className={cx('input')} type="text" placeholder="Nhập tên tìm kiếm"></input>
                    </div>

                    <div className={cx('button-layout')}>
                        <Button primary border>
                            Áp dụng
                        </Button>
                    </div>
                </form>
            </div>

            <div className={cx('results')}>
                {orders.map((order) => {
                    return <OrderMItem data={order} />;
                })}
            </div>
        </div>
    );
}

export default OrderM;
