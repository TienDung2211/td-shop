import classNames from 'classnames/bind';
import styles from './Product.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Product({ data }) {
    return data ? (
        <Link to={`/detail-product/${data.Id}`} className={cx('wrapper')}>
            <div key={data.Id.toString()} className={cx('item')}>
                <div
                    className={cx('item-img')}
                    style={{
                        backgroundImage: `url('${data.ImageUrl}')`,
                    }}
                ></div>
                <div className={cx('item-content')}>
                    <h4 className={cx('item-name')}>{data.Name}</h4>

                    {data.Discount ? (
                        <div>
                            <div className={cx('item-price')}>
                                <span className={cx('item-price--original')}>
                                    {parseInt(data.Price).toLocaleString('vi-VN', {
                                        style: 'currency',
                                        currency: 'VND',
                                    })}
                                </span>
                                <span className={cx('item-price--discount')}>
                                    {parseInt(
                                        Number(data.Price) - Number(data.Price * data.Discount.DiscountRate),
                                    ).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                </span>
                            </div>
                            <div className={cx('item-sale')}>
                                <span className={cx('item-sale__value')}>
                                    {Number(data.Discount.DiscountRate * 100)}
                                    <span>%</span>
                                </span>
                                <span className={cx('item-sale__lable')}>Giảm</span>
                            </div>
                        </div>
                    ) : (
                        <div className={cx('item-price')}>
                            <span className={cx('item-price--discount')}>
                                {parseInt(data.Price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                            </span>
                        </div>
                    )}

                    {/* <div className={cx('item-action')}>
                        <span className={cx('item-like')} onClick={handleLike}>
                            {like ? <FontAwesomeIcon icon={fasHeart} /> : <FontAwesomeIcon icon={farHeart} />}
                        </span>

                        <div className={cx('item-rating')}>
                            <FontAwesomeIcon icon={fasStar} className={cx('rated', 'icon-rate')} />
                            <FontAwesomeIcon icon={fasStar} className={cx('rated', 'icon-rate')} />
                            <FontAwesomeIcon icon={fasStar} className={cx('rated', 'icon-rate')} />
                            <FontAwesomeIcon icon={fasStar} className={cx('rated', 'icon-rate')} />
                            <FontAwesomeIcon icon={farStar} className={cx('icon-rate')} />
                        </div>

                        <span className={cx('item-action-sold')}>
                            Đã bán
                            <span className={cx('item-action-sold-amount')}>
                                <span>(</span>99<span>)</span>
                            </span>
                        </span>
                    </div> */}

                    {/* <div className={cx('item-origin')}>
                        <div className={cx('item-origin-name')}>{data.Brand}</div>
                        <div className={cx('item-origin-location')}>America</div>
                    </div> */}

                    {/* <div className={cx('item-favourite')}>
                        <i className={cx('fa-solid fa-check')}></i>
                        <span>Yêu thích</span>
                    </div> */}

                    <div className={cx('orther-data')}>
                        <div className={cx('brand')}>
                            {/* <span className={cx('hidden-by-mobile')}>
                                Thương hiệu :<br></br>
                            </span>{' '} */}
                            {data.Brand.name}
                        </div>
                        {/* <span className={cx('sel-amount')}>
                            Đã bán{' '}
                            <span className={cx('amount')}>
                                <span>(</span>
                                {data.SelAmount}
                                <span>)</span>
                            </span>
                        </span> */}
                        <span className={cx('sel-amount')}>
                            Còn lại{' '}
                            <span className={cx('amount')}>
                                <span>(</span>
                                {data.Total}
                                <span>)</span>
                            </span>
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    ) : null;
}

export default Product;
