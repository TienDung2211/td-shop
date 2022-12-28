import classNames from 'classnames/bind';
import styles from './Upcoming.module.scss';

const cx = classNames.bind(styles);

function Upcoming() {
    return <div className={cx('wrapper')}>Tính năng đang được phát triển</div>;
}

export default Upcoming;
