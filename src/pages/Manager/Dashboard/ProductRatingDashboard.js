import classNames from 'classnames/bind';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './Dashboard.module.scss';

import { useState, useEffect } from 'react';
import { Chart as ChartJs, LineElement, CategoryScale, LinearScale, PointElement, Tooltip } from 'chart.js';
import { Line } from 'react-chartjs-2';
import statisticServices from '~/services/statisticServices';

const cx = classNames.bind(styles);

function ProductRatingDashboard({ dataDate }) {
    const [products, setProducts] = useState([]);

    const getStatisticProduct = async () => {
        const api = await statisticServices.ratingStatistic(dataDate);

        console.log(api);

        if (api?.status === 200) {
            setProducts(api.data);
        }
    };

    useEffect(() => {
        getStatisticProduct();
    }, [dataDate]);

    return (
        <div className={cx('product-db-layout')}>
            <div className={cx('heading')}>Đánh giá theo sản phẩm</div>
            <hr className={cx('separation')}></hr>
            <div className={cx('content')}>
                <table className={cx('table-review')}>
                    <thead className={cx('table-thead')}>
                        <tr className={cx('table-tr')}>
                            <th className={cx('table-th')}>Tên sản phẩm</th>
                            <th className={cx('table-th', 'center')}>Số lượng</th>
                            <th className={cx('table-th', 'center')}>Đánh giá</th>
                        </tr>
                    </thead>
                    <tbody className={cx('table-body')}>
                        {products.map((product, index) => (
                            <tr className={cx('table-tr')} key={index}>
                                <td className={cx('table-td')}>{product.name}</td>
                                <td className={cx('table-td', 'center')}>{product.total}</td>
                                <td className={cx('table-td', 'center')}>{product.value}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ProductRatingDashboard;
