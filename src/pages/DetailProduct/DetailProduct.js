import classNames from 'classnames/bind';
import styles from './DetailProduct.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faStar as fasStar, faTruckFast, faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';

import Button from '~/components/Button';
import ProductItem from '~/components/Product';
import Slider from '~/components/Slider';

const cx = classNames.bind(styles);

const dataSlider = [
    {
        id: 0,
        linkImage:
            'https://lh3.googleusercontent.com/ZroUaYUG5F_pnmh04KFZFdTWufWUmJEKvO4u31IlLnm6267NiqOhr0lpHJv_lfJs_C86d3odqV4v0SVun_7kG2k5L4bjVes=w500-rw',
        limited: true,
    },
    {
        id: 1,
        linkImage:
            'https://lh3.googleusercontent.com/E9q2Kuo8GO6Vx4ZhdMWEcR5xZXMwF5f00dzjydssulUrW3u0aHzQbaHfgl8rO_wUAbadg8nfCUx6voN_FlKkoA-mUya9M2EXjg=w500-rw',
        limited: false,
    },
    {
        id: 2,
        linkImage:
            'https://lh3.googleusercontent.com/_Js6-mEXNrYmuYtMR96OBQ_7WuSleMhgEtFZgP9dW8sFnSf_87EI7L9dRlCTuZcH-arsDW4Xr3Tp0-hX7TYjgDBWznyM8ZC0=w500-rw',
        limited: false,
    },
    {
        id: 3,
        linkImage:
            'https://lh3.googleusercontent.com/PwPy9zoqSVsXT9eyFLvjXi1v3wFr9RwwxEqoRpqElRLx_ASAIJ2p_fsBaiDvM8_qdMjhw2or2gd3U0UtF4ad7xQ1TD8NNts=w500-rw',
        limited: true,
    },
    {
        id: 4,
        linkImage:
            'https://lh3.googleusercontent.com/H3NP-ZBBAYuhRy4aQLU4ZLetwMk3nkHQWM9QsCnyGOvGC9FxESTD_dAWSuRxTzDhQTsj6oztszSN09y_4zVnQQRZJXf66w=w500-rw',
        limited: true,
    },
];

