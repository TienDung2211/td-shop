import classNames from 'classnames/bind';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import styles from './CategoryM.module.scss';

import { useEffect, useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faAngleRight } from '@fortawesome/free-solid-svg-icons';

import Button from '~/components/Button';
import DataContext from '~/context/DataContext';
import CategoryMItem from './CategoryMItem';
import { ToastContainer, toast } from 'react-toastify';
import categoryServices from '~/services/categoryServices';

const cx = classNames.bind(styles);
function DisplayCategory({ typeDisplay, dataMC, dataPC }) {
    const [categorys, setCategorys] = useState([]);
    const [mId, setMId] = useState(0);
    const [pId, setPId] = useState(0);

    const [isAddOption, setIsAddOption] = useState(false);
    const [valueOption, setValueOption] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [renderPage, setRenderPage] = useState(true);
    const [actionOption, setActionOption] = useState('add');

    const { render, setRender } = useContext(DataContext);

    // Master Category
    const getAllMC = async () => {
        let api = await categoryServices.getAllMasterCategory();

        if (api?.data) {
            setCategorys(api.data.content);
        }
    };
    const handleAddMC = async () => {
        if (valueOption === '') {
            setErrMsg('Vui lòng nhập tùy chọn');
            return;
        }

        const data = {
            Name: valueOption,
        };

        var api = await categoryServices.addMasterCategory(data);

        if (api?.status === 200) {
            toast.success('Thêm MasterCategory mới thành công', {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-message',
            });
            setIsAddOption(false);
            setRenderPage(!renderPage);
            setRender(!render);
        } else if (api === undefined) {
            toast.error('Vui lòng đăng nhập để tiếp tục thêm tùy chọn.', {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-message',
            });
        } else if (api.status === 400) {
            toast.info('Tên MasterCategory đã tồn tại.', {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-message',
            });
        }
    };
    const handleUpdateMC = async () => {
        if (valueOption === '') {
            setErrMsg('Vui lòng nhập tùy chọn');
            return;
        }

        const data = {
            Name: valueOption,
        };

        var api = await categoryServices.updateMasterCategory(mId, data);

        if (api?.status === 200) {
            toast.success('Cập nhập MasterCategory thành công', {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-message',
            });
            setIsAddOption(false);
            setRenderPage(!renderPage);
            setRender(!render);
        } else if (api === undefined) {
            toast.error('Vui lòng đăng nhập để tiếp tục cập nhập tùy chọn.', {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-message',
            });
        } else if (api.status === 400) {
            toast.info('Tên MasterCategory đã tồn tại.', {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-message',
            });
        }
    };
    const handleRemoveMC = async (id) => {
        let api = await categoryServices.removeMasterCategory(mId);

        if (api?.status === 200) {
            toast.success('Xóa tùy chọn thành công', {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-message',
            });
            setIsAddOption(false);
            setRenderPage(!renderPage);
            setRender(!render);
        } else if (api === undefined) {
            toast.error('Vui lòng đăng nhập để tiếp tục xóa tùy chọn.', {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-message',
            });
        }
    };

    // Parent Category
    const getAllPC = async () => {
        let api = await categoryServices.getAllParentCategory(dataMC.id);

        if (api?.data) {
            setCategorys(api.data);
        }
    };
    const handleAddPC = async () => {
        if (valueOption === '') {
            setErrMsg('Vui lòng nhập thể loại');
            return;
        }

        const data = {
            Name: valueOption,
            ParentCategory: null,
            MasterCategory: dataMC.id,
        };

        var api = await categoryServices.addParentCategory(data);

        if (api?.status === 200) {
            toast.success('Thêm ParentCategory mới thành công', {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-message',
            });
            setIsAddOption(false);
            setRenderPage(!renderPage);
            setRender(!render);
        } else if (api === undefined) {
            toast.error('Vui lòng đăng nhập để tiếp tục thêm thể loại.', {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-message',
            });
        } else if (api.status === 400) {
            toast.info('Tên ParentCategory đã tồn tại.', {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-message',
            });
        }
    };
    const handleUpdatePC = async () => {
        if (actionOption === '') {
            setErrMsg('Vui lòng nhập thể loại');
            return;
        }

        const data = {
            Name: valueOption,
            ParentCategory: null,
        };

        var api = await categoryServices.updateParentCategory(pId, data);

        if (api?.status === 200) {
            toast.success('Cập nhập ParentCategory thành công', {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-message',
            });
            setIsAddOption(false);
            setRenderPage(!renderPage);
            setRender(!render);
        } else if (api === undefined) {
            toast.error('Vui lòng đăng nhập để tiếp tục cập nhập ParentCategory.', {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-message',
            });
        } else if (api.status === 400) {
            toast.info('Tên ParentCategory đã tồn tại.', {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-message',
            });
        }
    };
    const handleRemovePC = async (id) => {
        let api = await categoryServices.removeParentCategory(id);

        if (api?.status === 200) {
            toast.success('Xóa ParentCategory thành công', {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-message',
            });
            setIsAddOption(false);
            setRenderPage(!renderPage);
            setRender(!render);
        } else if (api === undefined) {
            toast.error('Vui lòng đăng nhập để tiếp tục xóa ParentCategory.', {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-message',
            });
        }
    };

    // Children Category
    const getAllCC = async () => {
        let api = await categoryServices.getAllChildrenCategory(dataPC.Id);

        if (api?.data) {
            setCategorys(api.data.ChildCategories);
        }
    };
    const handleAddCC = async () => {
        if (valueOption === '') {
            setErrMsg('Vui lòng nhập thể loại');
            return;
        }

        const data = {
            Name: valueOption,
            ParentCategory: dataPC.Id,
            MasterCategory: dataMC.id,
        };

        var api = await categoryServices.addParentCategory(data);

        if (api?.status === 200) {
            toast.success('Thêm ChildCategory mới thành công', {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-message',
            });
            setIsAddOption(false);
            setRenderPage(!renderPage);
            setRender(!render);
        } else if (api === undefined) {
            toast.error('Vui lòng đăng nhập để tiếp tục thêm thể loại.', {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-message',
            });
        } else if (api.status === 400) {
            toast.info('Tên ChildCategory đã tồn tại.', {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-message',
            });
        }
    };
    const handleUpdateCC = async () => {
        if (actionOption === '') {
            setErrMsg('Vui lòng nhập thể loại');
            return;
        }

        const data = {
            Name: valueOption,
            ParentCategory: dataPC.Id,
        };

        var api = await categoryServices.updateParentCategory(pId, data);

        if (api?.status === 200) {
            toast.success('Cập nhập ChildCategory thành công', {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-message',
            });
            setIsAddOption(false);
            setRenderPage(!renderPage);
            setRender(!render);
        } else if (api === undefined) {
            toast.error('Vui lòng đăng nhập để tiếp tục cập nhập ChildCategory.', {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-message',
            });
        } else if (api.status === 400) {
            toast.info('Tên ChildCategory đã tồn tại.', {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-message',
            });
        }
    };
    const handleRemoveCC = async (id) => {
        let api = await categoryServices.removeParentCategory(id);

        if (api?.status === 200) {
            toast.success('Xóa ChildCategory thành công', {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-message',
            });
            setIsAddOption(false);
            setRenderPage(!renderPage);
            setRender(!render);
        } else if (api === undefined) {
            toast.error('Vui lòng đăng nhập để tiếp tục xóa ChildCategory.', {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-message',
            });
        }
    };

    useEffect(() => {
        if (typeDisplay === 0) {
            getAllMC();
        } else if (typeDisplay === 1) {
            getAllPC();
        } else if (typeDisplay === 2) {
            getAllCC();
        }
    }, [dataMC, dataPC, typeDisplay, renderPage, render]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('path-layout')}>
                {dataMC.id !== 0 && (
                    <div className={cx('path')}>
                        <span className={cx('m-category')}>{dataMC.name}</span>
                        {dataPC.Id !== 0 && (
                            <div className={cx('p-layout')}>
                                <FontAwesomeIcon icon={faAngleRight} className={cx('p-icon')} />
                                <span className={cx('p-category')}>{dataPC.name}</span>
                            </div>
                        )}
                    </div>
                )}
            </div>
            <div className={cx('mt-5')}></div>

            {!isAddOption ? (
                <div className={cx('add-layout')}>
                    <Button
                        rounded
                        approach
                        iconOnly={<FontAwesomeIcon icon={faPlus} />}
                        onClick={() => {
                            setIsAddOption(true);
                            setValueOption('');
                            setActionOption('add');
                        }}
                    ></Button>
                    <span className={cx('text')}>Thêm thể loại</span>
                </div>
            ) : (
                <div className={cx('add-option')}>
                    <div className={cx('group')}>
                        <span className={cx('error-msg')}>{errMsg}</span>
                    </div>
                    <div className={cx('input-layout')}>
                        <input
                            className={cx('input')}
                            value={valueOption}
                            placeholder="Nhập thể loại"
                            onChange={(e) => {
                                setValueOption(e.target.value);
                            }}
                        ></input>
                    </div>
                    <div className={cx('button-layout')}>
                        <Button
                            outline
                            border
                            transparent
                            onClick={() => {
                                setIsAddOption(false);
                                setValueOption('');
                            }}
                        >
                            Hủy
                        </Button>
                        <Button
                            outline
                            border
                            primary
                            onClick={() => {
                                if (typeDisplay === 0) {
                                    if (actionOption === 'add') {
                                        handleAddMC();
                                    } else {
                                        handleUpdateMC();
                                    }
                                } else if (typeDisplay === 1) {
                                    if (actionOption === 'add') {
                                        handleAddPC();
                                    } else {
                                        handleUpdatePC();
                                    }
                                } else if (typeDisplay === 2) {
                                    if (actionOption === 'add') {
                                        handleAddCC();
                                    } else {
                                        handleUpdateCC();
                                    }
                                }
                            }}
                        >
                            Xác nhận
                        </Button>
                    </div>
                </div>
            )}
            <div className={cx('mt-5')}></div>

            <span className={cx('list-title')}>List Category</span>

            {categorys.map((category, index) => (
                <CategoryMItem
                    key={index}
                    data={category}
                    type={typeDisplay === 0 ? true : false}
                    onClickUpdate={(e) => {
                        e.stopPropagation();
                        if (typeDisplay === 0) {
                            setMId(category.id);
                        } else {
                            setPId(category.Id);
                        }
                        setActionOption('update');
                        setErrMsg('');
                        setValueOption(typeDisplay === 0 ? category.name : category.Name);
                        setIsAddOption(true);
                    }}
                    onClickRemove={(e) => {
                        e.stopPropagation();
                        if (typeDisplay === 0) {
                            setMId(category.id);
                        } else {
                            setPId(category.Id);
                        }
                        if (typeDisplay === 0) {
                            handleRemoveMC(category.id);
                        } else if (typeDisplay === 1) {
                            handleRemovePC(category.Id);
                        } else if (typeDisplay === 2) {
                            handleRemoveCC(category.Id);
                        }
                    }}
                />
            ))}

            <ToastContainer />
        </div>
    );
}

export default DisplayCategory;
