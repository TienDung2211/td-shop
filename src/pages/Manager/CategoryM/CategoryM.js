import classNames from 'classnames/bind';
import styles from './CategoryM.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import Button from '~/components/Button';
import CategoryMItem from './CategoryMItem';

const cx = classNames.bind(styles);

const items = [
    'Intel Core i3',
    'Intel Core i5',
    'Intel Core i7',
    'Intel Core i9',
    'AMD Ryzen 3',
    'AMD Ryzen 5',
    'AMD Ryzen 7',
    'Intel Core i3',
    'Intel Core i5',
    'Intel Core i7',
    'Intel Core i9',
    'AMD Ryzen 3',
    'AMD Ryzen 5',
    'AMD Ryzen 7',
    'Intel Core i3',
    'Intel Core i5',
    'Intel Core i7',
    'Intel Core i9',
    'AMD Ryzen 3',
    'AMD Ryzen 5',
    'AMD Ryzen 7',
];

function CategoryM() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('control')}>
                <Button rounded approach iconOnly={<FontAwesomeIcon icon={faPlus} />}></Button>
                <form className={cx('control-filt')}>
                    <div className={cx('input-layout')}>
                        <input className={cx('input')} type="text" placeholder="Nhập tên tìm kiếm"></input>
                    </div>

                    <div className={cx('button-layout')}>
                        <Button primary border>
                            Áp dụng
                        </Button>
                    </div>
                </form>
            </div>

            <div className={cx('results')}>
                {items.map((item) => {
                    return (
                        <div className={cx('grid-column-50percent')}>
                            <CategoryMItem data={item} />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default CategoryM;
