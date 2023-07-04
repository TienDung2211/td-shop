import classNames from 'classnames/bind';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './SettingsLayout.module.scss';

import Settings from '~/pages/Settings';
import Header from '../components/Header';
import { useState, useRef, useEffect } from 'react';

const cx = classNames.bind(styles);

function SettingsLayout({ children }) {
    const [open, setOpen] = useState(false);
    const layoutRef = useRef();

    const handleClick = () => {
        setOpen(!open);
    };

    const handleClickSetting = () => {
        const element = layoutRef.current;
        const width = element.offsetWidth;
        if (width >= 768) {
            setOpen(true);
        } else {
            setOpen(false);
        }
    };

    useEffect(() => {
        const getWidth = () => {
            const element = layoutRef.current;
            const width = element.offsetWidth;
            if (width >= 768) {
                setOpen(true);
            } else {
                setOpen(false);
            }
        };

        getWidth();

        window.addEventListener('resize', getWidth);

        return () => {
            window.removeEventListener('resize', getWidth);
        };
    }, []);

    return (
        <div className={cx('container-fluid', 'wrapper', 'p-0')}>
            <Header />
            <div className={cx('content', 'row', 'd-flex', 'w-100')} ref={layoutRef}>
                <div className={cx('menu__row', { open: open })}>
                    <div
                        className={cx('nav-icon', 'd-flex', 'justify-content-center', { open: open })}
                        onClick={handleClick}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                {open && (
                    <div className={cx('menu-layout')}>
                        <Settings onClickSetting={handleClickSetting} />
                    </div>
                )}
                <div className={cx('page', { open: open })}>{children}</div>
            </div>
        </div>
    );
}

export default SettingsLayout;
