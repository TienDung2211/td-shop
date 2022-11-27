import classNames from 'classnames/bind';
import styles from './Product.module.scss';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as fasStar, faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar, faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';

const cx = classNames.bind(styles);

function Product() {
    const [like, setLike] = useState(false);
    const handleLike = (e) => {
        e.preventDefault();
        setLike(!like);
    };
    return (
        <Link to="/detail-product">
            <div className={cx('item')}>
                <div
                    className={cx('item-img')}
                    style={{
                        backgroundImage:
                            'url(' +
                            'https://lh3.googleusercontent.com/ZroUaYUG5F_pnmh04KFZFdTWufWUmJEKvO4u31IlLnm6267NiqOhr0lpHJv_lfJs_C86d3odqV4v0SVun_7kG2k5L4bjVes=w500-rw' +
                            ')',
                    }}
                ></div>
                <div className={cx('item-content')}>
                    <h4 className={cx('item-name')}>
                        Điện thoại OPPO Reno7 Điện thoại Smartphone Top World Điện thoại OPPO Reno7
                    </h4>

                    <div className={cx('item-price')}>
                        <span className={cx('item-price--original')}>
                            8.990.000<span>₫</span>
                        </span>
                        <span className={cx('item-price--discount')}>
                            6.990.000<span>₫</span>
                        </span>
                    </div>

                    <div className={cx('item-action')}>
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
                    </div>

                    <div className={cx('item-origin')}>
                        <div className={cx('item-origin-name')}>SamSung</div>
                        <div className={cx('item-origin-location')}>America</div>
                    </div>

                    <div className={cx('item-favourite')}>
                        <i className={cx('fa-solid fa-check')}></i>
                        <span>Yêu thích</span>
                    </div>

                    <div className={cx('item-sale')}>
                        <span className={cx('item-sale__value')}>
                            10<span>%</span>
                        </span>
                        <span className={cx('item-sale__lable')}>Giảm</span>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default Product;
