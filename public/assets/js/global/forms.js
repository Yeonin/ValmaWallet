function addstud() {
    $.ajax({
        url: "http://159.89.202.21/addstud",
        type: "POST",
        data: $("#addstud").serializeJSON(),
        dataType: "json",
        success: function (result) {
            if (result.error) {
                LoginError(result.message)
                setTimeout(function () {
                    location.reload();
                }, 500);
            } else {
                LoginSuccess(result.message)
            }
        }
    });
}

function addprod() {
    $.ajax({
        url: "http://159.89.202.21/addprod",
        type: "POST",
        data: $("#addprod").serializeJSON(),
        dataType: "json",
        success: function (result) {
            if (result.error) {
                LoginError(result.message)
                setTimeout(function () {
                    location.reload();
                }, 500);
            } else {
                LoginSuccess(result.message)
            }
        }
    });
}
function remstud(id) {
    alert("Remove student")
    $.ajax({
        url: "http://159.89.202.21/remstud",
        type: "POST",
        data: {id: id},
        dataType: "json",
        success: function (result) {
            if (result.error) {
                LoginError(result.message)
                setTimeout(function () {
                    location.reload();
                }, 500);
            } else {
                LoginSuccess(result.message)
            }
        }
    });
}
function remprod(id) {
    alert("Remove product")
    $.ajax({
        url: "http://159.89.202.21/remprod",
        type: "POST",
        data: {id: id},
        dataType: "json",
        success: function (result) {
            if (result.error) {
                LoginError(result.message)
                setTimeout(function () {
                    location.reload();
                }, 500);
            } else {
                LoginSuccess(result.message)
            }
        }
    });
}


function loadproducts(){

}