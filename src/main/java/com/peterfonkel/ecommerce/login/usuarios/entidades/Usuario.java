package com.peterfonkel.ecommerce.login.usuarios.entidades;

import com.peterfonkel.ecommerce.entities.Direccion;
import com.peterfonkel.ecommerce.entities.Pedido;

import com.peterfonkel.ecommerce.entities.ProductoCarro;
import com.peterfonkel.ecommerce.login.roles.Rol;
import com.sun.istack.NotNull;
import javax.persistence.*;

import org.hibernate.mapping.Array;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "USUARIOS")
public class Usuario {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;

	@NotNull
	@Column(unique = true)
	private String email;
	private String nombre;
	private String telefono;

	@NotNull
	private String password;

	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(joinColumns = @JoinColumn(name = "usuario_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "rol_id", referencedColumnName = "id"))
	private Set<Rol> roles = new HashSet<Rol>();

	@OneToMany(fetch = FetchType.LAZY)
	@JoinColumn(name = "usuario_id", nullable = true)
	private List<ProductoCarro> carro = new ArrayList<ProductoCarro>();

	@OneToMany(fetch = FetchType.LAZY)
	@JoinColumn(name = "usuario_id", nullable = true)
	private List<Pedido> pedidos = new ArrayList<Pedido>();
	
	@OneToMany(fetch = FetchType.LAZY)
	@JoinColumn(name = "usuario_id", nullable = true)
	private List<Direccion> direcciones = new ArrayList<Direccion>();

	public Usuario() {
	}

	public Usuario(String email, String password) {
		this();
		System.out.println("Email en const: " + email);
		System.out.println("Pass en const: " + password);
		this.email = email;
		this.password = password;
	}

	public Usuario(String email, String password, String nombre, String telefono) {
		this(email, password);
		this.nombre = nombre;
		this.telefono = telefono;
	}

	public Usuario(String email, Set<Rol> roles) {
		super();
		this.email = email;
		this.roles = roles;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Set<Rol> getRoles() {
		return roles;
	}

	public void setRoles(Rol[] roles) {
		this.roles = new HashSet<Rol>();
		for (Rol rol2 : roles) {
			this.roles.add(rol2);
		}
	}

	public void agregarRoles(Set<Rol> roles) {
		this.roles = roles;
	}

	public Rol getRol() {
		Rol rolUsuario = new Rol();
		for (Rol rol : roles) {
			rolUsuario = rol;
		}
		return rolUsuario;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getTelefono() {
		return telefono;
	}

	public void setTelefono(String telefono) {
		this.telefono = telefono;
	}

	public List<ProductoCarro> getCarro() {
		return carro;
	}

	public void setCarro(List<ProductoCarro> carro) {
		this.carro = carro;
	}

	public List<Pedido> getPedidos() {
		return pedidos;
	}

	public void setPedidos(List<Pedido> pedidos) {
		this.pedidos = pedidos;
	}

	public void addPedido(Pedido pedido) {
		this.pedidos.add(pedido);
	}

	public void eliminarPedido(Pedido pedido) {
		for (Pedido pedidoEnLista : pedidos) {
			if (pedidoEnLista.getId().equals(pedido.getId())) {
				pedidos.remove(pedidoEnLista);
			}
		}

	}

	public void addProductoCarro(ProductoCarro productoCarro) {
		this.carro.add(productoCarro);
	}

	public void vaciarCarro() {
		this.carro = new ArrayList<ProductoCarro>();
	}

	public void addDireccion(Direccion direccion) {
		this.direcciones.add(direccion);
	}
	
	public void borrarDireccion(Direccion direccionBorrar) {
		for (Direccion direccion : direcciones) {
			if(direccion.getCiudad().equals(direccionBorrar.getCiudad()) && 
				direccion.getCalle().equals(direccionBorrar.getCalle()) && 
				direccion.getNumero().equals(direccionBorrar.getNumero())){
				direcciones.remove(direccion);
				break;
			}
		}
	}
	

	

	public List<Direccion> getDirecciones() {
		return direcciones;
	}

	public void setDirecciones(List<Direccion> direcciones) {
		this.direcciones = direcciones;
	}

	@Override
	public String toString() {
		return "Usuario [id=" + id + ", email=" + email + ", nombre=" + nombre + ", telefono=" + telefono
				+ ", password=" + password + ", roles=" + roles + ", carro=" + carro + ", pedidos=" + pedidos + "]";
	}

}
