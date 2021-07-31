$(document).ready(function () {
    $("#add_new_sensor").submit(function (evt) {
        evt.preventDefault();

        let formData = {
            name: $("#name").val(),
            model: $("#model").val(),
            type: $("#type").val(),
            rangeFrom: $("#rangeFrom").val(),
            rangeTo: $("#rangeTo").val(),
            unit: $("#unit").val(),
            location: $("#location").val(),
            description: $("#description").val(),
        }

        $.ajax({
            url: '/api/sensor/create',
            type: 'POST',
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
                $("#response").append(successAlert);
                $("#response").css({"display": "block"});

                resetUploadForm();
            },
            error: function (response) {
                let errorAlert = '<div class="alert alert-danger alert-dismissible">' +
                    '<button type="button" class="close" data-dismiss="alert">&times;</button>' +
                    '<strong>' + response.message + '</strong>' + ' ,Error: ' + message.error +
                    '</div>'
                $("#response").append(errorAlert);
                $("#response").css({"display": "block"});

                resetUploadForm();
            }
        });
    });

    function resetUploadForm() {
        $("#name").val("");
        $("#model").val("");
        $("#type").val("");
        $("#rangeFrom").val("");
        $("#rangeTo").val("");
        $("#unit").val("");
        $("#location").val("");
        $("#description").val("");
    }

    (function () {
        let pathname = window.location.pathname;
        if (pathname === "/") {
            $(".nav .nav-item a:first").addClass("active");
        } else if (pathname === "/sensors.html") {
            $(".nav .nav-item a:last").addClass("active");
        }
    })();
});
