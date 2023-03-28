import classNames from 'classnames/bind';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import styles from './Evaluate.module.scss';
import Button from '../Button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage, faThumbsUp, faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { faCircleCheck, faStar as fasStar } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function CommentItem() {
    return (
        <div className={cx('comment-item')}>
            <div className={cx('col-4')}>
                <div className={cx('user')}>
                    <div className={cx('user-info')}>
                        <div className={cx('name')}>Tran Tien Dung</div>
                        <div className={cx('date')}>Đã tham gia 5 tháng trước</div>
                    </div>
                    <div className={cx('amout-comment')}>
                        <FontAwesomeIcon icon={faMessage} className={cx('icon')} />
                        <span className={cx('text')}>Đã viết:</span>
                        <span className={cx('text-amount')}>52 Đánh giá</span>
                    </div>
                    <div className={cx('amout-feedback')}>
                        <FontAwesomeIcon icon={faThumbsUp} className={cx('icon')} />
                        <span className={cx('text')}>Đã nhận:</span>
                        <span className={cx('text-amount')}>22 Lượt cảm ơn</span>
                    </div>
                </div>
            </div>
            <div className={cx('col-8')}>
                <div className={cx('comment')}>
                    <div className={cx('star')}>
                        <FontAwesomeIcon icon={fasStar} className={cx('icon-star')} />
                        <FontAwesomeIcon icon={fasStar} className={cx('icon-star')} />
                        <FontAwesomeIcon icon={fasStar} className={cx('icon-star')} />
                        <FontAwesomeIcon icon={fasStar} className={cx('icon-star')} />
                        <FontAwesomeIcon icon={fasStar} className={cx('icon-star')} />
                        <span className={cx('star-text')}>Cực kì hài lòng</span>
                    </div>
                    <div className={cx('status')}>
                        <FontAwesomeIcon icon={faCircleCheck} className={cx('icon-status')} />
                        <span className={cx('status-text')}>Đã mua hàng</span>
                    </div>
                    <span className={cx('comment-text')}>
                        Nhìn tổng quan thì mình thấy nó hơi gấp xíu chỗ góc vở nhưng k sao, nói chung là cái gì khen thì
                        mọi người cũng khen hết rồi, giao hàng nhanh, mới đặt hôm qua mà mình ở ngoại thành thì sáng nay
                        đã giao rồi. Quá nhanh luôn. Nên mua nha quý zị
                    </span>
                    <span className={cx('comment-date')}>Đánh giá vào 1 năm trước</span>
                </div>
            </div>
        </div>
    );
}

export default CommentItem;
