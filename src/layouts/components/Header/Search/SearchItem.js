import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function SearchItem({ data }) {
    return (
        <li className={cx('item-search')}>
            <Link to={`/detail-product/${data.Id}`} className={cx('item-link')}>
                <img src={data.ImageUrl} alt="Ảnh sản phẩm" className={cx('img')} />
                <div className={cx('info')}>
                    <span className={cx('name')}>{data.Name}</span>
                    <span className={cx('orther-info')}>
                        <div className={cx('price')}>
                            Giá : <span className={cx('value')}>{data.Price}</span>
                        </div>
                        <div className={cx('brand')}>
                            Thương hiệu : <span className={cx('value')}>{data.Brand.name}</span>
                        </div>
                    </span>
                </div>
            </Link>
        </li>
    );
}

export default SearchItem;
