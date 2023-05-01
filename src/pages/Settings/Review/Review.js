import classNames from 'classnames/bind';
import styles from './Review.module.scss';
import 'react-toastify/dist/ReactToastify.css';

import DataContext from '~/context/DataContext';
import { useState, useEffect, useContext } from 'react';
import DataTable from '~/components/DataTable/DataTable';
import reviewServices from '~/services/reviewServices';
import { Image } from 'antd';

const cx = classNames.bind(styles);

const columns = [
    {
        title: 'Ảnh sản phẩm',
        dataIndex: 'product',
        key: 'product',
        render: (product) => <Image src={product.ImageUrl} />,
    },
    {
        title: 'Tên sản phẩm',
        dataIndex: 'product',
        key: 'product.Name',
        render: (product) => <p>{product.Name}</p>,
        sorter: (a, b) => a.product.Name.localeCompare(b.product.Name),
    },
    {
        title: 'Giá',
        dataIndex: 'product',
        key: 'product.Price',
        align: 'center',
        render: (product) => <p>{product.Price}</p>,
        sorter: (a, b) => a.product.Price - b.product.Price,
    },
    {
        title: 'Nội dung đánh giá',
        dataIndex: 'comment',
        key: 'comment',
        sorter: (a, b) => a.comment.localeCompare(b.comment),
    },
    {
        title: 'Đánh giá',
        dataIndex: 'ratingValue',
        key: 'ratingValue',
        align: 'center',
        sorter: (a, b) => a.ratingValue - b.ratingValue,
    },
];

function Review() {
    const [reviews, setReview] = useState([]);

    const { render } = useContext(DataContext);

    const getUserReview = async () => {
        const api = await reviewServices.getUserReview();
        console.log(api);

        if (api?.status === 200) {
            setReview(api.data.content);
        }
    };

    useEffect(() => {
        getUserReview();
    }, [render]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>
                <p>Đánh giá của bạn</p>
            </div>
            <DataTable data={reviews} columns={columns} showExport={false} />
        </div>
    );
}

export default Review;
