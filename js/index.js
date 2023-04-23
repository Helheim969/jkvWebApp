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
        'Access-Control-Allow-Headers':'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
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
