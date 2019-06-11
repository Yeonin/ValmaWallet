function addstud() {
    $.ajax({
        url: "http://128.199.164.186/addstud",
        type: "POST",
        data: $("#addstud").serializeJSON(),
        dataType: "json",
        success: function (result) {
            if (result.error) {
                LoginError(result.message)
            } else {
                LoginSuccess(result.message)
                setTimeout(function () {
                    location.reload();
                }, 500);
            }
        }
    });
}

function addprod() {
    $.ajax({
        url: "http://128.199.164.186/addprod",
        type: "POST",
        data: $("#addprod").serializeJSON(),
        dataType: "json",
        success: function (result) {
            if (result.error) {
                LoginError(result.message)
            } else {
                LoginSuccess(result.message)
                setTimeout(function () {
                    location.reload();
                }, 500);
            }
        }
    });
}

function remstud(id) {
    $.ajax({
        url: "http://128.199.164.186/remstud",
        type: "POST",
        data: {
            id: id
        },
        dataType: "json",
        success: function (result) {
            if (result.error) {
                LoginError(result.message)
            } else {
                LoginSuccess(result.message)
                setTimeout(function () {
                    location.reload();
                }, 500);
            }
        }
    });
}

function remprod(id) {
    $.ajax({
        url: "http://128.199.164.186/remprod",
        type: "POST",
        data: {
            id: id
        },
        dataType: "json",
        success: function (result) {
            if (result.error) {
                LoginError(result.message)
            } else {
                LoginSuccess(result.message)
                setTimeout(function () {
                    location.reload();
                }, 500);
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
            return fetch(`http://128.199.164.186/student/${login}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(response.statusText)
                    }
                    response = response.json()
                    if (response.error) {
                        LoginError(result.message)
                    } else {
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
                    placeholder: 'Amount',
                    id: 'amount',
                    class: 'keyboard'
                },
                showCancelButton: true,
                confirmButtonText: 'Confirm',
                showLoaderOnConfirm: true,
                onBeforeOpen: () => {
                    $('#amount').keyboard({type:'numpad'});
                },
                allowOutsideClick: false
            }).then((data) => {
                if (result.value.error == false) {
                    $.ajax({
                        url: "http://128.199.164.186/topup",
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
                            } else {
                                LoginSuccess(result.message)
                                setTimeout(function () {
                                    location.reload();
                                }, 500);
                            }
                        }
                    });
                }
            })

        }
    })
}

//STATS

function daily(){
    $.ajax({
        url: "http://128.199.164.186/stats/daily",
        type: "GET",
        dataType: "json",
        success: function (result) {
            if (result.error) {
                LoginError(result.message)
            } else {
                var totalincome = 0
                var totaltopups = 0
                var topupcount = 0
                var transactions = 0
                result.topup.forEach(function(topup){
                    topupcount += 1
                    totaltopups += topup.amount
                })
                result.sell.forEach(function(sell){
                    transactions += 1
                    totalincome += sell.total
                })
                swal({
                    title: 'DAILY STATISTICS',
                    html: '<table class="table table-striped"><tbody><tr><td class="align-middle text-center">TOTAL INCOME:</td><td class="align-middle text-center">' + totalincome +' PHP</td></tr><tr><td class="align-middle text-center">TOTAL TOP UPS:</td><td class="align-middle text-center">' + totaltopups +' PHP</td></tr><tr><td class="align-middle text-center">TRANSACTION COUNT:</td><td class="align-middle text-center">' + transactions +' TRANSACTIONS</td></tr><tr><td class="align-middle text-center">TOP UP COUNT:</td><td class="align-middle text-center">' + topupcount +' TOP UPS</td></tr></tbody></table>'
                })
            }
        }
    });
}
function weekly(){
    $.ajax({
        url: "http://128.199.164.186/stats/weekly",
        type: "GET",
        dataType: "json",
        success: function (result) {
            if (result.error) {
                LoginError(result.message)
            } else {
                var totalincome = 0
                var totaltopups = 0
                var topupcount = 0
                var transactions = 0
                result.topup.forEach(function(topup){
                    topupcount += 1
                    totaltopups += topup.amount
                })
                result.sell.forEach(function(sell){
                    transactions += 1
                    totalincome += sell.total
                })
                swal({
                    title: 'WEEKLY STATISTICS',
                    html: '<table class="table table-striped"><tbody><tr><td class="align-middle text-center">TOTAL INCOME:</td><td class="align-middle text-center">' + totalincome +' PHP</td></tr><tr><td class="align-middle text-center">TOTAL TOP UPS:</td><td class="align-middle text-center">' + totaltopups +' PHP</td></tr><tr><td class="align-middle text-center">TRANSACTION COUNT:</td><td class="align-middle text-center">' + transactions +' TRANSACTIONS</td></tr><tr><td class="align-middle text-center">TOP UP COUNT:</td><td class="align-middle text-center">' + topupcount +' TOP UPS</td></tr></tbody></table>'
                })
            }
        }
    });
}
function monthly(){
    $.ajax({
        url: "http://128.199.164.186/stats/monthly",
        type: "GET",
        dataType: "json",
        success: function (result) {
            if (result.error) {
                LoginError(result.message)
            } else {
                var totalincome = 0
                var totaltopups = 0
                var topupcount = 0
                var transactions = 0
                result.topup.forEach(function(topup){
                    topupcount += 1
                    totaltopups += topup.amount
                })
                result.sell.forEach(function(sell){
                    transactions += 1
                    totalincome += sell.total
                })
                swal({
                    title: 'MONTHLY STATISTICS',
                    html: '<table class="table table-striped"><tbody><tr><td class="align-middle text-center">TOTAL INCOME:</td><td class="align-middle text-center">' + totalincome +' PHP</td></tr><tr><td class="align-middle text-center">TOTAL TOP UPS:</td><td class="align-middle text-center">' + totaltopups +' PHP</td></tr><tr><td class="align-middle text-center">TRANSACTION COUNT:</td><td class="align-middle text-center">' + transactions +' TRANSACTIONS</td></tr><tr><td class="align-middle text-center">TOP UP COUNT:</td><td class="align-middle text-center">' + topupcount +' TOP UPS</td></tr></tbody></table>'
                })
            }
        }
    });
}