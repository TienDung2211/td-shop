import { useState, useRef } from 'react';

import HeadlessTippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faSpinner, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import SearchItem from './SearchItem';

const cx = classNames.bind(styles);

function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [showResults, setShowResults] = useState(false);
    const [loading, setLoading] = useState(false);

    const inputRef = useRef();

    const handleClear = () => {
        setSearchValue('');
        setShowResults(false);
        setLoading(false);
        inputRef.current.focus();
    };

    const handleHideResults = () => {
        setShowResults(false);
    };

    const handleChange = (e) => {
        const inputValue = e.target.value;
        if (!inputValue.startsWith(' ')) {
            setSearchValue(inputValue);
            setLoading(true);
        }
    };

    return (
        // thêm thẻ div trống để khi scroll -> HeadlessTippy không bị nhảy
        <div>
            <HeadlessTippy
                interactive
                visible={showResults}
                ref={inputRef}
                placement="bottom-start"
                render={(attrs) => (
                    <div className={cx('search-results')} tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                            <label className={cx('search-results-lable')}>Lịch sử tìm kiếm</label>
                            <div className={cx('search-results-list')}>
                                <SearchItem title="Điện thoại iPhone 13 Pro Max 128GB" />
                                <SearchItem title="Điện thoại Samsung Galaxy A33 5G 6GB" />
                                <SearchItem title="Laptop Acer Nitro 5" />
                            </div>
                        </PopperWrapper>
                    </div>
                )}
                onClickOutside={handleHideResults}
            >
                <div className={cx('search')}>
                    <input
                        className={cx('search-input')}
                        type="text"
                        ref={inputRef}
                        placeholder="Nhập tên sản phẩm"
                        value={searchValue}
                        spellCheck={false}
                        onChange={handleChange}
                        onFocus={() => setShowResults(true)}
                    ></input>
                    <button className={cx('search-control')}>
                        {loading && (
                            // <FontAwesomeIcon
                            //     icon={faSpinner}
                            //     className={cx('search-control-loading', 'search-control-btn')}
                            // />

                            <FontAwesomeIcon
                                onClick={handleClear}
                                icon={faCircleXmark}
                                className={cx('search-control-clear', 'search-control-btn')}
                            />
                        )}
                    </button>
                    <div className={cx('search-btn')}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} className={cx('icon')} />
                    </div>
                </div>
            </HeadlessTippy>
        </div>
    );
}

export default Search;
