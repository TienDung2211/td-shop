import classNames from 'classnames/bind';
import styles from './Options.module.scss';
import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import HeadlessTippy from '@tippyjs/react/headless';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function Options() {
    const [showOptionsPrice, setShowOptionsPrice] = useState(false);

    const handleClick = () => {
        setShowOptionsPrice(!showOptionsPrice);
    };

    return (
        <div className={cx('options-layout')}>
            <div className={cx('sort-options')}>
                <span className={cx('sort-options__lable')}>Sắp xếp theo</span>

                <Button border className={cx('sort-options-item')}>
                    Mới nhất
                </Button>
                <Button primary border className={cx('sort-options-item')}>
                    Bán chạy
                </Button>

                <div className={cx('sort-options-item')}>
                    <HeadlessTippy
                        interactive
                        visible={showOptionsPrice}
                        placement="bottom-start"
                        render={(attrs) => (
                            <div className={cx('price-layout')} tabIndex="-1" {...attrs}>
                                <PopperWrapper>
                                    <ul className={cx('price-list')}>
                                        <li className={cx('price-item', 'selection-item')}>
                                            <a href="" className={cx('')}>
                                                Từ thấp đến cao
                                            </a>
                                        </li>
                                        <li className={cx('price-item')}>
                                            <a href="" className={cx('')}>
                                                Từ cao đến thấp
                                            </a>
                                        </li>
                                    </ul>
                                </PopperWrapper>
                            </div>
                        )}
                    >
                        <div className={cx('price', 'selection')}>
                            <span className={cx('select-lable')}>Giá</span>
                            <FontAwesomeIcon icon={faAngleDown} onClick={handleClick} />
                        </div>
                    </HeadlessTippy>
                </div>

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

export default Options;
