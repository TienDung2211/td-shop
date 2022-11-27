import classNames from 'classnames/bind';
import styles from './Message.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Message() {
    return (
        <a href="/" className={cx('wrapper')}>
            <FontAwesomeIcon icon={faCommentDots} className={cx('icon')} />
        </a>
    );
}

export default Message;
