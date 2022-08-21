import classNames from 'classnames/bind';
import styles from './QrCode.module.scss';
import HeadlessTippy from '@tippyjs/react/headless';

import images from '~/assets/images';
import { Wrapper as PopperWrapper } from '~/components/Popper';

const cx = classNames.bind(styles);

function QrCode({ title }) {
    return (
        <div>
            <HeadlessTippy
                interactive
                placement="bottom-start"
                render={(attrs) => (
                    <div className={cx('qr-wrapper')} tabIndex="-1" {...attrs}>
                        <PopperWrapper>
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
                        </PopperWrapper>
                    </div>
                )}
            >
                <span>{title}</span>
            </HeadlessTippy>
        </div>
    );
}

export default QrCode;
