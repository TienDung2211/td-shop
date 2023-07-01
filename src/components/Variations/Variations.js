import classNames from 'classnames/bind';
import styles from './Variations.module.scss';

import { useState, useEffect, useContext } from 'react';
import Options from '~/components/Options';
import DataContext from '~/context/DataContext';
import categoryServices from '~/services/categoryServices';

const cx = classNames.bind(styles);

function Variations() {
    const [varitons, setVaritons] = useState([]);
    const [categorys, setCategorys] = useState([]);
    const [masterCategory, setMasterCategory] = useState([]);
    const [idMCategory, setIdMCategory] = useState(1);

    const { render } = useContext(DataContext);

    const getAllMasterCategory = async () => {
        let api = await categoryServices.getAllMasterCategory();
        if (api?.status === 200) {
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

    return varitons ? (
        <div className={cx('wrapper')}>
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
            <div className={cx('list-categorys')}>
                {categorys.map((category, index) => {
                    return (
                        <div key={index} className={cx('col-12', 'col-sm-6', 'col-md-6', 'col-lg-6', 'col-xl-4')}>
                            <Options data={category} mId={idMCategory} />
                        </div>
                    );
                })}
            </div>
        </div>
    ) : null;
}

export default Variations;
