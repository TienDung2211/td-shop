import classNames from 'classnames/bind';
import styles from './Options.module.scss';

import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Options({ data, mId }) {
    useEffect(() => {}, []);

    return data ? (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>{data.Name}</div>
            <ul className={cx('list')}>
                {data.ChildCategories.map((CategoryOption, index) => {
                    return (
                        <Link key={index} to={`/sort/${mId}/${CategoryOption.Id}`}>
                            <div className={cx('item')}>{CategoryOption.Name}</div>
                        </Link>
                    );
                })}
            </ul>
        </div>
    ) : null;
}

export default Options;
