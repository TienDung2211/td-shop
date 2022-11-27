import classNames from 'classnames/bind';
import styles from './SaleM.module.scss';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import HeadlessTippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import Button from '~/components/Button';

import SaleMItem from './SaleMItem';

const cx = classNames.bind(styles);

const brands = [
    {
        id: 0,
        name: 'Acer',
        desc: 'Laptop Lenovo Ideapad Slim 5 15ITL05 82FG01HPVN (15.6" Intel Core i5-1135G7/16GB/512GB SSD/Windows 11 Home SL/1.7kg)',
        category: 'Intel Core i3',
        discount: 20,
        logo: 'https://i.pinimg.com/originals/5e/7e/1d/5e7e1d18e2c479381678c3b5670bf3c0.jpg',
    },
    {
        id: 0,
        name: 'Acer',
        desc: 'Laptop Lenovo Ideapad Slim 5 15ITL05 82FG01HPVN (15.6" Intel Core i5-1135G7/16GB/512GB SSD/Windows 11 Home SL/1.7kg)',
        category: 'Intel Core i3',
        discount: 20,
        logo: 'https://i.pinimg.com/originals/5e/7e/1d/5e7e1d18e2c479381678c3b5670bf3c0.jpg',
    },
    {
        id: 0,
        name: 'Acer',
        desc: 'Laptop Lenovo Ideapad Slim 5 15ITL05 82FG01HPVN (15.6" Intel Core i5-1135G7/16GB/512GB SSD/Windows 11 Home SL/1.7kg)',
        category: 'Intel Core i3',
        discount: 20,
        logo: 'https://i.pinimg.com/originals/5e/7e/1d/5e7e1d18e2c479381678c3b5670bf3c0.jpg',
    },
    {
        id: 0,
        name: 'Acer',
        desc: 'Laptop Lenovo Ideapad Slim 5 15ITL05 82FG01HPVN (15.6" Intel Core i5-1135G7/16GB/512GB SSD/Windows 11 Home SL/1.7kg)',
        category: 'Intel Core i3',
        discount: 20,
        logo: 'https://i.pinimg.com/originals/5e/7e/1d/5e7e1d18e2c479381678c3b5670bf3c0.jpg',
    },
    {
        id: 0,
        name: 'Acer',
        desc: 'Laptop Lenovo Ideapad Slim 5 15ITL05 82FG01HPVN (15.6" Intel Core i5-1135G7/16GB/512GB SSD/Windows 11 Home SL/1.7kg)',
        category: 'Intel Core i3',
        discount: 20,
        logo: 'https://i.pinimg.com/originals/5e/7e/1d/5e7e1d18e2c479381678c3b5670bf3c0.jpg',
    },
    {
        id: 0,
        name: 'Acer',
        desc: 'Laptop Lenovo Ideapad Slim 5 15ITL05 82FG01HPVN (15.6" Intel Core i5-1135G7/16GB/512GB SSD/Windows 11 Home SL/1.7kg)',
        category: 'Intel Core i3',
        discount: 20,
        logo: 'https://i.pinimg.com/originals/5e/7e/1d/5e7e1d18e2c479381678c3b5670bf3c0.jpg',
    },
    {
        id: 0,
        name: 'Acer',
        desc: 'Laptop Lenovo Ideapad Slim 5 15ITL05 82FG01HPVN (15.6" Intel Core i5-1135G7/16GB/512GB SSD/Windows 11 Home SL/1.7kg)',
        category: 'Intel Core i3',
        discount: 20,
        logo: 'https://i.pinimg.com/originals/5e/7e/1d/5e7e1d18e2c479381678c3b5670bf3c0.jpg',
    },
    {
        id: 0,
        name: 'Acer',
        desc: 'Laptop Lenovo Ideapad Slim 5 15ITL05 82FG01HPVN (15.6" Intel Core i5-1135G7/16GB/512GB SSD/Windows 11 Home SL/1.7kg)',
        category: 'Intel Core i3',
        discount: 20,
        logo: 'https://i.pinimg.com/originals/5e/7e/1d/5e7e1d18e2c479381678c3b5670bf3c0.jpg',
    },
    {
        id: 0,
        name: 'Acer',
        desc: 'Laptop Lenovo Ideapad Slim 5 15ITL05 82FG01HPVN (15.6" Intel Core i5-1135G7/16GB/512GB SSD/Windows 11 Home SL/1.7kg)',
        category: 'Intel Core i3',
        discount: 20,
        logo: 'https://i.pinimg.com/originals/5e/7e/1d/5e7e1d18e2c479381678c3b5670bf3c0.jpg',
    },
    {
        id: 0,
        name: 'Acer',
        desc: 'Laptop Lenovo Ideapad Slim 5 15ITL05 82FG01HPVN (15.6" Intel Core i5-1135G7/16GB/512GB SSD/Windows 11 Home SL/1.7kg)',
        category: 'Intel Core i3',
        discount: 20,
        logo: 'https://i.pinimg.com/originals/5e/7e/1d/5e7e1d18e2c479381678c3b5670bf3c0.jpg',
    },
    {
        id: 0,
        name: 'Acer',
        desc: 'Laptop Lenovo Ideapad Slim 5 15ITL05 82FG01HPVN (15.6" Intel Core i5-1135G7/16GB/512GB SSD/Windows 11 Home SL/1.7kg)',
        category: 'Intel Core i3',
        discount: 20,
        logo: 'https://i.pinimg.com/originals/5e/7e/1d/5e7e1d18e2c479381678c3b5670bf3c0.jpg',
    },
];

function SaleM() {
    const [showOptionsAccount, setShowOptionsAccount] = useState(false);

    const handleClick = () => {
        setShowOptionsAccount(!showOptionsAccount);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('control')}>
                <form className={cx('control-filt')}>
                    <div className={cx('options-layout')}>
                        <HeadlessTippy
                            interactive
                            visible={showOptionsAccount}
                            placement="bottom-start"
                            render={(attrs) => (
                                <div className={cx('options')} tabIndex="-1" {...attrs}>
                                    <PopperWrapper>
                                        <ul className={cx('options-list')}>
                                            <li className={cx('options-item', 'selection-item')}>
                                                <span>Từ thấp đến cao</span>
                                            </li>
                                            <li className={cx('options-item')}>
                                                <span>Từ cao xuống thấp</span>
                                            </li>
                                        </ul>
                                    </PopperWrapper>
                                </div>
                            )}
                        >
                            <div className={cx('label')}>
                                <span>Sắp xếp theo</span>
                                <FontAwesomeIcon icon={faAngleDown} onClick={handleClick} />
                            </div>
                        </HeadlessTippy>
                    </div>

                    <div className={cx('input-layout')}>
                        <input className={cx('input')} type="text" placeholder="Nhập tên tìm kiếm"></input>
                    </div>

                    <div className={cx('button-layout')}>
                        <Button primary border>
                            Áp dụng
                        </Button>
                    </div>
                </form>
            </div>

            <div className={cx('results')}>
                {brands.map((brand) => {
                    return <SaleMItem data={brand} />;
                })}
            </div>
        </div>
    );
}

export default SaleM;
