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
    const [labelSelect, setLabelSelect] = useState('Chọn tất cả');
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
            setLabelSelect('Hủy chọn tất cả');
        } else {
            const checkBox = document.querySelectorAll('input[type=checkbox]');

            for (let i = 0; i < checkBox.length; i++) {
                if (checkBox[i].checked) {
                    checkBox[i].checked = false;
                }
            }
            setLabelSelect('Chọn tất cả');
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

        navigate('/payment', { state: { data: select } });
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
                <div className={cx('path')}>
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
                <div className={cx('col-9')}>
                    <div className={cx('row', 'content')}>
                        <div className={cx('column-lable')}>
                            <div className={cx('grid-column-50percent')}>
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
                            <div className={cx('grid-column-10percent')}>Giá</div>
                            <div className={cx('grid-column-15percent', 'amount')}>Số lượng</div>
                            <div className={cx('grid-column-15percent')}>Khuyến mãi</div>
                            <div className={cx('grid-column-10percent')}></div>
                        </div>
                        {products && (
                            <div className={cx('cart-list')}>
                                {products.map((data, index) => (
                                    <div key={index} className={cx('cart-item')}>
                                        <div className={cx('grid-column-50percent')}>
                                            <div className={cx('select-layout')}>
                                                <input type="checkbox" className={cx('check')} value={index} />
                                                <div className={cx('select-lable')}>
                                                    <img
                                                        src={data?.Product?.ImageUrl}
                                                        className={cx('select-image')}
                                                        alt="Ảnh"
                                                    />
                                                    <span className={cx('select-text')}>{data?.Product.Name}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={cx('grid-column-10percent')}>
                                            {data?.Product.Price}
                                            <span>₫</span>
                                        </div>
                                        <div className={cx('grid-column-15percent', 'amount-layout')}>
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
                                        <div className={cx('grid-column-15percent')}>
                                            {data?.Product?.Discount ? (
                                                <span className={cx('discount-value')}>
                                                    {data?.Product?.Discount?.DiscountRate * 100} %
                                                </span>
                                            ) : null}
                                        </div>
                                        <div className={cx('grid-column-10percent', 'delete-layout')}>
                                            <Button
                                                small
                                                transparent
                                                className={cx('delete-btn')}
                                                onClick={() => {
                                                    removeCart(data?.Product.Id);
                                                }}
                                            >
                                                Xóa
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className={cx('grid-row', 'pay')}>
                        <div className={cx('grid-column-8')}></div>
                        <div className={cx('grid-column-4')}>
                            <Button large primary border onClick={() => handlePayment()}>
                                Thanh toán
                            </Button>
                        </div>
                    </div>
                </div>
                <div className={cx('col-3')}>
                    <Policy />
                </div>
            </div>

            <ToastContainer />
        </div>
    );
}

export default Cart;
