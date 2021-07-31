package com.peregud.sensors.service;

import com.peregud.sensors.model.Sensor;
import com.peregud.sensors.repository.SensorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SensorService {
	
	@Autowired
    private SensorRepository repository;
	
	public Sensor saveSensor(Sensor sensor) {
		return repository.save(sensor);
	}
	
	public List<Sensor> getSensorInfo(){
		return repository.findAll();
	}
	
	public Optional<Sensor> getSensorById(Long id) {
		return repository.findById(id);
	}
	
	public boolean checkExistedSensor(Long id) {
		return repository.existsById(id);
	}
	
	public Sensor updateSensor(Sensor sensor) {
		return repository.save(sensor);
	}
	
	public void deleteSensorById(Long id) {
		repository.deleteById(id);
	}
}
