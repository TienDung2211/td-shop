import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function SearchItem({ data, onClickItem }) {
    return (
        <li
            className={cx('item-search')}
            onClick={(e) => {
                e.preventDefault();
                onClickItem();
            }}
        >
            <Link to={`/detail-product/${data.Id}`} className={cx('item-link')} preventScrollReset={true}>
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
