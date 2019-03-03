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
                return fetch(`https://api.github.com/users/${login}`)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(response.statusText)
                        }
                        return response.json()
                    })
                    .catch(error => {
                        Swal.showValidationMessage(
                            `Request failed: ${error}`
                        )
                    })
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            console.log(result)
            if (result.value) {
                Swal.fire({
                    title: ``,
                    imageUrl: result.value.avatar_url
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