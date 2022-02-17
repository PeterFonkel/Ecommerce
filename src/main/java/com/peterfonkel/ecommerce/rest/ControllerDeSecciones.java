package com.peterfonkel.ecommerce.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.PersistentEntityResource;
import org.springframework.data.rest.webmvc.PersistentEntityResourceAssembler;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.hateoas.CollectionModel;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.peterfonkel.ecommerce.entities.Seccion;
import com.peterfonkel.ecommerce.repositories.SeccionDAO;

@RepositoryRestController
@RequestMapping(path = "/secciones/search")
@CrossOrigin
public class ControllerDeSecciones {

	@Autowired
	SeccionDAO seccionDAO;
	
	@Autowired
	public ControllerDeSecciones(SeccionDAO seccionDAO) {
		this.seccionDAO = seccionDAO;
	}

	@GetMapping(path = "secciones")
	@ResponseBody
	public CollectionModel<PersistentEntityResource> getDirecciones(PersistentEntityResourceAssembler assembler) {
		List<Seccion> secciones = seccionDAO.findAll();
		return assembler.toCollectionModel(secciones);
	}
}
