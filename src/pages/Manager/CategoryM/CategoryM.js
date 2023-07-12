import classNames from 'classnames/bind';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import styles from './CategoryM.module.scss';

import { useEffect, useState, useContext } from 'react';

import Select from 'react-select';
import DataContext from '~/context/DataContext';
import DisplayCategory from './DisplayCategory';
import categoryServices from '~/services/categoryServices';

const cx = classNames.bind(styles);

function CategoryM() {
    const [masterCategorys, setMasterCategorys] = useState([]);
    const [mId, setMId] = useState(0);
    const [dataMC, setDataMC] = useState({ id: 0, name: 'Chọn MasterCategory' });
    const [parentCategorys, setParentCategorys] = useState([]);
    const [pId, setPId] = useState(0);
    const [dataPC, setDataPC] = useState({ Id: 0, name: 'Chọn ParentCategory' });

    const [typeDisplay, setTypeDisplay] = useState(0);

    const { render } = useContext(DataContext);

    const getAllMasterCategorys = async () => {
        const api = await categoryServices.getAllMasterCategory();

        if (api?.data) {
            var options = [{ label: { id: 0, name: 'Chọn MasterCategory' }, value: 'Chọn MasterCategory' }];
            api.data.content.forEach((item) => {
                options.push({ label: item, value: item.name });
            });
            setMasterCategorys(options);
        }
    };

    const getAllParentCategorys = async () => {
        const api = await categoryServices.getAllParentCategory(mId);

        if (api?.data) {
            var options = [{ label: { Id: 0, name: 'Chọn ParentCategory' }, value: 'Chọn ParentCategory' }];
            api.data.forEach((item) => {
                options.push({ label: item, value: item.Name });
            });
            setParentCategorys(options);
        }
    };

    const handleChangeMC = (selectedOption) => {
        setMId(selectedOption.label?.id);
        if (selectedOption.label?.id === 0) {
            setPId(0);
            setTypeDisplay(0);
        }
        setDataMC({ id: selectedOption.label?.id, name: selectedOption.label?.name });
    };

    const handleChangePC = (selectedOption) => {
        setPId(selectedOption.label?.Id);
        setDataPC({ Id: selectedOption.label?.Id, name: selectedOption.label?.Name });

        console.log(selectedOption);
    };

    const getTypeDisplay = () => {
        if (mId === 0) {
            setTypeDisplay(0);
        } else {
            if (pId === 0) {
                setTypeDisplay(1);
            } else {
                setTypeDisplay(2);
            }
        }
    };

    useEffect(() => {
        getAllMasterCategorys();
        getAllParentCategorys();
        getTypeDisplay();
    }, [mId, pId, render]);

    return (
        <div className={cx('container')}>
            <div className={cx('row')}>
                <div className={cx('col-5')}>
                    <div className={cx('wrapper-filter', 'p-5')}>
                        <span className={cx('heading')}>Quản lí thể loại</span>
                        <div className={cx('mt-5')}></div>

                        <div className={cx('form-group')}>
                            <label className={cx('label')}>MasterCategory</label>
                            <div className={cx('mt-1')}></div>

                            <Select
                                formatOptionLabel={(option) => `${option.value}`}
                                placeholder="Chọn MasterCategory..."
                                onChange={handleChangeMC}
                                options={masterCategorys}
                                className={cx('control', 'option--is-selected')}
                            />
                        </div>
                        <div className={cx('mt-5')}></div>
                        <div className={cx('form-group')}>
                            <label className={cx('label')}>ParentCategory</label>
                            <div className={cx('mt-1')}></div>

                            <Select
                                formatOptionLabel={(option) => `${option.value}`}
                                placeholder="Chọn ParentCategory..."
                                onChange={handleChangePC}
                                options={parentCategorys}
                                className={cx('control', 'option--is-focused')}
                            />
                        </div>
                        <div></div>
                    </div>
                </div>
                <div className={cx('col-7', 'p-5', 'display-content')}>
                    <DisplayCategory typeDisplay={typeDisplay} dataMC={dataMC} dataPC={dataPC} />
                </div>
            </div>
        </div>
    );
}

export default CategoryM;
