import classNames from 'classnames/bind';
import styles from './SideBar.module.scss';

import { useState, useEffect } from 'react';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import CheckOptions from '~/components/CheckOptions';
import variationServices from '~/services/variationServices';

const cx = classNames.bind(styles);

function SideBar({ onChangeVariations }) {
    const [varitons, setVaritons] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            let dataAPI = await variationServices.getAllVariations();
            const results = dataAPI.content;
            setVaritons(results);
        };

        fetchAPI();
    }, []);

    return varitons ? (
        <aside className={cx('wrapper')}>
            <nav className={cx('category')}>
                <h3 className={cx('category-heading')}>
                    <FontAwesomeIcon icon={faList} className={cx('category-heading-icon')} />
                    Danh mục
                </h3>
                <ul className={cx('category-list')}>
                    {varitons.map((variation, index) => {
                        return <CheckOptions key={index} data={variation} onChangeVariations={onChangeVariations} />;
                    })}
                </ul>
            </nav>
        </aside>
    ) : null;
}

export default SideBar;
