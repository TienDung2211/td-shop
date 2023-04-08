import classNames from 'classnames/bind';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './Dashboard.module.scss';

import { useState, useEffect } from 'react';
import { Chart as ChartJs, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import annotationPlugin from 'chartjs-plugin-annotation';
import statisticServices from '~/services/statisticServices';

const cx = classNames.bind(styles);

const tempDataChart = {
    labels: ['Chờ thanh toán', 'Đang xử lý', 'Đang vận chuyển', 'Đã giao'],
    datasets: [
        {
            label: 'Số lượng : ',
            data: [1, 1, 1, 1],
            backgroundColor: ['blue', 'green', 'yellow', 'red'],
        },
    ],
};

function OrderDashboard({ dataDate }) {
    ChartJs.register(ArcElement, Tooltip, Legend, annotationPlugin);

    const [dataChart, setDataChart] = useState(tempDataChart);

    const [total, setTotal] = useState(0);

    const getStatisticOrder = async () => {
        var api = await statisticServices.orderStatistic(dataDate);

        if (api?.status === 200) {
            var dataValue = [];
            var temp = 0;
            api.data.forEach((element) => {
                dataValue.push(element?.amount);
                temp += element?.amount;
            });

            setTotal(temp);

            if (temp === 0) {
                setDataChart(tempDataChart);
            } else {
                setDataChart({
                    labels: ['Chờ thanh toán', 'Đang xử lý', 'Đang vận chuyển', 'Đã giao'],
                    datasets: [
                        {
                            label: 'Số lượng ',
                            data: dataValue,
                            backgroundColor: ['blue', 'green', 'yellow', 'red'],
                        },
                    ],
                });
            }
        }
    };

    const options = {
        plugins: {
            tooltip: {
                callbacks: {
                    label: function (context) {
                        let label = context.dataset.label || '';

                        let total = 0;

                        context.dataset.data.forEach((item) => {
                            total = total + item;
                        });

                        console.log(context.dataset.data.datasetIndex);

                        if (label) {
                            label += `: ${context.dataset.data[context.dataIndex]} (${(
                                (context.dataset.data[context.dataIndex] * 100) /
                                total
                            ).toFixed(2)}%)`;
                        }
                        return label;
                    },
                },
            },
            legend: {
                position: 'top',
                display: true,
                labels: {
                    boxWidth: 50,
                    boxHeight: 20,
                    color: 'black',
                    font: {
                        size: 14,
                    },
                },
            },
            annotation: {
                annotations: {
                    label1: {
                        type: 'label',
                        xValue: 0,
                        backgroundColor: 'transparent',
                        content: ['', '', '', '', '', '', `${total}`],
                        color: 'black',
                        font: {
                            size: 24,
                        },
                    },
                    label2: {
                        type: 'label',
                        boxHeight: 20,
                        xValue: 0,
                        yValue: 60,
                        backgroundColor: 'transparent',
                        content: ['', '', '', '', '', '', '', 'Total'],
                        color: 'grey',
                        font: {
                            size: 14,
                        },
                    },
                },
            },
        },
    };

    useEffect(() => {
        getStatisticOrder();
    }, [dataDate]);

    return (
        <div className={cx('order-db-wrapper')}>
            <div className={cx('heading')}>Order</div>
            <hr className={cx('separation')}></hr>
            <div className={cx('content')}>
                <Doughnut data={dataChart} options={options} />
            </div>
        </div>
    );
}

export default OrderDashboard;
