import classNames from 'classnames/bind';
import { useState, useEffect, useContext, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Tooltip } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faBell, faBellSlash, faCartPlus } from '@fortawesome/free-solid-svg-icons';

import images from '~/assets/images';
import Button from '~/components/Button';
import Slider from '~/components/Slider';
import Product from '~/components/Product';
import DataContext from '~/context/DataContext';
import Policy from '~/components/Policy/Policy';
import cartServices from '~/services/cartServices';
import { ToastContainer, toast } from 'react-toastify';
import productServices from '~/services/productServices';
import Evaluate from '~/components/Evaluate';
import { useNavigate } from 'react-router-dom';
import styles from './DetailProduct.module.scss';

const cx = classNames.bind(styles);

function DetailProduct() {
    const { id } = useParams();

    const [slider, setSlider] = useState([]);
    const [product, setProduct] = useState(null);
    const [productByBrand, setProductByBrand] = useState([]);
    const [productSimilar, setProductSimilar] = useState([]);
    const [isFollow, setIsFollow] = useState(false);

    const [mCId, setMCId] = useState(0);
    const [cId, setCId] = useState(0);
    const [variations, setVariations] = useState([]);

    const navigate = useNavigate();

    const { render, renderCart, setRenderCart } = useContext(DataContext);

    const getProduct = async () => {
        let api = await productServices.getProductById(id);

        setProduct(api);

        let mainImg = { id: 0, url: api.ImageUrl, label: null };

        let images = Array.from(api.Images);

        images.unshift(mainImg);

        setSlider(images);

        setMCId(api.MCategoryId);

        // Product by Brand
        const brandIdTemp = api.Categories.find((item) => item.name.toLowerCase() === api.Brand.name.toLowerCase());
        if (brandIdTemp) {
            setCId(brandIdTemp.id);
        }
        const api2 = await productServices.getProductByBrand(api.Brand.id);
        if (api?.content !== []) {
            setProductByBrand(api2.content.filter((item) => item.Id !== parseInt(id)));
        } else setProductByBrand([]);

        // Similar Product
        const variationsNotBrand = api.Variations.filter(
            (item) => item.value.toLowerCase() !== api.Brand.name.toLowerCase(),
        );
        let variationsTemp = [];
        variationsNotBrand.forEach((item) => {
            variationsTemp.push(item.id);
        });
        setVariations(variationsTemp.join());
        const api3 = await productServices.getProducts(null, 0, variationsTemp.join(), null, 0, mCId);
        if (api3?.content !== []) {
            setProductSimilar(api3.content.filter((item) => item.Id !== parseInt(id)));
        } else setProductSimilar([]);
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

    const handleGoToPayment = () => {
        const data = [{ Product: product, Quantity: 1 }];

        navigate('/payment', { state: { data: data } });
    };

    const handleCheckFollow = async () => {
        const api = await productServices.checkFollowProduct(id);

        if (api?.status === 200) {
            setIsFollow(api.data);
        } else {
            setIsFollow(false);
        }
    };

    const handleFollowProduct = async () => {
        const api = await productServices.followProduct(id);

        if (api?.status) {
            toast.success('Theo dõi sản phẩm thành công.', {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-message',
            });
            setIsFollow(true);
        } else if (api === undefined) {
            toast.info('Vui lòng đăng nhập để theo dõi sản phẩm.', {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-message',
            });
        } else {
            toast.warning('Có lỗi bất ngờ xảy ra, vui lòng thử lại.', {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-message',
            });
            setIsFollow(false);
        }
    };

    const handleUnFollowProduct = async () => {
        const api = await productServices.unFollowProduct(id);

        if (api?.status) {
            toast.success('Hủy theo dõi sản phẩm thành công.', {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-message',
            });
            setIsFollow(false);
        } else {
            toast.warning('Có lỗi bất ngờ xảy ra, vui lòng thử lại.', {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-message',
            });
            setIsFollow(true);
        }
    };

    const memoizedDiv = useMemo(
        () => (
            <div className={cx('d-flex', 'justify-content-center', 'align-items-center')}>
                {isFollow ? (
                    <Tooltip title="Hủy theo dõi sản phẩm">
                        <Button
                            rounded
                            border
                            transparent
                            iconOnly={<FontAwesomeIcon icon={faBellSlash} onClick={() => handleUnFollowProduct()} />}
                        ></Button>
                    </Tooltip>
                ) : (
                    <Tooltip title="Theo dõi sản phẩm">
                        <Button
                            rounded
                            border
                            transparent
                            approach
                            iconOnly={<FontAwesomeIcon icon={faBell} />}
                            onClick={() => handleFollowProduct()}
                        ></Button>
                    </Tooltip>
                )}
            </div>
        ),
        [isFollow],
    );

    useEffect(() => {
        const interval = setInterval(async () => {
            await productServices.productClick({ productId: parseInt(id) });
        }, 15 * 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    useEffect(() => {
        getProduct();
        handleCheckFollow();
    }, [id, render]);

    return product ? (
        <div className={cx('container')}>
            <div className={cx('row', 'mb-5', 'hidden-by-mobile')}>
                <div className={cx('path', 'col-12', 'col-sm-12', 'col-md-9', 'col-lg-9', 'col-xl-6')}>
                    <Button to="/" transparent>
                        Trang chủ
                    </Button>
                    <Button disable transparent iconOnly={<FontAwesomeIcon icon={faAngleRight} />}></Button>{' '}
                    <div className={cx('page-name')}>
                        <span>{product.Name}</span>
                    </div>
                </div>
            </div>
            <div className={cx('row')}>
                <div className={cx('col-12', 'col-sm-12', 'col-md-12', 'col-lg-9', 'col-xl-9', 'content')}>
                    <div className={cx('row', 'main-info-layout')}>
                        <div className={cx('col-12', 'col-sm-12', 'col-md-5', 'col-lg-5', 'col-xl-5', 'image-layout')}>
                            {<Slider data={slider} />}
                        </div>
                        <div className={cx('col-12', 'col-sm-12', 'col-md-7', 'col-lg-7', 'col-xl-7', 'info')}>
                            <h4 className={cx('name')}>{product.Name}</h4>

                            <div className={cx('center')}>
                                <div className={cx('brand')}>
                                    Thương hiệu : <span className={cx('brand-name')}>{product.Brand.name}</span>
                                </div>
                                {product && product.Discount ? (
                                    <div className={cx('price')}>
                                        <span className={cx('price--original')}>
                                            {parseInt(product.Price).toLocaleString('vi-VN', {
                                                style: 'currency',
                                                currency: 'VND',
                                            })}
                                        </span>
                                        <div className={cx('sale')}>
                                            <span className={cx('sale__lable')}>Giảm</span>
                                            <span className={cx('sale__value')}>
                                                {Number(product.Discount.DiscountRate * 100)}
                                                <span>%</span>
                                            </span>
                                        </div>
                                        <span className={cx('price--discount')}>
                                            {parseInt(
                                                Number(product.Price) -
                                                    Number(product.Price * product.Discount.DiscountRate),
                                            ).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                        </span>
                                    </div>
                                ) : (
                                    <div className={cx('price')}>
                                        <span className={cx('price--discount')}>
                                            {parseInt(product.Price).toLocaleString('vi-VN', {
                                                style: 'currency',
                                                currency: 'VND',
                                            })}
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div className={cx('row', 'btn-layout')}>
                                <div
                                    className={cx(
                                        'col-2',
                                        'col-sm-4',
                                        'col-md-4',
                                        'col-lg-2',
                                        'col-xl-2',
                                        'd-flex',
                                        'justify-content-center',
                                        'align-items-center',
                                    )}
                                >
                                    {memoizedDiv}
                                </div>
                                <div className={cx('col-5', 'col-sm-8', 'col-md-8', 'col-lg-5', 'col-xl-5')}>
                                    <Button
                                        border
                                        outline
                                        large
                                        leftIcon={<FontAwesomeIcon icon={faCartPlus} />}
                                        onClick={() => handleAddCart()}
                                    >
                                        Thêm giỏ hàng
                                    </Button>
                                </div>
                                <div
                                    className={cx('col-5', 'col-sm-12', 'col-md-12', 'col-lg-5', 'col-xl-5', 'btn-pay')}
                                >
                                    {product.Total > 0 ? (
                                        <Button
                                            primary
                                            border
                                            large
                                            onClick={() => {
                                                handleGoToPayment();
                                            }}
                                        >
                                            Mua ngay
                                        </Button>
                                    ) : (
                                        <Button disable outline border large>
                                            Hết hàng
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('row', 'd-flex', 'justify-content-end')}>
                        {/* <div className={cx('col-5')}>
                            <div className={cx('free-list')}>
                                <div className={cx('free-lable')}>Sản phẩm tặng kèm</div>
                                <div className={cx('free-item')}>
                                    <div className={cx('free-item-image')}>
                                        <img
                                            src="https://lh3.googleusercontent.com/8clBU5pQcfH3gvh9PTtGwUNig-8L_SN3ONrnN62MjKjzMhuZPTbZ-JtonfiKdBElHCuFWp6rqALX1mROYPZZub6ZAamgOqLT=w500-rw"
                                            alt="Ảnh"
                                        />
                                    </div>
                                    <div className={cx('free-item-info')}>
                                        <div className={cx('free-item-name')}>Chuột máy tính Dareu LM115G (Đen)</div>
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
                            </div>
                        </div> */}
                        <div className={cx('col-12', 'col-sm-12', 'col-md-7', 'col-lg-7', 'col-xl-7')}>
                            <div className={cx('digital-info')}>
                                <div className={cx('digital-lable')}>Thông số kỹ thuật</div>

                                <div className={cx('digital-list')}>
                                    {product.Attributes.map((item, index) => {
                                        if (item.value !== '') {
                                            return (
                                                <div key={index} className={cx('digital-item')}>
                                                    <span className={cx('lable')}>{item.name}</span>
                                                    <span className={cx('value')}>{item.value}</span>
                                                </div>
                                            );
                                        }
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('row', 'mt-5')}>
                        <div className={cx('col-12', 'desc-info')}>
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
                <div className={cx('d-none', 'd-sm-none', 'd-md-none', 'd-lg-block', 'd-xl-block', 'col-3')}>
                    <Policy />
                </div>
            </div>
            {productSimilar?.length > 0 ? (
                <div className={cx('row', 'mt-5', 'other-layout')}>
                    <div className={cx('row', 'd-flex', 'justify-content-between')}>
                        <div className={cx('col-8', 'col-sm-8', 'col-md-6', 'col-lg-4', 'col-xl-4')}>
                            <span className={cx('orther-products-lable')}>Sản phẩm tương tự</span>
                        </div>
                        <div
                            className={cx(
                                'col-4',
                                'col-sm-3',
                                'col-md-3',
                                'col-lg-2',
                                'col-xl-2',
                                'd-flex',
                                'align-items-center',
                                'justify-content-end',
                            )}
                        >
                            <Button
                                to={`/sort/${mCId}/0?variations=${variations}`}
                                transparent
                                className={cx('view-all-btn')}
                            >
                                Xem tất cả {'>>'}
                            </Button>
                        </div>
                    </div>
                    <div className={cx('row')}>
                        <div className={cx('products-list')}>
                            {productSimilar.map((product, index) => (
                                <Product data={product} key={index} />
                            ))}
                        </div>
                    </div>
                </div>
            ) : null}
            {productByBrand?.length > 0 ? (
                <div className={cx('row', 'mt-5', 'other-layout')}>
                    <div className={cx('row', 'd-flex', 'justify-content-between')}>
                        <div className={cx('col-8', 'col-sm-8', 'col-md-6', 'col-lg-4', 'col-xl-4')}>
                            <span className={cx('orther-products-lable')}>Cùng thương hiệu {product.Brand.name}</span>
                        </div>
                        <div
                            className={cx(
                                'col-4',
                                'col-sm-3',
                                'col-md-3',
                                'col-lg-2',
                                'col-xl-2',
                                'd-flex',
                                'align-items-center',
                                'justify-content-end',
                            )}
                        >
                            <Button to={`/sort/${mCId}/${cId}`} transparent className={cx('view-all-btn')}>
                                Xem tất cả {'>>'}
                            </Button>
                        </div>
                    </div>
                    <div className={cx('row')}>
                        <div className={cx('products-list')}>
                            {productByBrand.map((product, index) => (
                                <Product data={product} key={index} />
                            ))}
                        </div>
                    </div>
                </div>
            ) : null}

            <div className={cx('row', 'mt-5', 'other-layout')}>
                <Evaluate />
            </div>

            <ToastContainer />
        </div>
    ) : null;
}

export default DetailProduct;
