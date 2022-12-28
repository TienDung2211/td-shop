import classNames from 'classnames/bind';
import styles from './ProductM.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPen } from '@fortawesome/free-solid-svg-icons';

import Button from '~/components/Button';

const cx = classNames.bind(styles);

function ProductMItem({ data, onClickUpdate, onClickRemove }) {
    return (
        <div className={cx('item')}>
            <img src={data.ImageUrl} className={cx('image')} alt="Ảnh" />
            <div className={cx('info')}>
                <div className={cx('main-info')}>
                    <span className={cx('name')}>{data.Name}</span>
                    <div className={cx('brand-discount')}>
                        <span className={cx('brand')}>Thương hiệu : {data.Brand.name}</span>
                        {data.Discount && <span className={cx('discount')}>Khuyến mãi : {data.Discount.Name}</span>}
                    </div>
                </div>
                <div className={cx('additional')}>
                    <span className={cx('price')}>
                        {data.Price}
                        <span>₫</span>
                    </span>
                    <span className={cx('amount')}>Đã bán : {data.SelAmount}</span>
                </div>
            </div>
            <Button
                className={cx('button')}
                transparent
                rounded
                iconOnly={<FontAwesomeIcon icon={faPen} />}
                onClick={onClickUpdate}
            ></Button>
            <Button
                className={cx('button')}
                transparent
                rounded
                iconOnly={<FontAwesomeIcon icon={faTrashCan} />}
                onClick={onClickRemove}
            ></Button>
        </div>
    );
}

export default ProductMItem;
