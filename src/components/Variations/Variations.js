import classNames from 'classnames/bind';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './Variations.module.scss';

import { useState, useEffect, useContext, useRef } from 'react';
import Options from '~/components/Options';
import DataContext from '~/context/DataContext';
import categoryServices from '~/services/categoryServices';

const cx = classNames.bind(styles);

function Variations() {
    const [categorys, setCategorys] = useState([]);
    const [masterCategory, setMasterCategory] = useState([]);
    const [idMCategory, setIdMCategory] = useState(1);

    const wrapperRef = useRef();

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

    useEffect(() => {
        const element = wrapperRef.current;
        const getWidth = () => {
            const width = element.offsetWidth;
            if (width <= 768 && idMCategory === 0) {
                setIdMCategory(1);
            }
        };

        getWidth();

        window.addEventListener('resize', getWidth);

        return () => {
            window.removeEventListener('resize', getWidth);
        };
    }, []);

    return (
        <div className={cx('wrapper')} ref={wrapperRef}>
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
    );
}

export default Variations;
