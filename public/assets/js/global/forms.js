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
        $.ajax({
            url: "http://159.89.202.21/remstud",
            type: "POST",
            data: {
                id: id
            },
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
        $.ajax({
            url: "http://159.89.202.21/remprod",
            type: "POST",
            data: {
                id: id
            },
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

    function addbal() {
        var uid = ""
        swal.fire({
            title: 'SCAN THE CARD',
            input: 'text',
            inputAttributes: {
                autocapitalize: 'off',
                maxlength: 8
            },
            showCancelButton: true,
            confirmButtonText: 'Confirm',
            showLoaderOnConfirm: true,
            preConfirm: (login) => {
                return fetch(`http://159.89.202.21/student/${login}`)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(response.statusText)
                        }
                        response = response.json()
                        if(response.error){
                            LoginError(result.message)
                        }else{
                            return response
                        }
                        
                    })
                    .catch(error => {
                        Swal.showValidationMessage(
                            `Request failed: ${error}`
                        )
                    })
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.value.error == false) {
                uid = result.value.uid
                swal.fire({
                    title: result.value.message[0].name,
                    text: `Balance: ` + result.value.message[0].balance,
                    input: 'number',
                    inputAttributes: {
                        autocapitalize: 'off',
                        placeholder: 'Amount'
                    },
                    showCancelButton: true,
                    confirmButtonText: 'Confirm',
                    showLoaderOnConfirm: true,
                    allowOutsideClick: () => !Swal.isLoading()
                }).then((data) => {
                    if (result.value.error == false) {
                        $.ajax({
                            url: "http://159.89.202.21/topup",
                            type: "POST",
                            data: {
                                uid: result.value.message[0].uid,
                                amount: data.value
                            },
                            dataType: "json",
                            success: function (result) {
                                console.log(result.message)
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
                })

            }
        })
    }

    function addcart(item) {

    }

    function removecart(item) {

    }
    //SWEETALERTS

    //ADD BALANCE