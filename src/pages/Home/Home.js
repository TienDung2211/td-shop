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
        url: 'https://lh3.googleusercontent.com/CKZ-vKNDPMU9ZSI6BUDtb4eLuIGf4FJ1l1COFudsEG77dN4S_EWa-Fae9F3M1H7lB9OUxedcgD31HXUALOTsOzi1m6Hnp0Yi=rw-w1090',
        limited: true,
    },
    {
        id: 1,
        url: 'https://lh3.googleusercontent.com/pWh0ITIYXEY3wrXl4YsC_xUy3Y3Eq_yTwVof7Nsk5aYx-iAtQ7xT2X-piMZWtdsD8DBdxIbYiPW_9duCX8A_ROYk-FdWLwQ=rw-w523',
        limited: false,
    },
    {
        id: 2,
        url: 'https://theme.hstatic.net/1000026716/1000440777/14/slideshow_1.jpg?v=31811',
        limited: false,
    },
    {
        id: 3,
        url: 'https://theme.hstatic.net/1000026716/1000440777/14/slideshow_2.jpg?v=31811',
        limited: true,
    },
    {
        id: 4,
        url: 'https://theme.hstatic.net/1000026716/1000440777/14/slideshow_8.jpg?v=31811',
        limited: true,
    },
    {
        id: 5,
        url: 'https://theme.hstatic.net/1000026716/1000440777/14/slideshow_5.jpg?v=31811',
        limited: true,
    },
    {
        id: 6,
        url: 'https://theme.hstatic.net/1000026716/1000440777/14/slideshow_9.jpg?v=31811',
        limited: true,
    },
    {
        id: 7,
        url: 'https://theme.hstatic.net/1000026716/1000440777/14/slideshow_13.jpg?v=31811',
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
            let api = await productServices.getProducts(filter, page);
            setProducts(api.content);
            setTotalPages(api.totalPages);
            setPage(api.pageable.pageNumber);
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
                                <img src={dataSlider[0].url} alt="Ảnh" className={cx('image')} />
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
