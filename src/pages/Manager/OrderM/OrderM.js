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
    const [renderPage, setRenderPage] = useState(true);
    const [idStatus, setIdStatus] = useState(0);

    const { render } = useContext(DataContext);

    const getAllOrder = async () => {
        const access = JSON.parse(localStorage.getItem('access'));

        if (access) {
            let api = await orderServices.getAllOrder(idStatus);

            console.log('order', api);

            if (api?.content) {
                setOrders(api.content);
            }
        }
    };

    const handleChangeStatus = (select) => {
        setIdStatus(select.label);
    };

    const handleChangeStatusOrder = async (idO, idS) => {
        const data = {
            OrderId: idO,
            StatusId: idS,
        };

        const api = await orderServices.changeStatusOrder(data);

        console.log(api);

        if (api?.status === 200) {
            toast.success('Cập nhập trạng thái đơn hàng thành công.', {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-message',
            });
            setRenderPage(!renderPage);
            return true;
        } else if (api === undefined) {
            toast.error('Vui lòng đăng nhập để tiếp tục.', {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-message',
            });
        } else if (api.status === 400) {
            toast.info('Lỗi không xác định, vui lòng thử lại.', {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-message',
            });
        }
        return false;
    };

    useEffect(() => {
        getAllOrder();
    }, [render, renderPage, idStatus]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('control')}>
                <form className={cx('control-filt')}>
                    <div className={cx('options-layout')}>
                        <Select
                            formatOptionLabel={(option) => `${option.value}`}
                            placeholder="Chọn tình trạng đơn hàng"
                            onChange={handleChangeStatus}
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
                {orders.map((order, index) => {
                    return <OrderMItem key={index} data={order} onChangeStatus={handleChangeStatusOrder} />;
                })}
            </div>
            <ToastContainer />
        </div>
    );
}

export default OrderM;
