import classNames from 'classnames/bind';
import styles from './CommentM.module.scss';

const cx = classNames.bind(styles);

function CommentM() {
    return <div className={cx('wrapper')}>Tính năng đang được phát triển</div>;
}

export default CommentM;
