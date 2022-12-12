// import productServices from '~/services/productServices';

const data = async () => {
    fetch('https://tdshop.herokuapp.com/api/v1/product/get-all')
        .then((res) => res.json())
        .then((res) => {
            if (res) {
                console.log(res.data);
            } else {
                console.log('No data');
            }
        })
        .catch(() => {
            console.log('Error');
        });
};

function TestData() {
    data();

    return <div></div>;
}

export default TestData;
