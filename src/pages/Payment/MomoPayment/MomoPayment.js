import classNames from 'classnames/bind';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './MomoPayment.module.scss';
import 'react-toastify/dist/ReactToastify.css';

import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import images from '~/assets/images';
import QRCode from 'qrcode.react';
import Countdown from 'react-countdown';
import { useNavigate } from 'react-router-dom';
import userServices from '~/services/userServices';
import axios from 'axios';

const cx = classNames.bind(styles);

function MomoPayment() {
    const { state } = useLocation();

    const data = state.data;

    const navigate = useNavigate();

    let eventSource = undefined;

    function registerSSE(url) {
        const source = new EventSource(url);

        console.log('Đợi kết quả thanh toán');

        source.addEventListener('payment_result', (event) => {
            handlePaymentResultEvent(JSON.parse(event.data));
        });

        source.onopen = (event) => console.log('Connection Opened');
        source.onerror = (event) => console.error('Connection Error');

        return source;
    }

    function handlePaymentResultEvent(dataApi) {
        if (dataApi.status === 200) {
            const dataToSucess = {
                amount: data.amount,
                orderId: data.orderId,
                idPayment: 2,
            };
            navigate('/payment/sucess', { state: { data: dataToSucess } });
        }
    }

    const getUserId = async () => {
        const api = await userServices.getUser();

        if (api?.status === 200) {
            return api.data.Id;
        }

        return 0;
    };

    const renderer = ({ minutes, seconds, completed }) => {
        if (completed) {
            const dataToFailure = {
                amount: data.amount,
                orderId: data.orderId,
                idPayment: 2,
            };
            navigate('/payment/failure', { state: { data: dataToFailure } });
        } else {
            // Render a countdown
            return (
                <div className={cx('countdown-time')}>
                    <div className={cx('min')}>{minutes}</div>
                    {' : '}
                    <div className={cx('second')}>{seconds}</div>
                </div>
            );
        }
    };

    useEffect(() => {
        const fetchApi = async () => {
            const userId = await getUserId();
            eventSource = registerSSE(process.env.REACT_APP_REGISTER_CLIENT + `/${userId}`);
        };

        fetchApi();

        const interval = setInterval(async () => {
            const userId = await getUserId();
            axios.get(process.env.REACT_APP_SEND_DUMMY_MESSAGE + `/${userId}`);
        }, 20000);

        return () => {
            clearInterval(interval);
            eventSource.close();
            console.log('Close');
        };
    }, []);

    return (
        <div className={cx('container')}>
            <div className={cx('row')}>
                <div className={cx('momo-payment-layout')}>
                    <div className={cx('header')}>
                        <img className={cx('image')} src={images.imgMomo} />
                        <h3 className={cx('heading')}>Thanh toán Momo</h3>
                    </div>
                    <div className={cx('separation')}></div>
                    <div className={cx('content')}>
                        <div className={cx('qr-code-layout')}>
                            <QRCode
                                id="qrcode"
                                value={data.qrCodeUrl}
                                size={268}
                                level={'H'}
                                includeMargin={true}
                                className={cx('qr-code')}
                            />
                            <div className={cx('price-layout')}>
                                Tổng tiền :{' '}
                                <span className={cx('price')}>
                                    {parseInt(data.amount).toLocaleString('vi-VN', {
                                        style: 'currency',
                                        currency: 'VND',
                                    })}
                                </span>
                            </div>
                        </div>
                        <div className={cx('intruction-layout')}>
                            <div className={cx('desc')}>
                                <div className={cx('title')}>Quét mã QR để thanh toán</div>
                                <div className={cx('step')}>
                                    <div className={cx('step-number')}>1</div>
                                    <span className={cx('step-text')}> Mở dứng dụng trên điện thoại.</span>
                                </div>
                                <div className={cx('step')}>
                                    <div className={cx('step-number')}>2</div>
                                    <span className={cx('step-text')}>
                                        {' '}
                                        Trên MoMo, chọn biểu tượng{' '}
                                        <img
                                            className={cx('code-scan')}
                                            src="https://salt.tikicdn.com/ts/upload/03/74/d4/01670f7f9e6a3c86583939eb2494e9cf.png"
                                        />{' '}
                                        quét mã QR.
                                    </span>
                                </div>
                                <div className={cx('step')}>
                                    <div className={cx('step-number')}>3</div>
                                    <span className={cx('step-text')}> Quét mã QR ở trang này và thanh toán.</span>
                                </div>
                            </div>
                            <div className={cx('time')}>
                                <span className={cx('title')}>Giao dịch kết thúc sau</span>
                                <Countdown date={Date.now() + 300000} renderer={renderer} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MomoPayment;
