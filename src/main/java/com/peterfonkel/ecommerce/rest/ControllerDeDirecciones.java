package com.peterfonkel.ecommerce.rest;

import java.time.Instant;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.PersistentEntityResource;
import org.springframework.data.rest.webmvc.PersistentEntityResourceAssembler;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.hateoas.CollectionModel;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.peterfonkel.ecommerce.entities.Direccion;
import com.peterfonkel.ecommerce.entities.Pedido;
import com.peterfonkel.ecommerce.entities.Producto;
import com.peterfonkel.ecommerce.entities.ProductoCarro;
import com.peterfonkel.ecommerce.login.usuarios.UsuarioDAO;
import com.peterfonkel.ecommerce.login.usuarios.entidades.Usuario;
import com.peterfonkel.ecommerce.repositories.DireccionDAO;
@PreAuthorize("authenticated")
@RepositoryRestController
@RequestMapping(path = "/direcciones/search")
@CrossOrigin
public class ControllerDeDirecciones {

	@Autowired
	DireccionDAO direccionDAO;
	
	@Autowired
	UsuarioDAO usuarioDAO;
	
	@Autowired
	public ControllerDeDirecciones(DireccionDAO direccionDAO, UsuarioDAO usuarioDAO) {
		this.direccionDAO = direccionDAO;
		this.usuarioDAO = usuarioDAO;

	}
	
	@PreAuthorize("hasRole('ROLE_ADMIN') OR hasRole('ROLE_USER')")
	@GetMapping(path = "direcciones/{id}")
	@ResponseBody
	public CollectionModel<PersistentEntityResource> getDirecciones(@PathVariable("id") Integer id,PersistentEntityResourceAssembler assembler) {
		Usuario usuario = usuarioDAO.findById(id).get();
		return assembler.toCollectionModel(usuario.getDirecciones());
	}
	
	@PreAuthorize("hasRole('ROLE_ADMIN') OR hasRole('ROLE_USER')")
	@PostMapping(path = "nuevadireccion/{id}")
	@ResponseBody
	public PersistentEntityResource postDireccion(@PathVariable("id") Integer id, @RequestBody Direccion direccion,
			PersistentEntityResourceAssembler assembler) {
		Usuario usuario =   usuarioDAO.findById(id).get();
		direccion.setUsuario(usuario);
		direccionDAO.save(direccion);
		return assembler.toModel(direccion);
	}
	
	
}
