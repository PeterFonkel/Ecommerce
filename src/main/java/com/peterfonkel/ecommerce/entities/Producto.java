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

import lombok.experimental.PackagePrivate;

@Entity
@Table(name = "PRODUCTOS")
public class Producto {

	@Id
	@GeneratedValue
	@Column(name = "PRODUCTO_ID")
	Long id;
	private String nombre;
	private String descripcion;
	private float precio;
	private String seccion;

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "producto")
	private List<ProductoCarro> productoCarro = new ArrayList<ProductoCarro>();

	public Producto() {
		super();
	}

	public Producto(String nombre, String descripcion, float precio) {
		super();
		this.nombre = nombre;
		this.descripcion = descripcion;
		this.precio = precio;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	public float getPrecio() {
		return precio;
	}

	public void setPrecio(float precio) {
		this.precio = precio;
	}

	public String getSeccion() {
		return seccion;
	}

	public void setSeccion(String seccion) {
		this.seccion = seccion;
	}

	public List<ProductoCarro> getProductoCarro() {
		return productoCarro;
	}

	public void setProductoCarro(List<ProductoCarro> productoCarro) {
		this.productoCarro = productoCarro;
	}

	public void addProductoCarro(ProductoCarro productoCarro) {
		this.productoCarro.add(productoCarro);
	}

	@Override
	public String toString() {
		return "Producto [id=" + id + ", nombre=" + nombre + "]";
	}

}
