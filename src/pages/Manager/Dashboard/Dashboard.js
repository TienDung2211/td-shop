import classNames from 'classnames/bind';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './Dashboard.module.scss';

import { useState, useEffect } from 'react';
import OrderDashboard from './OrderDashboard';
import DateTimePicker from 'react-datetime-picker';
import RevenueDashboard from './RevenueDashboard';
import ProductDashboard from './ProductDashBoard';
import ProductRatingDashboard from './ProductRatingDashboard';

const cx = classNames.bind(styles);

function Dashboard() {
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

    useEffect(() => {
        getStringDate();
    }, [fromDate, toDate]);

    return (
        <div className={cx('container')}>
            <div className={cx('row')}>
                <div className={cx('heading-main')}>Dashboard</div>
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
                <div className={cx('col')}>
                    <RevenueDashboard dataDate={dataDate} />
                </div>
            </div>
            <div className={cx('mt-5')}></div>
            <div className={cx('row')}>
                <div className={cx('col-sm-8')}>
                    <ProductDashboard dataDate={dataDate} />
                </div>
                <div className={cx('col-sm-4')}>
                    <OrderDashboard dataDate={dataDate} />
                </div>
            </div>
            <div className={cx('mt-5')}></div>
            <div className={cx('row')}>
                <div className={cx('col-sm-8')}>
                    <ProductRatingDashboard dataDate={dataDate} />
                </div>
                <div className={cx('col-sm-4')}>
                    <OrderDashboard dataDate={dataDate} />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
