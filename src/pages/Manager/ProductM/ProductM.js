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
import OptionsPopperM from './OptionsPopperM';

const cx = classNames.bind(styles);

function ProductM() {
    const maxNumber = 7;
    const [products, setProducts] = useState([]);
    const [updateProduct, setUpdateProduct] = useState(null);
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
        console.log(imageList, addUpdateIndex);
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
                    'Th??ng s??? k?? thu???t ' + attributes[i].value
                }</div><input type="text" required name="value-attribute" class="input-attribute-value" placeholder="Nh???p gi?? tr???"/>`,
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
            setErrMsg('B???n ch??a ch???n Th????ng hi???u');
            return;
        }
        if (categorys.length === 0) {
            setErrMsg('B???n ch??a ch???n Th??? lo???i');
            return;
        }
        if (variations.length === 0) {
            setErrMsg('B???n ch??a ch???n Danh m???c');
            return;
        }
        if (attributes.length === 0) {
            setErrMsg('B???n ch??a ch???n Th??ng s??? k?? thu???t');
            return;
        }
        if (mainImage.length === 0) {
            setErrMsg('B???n ch??a ch???n H??nh ???nh ch??nh');
            return;
        }
        if (otherImages.length === 0) {
            setErrMsg('B???n ch??a ch???n H??nh ???nh kh??c');
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

        console.log(api);

        if (api?.status === 200) {
            toast.success('Th??m s???n ph???m m???i th??nh c??ng', {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-message',
            });
            // setAction('view');
            setRenderPage(!renderPage);
        } else {
            if (api?.status === 403) {
                toast.info('Vui l??ng ????ng nh???p ????? ti???p t???c th??m s???n ph???m.', {
                    position: toast.POSITION.TOP_RIGHT,
                    className: 'toast-message',
                });
            } else if (api.message === 'Product name existed') {
                toast.info('Th??m s???n ph???m ???? t???n t???i.', {
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

    const handleClickUpdate = () => {
        setAction('update');
        handlePassData();
    };

    const handlePassData = () => {};

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
                    <OptionsPopperM lowBlack manager />

                    <div className={cx('input-layout')}>
                        <input className={cx('input')} type="text" placeholder="Nh???p t??n t??m ki???m"></input>
                    </div>
                    <div className={cx('button-control')}>
                        <Button primary border>
                            ??p d???ng
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
                                onClickUpdate={handleClickUpdate}
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
                        <div className={cx('label-item')}>T??n s???n ph???m : </div>
                        <input
                            className={cx('input-item')}
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className={cx('group-item')}>
                        <div className={cx('label-item')}>M?? t??? ng???n : </div>
                        <input
                            className={cx('input-item')}
                            type="text"
                            required
                            value={shortDescription}
                            onChange={(e) => setShortDescription(e.target.value)}
                        />
                    </div>
                    <div className={cx('group-item')}>
                        <div className={cx('label-item')}>M?? t??? : </div>
                        <input
                            className={cx('input-item')}
                            type="text"
                            required
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className={cx('group-item')}>
                        <div className={cx('label-item')}>Gi?? : </div>
                        <input
                            className={cx('input-item')}
                            type="number"
                            required
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>
                    <div className={cx('group-item')}>
                        <div className={cx('label-item')}>S??? l?????ng s???n ph???m : </div>
                        <input
                            className={cx('input-item')}
                            type="number"
                            required
                            value={total}
                            onChange={(e) => setTotal(e.target.value)}
                        />
                    </div>
                    <div className={cx('group-item')}>
                        <div className={cx('label-item')}>Th????ng hi???u : </div>
                        <div className={cx('input-item-select')}>
                            <Select
                                formatOptionLabel={(option) => `${option.value}`}
                                placeholder="Ch???n th????ng hi???u..."
                                onChange={handleChangeBrand}
                                options={optionsBrand}
                            />
                        </div>
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
                    <div className={cx('group-item')}>
                        <div className={cx('label-item')}>Danh m???c : </div>
                        <div className={cx('input-item-select')}>
                            <Select
                                formatOptionLabel={(option) => `${option.value}`}
                                isOptionDisabled={(option) => option.disabled}
                                isMulti
                                placeholder="Ch???n danh m???c..."
                                onChange={handleChangeVariations}
                                options={optionsVariation}
                            />
                        </div>
                    </div>
                    <div className={cx('group-item')}>
                        <div className={cx('label-item')}>Th??ng s??? k?? thu???t : </div>
                        <div className={cx('input-item-select')}>
                            <Select
                                formatOptionLabel={(option) => `${option.value}`}
                                isMulti
                                placeholder="Ch???n th??ng s??? k?? thu???t..."
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
                        <div className={cx('label-item')}>???nh ch??nh : </div>
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
                                            Ch???n h??nh ???nh
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
                                                        C???p nh???p
                                                    </Button>
                                                    <Button
                                                        onClick={() => onImageRemove(index)}
                                                        className={cx('remove')}
                                                        border
                                                    >
                                                        X??a
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
                        <div className={cx('label-item')}>???nh kh??c : </div>
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
                                                Ch???n h??nh ???nh
                                            </span>
                                            <span onClick={onImageRemoveAll} className={cx('remove-all-image')}>
                                                X??a t???t c???
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
                                                        ?????i ???nh
                                                    </Button>
                                                    <Button
                                                        onClick={() => onImageRemove(index)}
                                                        className={cx('remove')}
                                                        border
                                                    >
                                                        X??a
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
            {action === 'update' && (
                <form className={cx('form-layout')} onSubmit={handleSubmitAdd}>
                    <span>Update</span>

                    <div className={cx('group')}>
                        <span className={cx('error-msg')}>{errMsg}</span>
                    </div>
                    <div className={cx('group-item')}>
                        <div className={cx('label-item')}>T??n s???n ph???m : </div>
                        <input
                            className={cx('input-item')}
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className={cx('group-item')}>
                        <div className={cx('label-item')}>M?? t??? ng???n : </div>
                        <input
                            className={cx('input-item')}
                            type="text"
                            required
                            value={shortDescription}
                            onChange={(e) => setShortDescription(e.target.value)}
                        />
                    </div>
                    <div className={cx('group-item')}>
                        <div className={cx('label-item')}>M?? t??? : </div>
                        <input
                            className={cx('input-item')}
                            type="text"
                            required
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className={cx('group-item')}>
                        <div className={cx('label-item')}>Gi?? : </div>
                        <input
                            className={cx('input-item')}
                            type="number"
                            required
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>
                    <div className={cx('group-item')}>
                        <div className={cx('label-item')}>S??? l?????ng s???n ph???m : </div>
                        <input
                            className={cx('input-item')}
                            type="number"
                            required
                            value={total}
                            onChange={(e) => setTotal(e.target.value)}
                        />
                    </div>
                    <div className={cx('group-item')}>
                        <div className={cx('label-item')}>Th????ng hi???u : </div>
                        <div className={cx('input-item-select')}>
                            <Select
                                formatOptionLabel={(option) => `${option.value}`}
                                placeholder="Ch???n th????ng hi???u..."
                                onChange={handleChangeBrand}
                                options={optionsBrand}
                            />
                        </div>
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
                    <div className={cx('group-item')}>
                        <div className={cx('label-item')}>Danh m???c : </div>
                        <div className={cx('input-item-select')}>
                            <Select
                                formatOptionLabel={(option) => `${option.value}`}
                                isOptionDisabled={(option) => option.disabled}
                                isMulti
                                placeholder="Ch???n danh m???c..."
                                onChange={handleChangeVariations}
                                options={optionsVariation}
                            />
                        </div>
                    </div>
                    <div className={cx('group-item')}>
                        <div className={cx('label-item')}>Th??ng s??? k?? thu???t : </div>
                        <div className={cx('input-item-select')}>
                            <Select
                                formatOptionLabel={(option) => `${option.value}`}
                                isMulti
                                placeholder="Ch???n th??ng s??? k?? thu???t..."
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
            <ToastContainer />
        </div>
    );
}

export default ProductM;
