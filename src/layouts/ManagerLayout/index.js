import Manager from '~/pages/Manager';
import classNames from 'classnames/bind';
import Button from '~/components/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './ManagerLayout.module.scss';

const cx = classNames.bind(styles);

function ManagerLayout({ children }) {
    return (
        <div className={cx('w-100')}>
            <div className={cx('row')}>
                <Manager />
                <div className={cx('col')}>
                    <div className={cx('page')}>{children}</div>
                </div>
            </div>
        </div>
    );
}

export default ManagerLayout;
