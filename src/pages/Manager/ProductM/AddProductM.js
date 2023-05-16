import classNames from 'classnames/bind';
import styles from './ProductM.module.scss';

import { useState, useEffect, useContext } from 'react';

import Select from 'react-select';
import Button from '~/components/Button';
import DataContext from '~/context/DataContext';
import brandServices from '~/services/brandServices';
import productServices from '~/services/productServices';
import categoryServices from '~/services/categoryServices';
import variationServices from '~/services/variationServices';
import { ToastContainer, toast } from 'react-toastify';

const cx = classNames.bind(styles);

function AddProductM({ onClickCancle }) {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [shortDescription, setShortDescription] = useState('');
    const [total, setTotal] = useState('');
    const [mainImage, setMainImage] = useState('');
    const [mainImagePreview, setMainImagePreview] = useState('');
    const [otherImages, setOtherImages] = useState([]);
    const [otherImagesPreiew, setOtherImagesPreiew] = useState([]);
    const [errMsg, setErrMsg] = useState('');
    const { render, setRender } = useContext(DataContext);

    const handleMainImageChange = (e) => {
        setMainImage(e.target.files[0]);
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            setMainImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleOrderImageChange = (e) => {
        setOtherImages(e.target.files);
        const files = e.target.files;
        const imagesArray = [];
        for (let i = 0; i < files.length; i++) {
            const reader = new FileReader();
            reader.onload = () => {
                imagesArray.push(reader.result);
                if (imagesArray.length === files.length) {
                    setOtherImagesPreiew(imagesArray);
                }
            };
            reader.readAsDataURL(files[i]);
        }
    };

    //Brand
    const [optionsBrand, setOptionsBrand] = useState([]);
    const [brand, setBrand] = useState(null);
    //Category
    const [optionsCategory, setOptionsCategory] = useState([]);
    const [categorys, setCategorys] = useState([]);
    const [openCategory, setOpenCategory] = useState(false);
    //Variation
    const [optionsVariation, setOptionsVariation] = useState([]);
    const [variations, setVariations] = useState([]);
    const [openVariation, setOpenVariation] = useState(false);
    //Attribute
    const [optionsAttribute, setOptionsAttribute] = useState([]);
    const [attributes, setAttributes] = useState([]);
    const [inputAttributes, setInputAttributes] = useState([]);
    const [openAttribute, setOpenAttribute] = useState(false);

    const getAllVariations = async () => {
        let api = await variationServices.getAllVariations();

        var options = [];
        api.content.forEach((list) => {
            options.push({ label: list.id, value: '+' + list.name, disabled: true });
            list?.setOfVariationOptions.forEach((item) => {
                options.push({ label: item.id, value: item.value });
            });
        });
        setOptionsVariation(options);
    };

    const handleChangeVariations = (selectedOption) => {
        setVariations(selectedOption);
    };

    const getValueVariations = () => {
        let array = [];

        variations.forEach((item) => {
            array.push(item.label);
        });

        return array;
    };

    const getAllCategorys = async () => {
        let api = await categoryServices.getAllParentCategory(1);

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

    const getAllBrands = async () => {
        let api = await brandServices.getAllBrands();

        var options = [];
        api.content.forEach((item) => {
            options.push({ label: item.id, value: item.name });
        });
        setOptionsBrand(options);
    };

    const handleChangeBrand = (selectedOption) => {
        setBrand(selectedOption);
    };

    const getAllAttributes = async () => {
        let api = await productServices.getAllAttributes();

        const attributes = api.content[0]?.setOfAttributes;

        var options = [];
        attributes.forEach((item) => {
            options.push({ label: item.id, value: item.name });
        });
        setOptionsAttribute(options);
    };

    const handleChangeAttributes = (selectedOption) => {
        setAttributes(selectedOption);
    };

    const handleAddProduct = async () => {
        if (brand === null) {
            setErrMsg('Bạn chưa chọn Thương hiệu');
            return;
        }
        if (categorys.length === 0) {
            setErrMsg('Bạn chưa chọn Thể loại');
            return;
        }
        if (variations.length === 0) {
            setErrMsg('Bạn chưa chọn Danh mục');
            return;
        }
        if (attributes.length === 0) {
            setErrMsg('Bạn chưa chọn Thông số kĩ thuật');
            return;
        }

        let formData = new FormData();

        const cap = {
            Name: name,
            Price: price,
            Description: description,
            ShortDescription: shortDescription,
            Total: total,
            BrandId: brand.label,
            CategoryIds: getValueCategorys(),
            Attributes: inputAttributes,
            Variations: getValueVariations(),
        };

        const json = JSON.stringify(cap);

        const blob = new Blob([json], {
            type: 'application/json',
        });

        formData.append('ProductInfo', blob);

        formData.append('MainImage', mainImage);

        for (let i = 0; i < otherImages.length; i++) {
            formData.append('OtherImage', otherImages[i]);
        }

        const api = await productServices.addProduct(formData);

        if (api.status === 200) {
            toast.success('Thêm sản phẩm mới thành công', {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-message',
            });
            onClickCancle();
            setRender(!render);
        } else {
            if (api?.status === 403) {
                toast.info('Vui lòng đăng nhập để tiếp tục thêm sản phẩm.', {
                    position: toast.POSITION.TOP_RIGHT,
                    className: 'toast-message',
                });
            } else if (api.message === 'Product name existed') {
                toast.info('Thêm sản phẩm đã tồn tại.', {
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
        getAllBrands();
        getAllCategorys();
        getAllVariations();
        getAllAttributes();
    }, []);

    useEffect(() => {}, [errMsg]);

    return (
        <div className={cx('col')}>
            <div className={cx('group')}>
                <span className={cx('error-msg')}>{errMsg}</span>
            </div>
            <div className={cx('group-item')}>
                <div className={cx('label-item')}>Tên sản phẩm : </div>
                <input
                    className={cx('input-item')}
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className={cx('group-item')}>
                <div className={cx('label-item')}>Mô tả ngắn : </div>
                <input
                    className={cx('input-item')}
                    type="text"
                    required
                    value={shortDescription}
                    onChange={(e) => setShortDescription(e.target.value)}
                />
            </div>
            <div className={cx('group-item', 'group-item-large')}>
                <div className={cx('label-item')}>Mô tả : </div>
                <textarea
                    className={cx('input-item', 'input-textarea')}
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div className={cx('group-item')}>
                <div className={cx('label-item')}>Giá : </div>
                <input
                    className={cx('input-item')}
                    type="number"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
            </div>
            <div className={cx('group-item')}>
                <div className={cx('label-item')}>Số lượng sản phẩm : </div>
                <input
                    className={cx('input-item')}
                    type="number"
                    required
                    value={total}
                    onChange={(e) => setTotal(e.target.value)}
                />
            </div>
            <div className={cx('group-item')}>
                <div className={cx('label-item')}>Thương hiệu : </div>
                <div className={cx('input-item-select')}>
                    <Select
                        formatOptionLabel={(option) => `${option.value}`}
                        placeholder="Chọn thương hiệu..."
                        onChange={handleChangeBrand}
                        options={optionsBrand}
                    />
                </div>
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
                        onFocus={() => setOpenCategory(true)}
                        onBlur={() => setOpenCategory(false)}
                        menuIsOpen={openCategory}
                    />
                </div>
            </div>
            <div className={cx('group-item')}>
                <div className={cx('label-item')}>Danh mục : </div>
                <div className={cx('input-item-select')}>
                    <Select
                        formatOptionLabel={(option) => `${option.value}`}
                        isOptionDisabled={(option) => option.disabled}
                        isMulti
                        placeholder="Chọn danh mục..."
                        onChange={handleChangeVariations}
                        options={optionsVariation}
                        onFocus={() => setOpenVariation(true)}
                        onBlur={() => setOpenVariation(false)}
                        menuIsOpen={openVariation}
                    />
                </div>
            </div>
            <div className={cx('group-item')}>
                <div className={cx('label-item')}>Thông số kĩ thuật : </div>
                <div className={cx('input-item-select')}>
                    <Select
                        formatOptionLabel={(option) => `${option.value}`}
                        isMulti
                        placeholder="Chọn thông số kĩ thuật..."
                        onChange={handleChangeAttributes}
                        options={optionsAttribute}
                        onFocus={() => setOpenAttribute(true)}
                        onBlur={() => setOpenAttribute(false)}
                        menuIsOpen={openAttribute}
                    />
                </div>
            </div>
            <div className={cx('attributes-list')}>
                {attributes.map((option, index) => (
                    <div key={index}>
                        <div className={cx('label-attribute')} name="label-attribute">
                            {'Thông số kĩ thuật ' + option.value}
                        </div>
                        <input
                            type="text"
                            className={cx('input-attribute-value')}
                            value={option.inputValue || ''}
                            onChange={(event) => {
                                const newSelectedOptions = [...attributes];
                                newSelectedOptions[index] = {
                                    ...option,
                                    inputValue: event.target.value,
                                };
                                setAttributes(newSelectedOptions);

                                const newValues = Object.assign(
                                    {},
                                    ...newSelectedOptions.map((option) => ({ [option.label]: option.inputValue })),
                                );

                                setInputAttributes(newValues);
                            }}
                        />
                    </div>
                ))}
            </div>
            <div className={cx('group-item')}>
                <div className={cx('label-item')}>Ảnh chính : </div>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                        handleMainImageChange(e);
                    }}
                />
            </div>
            {mainImagePreview && (
                <div className={cx('image-layout')}>
                    <img src={mainImagePreview} className={cx('main-image')} alt="selected" />
                </div>
            )}
            <div className={cx('group-item')}>
                <div className={cx('label-item')}>Ảnh khác : </div>
                <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => {
                        handleOrderImageChange(e);
                    }}
                />
            </div>
            <div className={cx('image-layout')}>
                {otherImagesPreiew.map((image, index) => (
                    <img key={index} src={image} className={cx('image')} alt="selected" />
                ))}
            </div>

            <div className={cx('button-layout')}>
                <Button outline border primary onClick={() => handleAddProduct()}>
                    Xác nhận
                </Button>
                <Button
                    outline
                    border
                    onClick={() => {
                        onClickCancle();
                    }}
                >
                    Hủy
                </Button>
            </div>
            <ToastContainer />
        </div>
    );
}

export default AddProductM;
