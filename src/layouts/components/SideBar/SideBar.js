import classNames from 'classnames/bind';
import styles from './SideBar.module.scss';

import { useState, useEffect, useContext } from 'react';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import CheckOptions from '~/components/CheckOptions';
import variationServices from '~/services/variationServices';
import DataContext from '~/context/DataContext';

const cx = classNames.bind(styles);

function SideBar({ onChangeVariations }) {
    const [varitons, setVaritons] = useState([]);

    const { render } = useContext(DataContext);

    useEffect(() => {
        const fetchAPI = async () => {
            let api = await variationServices.getAllVariations();
            setVaritons(api.content);
        };

        fetchAPI();
    }, [render]);

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
