import axios from 'axios';


export const moveRight = (e) => {
    const productContainers = [...document.querySelectorAll('.product-container')];
    productContainers.forEach((item, i) => {
        let containerDimenstions = item.getBoundingClientRect();
        let containerWidth = containerDimenstions.width;
        productContainers.forEach((item, i) => {
            item.scrollLeft += containerWidth;
        })
    })
};

export const moveLeft = (e) => {
    const productContainers = [...document.querySelectorAll('.product-container')];
    productContainers.forEach((item, i) => {
        let containerDimenstions = item.getBoundingClientRect();
        let containerWidth = containerDimenstions.width;
        productContainers.forEach((item, i) => {
            item.scrollLeft -= containerWidth;
        })
    })
};

const ff = ()=>{
    console.log("hi i am amul !"); 
}

export const getData = async () => {
    try {
        const arr = await axios.get("http://localhost:8000/getdata");

        console.log(arr);
        const list = document.querySelector('#list');
        let temp;
        const arry = arr['data'];
        arry.forEach((data) => {
            temp = document.createElement('div');

            let a = parseFloat(data.actualPrice);
            let b = parseFloat(data.price);
            let discount = (((a - b) / a) * 100);
            let roundedDiscount = discount.toFixed(2);

            temp.innerHTML = `
                <div class="product-card my-5">
                    <div class="product-image">
                        <span class="discount-tag">${roundedDiscount}% AMUL off</span>
                        <img src="img/card1.png" class="product-thumb" alt=""/>
                            <button class="card-btn">add to whislist</button>
                    </div>
                    <Link to = {{pathname : "/Detail" , state : {${data}}}}>
                        <div class="product-info">
                            <h2 class="product-brand">${data.topic}</h2>
                            <p class="product-short-des">${data.overview}</p>
                            <span class="price">rs ${data.price}</span><span class="actual-price">rs ${data.actualPrice}</span>
                        </div>
                    </Link>
                </div>
            `
            list.appendChild(temp);
        });
    }
    catch (err) {
        console.log("some error : ", err.message);
    }
}