import classNames from 'classnames/bind';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './Home.module.scss';
import { useState, useEffect, useContext } from 'react';

import { Link } from 'react-router-dom';
import Product from '~/components/Product';
import DataContext from '~/context/DataContext';
import productServices from '~/services/productServices';
import Pagigation from '~/components/Pagination/Pagination';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const cx = classNames.bind(styles);

const options = [
    { id: 0, title: 'Deal Hot', key: 'deal-hot' },
    { id: 1, title: 'Mới nhất', key: 'new' },
    { id: 2, title: 'Phổ biến', key: 'popular' },
];

function Home() {
    const [page, setPage] = useState(0);
    const [isActive, setIsActive] = useState(0);
    const [products, setProducts] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [filter, setFilter] = useState('deal-hot');

    const navigate = useNavigate();

    const [searchParams] = useSearchParams();

    const { render, setRender } = useContext(DataContext);

    const handleCheckAccount = () => {
        if (searchParams.get('token')) {
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
            localStorage.removeItem('userId');
            localStorage.setItem('access', JSON.stringify(searchParams.get('token')));
            setRender(!render);
            setTimeout(() => {
                navigate('/');
            }, 2000);
        } else if (searchParams.get('error') === '10002') {
            toast.warning('Tài khoản đã tồn tại.', {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-message',
            });
        } else if (searchParams.get('activate-success') === 'true') {
            toast.info('Tài khoản của bản đã được kích hoạt.', {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-message',
            });
        } else if (searchParams.get('status') === '400') {
            toast.success('Có lỗi bất ngờ xảy ra, vui lòng thử lại', {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-message',
            });
        }
    };

    const handleClickPagination = (value) => {
        setPage(value);
    };

    useEffect(() => {
        handleCheckAccount();
    }, []);

    useEffect(() => {
        const fetchAPI = async () => {
            let api = await productServices.getProducts(filter, page);
            setProducts(api.content);
            setTotalPages(api.totalPages);
            setPage(api.pageable.pageNumber);
        };
        fetchAPI();
    }, [isActive, page]);

    return products ? (
        <div className={cx('wrapper')}>
            <div className={cx('row', 'd-flex', 'justify-content-between', 'control', 'pl-3', 'pr-3')}>
                <div className={cx('col-9', 'col-sm-6', 'col-md-6', 'col-lg-6', 'col-xl-6', 'd-flex')}>
                    {options.map((option, index) => {
                        if (isActive === index) {
                            return (
                                <div key={option.id.toString()} className={cx('col-4', 'options-item', 'selection')}>
                                    {option.title}
                                </div>
                            );
                        } else {
                            return (
                                <div
                                    key={option.id.toString()}
                                    className={cx('col-4', 'options-item')}
                                    onClick={() => {
                                        setIsActive(index);
                                        setFilter(options[index].key);
                                    }}
                                >
                                    {option.title}
                                </div>
                            );
                        }
                    })}
                </div>
                <div className={cx('view-all-layout', 'col-3', 'col-sm-2', 'col-md-2', 'col-lg-2', 'col-xl-2')}>
                    <Link to="/sort/0/0" className={cx('view-all-btn')}>
                        Xem tất cả
                    </Link>
                </div>
            </div>
            <div className={cx('row', 'products-list')}>
                {products.map((product, index) => {
                    return <Product data={product} key={index} />;
                })}
            </div>
            <div className={cx('row')}>
                <Pagigation length={totalPages} page={Number(page)} onClickPagination={handleClickPagination} />
            </div>
            <ToastContainer />
        </div>
    ) : null;
}

export default Home;
