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
        dataIndex: 'total',
        align: 'center',
        sorter: (a, b) => a.total - b.total,
    },
    {
        title: 'Đánh giá',
        dataIndex: 'value',
        align: 'center',
        sorter: (a, b) => a.value - b.value,
    },
];

function ProductRatingStatistic({ dataDate }) {
    const [products, setProducts] = useState([]);

    const getStatisticProduct = async () => {
        const api = await statisticServices.ratingStatistic(dataDate);

        if (api?.status === 200) {
            setProducts(api.data);
        }
    };

    useEffect(() => {
        getStatisticProduct();
    }, [dataDate]);

    return (
        <div className={cx('table-layout')}>
            <div className={cx('heading')}>Đánh giá theo sản phẩm</div>
            <hr className={cx('separation')}></hr>
            <div className={cx('content')}>
                {/* <table className={cx('table-review')}>
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
                </table> */}
                <DataTable data={products} columns={columns} />
            </div>
        </div>
    );
}

export default ProductRatingStatistic;
