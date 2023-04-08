import classNames from 'classnames/bind';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import styles from './Evaluate.module.scss';

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import reviewServices from '~/services/reviewServices';

const cx = classNames.bind(styles);

function Overview() {
    const { id } = useParams();

    const [avg, setAvg] = useState({});

    const getProductAvg = async () => {
        const api = await reviewServices.getProductAvg(id);

        if (api?.status === 200) {
            setAvg(api.data);
        }
    };

    useEffect(() => {
        getProductAvg();
    }, [id]);

    return (
        <div className={cx('container')}>
            <div className={cx('heading-overview')}>
                <div className={cx('average-rate')}>{avg?.value}</div>
                <div className={cx('info')}>
                    <div className={cx('star')}>
                        <FontAwesomeIcon icon={fasStar} className={cx('icon-star')} />
                        <FontAwesomeIcon icon={fasStar} className={cx('icon-star')} />
                        <FontAwesomeIcon icon={fasStar} className={cx('icon-star')} />
                        <FontAwesomeIcon icon={fasStar} className={cx('icon-star')} />
                        <FontAwesomeIcon icon={fasStar} className={cx('icon-star')} />
                    </div>
                    <div className={cx('total-evaluate')}>{avg?.total} lượt đánh giá</div>
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
                        <div
                            className={cx('ratio')}
                            style={{ width: `${avg?.total !== 0 ? (avg?.star5 / avg?.total) * 100 : 0}%` }}
                        ></div>
                    </div>
                    <span className={cx('amount')}>{avg?.star5}</span>
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
                        <div
                            className={cx('ratio')}
                            style={{ width: `${avg?.total !== 0 ? (avg?.star4 / avg?.total) * 100 : 0}%` }}
                        ></div>
                    </div>
                    <span className={cx('amount')}>{avg?.star4}</span>
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
                        <div
                            className={cx('ratio')}
                            style={{ width: `${avg?.total !== 0 ? (avg?.star3 / avg?.total) * 100 : 0}%` }}
                        ></div>
                    </div>
                    <span className={cx('amount')}>{avg?.star3}</span>
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
                        <div
                            className={cx('ratio')}
                            style={{ width: `${avg?.total !== 0 ? (avg?.star2 / avg?.total) * 100 : 0}%` }}
                        ></div>
                    </div>
                    <span className={cx('amount')}>{avg?.star2}</span>
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
                        <div
                            className={cx('ratio')}
                            style={{ width: `${avg?.total !== 0 ? (avg?.star1 / avg?.total) * 100 : 0}%` }}
                        ></div>
                    </div>
                    <span className={cx('amount')}>{avg?.star1}</span>
                </div>
            </div>
        </div>
    );
}

export default Overview;
