import classNames from 'classnames/bind';
import styles from './SaleMItem.module.scss';
import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPen } from '@fortawesome/free-solid-svg-icons';

import Button from '~/components/Button';

const cx = classNames.bind(styles);

function SaleMItem({ data }) {
    const [show, setShow] = useState(false);

    return (
        <div className={cx('item')}>
            <div className={cx('info')}>
                <span className={cx('name')}>Mã khuyến mãi : {data.name}</span>
                <span className={cx('desc')}>Mô mả : {data.desc}</span>
                <span className={cx('category')}>
                    Áp dụng cho : <span className={cx('active')}>{data.category}</span>
                </span>
            </div>
            {show ? (
                <div className={cx('discount')}>
                    <span className={cx('label')}>
                        Khuyến mãi :
                        <input type="text" className={cx('input-value')} defaultValue={data.discount} />
                    </span>

                    <Button className={cx('button')} border primary onClick={() => setShow(!show)}>
                        Xác nhận
                    </Button>
                </div>
            ) : (
                <div className={cx('discount')}>
                    <span className={cx('label')}>
                        Khuyến mãi : <span className={cx('value')}> {data.discount} %</span>
                    </span>
                    <div className={cx('button-layout')}>
                        <Button
                            className={cx('button')}
                            transparent
                            rounded
                            iconOnly={<FontAwesomeIcon icon={faPen} onClick={() => setShow(!show)} />}
                        ></Button>
                        <Button
                            className={cx('button')}
                            transparent
                            rounded
                            iconOnly={<FontAwesomeIcon icon={faTrashCan} />}
                        ></Button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SaleMItem;
