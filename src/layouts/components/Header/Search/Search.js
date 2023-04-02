import classNames from 'classnames/bind';
import styles from './Search.module.scss';

import { useState, useRef, useEffect, useContext } from 'react';
import HeadlessTippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faSpinner, faCircleXmark } from '@fortawesome/free-solid-svg-icons';

import SearchItem from './SearchItem';
import useDebounce from '~/hooks/useDebounce';
import productServices from '~/services/productServices';
import { Wrapper as PopperWrapper } from '~/components/Popper';

const cx = classNames.bind(styles);

function Search() {
    const [loading, setLoading] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [showResults, setShowResults] = useState(false);
    const [searchResults, setSearchResults] = useState([]);

    const inputRef = useRef();

    const keyword = useDebounce(searchValue, 500);

    useEffect(() => {
        if (!keyword.trim()) {
            setSearchResults([]);
            return;
        }

        const fetchApi = async () => {
            setLoading(true);
            const result = await productServices.getProducts(null, 0, null, keyword);
            setSearchResults(result.content);
            setLoading(false);
        };

        fetchApi();
    }, [keyword]);

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
        const inputValue = e.currentTarget.value;
        if (!inputValue.startsWith(' ')) {
            setSearchValue(inputValue);
            setLoading(true);
        }
    };

    return (
        <div>
            <HeadlessTippy
                interactive
                visible={showResults}
                placement="bottom-start"
                render={(attrs) => (
                    <div className={cx('search-results')} tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                            {searchResults.length > 0 ? (
                                <div>
                                    <label className={cx('search-results-lable')}>Kết quả tìm kiếm</label>
                                    <div className={cx('search-results-list')}>
                                        {searchResults.map((item, index) => (
                                            <SearchItem
                                                data={item}
                                                key={index}
                                                onClickItem={() => {
                                                    setShowResults(false);
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <span className={cx('no-product')}>Không có sản phẩm tìm kiếm</span>
                            )}
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
                        onFocus={() => {
                            setShowResults(true);
                        }}
                    ></input>
                    <button className={cx('search-control')}>
                        {loading && searchValue !== '' && (
                            <FontAwesomeIcon
                                icon={faSpinner}
                                className={cx('search-control-loading', 'search-control-btn')}
                            />
                        )}
                        {!!searchValue && !loading && (
                            <FontAwesomeIcon
                                onClick={handleClear}
                                icon={faCircleXmark}
                                className={cx('search-control-clear', 'search-control-btn')}
                            />
                        )}
                    </button>
                    <div
                        className={cx('search-btn')}
                        onClick={() => {
                            setShowResults(true);
                        }}
                    >
                        <FontAwesomeIcon icon={faMagnifyingGlass} className={cx('icon')} />
                    </div>
                </div>
            </HeadlessTippy>
        </div>
    );
}

export default Search;
