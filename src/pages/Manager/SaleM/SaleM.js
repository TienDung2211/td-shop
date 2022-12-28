import classNames from 'classnames/bind';
import styles from './SaleM.module.scss';
import 'react-toastify/dist/ReactToastify.css';

import DateTimePicker from 'react-datetime-picker';
import { useState, useEffect, useContext } from 'react';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Select from 'react-select';
import SaleMItem from './SaleMItem';
import Button from '~/components/Button';
import DataContext from '~/context/DataContext';
import { ToastContainer, toast } from 'react-toastify';
import categoryServices from '~/services/categoryServices';
import promotionServices from '~/services/promotionServices';

const cx = classNames.bind(styles);

function SaleM() {
    const [promotions, setPromotions] = useState([]);
    const [action, setAction] = useState('view');
    const [updatePromotion, setUpdatePromotion] = useState(null);

    const { render } = useContext(DataContext);
    const [errMsg, setErrMsg] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [discount, setDiscount] = useState(0);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [optionsCategory, setOptionsCategory] = useState([]);
    const [categorys, setCategorys] = useState([]);
    const [renderPage, setRenderPage] = useState(true);

    const getAllCategorys = async () => {
        let api = await categoryServices.getAllCategory();

        var options = [];
        api.data.forEach((list) => {
            options.push({ label: list.Id, value: '+' + list.Name, disabled: true });
            list?.ChildCategories.forEach((item) => {
                options.push({ label: item.Id, value: item.Name });
            });
        });
        setOptionsCategory(options);
    };

    const handleChangeCategory = (selectedOption) => {
        setCategorys(selectedOption);
    };

    const getValueCategorys = () => {
        let array = [];

        categorys.forEach((item) => {
            array.push(item.label);
        });

        return array;
    };

    const getAllPromotions = async () => {
        let api = await promotionServices.getAllPromotions();
        console.log(api);
        if (api?.content) {
            setPromotions(api.content);
        } else setPromotions([]);
    };

    const handleSubmitAdd = async (e) => {
        e.preventDefault();
        if (categorys.length === 0) {
            setErrMsg('Bạn chưa chọn Thể loại');
            return;
        }
        const data = {
            Name: name,
            Description: description,
            DiscountRate: discount / 100,
            StartDate: startDate.replace('T', ' '),
            EndDate: endDate.replace('T', ' '),
            Categories: getValueCategorys(),
        };

        const api = await promotionServices.addPromotion(data);
        console.log(api);
        if (api?.status === 200) {
            toast.success('Thêm khuyến mãi mới thành công', {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-message',
            });
            setRenderPage(!renderPage);
            setAction('view');
        } else {
            if (api?.status === 403) {
                toast.info('Vui lòng đăng nhập để tiếp tục thêm sản phẩm.', {
                    position: toast.POSITION.TOP_RIGHT,
                    className: 'toast-message',
                });
            } else if (api.message === 'Promotion name existed') {
                toast.info('Tên khuyến mãi đã tồn tại.', {
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

    const handleRemovePromotion = async (id) => {
        const api = await promotionServices.deletePromotion(id);

        if (api?.status === 200) {
            toast.success('Xóa khuyến mãi thành công', {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-message',
            });
            setRenderPage(!renderPage);
            setAction('view');
        } else if (api === undefined) {
            toast.error('Vui lòng đăng nhập để tiếp tục xóa khuyến mãi.', {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-message',
            });
        }
    };

    const handleClickUpdate = (data) => {
        setName(data.name);
        setDescription(data.description);
        setStartDate(data.startDate);
        setEndDate(data.endDate);
        setDiscount(data.discountRate * 100);
        setUpdatePromotion(data);
        setAction('update');
    };

    const setValueCategorys = () => {
        let array = [];

        optionsCategory.forEach((option) => {
            updatePromotion?.categories.map((item) => {
                if (option.label === item) {
                    array.push(option);
                }
            });
        });

        return array;
    };

    const handleUpdatePromotion = async (id) => {
        const api = await promotionServices.deletePromotion(id);
        console.log(api);
        if (api?.status === 200) {
            toast.success('Cập nhập khuyến mãi thành công', {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-message',
            });
            setRenderPage(!renderPage);
            setAction('view');
        } else if (api === undefined) {
            toast.error('Vui lòng đăng nhập để tiếp tục cập nhập khuyến mãi.', {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-message',
            });
        }
    };

    useEffect(() => {
        getAllPromotions();
        getAllCategorys();
    }, [renderPage, render]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('control')}>
                <form className={cx('control-filt')}>
                    <Button
                        rounded
                        approach
                        iconOnly={<FontAwesomeIcon icon={faPlus} />}
                        onClick={(e) => {
                            e.preventDefault();
                            setAction('add');
                        }}
                    ></Button>

                    <div className={cx('input-search-layout')}>
                        <input className={cx('input-search')} type="text" placeholder="Nhập tên tìm kiếm"></input>
                    </div>

                    <Button primary border>
                        Áp dụng
                    </Button>
                </form>
            </div>
            {action === 'view' && (
                <div className={cx('results')}>
                    {promotions.map((promotion, index) => {
                        return (
                            <SaleMItem
                                key={index}
                                data={promotion}
                                onClickRemove={handleRemovePromotion}
                                onClickUpdate={handleClickUpdate}
                            />
                        );
                    })}
                </div>
            )}
            {action === 'add' && (
                <form className={cx('form-layout')} onSubmit={handleSubmitAdd}>
                    <div className={cx('title')}>Thêm khuyến mãi</div>
                    <div className={cx('group')}>
                        <span className={cx('error-msg')}>{errMsg}</span>
                    </div>
                    <div className={cx('group-item')}>
                        <div className={cx('label-item')}>Tên chương trình : </div>
                        <input
                            className={cx('input-item')}
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className={cx('group-item')}>
                        <div className={cx('label-item')}>Mô tả : </div>
                        <input
                            row="2"
                            className={cx('input-item', 'large')}
                            type="text"
                            required
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className={cx('group-item')}>
                        <div className={cx('label-item')}>Ngày bắt đầu : </div>
                        <input
                            className={cx('input-item')}
                            type="datetime-local"
                            required
                            value={startDate}
                            onChange={(e) => setStartDate(Date(e.target.value))}
                        />
                    </div>
                    <div className={cx('group-item')}>
                        <div className={cx('label-item')}>Ngày kết thúc : </div>
                        <input
                            className={cx('input-item')}
                            type="datetime-local"
                            required
                            value={endDate}
                            onChange={(e) => {
                                setEndDate(e.target.value);
                            }}
                        />
                    </div>
                    <div className={cx('group-item')}>
                        <div className={cx('label-item')}>Khuyễn mãi(%) : </div>
                        <input
                            className={cx('input-item')}
                            type="number"
                            required
                            value={discount}
                            onChange={(e) => setDiscount(e.target.value)}
                        />
                    </div>
                    <div className={cx('group-item')}>
                        <div className={cx('label-item')}>Thể loại : </div>
                        <div className={cx('input-item-select')}>
                            <Select
                                formatOptionLabel={(option) => `${option.value}`}
                                isOptionDisabled={(option) => option.disabled}
                                isMulti
                                placeholder="Chọn thể loại..."
                                onChange={handleChangeCategory}
                                options={optionsCategory}
                            />
                        </div>
                    </div>

                    <div className={cx('button-layout')}>
                        <Button outline border primary type="submit">
                            Xác nhận
                        </Button>
                        <Button
                            outline
                            border
                            onClick={() => {
                                setAction('view');
                            }}
                        >
                            Hủy
                        </Button>
                    </div>
                </form>
            )}
            {action === 'update' && updatePromotion && (
                <form className={cx('form-layout')} onSubmit={handleUpdatePromotion}>
                    <div className={cx('title')}>Cập nhập khuyến mãi</div>
                    <div className={cx('group')}>
                        <span className={cx('error-msg')}>{errMsg}</span>
                    </div>
                    <div className={cx('group-item')}>
                        <div className={cx('label-item')}>Tên chương trình : </div>
                        <input
                            className={cx('input-item')}
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className={cx('group-item')}>
                        <div className={cx('label-item')}>Mô tả : </div>
                        <input
                            row="2"
                            className={cx('input-item', 'large')}
                            type="text"
                            required
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className={cx('group-item')}>
                        <div className={cx('label-item')}>Ngày bắt đầu : </div>
                        <input
                            className={cx('input-item')}
                            type="datetime-local"
                            required
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </div>
                    <div className={cx('group-item')}>
                        <div className={cx('label-item')}>Ngày kết thúc : </div>
                        <input
                            className={cx('input-item')}
                            type="datetime-local"
                            required
                            value={endDate}
                            onChange={(e) => {
                                setEndDate(e.target.value);
                            }}
                        />
                    </div>
                    <div className={cx('group-item')}>
                        <div className={cx('label-item')}>Khuyễn mãi(%) : </div>
                        <input
                            className={cx('input-item')}
                            type="number"
                            required
                            value={discount}
                            onChange={(e) => setDiscount(e.target.value)}
                        />
                    </div>
                    <div className={cx('group-item')}>
                        <div className={cx('label-item')}>Thể loại : </div>
                        <div className={cx('input-item-select')}>
                            <Select
                                formatOptionLabel={(option) => `${option.value}`}
                                isOptionDisabled={(option) => option.disabled}
                                isMulti
                                value={[optionsCategory[1], optionsCategory[3]]}
                                placeholder="Chọn thể loại..."
                                onChange={handleChangeCategory}
                                options={optionsCategory}
                            />
                        </div>
                    </div>

                    <div className={cx('button-layout')}>
                        <Button outline border primary type="submit">
                            Cập nhập
                        </Button>
                        <Button
                            outline
                            border
                            onClick={() => {
                                setAction('view');
                            }}
                        >
                            Hủy
                        </Button>
                    </div>
                </form>
            )}
            <ToastContainer />
        </div>
    );
}

export default SaleM;
