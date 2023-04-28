import classNames from 'classnames/bind';
import styles from './ProductM.module.scss';

import { useState, useEffect, useContext } from 'react';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Select from 'react-select';
import Button from '~/components/Button';
import ProductMItem from './ProductMItem';
import DataContext from '~/context/DataContext';
import brandServices from '~/services/brandServices';
import productServices from '~/services/productServices';
import categoryServices from '~/services/categoryServices';
import variationServices from '~/services/variationServices';
import ImageUploading from 'react-images-uploading';
import { ToastContainer, toast } from 'react-toastify';

const cx = classNames.bind(styles);

function ProductM() {
    const maxNumber = 7;
    const [products, setProducts] = useState([]);
    const [idProduct, setIdProduct] = useState(0);
    const [action, setAction] = useState('view');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [shortDescription, setShortDescription] = useState('');
    const [total, setTotal] = useState('');
    const [mainImage, setMainImage] = useState([]);
    const [otherImages, setOtherImages] = useState([]);
    const [errMsg, setErrMsg] = useState('');
    const { render } = useContext(DataContext);
    const [renderPage, setRenderPage] = useState(true);

    const onChangeMainImage = (imageList, addUpdateIndex) => {
        setMainImage(imageList);
    };

    const onChangeOtherImage = (imageList, addUpdateIndex) => {
        setOtherImages(imageList);
    };

    //Brand
    const [optionsBrand, setOptionsBrand] = useState([]);
    const [brand, setBrand] = useState(null);
    //Category
    const [optionsCategory, setOptionsCategory] = useState([]);
    const [categorys, setCategorys] = useState([]);
    //Variation
    const [optionsVariation, setOptionsVariation] = useState([]);
    const [variations, setVariations] = useState([]);
    //Attribute
    const [optionsAttribute, setOptionsAttribute] = useState([]);
    const [attributes, setAttributes] = useState([]);

    const getAllProducts = async () => {
        let api = await productServices.getAllProducts();

        if (api?.content) {
            setProducts(api?.content);
        }
    };

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

    const getValueAttributes = (async) => {
        const label = document.querySelectorAll('div[name=label-attribute]');
        const value = document.querySelectorAll('input[name=value-attribute]');

        let object = {};

        for (let i = 0; i < label.length; i++) {
            object[label[i].id] = value[i].value;
        }

        return object;
    };

    const handleRenderAttribute = () => {
        let array = [];

        for (let i = 0; i < attributes.length; i++) {
            array.push(
                `<div class="label-attribute" name="label-attribute" id=${Number(attributes[i].label)}>${
                    'Thông số kĩ thuật ' + attributes[i].value
                }</div><input type="text" required name="value-attribute" class="input-attribute-value" placeholder="Nhập giá trị"/>`,
            );
        }
        return array.join(' ');
    };

    const getValueMainImage = () => {
        return mainImage[0].data_url;
    };

    const getValueOrderImage = () => {
        let array = [];
        for (let i = 0; i < otherImages.length; i++) {
            array.push(otherImages[i].data_url);
        }

        return array;
    };

    const handleSubmitAdd = async (e) => {
        e.preventDefault();
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
        if (mainImage.length === 0) {
            setErrMsg('Bạn chưa chọn Hình ảnh chính');
            return;
        }
        if (otherImages.length === 0) {
            setErrMsg('Bạn chưa chọn Hình ảnh khác');
            return;
        }
        const data = {
            ProductInfo: {
                Name: name,
                Price: price,
                Description: description,
                ShortDescription: shortDescription,
                Total: total,
                BrandId: brand.label,
                CategoryIds: getValueCategorys(),
                Attributes: getValueAttributes(),
                Variations: getValueVariations(),
            },
            MainImage: getValueMainImage(),
            OtherImage: getValueOrderImage(),
        };

        console.log(data);

        const api = await productServices.addProduct(data);

        if (api?.status === 200) {
            toast.success('Thêm sản phẩm mới thành công', {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-message',
            });
            // setAction('view');
            setRenderPage(!renderPage);
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

    const handleClickUpdate = (product) => {
        setAction('update');
        alert(product.Id);
        console.log(product);
        setIdProduct(product.Id);
        setName(product.Name);
        setDescription(product.Description);
        setShortDescription(product.ShortDescription);
    };

    const handleRemoveProduct = async () => {};

    const handleChangeStatus = async () => {};

    const handleSumitUpdate = async () => {};

    useEffect(() => {
        getAllBrands();
        getAllProducts();
        getAllCategorys();
        getAllVariations();
        getAllAttributes();
    }, [errMsg, render, action, renderPage]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('control')}>
                <Button
                    rounded
                    approach
                    iconOnly={<FontAwesomeIcon icon={faPlus} />}
                    onClick={() => {
                        setAction('add');
                    }}
                ></Button>
                <form className={cx('control-filt')}>
                    <div className={cx('input-layout')}>
                        <input className={cx('input')} type="text" placeholder="Nhập tên tìm kiếm"></input>
                    </div>
                    <div className={cx('button-control')}>
                        <Button primary border>
                            Áp dụng
                        </Button>
                    </div>
                </form>
            </div>
            {action === 'view' && products.length > 0 && (
                <div className={cx('results')}>
                    {products.map((item, index) => {
                        return (
                            <ProductMItem
                                key={index}
                                data={item}
                                onClickUpdate={() => handleClickUpdate(item)}
                                onClickRemove={handleRemoveProduct}
                            />
                        );
                    })}
                </div>
            )}
            {action === 'add' && (
                <form className={cx('form-layout')} onSubmit={handleSubmitAdd}>
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
                    <div className={cx('group-item')}>
                        <div className={cx('label-item')}>Mô tả : </div>
                        <input
                            className={cx('input-item')}
                            type="text"
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
                            />
                        </div>
                    </div>
                    <div
                        className={cx('attributes-list')}
                        dangerouslySetInnerHTML={{ __html: handleRenderAttribute() }}
                    ></div>
                    <div className={cx('group-image')}>
                        <div className={cx('label-item')}>Ảnh chính : </div>
                        <div className={cx('input-item-image')}>
                            <ImageUploading
                                value={mainImage}
                                onChange={onChangeMainImage}
                                dataURLKey="data_url"
                                acceptType={['jpg', 'gif', 'png']}
                            >
                                {({
                                    imageList,
                                    onImageUpload,
                                    onImageUpdate,
                                    onImageRemove,
                                    isDragging,
                                    dragProps,
                                }) => (
                                    <div className={cx('image-layout')}>
                                        <span
                                            style={isDragging ? { color: 'red' } : null}
                                            onClick={onImageUpload}
                                            {...dragProps}
                                            className={cx('add-image')}
                                        >
                                            Chọn hình ảnh
                                        </span>
                                        {imageList.map((image, index) => (
                                            <div key={index} className={cx('display')}>
                                                <img src={image.data_url} alt="" className={cx('image-item')} />
                                                <div className={cx('update-remove')}>
                                                    <Button
                                                        onClick={() => onImageUpdate(index)}
                                                        className={cx('update')}
                                                        border
                                                    >
                                                        Cập nhập
                                                    </Button>
                                                    <Button
                                                        onClick={() => onImageRemove(index)}
                                                        className={cx('remove')}
                                                        border
                                                    >
                                                        Xóa
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </ImageUploading>
                        </div>
                    </div>

                    <div className={cx('group-image')}>
                        <div className={cx('label-item')}>Ảnh khác : </div>
                        <div className={cx('input-item-image')}>
                            <ImageUploading
                                multiple
                                value={otherImages}
                                onChange={onChangeOtherImage}
                                maxNumber={maxNumber}
                                dataURLKey="data_url"
                                acceptType={['jpg', 'gif', 'png']}
                            >
                                {({
                                    imageList,
                                    onImageUpload,
                                    onImageUpdate,
                                    onImageRemove,
                                    onImageRemoveAll,
                                    isDragging,
                                    dragProps,
                                }) => (
                                    <div className={cx('image-layout')}>
                                        <div className={cx('btn-image')}>
                                            <span
                                                style={isDragging ? { color: 'red' } : null}
                                                onClick={onImageUpload}
                                                {...dragProps}
                                                className={cx('add-image')}
                                            >
                                                Chọn hình ảnh
                                            </span>
                                            <span onClick={onImageRemoveAll} className={cx('remove-all-image')}>
                                                Xóa tất cả
                                            </span>
                                        </div>
                                        {imageList.map((image, index) => (
                                            <div key={index} className={cx('display')}>
                                                <img src={image.data_url} alt="" className={cx('image-item')} />
                                                <div className={cx('update-remove')}>
                                                    <Button
                                                        onClick={() => onImageUpdate(index)}
                                                        className={cx('update')}
                                                        border
                                                    >
                                                        Đổi ảnh
                                                    </Button>
                                                    <Button
                                                        onClick={() => onImageRemove(index)}
                                                        className={cx('remove')}
                                                        border
                                                    >
                                                        Xóa
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </ImageUploading>
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
            {action === 'update' && (
                <form className={cx('form-layout')} onSubmit={handleSubmitAdd}>
                    <span>Update</span>

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
                    <div className={cx('group-item')}>
                        <div className={cx('label-item')}>Mô tả : </div>
                        <input
                            className={cx('input-item')}
                            type="text"
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
                            />
                        </div>
                    </div>
                    <div
                        className={cx('attributes-list')}
                        dangerouslySetInnerHTML={{ __html: handleRenderAttribute() }}
                    ></div>

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
            <ToastContainer />
        </div>
    );
}

export default ProductM;
