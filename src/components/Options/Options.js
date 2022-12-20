import classNames from 'classnames/bind';
import styles from './Options.module.scss';

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Options({ data }) {
    useEffect(() => {}, []);

    return data ? (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>{data.name}</div>
            <ul className={cx('list')}>
                {data.setOfVariationOptions.map((variationOption, index) => {
                    return (
                        <Link
                            key={index}
                            to={'/sort'}
                            state={{
                                masterId: data.id,
                                id: variationOption.id,
                                value: `${variationOption.id}`,
                                load: true,
                                loadSideBar: true,
                            }}
                        >
                            <div className={cx('item')}>{variationOption.value}</div>
                        </Link>
                    );
                })}
            </ul>
        </div>
    ) : null;
}

export default Options;
