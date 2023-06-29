import classNames from 'classnames/bind';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './BrandM.module.scss';

import brandServices from '~/services/brandServices';
import { useEffect, useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function BrandMItem({ data, onClick }) {
    useEffect(() => {});

    return (
        <div className={cx('item')} onClick={() => onClick()}>
            <div
                className={cx('item-img')}
                style={{
                    backgroundImage: `url('${data.logoUrl}')`,
                }}
            ></div>
            <span className={cx('text')}>{data.name.toUpperCase()}</span>
        </div>
    );
}

export default BrandMItem;
