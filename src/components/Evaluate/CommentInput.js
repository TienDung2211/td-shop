import classNames from 'classnames/bind';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import styles from './Evaluate.module.scss';
import Button from '../Button';

const cx = classNames.bind(styles);

function CommentInput() {
    return (
        <div className={cx('form-group')}>
            <label htmlFor="comment" className={cx('label')}>
                Phản hồi về sản phẩm
            </label>
            <textarea className={cx('form-control')} id="comment" rows="5"></textarea>
            <div className={cx('btn')}>
                <Button primary border>
                    Phản hồi
                </Button>
            </div>
        </div>
    );
}

export default CommentInput;
