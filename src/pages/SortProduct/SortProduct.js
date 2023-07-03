import classNames from 'classnames/bind';
import styles from './SortProduct.module.scss';

import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

import Options from './Options';
import Button from '~/components/Button';
import Product from '~/components/Product';
import SideBar from '~/layouts/components/SideBar';
import productServices from '~/services/productServices';
import Pagigation from '~/components/Pagination/Pagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faFilter } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function SortProduct() {
    const { mId, cId } = useParams();

    const [page, setPage] = useState(0);
    const [filter, setFilter] = useState('new');
    const [products, setProducts] = useState([]);
    const [variations, setVariations] = useState('');
    const [totalPages, setTotalPages] = useState(1);
    const [open, setOpen] = useState(false);
    const layoutRef = useRef();

    const handleClick = () => {
        setOpen(!open);
    };

    const handleChangeFilter = (data) => {
        setFilter(data);
    };

    const handleClickPagination = (value) => {
        setPage(value);
    };

    const onChangeVariations = () => {
        const variationChecked = document.querySelectorAll('input[type=checkbox]:checked');

        const checked = [];

        for (let i = 0; i < variationChecked.length; i++) {
            checked.push(variationChecked[i].id);
        }

        setVariations(checked.join());
    };

    useEffect(() => {
        const element = layoutRef.current;
        const getWidth = () => {
            const width = element.offsetWidth;
            if (width >= 768) {
                setOpen(true);
            }
        };

        getWidth();

        window.addEventListener('resize', getWidth);

        return () => {
            window.removeEventListener('resize', getWidth);
        };
    }, []);

    useEffect(() => {
        const fetchAPI = async () => {
            const dataAPI = await productServices.getProducts(filter, page, variations, null, cId);

            setProducts(dataAPI.content);
            setTotalPages(dataAPI.totalPages);
            setPage(dataAPI.pageable.pageNumber);
        };

        fetchAPI();
    }, [filter, variations, page, cId]);

    return (
        <div className={cx('container-fluid', 'p-0')}>
            <div className={cx('row', 'mb-5', 'hidden-by-mobile')}>
                <div className={cx('path', 'col-12', 'col-sm-12', 'col-md-9', 'col-lg-9', 'col-xl-6')}>
                    <Button to="/" transparent>
                        Trang chủ
                    </Button>
                    <Button disable transparent iconOnly={<FontAwesomeIcon icon={faAngleRight} />}></Button>{' '}
                    <div className={cx('page-name')}>
                        <span>Sắp xếp sản phẩm</span>
                    </div>
                </div>
            </div>
            <div className={cx('d-flex', 'row', 'layout')} ref={layoutRef}>
                <div className={cx('sidebar__row')}>
                    <span className={cx('label')}>
                        <FontAwesomeIcon icon={faFilter} className={cx('icon')} />
                        Lọc sản phẩm
                    </span>
                    <div
                        className={cx('nav-icon', 'd-flex', 'justify-content-center', { open: open })}
                        onClick={handleClick}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                {open ? (
                    <div className={cx('sidebar')}>
                        <SideBar mId={mId} onChangeVariations={onChangeVariations} />
                    </div>
                ) : (
                    <div className={cx('sidebar')} style={{ visibility: 'hidden', opacity: 0, height: 0 }}>
                        <SideBar mId={mId} onChangeVariations={onChangeVariations} />
                    </div>
                )}
                <div className={cx('content')}>
                    <div className={cx('row')}>
                        <Options
                            onChangeFilter={handleChangeFilter}
                            page={page}
                            totalPages={totalPages}
                            onClickPagination={handleClickPagination}
                        />
                    </div>
                    {products && products.length !== 0 ? (
                        <div className={cx('row')}>
                            <div className={cx('products-list')}>
                                {products.map((product, index) => {
                                    return <Product key={index} data={product} />;
                                })}
                            </div>
                            <Pagigation length={totalPages} page={page} onClickPagination={handleClickPagination} />
                        </div>
                    ) : (
                        <div className={cx('no-product')}>Không có sản phẩm tìm kiếm</div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SortProduct;
