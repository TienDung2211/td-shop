import classNames from 'classnames/bind';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './ProductM.module.scss';
import productServices from '~/services/productServices';

import Button from '~/components/Button';
import ProductMItem from './ProductMItem';
import DataContext from '~/context/DataContext';
import { ToastContainer, toast } from 'react-toastify';
import { useState, useEffect, useContext } from 'react';
import { faPlus, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AddProductM from './AddProductM';
import UpdateProductM from './UpdateProductM';

const cx = classNames.bind(styles);

function ProductM() {
    const [products, setProducts] = useState([]);
    const [idProduct, setIdProduct] = useState(0);
    const [searchValue, setSearchValue] = useState('');
    const [action, setAction] = useState('view');
    const { render } = useContext(DataContext);
    const [renderPage, setRenderPage] = useState(false);

    const getAllProducts = async () => {
        let api = await productServices.getAllProducts(searchValue);

        if (api?.content) {
            setProducts(api?.content);
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

    useEffect(() => {
        getAllProducts();
    }, [render, searchValue, renderPage]);

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
                    <div className={cx('mt-3')}></div>
                    <div className={cx('row')}>
                        <div className={cx('product-list')}>
                            {products.map((item, index) => {
                                return (
                                    <ProductMItem
                                        key={index}
                                        data={item}
                                        onClickUpdate={() => {
                                            setIdProduct(item.Id);
                                            setAction('update');
                                        }}
                                        onClickRemove={() => {
                                            handleClickDelete(item.Id);
                                        }}
                                    />
                                );
                            })}
                        </div>
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
