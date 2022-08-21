import classNames from 'classnames/bind';
import styles from './Footer.module.scss';

import images from '~/assets/images';

const cx = classNames.bind(styles);

function Footer() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('body')}>
                <div className={cx('grid')}>
                    <div className={cx('grid-row')}>
                        <div className={cx('grid-column-20percent')}>
                            <h3 className={cx('heading')}>Chăm sóc khách hàng</h3>

                            <ul className={cx('list')}>
                                <li className={cx('item')}>
                                    <a href="/">Trung tâm trợ giúp</a>
                                </li>
                                <li className={cx('item')}>
                                    <a href="/">TD-Shop Mail</a>
                                </li>
                                <li className={cx('item')}>
                                    <a href="/">Hướng dẫn mua hàng</a>
                                </li>
                            </ul>
                        </div>
                        <div className={cx('grid-column-20percent')}>
                            <h3 className={cx('heading')}>Giới thiệu</h3>

                            <ul className={cx('list')}>
                                <li className={cx('item')}>
                                    <a href="/">TD-Shop Việt Nam</a>
                                </li>
                                <li className={cx('item')}>
                                    <a href="/">Tuyển dụng</a>
                                </li>
                                <li className={cx('item')}>
                                    <a href="/">Điều khoản TD-Shop</a>
                                </li>
                            </ul>
                        </div>
                        <div className={cx('grid-column-20percent')}>
                            <h3 className={cx('heading')}>Chứng nhận quốc tế</h3>

                            <ul className={cx('list')}>
                                <li className={cx('item')}>
                                    <a href="/">PDF</a>
                                </li>
                                <li className={cx('item')}>
                                    <a href="/">PNG</a>
                                </li>
                            </ul>
                        </div>
                        <div className={cx('grid-column-20percent')}>
                            <h3 className={cx('heading')}>Theo dõi</h3>

                            <ul className={cx('list')}>
                                <li className={cx('item')}>
                                    <a href="/">
                                        <i className={cx('item-icon fa-brands fa-facebook')}></i>
                                        Facebook
                                    </a>
                                </li>
                                <li className={cx('item')}>
                                    <a href="/">
                                        <i className={cx('item-icon fa-brands fa-instagram')}></i>
                                        Instagram
                                    </a>
                                </li>
                                <li className={cx('item')}>
                                    <a href="/">
                                        <i className={cx('item-icon fa-brands fa-tiktok')}></i>
                                        Tiktok
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className={cx('grid-column-20percent')}>
                            <h3 className={cx('heading')}>Vào ứng dụng trên TD-Shop</h3>

                            <div className={cx('qr')}>
                                <img src={images.imgQr} alt="QR Code" className={cx('qr-img')} />
                                <div className={cx('link-oder-app')}>
                                    <a href="/" className={cx('item-oderapp')}>
                                        <img src={images.imgGooglePlay} alt="CH Play" className={cx('oderapp-img')} />
                                        <span className={cx('name-oderapp')}>CH Play</span>
                                    </a>
                                    <a href="/" className={cx('item-oderapp')}>
                                        <img src={images.imgAppStore} alt="App Store" className={cx('oderapp-img')} />
                                        <span className={cx('name-oderapp')}>App Store</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
