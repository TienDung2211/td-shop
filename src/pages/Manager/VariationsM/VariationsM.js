import classNames from 'classnames/bind';
import 'react-toastify/dist/ReactToastify.css';
import styles from './VariationsM.module.scss';

import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Button from '~/components/Button';
import DataContext from '~/context/DataContext';
import VariationsMItem from './VariationsMItem';
import { ToastContainer, toast } from 'react-toastify';
import variationServices from '~/services/variationServices';

const cx = classNames.bind(styles);

function VariationM() {
    const [variations, setVariations] = useState([]);
    const [idVariation, setIdVariation] = useState(0);
    const [options, setOptions] = useState([]);
    const [action, setAction] = useState('view');
    const [nameVariation, setNameVariation] = useState('');
    const [numberOptions, setNumberOptions] = useState(5);

    const { render } = useContext(DataContext);

    const [renderPage, setRenderPage] = useState(true);

    const getAllVariations = async () => {
        let api = await variationServices.getAllVariations();

        if (api?.content) {
            setVariations(api.content);
        } else setVariations([]);
    };

    const getVariationOptions = () => {
        variations.forEach((item) => {
            if (item.id === idVariation) {
                setOptions(item.setOfVariationOptions);
                setNameVariation(item.name);
            }
        });
    };

    const handleRenderInputOptions = () => {
        let array = [];

        for (let i = 0; i < numberOptions; i++) {
            array.push('<input type=text name="option" class=input-variation-option placeholder="Nhập tùy chọn"/>');
        }
        return array.join(' ');
    };

    const handleRenderOptions = () => {
        let array = [];

        for (let i = 0; i < options.length; i++) {
            array.push(
                `<input type=text name="option" value="${options[i].value}" class=input-variation-option placeholder="Nhập tùy chọn"/>`,
            );
        }
        return array.join(' ');
    };

    const handleGetValueVariation = () => {
        const optionsInput = document.querySelectorAll('input[name=option]');

        let options = [];

        optionsInput.forEach((item) => {
            if (item?.value !== '') {
                options.push(item.value);
            }
        });

        return options;
    };

    const handleSubmitAdd = async (e) => {
        e.preventDefault();

        const data = {
            Name: nameVariation,
            MasterCategory: 1,
            VariationOptions: handleGetValueVariation(),
        };

        var api = await variationServices.addVariation(data);

        console.log(api);

        if (api?.status === 200) {
            toast.success('Thêm danh mục mới thành công', {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-message',
            });
            setAction('view');
            setRenderPage(!renderPage);
        } else {
            if (api?.status === 403) {
                toast.info('Vui lòng đăng nhập để tiếp tục thêm danh mục.', {
                    position: toast.POSITION.TOP_RIGHT,
                    className: 'toast-message',
                });
            } else if (api.message === 'Variation name existed') {
                toast.info('Thêm danh mục đã tồn tại.', {
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

    const handlePassVariation = (data) => {
        setAction('update');
        setIdVariation(data.id);
        setNameVariation(data.name);
        setNumberOptions('1');
        setOptions(data.setOfVariationOptions);
    };

    const handleSubmitUpdate = async (e) => {
        e.preventDefault();

        const data = {
            Name: nameVariation,
            VariationOptions: handleGetValueVariation(),
        };

        var api = await variationServices.updateVariation(idVariation, data);

        if (api?.status === 200) {
            toast.success('Cập nhập danh mục thành công.', {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-message',
            });
            setAction('view');
            setRenderPage(!renderPage);
        } else {
            if (api?.status === 403) {
                toast.info('Vui lòng đăng nhập để tiếp tục cập nhập danh mục.', {
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

    const handleRemoveVariation = async (id) => {
        let api = await variationServices.removeVariation(id);

        if (api?.status === 200) {
            toast.success('Xóa danh mục thành công', {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-message',
            });
            setIdVariation(1);
            setAction('view');
            setRenderPage(!renderPage);
        } else {
            if (api?.status === 403) {
                toast.info('Vui lòng đăng nhập để tiếp tục xóa danh mục.', {
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
        getAllVariations();
        getVariationOptions();
    }, [idVariation, numberOptions, render, action, renderPage]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('control')}>
                <Button
                    rounded
                    approach
                    iconOnly={<FontAwesomeIcon icon={faPlus} />}
                    onClick={() => {
                        setNameVariation('');
                        setAction('add');
                        setNumberOptions(5);
                    }}
                ></Button>
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
                    {variations.map((variation, index) => (
                        <VariationsMItem
                            key={index}
                            data={variation}
                            onClickVariation={() => {
                                setIdVariation(variation.id);
                                setAction('view');
                            }}
                            onClickUpdate={(e) => {
                                e.stopPropagation();
                                handlePassVariation(variation);
                            }}
                            onClickRemove={(e) => {
                                e.stopPropagation();
                                handleRemoveVariation(variation.id);
                            }}
                        />
                    ))}
                </div>

                <div className={cx('variation-options')}>
                    {action === 'view' && (
                        <div>
                            {options.length > 0 && (
                                <div>
                                    <span className={cx('options-title')}>Danh mục {nameVariation}</span>
                                    <div className={cx('option-list')}>
                                        {options.map((item, index) => (
                                            <div key={index} className={cx('option')}>
                                                {item.value}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {action === 'add' && (
                        <form onSubmit={handleSubmitAdd}>
                            <span className={cx('options-title')}>
                                Danh mục{' '}
                                <input
                                    required
                                    name="title"
                                    value={nameVariation}
                                    className={cx('input-title')}
                                    placeholder="Nhập tiêu đề"
                                    onChange={(e) => setNameVariation(e.target.value)}
                                />
                            </span>
                            <span className={cx('amount')}>
                                Số lượng tùy chọn{' '}
                                <input
                                    value={numberOptions}
                                    className={cx('input-amount')}
                                    placeholder="Nhập số lượng tùy chọn"
                                    onChange={(e) => setNumberOptions(e.target.value)}
                                />
                            </span>

                            <div
                                className={cx('option-list')}
                                dangerouslySetInnerHTML={{ __html: handleRenderInputOptions() }}
                            ></div>
                            <div className={cx('button-layout')}>
                                <Button
                                    outline
                                    border
                                    transparent
                                    onClick={() => {
                                        setAction('view');
                                    }}
                                >
                                    Hủy
                                </Button>
                                <Button outline border primary type="submit">
                                    Xác nhận
                                </Button>
                            </div>
                        </form>
                    )}

                    {action === 'update' && (
                        <form onSubmit={handleSubmitUpdate}>
                            <span className={cx('options-title')}>
                                Danh mục{' '}
                                <input
                                    required
                                    name="title"
                                    value={nameVariation}
                                    className={cx('input-title')}
                                    placeholder="Nhập tiêu đề"
                                    onChange={(e) => setNameVariation(e.target.value)}
                                />
                            </span>

                            <div
                                className={cx('option-list')}
                                dangerouslySetInnerHTML={{ __html: handleRenderOptions() }}
                            ></div>

                            <span className={cx('amount')}>
                                Số lượng tùy chọn mới{' '}
                                <input
                                    value={numberOptions}
                                    className={cx('input-amount')}
                                    placeholder="Nhập số lượng tùy chọn"
                                    onChange={(e) => setNumberOptions(e.target.value)}
                                />
                            </span>

                            <div
                                className={cx('option-list')}
                                dangerouslySetInnerHTML={{ __html: handleRenderInputOptions() }}
                            ></div>

                            <div className={cx('button-layout')}>
                                <Button
                                    outline
                                    border
                                    transparent
                                    onClick={() => {
                                        setAction('view');
                                    }}
                                >
                                    Hủy
                                </Button>
                                <Button outline border primary type="submit">
                                    Cập nhập
                                </Button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default VariationM;
