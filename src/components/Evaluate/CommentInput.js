import classNames from 'classnames/bind';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import styles from './Evaluate.module.scss';
import Button from '../Button';

import { useParams } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import reviewServices from '~/services/reviewServices';

const cx = classNames.bind(styles);

function CommentInput() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [selectRating, setSelectRating] = useState(5);
    const [reviewText, setReviewText] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const optionRef = useRef([]);
    const { id, brandId } = useParams();

    const handleOptionClick = (index) => {
        if (activeIndex === index) {
            setActiveIndex(-1);
            optionRef.current[index].classList.remove(styles.optionActive);
        } else {
            setActiveIndex(index);
            optionRef.current[index].classList.add(styles.optionActive);
            if (activeIndex !== -1) {
                optionRef.current[activeIndex].classList.remove(styles.optionActive);
            }
        }

        const selectedOption = optionRef.current[index];
        const value = selectedOption.dataset.value;
        setSelectRating(parseInt(value));
    };

    const handleAddReview = async () => {
        if (reviewText === '') {
            setErrMsg('Vui lòng nhập phản hồi');
        }

        const data = {
            RatingValue: selectRating,
            Comment: reviewText,
            ProductId: id,
        };

        var api = await reviewServices.addReview(data);

        console.log(api);

        if (api?.status === 200) {
            toast.success('Phản hồi về sản phẩm của bạn đã được lưu lại.', {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-message',
            });
            setErrMsg('');
        } else if (api === undefined) {
            toast.error('Vui lòng đăng nhập để tiếp tục thêm tùy chọn.', {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-message',
            });
        } else if (api.status === 400) {
            toast.info('Tên MasterCategory đã tồn tại.', {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-message',
            });
        }
    };

    useEffect(() => {
        optionRef.current[0].classList.add(styles.optionActive);
    }, []);

    return (
        <div className={cx('form-group')}>
            <label htmlFor="comment" className={cx('label')}>
                Phản hồi về sản phẩm
            </label>
            <div className={cx('group')}>
                <span className={cx('error-msg')}>{errMsg}</span>
            </div>
            <textarea
                className={cx('form-control')}
                id="comment"
                rows="5"
                placeholder="Nhập phản hồi về sản phẩm"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
            ></textarea>
            <div className={cx('filter')}>
                <div className={cx('filter-label')}>Đánh giá : </div>
                <div className={cx('filter-options')}>
                    <div
                        ref={(el) => (optionRef.current[0] = el)}
                        className={cx(styles.option)}
                        data-value="5"
                        onClick={() => handleOptionClick(0)}
                    >
                        5 <FontAwesomeIcon icon={farStar} className={cx('icon-star')} />
                    </div>
                    <div
                        ref={(el) => (optionRef.current[1] = el)}
                        className={cx(styles.option)}
                        data-value="4"
                        onClick={() => handleOptionClick(1)}
                    >
                        4 <FontAwesomeIcon icon={farStar} className={cx('icon-star')} />
                    </div>
                    <div
                        ref={(el) => (optionRef.current[2] = el)}
                        className={cx(styles.option)}
                        data-value="3"
                        onClick={() => handleOptionClick(2)}
                    >
                        3 <FontAwesomeIcon icon={farStar} className={cx('icon-star')} />
                    </div>
                    <div
                        ref={(el) => (optionRef.current[3] = el)}
                        className={cx(styles.option)}
                        data-value="2"
                        onClick={() => handleOptionClick(3)}
                    >
                        2
                        <FontAwesomeIcon icon={farStar} className={cx('icon-star')} />
                    </div>
                    <div
                        ref={(el) => (optionRef.current[4] = el)}
                        className={cx(styles.option)}
                        data-value="1"
                        onClick={() => handleOptionClick(4)}
                    >
                        1 <FontAwesomeIcon icon={farStar} className={cx('icon-star')} />
                    </div>
                </div>
            </div>
            <div className={cx('btn')}>
                <Button primary border onClick={() => handleAddReview()}>
                    Phản hồi
                </Button>
            </div>
            <ToastContainer />
        </div>
    );
}

export default CommentInput;
