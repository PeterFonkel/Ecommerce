package com.peterfonkel.ecommerce.login.roles;

import com.peterfonkel.ecommerce.login.roles.enums.RolNombre;
import com.sun.istack.NotNull;

import javax.persistence.*;

@Entity
public class Rol {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;

	@Enumerated(EnumType.STRING)
	@NotNull
	@Column(unique = true, name = "ROL_NOMBRE")
	private RolNombre rolNombre;

	public Rol() {
	}

	public Rol(RolNombre rolNombre) {
		this.rolNombre = rolNombre;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public RolNombre getRolNombre() {
		return rolNombre;
	}

	public void setRolNombre(RolNombre rolNombre) {
		this.rolNombre = rolNombre;
	}

	@Override
	public String toString() {
		return "Rol [id=" + id + ", rolNombre=" + rolNombre + "]";
	}

}
