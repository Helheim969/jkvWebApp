let time = 250;
let context = 'adsl';
let imgSrc = '../ori/Linea';
let user_id='';
// $('#btn-show-modal').hide();
const orders = [];
$(document).ready(function () {
    $('#btn-show-modal').click();

    OneSignal.isPushNotificationsEnabled(function (isEnabled) {
        if (isEnabled) {
            // user has subscribed
            OneSignal.getUserId(function (userId) {
                // console.log('player_id of the subscribed user is : ' + userId);
                // Make a POST call to your server with the user ID        
                user_id=userId;
            });
        }
    });

});

async function getData() {
    let x = await fetch('https://jkvwebservice.onrender.com/api/getInfo?context=' + context);
    let result = await x.json();
    console.log(result);
    if (result.newOrder) {
        if (!(orders.find(order => order.orderNumber == result.orderNumber))) {
            orders.push(result);
            addAlert(result);
        }
    }


    function addAlert(result) {
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
        <p class="mb-0 text-center">${result.clientDepartment + ', ' + result.clientMunicipality + ', ' + result.clientDistrict + ', ' + result.clientAddress}</p>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" onclick='closeAlert(this)'></button>
    </div>
        `);
        $('#alert-no-order').toggleClass('d-none');
        let message="Nueva orden sin revisar\n"+result.orderNumber+"\n"+result.orderType+"\n"+result.clientDepartment + ', ' + result.clientMunicipality + ', ' + result.clientDistrict + ', ' + result.clientAddress;
        notifyMe(message);
        sendNotification(message);

    }
    console.log(orders);
}


function notifyMe(message) {

    let options={icon:"../ori/" + imgSrc+".png",body:message}
    if (!("Notification" in window)) {
        // Check if the browser supports notifications
        //alert("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
        // Check whether notification permissions have already been granted;
        // if so, create a notification
        new Notification("Nueva orden!",{icon:"../ori/" + imgSrc+".png"});
        // …
    } else if (Notification.permission !== "denied") {
        // We need to ask the user for permission
        Notification.requestPermission().then((permission) => {
            // If the user accepts, let's create a notification
            if (permission === "granted") {
                new Notification("Nueva orden!",options);
                // …
            }
        });
    }

    // At last, if the user has denied notifications, and you
    // want to be respectful there is no need to bother them anymore.
}

function closeAlert(e) {
    console.log($('.alert-pending-order').length)
    if ($('.alert-pending-order').length == 1) {
        $('#alert-no-order').toggleClass('d-none');
    }
}

$(document).on('click', '.context', (e) => {
    let valueButton = '';

    switch ($(e.target).attr('context')) {
        case 'adsl':
            valueButton = 'Linea';
            imgSrc = 'Linea';
            context='adsl';
            break;
        case 'hfc':
            valueButton = 'HFC';
            imgSrc = 'Hfc';
            context='hfc';
            break;
        case 'dth':
            valueButton = 'DTH';
            imgSrc = 'Dth';
            context='dth';
            break;
    }
    $('#btn-combobox').html(valueButton);

});

$('#btn-hide-modal').click((e) => {
    let headerText = ''
    switch (context) {
        case 'adsl':
            headerText = 'Linea';
            break;
        case 'hfc':
            headerText = 'HFC';
            break;
        case 'dth':
            headerText = 'DTH';
            break;
    }

    $('#header-context-text').html($('#header-context-text').html()+headerText);
    $('#header-context-image').attr('src','../ori/' + imgSrc+'.png');
    // notifyMe();
    sendNotification("Prueba de envio de mensaje a usuario individual");
    setInterval(() => getData(), 10000)
});

document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {

    } else {
        // notifyMe();
    }
  });

function sendNotification(message)
{
    const settings = {
        async: true,
        crossDomain: true,
        url: 'https://onesignal.com/api/v1/notifications',
        method: 'POST',
        headers: {
          accept: 'application/json',
          Authorization: 'Basic NTcyNTcxNGUtODgwNi00YmE1LTkwY2UtODMzNmE0ZjczYzRi',
          'content-type': 'application/json'
        },
        processData: false,
        data: `{"app_id":"4795363c-9db9-4805-b9f3-1b258285b5b8","include_player_ids":["${user_id}"],"name":"PRUEBA_DE_NOMBRE","contents":{"en":"English or Any Language Message","es":"${message}"}}`
      };
      console.log("REQUEST:");
      console.log(`{"app_id":"4795363c-9db9-4805-b9f3-1b258285b5b8","include_player_ids":["${user_id}"],"name":"PRUEBA_DE_NOMBRE","contents":{"en":"English or Any Language Message","es":"${message}"}}`);
      $.ajax(settings).done(function (response) {
        console.log(response);
      });
}