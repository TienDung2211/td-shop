import classNames from 'classnames/bind';
import styles from './SideBar.module.scss';

import { useState, useEffect, useContext } from 'react';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import CheckOptions from '~/components/CheckOptions';
import variationServices from '~/services/variationServices';
import DataContext from '~/context/DataContext';

const cx = classNames.bind(styles);

function SideBar({ mId, onChangeVariations }) {
    const [varitons, setVaritons] = useState([]);

    const { render } = useContext(DataContext);

    useEffect(() => {
        const fetchAPI = async () => {
            let api;
            if (mId == 0) {
                api = await variationServices.getAllVariations();
                setVaritons(api.content);
            } else {
                api = await variationServices.getVariationById(mId);
                setVaritons(api.data);
            }
        };

        fetchAPI();
    }, [render]);

    return varitons ? (
        <aside className={cx('wrapper')}>
            <h3 className={cx('heading')}>
                <FontAwesomeIcon icon={faList} className={cx('heading-icon')} />
                Danh mục
            </h3>
            <ul className={cx('list')}>
                {varitons.map((variation, index) => {
                    return (
                        <div key={index} className={cx('col-6', 'col-sm-4', 'col-md-12', 'col-lg-12', 'col-xl-12')}>
                            <CheckOptions data={variation} onChangeVariations={onChangeVariations} />
                        </div>
                    );
                })}
            </ul>
        </aside>
    ) : null;
}

export default SideBar;
