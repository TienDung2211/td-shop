import classNames from 'classnames/bind';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './Manager.module.scss';

import { Link } from 'react-router-dom';
import images from '~/assets/images';
import DataContext from '~/context/DataContext';
import userServices from '~/services/userServices';
import { useEffect, useState, useContext } from 'react';
import { MANAGER_OPTIONS } from '~/components/MenuOptions/MenuOptions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Manager() {
    const [user, setUser] = useState(null);

    const [isExpanded, setExpendState] = useState(true);

    const { render } = useContext(DataContext);

    const getUserInfo = async () => {
        const access = JSON.parse(localStorage.getItem('access'));

        if (access) {
            let api = await userServices.getUser();

            if (api?.data) {
                setUser(api.data);
            }

            // console.log(user);
        } else {
            setUser(null);
        }
    };
    useEffect(() => {
        getUserInfo();
    }, [render]);

    return (
        <div className={isExpanded ? cx('side-nav-container') : cx('side-nav-container', 'side-nav-container-NX')}>
            <div className={cx('nav-upper')}>
                <div className={isExpanded ? cx('nav-heading') : cx('nav-heading', 'nav-heading-NX')}>
                    {isExpanded && (
                        <div className={cx('nav-brand')}>
                            <div className={cx('logo-app')}>
                                <img src={images.logo} alt="Logo App" />
                            </div>
                        </div>
                    )}
                    <div
                        className={isExpanded ? cx('hamburger', 'hamburger-in') : cx('hamburger', 'hamburger-out')}
                        onClick={() => setExpendState(!isExpanded)}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                <div className={cx('nav-menu')}>
                    {MANAGER_OPTIONS.map((item) => {
                        if (item?.role) {
                            if (item.role === user?.role) {
                                return (
                                    <Link
                                        to={'/manager/' + item.key}
                                        className={isExpanded ? cx('menu-item') : cx('menu-item', 'menu-item-NX')}
                                        key={item.id}
                                    >
                                        <div className={cx('icon')}>{item.icon}</div>
                                        {isExpanded && <p className={cx('text')}>{item.name}</p>}
                                    </Link>
                                );
                            } else return null;
                        } else
                            return (
                                <Link
                                    to={'/manager/' + item.key}
                                    className={isExpanded ? cx('menu-item') : cx('menu-item', 'menu-item-NX')}
                                    key={item.id}
                                >
                                    <div className={cx('icon')}>{item.icon}</div>
                                    {isExpanded && <p className={cx('text')}>{item.name}</p>}
                                </Link>
                            );
                    })}
                </div>
            </div>
            <div className={cx('nav-footer')}>
                {isExpanded ? (
                    <Link to="/" className={cx('nav-return')}>
                        <FontAwesomeIcon className={cx('icon')} icon={faArrowRightFromBracket} />
                        <span className={cx('text')}>Trang chủ</span>
                    </Link>
                ) : (
                    <Link to="/" className={cx('nav-return', 'nav-return-NX')}>
                        <FontAwesomeIcon className={cx('icon')} icon={faArrowRightFromBracket} />
                    </Link>
                )}
            </div>
        </div>
    );
}

export default Manager;
