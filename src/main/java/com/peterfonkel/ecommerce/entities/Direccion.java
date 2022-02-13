package com.peterfonkel.ecommerce.entities;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.peterfonkel.ecommerce.login.usuarios.entidades.Usuario;

@Entity
@Table(name = "DIRECCIONES")
public class Direccion {
	@Id
	@GeneratedValue
	Long id;
	
	private String ciudad;
	private String calle;
	private String numero;
	private String piso;
	private String puerta;
	private String codigoPostal;
	
	@OneToOne(fetch = FetchType.EAGER, orphanRemoval = false)
	private Usuario usuario;

	public Direccion() {
		super();
	}

	public Direccion(String ciudad, String calle, String numero, String piso, String puerta) {
		super();
		this.ciudad = ciudad;
		this.calle = calle;
		this.numero = numero;
		this.piso = piso;
		this.puerta = puerta;
	}
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getCalle() {
		return calle;
	}

	public void setCalle(String calle) {
		this.calle = calle;
	}

	public String getNumero() {
		return numero;
	}

	public void setNumero(String numero) {
		this.numero = numero;
	}

	public String getPiso() {
		return piso;
	}

	public void setPiso(String piso) {
		this.piso = piso;
	}

	public String getPuerta() {
		return puerta;
	}

	public void setPuerta(String puerta) {
		this.puerta = puerta;
	}

	public String getCiudad() {
		return ciudad;
	}

	public void setCiudad(String ciudad) {
		this.ciudad = ciudad;
	}

	public String getCodigoPostal() {
		return codigoPostal;
	}

	public void setCodigoPostal(String codigoPostal) {
		this.codigoPostal = codigoPostal;
	}

	public Usuario getUsuario() {
		return usuario;
	}

	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}

	
}
