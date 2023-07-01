import classNames from 'classnames/bind';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from './DefaultLayout.module.scss';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    return (
        <div className={cx('container-fluid', 'p-0', 'm-0', 'wrapper')}>
            <div className={cx('row', 'p-0', 'm-0')}>
                <Header />
            </div>
            <div className={cx('row', 'p-0', 'm-0', 'd-flex', 'justify-content-center')}>
                <div className={cx('container')}>{children}</div>
            </div>
            <Footer />
        </div>
    );
}

export default DefaultLayout;
