import classNames from 'classnames/bind';
import Manager from '~/pages/Manager';
import styles from './ManagerLayout.module.scss';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function ManagerLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('grid')}>
                    <div className={cx('grid-full-width')}>
                        <div className={cx('grid-row')}>
                            <div className={cx('path')}>
                                <Button to="/" transparent>
                                    Trang chủ
                                </Button>
                            </div>
                        </div>
                        <div className={cx('grid-row')}>
                            <div className={cx('grid-column-3')}>
                                <Manager />
                            </div>
                            <div className={cx('grid-column-9', 'content')}>
                                <div className={cx('page')}>{children}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ManagerLayout;
