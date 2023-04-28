import classNames from 'classnames/bind';
import styles from './AttributeM.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPen } from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function AttributeMItem({ data, onClickAttribute, onClickUpdate, onClickRemove }) {
    return (
        <div className={cx('item-layout')} onClick={onClickAttribute}>
            <div className={cx('info')}>
                <span className={cx('info-item')}>{data.name}</span>
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

export default AttributeMItem;
