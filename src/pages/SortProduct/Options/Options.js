import classNames from 'classnames/bind';
import styles from './Options.module.scss';
import { useState, useEffect, memo } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

import Button from '~/components/Button';

const cx = classNames.bind(styles);

const options = [
    { id: 0, title: 'Mới nhất', key: 'new' },
    { id: 1, title: 'Bán chạy', key: 'popular' },
    { id: 2, title: 'Giá giảm', key: 'price-desc' },
    { id: 3, title: 'Giá tăng', key: 'price-asc' },
];

function Options({ handleChangeFilter }) {
    // const [page, setPage] = useState(0);
    const [isActive, setIsActive] = useState(0);
    const [filter, setFilter] = useState('new');

    useEffect(() => {
        handleChangeFilter(filter);
    }, [filter]);

    return (
        <div className={cx('options-layout')}>
            <div className={cx('sort-options')}>
                <span className={cx('sort-options__lable')}>Sắp xếp theo</span>

                {options.map((option, index) => {
                    if (isActive === index) {
                        return (
                            <Button key={option.key} primary border className={cx('sort-options-item')}>
                                {option.title}
                            </Button>
                        );
                    } else {
                        return (
                            <Button
                                key={option.key}
                                border
                                className={cx('sort-options-item')}
                                onClick={() => {
                                    setIsActive(index);
                                    setFilter(options[index].key);
                                }}
                            >
                                {option.title}
                            </Button>
                        );
                    }
                })}

                <div className={cx('sort-options-page')}>
                    <div className={cx('number')}>
                        <span className={cx('number-currenly')}>1</span>
                        <span>/</span>
                        <span className={cx('number-total')}>14</span>
                    </div>

                    <div className={cx('control')}>
                        <Button
                            iconOnly={<FontAwesomeIcon icon={faAngleLeft} />}
                            className={cx('control-btn', 'separete-full')}
                        ></Button>
                        <Button
                            iconOnly={<FontAwesomeIcon icon={faAngleRight} />}
                            className={cx('control-btn')}
                        ></Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default memo(Options);
