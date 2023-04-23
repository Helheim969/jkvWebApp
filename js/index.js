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
                addAlert(result);
                console.log("Nueva orden");
                return;
            }
        });
    }
    else
    {
        addAlert(result);
        orders.push(result);
        console.log("Nueva orden")
    }
    }


    function addAlert(result)
    {
        $('.container').append(`
        <div class="alert alert-warning alert-dismissible fade show alert-pending-order" role="alert">
        <h4 class="alert-heading text-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img"
                aria-label="Warning:">
                <path
                    d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
            </svg>
            Nueva orden
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img"
                aria-label="Warning:">
                <path
                    d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
            </svg>
        </h4>
        <p class="text-center">${result.orderNumber}</p>
        <hr>
        <p class="mb-0 text-center">${result.orderStage}</p>
        <hr>
        <p class="text-center">${result.orderType}</p>
        <hr>
        <p class="mb-0 text-center">${result.clientDepartment+', '+result.clientMunicipality+', '+result.clientDistrict+', '+result.clientAddress}</p>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" onclick='closeAlert(this)'></button>
    </div>
        `);
        $('#alert-no-order').toggleClass('d-none');
        notifyMe();
    }
console.log(orders);
}


function notifyMe() {
    if (!("Notification" in window)) {
      // Check if the browser supports notifications
      alert("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
      // Check whether notification permissions have already been granted;
      // if so, create a notification
      const notification = new Notification("Hi there!");
      // …
    } else if (Notification.permission !== "denied") {
      // We need to ask the user for permission
      Notification.requestPermission().then((permission) => {
        // If the user accepts, let's create a notification
        if (permission === "granted") {
          const notification = new Notification("Hi there!");
          // …
        }
      });
    }
  
    // At last, if the user has denied notifications, and you
    // want to be respectful there is no need to bother them anymore.
  }

  function closeAlert(e)
  {
   if(!$('.alert-pending-order').length){
    $('#alert-no-order').toggleClass('d-none');
   }
  }
  
