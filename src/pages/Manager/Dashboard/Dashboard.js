import classNames from 'classnames/bind';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './Dashboard.module.scss';

import { useState, useEffect } from 'react';
import OrderDashboard from './OrderDashboard';
import DateTimePicker from 'react-datetime-picker';
import RevenueDashboard from './RevenueDashboard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileInvoice, faGauge, faLaptop, faMoneyBillWave } from '@fortawesome/free-solid-svg-icons';
import dashboardServices from '~/services/dashboardServices';
import RatingDashboard from './RatingDashboard';
import AccountDashboard from './AccountDashboard';

const cx = classNames.bind(styles);

function Dashboard() {
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [totalProduct, setTotalProduct] = useState(0);
    const [totalOrder, setTotalOrder] = useState(0);
    const [ratingAvg, setRatingAvg] = useState(0.0);

    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());
    const [dataDate, setDataDate] = useState();

    const getStringDate = () => {
        const data = {
            fromDate: `${fromDate.getFullYear()}-${
                fromDate.getMonth() < 9 ? '0' + (fromDate.getMonth() + 1).toString() : fromDate.getMonth() + 1
            }-${fromDate.getDate() < 10 ? '0' + fromDate.getDate().toString() : fromDate.getDate()} 00:00:00`,

            toDate: `${toDate.getFullYear()}-${
                toDate.getMonth() < 9 ? '0' + (toDate.getMonth() + 1).toString() : toDate.getMonth() + 1
            }-${toDate.getDate() < 10 ? '0' + toDate.getDate().toString() : toDate.getDate()} 23:59:59`,
        };

        setDataDate(data);
    };

    const getTotalRevenue = async () => {
        var api = await dashboardServices.totalRevenue();

        if (api?.status === 200) {
            setTotalRevenue(api.data);
        }
    };
    const getTotalOrder = async () => {
        var api = await dashboardServices.totalOrder();

        if (api?.status === 200) {
            setTotalOrder(api.data);
        }
    };
    const getTotalProduct = async () => {
        var api = await dashboardServices.totalProduct();

        if (api?.status === 200) {
            setTotalProduct(api.data);
        }
    };
    const getRatingAvg = async () => {
        var api = await dashboardServices.ratingAvg();

        if (api?.status === 200) {
            setRatingAvg(api.data);
        }
    };
    getTotalRevenue();
    getTotalOrder();
    getTotalProduct();
    getRatingAvg();

    useEffect(() => {
        getStringDate();
    }, [fromDate, toDate]);

    return (
        <div className={cx('container')}>
            <div className={cx('row')}>
                <div className={cx('heading-main')}>Dashboard</div>
            </div>
            <div className={cx('row', 'd-flex', 'flex-wrap')}>
                <div className={cx('col-12', 'col-xs-12', 'col-sm-6', 'col-md-6', 'col-lg-3')}>
                    <div className={cx('total-by-item-layout')}>
                        <div className={cx('wrapper', 'item-1')}>
                            <div className={cx('icon-layout')}>
                                <FontAwesomeIcon className={cx('icon')} icon={faMoneyBillWave} />
                            </div>
                            <div className={cx('content-layout')}>
                                <div className={cx('number')}>
                                    {totalRevenue} <span>₫</span>
                                </div>
                                <div className={cx('text')}>Doanh thu</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('col-12', 'col-xs-12', 'col-sm-6', 'col-md-6', 'col-lg-3')}>
                    <div className={cx('total-by-item-layout')}>
                        <div className={cx('wrapper', 'item-2')}>
                            <div className={cx('icon-layout')}>
                                <FontAwesomeIcon className={cx('icon')} icon={faLaptop} />
                            </div>
                            <div className={cx('content-layout')}>
                                <div className={cx('number')}>{totalProduct}</div>
                                <div className={cx('text')}>Sản phẩm</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('col-12', 'col-xs-12', 'col-sm-6', 'col-md-6', 'col-lg-3')}>
                    <div className={cx('total-by-item-layout')}>
                        <div className={cx('wrapper', 'item-3')}>
                            <div className={cx('icon-layout')}>
                                <FontAwesomeIcon className={cx('icon')} icon={faFileInvoice} />
                            </div>
                            <div className={cx('content-layout')}>
                                <div className={cx('number')}>{totalOrder}</div>
                                <div className={cx('text')}>Đơn hàng</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('col-12', 'col-xs-12', 'col-sm-6', 'col-md-6', 'col-lg-3')}>
                    <div className={cx('total-by-item-layout')}>
                        <div className={cx('wrapper', 'item-4')}>
                            <div className={cx('icon-layout')}>
                                <FontAwesomeIcon className={cx('icon')} icon={faGauge} />
                            </div>
                            <div className={cx('content-layout')}>
                                <div className={cx('number')}>{ratingAvg}</div>
                                <div className={cx('text')}>Đánh giá trung bình</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('row')}>
                <div className={cx('select-date')}>
                    <div className={cx('form-group')}>
                        <label className={cx('label')}>FromDate</label>
                        <DateTimePicker
                            className={cx('form-control')}
                            format="yyyy-MM-dd"
                            value={fromDate}
                            onChange={(value) => setFromDate(value)}
                        />
                    </div>
                    <span className={cx('space')}></span>
                    <div className={cx('form-group')}>
                        <label className={cx('label')}>ToDate</label>
                        <DateTimePicker
                            className={cx('form-control')}
                            format="yyyy-MM-dd"
                            value={toDate}
                            onChange={(value) => {
                                setToDate(value);
                            }}
                        />
                    </div>
                </div>
            </div>
            <div className={cx('mt-5')}></div>
            <div className={cx('row')}>
                <div className={cx('col-12', 'col-xs-12', 'col-sm-12', 'col-md-12', 'col-lg-12')}>
                    <RevenueDashboard dataDate={dataDate} />
                </div>
            </div>
            <div className={cx('mt-5')}></div>
            <div className={cx('row')}>
                <div className={cx('col-12', 'col-xs-12', 'col-sm-6', 'col-md-4', 'col-lg-4')}>
                    <AccountDashboard dataDate={dataDate} />
                </div>
                <div className={cx('col-12', 'col-xs-12', 'col-sm-6', 'col-md-4', 'col-lg-4')}>
                    <OrderDashboard dataDate={dataDate} />
                </div>
                <div className={cx('col-12', 'col-xs-12', 'col-sm-6', 'col-md-4', 'col-lg-4')}>
                    <RatingDashboard dataDate={dataDate} />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
