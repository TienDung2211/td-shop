import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClockRotateLeft } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';

import { Wrapper as PopperWrapper } from '~/components/Popper';

const cx = classNames.bind(styles);

function SearchItem({ title }) {
    return (
        <div className={cx('search-item', 'item')}>
            <FontAwesomeIcon icon={faClockRotateLeft} className={cx('icon')} />
            <a href="" className={cx('search-text')}>
                {title}
            </a>
            <a className={cx('search-clear')}>Xóa</a>
        </div>
    );
}

export default SearchItem;
