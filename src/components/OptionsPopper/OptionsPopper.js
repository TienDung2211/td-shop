import classNames from 'classnames/bind';
import styles from './OptionsPopper.module.scss';

import { useState, useEffect, useContext } from 'react';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Options from '~/components/Options';
import HeadlessTippy from '@tippyjs/react/headless';
import DataContext from '~/context/DataContext';
import variationServices from '~/services/variationServices';
import categoryServices from '~/services/categoryServices';

const cx = classNames.bind(styles);

function OptionsPopper() {
    const [varitons, setVaritons] = useState([]);
    const [masterCategory, setMasterCategory] = useState([]);
    const [idMCategory, setIdMCategory] = useState(1);

    const { render } = useContext(DataContext);

    const getAllMasterCategory = async () => {
        let api = await categoryServices.getAllMasterCategory();
        if (api?.data) {
            setMasterCategory(api.data.content);
        }
    };

    const getVariationsById = async () => {
        let api = await variationServices.getVariationById(idMCategory);
        setVaritons(api.data);
    };

    useEffect(() => {
        getAllMasterCategory();
    }, [render]);

    useEffect(() => {
        getVariationsById();
    }, [render, idMCategory]);

    return varitons ? (
        <div className={cx('wrapper')}>
            <HeadlessTippy
                interactive
                // visible={true}
                placement="bottom-start"
                render={(attrs) => (
                    <div className={cx('content-layout')} tabIndex="-1" {...attrs}>
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
                        <div className={cx('list-variations')}>
                            {varitons.map((variation, index) => {
                                return (
                                    <div key={index} className={cx('grid-column-4')}>
                                        <Options data={variation} />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            >
                <div className={cx('button')}>
                    <FontAwesomeIcon className={cx('icon')} icon={faBars} />
                </div>
            </HeadlessTippy>
        </div>
    ) : null;
}

export default OptionsPopper;
