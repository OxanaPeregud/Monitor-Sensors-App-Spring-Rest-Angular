$(document).ready(function () {
    (function () {
        $.ajax({
            type: "GET",
            url: "/api/sensor/display-info",
            success: function (response) {
                $.each(response.sensors, (i, sensor) => {
                    let deleteButton = '<button ' +
                        'id=' +
                        '\"' + 'btn_delete_' + sensor.id + '\"' +
                        ' type="button" class="btn btn-danger btn_delete" data-toggle="modal" ' +
                        'data-target="#delete-modal"' +
                        '>&times</button>';

                    let get_More_Info_Btn = '<button' +
                        ' id=' + '\"' + 'btn_id_' + sensor.id + '\"' +
                        ' type="button" class="btn btn-info btn_id">' +
                        sensor.id +
                        '</button>';

                    let tr_id = 'tr_' + sensor.id;
                    let sensorRow = '<tr id=\"' + tr_id + "\"" + '>' +
                        '<td>' + get_More_Info_Btn + '</td>' +
                        '<td class=\"td_name\">' + sensor.name + '</td>' +
                        '<td class=\"td_model\">' + sensor.model + '</td>' +
                        '<td class=\"td_type\">' + sensor.type + '</td>' +
                        '<td class=\"td_rangeFrom\">' + sensor.rangeFrom + '</td>' +
                        '<td class=\"td_rangeTo\">' + sensor.rangeTo + '</td>' +
                        '<td class=\"td_unit\">' + sensor.unit + '</td>' +
                        '<td class=\"td_location\">' + sensor.location + '</td>' +
                        '<td class=\"td_description\">' + sensor.description + '</td>' +
                        '<td>' + deleteButton + '</td>' +
                        '</tr>';
                    $('#sensorTable tbody').append(sensorRow);
                });
            },
            error: function (e) {
                alert("ERROR: ", e);
                console.log("ERROR: ", e);
            }
        });
    })();

    (function () {
        let pathname = window.location.pathname;
        if (pathname === "/sensors.html") {
            $(".nav .nav-item a:last").addClass("active");
        }
    })();
});
