import classNames from 'classnames/bind';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './StatisticM.module.scss';

import { useEffect, useState } from 'react';
import DateTimePicker from 'react-datetime-picker';
import Button from '~/components/Button/Button';

const cx = classNames.bind(styles);

function StatisticM() {
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
                <div className={cx('heading-main')}>Thống kê</div>
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
        </div>
    );
}

export default StatisticM;
