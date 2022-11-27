import classNames from 'classnames/bind';
import styles from './OptionsPopper.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import Options from '~/components/Options';
import HeadlessTippy from '@tippyjs/react/headless';

const cx = classNames.bind(styles);

const listOptions = [
    {
        title: 'Laptop theo cấu hình',
        options: [
            'Intel Core i3',
            'Intel Core i5',
            'Intel Core i7',
            'Intel Core i9',
            'AMD Ryzen 3',
            'AMD Ryzen 5',
            'AMD Ryzen 7',
        ],
    },
    {
        title: 'Laptop theo kích thước',
        options: ['Dưới 13 inch', '13-15 inch', 'Trên 15 inch'],
    },
    {
        title: 'Laptop theo thương hiệu',
        options: ['Apple(MacBook)', 'Acer', 'ASUS', 'Dell', 'HP', 'Lenovo', 'LG', 'MSI', 'Huawei', 'Gigabyte'],
    },
    {
        title: 'Laptop theo nhu cầu',
        options: [
            'Laptop Gaming',
            'Laptop đồ họa',
            'Laptop 2 In 1',
            'Laptop sinh viên',
            'Laptop văn phòng',
            'Laptop  mỏng nhẹ',
            'Laptop Mini',
        ],
    },
];

function OptionsPopper({ white, lowBlack, manager, className }) {
    const layout = cx('layout', {
        manager,
        [className]: className,
    });
    const button = cx('button', {
        white,
        lowBlack,
        [className]: className,
    });
    return (
        <div className={cx('wrapper')}>
            <HeadlessTippy
                interactive
                placement="bottom-start"
                render={(attrs) => (
                    <div className={layout} tabIndex="-1" {...attrs}>
                        <div className={cx('list-options')}>
                            {listOptions.map((options) => {
                                return (
                                    <div className={cx('grid-column-3')}>
                                        <Options data={options} />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            >
                <div className={button}>
                    <FontAwesomeIcon icon={faBars} />
                </div>
            </HeadlessTippy>
        </div>
    );
}

export default OptionsPopper;
