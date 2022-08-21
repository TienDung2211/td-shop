import classNames from 'classnames/bind';
import styles from './SideBar.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function SideBar() {
    return (
        <aside className={cx('wrapper')}>
            <nav className={cx('category')}>
                <h3 className={cx('category-heading')}>
                    <FontAwesomeIcon icon={faList} className={cx('category-heading-icon')} />
                    Danh mục
                </h3>

                <ul className={cx('category-list')}>
                    <li className={cx('category-item category-item--active')}>
                        <a href="" className={cx('category-item__link')}>
                            Laptop
                        </a>
                    </li>
                    <li className={cx('category-item')}>
                        <a href="" className={cx('category-item__link')}>
                            Computer
                        </a>
                    </li>
                    <li className={cx('category-item')}>
                        <a href="" className={cx('category-item__link')}>
                            Smartphone
                        </a>
                    </li>
                </ul>
            </nav>
        </aside>
    );
}

export default SideBar;
