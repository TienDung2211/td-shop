import classNames from 'classnames/bind';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './OrderM.module.scss';
import 'react-toastify/dist/ReactToastify.css';

import Select from 'react-select';
import { useState, useContext, useEffect } from 'react';

import DataContext from '~/context/DataContext';
import orderServices from '~/services/orderService';
import { ToastContainer, toast } from 'react-toastify';
import DetailOrder from './DetailOrder';
import DataTable from '~/components/DataTable/DataTable';

const cx = classNames.bind(styles);

function OrderM() {
    const [orders, setOrders] = useState([]);
    const [renderPage, setRenderPage] = useState(true);
    const [status, setStatus] = useState({ value: 'Tất cả đơn hàng', label: 0 });
    const [idStatus, setIdStatus] = useState(0);

    const [idOrder, setIdOrder] = useState(0);
    const [viewDetail, setViewDetail] = useState(false);

    const columns = [
        {
            title: 'Đơn hàng',
            dataIndex: '',
            align: 'center',
            key: 'imgProduct',
            width: '10%',
            editable: true,
            render: (order) => (
                <div className={cx('layout-img')}>
                    <img src={order.OrderDetails[0].ImageUrl} alt="" className={cx('img')} />
                </div>
            ),
        },
        {
            title: 'Người dùng',
            dataIndex: '',
            key: 'user',
            align: 'center',
            width: '10%',
            editable: true,
            // sorter: (a, b) => a.user.localeCompare(b.user),
            render: (user) => <p>{user.Address.name}</p>,
        },
        {
            title: 'SDT',
            dataIndex: '',
            key: 'phone',
            align: 'center',
            width: '10%',
            editable: true,
            // sorter: (a, b) => a.phone - b.phone,
            render: (user) => <p>{user.Address.phone}</p>,
        },
        {
            title: 'Địa chỉ',
            dataIndex: '',
            key: 'addressDetail',
            sorter: (a, b) => a.Address.addressDetail.localeCompare(b.Address.addressDetail),
            render: (user) => <p>{user.Address.addressDetail}</p>,
        },
        {
            title: 'Số lượng sản phẩm',
            key: 'amount',
            align: 'center',
            width: '12%',
            render: (order) => <p>{order.OrderDetails.length}</p>,
        },
        {
            title: 'Giá trị đơn hàng',
            dataIndex: '',
            key: 'price',
            align: 'center',
            width: '12%',
            render: (order) => <p>{getTotalPrice(order)}</p>,
        },
        {
            title: 'Trạng thái',
            dataIndex: '',
            key: 'status',
            align: 'center',
            width: '10%',
            editable: true,
            render: (order) => <p>{order.OrderStatus.name}</p>,
        },
    ];

    const { render, setRender } = useContext(DataContext);

    const getAllOrder = async () => {
        const api = await orderServices.getAllOrder(idStatus);

        if (api?.status === 200) {
            setOrders(api.data.content);
        }
    };

    const getTotalPrice = (data) => {
        let total = 0;
        data.OrderDetails.forEach((product) => {
            total = total + Number(product?.FinalPrice);
        });

        total = total + data?.Ship?.price;

        return total;
    };

    const handleChangeStatus = (select) => {
        setIdStatus(select.label);
        setStatus(select);
    };

    const handleChangeStatusOrder = async (idO, idS) => {
        const data = {
            OrderId: idO,
            StatusId: idS,
        };

        const api = await orderServices.changeStatusOrder(data);

        if (api?.status === 200) {
            toast.success('Cập nhập trạng thái đơn hàng thành công.', {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-message',
            });
            setRender(!render);
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

    const handleViewDetail = (item) => {
        setIdOrder(item.Id);
        setViewDetail(true);
    };

    const handleCancelView = () => {
        setViewDetail(false);
    };

    useEffect(() => {
        getAllOrder();
    }, [render, renderPage, idStatus, viewDetail]);

    return (
        <div className={cx('container')}>
            {!viewDetail && (
                <div className={cx('row')}>
                    <span className={cx('heading')}>Quản lí đơn hàng</span>
                </div>
            )}
            {!viewDetail && (
                <div className={cx('row', 'd-flex', 'justify-content-end')}>
                    <div className={cx('control')}>
                        <Select
                            formatOptionLabel={(option) => `${option.value}`}
                            value={status}
                            placeholder="Chọn tình trạng đơn hàng"
                            onChange={handleChangeStatus}
                            options={[
                                { value: 'Tất cả đơn hàng', label: 0 },
                                { value: 'Chờ thanh toán', label: 1 },
                                { value: 'Đang xử lý', label: 2 },
                                { value: 'Đang vận chuyển', label: 3 },
                                { value: 'Đã giao', label: 4 },
                                { value: 'Đã hủy', label: 5 },
                            ]}
                        />
                    </div>
                </div>
            )}
            <div className={cx('row')}>
                {!viewDetail && (
                    <DataTable columns={columns} data={orders} showExport={false} onClickRow={handleViewDetail} />
                )}
                {viewDetail && (
                    <DetailOrder
                        idOrder={idOrder}
                        onCancelViewDetail={handleCancelView}
                        onChangeStatus={handleChangeStatusOrder}
                    />
                )}
            </div>
            <ToastContainer />
        </div>
    );
}

export default OrderM;
