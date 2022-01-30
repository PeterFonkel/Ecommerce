package com.peterfonkel.ecommerce.entities;

import javax.persistence.Column;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.peterfonkel.ecommerce.login.usuarios.entidades.Usuario;

@Entity
@Table(name = "PRODUCTOS_EN_CARRO")
public class ProductoCarro {

	@Id
	@GeneratedValue
	@Column(name = "PRODUCTO_CARRO_ID")
	Long id;

	@OneToOne(fetch = FetchType.EAGER)
	private Producto producto;

	@OneToOne(fetch = FetchType.EAGER, optional = true)
	private Pedido pedido;

	private int cantidad;

	public ProductoCarro() {
		super();

	}

	public ProductoCarro(Producto producto) {
		this();
		this.cantidad = 1;
		this.producto = producto;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public int getCantidad() {
		return cantidad;
	}

	public void setCantidad(int cantidad) {
		this.cantidad = cantidad;
	}

	public void agregarUnidad() {
		this.cantidad = this.cantidad++;
	}

	public void restarUnidad() {
		this.cantidad = this.cantidad--;
	}

	public Producto getProducto() {
		return producto;
	}

	public void setProducto(Producto producto) {
		this.producto = producto;
	}

	public Pedido getPedido() {
		return pedido;
	}

	public void setPedido(Pedido pedido) {
		this.pedido = pedido;
	}

	@Override
	public String toString() {
		return "ProductoSeleccionado [producto=" + producto + "]";
	}

}
