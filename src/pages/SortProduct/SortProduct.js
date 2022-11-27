import classNames from 'classnames/bind';
import styles from './SortProduct.module.scss';

import SideBar from '~/layouts/components/SideBar';
import Options from './Options';
import Pagigation from '~/components/Pagination/Pagination';
import Product from '~/components/Product';

const cx = classNames.bind(styles);

function SortProduct() {
    return (
        <div className={cx('grid-full-width')}>
            <div className={cx('grid-row')}>
                <div className={cx('grid-column-2')}>
                    <SideBar />
                </div>
                <div className={cx('grid-column-10')}>
                    <Options />
                    <div className={cx('products-list')}>
                        <div className={cx('grid-row')}>
                            <div className={cx('grid-column-25percent')}>
                                <Product />
                            </div>
                            <div className={cx('grid-column-25percent')}>
                                <Product />
                            </div>
                            <div className={cx('grid-column-25percent')}>
                                <Product />
                            </div>
                            <div className={cx('grid-column-25percent')}>
                                <Product />
                            </div>
                            <div className={cx('grid-column-25percent')}>
                                <Product />
                            </div>
                            <div className={cx('grid-column-25percent')}>
                                <Product />
                            </div>
                            <div className={cx('grid-column-25percent')}>
                                <Product />
                            </div>
                            <div className={cx('grid-column-25percent')}>
                                <Product />
                            </div>
                            <div className={cx('grid-column-25percent')}>
                                <Product />
                            </div>
                            <div className={cx('grid-column-25percent')}>
                                <Product />
                            </div>
                            <div className={cx('grid-column-25percent')}>
                                <Product />
                            </div>
                            <div className={cx('grid-column-25percent')}>
                                <Product />
                            </div>
                            <div className={cx('grid-column-25percent')}>
                                <Product />
                            </div>
                            <div className={cx('grid-column-25percent')}>
                                <Product />
                            </div>
                            <div className={cx('grid-column-25percent')}>
                                <Product />
                            </div>
                            <div className={cx('grid-column-25percent')}>
                                <Product />
                            </div>
                            <div className={cx('grid-column-25percent')}>
                                <Product />
                            </div>
                            <div className={cx('grid-column-25percent')}>
                                <Product />
                            </div>
                            <div className={cx('grid-column-25percent')}>
                                <Product />
                            </div>
                            <div className={cx('grid-column-25percent')}>
                                <Product />
                            </div>
                        </div>
                    </div>
                    <Pagigation />
                </div>
            </div>
        </div>
    );
}

export default SortProduct;
