import classNames from 'classnames/bind';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import styles from './Evaluate.module.scss';

import moment from 'moment/moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage, faThumbsUp, faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { faCircleCheck, faStar as fasStar } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function CommentItem({ data }) {
    return (
        <div className={cx('comment-item')}>
            <div className={cx('col-4')}>
                <div className={cx('user')}>
                    <div className={cx('user-info')}>
                        <div className={cx('name')}>
                            {data?.user.LastName} {data?.user.FirstName}
                        </div>
                        <div className={cx('date')}>
                            Đã tham gia vào {moment(data?.user.CreatedAt).format('DD/MM/YYYY')}
                        </div>
                    </div>
                    {/* <div className={cx('amout-comment')}>
                        <FontAwesomeIcon icon={faMessage} className={cx('icon')} /> 
                        <span className={cx('text')}>Đã viết:</span>
                        <span className={cx('text-amount')}>52 Đánh giá</span>
                    </div>
                    <div className={cx('amout-feedback')}>
                        <FontAwesomeIcon icon={faThumbsUp} className={cx('icon')} />
                        <span className={cx('text')}>Đã nhận:</span>
                        <span className={cx('text-amount')}>22 Lượt cảm ơn</span>
                    </div> */}
                </div>
            </div>
            <div className={cx('col-8')}>
                <div className={cx('comment')}>
                    {data?.ratingValue === 5 && (
                        <div className={cx('star')}>
                            <FontAwesomeIcon icon={fasStar} className={cx('icon-star')} />
                            <FontAwesomeIcon icon={fasStar} className={cx('icon-star')} />
                            <FontAwesomeIcon icon={fasStar} className={cx('icon-star')} />
                            <FontAwesomeIcon icon={fasStar} className={cx('icon-star')} />
                            <FontAwesomeIcon icon={fasStar} className={cx('icon-star')} />
                            <span className={cx('star-text')}>Cực kì hài lòng</span>
                        </div>
                    )}

                    {data?.ratingValue === 4 && (
                        <div className={cx('star')}>
                            <FontAwesomeIcon icon={fasStar} className={cx('icon-star')} />
                            <FontAwesomeIcon icon={fasStar} className={cx('icon-star')} />
                            <FontAwesomeIcon icon={fasStar} className={cx('icon-star')} />
                            <FontAwesomeIcon icon={fasStar} className={cx('icon-star')} />
                            <FontAwesomeIcon icon={farStar} className={cx('icon-star')} />
                            <span className={cx('star-text')}>Khá hài lòng</span>
                        </div>
                    )}

                    {data?.ratingValue === 3 && (
                        <div className={cx('star')}>
                            <FontAwesomeIcon icon={fasStar} className={cx('icon-star')} />
                            <FontAwesomeIcon icon={fasStar} className={cx('icon-star')} />
                            <FontAwesomeIcon icon={fasStar} className={cx('icon-star')} />
                            <FontAwesomeIcon icon={farStar} className={cx('icon-star')} />
                            <FontAwesomeIcon icon={farStar} className={cx('icon-star')} />
                            <span className={cx('star-text')}>Hài lòng</span>
                        </div>
                    )}

                    {data?.ratingValue === 2 && (
                        <div className={cx('star')}>
                            <FontAwesomeIcon icon={fasStar} className={cx('icon-star')} />
                            <FontAwesomeIcon icon={fasStar} className={cx('icon-star')} />
                            <FontAwesomeIcon icon={farStar} className={cx('icon-star')} />
                            <FontAwesomeIcon icon={farStar} className={cx('icon-star')} />
                            <FontAwesomeIcon icon={farStar} className={cx('icon-star')} />
                            <span className={cx('star-text')}>Không hài lòng</span>
                        </div>
                    )}

                    {data?.ratingValue === 1 && (
                        <div className={cx('star')}>
                            <FontAwesomeIcon icon={fasStar} className={cx('icon-star')} />
                            <FontAwesomeIcon icon={farStar} className={cx('icon-star')} />
                            <FontAwesomeIcon icon={farStar} className={cx('icon-star')} />
                            <FontAwesomeIcon icon={farStar} className={cx('icon-star')} />
                            <FontAwesomeIcon icon={farStar} className={cx('icon-star')} />
                            <span className={cx('star-text')}>Rất không hài lòng</span>
                        </div>
                    )}

                    <div className={cx('status')}>
                        <FontAwesomeIcon icon={faCircleCheck} className={cx('icon-status')} />
                        <span className={cx('status-text')}>Đã mua hàng</span>
                    </div>
                    <span className={cx('comment-text')}>{data?.comment}</span>
                    <span className={cx('comment-date')}>Đánh giá vào {data?.createdAt}</span>
                </div>
            </div>
        </div>
    );
}

export default CommentItem;
