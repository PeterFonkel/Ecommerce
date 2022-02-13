package com.peterfonkel.ecommerce.entities;

import java.time.Instant;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.peterfonkel.ecommerce.login.usuarios.entidades.Usuario;

@Entity
@Table(name = "PEDIDOS")
public class Pedido {

	@Id
	@GeneratedValue
	Long id;

	private Instant fechaPedido;
	private Instant fechaEntrega;
	private Instant fechaEnvio;
	

	@OneToMany(fetch = FetchType.LAZY)
	@JoinColumn(name = "pedido_id")
	private List<ProductoCarro> carro = new ArrayList<ProductoCarro>();

	@OneToOne(fetch = FetchType.EAGER, orphanRemoval = false)
	private Usuario usuario;
	
	@OneToOne(fetch = FetchType.EAGER, orphanRemoval = false)
	private Direccion direccionEntrega;

	public Pedido() {
		super();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Instant getFechaPedido() {
		return fechaPedido;
	}

	public void setFechaPedido(Instant fechaPedido) {
		this.fechaPedido = fechaPedido;
	}

	public Instant getFechaEntrega() {
		return fechaEntrega;
	}

	public void setFechaEntrega(Instant fechaEntrega) {
		this.fechaEntrega = fechaEntrega;
	}

	public Instant getFechaEnvio() {
		return fechaEnvio;
	}

	public void setFechaEnvio(Instant fechaEnvio) {
		this.fechaEnvio = fechaEnvio;
	}

	public List<ProductoCarro> getCarro() {
		return carro;
	}

	public void setCarro(List<ProductoCarro> carro) {
		this.carro = carro;
	}

	public void addProductoAPedido(ProductoCarro productoCarro) {
		this.carro.add(productoCarro);
	}

	public void eliminarProductosCarro() {
		this.carro = new ArrayList<ProductoCarro>();
	}

	public Usuario getUsuario() {
		return usuario;
	}

	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}

	public Direccion getDireccionEntrega() {
		return direccionEntrega;
	}

	public void setDireccionEntrega(Direccion direccionEntrega) {
		this.direccionEntrega = direccionEntrega;
	}

	@Override
	public String toString() {
		return "Pedido [id=" + id + ", fechaPedido=" + fechaPedido + ", fechaEntrega=" + fechaEntrega + ", fechaEnvio="
				+ fechaEnvio + ", carro=" + carro + ", usuario=" + usuario + "]";
	}

}
