import classNames from 'classnames/bind';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './Home.module.scss';
import { useState, useEffect, useContext } from 'react';

import Button from '~/components/Button';
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

    const [searchParams, setSearchParams] = useSearchParams();

    const { render, setRender } = useContext(DataContext);

    const handleCheckLoginWithGoogle = () => {
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
            toast.warning('Tài khoản đã tồn tại ', {
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

    useEffect(() => {
        handleCheckLoginWithGoogle();
    }, []);

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
            <div className={cx('row', 'options')}>
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
                    <Button to="/sort/0/0" large transparent className={cx('view-all-btn')}>
                        Xem tất cả {'>>'}
                    </Button>
                </div>
            </div>
            <div className={cx('row', 'products-list')}>
                {products.map((product) => {
                    return (
                        <div key={product.Id.toString()} className={cx('grid-column-20percent')}>
                            <Product data={product} />
                        </div>
                    );
                })}
            </div>
            <div className={cx('row')}>
                <Pagigation length={totalPages} page={Number(page)} />
            </div>
            <ToastContainer />
        </div>
    ) : null;
}

export default Home;
