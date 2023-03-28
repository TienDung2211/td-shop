import classNames from 'classnames/bind';
import styles from './Notification.module.scss';

import HeadlessTippy from '@tippyjs/react/headless';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faDeleteLeft, faXmark } from '@fortawesome/free-solid-svg-icons';

import images from '~/assets/images';
import { Wrapper as PopperWrapper } from '~/components/Popper';

const cx = classNames.bind(styles);

function Notification() {
    return (
        <div>
            <HeadlessTippy
                interactive
                // visible={true}
                placement="bottom-end"
                render={(attrs) => (
                    <div className={cx('notification-wrapper')} tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                            <div className={cx('notification-popper')}>
                                <header className={cx('notify-header')}>
                                    <span className={cx('title')}>Thông báo mới</span>
                                    <span className={cx('read-all')}>Đánh dấu tất cả đã xem</span>
                                </header>

                                <ul className={cx('notify-list')}>
                                    <li className={cx('notify-item', 'notify-item--viewed')}>
                                        <a href="/" className={cx('notify-link')}>
                                            <img src={images.logo} alt="Ảnh sản phẩm" className={cx('notify-img')} />
                                            <div className={cx('notify-info')}>
                                                <span className={cx('notify-name')}>Tên sản phẩm</span>
                                                <span className={cx('notify-desc')}>Mô tả sản phẩm</span>
                                            </div>
                                            <div className={cx('delete')}>
                                                <FontAwesomeIcon icon={faXmark} />
                                            </div>
                                        </a>
                                    </li>
                                    <li className={cx('notify-item')}>
                                        <a href="/" className={cx('notify-link')}>
                                            <img src={images.logo} alt="Ảnh sản phẩm" className={cx('notify-img')} />
                                            <div className={cx('notify-info')}>
                                                <span className={cx('notify-name')}>Tên sản phẩm</span>
                                                <span className={cx('notify-desc')}>Mô tả sản phẩm</span>
                                            </div>
                                            <div className={cx('delete')}>
                                                <FontAwesomeIcon icon={faXmark} />
                                            </div>
                                        </a>
                                    </li>
                                </ul>

                                <footer className={cx('notify-footer')}>
                                    <a href="/" className={cx('notify-footer-btn')}>
                                        Xem tất cả
                                    </a>
                                </footer>
                            </div>
                        </PopperWrapper>
                    </div>
                )}
            >
                <span className={cx('parent-item')}>
                    <FontAwesomeIcon icon={faBell} className={cx('icon')} />
                    <span>Thông báo</span>
                </span>
            </HeadlessTippy>
        </div>
    );
}

export default Notification;
