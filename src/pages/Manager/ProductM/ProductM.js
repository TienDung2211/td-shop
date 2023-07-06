import classNames from 'classnames/bind';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './ProductM.module.scss';
import categoryServices from '~/services/categoryServices';
import productServices from '~/services/productServices';

import Button from '~/components/Button';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPen, faPlus, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import DataContext from '~/context/DataContext';
import { ToastContainer, toast } from 'react-toastify';
import { useState, useEffect, useContext } from 'react';
import AddProductM from './AddProductM';
import UpdateProductM from './UpdateProductM';
import DataTable from '~/components/DataTable/DataTable';

const cx = classNames.bind(styles);

function ProductM() {
    const [products, setProducts] = useState([]);
    const [idProduct, setIdProduct] = useState(0);
    const [searchValue, setSearchValue] = useState('');
    const [action, setAction] = useState('view');
    const [masterCategorys, setMasterCategorys] = useState([]);
    const [mId, setMId] = useState({ label: { id: 0, name: 'Chọn MasterCategory' }, value: 'Chọn MasterCategory' });
    const [parentCategorys, setParentCategorys] = useState([]);
    const [pId, setPId] = useState({ label: { Id: 0, name: 'Chọn ParentCategory' }, value: 'Chọn ParentCategory' });
    const [childrenCategorys, setChildrenCategorys] = useState([]);
    const [cId, setCId] = useState({ label: { Id: 0, name: 'Chọn ChildCategory' }, value: 'Chọn ChildCategory' });

    const { render } = useContext(DataContext);
    const [renderPage, setRenderPage] = useState(false);

    const columns = [
        {
            title: 'Ảnh sản phẩm',
            dataIndex: '',
            key: 'product',
            render: (product) => <img src={product.ImageUrl} className={cx('image')} />,
        },
        {
            title: 'Tên sản phẩm',
            dataIndex: '',
            width: '25%',
            key: 'product.Name',
            render: (product) => <p>{product.Name}</p>,
            sorter: (a, b) => a.Name.localeCompare(b.Name),
        },
        {
            title: 'Thương hiệu',
            dataIndex: '',
            key: 'product.Brand',
            align: 'center',

            render: (product) => <p>{product.Brand.name}</p>,
            sorter: (a, b) => a.Brand.name.localeCompare(b.Brand.name),
        },
        {
            title: 'Giá',
            dataIndex: '',
            key: 'product.Price',
            align: 'center',
            render: (product) => (
                <p>{parseInt(product.Price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
            ),
            sorter: (a, b) => a.Price - b.Price,
        },
        {
            title: 'Đã bán',
            dataIndex: 'SelAmount',
            key: 'product.SelAmount',
            align: 'center',

            sorter: (a, b) => a.SelAmount - b.SelAmount,
        },
        {
            title: 'Hành động',
            dataIndex: '',
            key: 'handle',
            align: 'center',
            render: (product) => (
                <div className={cx('d-flex', 'flex-column', 'justify-content-between', 'align-items-center')}>
                    <Button
                        className={cx('button')}
                        transparent
                        rounded
                        iconOnly={<FontAwesomeIcon icon={faPen} />}
                        onClick={() => {
                            setIdProduct(product.Id);
                            setAction('update');
                        }}
                    ></Button>
                    <Button
                        className={cx('button')}
                        transparent
                        rounded
                        iconOnly={<FontAwesomeIcon icon={faTrashCan} />}
                        onClick={() => handleClickDelete(product.Id)}
                    ></Button>
                </div>
            ),
        },
    ];

    const getAllProducts = async () => {
        let api = await productServices.getAllProducts(searchValue, cId.label.Id);

        if (api?.status === 200) {
            setProducts(api?.data.content);
        }
    };

    const handleClickCancle = () => {
        setAction('view');
    };

    const handleClickDelete = async (id) => {
        const api = await productServices.deleteProduct(id);

        console.log(api);

        if (api?.status === 200) {
            toast.success('Sản phẩm đã bị xóa.', {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-message',
            });

            setRenderPage(!renderPage);
        } else if (api === undefined) {
            toast.error('Vui lòng đăng nhập để tiếp tục xóa sản phẩm.', {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-message',
            });
        } else {
            toast.info('Lỗi không xác định vui lòng thử lại.', {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-message',
            });
        }
    };

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
        const api = await categoryServices.getAllParentCategory(mId.label.id);

        if (api?.data) {
            var options = [{ label: { Id: 0, name: 'Chọn ParentCategory' }, value: 'Chọn ParentCategory' }];
            api.data.forEach((item) => {
                options.push({ label: item, value: item.Name });
            });
            setParentCategorys(options);
        }
    };

    const getAllChildrenCategorys = async () => {
        const api = await categoryServices.getChildrenCategoryById(pId.label.Id);

        if (api?.data) {
            var options = [{ label: { Id: 0, name: 'Chọn ChildCategory' }, value: 'Chọn ChildCategory' }];
            api.data.ChildCategories.forEach((item) => {
                options.push({ label: item, value: item.Name });
            });
            setChildrenCategorys(options);
        }
    };

    const handleChangeMC = (selectedOption) => {
        setMId(selectedOption);
        setPId({ label: { Id: 0, name: 'Chọn ParentCategory' }, value: 'Chọn ParentCategory' });
        setCId({ label: { Id: 0, name: 'Chọn ChildCategory' }, value: 'Chọn ChildCategory' });
    };

    const handleChangePC = (selectedOption) => {
        setPId(selectedOption);
        setCId({ label: { Id: 0, name: 'Chọn ChildCategory' }, value: 'Chọn ChildCategory' });
    };

    const handleChangeCC = (selectedOption) => {
        setCId(selectedOption);
    };

    useEffect(() => {
        getAllMasterCategorys();
    }, []);

    useEffect(() => {
        getAllParentCategorys();
    }, [mId.label.id]);

    useEffect(() => {
        getAllChildrenCategorys();
    }, [pId.label.Id]);

    useEffect(() => {
        getAllProducts();
    }, [render, searchValue, cId.label.Id, renderPage]);

    return (
        <div className={cx('container')}>
            <div className={cx('row')}>
                <div className={cx('heading')}>Quản lí sản phẩm</div>
            </div>
            {action === 'view' && (
                <div>
                    <div className={cx('row')}>
                        <div className={cx('control')}>
                            <div className={cx('add-layout')}>
                                <Button
                                    rounded
                                    approach
                                    iconOnly={<FontAwesomeIcon icon={faPlus} />}
                                    onClick={() => {
                                        setIdProduct(0);
                                        setAction('add');
                                    }}
                                ></Button>
                                <span className={cx('text')}>Thêm sản phẩm</span>
                            </div>
                            <div className={cx('search')}>
                                <input
                                    className={cx('search-input')}
                                    type="text"
                                    placeholder="Nhập tên sản phẩm"
                                    value={searchValue}
                                    spellCheck={false}
                                    onChange={(e) => setSearchValue(e.target.value)}
                                ></input>
                                <div className={cx('search-btn')} onClick={() => {}}>
                                    <FontAwesomeIcon icon={faMagnifyingGlass} className={cx('icon')} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('row', 'mt-3', 'd-flex')}>
                        <div className={cx('form-group')}>
                            <label className={cx('label')}>MasterCategory</label>
                            <div className={cx('mt-1')}></div>

                            <Select
                                formatOptionLabel={(option) => `${option.value}`}
                                placeholder="Chọn MasterCategory..."
                                onChange={handleChangeMC}
                                options={masterCategorys}
                                value={mId}
                                className={cx('select-form')}
                            />
                        </div>
                        <div className={cx('form-group')}>
                            <label className={cx('label')}>ParentCategory</label>
                            <div className={cx('mt-1')}></div>

                            <Select
                                formatOptionLabel={(option) => `${option.value}`}
                                placeholder="Chọn ParentCategory..."
                                onChange={handleChangePC}
                                options={parentCategorys}
                                value={pId}
                                className={cx('select-form')}
                            />
                        </div>
                        <div className={cx('form-group')}>
                            <label className={cx('label')}>ChildCategory</label>
                            <div className={cx('mt-1')}></div>

                            <Select
                                formatOptionLabel={(option) => `${option.value}`}
                                placeholder="Chọn ChildCategory..."
                                onChange={handleChangeCC}
                                options={childrenCategorys}
                                value={cId}
                                className={cx('select-form')}
                            />
                        </div>
                    </div>
                    <div className={cx('row', 'mt-3')}>
                        <DataTable columns={columns} data={products} showExport={false} />
                    </div>
                </div>
            )}
            {action === 'add' && (
                <div className={cx('row')}>
                    <AddProductM onClickCancle={handleClickCancle} />
                </div>
            )}

            {action === 'update' && (
                <div className={cx('row')}>
                    <UpdateProductM id={idProduct} onClickCancle={handleClickCancle} />
                </div>
            )}
            <ToastContainer />
        </div>
    );
}

export default ProductM;
