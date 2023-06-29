import classNames from 'classnames/bind';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './BrandM.module.scss';

import Button from '~/components/Button';
import brandServices from '~/services/brandServices';
import { useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import BrandMItem from './BrandMItem';
import { ToastContainer, toast } from 'react-toastify';

const cx = classNames.bind(styles);

function BrandM() {
    const [brands, setBrands] = useState([]);
    const [selectBrand, setSelectBrand] = useState({});
    const [brandName, setBrandName] = useState('');
    const [renderPage, setRenderPage] = useState(true);
    const [action, setAction] = useState('add');

    const [fileList, setFileList] = useState([]);
    const [previewUrl, setPreviewUrl] = useState([]);
    const [logoUrl, setLogoUrl] = useState('');
    const inputFileRef = useRef(null);

    const getAllBrands = async () => {
        const api = await brandServices.getAllBrands();

        if (api?.content) {
            setBrands(api.content);
        }
    };

    const addBrand = async () => {
        let formData = new FormData();

        const cap = {
            Name: brandName.toUpperCase(),
        };

        const json = JSON.stringify(cap);

        const blob = new Blob([json], {
            type: 'application/json',
        });

        formData.append('BrandInfo', blob);

        for (let i = 0; i < fileList.length; i++) {
            formData.append('Logo', fileList[i]);
        }

        var api = await brandServices.addBrand(formData);

        if (api?.status === 200) {
            toast.success('Thêm thương hiệu thành công', {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-message',
            });
            setRenderPage(!renderPage);
            // setRender(!render);
        } else if (api === undefined) {
            toast.error('Vui lòng đăng nhập để tiếp tục thêm tùy chọn.', {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-message',
            });
        } else if (api.status === 400) {
            toast.info('Tên thương hiệu đã tồn tại.', {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-message',
            });
        }
    };

    const updateBrand = async () => {
        let formData = new FormData();

        const cap = {
            Name: brandName.toUpperCase(),
        };

        const json = JSON.stringify(cap);

        const blob = new Blob([json], {
            type: 'application/json',
        });

        formData.append('BrandInfo', blob);

        for (let i = 0; i < fileList.length; i++) {
            formData.append('Logo', fileList[i]);
        }

        var api = await brandServices.updateBrand(selectBrand?.id, formData);

        if (api?.status === 200) {
            toast.success('Cập nhập thương hiệu thành công', {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-message',
            });
            setRenderPage(!renderPage);
            // setRender(!render);
        } else if (api === undefined) {
            toast.error('Vui lòng đăng nhập để tiếp tục cập nhập thương hiệu.', {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-message',
            });
        } else if (api.status === 400) {
            toast.info('Tên thương hiệu đã tồn tại.', {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-message',
            });
        }
    };

    const removeBrand = async () => {
        const api = await brandServices.removeBrand(selectBrand.id);

        if (api?.status === 200) {
            toast.success('Xóa thương hiệu thành công', {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-message',
            });
            setRenderPage(!renderPage);
        } else if (api === undefined) {
            toast.error('Vui lòng đăng nhập để tiếp tục xóa tùy chọn.', {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-message',
            });
        }
    };

    const handleImageChange = (event) => {
        let files = event.target.files;

        let imagePreviewUrls = [];

        for (let i = 0; i < files.length; i++) {
            let reader = new FileReader();
            reader.onloadend = () => {
                imagePreviewUrls.push(reader.result);

                setFileList(files);
                setPreviewUrl(imagePreviewUrls);
            };
            reader.readAsDataURL(files[i]);
        }
    };

    const render = () => {
        let imagePreview = null;
        if (previewUrl.length > 0) {
            imagePreview = (
                <div className={cx('image-preview')}>
                    {previewUrl.map((url, index) => (
                        <img key={index} src={url} alt="Preview" className={cx('image')} />
                    ))}
                </div>
            );
        } else if (logoUrl !== '') {
            imagePreview = (
                <div className={cx('image-preview')}>
                    <img src={logoUrl} alt="Preview" className={cx('image')} />
                </div>
            );
        }

        return imagePreview;
    };

    useEffect(() => {
        getAllBrands();
    }, [selectBrand, renderPage, fileList]);

    return (
        <div className={cx('container')}>
            <div className={cx('row')}>
                <div className={cx('col-6')}>
                    <div className={cx('view-brand-layout')}>
                        <span className={cx('heading')}>Quản lí thương hiệu</span>
                        <div className={cx('list-layout', 'd-flex', 'flex-wrap')}>
                            {brands.map((brand, index) => (
                                <BrandMItem
                                    key={index}
                                    data={brand}
                                    onClick={() => {
                                        setSelectBrand(brand);
                                        setBrandName(brand.name);
                                        setAction('update');
                                        setLogoUrl(brand.logoUrl);
                                        inputFileRef.current.value = null;
                                        setPreviewUrl([]);
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <div className={cx('col-6')}>
                    <div className={cx('mt-5')}></div>
                    <div className={cx('add-layout')}>
                        <Button
                            rounded
                            approach
                            iconOnly={<FontAwesomeIcon icon={faPlus} />}
                            onClick={() => {
                                setAction('add');
                                setBrandName('');
                                setLogoUrl('');
                                inputFileRef.current.value = null;
                                setPreviewUrl([]);
                            }}
                        ></Button>
                        <span className={cx('text')}>Thêm thương hiệu</span>
                    </div>
                    <span className={cx('detail-heading')}>Chi tiết thương hiệu</span>

                    <div className={cx('detail-layout')}>
                        <div className={cx('form-group')}>
                            <label className={cx('label')} htmlFor="brand">
                                Brand Name
                            </label>
                            <input
                                className={cx('input-text')}
                                id="brand"
                                placeholder="Enter Brand Name"
                                value={brandName}
                                onChange={(e) => setBrandName(e.target.value)}
                            ></input>
                        </div>
                        <div className={cx('form-group')}>
                            <label className={cx('label')} htmlFor="formFile">
                                Logo Image
                            </label>
                            <input
                                className={cx('input-file')}
                                type="file"
                                multiple
                                id="formFile"
                                accept="image/png, image/gif, image/jpeg, image/jpg"
                                ref={inputFileRef}
                                onChange={(e) => {
                                    handleImageChange(e);
                                }}
                            ></input>
                        </div>

                        {render()}

                        {action === 'add' && (
                            <div className={cx('button-layout')}>
                                <Button
                                    border
                                    onClick={() => {
                                        setBrandName('');
                                        setLogoUrl('');
                                        inputFileRef.current.value = null;
                                        setPreviewUrl([]);
                                    }}
                                >
                                    Làm mới
                                </Button>
                                <Button
                                    primary
                                    border
                                    onClick={() => {
                                        addBrand();
                                    }}
                                    className={cx('button')}
                                >
                                    Xác nhận
                                </Button>
                            </div>
                        )}

                        {action === 'update' && (
                            <div className={cx('button-layout')}>
                                <Button
                                    border
                                    className={cx('button')}
                                    onClick={() => {
                                        removeBrand();
                                    }}
                                >
                                    Xóa
                                </Button>
                                <Button
                                    primary
                                    border
                                    onClick={() => {
                                        updateBrand();
                                    }}
                                    className={cx('button')}
                                >
                                    Cập nhập
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default BrandM;
