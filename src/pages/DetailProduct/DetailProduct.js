import classNames from 'classnames/bind';
import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import styles from './DetailProduct.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faStar as fasStar, faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';

import images from '~/assets/images';
import Modal from '~/components/Modal';
import Button from '~/components/Button';
import Slider from '~/components/Slider';
import Payment from '~/components/Payment';
import Product from '~/components/Product';
import DataContext from '~/context/DataContext';
import Policy from '~/components/Policy/Policy';
import cartServices from '~/services/cartServices';
import { ToastContainer, toast } from 'react-toastify';
import productServices from '~/services/productServices';

const cx = classNames.bind(styles);

function DetailProduct() {
    const { id } = useParams();
    const [slider, setSlider] = useState([]);
    const [product, setProduct] = useState(null);
    const [data, setData] = useState([]);
    const [showPayment, setShowPayment] = useState(false);
    const [productByBrand, setProductByBrand] = useState([]);

    const { render, renderCart, setRenderCart } = useContext(DataContext);

    const getProduct = async () => {
        let api = await productServices.getProductById(id);

        setProduct(api);

        let mainImg = { id: 0, url: api.ImageUrl, label: null };

        let images = Array.from(api.Images);

        images.unshift(mainImg);

        setSlider(images);
    };

    const getProductByBrand = async () => {
        if (product) {
            let api = await productServices.getProductByBrand(product?.Brand?.id);
            setProductByBrand(api?.content);
        } else setProductByBrand([]);
    };

    const handleAddCart = async () => {
        let api = await cartServices.addCart(id);

        if (api?.status === 200) {
            toast.success('Thêm sản phẩm vào giỏ hàng thành công.', {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-message',
            });
            setRenderCart(!renderCart);
        } else if (api === undefined) {
            toast.info('Đăng nhập để thêm giỏ hàng.', {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-message',
            });
        }
    };

    const handlePaymentSuccess = () => {
        setShowPayment(false);
        toast.success('Đặt hàng thành công. Truy cập Cài đặt -> Đơn hàng để xem chi tiết', {
            position: toast.POSITION.TOP_RIGHT,
            className: 'toast-message',
        });
        setRenderCart(!renderCart);
    };

    useEffect(() => {
        getProduct();
        getProductByBrand();
    }, [id, render]);

    return product ? (
        <div className={cx('wrapper')}>
            <div className={cx('grid-full-width')}>
                <div className={cx('grid-row')}>
                    <div className={cx('path')}>
                        <Button to="/" transparent>
                            Trang chủ
                        </Button>
                        <Button disable transparent iconOnly={<FontAwesomeIcon icon={faAngleRight} />}></Button>{' '}
                        <div className={cx('product-name')}>
                            <span>{product.Name}</span>
                        </div>
                    </div>
                </div>
                <div className={cx('grid-row', 'main-layout')}>
                    <div className={cx('grid-column-9')}>
                        <div className={cx('content')}>
                            <div className={cx('grid-row', 'main-info-layout')}>
                                <div className={cx('grid-column-40percent')}>{<Slider data={slider} />}</div>
                                <div className={cx('grid-column-60percent')}>
                                    <div className={cx('info')}>
                                        <div>
                                            <h4 className={cx('name')}>{product.Name}</h4>

                                            <div className={cx('origin')}>
                                                <div className={cx('origin-lable')}>
                                                    Thương hiệu :{' '}
                                                    <span className={cx('origin-name')}>{product.Brand.name}</span>
                                                </div>
                                                {/* <span className={cx('separation')}></span> */}
                                                {/* <div className={cx('origin-location')}>America</div> */}
                                            </div>
                                        </div>

                                        <div>
                                            {product && product.Discount ? (
                                                <div className={cx('price')}>
                                                    <span className={cx('price--original')}>
                                                        {Number(product.Price)}
                                                        <span>₫</span>
                                                    </span>
                                                    <div className={cx('sale')}>
                                                        <span className={cx('sale__lable')}>Giảm</span>
                                                        <span className={cx('sale__value')}>
                                                            {Number(product.Discount.DiscountRate * 100)}
                                                            <span>%</span>
                                                        </span>
                                                    </div>
                                                    <span className={cx('price--discount')}>
                                                        {Number(product.Price) -
                                                            Number(product.Price * product.Discount.DiscountRate)}
                                                        <span>₫</span>
                                                    </span>
                                                </div>
                                            ) : (
                                                <div className={cx('price')}>
                                                    <span className={cx('price--discount')}>
                                                        {Number(product.Price)}
                                                        <span>₫</span>
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        <div>
                                            <div className={cx('quality')}>
                                                <span className={cx('quality-lable')}>Đánh giá : </span>
                                                <div className={cx('rating')}>
                                                    <FontAwesomeIcon
                                                        icon={fasStar}
                                                        className={cx('rated', 'icon-rate')}
                                                    />
                                                    <FontAwesomeIcon
                                                        icon={fasStar}
                                                        className={cx('rated', 'icon-rate')}
                                                    />
                                                    <FontAwesomeIcon
                                                        icon={fasStar}
                                                        className={cx('rated', 'icon-rate')}
                                                    />
                                                    <FontAwesomeIcon
                                                        icon={fasStar}
                                                        className={cx('rated', 'icon-rate')}
                                                    />
                                                    <FontAwesomeIcon icon={farStar} className={cx('icon-rate')} />
                                                </div>

                                                <span className={cx('sold')}>
                                                    Đã bán
                                                    <span className={cx('sold-amount')}>
                                                        <span>(</span>99<span>)</span>
                                                    </span>
                                                </span>
                                            </div>

                                            <div className={cx('btn-layout')}>
                                                <div className={cx('grid-column-50percent')}>
                                                    <Button
                                                        border
                                                        outline
                                                        large
                                                        leftIcon={<FontAwesomeIcon icon={faCartPlus} />}
                                                        onClick={() => handleAddCart()}
                                                    >
                                                        Thêm vào giỏ hàng
                                                    </Button>
                                                </div>
                                                <div className={cx('grid-column-50percent')}>
                                                    {product.Status.Id === 2 ? (
                                                        <Button
                                                            primary
                                                            border
                                                            large
                                                            onClick={() => {
                                                                setData([{ Product: product, Quantity: 1 }]);
                                                                setShowPayment(true);
                                                            }}
                                                        >
                                                            Mua ngay
                                                        </Button>
                                                    ) : (
                                                        <Button disable outline border large>
                                                            Sản phẩm hiện hết hàng
                                                        </Button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('grid-row', 'info-add')}>
                                <div className={cx('grid-column-40percent')}>
                                    {/* <div className={cx('free-list')}>
                                        <div className={cx('free-lable')}>Sản phẩm tặng kèm</div>
                                        <div className={cx('free-item')}>
                                            <div className={cx('free-item-image')}>
                                                <img
                                                    src="https://lh3.googleusercontent.com/8clBU5pQcfH3gvh9PTtGwUNig-8L_SN3ONrnN62MjKjzMhuZPTbZ-JtonfiKdBElHCuFWp6rqALX1mROYPZZub6ZAamgOqLT=w500-rw"
                                                    alt="Ảnh"
                                                />
                                            </div>
                                            <div className={cx('free-item-info')}>
                                                <div className={cx('free-item-name')}>
                                                    Chuột máy tính Dareu LM115G (Đen)
                                                </div>
                                                <div className={cx('free-item-price')}>
                                                    350.000 <span>₫</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={cx('free-item')}>
                                            <div className={cx('free-item-image')}>
                                                <img
                                                    src="https://lh3.googleusercontent.com/qRrzXfxMNDS0l_4CQLWdP6adXw5GYobdVEkra-rP43h4OV_GYWNXU9yNUARFaCbE0GIPLLxMVkbNs0E0BWrwdaAJN_RqHeJd=w500-rw"
                                                    alt="Ảnh"
                                                />
                                            </div>
                                            <div className={cx('free-item-info')}>
                                                <div className={cx('free-item-name')}>Bàn phím Dareu LK185</div>
                                                <div className={cx('free-item-price')}>
                                                    159.000 <span>₫</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={cx('free-item')}>
                                            <div className={cx('free-item-image')}>
                                                <img
                                                    src="https://lh3.googleusercontent.com/K9WLhOq8cL0l53OQYXChl2BvX6iw0FoZEETyiO5U0p6xWkvZBhsxl35jc1f-7l150U07o_k9GPxwHD0WWpM=rw-w230"
                                                    alt="Ảnh"
                                                />
                                            </div>
                                            <div className={cx('free-item-info')}>
                                                <div className={cx('free-item-name')}>
                                                    Tai nghe Over-ear Dareu EH925s (Đen,Đỏ)
                                                </div>
                                                <div className={cx('free-item-price')}>
                                                    769.000 <span>₫</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div> */}
                                </div>
                                <div className={cx('grid-column-60percent')}>
                                    <div className={cx('digital-info')}>
                                        <div className={cx('digital-lable')}>Thông số kỹ thuật</div>

                                        <div className={cx('digital-list')}>
                                            {product.Attributes.map((item) => (
                                                <div key={item.id} className={cx('digital-item')}>
                                                    <span className={cx('lable')}>{item.name}</span>
                                                    <span className={cx('value')}>{item.value}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('grid-row', 'desc-info')}>
                                <div className={cx('desc-lable')}>Mô tả sản phẩm</div>
                                <div className={cx('desc-introduce')}>
                                    <p>{product.Description}</p>
                                </div>
                                <div
                                    className={cx('image')}
                                    style={{
                                        backgroundImage: `url('${product ? product.ImageUrl : images.imgError}')`,
                                    }}
                                ></div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('grid-column-3')}>
                        <Policy />
                    </div>
                </div>
                {productByBrand?.length > 0 ? (
                    <div className={cx('grid-row', 'other-products-layout')}>
                        <div className={cx('grid-row', 'other-products')}>
                            <div className={cx('grid-column-4')}>
                                <span className={cx('orther-products-lable')}>
                                    Cùng thương hiệu {product.Brand.name}
                                </span>
                            </div>
                            <div className={cx('grid-column-2')}>
                                <Button to="/sort" transparent large className={cx('view-all-btn')}>
                                    Xem tất cả {'>>'}
                                </Button>
                            </div>
                        </div>
                        <div className={cx('grid-row')}>
                            {productByBrand.map((product, index) => {
                                if (index < 5) {
                                    return (
                                        <div className={cx('grid-column-20percent')} key={index}>
                                            <Product data={product} />
                                        </div>
                                    );
                                } else {
                                    return null;
                                }
                            })}
                        </div>
                    </div>
                ) : null}
            </div>
            <ToastContainer />
            {showPayment && (
                <Modal closeModal={() => setShowPayment(false)}>
                    <Payment data={data} clickBack={() => setShowPayment(false)} onPayment={handlePaymentSuccess} />
                </Modal>
            )}
        </div>
    ) : null;
}

export default DetailProduct;
