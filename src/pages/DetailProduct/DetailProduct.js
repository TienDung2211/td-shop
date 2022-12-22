import classNames from 'classnames/bind';
import styles from './DetailProduct.module.scss';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faStar as fasStar, faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';

import Button from '~/components/Button';
// import Product from '~/components/Product';
import Slider from '~/components/Slider';
import Policy from '~/components/Policy/Policy';
import productServices from '~/services/productServices';
import cartServices from '~/services/cartServices';
import images from '~/assets/images';

const cx = classNames.bind(styles);

function DetailProduct() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [slider, setSlider] = useState([]);

    const handleAddCart = async () => {
        let data = await cartServices.addCart(Number(id));

        console.log(data);
    };

    useEffect(() => {
        const fetchAPI = async () => {
            let dataAPI = await productServices.getProductById(id);

            setProduct(dataAPI);

            let mainImg = { id: 0, url: dataAPI.ImageUrl, label: null };

            let images = Array.from(dataAPI.Images);

            images.unshift(mainImg);

            setSlider(images);
        };

        fetchAPI();
    }, [id]);

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
                                                        <Button primary border large>
                                                            Mua hàng
                                                        </Button>
                                                    ) : (
                                                        <Button disable outline border large>
                                                            Mua hàng
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
                <div className={cx('grid-row', 'other-products-layout')}>
                    <div className={cx('grid-row', 'other-products')}>
                        <div className={cx('grid-column-4')}>
                            <span className={cx('orther-products-lable')}>Cùng thương hiệu {product.Brand.name}</span>
                        </div>
                        <div className={cx('grid-column-2')}>
                            <Button to="/sort" transparent large className={cx('view-all-btn')}>
                                Xem tất cả {'>>'}
                            </Button>
                        </div>
                    </div>
                    <div className={cx('grid-row')}>
                        {/* <div className={cx('grid-column-20percent')}>
                            <Product />
                        </div>
                        <div className={cx('grid-column-20percent')}>
                            <Product />
                        </div>
                        <div className={cx('grid-column-20percent')}>
                            <Product />
                        </div>
                        <div className={cx('grid-column-20percent')}>
                            <Product />
                        </div>
                        <div className={cx('grid-column-20percent')}>
                            <Product />
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    ) : null;
}

export default DetailProduct;
