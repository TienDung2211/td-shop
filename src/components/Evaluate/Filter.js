import classNames from 'classnames/bind';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import styles from './Evaluate.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';

const cx = classNames.bind(styles);

function Filter() {
    return (
        <div className={cx('filter')}>
            <div className={cx('filter-label')}>Lọc xem theo : </div>
            <div className={cx('filter-options')}>
                <div className={cx('option', 'option-active')}>
                    5 <FontAwesomeIcon icon={farStar} className={cx('icon-star')} />
                </div>
                <div className={cx('option')}>
                    4 <FontAwesomeIcon icon={farStar} className={cx('icon-star')} />
                </div>
                <div className={cx('option')}>
                    3 <FontAwesomeIcon icon={farStar} className={cx('icon-star')} />
                </div>
                <div className={cx('option')}>
                    2
                    <FontAwesomeIcon icon={farStar} className={cx('icon-star')} />
                </div>
                <div className={cx('option')}>
                    1 <FontAwesomeIcon icon={farStar} className={cx('icon-star')} />
                </div>
            </div>
        </div>
    );
}

export default Filter;