function DetailProduct() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('grid-full-width')}>
                <div className={cx('grid-row')}>
                    <div className={cx('path')}>
                        <Button to="/" transparent>
                            Trang chủ
                        </Button>
                        <Button disable transparent iconOnly={<FontAwesomeIcon icon={faAngleRight} />}></Button>{' '}
                        <div className={cx('product-name')}>
                            <span>
                                Laptop Lenovo Ideapad Slim 5 15ITL05 82FG01HPVN (15.6" Intel Core i5-1135G7/16GB/512GB
                                SSD/Windows 11 Home SL/1.7kg)
                            </span>
                        </div>
                    </div>
                </div>
                <div className={cx('grid-row', 'main-layout')}>
                    <div className={cx('grid-column-9')}>
                        <div className={cx('content')}>
                            <div className={cx('grid-row')}>
                                <div className={cx('grid-column-40percent')}>
                                    <Slider data={dataSlider} />
                                </div>
                                <div className={cx('grid-column-60percent')}>
                                    <div className={cx('info')}>
                                        <div>
                                            <h4 className={cx('name')}>
                                                Laptop Lenovo Ideapad Slim 5 15ITL05 82FG01HPVN (15.6" Intel Core
                                                i5-1135G7/16GB/512GB SSD/Windows 11 Home SL/1.7kg)
                                            </h4>

                                            <div className={cx('origin')}>
                                                <div className={cx('origin-lable')}>
                                                    Thương hiệu : <span className={cx('origin-name')}>Lenovo</span>
                                                </div>
                                                <span className={cx('separation')}></span>
                                                <div className={cx('origin-location')}>America</div>
                                            </div>
                                        </div>

                                        <div>
                                            <div className={cx('price')}>
                                                <span className={cx('price--original')}>
                                                    21.490.000<span>₫</span>
                                                </span>
                                                <div className={cx('sale')}>
                                                    <span className={cx('sale__lable')}>Giảm</span>
                                                    <span className={cx('sale__value')}>
                                                        22<span>%</span>
                                                    </span>
                                                </div>
                                                <span className={cx('price--discount')}>
                                                    17.490.000<span>₫</span>
                                                </span>
                                            </div>
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
                                                <Button
                                                    border
                                                    outline
                                                    large
                                                    leftIcon={<FontAwesomeIcon icon={faCartPlus} />}
                                                    className={cx('btn-item')}
                                                >
                                                    Thêm vào giỏ hàng
                                                </Button>
                                                <Button primary border large className={cx('btn-item')}>
                                                    Mua hàng
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('grid-row', 'info-add')}>
                                <div className={cx('grid-column-40percent')}>
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
                                    </div>
                                </div>
                                <div className={cx('grid-column-60percent')}>
                                    <div className={cx('digital-info')}>
                                        <div className={cx('digital-lable')}>Thông số kỹ thuật</div>
                                        <div className={cx('digital-list')}>
                                            <div className={cx('digital-item')}>
                                                <span className={cx('lable')}>CPU</span>
                                                <span className={cx('value')}>Intel Core i3-10110U</span>
                                            </div>
                                            <div className={cx('digital-item')}>
                                                <span className={cx('lable')}>Màn hình</span>
                                                <span className={cx('value')}>15.6" IPS (1920 x 1080)</span>
                                            </div>
                                            <div className={cx('digital-item')}>
                                                <span className={cx('lable')}>RAM</span>
                                                <span className={cx('value')}>
                                                    8GB (4GB + 4GB Onboard) DDR4 2666MHz 8GB (4GB + 4GB Onboard) DDR4
                                                    2666MHz
                                                </span>
                                            </div>
                                            <div className={cx('digital-item')}>
                                                <span className={cx('lable')}>Đồ họa</span>
                                                <span className={cx('value')}>Intel UHD Graphics</span>
                                            </div>
                                            <div className={cx('digital-item')}>
                                                <span className={cx('lable')}>Lưu trữ</span>
                                                <span className={cx('value')}>256GB SSD M.2 NVMe</span>
                                            </div>
                                            <div className={cx('digital-item')}>
                                                <span className={cx('lable')}>Hệ điều hành</span>
                                                <span className={cx('value')}>Windows 11 Home</span>
                                            </div>
                                            <div className={cx('digital-item')}>
                                                <span className={cx('lable')}>Pin</span>
                                                <span className={cx('value')}>2 cell Pin liền</span>
                                            </div>
                                            <div className={cx('digital-item')}>
                                                <span className={cx('lable')}>Khối lượng</span>
                                                <span className={cx('value')}>1.7 kg</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('grid-row', 'desc-info')}>
                                <div className={cx('desc-lable')}>Mô tả sản phẩm</div>
                                <div className={cx('desc-introduce')}>
                                    <p>
                                        Lenovo Ideapad Slim 5 15ITL05-82FG01HPVN Xám thuộc top sản phẩm nằm ở phân khúc
                                        cao cấp đến từ nhà Lenovo đình đám. Sở hữu một thiết kế mỏng nhẹ được gia công
                                        tinh xảo, cùng với hiệu năng ổn định sẽ giúp đáp ứng tốt mọi nhu cầu cơ bản hàng
                                        ngày của người sử dụng phổ thông.
                                    </p>
                                </div>
                                <div className={cx('desc-item')}>
                                    <div className={cx('desc-item-title')}>
                                        Thiết kế mỏng nhẹ cho cảm giác sang trọng, trọng lượng nhẹ chỉ 1.7kg thuận tiện
                                        di chuyển
                                    </div>
                                    <p>
                                        Laptop Lenovo Ideapad Slim 5 sở hữu cho mình một kiểu dáng khá mỏng nhẹ với gam
                                        màu xám là chủ đạo, kết hợp với mặt lưng trơn và các góc được bo tròn tạo cảm
                                        giác sang trọng cho người dùng. Với kiểu thiết kế này sẽ phù hợp cho những người
                                        làm văn phòng hay sinh viên yêu thích sự đơn giản.
                                    </p>
                                    <div className={cx('desc-item-image')}>
                                        <img
                                            src="https://storage.googleapis.com/teko-gae.appspot.com/media/image/2022/8/16/20220816_9c6f1d45-95e7-43c9-b1e5-f9876f7463f2.png"
                                            alt="Ảnh"
                                            className={cx('image')}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('grid-column-3')}>
                        <div className={cx('other-content')}>
                            <div className={cx('free-ship')}>
                                <FontAwesomeIcon icon={faTruckFast} className={cx('icon')} />
                                <span>Sản phẩm được miễn phí giao hàng</span>
                            </div>
                            <div className={cx('policy')}>
                                <div className={cx('policy-list')}>
                                    <div className={cx('policy-lable')}>
                                        <span>Chính sách bán hàng</span>
                                    </div>
                                    <div className={cx('policy-item')}>
                                        <div className={cx('icon')}>
                                            <FontAwesomeIcon icon={faTruckFast} />
                                        </div>
                                        <span>Miễn phí giao hàng cho đơn hàng từ 800K</span>
                                    </div>
                                    <div className={cx('policy-item')}>
                                        <div className={cx('icon')}>
                                            <FontAwesomeIcon icon={faTruckFast} />
                                        </div>
                                        <span>Cam kết hàng chính hãng 100%</span>
                                    </div>
                                    <div className={cx('policy-item')}>
                                        <div className={cx('icon')}>
                                            <FontAwesomeIcon icon={faTruckFast} />
                                        </div>
                                        <span>Đổi trả trong vòng 10 ngày</span>
                                    </div>
                                </div>
                                <div className={cx('policy-list')}>
                                    <div className={cx('policy-lable')}>
                                        <span>Dịch vụ khác</span>
                                    </div>
                                    <div className={cx('policy-item')}>
                                        <div className={cx('icon')}>
                                            <FontAwesomeIcon icon={faTruckFast} />
                                        </div>
                                        <span>Sửa chữa đồng giá 150.000đ.</span>
                                    </div>
                                    <div className={cx('policy-item')}>
                                        <div className={cx('icon')}>
                                            <FontAwesomeIcon icon={faTruckFast} />
                                        </div>
                                        <span>Vệ sinh máy tính, laptop.</span>
                                    </div>
                                    <div className={cx('policy-item')}>
                                        <div className={cx('icon')}>
                                            <FontAwesomeIcon icon={faTruckFast} />
                                        </div>
                                        <span>Bảo hành tại nhà.</span>
                                    </div>
                                </div>
                                <a to="/" href="/" className={cx('view-add')}>
                                    Xem chi tiết
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('grid-row', 'other-products-layout')}>
                    <div className={cx('grid-row', 'other-products')}>
                        <div className={cx('grid-column-4')}>
                            <span className={cx('orther-products-lable')}>Cùng thương hiệu Lenovo</span>
                        </div>
                        <div className={cx('grid-column-2')}>
                            <Button to="/sort" transparent large className={cx('view-all-btn')}>
                                Xem tất cả {'>>'}
                            </Button>
                        </div>
                    </div>
                    <div className={cx('grid-row')}>
                        <div className={cx('grid-column-2')}>
                            <ProductItem />
                        </div>
                        <div className={cx('grid-column-2')}>
                            <ProductItem />
                        </div>
                        <div className={cx('grid-column-2')}>
                            <ProductItem />
                        </div>
                        <div className={cx('grid-column-2')}>
                            <ProductItem />
                        </div>
                        <div className={cx('grid-column-2')}>
                            <ProductItem />
                        </div>
                        <div className={cx('grid-column-2')}>
                            <ProductItem />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailProduct;
