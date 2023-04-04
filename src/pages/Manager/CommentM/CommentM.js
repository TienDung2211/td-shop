import classNames from 'classnames/bind';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from '~/components/Button';
import styles from './CommentM.module.scss';

import { useState, useEffect } from 'react';
import reviewServices from '~/services/reviewServices';
import { ToastContainer, toast } from 'react-toastify';
import CommentItem from '~/components/Evaluate/CommentItem';

const cx = classNames.bind(styles);

function CommentM() {
    const [reviews, setReviews] = useState([]);
    const [selectReview, setSelectReview] = useState();
    const [renderPage, setRenderPage] = useState(true);

    const getAllReview = async () => {
        const api = await reviewServices.getAllReview();

        if (api?.data) {
            setReviews(api.data.content);
            setSelectReview(api.data.content[0]);
        }
    };

    const acceptReview = async () => {
        const api = await reviewServices.acceptReview(selectReview.id);

        console.log(api);

        if (api?.status === 200) {
            toast.success('Phản hồi về sản phẩm đã được kiểm duyệt.', {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-message',
            });
            setRenderPage(!renderPage);
        } else if (api === undefined) {
            toast.error('Vui lòng đăng nhập để tiếp tục duyệt đánh giá.', {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-message',
            });
        } else if (api.status === 400) {
            toast.info('Lỗi không xác định vui lòng thử lại.', {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-message',
            });
        }
    };

    const denyReview = async () => {
        const api = await reviewServices.denyReview(selectReview.id);

        console.log(api);

        if (api?.status === 200) {
            toast.success('Phản hồi về sản phẩm đã bị từ chối.', {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-message',
            });
            setRenderPage(!renderPage);
        } else if (api === undefined) {
            toast.error('Vui lòng đăng nhập để tiếp tục từ chối đánh giá.', {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-message',
            });
        } else if (api.status === 400) {
            toast.info('Lỗi không xác định vui lòng thử lại.', {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-message',
            });
        }
    };

    useEffect(() => {
        getAllReview();
    }, [renderPage]);

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
                            <th className={cx('table-th', 'center')}>Trạng thái</th>
                        </tr>
                    </thead>
                    <tbody className={cx('table-body')}>
                        {reviews.map((review, index) => (
                            <tr
                                className={cx('table-tr')}
                                key={index}
                                onClick={() => {
                                    setSelectReview(review);
                                }}
                            >
                                <td className={cx('table-td', 'center')}>Nguyễn Văn A</td>
                                <td className={cx('table-td', 'center')}>{review.ratingValue}</td>
                                <td className={cx('table-td')}>{review.comment}</td>
                                <td className={cx('table-td', 'center')}>
                                    <div className={cx('status-layout')}>{review.valid ? 'Đã hiện' : 'Chưa hiện'}</div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className={cx('mt-5')}></div>
            <div className={cx('row')}>
                <span className={cx('heading-detail')}>Chi tiết bình luận</span>

                <CommentItem data={selectReview} />
            </div>

            <div className={cx('row')}>
                <div className={cx('col')}>
                    <div className={cx('btn-layout')}>
                        <Button
                            primary
                            border
                            className={cx('btn')}
                            onClick={() => {
                                acceptReview();
                            }}
                        >
                            Duyệt
                        </Button>
                        <Button
                            border
                            className={cx('btn-deny')}
                            onClick={() => {
                                denyReview();
                            }}
                        >
                            Từ chối
                        </Button>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default CommentM;
