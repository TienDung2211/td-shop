import classNames from 'classnames/bind';
import styles from './Cart.module.scss';
import 'react-toastify/dist/ReactToastify.css';

import { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

import Button from '~/components/Button';
import DataContext from '~/context/DataContext';
import Policy from '~/components/Policy/Policy';
import Product from '~/components/Product/Product';
import cartServices from '~/services/cartServices';
import productServices from '~/services/productServices';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function Cart() {
    const [products, setProducts] = useState([]);
    const [labelSelect, setLabelSelect] = useState('Chọn hết');
    const [productsRecommend, setProductsRecommend] = useState([]);

    const { render, renderCart, setRenderCart } = useContext(DataContext);

    const navigate = useNavigate();

    const getProductRecommend = async () => {
        const api = await productServices.getProductRecommend();

        if (api?.status === 200) {
            setProductsRecommend(api.data);
        } else {
            setProductsRecommend([]);
        }
    };

    const changeAmount = async (id, amount) => {
        const data = {
            ProductId: id,
            Quantity: amount,
        };

        let api = await cartServices.changeAmount(data);

        if (api.status === 200) {
            setRenderCart(!renderCart);
        }
    };

    const removeCart = async (id) => {
        let api = await cartServices.removeCart(id);

        if (api.status === 200) {
            toast.success('Xóa thành công sản phẩm khỏi giỏ hàng.', {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-message',
            });
            setRenderCart(!renderCart);
        } else {
            toast.success('Lỗi không xác định, vui lòng thử lại sau.', {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-message',
            });
        }
    };

    const handleSelectAll = (e) => {
        if (e.currentTarget.checked) {
            const checkBox = document.querySelectorAll('input[type=checkbox]');

            for (let i = 0; i < checkBox.length; i++) {
                if (!checkBox[i].checked) {
                    checkBox[i].checked = true;
                }
            }
            setLabelSelect('Bỏ hết');
        } else {
            const checkBox = document.querySelectorAll('input[type=checkbox]');

            for (let i = 0; i < checkBox.length; i++) {
                if (checkBox[i].checked) {
                    checkBox[i].checked = false;
                }
            }
            setLabelSelect('Chọn hết');
        }
    };

    const handleOrder = () => {
        // const checked = document.querySelectorAll('input[type=checkbox]:checked:not(:disabled)');
        const checked = document.querySelectorAll('input[type=checkbox]:checked');
        const select = [];
        for (let i = 0; i < checked.length; i++) {
            if (checked[i].value !== 'select-all') {
                select.push(products[checked[i].value]);
            }
        }
        if (select.length > 0) {
            navigate('/payment', { state: { data: select } });
        } else {
            toast.info('Vui lòng chọn sản phẩm để tiếp tục đặt hàng.', {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-message',
            });
        }
    };

    const fetchAPI = async () => {
        var dataAPI = await cartServices.getMyCart();

        setProducts(dataAPI?.CartItems);
    };

    useEffect(() => {
        getProductRecommend();
    }, [render]);

    useEffect(() => {
        const interval = setInterval(() => {
            fetchAPI();
        }, 1 * 60 * 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    useEffect(() => {
        fetchAPI();
    }, [render, renderCart]);

    return (
        <div className={cx('container')}>
            <div className={cx('row', 'mb-5', 'hidden-by-mobile')}>
                <div className={cx('path', 'col-12', 'col-sm-12', 'col-md-9', 'col-lg-9', 'col-xl-6')}>
                    <Button to="/" transparent>
                        Trang chủ
                    </Button>
                    <Button disable transparent iconOnly={<FontAwesomeIcon icon={faAngleRight} />}></Button>{' '}
                    <div className={cx('page-name')}>
                        <span>Giỏ hàng</span>
                    </div>
                </div>
            </div>
            <div className={cx('row')}>
                <div className={cx('col-12', 'col-sm-12', 'col-md-12', 'col-lg-9', 'col-xl-9')}>
                    <div className={cx('content', 'mb-5')}>
                        <div className={cx('column-lable')}>
                            <div className={cx('col-12', 'col-sm-12', 'col-md-2', 'col-lg-2', 'col-xl-2')}>
                                <div className={cx('select-all-layout')}>
                                    <input
                                        type="checkbox"
                                        className={cx('check-all')}
                                        value="select-all"
                                        onClick={handleSelectAll}
                                    />
                                    <label className={cx('select-all-lable')}>{labelSelect}</label>
                                </div>
                            </div>
                            <div
                                className={cx(
                                    'd-none',
                                    'd-sm-none',
                                    'd-md-flex',
                                    'd-lg-flex',
                                    'd-xl-flex',
                                    'col-md-10',
                                    'col-lg-10',
                                    'col-xl-10',
                                    'columns',
                                )}
                            >
                                <div className={cx('col-4', 'left-item')}>Sản phẩm</div>
                                <div className={cx('col-3', 'item')}>Giá</div>
                                <div className={cx('col-3', 'item')}>Số lượng</div>
                                <div className={cx('col-2', 'item')}></div>
                            </div>
                        </div>
                        {products && (
                            <div className={cx('cart-list')}>
                                {products.map((data, index) => (
                                    <div key={index} className={cx('cart-item')}>
                                        <div className={cx('col-5', 'col-sm-5', 'col-md-2', 'col-lg-2', 'col-xl-2')}>
                                            <div className={cx('select-layout')}>
                                                <input
                                                    type="checkbox"
                                                    className={cx('check')}
                                                    disabled={data?.Product.Total < data.Quantity}
                                                    value={index}
                                                />

                                                <div className={cx('image-layout')}>
                                                    <img
                                                        src={data?.Product?.ImageUrl}
                                                        className={cx('image')}
                                                        alt="Ảnh"
                                                    />
                                                    {data?.Product.Total < data.Quantity && (
                                                        <div className={cx('image-overlay')}></div>
                                                    )}
                                                    {data?.Product.Total < data.Quantity && (
                                                        <div className={cx('image-text')}>Hết hàng</div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className={cx(
                                                'col-7',
                                                'col-sm-7',
                                                'col-md-10',
                                                'col-lg-10',
                                                'col-xl-10',
                                                'info',
                                            )}
                                        >
                                            <span className={cx('name', 'col-md-4', 'col-lg-4', 'col-xl-4')}>
                                                {data?.Product.Name}
                                            </span>
                                            <div className={cx('item', 'col-md-3', 'col-lg-3', 'col-xl-3')}>
                                                {data?.Product?.Discount ? (
                                                    <div>
                                                        <span className={cx('original-price')}>
                                                            {parseInt(data?.Product.Price).toLocaleString('vi-VN', {
                                                                style: 'currency',
                                                                currency: 'VND',
                                                            })}
                                                        </span>
                                                        <br></br>
                                                        <span className={cx('current-price')}>
                                                            {parseInt(
                                                                data?.Product.Price *
                                                                    (1 - data?.Product?.Discount?.DiscountRate),
                                                            ).toLocaleString('vi-VN', {
                                                                style: 'currency',
                                                                currency: 'VND',
                                                            })}
                                                        </span>
                                                    </div>
                                                ) : (
                                                    <span className={cx('current-price')}>
                                                        {parseInt(data?.Product.Price).toLocaleString('vi-VN', {
                                                            style: 'currency',
                                                            currency: 'VND',
                                                        })}
                                                    </span>
                                                )}
                                            </div>
                                            <div
                                                className={cx(
                                                    'item',
                                                    'amount-layout',
                                                    'col-md-3',
                                                    'col-lg-3',
                                                    'col-xl-3',
                                                )}
                                            >
                                                <Button
                                                    outline
                                                    transparent
                                                    iconOnly={<FontAwesomeIcon icon={faAngleLeft} />}
                                                    onClick={() => {
                                                        if (data.Quantity > 1) {
                                                            changeAmount(data?.Product.Id, data?.Quantity - 1);
                                                        } else {
                                                            toast.warning('Số lượng giỏ hàng tối thiểu là 1.', {
                                                                position: toast.POSITION.TOP_RIGHT,
                                                                className: 'toast-message',
                                                            });
                                                        }
                                                    }}
                                                />
                                                <span className={cx('amount-value')}>{data?.Quantity}</span>
                                                <Button
                                                    outline
                                                    transparent
                                                    iconOnly={<FontAwesomeIcon icon={faAngleRight} />}
                                                    onClick={() => {
                                                        if (data.Quantity < data.Product.Total) {
                                                            changeAmount(data?.Product.Id, data?.Quantity + 1);
                                                        } else {
                                                            toast.warning(
                                                                'Số lượng giỏ hàng vượt qua số lượng sản phẩm hiện có.',
                                                                {
                                                                    position: toast.POSITION.TOP_RIGHT,
                                                                    className: 'toast-message',
                                                                },
                                                            );
                                                        }
                                                    }}
                                                />
                                            </div>
                                            <div className={cx('item', 'col-md-2', 'col-lg-2', 'col-xl-2')}>
                                                <span
                                                    className={cx('delete-btn')}
                                                    onClick={() => {
                                                        removeCart(data?.Product.Id);
                                                    }}
                                                >
                                                    Xóa
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className={cx('row', 'd-flex', 'justify-content-end', 'btn-layout')}>
                        <div className={cx('col-6', 'col-sm-6', 'col-md-4', 'col-lg-3', 'col-xl-3')}>
                            <Button to={'/cart'} large border outline>
                                Quay lại
                            </Button>
                        </div>
                        <div className={cx('col-6', 'col-sm-6', 'col-md-4', 'col-lg-3', 'col-xl-3')}>
                            <Button large primary border onClick={() => handleOrder()}>
                                Đặt hàng
                            </Button>
                        </div>
                    </div>
                </div>
                <div className={cx('d-none', 'd-sm-none', 'd-md-none', 'd-lg-block', 'd-xl-block', 'col-3')}>
                    <Policy />
                </div>
            </div>

            {productsRecommend.length > 0 && (
                <div className={cx('row', 'd-flex', 'justify-content-between', 'pl-3', 'pr-3', 'mt-5', 'other-layout')}>
                    <div className={cx('label', 'col-12')}>Sản phẩm bạn có thể thích</div>
                    <div className={cx('col-12', 'products-list-row')}>
                        {productsRecommend.map((product, index) => {
                            return <Product data={product} key={index} />;
                        })}
                    </div>
                </div>
            )}

            <ToastContainer />
        </div>
    );
}

export default Cart;
