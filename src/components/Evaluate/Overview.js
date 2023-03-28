import classNames from 'classnames/bind';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import styles from './Evaluate.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';

const cx = classNames.bind(styles);

function Overview() {
    return (
        <div className={cx('container')}>
            <div className={cx('heading-overview')}>
                <div className={cx('average-rate')}>4.8</div>
                <div className={cx('info')}>
                    <div className={cx('star')}>
                        <FontAwesomeIcon icon={fasStar} className={cx('icon-star')} />
                        <FontAwesomeIcon icon={fasStar} className={cx('icon-star')} />
                        <FontAwesomeIcon icon={fasStar} className={cx('icon-star')} />
                        <FontAwesomeIcon icon={fasStar} className={cx('icon-star')} />
                        <FontAwesomeIcon icon={fasStar} className={cx('icon-star')} />
                    </div>
                    <div className={cx('total-evaluate')}>1819 lượt đánh giá</div>
                </div>
            </div>
            <div className={cx('detail-overview')}>
                <div className={cx('item')}>
                    <div className={cx('small-star')}>
                        <FontAwesomeIcon icon={fasStar} className={cx('icon-star')} />
                        <FontAwesomeIcon icon={fasStar} className={cx('icon-star')} />
                        <FontAwesomeIcon icon={fasStar} className={cx('icon-star')} />
                        <FontAwesomeIcon icon={fasStar} className={cx('icon-star')} />
                        <FontAwesomeIcon icon={fasStar} className={cx('icon-star')} />
                    </div>
                    <div className={cx('ratio-layout')}>
                        <div className={cx('ratio')} style={{ width: '88%' }}></div>
                    </div>
                    <span className={cx('amount')}>1672</span>
                </div>
                <div className={cx('item')}>
                    <div className={cx('small-star')}>
                        <FontAwesomeIcon icon={fasStar} className={cx('icon-star')} />
                        <FontAwesomeIcon icon={fasStar} className={cx('icon-star')} />
                        <FontAwesomeIcon icon={fasStar} className={cx('icon-star')} />
                        <FontAwesomeIcon icon={fasStar} className={cx('icon-star')} />
                        <FontAwesomeIcon icon={farStar} className={cx('icon-star')} />
                    </div>
                    <div className={cx('ratio-layout')}>
                        <div className={cx('ratio')} style={{ width: '88%' }}></div>
                    </div>
                    <span className={cx('amount')}>1672</span>
                </div>
                <div className={cx('item')}>
                    <div className={cx('small-star')}>
                        <FontAwesomeIcon icon={fasStar} className={cx('icon-star')} />
                        <FontAwesomeIcon icon={fasStar} className={cx('icon-star')} />
                        <FontAwesomeIcon icon={fasStar} className={cx('icon-star')} />
                        <FontAwesomeIcon icon={farStar} className={cx('icon-star')} />
                        <FontAwesomeIcon icon={farStar} className={cx('icon-star')} />
                    </div>
                    <div className={cx('ratio-layout')}>
                        <div className={cx('ratio')} style={{ width: '88%' }}></div>
                    </div>
                    <span className={cx('amount')}>1672</span>
                </div>
                <div className={cx('item')}>
                    <div className={cx('small-star')}>
                        <FontAwesomeIcon icon={fasStar} className={cx('icon-star')} />
                        <FontAwesomeIcon icon={fasStar} className={cx('icon-star')} />
                        <FontAwesomeIcon icon={farStar} className={cx('icon-star')} />
                        <FontAwesomeIcon icon={farStar} className={cx('icon-star')} />
                        <FontAwesomeIcon icon={farStar} className={cx('icon-star')} />
                    </div>
                    <div className={cx('ratio-layout')}>
                        <div className={cx('ratio')} style={{ width: '88%' }}></div>
                    </div>
                    <span className={cx('amount')}>1672</span>
                </div>
                <div className={cx('item')}>
                    <div className={cx('small-star')}>
                        <FontAwesomeIcon icon={fasStar} className={cx('icon-star')} />
                        <FontAwesomeIcon icon={farStar} className={cx('icon-star')} />
                        <FontAwesomeIcon icon={farStar} className={cx('icon-star')} />
                        <FontAwesomeIcon icon={farStar} className={cx('icon-star')} />
                        <FontAwesomeIcon icon={farStar} className={cx('icon-star')} />
                    </div>
                    <div className={cx('ratio-layout')}>
                        <div className={cx('ratio')} style={{ width: '88%' }}></div>
                    </div>
                    <span className={cx('amount')}>1672</span>
                </div>
            </div>
        </div>
    );
}

export default Overview;
