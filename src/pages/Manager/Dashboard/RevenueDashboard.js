import classNames from 'classnames/bind';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './Dashboard.module.scss';

import { useState, useEffect } from 'react';
import { Chart as ChartJs, LineElement, CategoryScale, LinearScale, PointElement, Tooltip } from 'chart.js';
import { Line } from 'react-chartjs-2';
import statisticServices from '~/services/statisticServices';
import dashboardServices from '~/services/dashboardServices';

const cx = classNames.bind(styles);

var dataChartTemp = {
    labels: ['today'],
    datasets: [
        {
            data: [0],
            label: 'Doanh thu ',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
        },
    ],
};

function RevenueDashboard({ dataDate }) {
    ChartJs.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip);

    const [dataChart, setDataChart] = useState(dataChartTemp);

    const [selectedOption, setSelectedOption] = useState(1);

    const getStatisticRevenue = async () => {
        var dataApi = {
            fromDate: dataDate.fromDate,
            toDate: dataDate.toDate,
            type: selectedOption,
        };
        var api = await dashboardServices.revenueDashboard(dataApi);

        if (api?.status === 200) {
            var labelTemp = [];
            var dataTemp = [];

            if (api.data.length === 0) {
                setDataChart(dataChartTemp);
            } else {
                api.data.forEach((element) => {
                    labelTemp.push(element?.date);
                    dataTemp.push(element?.revenue);
                });

                setDataChart({
                    labels: labelTemp,
                    datasets: [
                        {
                            data: dataTemp,
                            label: 'Doanh thu ',
                            backgroundColor: 'rgba(255, 99, 132, 0.2)',
                            fill: false,
                            borderColor: 'rgb(75, 192, 192)',
                            tension: 0.2,
                        },
                    ],
                });
            }
        } else {
            setDataChart(dataChartTemp);
        }
    };

    const options = {
        plugins: {
            legend: false,
            tooltip: true,
        },
    };

    useEffect(() => {
        getStatisticRevenue();
    }, [selectedOption, dataDate]);

    return (
        <div className={cx('revenue-db-wrapper')}>
            <div className={cx('heading-layout')}>
                <div className={cx('heading')}>Doanh Thu</div>
                <div className={cx('filter-group')}>
                    <div className={cx('form-check')}>
                        <input
                            className={cx('form-check-input')}
                            type="radio"
                            name="options"
                            id="option1"
                            checked={selectedOption === 1}
                            onClick={() => setSelectedOption(1)}
                        />
                        <label className={cx('form-check-label')} htmlFor="option1">
                            Ngày
                        </label>
                    </div>

                    <div className={cx('form-check')}>
                        <input
                            className={cx('form-check-input')}
                            type="radio"
                            name="options"
                            id="option2"
                            checked={selectedOption === 2}
                            onClick={() => setSelectedOption(2)}
                        />
                        <label className={cx('form-check-label')} htmlFor="option2">
                            Tháng
                        </label>
                    </div>
                    <div className={cx('form-check')}>
                        <input
                            className={cx('form-check-input')}
                            type="radio"
                            name="options"
                            id="option3"
                            checked={selectedOption === 3}
                            onClick={() => setSelectedOption(3)}
                        />
                        <label className={cx('form-check-label')} htmlFor="option3">
                            Năm
                        </label>
                    </div>
                </div>
            </div>

            <hr className={cx('separation')}></hr>
            <div className={cx('content')}>
                <Line style={{ width: '80%', margin: 'auto' }} data={dataChart} options={options} />
            </div>
        </div>
    );
}

export default RevenueDashboard;
