import classNames from 'classnames/bind';
import styles from './SaleM.module.scss';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';

import DateTimePicker from 'react-datetime-picker';
import { useState, useEffect, useContext } from 'react';
import { faPlus, faPen, faTrashCan, faL } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DataTable from '~/components/DataTable/DataTable';
import { Tag } from 'antd';

import Select from 'react-select';
import Button from '~/components/Button';
import DataContext from '~/context/DataContext';
import { ToastContainer, toast } from 'react-toastify';
import categoryServices from '~/services/categoryServices';
import promotionServices from '~/services/promotionServices';

const cx = classNames.bind(styles);

function SaleM() {
    const [promotions, setPromotions] = useState([]);
    const [action, setAction] = useState('view');
    const [openCategorys, setOpenCategorys] = useState(false);
    const [updatePromotion, setUpdatePromotion] = useState(null);

    const { render } = useContext(DataContext);
    const [errMsg, setErrMsg] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [discount, setDiscount] = useState(0);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const [optionsCategory, setOptionsCategory] = useState([]);
    const [categorys, setCategorys] = useState([]);

    const [renderPage, setRenderPage] = useState(true);

    const columns = [
        {
            title: 'Tên chương trình',
            dataIndex: 'name',
            key: 'name',
            // width: '11.111111111111%',
            // sorter: (a, b) => a.user.localeCompare(b.user),
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
            align: 'center',
            width: '25%',
        },
        {
            title: 'Ngày bắt đầu',
            dataIndex: 'startDate',
            key: 'startDate',
            align: 'center',
            sorter: (a, b) =>
                moment(a.endDate, 'YYYY-MM-DD HH:mm').unix() - moment(b.endDate, 'YYYY-MM-DD HH:mm').unix(),
        },
        {
            title: 'Ngày kết thúc',
            dataIndex: 'endDate',
            key: 'endDate',
            align: 'center',
            sorter: (a, b) =>
                moment(a.endDate, 'YYYY-MM-DD HH:mm').unix() - moment(b.endDate, 'YYYY-MM-DD HH:mm').unix(),
        },
        {
            title: 'Khuyến mãi',
            dataIndex: 'discountRate',
            key: 'discountRate',
            align: 'center',
            sorter: (a, b) => a.discountRate - b.discountRate,
            render: (discountRate) => <>{discountRate * 100} % </>,
        },
        {
            title: 'Áp dụng',
            dataIndex: 'Categories',
            key: 'categories',
            align: 'center',
            editable: true,
            render: (promotion) => {
                return promotion.map((item, index) => (
                    <Tag key={item.name + index} color={'green'}>
                        {item.name}
                    </Tag>
                ));
            },
        },
        {
            title: 'Hành động',
            dataIndex: '',
            key: 'handle',
            align: 'center',
            render: (promotion) => (
                <div className={cx('d-flex', 'flex-column', 'justify-content-between', 'align-items-center')}>
                    <Button
                        className={cx('button')}
                        transparent
                        rounded
                        iconOnly={<FontAwesomeIcon icon={faPen} />}
                        onClick={() => {
                            handleClickUpdate(promotion);
                        }}
                    ></Button>
                    <Button
                        className={cx('button')}
                        transparent
                        rounded
                        iconOnly={<FontAwesomeIcon icon={faTrashCan} />}
                        onClick={() => handleRemovePromotion(promotion.id)}
                    ></Button>
                </div>
            ),
        },
    ];

    const getAllCategorys = async () => {
        const api = await categoryServices.getAllChildrenCategory();

        if (api?.status === 200) {
            var options = [];
            api.data.content.forEach((list) => {
                if (list?.ChildCategories.length > 0) {
                    var optionsChild = [];
                    list?.ChildCategories.forEach((item) => {
                        optionsChild.push({ label: item.Id, value: item.Name });
                    });

                    options.push({ label: list.Name, options: optionsChild });
                }
            });
            setOptionsCategory(options);
        }
    };

    const handleChangeCategory = (selectedOption) => {
        setCategorys(selectedOption);
    };

    const handleClickUpdate = (data) => {
        setName(data.name);
        setDescription(data.description);
        setStartDate(data.startDate);
        setEndDate(data.endDate);
        setDiscount(data.discountRate * 100);
        setUpdatePromotion(data);

        // Set Category
        const options = data.Categories.map((item) => ({ label: item.id, value: item.name }));

        setCategorys(options);
        setAction('update');
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

        if (api?.content) {
            setPromotions(api.content);
        } else setPromotions([]);
    };

    const handleAddPromotion = async () => {
        if (categorys.length === 0) {
            setErrMsg('Bạn chưa chọn Thể loại');
            return;
        }
        const data = {
            Name: name,
            Description: description,
            DiscountRate: discount / 100,
            StartDate: `${startDate.getFullYear()}-${
                startDate.getMonth() < 9 ? '0' + (startDate.getMonth() + 1).toString() : startDate.getMonth() + 1
            }-${startDate.getDate() < 10 ? '0' + startDate.getDate().toString() : startDate.getDate()} 00:00`,
            EndDate: `${endDate.getFullYear()}-${
                endDate.getMonth() < 9 ? '0' + (endDate.getMonth() + 1).toString() : endDate.getMonth() + 1
            }-${endDate.getDate() < 10 ? '0' + endDate.getDate().toString() : endDate.getDate()} 23:59`,
            Categories: getValueCategorys(),
        };

        const api = await promotionServices.addPromotion(data);

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

    const handleUpdatePromotion = async (e) => {
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

        const api = await promotionServices.updatePromotion(updatePromotion.id, data);

        if (api?.status === 200) {
            toast.success('Cập nhập khuyến mãi thành công', {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-message',
            });
            setRenderPage(!renderPage);
            setAction('view');
        } else {
            if (api === undefined) {
                toast.info('Vui lòng đăng nhập để tiếp tục cập nhập khuyến mãi.', {
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

    useEffect(() => {
        getAllPromotions();
        getAllCategorys();
    }, [renderPage, render]);

    return (
        <div className={cx('container')}>
            <div className={cx('row')}>
                <span className={cx('heading')}>Quản lí khuyến mãi</span>
            </div>

            {action === 'view' && (
                <div className={cx('row')}>
                    <div className={cx('control')}>
                        <div className={cx('add-layout')}>
                            <Button
                                rounded
                                approach
                                iconOnly={<FontAwesomeIcon icon={faPlus} />}
                                onClick={() => {
                                    setName('');
                                    setDescription('');
                                    setStartDate();
                                    setEndDate();
                                    setDiscount(0);
                                    setAction('add');
                                }}
                            ></Button>
                            <span className={cx('text')}>Thêm khuyến mãi</span>
                        </div>
                    </div>
                    <DataTable data={promotions} columns={columns} showExport={false} />
                </div>
            )}

            {action === 'add' && (
                <div className={cx('form-layout')} onSubmit={handleAddPromotion}>
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
                        <DateTimePicker
                            className={cx('input-item-date')}
                            format="yyyy-MM-dd"
                            value={startDate}
                            onChange={(value) => setStartDate(value)}
                        />
                    </div>
                    <div className={cx('group-item')}>
                        <div className={cx('label-item')}>Ngày kết thúc : </div>
                        <DateTimePicker
                            className={cx('input-item-date')}
                            format="yyyy-MM-dd"
                            value={endDate}
                            onChange={(value) => setEndDate(value)}
                        />
                    </div>
                    <div className={cx('group-item')}>
                        <div className={cx('label-item')}>Khuyến mãi(%) : </div>
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
                                onFocus={() => setOpenCategorys(true)}
                                onBlur={() => setOpenCategorys(false)}
                                menuIsOpen={openCategorys}
                            />
                        </div>
                    </div>

                    <div className={cx('button-layout')}>
                        <Button outline border primary onClick={() => handleAddPromotion()}>
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
                </div>
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
                        <DateTimePicker
                            className={cx('input-item-date')}
                            format="yyyy-MM-dd"
                            value={startDate}
                            onChange={(value) => setStartDate(value)}
                        />
                    </div>
                    <div className={cx('group-item')}>
                        <div className={cx('label-item')}>Ngày kết thúc : </div>
                        <DateTimePicker
                            className={cx('input-item-date')}
                            format="yyyy-MM-dd"
                            value={endDate}
                            onChange={(value) => setEndDate(value)}
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
                                value={categorys}
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
                                setUpdatePromotion(null);
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
