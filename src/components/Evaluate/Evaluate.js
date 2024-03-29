import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import styles from './Evaluate.module.scss';

import Overview from './Overview';
import CommentInput from './CommentInput';
import CommentItem from './CommentItem';
import reviewServices from '~/services/reviewServices';

const cx = classNames.bind(styles);

function Evaluate() {
    const [evaluates, setEvaluates] = useState([]);
    const [checkBuy, setCheckBuy] = useState(false);
    const { id } = useParams();

    const getAllReview = async () => {
        const api = await reviewServices.getReviewByProductId(id);

        if (api?.data) {
            setEvaluates(api.data.content);
        }
    };

    const isCheckBuy = async () => {
        const api = await reviewServices.checkBuyByProductId(id);

        setCheckBuy(api?.data);
    };

    useEffect(() => {
        getAllReview();
        isCheckBuy();
    }, []);

    return (
        <div className={cx('container')}>
            <div className={cx('row')}>
                <span className={cx('title')}>Đánh giá nhận xét từ khách hàng</span>
            </div>
            <div className={cx('row')}>
                <div
                    className={cx(
                        'col-12',
                        'col-sm-6',
                        'col-md-6',
                        'col-lg-5',
                        'col-xl-4',
                        'd-flex',
                        'justify-content-center',
                    )}
                >
                    <div className={cx('overview-layout')}>
                        <Overview />
                    </div>
                </div>
                <div className={cx('col-12', 'col-sm-6', 'col-md-6', 'col-lg-7', 'col-xl-8')}>
                    <div className={cx('comment-filter-layout')}>{checkBuy && <CommentInput />}</div>
                </div>
            </div>
            <div className={cx('row')}>
                {evaluates.map((evaluate, index) => (
                    <CommentItem key={index} data={evaluate} />
                ))}
            </div>
        </div>
    );
}

export default Evaluate;
