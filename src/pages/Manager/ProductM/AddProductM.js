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
import attributeServices from '~/services/attributeServices';

const cx = classNames.bind(styles);

function AddProductM({ onClickCancle }) {
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [shortDescription, setShortDescription] = useState('');
    const [total, setTotal] = useState(0);
    const [length, setLength] = useState(0);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [weight, setWeight] = useState(0);
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
    //MasterCategory
    const [idMaster, setIdMaster] = useState(0);
    const [optionsMaster, setOptionsMaster] = useState([]);
    const getAllMasterCategory = async () => {
        const api = await categoryServices.getAllMasterCategory();
        if (api?.status === 200) {
            var options = [];
            api.data.content.forEach((item) => {
                options.push({ label: item.id, value: item.name });
            });
            setOptionsMaster(options);
        }
    };
    const handleChangeMasterCategory = (selectedOption) => {
        setIdMaster(selectedOption.label);
    };

    //MasterAttributes
    const [idMasterAttribute, setIdMasterAttribute] = useState(0);
    const [optionsMasterAttribute, setOptionsMasterAttribute] = useState([]);
    const getAllMasterAttribute = async () => {
        const api = await attributeServices.getAllAttributes();
        console.log(api);
        if (api?.status === 200) {
            var options = [];
            api.data.content.forEach((item) => {
                options.push({ label: item.id, value: item.name });
            });
            setOptionsMasterAttribute(options);
        }
    };
    const handleChangeMasterAttribute = (selectedOption) => {
        setIdMasterAttribute(selectedOption.label);
    };

    //Brand
    const [optionsBrand, setOptionsBrand] = useState([]);
    const [brand, setBrand] = useState(null);
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

    //Category
    const [optionsCategory, setOptionsCategory] = useState([]);
    const [categorys, setCategorys] = useState([]);
    const [openCategory, setOpenCategory] = useState(false);
    const getAllCategorys = async () => {
        let api = await categoryServices.getAllParentCategory(idMaster);

        var options = [];
        api.data.forEach((list) => {
            var optionsChild = [];
            list?.ChildCategories.forEach((item) => {
                optionsChild.push({ label: item.Id, value: item.Name });
            });

            options.push({ label: list.Name, options: optionsChild });
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

    //Variation
    const [optionsVariation, setOptionsVariation] = useState([]);
    const [variations, setVariations] = useState([]);
    const [openVariation, setOpenVariation] = useState(false);
    const getAllVariations = async () => {
        let api = await variationServices.getVariationById(idMaster);

        var options = [];
        api.data.forEach((list) => {
            var optionsChild = [];
            list?.setOfVariationOptions.forEach((item) => {
                optionsChild.push({ label: item.id, value: item.value });
            });

            options.push({ label: list.name, options: optionsChild });
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

    //Attribute
    const [optionsAttribute, setOptionsAttribute] = useState([]);
    const [attributes, setAttributes] = useState([]);
    const [inputAttributes, setInputAttributes] = useState([]);
    const [openAttribute, setOpenAttribute] = useState(false);
    const getAllAttributes = async () => {
        let api = await attributeServices.getAttributeById(idMasterAttribute);

        var options = [];
        api?.data?.setOfAttributes.forEach((item) => {
            options.push({ label: item.id, value: item.name });
        });
        setOptionsAttribute(options);
    };

    const handleChangeAttributes = (selectedOption) => {
        setAttributes(selectedOption);
    };

    // Submit Form
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
            Width: width,
            Height: height,
            Weight: weight,
            Length: length,
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
        getAllMasterCategory();
        getAllBrands();
        getAllMasterAttribute();
    }, []);

    useEffect(() => {
        getAllCategorys();
        getAllVariations();
        getAllAttributes();
    }, [idMaster]);

    useEffect(() => {
        getAllAttributes();
    }, [idMasterAttribute]);

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
                <div className={cx('label-item')}>Chiều dài(cm) : </div>
                <input
                    className={cx('input-item')}
                    type="number"
                    required
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                />
            </div>
            <div className={cx('group-item')}>
                <div className={cx('label-item')}>Chiều rộng(cm) : </div>
                <input
                    className={cx('input-item')}
                    type="number"
                    required
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                />
            </div>
            <div className={cx('group-item')}>
                <div className={cx('label-item')}>Chiều cao(cm) : </div>
                <input
                    className={cx('input-item')}
                    type="number"
                    required
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                />
            </div>
            <div className={cx('group-item')}>
                <div className={cx('label-item')}>Cân nặng(kg) : </div>
                <input
                    className={cx('input-item')}
                    type="number"
                    required
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
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
                <div className={cx('label-item')}>MasterCategory : </div>
                <div className={cx('input-item-select')}>
                    <Select
                        formatOptionLabel={(option) => `${option.value}`}
                        placeholder="Chọn MasterCategory..."
                        onChange={handleChangeMasterCategory}
                        options={optionsMaster}
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
                        isMulti={true}
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
                <div className={cx('label-item')}>MasterAttribute : </div>
                <div className={cx('input-item-select')}>
                    <Select
                        formatOptionLabel={(option) => `${option.value}`}
                        placeholder="Chọn MasterAttribute..."
                        onChange={handleChangeMasterAttribute}
                        options={optionsMasterAttribute}
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
