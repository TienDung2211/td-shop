import classNames from 'classnames/bind';
import styles from './Variations.module.scss';

import { useState, useEffect, useContext } from 'react';
import Options from '~/components/Options';
import DataContext from '~/context/DataContext';
import categoryServices from '~/services/categoryServices';

const cx = classNames.bind(styles);

function Variations() {
    const [showVariations, setShowVariations] = useState(false);
    const [contentLayoutWidth, setContentLayoutWidth] = useState('300px');
    const [varitons, setVaritons] = useState([]);
    const [categorys, setCategorys] = useState([]);
    const [masterCategory, setMasterCategory] = useState([]);
    const [idMCategory, setIdMCategory] = useState(1);

    const { render } = useContext(DataContext);

    const getAllMasterCategory = async () => {
        let api = await categoryServices.getAllMasterCategory();
        if (api?.data) {
            setMasterCategory(api.data.content);
        }
    };

    const getCategorysById = async () => {
        const api = await categoryServices.getAllParentCategory(idMCategory);
        setCategorys(api.data);
    };

    useEffect(() => {
        getAllMasterCategory();
    }, [render]);

    useEffect(() => {
        getCategorysById();
    }, [render, idMCategory]);

    useEffect(() => {
        if (showVariations) {
            setContentLayoutWidth('100%');
        } else {
            setContentLayoutWidth('300px');
        }
    }, [showVariations]);

    return varitons ? (
        <div className={cx('wrapper')}>
            <div
                className={cx('content-layout')}
                style={{ width: contentLayoutWidth }}
                onMouseOver={() => setShowVariations(true)}
                onMouseOut={() => setShowVariations(false)}
            >
                <div className={cx('list-master')}>
                    {masterCategory.map((item, index) => {
                        return (
                            <span
                                className={cx('item')}
                                key={index}
                                onMouseOver={() => {
                                    setIdMCategory(item.id);
                                }}
                            >
                                {item.name}
                            </span>
                        );
                    })}
                </div>
                {showVariations && (
                    <div className={cx('list-categorys')}>
                        {categorys.map((category, index) => {
                            return (
                                <div key={index} className={cx('grid-column-4')}>
                                    <Options data={category} mId={idMCategory} />
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    ) : null;
}

export default Variations;
