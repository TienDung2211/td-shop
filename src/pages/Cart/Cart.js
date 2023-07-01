import classNames from 'classnames/bind';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './Cart.module.scss';
import 'react-toastify/dist/ReactToastify.css';

import { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

import Button from '~/components/Button';
import DataContext from '~/context/DataContext';
import Policy from '~/components/Policy/Policy';
import cartServices from '~/services/cartServices';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function Cart() {
    const [products, setProducts] = useState([]);
    const [labelSelect, setLabelSelect] = useState('Chọn hết');
    const { render, renderCart, setRenderCart } = useContext(DataContext);

    const navigate = useNavigate();

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

    const handlePayment = () => {
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

    useEffect(() => {
        const fetchAPI = async () => {
            var dataAPI = await cartServices.getMyCart();

            setProducts(dataAPI?.CartItems);
        };
        fetchAPI();

        const interval = setInterval(() => {
            fetchAPI();
        }, 1 * 30 * 1000);

        return () => {
            clearInterval(interval);
        };
    }, [render, labelSelect, renderCart]);

    return (
        <div className={cx('container')}>
            <div className={cx('row')}>
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
            <div className={cx('row', 'main-layout')}>
                <div className={cx('col-12', 'col-sm-12', 'col-md-12', 'col-lg-9', 'col-xl-9')}>
                    <div className={cx('content')}>
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
                                                <input type="checkbox" className={cx('check')} value={index} />

                                                <img src={data?.Product?.ImageUrl} className={cx('image')} alt="Ảnh" />
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
                                                            {data?.Product.Price}
                                                            <span>₫</span>
                                                        </span>
                                                        <span className={cx('space')}></span>
                                                        <span className={cx('current-price')}>
                                                            {data?.Product.Price *
                                                                data?.Product?.Discount?.DiscountRate}
                                                            <span>₫</span>
                                                        </span>
                                                    </div>
                                                ) : (
                                                    <span className={cx('current-price')}>
                                                        {data?.Product.Price}
                                                        <span>₫</span>
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
                    <div className={cx('d-flex', 'justify-content-end', 'pay')}>
                        <div className={cx('col-12', 'col-sm-9', 'col-md-6', 'col-lg-4', 'col-xl-4')}>
                            <Button large primary border onClick={() => handlePayment()}>
                                Đặt hàng
                            </Button>
                        </div>
                    </div>
                </div>
                <div className={cx('d-none', 'd-sm-none', 'd-md-none', 'd-lg-block', 'd-xl-block', 'col-3')}>
                    <Policy />
                </div>
            </div>

            <ToastContainer />
        </div>
    );
}

export default Cart;
