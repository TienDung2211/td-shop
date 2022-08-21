import classNames from 'classnames/bind';

import styles from './Modal.module.scss';

const cx = classNames.bind(styles);

function Modal({ children, closeModal }) {
    return (
        <div className={cx('modal')} onClick={closeModal}>
            <div className={cx('modal-body')}>{children}</div>
        </div>
    );
}

export default Modal;
