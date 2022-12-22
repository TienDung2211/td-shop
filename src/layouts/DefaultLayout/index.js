import classNames from 'classnames/bind';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from './DefaultLayout.module.scss';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>
                <div className={cx('content')}>
                    <div className={cx('page')}>{children}</div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default DefaultLayout;
