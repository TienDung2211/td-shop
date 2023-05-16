import classNames from 'classnames/bind';
import styles from './SortProduct.module.scss';

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Options from './Options';
import Product from '~/components/Product';
import SideBar from '~/layouts/components/SideBar';
import productServices from '~/services/productServices';
import Pagigation from '~/components/Pagination/Pagination';

const cx = classNames.bind(styles);

function SortProduct() {
    const { mId, cId } = useParams();

    const [page, setPage] = useState(0);
    const [filter, setFilter] = useState('new');
    const [products, setProducts] = useState([]);
    const [variations, setVariations] = useState('');
    const [totalPages, setTotalPages] = useState(1);

    const handleChangeFilter = (data) => {
        setFilter(data);
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
        const fetchAPI = async () => {
            const dataAPI = await productServices.getProducts(filter, page, variations, null, cId);

            setProducts(dataAPI.content);
            setTotalPages(dataAPI.totalPages);
            setPage(dataAPI.pageable.pageNumber);
        };

        fetchAPI();
    }, [filter, variations, page, cId]);

    return products ? (
        <div className={cx('grid-full-width')}>
            <div className={cx('grid-row')}>
                <div className={cx('grid-column-2')}>
                    <SideBar mId={mId} onChangeVariations={onChangeVariations} />
                </div>
                <div className={cx('grid-column-10')}>
                    <Options handleChangeFilter={handleChangeFilter} />
                    {products && products.length !== 0 ? (
                        <div>
                            <div className={cx('products-list')}>
                                <div className={cx('grid-row')}>
                                    {products.map((product) => {
                                        return (
                                            <div key={product.Id} className={cx('grid-column-25percent')}>
                                                <Product data={product} />
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                            <Pagigation length={totalPages} page={page} />
                        </div>
                    ) : (
                        <div className={cx('no-product')}>Không có sản phẩm tìm kiếm</div>
                    )}
                </div>
            </div>
        </div>
    ) : null;
}

export default SortProduct;
