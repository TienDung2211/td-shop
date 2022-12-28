import classNames from 'classnames/bind';
import styles from './CommentM.module.scss';

import Upcoming from '~/components/Upcoming/Upcoming';

const cx = classNames.bind(styles);

function CommentM() {
    return (
        <div className={cx('wrapper')}>
            <Upcoming />
        </div>
    );
}

export default CommentM;
