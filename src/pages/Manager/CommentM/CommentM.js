import classNames from 'classnames/bind';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from '~/components/Button';
import styles from './CommentM.module.scss';

import { useState, useEffect } from 'react';
import reviewServices from '~/services/reviewServices';

const cx = classNames.bind(styles);

function CommentM() {
    const [reviews, setReviews] = useState([]);

    const getAllReview = async () => {
        const api = await reviewServices.getAllReview();

        console.log(api);

        if (api?.data) {
            setReviews(api.data.content);
        }
    };

    useEffect(() => {
        getAllReview();
    }, []);

    return (
        <div className={cx('container')}>
            <div className={cx('row')}>
                <span className={cx('heading')}>Quản lí bình luận</span>
                <table className={cx('table-review')}>
                    <thead>
                        <tr className={cx('table-tr')}>
                            <th className={cx('table-th', 'center')}>Người gửi</th>
                            <th className={cx('table-th', 'center')}>Rating</th>
                            <th className={cx('table-th')}>Nội dung bình luận</th>
                            <th className={cx('table-th', 'center')}>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody className={cx('table-body')}>
                        {reviews.map((review, index) => (
                            <tr className={cx('table-tr')} key={index}>
                                <td className={cx('table-td', 'center')}>Nguyễn Văn A</td>
                                <td className={cx('table-td', 'center')}>{review.ratingValue}</td>
                                <td className={cx('table-td')}>{review.comment}</td>
                                <td className={cx('table-td', 'center')}>
                                    <div className={cx('btn-layout')}>
                                        {review.verified ? 'Đã duyệt' : 'Chưa duyệt'}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className={cx('mt-5')}></div>
            <div className={cx('row')}>
                <span className={cx('heading-detail')}>Chi tiết bình luận</span>
            </div>
        </div>
    );
}

export default CommentM;
