import classNames from 'classnames/bind';
import styles from './Notification.module.scss';

import HeadlessTippy from '@tippyjs/react/headless';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faXmark } from '@fortawesome/free-solid-svg-icons';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import notificationServices from '~/services/notificationServices';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function Notification() {
    const [announcements, setAnnouncements] = useState([]);
    const [amount, setAmount] = useState(0);

    const navigate = useNavigate();

    const getAllNotify = async () => {
        const api = await notificationServices.getNotifyByUser();

        if (api?.status === 200) {
            setAnnouncements(api.data);
            const unreadCount = api.data.filter((notification) => !notification.isRead).length;
            setAmount(unreadCount);
        }
    };

    const handleClickNotify = async (id, link) => {
        const api = await notificationServices.maskAsReadNotify(id);

        if (api?.status === 200) {
            await getAllNotify();
            navigate(`/${link}`);
        }
    };

    const handleRemoveNotify = async (id) => {
        const api = await notificationServices.deleteNotify(id);

        if (api?.status === 200) {
            const newAnnouncements = announcements.filter((item) => item.id !== id);
            setAnnouncements(newAnnouncements);
        }
    };

    useEffect(() => {
        getAllNotify();

        const interval = setInterval(() => {
            getAllNotify();
        }, 1 * 30 * 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <div>
            <HeadlessTippy
                interactive
                // visible={true}
                placement="bottom"
                render={(attrs) => (
                    <div className={cx('notification-wrapper')} tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                            <div className={cx('notification-popper')}>
                                <header className={cx('notify-header')}>
                                    <span className={cx('title')}>Thông báo mới</span>
                                    {/* <span className={cx('read-all')}>Đánh dấu tất cả đã xem</span> */}
                                </header>
                                <ul className={cx('notify-list')}>
                                    {announcements.map((item, index) => {
                                        if (!item.isDeleted) {
                                            if (item.isRead) {
                                                return (
                                                    <li
                                                        className={cx('notify-item', 'notify-item--viewed')}
                                                        key={index}
                                                        onClick={() =>
                                                            handleClickNotify(item?.id, item?.notification?.url)
                                                        }
                                                    >
                                                        <div className={cx('notify-link')}>
                                                            <img
                                                                src={item?.notification?.image}
                                                                alt="Ảnh sản phẩm"
                                                                className={cx('notify-img')}
                                                            />
                                                            <div className={cx('notify-info')}>
                                                                <span className={cx('notify-name')}>
                                                                    {item?.notification?.content}
                                                                </span>
                                                                {/* <span className={cx('notify-desc')}>
                                                                    {item?.notification?.content}
                                                                </span> */}
                                                            </div>
                                                            <div className={cx('delete')}>
                                                                <FontAwesomeIcon
                                                                    icon={faXmark}
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        handleRemoveNotify(item?.id);
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                    </li>
                                                );
                                            } else
                                                return (
                                                    <li
                                                        className={cx('notify-item')}
                                                        key={index}
                                                        onClick={() =>
                                                            handleClickNotify(item?.id, item?.notification?.url)
                                                        }
                                                    >
                                                        <div className={cx('notify-link')}>
                                                            <img
                                                                src={item?.notification?.image}
                                                                alt="Ảnh sản phẩm"
                                                                className={cx('notify-img')}
                                                            />
                                                            <div className={cx('notify-info')}>
                                                                <span className={cx('notify-name')}>
                                                                    {item?.notification?.content}
                                                                </span>
                                                                {/* <span className={cx('notify-desc')}>
                                                                    {item?.notification?.content}
                                                                </span> */}
                                                            </div>
                                                            <div className={cx('delete')}>
                                                                <FontAwesomeIcon
                                                                    icon={faXmark}
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        handleRemoveNotify(item?.id);
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                    </li>
                                                );
                                        } else return null;
                                    })}
                                </ul>

                                <footer className={cx('notify-footer')}>
                                    {/* <a href="/" className={cx('notify-footer-btn')}>
                                        Xem tất cả
                                    </a> */}
                                </footer>
                            </div>
                        </PopperWrapper>
                    </div>
                )}
            >
                <span className={cx('parent-item')}>
                    <FontAwesomeIcon icon={faBell} className={cx('icon')}></FontAwesomeIcon>
                    <span>Thông báo</span>
                    {amount > 0 && <span className={cx('badge')}>{amount}</span>}
                </span>
            </HeadlessTippy>
        </div>
    );
}

export default Notification;
