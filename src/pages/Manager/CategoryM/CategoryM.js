import classNames from 'classnames/bind';
import 'react-toastify/dist/ReactToastify.css';
import styles from './CategoryM.module.scss';

import { useEffect, useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPen, faPlus } from '@fortawesome/free-solid-svg-icons';

import Button from '~/components/Button';
import DataContext from '~/context/DataContext';
import CategoryMItem from './CategoryMItem';
import { ToastContainer, toast } from 'react-toastify';
import categoryServices from '~/services/categoryServices';

const cx = classNames.bind(styles);

function VariationM() {
    const [categorys, setCategorys] = useState([]);
    const [idCategory, setIdCategory] = useState(0);
    const [options, setOptions] = useState([]);
    const [nameCategory, setNameCategory] = useState('');
    const [renderOption, setRenderOption] = useState(false);
    const [renderParentOption, setRenderParentOption] = useState(false);
    const [valueOption, setValueOption] = useState('');
    const [valueParentOption, setValueParentOption] = useState('');
    const [actionOption, setActionOption] = useState('add');
    const [actionParentOption, setActionParentOption] = useState('add');
    const [idUpdateOption, setIdUpdateOption] = useState(0);
    const [errMsg, setErrMsg] = useState('');

    const { render, setRender } = useContext(DataContext);

    const getAllCategorys = async () => {
        let api = await categoryServices.getAllCategory();
        setCategorys(api.data);
    };

    const getCategoryOptions = () => {
        categorys.forEach((item) => {
            if (item.Id === idCategory) {
                setOptions(item.ChildCategories);
                setNameCategory(item.Name);
            }
        });
    };

    const handleAddOption = async () => {
        if (valueOption === '') {
            setErrMsg('Vui lòng nhập tùy chọn');
            return;
        }

        const data = {
            Name: valueOption,
            ParentCategory: idCategory,
            MasterCategory: 1,
        };

        var api = await categoryServices.addCategory(data);

        if (api?.status === 200) {
            setRender(!render);
            toast.success('Thêm tùy chọn mới thành công', {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-message',
            });
            setRenderOption(false);
        } else if (api === undefined) {
            toast.error('Vui lòng đăng nhập để tiếp tục thêm tùy chọn.', {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-message',
            });
        } else if (api.status === 400) {
            toast.info('Tên tùy chọn đã tồn tại.', {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-message',
            });
        }
    };

    const handleAddParentOption = async () => {
        if (valueParentOption === '') {
            setErrMsg('Vui lòng nhập thể loại');
            return;
        }

        const data = {
            Name: valueParentOption,
            ParentCategory: null,
            MasterCategory: 1,
        };

        var api = await categoryServices.addCategory(data);

        if (api?.status === 200) {
            setRender(!render);
            toast.success('Thêm thể loại mới thành công', {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-message',
            });
            setRenderParentOption(false);
        } else if (api === undefined) {
            toast.error('Vui lòng đăng nhập để tiếp tục thêm thể loại.', {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-message',
            });
        } else if (api.status === 400) {
            toast.info('Tên thể loại đã tồn tại.', {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-message',
            });
        }
    };

    const handleUpdateOption = async () => {
        if (valueOption === '') {
            setErrMsg('Vui lòng nhập tùy chọn');
            return;
        }

        const data = {
            Name: valueOption,
            ParentCategory: idCategory,
        };

        var api = await categoryServices.updateCategory(idUpdateOption, data);

        if (api?.status === 200) {
            setRender(!render);
            toast.success('Cập nhập tùy chọn thành công', {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-message',
            });
            setRenderOption(false);
        } else if (api === undefined) {
            toast.error('Vui lòng đăng nhập để tiếp tục cập nhập tùy chọn.', {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-message',
            });
        } else if (api.status === 400) {
            toast.info('Tên tùy chọn đã tồn tại.', {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-message',
            });
        }
    };

    const handleUpdateParentOption = async () => {
        if (valueParentOption === '') {
            setErrMsg('Vui lòng nhập thể loại');
            return;
        }

        const data = {
            Name: valueParentOption,
            ParentCategory: null,
        };

        var api = await categoryServices.updateCategory(idCategory, data);

        if (api?.status === 200) {
            setRender(!render);
            toast.success('Cập nhập thể loại thành công', {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-message',
            });
            setRenderParentOption(false);
        } else if (api === undefined) {
            toast.error('Vui lòng đăng nhập để tiếp tục cập nhập thể loại.', {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-message',
            });
        } else if (api.status === 400) {
            toast.info('Tên thể loại đã tồn tại.', {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-message',
            });
        }
    };

    const handleRemoveOption = async (id) => {
        let api = await categoryServices.removeCategory(id);

        console.log(api);

        if (api?.status === 200) {
            setRender(!render);
            toast.success('Xóa tùy chọn thành công', {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-message',
            });
            setRenderOption(false);
        } else if (api === undefined) {
            toast.error('Vui lòng đăng nhập để tiếp tục xóa tùy chọn.', {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-message',
            });
        } else if (api.status === 400) {
            toast.info('Tên tùy chọn đã tồn tại.', {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-message',
            });
        }
    };

    const handleRemoveParentOption = async (id) => {
        let api = await categoryServices.removeCategory(id);

        console.log(api);

        if (api?.status === 200) {
            setRender(!render);
            toast.success('Xóa thể loại thành công', {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-message',
            });
            setRenderParentOption(false);
        } else if (api === undefined) {
            toast.error('Vui lòng đăng nhập để tiếp tục xóa thể loại.', {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-message',
            });
        }
    };

    useEffect(() => {
        getAllCategorys();
        getCategoryOptions();
    }, [idCategory, render, errMsg]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('control')}>
                <form className={cx('control-filt')}>
                    <div className={cx('input-layout')}>
                        <input className={cx('input')} type="text" placeholder="Nhập tên tìm kiếm"></input>
                    </div>

                    <div className={cx('button-layout')}>
                        <Button primary border>
                            Áp dụng
                        </Button>
                    </div>
                </form>
            </div>
            <div className={cx('results')}>
                <div className={cx('variations')}>
                    {!renderParentOption ? (
                        <div className={cx('add-layout')}>
                            <Button
                                rounded
                                approach
                                iconOnly={<FontAwesomeIcon icon={faPlus} />}
                                onClick={() => {
                                    setRenderParentOption(true);
                                    setValueParentOption('');
                                    setActionParentOption('add');
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
                                    value={valueParentOption}
                                    placeholder="Nhập thể loại"
                                    onChange={(e) => setValueParentOption(e.target.value)}
                                ></input>
                            </div>
                            <div className={cx('button-layout')}>
                                <Button
                                    outline
                                    border
                                    transparent
                                    onClick={() => {
                                        setRenderParentOption(false);
                                        setValueParentOption('');
                                    }}
                                >
                                    Hủy
                                </Button>
                                <Button
                                    outline
                                    border
                                    primary
                                    onClick={() => {
                                        if (actionParentOption === 'add') {
                                            handleAddParentOption();
                                        } else if (actionParentOption === 'update') {
                                            handleUpdateParentOption();
                                        }
                                    }}
                                >
                                    Xác nhận
                                </Button>
                            </div>
                        </div>
                    )}
                    {categorys.map((category, index) => (
                        <CategoryMItem
                            key={index}
                            data={category}
                            onClickCategory={() => {
                                setIdCategory(category.Id);
                                setErrMsg('');
                                setRenderOption(false);
                                setRenderParentOption(false);
                                setValueParentOption('');
                                setValueOption('');
                            }}
                            onClickUpdate={(e) => {
                                e.stopPropagation();
                                setActionParentOption('update');
                                setErrMsg('');
                                setIdCategory(category.Id);
                                setValueParentOption(category.Name);
                                setRenderParentOption(true);
                            }}
                            onClickRemove={(e) => {
                                e.stopPropagation();
                                setIdCategory(category.Id);
                                handleRemoveParentOption(category.Id);
                            }}
                        />
                    ))}
                </div>

                <div className={cx('variation-options')}>
                    {options.length > 0 && (
                        <div>
                            <span className={cx('options-title')}>Thể loại {nameCategory}</span>
                            {!renderOption ? (
                                <div className={cx('add-layout')}>
                                    <Button
                                        rounded
                                        approach
                                        iconOnly={<FontAwesomeIcon icon={faPlus} />}
                                        onClick={() => {
                                            setRenderOption(true);
                                            setValueOption('');
                                            setActionOption('add');
                                        }}
                                    ></Button>
                                    <span className={cx('text')}>Thêm tùy chọn</span>
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
                                            placeholder="Nhập tùy chọn"
                                            onChange={(e) => setValueOption(e.target.value)}
                                        ></input>
                                    </div>
                                    <div className={cx('button-layout')}>
                                        <Button
                                            outline
                                            border
                                            transparent
                                            onClick={() => {
                                                setRenderOption(false);
                                            }}
                                        >
                                            Hủy
                                        </Button>
                                        <Button
                                            outline
                                            border
                                            primary
                                            onClick={() => {
                                                if (actionOption === 'add') {
                                                    handleAddOption();
                                                } else if (actionOption === 'update') {
                                                    handleUpdateOption();
                                                }
                                            }}
                                        >
                                            Xác nhận
                                        </Button>
                                    </div>
                                </div>
                            )}
                            <div className={cx('option-list')}>
                                {options.map((item, index) => (
                                    <div className={cx('item-option')} key={index}>
                                        <span className={cx('name')}>{item.Name} </span>
                                        <Button
                                            className={cx('button')}
                                            transparent
                                            rounded
                                            iconOnly={<FontAwesomeIcon icon={faPen} />}
                                            onClick={() => {
                                                setRenderOption(true);
                                                setActionOption('update');
                                                setValueOption(item.Name);
                                                setIdUpdateOption(item.Id);
                                            }}
                                        ></Button>
                                        <Button
                                            className={cx('button')}
                                            transparent
                                            rounded
                                            iconOnly={<FontAwesomeIcon icon={faTrashCan} />}
                                            onClick={() => {
                                                handleRemoveOption(item.Id);
                                            }}
                                        ></Button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default VariationM;
