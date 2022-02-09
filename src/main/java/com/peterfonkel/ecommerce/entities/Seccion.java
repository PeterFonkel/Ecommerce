package com.peterfonkel.ecommerce.entities;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;


@Entity
@Table(name = "SECCIONES")
public class Seccion {
	
	@Id
	@GeneratedValue
	@Column(name = "PRODUCTO_ID")
	Long id;
	
	String nombre;
	
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "seccion")
	List<Producto> productos = new ArrayList<>();

	public Seccion() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Seccion(String nombre) {
		super();
		this.nombre = nombre;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public List<Producto> getProductos() {
		return productos;
	}

	public void setProductos(List<Producto> productos) {
		this.productos = productos;
	}
	
	
	
	

}
