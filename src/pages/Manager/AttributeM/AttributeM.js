import classNames from 'classnames/bind';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from '~/components/Button';
import styles from './AttributeM.module.scss';

import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import AttributeMItem from './AttributeMItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import attributeServices from '~/services/attributeServices';

const cx = classNames.bind(styles);

function AttributeM() {
    const [attributes, setAttributes] = useState([]);
    const [idAttribute, setIdAttribute] = useState(0);

    const [optionsNew, setOptionsNew] = useState([]);
    const [optionsCurrent, setOptionsCurrent] = useState([]);
    const [numberOptions, setNumberOptions] = useState(0);
    const [nameAttribute, setNameAttribute] = useState('');

    const [action, setAction] = useState('view');

    const [renderPage, setRenderPage] = useState(true);

    const getAllAttributes = async () => {
        var api = await attributeServices.getAllAttributes();

        if (api?.status === 200) {
            setAttributes(api.data.content);
        }
    };

    const handleClickAttribute = (attribute) => {
        setOptionsCurrent(attribute.setOfAttributes);
        setNameAttribute(attribute.name);
        setIdAttribute(attribute.id);

        setAction('view');
    };

    const handleClickUpdate = (attribute) => {
        setOptionsCurrent(attribute.setOfAttributes);
        setNameAttribute(attribute.name);
        setIdAttribute(attribute.id);
        setAction('update');
    };

    const handleNumberOptionsChange = (e) => {
        const newNumberOptions = e.target.value.trim() === '' ? 0 : parseInt(e.target.value);
        setNumberOptions(newNumberOptions);
        setOptionsNew(new Array(newNumberOptions).fill({}));
    };

    const handleOptionNewChange = (e, index) => {
        const newOptions = [...optionsNew];
        newOptions[index] = { Name: e.target.value, Priority: 0 };
        setOptionsNew(newOptions);
    };

    const handleOptionCurrentChange = (e, index) => {
        const newOptions = [...optionsCurrent];
        newOptions[index] = { Name: e.target.value, Priority: 0 };
        setOptionsCurrent(newOptions);
    };

    const handleAddAttibute = async () => {
        const data = {
            Name: nameAttribute,
            Attributes: optionsNew,
        };

        const api = await attributeServices.addAttribute(data);

        if (api?.status === 200) {
            toast.success('Thêm thuộc tính mới thành công', {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-message',
            });
            setAction('none');
            setRenderPage(!renderPage);
        } else {
            if (api?.status === 403) {
                toast.info('Vui lòng đăng nhập để tiếp tục thêm thuộc tính.', {
                    position: toast.POSITION.TOP_RIGHT,
                    className: 'toast-message',
                });
            } else if (api.message === 'Attribute name existed') {
                toast.info('Tên thuộc tính đã tồn tại.', {
                    position: toast.POSITION.TOP_RIGHT,
                    className: 'toast-message',
                });
            } else {
                toast.error('Lỗi không xác định, vui lòng thử lại sau.', {
                    position: toast.POSITION.TOP_RIGHT,
                    className: 'toast-message',
                });
            }
        }
    };

    const handleUpdateAttribute = async () => {
        const modifiedOptions = optionsCurrent.map(({ id, name, priority, ...rest }) => ({
            Name: name,
            Priority: priority,
            ...rest,
        }));
        const mergedOptions = [...modifiedOptions, ...optionsNew];

        const data = {
            Name: nameAttribute,
            Attributes: mergedOptions,
        };

        var api = await attributeServices.updateAttribute(idAttribute, data);

        if (api?.status === 200) {
            toast.success('Cập nhập thuộc tính thành công.', {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-message',
            });
            setAction('none');
            setRenderPage(!renderPage);
        } else {
            if (api?.status === 403) {
                toast.info('Vui lòng đăng nhập để tiếp tục cập nhập thuộc tính.', {
                    position: toast.POSITION.TOP_RIGHT,
                    className: 'toast-message',
                });
            } else {
                toast.error('Lỗi không xác định, vui lòng thử lại sau.', {
                    position: toast.POSITION.TOP_RIGHT,
                    className: 'toast-message',
                });
            }
        }
    };

    const handleRemoveAtrribute = async (id) => {
        const api = await attributeServices.removeAttribute(id);

        if (api?.status === 200) {
            toast.success('Xóa thuộc tính thành công', {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-message',
            });
            setAction('none');
            setRenderPage(!renderPage);
        } else {
            if (api?.status === 403) {
                toast.info('Vui lòng đăng nhập để tiếp tục xóa thuộc tính.', {
                    position: toast.POSITION.TOP_RIGHT,
                    className: 'toast-message',
                });
            } else {
                toast.error('Lỗi không xác định, vui lòng thử lại sau.', {
                    position: toast.POSITION.TOP_RIGHT,
                    className: 'toast-message',
                });
            }
        }
    };

    useEffect(() => {
        getAllAttributes();
    }, [renderPage, idAttribute]);

    return (
        <div className={cx('container')}>
            <div className={cx('row')}>
                <div className={cx('heading-main')}>Quản lí thuộc tính</div>
            </div>
            <div className={cx('row')}>
                <div className={cx('col-5', 'p-3')}>
                    <div className={cx('add-layout')}>
                        <Button
                            rounded
                            approach
                            iconOnly={<FontAwesomeIcon icon={faPlus} />}
                            onClick={() => {
                                setNameAttribute('');
                                setAction('add');
                                // setNumberOptions(5);
                            }}
                        ></Button>
                        <span className={cx('text')}>Thêm thuộc tính</span>
                    </div>
                    {attributes.map((item, index) => (
                        <AttributeMItem
                            key={index}
                            data={item}
                            onClickAttribute={() => {
                                handleClickAttribute(item);
                            }}
                            onClickUpdate={(e) => {
                                e.stopPropagation();
                                handleClickUpdate(item);
                            }}
                            onClickRemove={(e) => {
                                e.stopPropagation();
                                handleRemoveAtrribute(item.id);
                            }}
                        />
                    ))}
                </div>
                <div className={cx('col-7', 'p-3', 'attribute-options')}>
                    {action === 'view' && (
                        <div>
                            {optionsCurrent.length > 0 && (
                                <div>
                                    <span className={cx('options-title')}>Thuộc tính {nameAttribute}</span>
                                    <div className={cx('option-list')}>
                                        {optionsCurrent.map((item, index) => (
                                            <div key={index} className={cx('option')}>
                                                {item.name}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                    {action === 'add' && (
                        <div>
                            <span className={cx('options-title')}>
                                Thuộc tính{' '}
                                <input
                                    required
                                    name="title"
                                    value={nameAttribute}
                                    className={cx('input-title')}
                                    placeholder="Nhập tiêu đề"
                                    onChange={(e) => setNameAttribute(e.target.value)}
                                />
                            </span>
                            <div className={cx('amount')}>
                                <label className={cx('label')}>Số lượng tùy chọn mới :</label>
                                <input
                                    value={numberOptions}
                                    className={cx('input-amount')}
                                    placeholder="Nhập số lượng tùy chọn"
                                    onChange={handleNumberOptionsChange}
                                />
                            </div>
                            <div className={cx('option-list')}>
                                {optionsNew.map((option, index) => (
                                    <input
                                        className={cx('input-variation-option')}
                                        placeholder={`Tùy chọn ${index + 1}`}
                                        onChange={(e) => handleOptionNewChange(e, index)}
                                    />
                                ))}
                            </div>
                            <div className={cx('button-layout')}>
                                <Button
                                    outline
                                    border
                                    transparent
                                    onClick={() => {
                                        setAction('none');
                                    }}
                                >
                                    Hủy
                                </Button>
                                <Button outline border primary onClick={() => handleAddAttibute()}>
                                    Thêm
                                </Button>
                            </div>
                        </div>
                    )}
                    {action === 'update' && (
                        <div>
                            <span className={cx('options-title')}>
                                Thuộc tính{' '}
                                <input
                                    required
                                    name="title"
                                    value={nameAttribute}
                                    className={cx('input-title')}
                                    placeholder="Nhập tiêu đề"
                                    onChange={(e) => setNameAttribute(e.target.value)}
                                />
                            </span>

                            <div className={cx('option-list')}>
                                {optionsCurrent.map((option, index) => (
                                    <input
                                        className={cx('input-variation-option')}
                                        placeholder={`Tùy chọn ${index + 1}`}
                                        defaultValue={option.name}
                                        onChange={(e) => handleOptionCurrentChange(e, index)}
                                    />
                                ))}
                            </div>

                            <div className={cx('amount')}>
                                <label className={cx('label')}>Số lượng tùy chọn mới:</label>
                                <input
                                    value={numberOptions}
                                    className={cx('input-amount')}
                                    placeholder="Nhập số lượng tùy chọn"
                                    onChange={handleNumberOptionsChange}
                                />
                            </div>
                            <div className={cx('option-list')}>
                                {optionsNew.map((option, index) => (
                                    <input
                                        className={cx('input-variation-option')}
                                        placeholder={`Tùy chọn ${index + 1}`}
                                        onChange={(e) => handleOptionNewChange(e, index)}
                                    />
                                ))}
                            </div>
                            <div className={cx('button-layout')}>
                                <Button
                                    outline
                                    border
                                    transparent
                                    onClick={() => {
                                        setAction('none');
                                    }}
                                >
                                    Hủy
                                </Button>
                                <Button outline border primary onClick={() => handleUpdateAttribute()}>
                                    Cập nhập
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default AttributeM;
