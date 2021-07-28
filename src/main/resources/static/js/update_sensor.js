$(document).ready(function () {
    $("#update_sensor_form").submit(function (evt) {
        evt.preventDefault();
        try {
            let sensorId = $("#sensor_id").val();

            let formData = {
                name: $("#sensor_name").val(),
                model: $("#sensor_model").val(),
                type: $("#sensor_type").val(),
                rangeFrom: $("#sensor_rangeFrom").val(),
                rangeTo: $("#sensor_rangeTo").val(),
                unit: $("#sensor_unit").val(),
                location: $("#sensor_location").val(),
                description: $("#sensor_description").val()
            }

            $.ajax({
                url: '/api/sensor/update/' + sensorId + "/",
                type: 'PUT',
                contentType: "application/json",
                data: JSON.stringify(formData),
                dataType: 'json',
                async: false,
                cache: false,
                success: function (response) {
                    let sensor = response.sensors[0];

                    let sensorString = "{ name: " + sensor.name + " " + sensor.model +
                        ", type: " + sensor.type + ", rangeFrom: " + sensor.rangeFrom +
                        ", rangeTo: " + sensor.rangeTo + ", unit: " + sensor.unit +
                        ", location: " + sensor.location + ", description: " + sensor.description + " }"

                    let successAlert = '<div class="alert alert-success alert-dismissible">' +
                        '<button type="button" class="close" data-dismiss="alert">&times;</button>' +
                        '<strong>' + response.message + '</strong> Sensor\'s Info = ' + sensorString;
                    '</div>'

                    $("#tr_" + sensorId + " td.td_name").text(sensor.name);
                    $("#tr_" + sensorId + " td.td_model").text(sensor.model);

                    $("#response").empty();
                    $("#response").append(successAlert);
                    $("#response").css({"display": "block"});
                },

                error: function (response) {
                    let errorAlert = '<div class="alert alert-danger alert-dismissible">' +
                        '<button type="button" class="close" data-dismiss="alert">&times;</button>' +
                        '<strong>' + response.message + '</strong>' + ' ,Error: ' + message.error +
                        '</div>';

                    $("#response").empty();
                    $("#response").append(errorAlert);
                    $("#response").css({"display": "block"});
                }
            });
        } catch (error) {
            console.log(error);
            alert(error);
        }
    });

    $(document).on("click", "table button.btn_id", function () {
        let id_of_button = (event.srcElement.id);
        let sensorId = id_of_button.split("_")[2];

        $.ajax({
            url: '/api/sensor/find-one/' + sensorId,
            type: 'GET',
            success: function (response) {
                let sensor = response.sensors[0];
                $("#sensor_id").val(sensor.id);
                $("#sensor_name").val(sensor.name);
                $("#sensor_model").val(sensor.model);
                $("#sensor_type").val(sensor.type);
                $("#sensor_rangeFrom").val(sensor.rangeFrom);
                $("#sensor_rangeTo").val(sensor.rangeTo);
                $("#sensor_unit").val(sensor.unit);
                $("#sensor_location").val(sensor.location);
                $("#sensor_description").val(sensor.description);
                $("#div_sensor_updating").css({"display": "block"});
            },
            error: function (error) {
                console.log(error);
                alert("Error -> " + error);
            }
        });
    });
});
