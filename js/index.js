let time=250;
$( document ).ready(function() {

    // setInterval(()=>getData(),10000)
});

function getData()
{
//     fetch('https://jkvwebservice.onrender.com/api/getInfo')
//   .then(response => response.json())
//   .then(data => console.log(data));

  $.ajax({
    url: "https://jkvwebservice.onrender.com/api/getInfo",
    type: "GET",
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods":"GET,HEAD,OPTIONS,POST,PUT",
        'Access-Control-Allow-Credentials':'true',
        'Access-Control-Allow-Headers':'Origin, X-Api-Key, X-Requested-With, Content-Type, Accept, Authorization'
    },
    success: function (response) {
        var resp = JSON.parse(response)
        console.log(resp);
    },
    error: function (xhr, status) {
        console.log(xhr);
    }
});
}
