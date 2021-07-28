package com.peregud.sensors.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Message {
	private String message = "";
	private List<Sensor> sensors = new ArrayList<>();
	private String error = "";
}
