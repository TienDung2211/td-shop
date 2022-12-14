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
            setErrMsg('B???n ch??a ch???n Th??? lo???i');
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
            toast.success('Th??m khuy???n m??i m???i th??nh c??ng', {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-message',
            });
            setRenderPage(!renderPage);
            setAction('view');
        } else {
            if (api?.status === 403) {
                toast.info('Vui l??ng ????ng nh???p ????? ti???p t???c th??m s???n ph???m.', {
                    position: toast.POSITION.TOP_RIGHT,
                    className: 'toast-message',
                });
            } else if (api.message === 'Promotion name existed') {
                toast.info('T??n khuy???n m??i ???? t???n t???i.', {
                    position: toast.POSITION.TOP_RIGHT,
                    className: 'toast-message',
                });
            } else {
                toast.error('L???i kh??ng x??c ?????nh, vui l??ng th??? l???i sau.', {
                    position: toast.POSITION.TOP_RIGHT,
                    className: 'toast-message',
                });
            }
        }
    };

    const handleRemovePromotion = async (id) => {
        const api = await promotionServices.deletePromotion(id);

        if (api?.status === 200) {
            toast.success('X??a khuy???n m??i th??nh c??ng', {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-message',
            });
            setRenderPage(!renderPage);
            setAction('view');
        } else if (api === undefined) {
            toast.error('Vui l??ng ????ng nh???p ????? ti???p t???c x??a khuy???n m??i.', {
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
        // Set Category
        let array = [];

        optionsCategory.forEach((option) => {
            data?.Categories.forEach((item) => {
                if (option.label === item?.id) {
                    array.push(option);
                }
            });
        });

        setCategorys(array);
        setAction('update');
    };

    const handleUpdatePromotion = async (e) => {
        e.preventDefault();
        if (categorys.length === 0) {
            setErrMsg('B???n ch??a ch???n Th??? lo???i');
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
        console.log(api);
        if (api?.status === 200) {
            toast.success('C???p nh???p khuy???n m??i th??nh c??ng', {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-message',
            });
            setRenderPage(!renderPage);
            setAction('view');
        } else {
            if (api === undefined) {
                toast.info('Vui l??ng ????ng nh???p ????? ti???p t???c c???p nh???p khuy???n m??i.', {
                    position: toast.POSITION.TOP_RIGHT,
                    className: 'toast-message',
                });
            } else if (api.message === 'Promotion name existed') {
                toast.info('T??n khuy???n m??i ???? t???n t???i.', {
                    position: toast.POSITION.TOP_RIGHT,
                    className: 'toast-message',
                });
            } else {
                toast.error('L???i kh??ng x??c ?????nh, vui l??ng th??? l???i sau.', {
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
                        <input className={cx('input-search')} type="text" placeholder="Nh???p t??n t??m ki???m"></input>
                    </div>

                    <Button primary border>
                        ??p d???ng
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
                    <div className={cx('title')}>Th??m khuy???n m??i</div>
                    <div className={cx('group')}>
                        <span className={cx('error-msg')}>{errMsg}</span>
                    </div>
                    <div className={cx('group-item')}>
                        <div className={cx('label-item')}>T??n ch????ng tr??nh : </div>
                        <input
                            className={cx('input-item')}
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className={cx('group-item')}>
                        <div className={cx('label-item')}>M?? t??? : </div>
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
                        <div className={cx('label-item')}>Ng??y b???t ?????u : </div>
                        <input
                            className={cx('input-item')}
                            type="datetime-local"
                            required
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </div>
                    <div className={cx('group-item')}>
                        <div className={cx('label-item')}>Ng??y k???t th??c : </div>
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
                        <div className={cx('label-item')}>Khuy???n m??i(%) : </div>
                        <input
                            className={cx('input-item')}
                            type="number"
                            required
                            value={discount}
                            onChange={(e) => setDiscount(e.target.value)}
                        />
                    </div>
                    <div className={cx('group-item')}>
                        <div className={cx('label-item')}>Th??? lo???i : </div>
                        <div className={cx('input-item-select')}>
                            <Select
                                formatOptionLabel={(option) => `${option.value}`}
                                isOptionDisabled={(option) => option.disabled}
                                isMulti
                                placeholder="Ch???n th??? lo???i..."
                                onChange={handleChangeCategory}
                                options={optionsCategory}
                            />
                        </div>
                    </div>

                    <div className={cx('button-layout')}>
                        <Button outline border primary type="submit">
                            X??c nh???n
                        </Button>
                        <Button
                            outline
                            border
                            onClick={() => {
                                setAction('view');
                            }}
                        >
                            H???y
                        </Button>
                    </div>
                </form>
            )}
            {action === 'update' && updatePromotion && (
                <form className={cx('form-layout')} onSubmit={handleUpdatePromotion}>
                    <div className={cx('title')}>C???p nh???p khuy???n m??i</div>
                    <div className={cx('group')}>
                        <span className={cx('error-msg')}>{errMsg}</span>
                    </div>
                    <div className={cx('group-item')}>
                        <div className={cx('label-item')}>T??n ch????ng tr??nh : </div>
                        <input
                            className={cx('input-item')}
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className={cx('group-item')}>
                        <div className={cx('label-item')}>M?? t??? : </div>
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
                        <div className={cx('label-item')}>Ng??y b???t ?????u : </div>
                        <input
                            className={cx('input-item')}
                            type="datetime-local"
                            required
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </div>
                    <div className={cx('group-item')}>
                        <div className={cx('label-item')}>Ng??y k???t th??c : </div>
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
                        <div className={cx('label-item')}>Khuy???n m??i(%) : </div>
                        <input
                            className={cx('input-item')}
                            type="number"
                            required
                            value={discount}
                            onChange={(e) => setDiscount(e.target.value)}
                        />
                    </div>
                    <div className={cx('group-item')}>
                        <div className={cx('label-item')}>Th??? lo???i : </div>
                        <div className={cx('input-item-select')}>
                            <Select
                                formatOptionLabel={(option) => `${option.value}`}
                                isOptionDisabled={(option) => option.disabled}
                                isMulti
                                value={categorys}
                                placeholder="Ch???n th??? lo???i..."
                                onChange={handleChangeCategory}
                                options={optionsCategory}
                            />
                        </div>
                    </div>

                    <div className={cx('button-layout')}>
                        <Button outline border primary type="submit">
                            C???p nh???p
                        </Button>
                        <Button
                            outline
                            border
                            onClick={() => {
                                setAction('view');
                                setUpdatePromotion(null);
                            }}
                        >
                            H???y
                        </Button>
                    </div>
                </form>
            )}
            <ToastContainer />
        </div>
    );
}

export default SaleM;
