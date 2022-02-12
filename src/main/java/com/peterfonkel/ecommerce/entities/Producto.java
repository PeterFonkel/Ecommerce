package com.peterfonkel.ecommerce.entities;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
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
	@Column(length = 2000)
	public String descripcionLarga;
	private float precio;

	@OneToOne(optional = true)
	private Seccion seccion;
	private Boolean publicado = true;

	@OneToMany
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

	public Seccion getSeccion() {
		return seccion;
	}

	public void setSeccion(Seccion seccion) {
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
	
	public Boolean getPublicado() {
		return publicado;
	}

	public void setPublicado(Boolean publicado) {
		this.publicado = publicado;
	}

	public String getDescripcionLarga() {
		return descripcionLarga;
	}

	public void setDescripcionLarga(String descripcionLarga) {
		this.descripcionLarga = descripcionLarga;
	}

	@Override
	public String toString() {
		return "Producto [id=" + id + ", nombre=" + nombre + "]";
	}

}
