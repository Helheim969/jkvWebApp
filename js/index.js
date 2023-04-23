let time = 250;
const orders = [];
$(document).ready(function () {

    setInterval(()=>getData(),10000)
});

async function getData() {
    let x = await fetch('https://jkvwebservice.onrender.com/api/getInfo');
    let result = await x.json();
    console.log(result);
    if(result.newOrder)
    {
    if (orders.length) {
        orders.forEach(element => {
            if (element.orderNumber!=result.orderNumber) {
                orders.push(result);
                console.log("Nueva orden")
                return;
            }
        });
    }
    else
    {
        orders.push(result);
        console.log("Nueva orden")
    }
    }

console.log(orders);
}

