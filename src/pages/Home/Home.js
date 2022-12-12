import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { useState, useEffect } from 'react';

import productServices from '~/services/productServices';
import Slider from '~/components/Slider';
import ProductItem from '~/components/Product';
import Pagigation from '~/components/Pagination/Pagination';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

const options = [
    { id: 0, title: 'Deal Hot', icon: '' },
    { id: 1, title: 'Mới nhất', icon: '' },
    { id: 2, title: 'Phổ biến', icon: '' },
];

const dataSlider = [
    {
        id: 0,
        linkImage: 'https://cf.shopee.vn/file/5f3df7c16d4f3a9b4e09f6044dd2c3c8',
        limited: true,
    },
    {
        id: 1,
        linkImage: 'https://cf.shopee.vn/file/9859b8c5023899959b7a1bdd7318f971',
        limited: false,
    },
    {
        id: 2,
        linkImage: 'https://cf.shopee.vn/file/6b0ebb66b13a3150c2ec1073524fed7d',
        limited: false,
    },
    {
        id: 3,
        linkImage: 'https://cf.shopee.vn/file/b85ab0fdc2723ff92f799bcebeb24662',
        limited: true,
    },
    {
        id: 4,
        linkImage: 'https://cf.shopee.vn/file/c786ed03343b61dbaf08c418d504da58',
        limited: true,
    },
];

function Home() {
    const [isActive, setIsActive] = useState(0);

    useEffect(() => {
        const fetchAPI = async () => {
            const results = await productServices.getAllProduct;
        };

        fetchAPI();
    });

    return (
        <div className={cx('wrapper')}>
            <div className={cx('grid-full-width')}>
                <div className={cx('grid-row', 'slider')}>
                    <div className={cx('grid-column-8', 'slider-layout')}>
                        <Slider data={dataSlider} />
                    </div>
                    <div className={cx('grid-column-4')}>
                        <div className={cx('fixed-image-layout')}>
                            <div className={cx('fixed-image')}>
                                <img src={dataSlider[1].linkImage} alt="Ảnh" className={cx('image')} />
                            </div>
                            <div className={cx('fixed-image')}>
                                <img src={dataSlider[2].linkImage} alt="Ảnh" className={cx('image')} />
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
                                            key={option.id}
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
                                            key={option.id}
                                            className={cx('grid-column-20percent', 'options-item')}
                                            onClick={() => {
                                                setIsActive(index);
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
                    <div className={cx('grid-row')}>
                        <div className={cx('grid-column-20percent')}>
                            <ProductItem />
                        </div>
                        <div className={cx('grid-column-20percent')}>
                            <ProductItem />
                        </div>
                        <div className={cx('grid-column-20percent')}>
                            <ProductItem />
                        </div>
                        <div className={cx('grid-column-20percent')}>
                            <ProductItem />
                        </div>
                        <div className={cx('grid-column-20percent')}>
                            <ProductItem />
                        </div>
                        <div className={cx('grid-column-20percent')}>
                            <ProductItem />
                        </div>
                        <div className={cx('grid-column-20percent')}>
                            <ProductItem />
                        </div>
                        <div className={cx('grid-column-20percent')}>
                            <ProductItem />
                        </div>
                        <div className={cx('grid-column-20percent')}>
                            <ProductItem />
                        </div>
                        <div className={cx('grid-column-20percent')}>
                            <ProductItem />
                        </div>
                        <div className={cx('grid-column-20percent')}>
                            <ProductItem />
                        </div>
                        <div className={cx('grid-column-20percent')}>
                            <ProductItem />
                        </div>
                        <div className={cx('grid-column-20percent')}>
                            <ProductItem />
                        </div>
                        <div className={cx('grid-column-20percent')}>
                            <ProductItem />
                        </div>
                        <div className={cx('grid-column-20percent')}>
                            <ProductItem />
                        </div>
                        <div className={cx('grid-column-20percent')}>
                            <ProductItem />
                        </div>
                        <div className={cx('grid-column-20percent')}>
                            <ProductItem />
                        </div>
                        <div className={cx('grid-column-20percent')}>
                            <ProductItem />
                        </div>
                        <div className={cx('grid-column-20percent')}>
                            <ProductItem />
                        </div>
                        <div className={cx('grid-column-20percent')}>
                            <ProductItem />
                        </div>
                        <div className={cx('grid-column-20percent')}>
                            <ProductItem />
                        </div>
                        <div className={cx('grid-column-20percent')}>
                            <ProductItem />
                        </div>
                        <div className={cx('grid-column-20percent')}>
                            <ProductItem />
                        </div>
                        <div className={cx('grid-column-20percent')}>
                            <ProductItem />
                        </div>
                        <div className={cx('grid-column-20percent')}>
                            <ProductItem />
                        </div>
                    </div>
                </div>
                <div className={cx('grid-row')}>
                    <Pagigation />
                </div>
            </div>
        </div>
    );
}

export default Home;
