import classNames from 'classnames/bind';
import styles from './SideBar.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList } from '@fortawesome/free-solid-svg-icons';

import Options from '~/components/Options';

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

function SideBar() {
    return (
        <aside className={cx('wrapper')}>
            <nav className={cx('category')}>
                <h3 className={cx('category-heading')}>
                    <FontAwesomeIcon icon={faList} className={cx('category-heading-icon')} />
                    Danh mục
                </h3>

                <ul className={cx('category-list')}>
                    {listOptions.map((options) => {
                        return <Options data={options} />;
                    })}
                </ul>
            </nav>
        </aside>
    );
}

export default SideBar;
