import classNames from 'classnames/bind';
import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import styles from './Evaluate.module.scss';

import images from '~/assets/images';
import Modal from '~/components/Modal';
import Button from '~/components/Button';
import Slider from '~/components/Slider';
import Payment from '~/components/Payment';
import Product from '~/components/Product';
import DataContext from '~/context/DataContext';
import Policy from '~/components/Policy/Policy';
import cartServices from '~/services/cartServices';
import { ToastContainer, toast } from 'react-toastify';
import productServices from '~/services/productServices';
import Overview from './Overview';
import CommentInput from './CommentInput';
import Filter from './Filter';
import CommentItem from './CommentItem';

const cx = classNames.bind(styles);

function Evaluate() {
    return (
        <div className={cx('container')}>
            <div className={cx('row')}>
                <span className={cx('title')}>Đánh giá nhận xét từ khách hàng</span>
            </div>
            <div className={cx('row')}>
                <div className={cx('col-4')}>
                    <div className={cx('overview-layout')}>
                        <Overview />
                    </div>
                </div>
                <div className={cx('col-8')}>
                    <div className={cx('comment-filter-layout')}>
                        <CommentInput />
                        <Filter />
                    </div>
                </div>
            </div>
            <div className={cx('row')}>
                <CommentItem />
            </div>
        </div>
    );
}

export default Evaluate;
