import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { useState, useEffect } from 'react';

import productServices from '~/services/productServices';
import Slider from '~/components/Slider';
import Product from '~/components/Product';
import Pagigation from '~/components/Pagination/Pagination';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

const options = [
    { id: 0, title: 'Deal Hot', key: 'deal-hot' },
    { id: 1, title: 'Mới nhất', key: 'new' },
    { id: 2, title: 'Phổ biến', key: 'popular' },
];

const dataSlider = [
    {
        id: 0,
        url: 'https://cf.shopee.vn/file/5f3df7c16d4f3a9b4e09f6044dd2c3c8',
        limited: true,
    },
    {
        id: 1,
        url: 'https://cf.shopee.vn/file/9859b8c5023899959b7a1bdd7318f971',
        limited: false,
    },
    {
        id: 2,
        url: 'https://cf.shopee.vn/file/6b0ebb66b13a3150c2ec1073524fed7d',
        limited: false,
    },
    {
        id: 3,
        url: 'https://cf.shopee.vn/file/b85ab0fdc2723ff92f799bcebeb24662',
        limited: true,
    },
    {
        id: 4,
        url: 'https://cf.shopee.vn/file/c786ed03343b61dbaf08c418d504da58',
        limited: true,
    },
];

function Home() {
    const [page, setPage] = useState(0);
    const [isActive, setIsActive] = useState(0);
    const [products, setProducts] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [filter, setFilter] = useState('deal-hot');

    useEffect(() => {
        const fetchAPI = async () => {
            let dataAPI = await productServices.getAllProducts(filter, page);
            setProducts(dataAPI.content);
            setTotalPages(dataAPI.totalPages);
            setPage(dataAPI.pageable.pageNumber);
        };

        fetchAPI();
    }, [isActive]);

    return products ? (
        <div className={cx('wrapper')}>
            <div className={cx('grid-full-width')}>
                <div className={cx('grid-row', 'slider')}>
                    <div className={cx('grid-column-8', 'slider-layout')}>
                        <Slider data={dataSlider} />
                    </div>
                    <div className={cx('grid-column-4')}>
                        <div className={cx('fixed-image-layout')}>
                            <div className={cx('fixed-image')}>
                                <img src={dataSlider[1].url} alt="Ảnh" className={cx('image')} />
                            </div>
                            <div className={cx('fixed-image')}>
                                <img src={dataSlider[2].url} alt="Ảnh" className={cx('image')} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('grid-row', 'options')}>
                    <div className={cx('grid-column-10')}>
                        <div className={cx('options-list')}>
                            {options.map((option, index) => {
                                if (isActive === index) {
                                    return (
                                        <div
                                            key={option.id.toString()}
                                            className={cx('grid-column-20percent', 'options-item', 'selection')}
                                        >
                                            <Button large transparent>
                                                {option.title}
                                            </Button>
                                        </div>
                                    );
                                } else {
                                    return (
                                        <div
                                            key={option.id.toString()}
                                            className={cx('grid-column-20percent', 'options-item')}
                                            onClick={() => {
                                                setIsActive(index);
                                                setFilter(options[index].key);
                                            }}
                                        >
                                            <Button large transparent>
                                                {option.title}
                                            </Button>
                                        </div>
                                    );
                                }
                            })}
                        </div>
                    </div>
                    <div className={cx('grid-column-2', 'view-all-layout')}>
                        <Button to="/sort" large transparent className={cx('view-all-btn')}>
                            Xem tất cả {'>>'}
                        </Button>
                    </div>
                </div>
                <div className={cx('grid-row', 'products-list')}>
                    {products.map((product) => {
                        return (
                            <div key={product.Id.toString()} className={cx('grid-column-20percent')}>
                                <Product data={product} />
                            </div>
                        );
                    })}
                </div>
                <div className={cx('grid-row')}>
                    <Pagigation length={totalPages} page={Number(page)} />
                </div>
            </div>
        </div>
    ) : null;
}

export default Home;
