$("#addprod").submit(function (event) {
    $.ajax({
        url: "159.89.202.21/addprod",
        type: "POST",
        data: $("#addprod").serializeJSON(),
        dataType: "json",
        success: function (result) {
            if (result.error) {
                LoginError(result.message)
            } else {
                LoginSuccess(result.message)
            }
        }
    });
    event.preventDefault();
});
$("#addstud").submit(function (event) {
    $.ajax({
        url: "159.89.202.21/addstud",
        type: "POST",
        data: $("#addstud").serializeJSON(),
        dataType: "json",
        success: function (result) {
            if (result.error) {
                LoginError(result.message)
            } else {
                LoginSuccess(result.message)
            }
        }
    });
    event.preventDefault();
});