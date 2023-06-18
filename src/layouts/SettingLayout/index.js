import classNames from 'classnames/bind';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './SettingsLayout.module.scss';

import Settings from '~/pages/Settings';
import Header from '../components/Header';

const cx = classNames.bind(styles);

function SettingsLayout({ children }) {
    return (
        <div className={cx('wrapper', 'container-fluid')}>
            <Header />
            <div className={cx('content', 'row')}>
                <div className={cx('flex-row', 'd-flex')}>
                    <Settings />
                    <div className={cx('page')}>{children}</div>
                </div>
            </div>
        </div>
    );
}

export default SettingsLayout;
