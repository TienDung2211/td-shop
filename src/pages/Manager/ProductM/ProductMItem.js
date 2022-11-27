import classNames from 'classnames/bind';
import styles from './ProductM.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserSlash, faPen } from '@fortawesome/free-solid-svg-icons';

import Button from '~/components/Button';

const cx = classNames.bind(styles);

function ProductMItem({ data }) {
    return (
        <div className={cx('item')}>
            <img src={data.image} className={cx('image')} alt="Ảnh" />
            <div className={cx('info')}>
                <span className={cx('name')}>{data.name}</span>
                <div className={cx('additional')}>
                    <span className={cx('price')}>
                        {data.price}
                        <span>₫</span>
                    </span>
                    <span className={cx('vender')}>{data.vender}</span>
                    <span className={cx('location')}>{data.location}</span>
                </div>
            </div>
            <Button className={cx('button')} transparent rounded iconOnly={<FontAwesomeIcon icon={faPen} />}></Button>
            <Button
                className={cx('button')}
                transparent
                rounded
                iconOnly={<FontAwesomeIcon icon={faUserSlash} />}
            ></Button>
        </div>
    );
}

export default ProductMItem;
