import classNames from 'classnames/bind';
import styles from './CategoryM.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPen } from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function CategoryMItem({ data, onClickCategory, onClickUpdate, onClickRemove }) {
    return (
        <div className={cx('item-layout')} onClick={onClickCategory}>
            <div className={cx('info')}>
                <span className={cx('info-item')}>{data.Name}</span>
            </div>
            <Button
                className={cx('button')}
                transparent
                rounded
                iconOnly={<FontAwesomeIcon icon={faPen} />}
                onClick={onClickUpdate}
            ></Button>
            <Button
                className={cx('button')}
                transparent
                rounded
                iconOnly={<FontAwesomeIcon icon={faTrashCan} />}
                onClick={onClickRemove}
            ></Button>
        </div>
    );
}

export default CategoryMItem;
