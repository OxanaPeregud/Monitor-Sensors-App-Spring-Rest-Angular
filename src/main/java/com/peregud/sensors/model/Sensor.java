package com.peregud.sensors.model;

import lombok.*;

import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Entity
@Table(name="sensor")
public class Sensor {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	@Column
	private String name;

	@Column
	private String model;

	@Column
	private String type;

	@Column(name = "range_from")
	private Integer rangeFrom;

	@Column(name = "range_to")
	private Integer rangeTo;

	@Column
	private String unit;

	@Column
	private String location;

	@Column
	private String description;
}