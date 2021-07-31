package com.peregud.sensors.controller;

import com.peregud.sensors.model.Message;
import com.peregud.sensors.model.Sensor;
import com.peregud.sensors.service.SensorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/sensor")
public class RestAPIController {

    @Autowired
    private SensorService sensorService;

    @PostMapping("/create")
    public ResponseEntity<Message> addNewSensor(@RequestBody Sensor sensor) {
        try {
            Sensor returnedSensor = sensorService.saveSensor(sensor);
            return new ResponseEntity<>(new Message("Upload Successfully!",
                    Collections.singletonList(returnedSensor), ""), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new Message("Fail to post a new Sensor!",
                    null, e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/display-info")
    public ResponseEntity<Message> displaySensorInfo() {
        try {
            List<Sensor> sensorInfos = sensorService.getSensorInfo();
            return new ResponseEntity<>(new Message("Get Sensors' Infos!",
                    sensorInfos, ""), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new Message("Fail!",
                    null, e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/find-one/{id}")
    public ResponseEntity<Message> getSensorById(@PathVariable Long id) {
        try {
            Optional<Sensor> sensor = sensorService.getSensorById(id);
            return sensor.map(value -> new ResponseEntity<>(
                    new Message("Successfully! Retrieve a Sensor by id = " + id,
                            Collections.singletonList(value), ""), HttpStatus.OK)).orElseGet(() ->
                    new ResponseEntity<>(new Message("Failure -> NOT Found a Sensor by id = " + id,
                            null, ""), HttpStatus.NOT_FOUND));
        } catch (Exception e) {
            return new ResponseEntity<>(new Message("Failure",
                    null, e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Message> updateSensorById(@RequestBody Sensor sensor,
                                                    @PathVariable Long id) {
        try {
            if (sensorService.checkExistedSensor(id)) {
                Sensor sensorUpdated = sensorService.getSensorById(id).get();
                sensorUpdated.setName(sensor.getName());
                sensorUpdated.setModel(sensor.getModel());
                sensorUpdated.setType(sensor.getType());
                sensorUpdated.setRangeFrom(sensor.getRangeFrom());
                sensorUpdated.setRangeTo(sensor.getRangeTo());
                sensorUpdated.setUnit(sensor.getUnit());
                sensorUpdated.setLocation(sensor.getLocation());
                sensorUpdated.setDescription(sensor.getDescription());
                sensorService.updateSensor(sensor);
                return new ResponseEntity<>(new Message("Successfully! Updated a Sensor "
                        + "with id = " + id,
                        Collections.singletonList(sensor), ""), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(new Message("Failure! Can NOT Found a Sensor "
                        + "with id = " + id,
                        null, ""), HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(new Message("Failure",
                    null, e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Message> deleteSensor(@PathVariable Long id) {
        try {
            if (sensorService.checkExistedSensor(id)) {
                sensorService.deleteSensorById(id);
                return new ResponseEntity<>(new Message("Successfully! Delete a Sensor with id = " + id,
                        null, ""), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(new Message("Failure! Can NOT Found a Sensor "
                        + "with id = " + id, null, ""), HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(new Message("Failure",
                    null, e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
