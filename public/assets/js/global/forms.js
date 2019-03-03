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
function addstud(){
    console.log("test")
    $.ajax({
        url: "159.89.202.21:3000/addstud",
        type: "POST",
        data: $("#addstud").serializeJSON(),
        dataType: "json",
        success: function (result) {
            if (result.error) {
                console.log(result)
                LoginError(result.message)
            } else {
                LoginSuccess(result.message)
            }
        }
    });
}