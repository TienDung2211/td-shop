import classNames from 'classnames/bind';
import styles from './Options.module.scss';
import { useState, useEffect, memo } from 'react';

import Select from 'react-select';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const options = [
    { label: 0, value: 'Mới nhất', key: 'new' },
    { label: 1, value: 'Bán chạy', key: 'popular' },
    { label: 2, value: 'Giá giảm', key: 'price-desc' },
    { label: 3, value: 'Giá tăng', key: 'price-asc' },
];

function Options({ onChangeFilter, page, totalPages, onClickPagination }) {
    const [isActive, setIsActive] = useState(0);
    const [filter, setFilter] = useState('new');

    const handleChangeFilter = (selection) => {
        setIsActive(selection.label);
        setFilter(selection.key);
    };

    useEffect(() => {
        onChangeFilter(filter);
    }, [filter]);

    return (
        <div className={cx('w-100')}>
            <div className={cx('sort-layout')}>
                <span className={cx('lable')}>Sắp xếp theo</span>

                <div className={cx('list', 'button')}>
                    {options.map((option, index) => {
                        if (isActive === index) {
                            return (
                                <Button key={option.label} primary border className={cx('item')}>
                                    {option.value}
                                </Button>
                            );
                        } else {
                            return (
                                <Button
                                    key={option.label}
                                    border
                                    className={cx('item')}
                                    onClick={() => {
                                        setIsActive(index);
                                        setFilter(option.key);
                                    }}
                                >
                                    {option.value}
                                </Button>
                            );
                        }
                    })}
                </div>

                <div className={cx('list', 'select')}>
                    <Select
                        formatOptionLabel={(option) => `${option.value}`}
                        className={cx('item', 'w-100')}
                        value={options[isActive]}
                        onChange={handleChangeFilter}
                        options={options}
                    />
                </div>

                <div className={cx('page')}>
                    <div className={cx('number')}>
                        <span className={cx('number-currenly')}>{page + 1}</span>
                        <span>/</span>
                        <span className={cx('number-total')}>{totalPages}</span>
                    </div>

                    <div className={cx('control')}>
                        <Button
                            iconOnly={<FontAwesomeIcon icon={faAngleLeft} />}
                            className={cx('control-btn', 'separete-full')}
                            onClick={() => {
                                if (page > 0) {
                                    onClickPagination(page - 1);
                                }
                            }}
                        ></Button>
                        <Button
                            iconOnly={<FontAwesomeIcon icon={faAngleRight} />}
                            className={cx('control-btn')}
                            onClick={() => {
                                if (page < totalPages - 1) {
                                    onClickPagination(page + 1);
                                }
                            }}
                        ></Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default memo(Options);
