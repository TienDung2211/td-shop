import classNames from 'classnames/bind';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './StatisticM.module.scss';

import { useState, useEffect } from 'react';
import statisticServices from '~/services/statisticServices';
import DataTable from '~/components/DataTable/DataTable';

const cx = classNames.bind(styles);

const columns = [
    {
        title: 'Tên sản phẩm',
        dataIndex: 'name',
    },
    {
        title: 'Số lượng',
        dataIndex: 'amount',
        align: 'center',
        sorter: (a, b) => a.amount - b.amount,
    },
    {
        title: 'Doanh thu',
        dataIndex: 'total',
        align: 'center',
        sorter: (a, b) => a.total - b.total,
    },
];

function ProductStatistic({ dataDate }) {
    const [products, setProducts] = useState([]);

    const getStatisticProduct = async () => {
        const api = await statisticServices.productStatistic(dataDate);

        if (api?.status === 200) {
            setProducts(api.data);
        }
    };

    useEffect(() => {
        getStatisticProduct();
    }, [dataDate]);

    return (
        <div className={cx('table-layout')}>
            <div className={cx('heading')}>Sản phẩm</div>
            <hr className={cx('separation')}></hr>
            <div className={cx('content')}>
                <DataTable data={products} columns={columns} />
            </div>
        </div>
    );
}

export default ProductStatistic;
