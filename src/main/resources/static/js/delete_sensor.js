$(document).ready(function () {
    let sensorId = 0;

    $(document).on("click", "#div_sensor_table table button.btn_delete", function () {
        let btn_id = (event.srcElement.id);
        sensorId = btn_id.split("_")[2];

        $("div.modal-body")
            .text("Do you want delete a Sensor with id = " + sensorId + " ?");
        $("#model-delete-btn").css({"display": "inline"});
    });

    $(document).on("click", "#model-delete-btn", function () {
        $.ajax({
            url: '/api/sensor/delete/' + sensorId,
            type: 'DELETE',
            success: function (response) {
                $("div.modal-body")
                    .text("Delete successfully a Sensor with id = " + sensorId + "!");

                $("#model-delete-btn").css({"display": "none"});
                $("button.btn.btn-secondary").text("Close");

                let row_id = "tr_" + sensorId;
                $("#" + row_id).remove();
                $("#div_sensor_updating").css({"display": "none"});
            },
            error: function (error) {
                console.log(error);
                $("#div_sensor_updating").css({"display": "none"});
                alert("Error -> " + error);
            }
        });
    });
});
