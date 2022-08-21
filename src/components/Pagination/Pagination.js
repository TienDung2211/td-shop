import classNames from 'classnames/bind';
import styles from './Pagination.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

import Button from '~/components/Button';

const cx = classNames.bind(styles);

function Pagigation() {
    return (
        <div className={cx('wrapper')}>
            <ul className={cx('pagination', 'products-list__pagination')}>
                <li className={cx('pagination-item')}>
                    <a href="" className={cx('pagination-link')}>
                        <Button transparent iconOnly={<FontAwesomeIcon icon={faAngleLeft} />} />
                    </a>
                </li>

                <li className={cx('pagination-item', 'pagination-item__active')}>
                    <a href="" className={cx('pagination-link')}>
                        <Button transparent iconOnly={1} />
                    </a>
                </li>
                <li className={cx('pagination-item')}>
                    <a href="" className={cx('pagination-link')}>
                        <Button transparent iconOnly={2} />
                    </a>
                </li>
                <li className={cx('pagination-item')}>
                    <a href="" className={cx('pagination-link')}>
                        <Button transparent iconOnly={3} />
                    </a>
                </li>
                <li className={cx('pagination-item')}>
                    <a href="" className={cx('pagination-link')}>
                        <Button transparent iconOnly={4} />
                    </a>
                </li>
                <li className={cx('pagination-item')}>
                    <a href="" className={cx('pagination-link')}>
                        <Button transparent iconOnly={5} />
                    </a>
                </li>
                <li className={cx('pagination-item')}>
                    <a href="" className={cx('pagination-link')}>
                        <Button transparent iconOnly={<span>...</span>} />
                    </a>
                </li>
                <li className={cx('pagination-item')}>
                    <a href="" className={cx('pagination-link')}>
                        <Button transparent iconOnly={14} />
                    </a>
                </li>

                <li className={cx('pagination-item')}>
                    <a href="" className={cx('pagination-link')}>
                        <Button transparent iconOnly={<FontAwesomeIcon icon={faAngleRight} />} />
                    </a>
                </li>
            </ul>
        </div>
    );
}

export default Pagigation;
