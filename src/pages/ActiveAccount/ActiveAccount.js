import classNames from 'classnames/bind';
import 'react-toastify/dist/ReactToastify.css';
import styles from './ActiveAccount.module.scss';

import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import authServices from '~/services/authServices';
import { useLocation, useSearchParams } from 'react-router-dom';
import Button from '~/components/Button/Button';

const cx = classNames.bind(styles);

function ActiveAccount() {
    const [note, setNote] = useState('');
    const [id, setId] = useState(0);
    const [searchParams] = useSearchParams();

    const { state } = useLocation();

    const handleCheckData = () => {
        if (state?.data) {
            setId(state.data);
        } else if (searchParams.get('activate-success') === 'false') {
            setId(searchParams.get('user-id'));
            setNote('Tài khoản kích hoạt thất bại.\nVui lòng xác nhận sau 5 phút kể từ lúc gửi Gmail.');
        } else {
            console.log('No data');
        }
    };

    const handleSendEmailActiveAccount = async () => {
        const api = await authServices.authSendEmailActiveAccount(id);

        if (api.status === 200) {
            setNote('Đã gửi gmail kích hoạt tài khoản.');
        } else if (api.status === 10003) {
            setNote('Tài khoản đã được kích hoạt.');
        } else {
            setNote('Có lỗi bất ngờ xảy ra, vui lòng thử lại sau.');
        }
    };

    useEffect(() => {
        handleCheckData();
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('layout')}>
                <span className={cx('title')}>Kích hoạt tài khoản</span>
                <div className={cx('body')}>
                    <span className={cx('note')} style={{ whiteSpace: 'pre-line' }}>
                        {note}
                    </span>
                    <Button
                        primary
                        border
                        outline
                        onClick={() => {
                            handleSendEmailActiveAccount();
                        }}
                    >
                        Gửi Gmail
                    </Button>
                </div>
                <div className={cx('return-layout')}>
                    <Link to={'/'}>{'<<'}Trở về trang chủ</Link>
                </div>
            </div>
        </div>
    );
}

export default ActiveAccount;
