package com.peterfonkel.ecommerce.rest;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.PersistentEntityResource;
import org.springframework.data.rest.webmvc.PersistentEntityResourceAssembler;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.hateoas.CollectionModel;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.peterfonkel.ecommerce.entities.Producto;
import com.peterfonkel.ecommerce.entities.ProductoCarro;
import com.peterfonkel.ecommerce.login.usuarios.UsuarioDAO;
import com.peterfonkel.ecommerce.login.usuarios.entidades.Usuario;
import com.peterfonkel.ecommerce.repositories.ProductoCarroDAO;
import com.peterfonkel.ecommerce.repositories.ProductoDAO;
import com.peterfonkel.ecommerce.repositories.SeccionDAO;

@PreAuthorize("authenticated")
@RepositoryRestController
@RequestMapping(path = "/productos/search")
@CrossOrigin
public class ControllerDeProductos {

	@Autowired
	ProductoDAO productoDAO;

	@Autowired
	ProductoCarroDAO productoCarroDAO;

	@Autowired
	UsuarioDAO usuarioDAO;

	@Autowired
	SeccionDAO seccionDAO;

	@Autowired
	public ControllerDeProductos(ProductoDAO productoDAO, UsuarioDAO usuarioDAO, ProductoCarroDAO productoCarroDAO,
			SeccionDAO seccionDAO) {
		this.productoDAO = productoDAO;
		this.usuarioDAO = usuarioDAO;
		this.productoCarroDAO = productoCarroDAO;
		this.seccionDAO = seccionDAO;

	}

	@PreAuthorize("hasRole('ROLE_ADMIN') OR hasRole('ROLE_USER')")
	@GetMapping(path = "productos")
	@ResponseBody
	public CollectionModel<PersistentEntityResource> getProductos(PersistentEntityResourceAssembler assembler) {
		List<?> listadoProductos = productoDAO.findAll();
		return assembler.toCollectionModel(listadoProductos);
	}

	@PreAuthorize("hasRole('ROLE_ADMIN') OR hasRole('ROLE_USER')")
	@PostMapping(path = "getProductosPublicadosFiltrados/{idSeccion}")
	@ResponseBody
	public CollectionModel<PersistentEntityResource> getProductosPublicadosFiltrados(
			@PathVariable("idSeccion") Long idSeccion, @RequestBody String[] keywords,
			PersistentEntityResourceAssembler assembler) {

		List<Producto> listadoProductos = productoDAO.findAll();
		List<Producto> listadoProductosPorSeccion = new ArrayList<Producto>();

		if (idSeccion != 0) {
			for (Producto producto : listadoProductos) {
				if (producto.getSeccion().getId().equals(idSeccion)) {
					listadoProductosPorSeccion.add(producto);
				}
			}
		} else {
			System.out.println("EN ELSE");
			listadoProductosPorSeccion = listadoProductos;
		}

		List<Producto> productosFiltrados = new ArrayList<Producto>();
		if (keywords.length > 0) {
			for (Producto producto : listadoProductosPorSeccion) {
				for (String keyword : keywords) {
					if ((producto.getDescripcion().toLowerCase().contains(keyword.toLowerCase())
							&& producto.getPublicado())
							|| producto.getNombre().toUpperCase().contains(keyword.toUpperCase())) {
						productosFiltrados.add(producto);
						System.out.println(producto);
						break;
					}
				}
			}
		} else {
			for (Producto producto : listadoProductosPorSeccion) {
				if (producto.getPublicado()) {
					productosFiltrados.add(producto);
				}
			}
		}
		return assembler.toCollectionModel(productosFiltrados);
	}

	@PreAuthorize("hasRole('ROLE_ADMIN') OR hasRole('ROLE_USER')")
	@PostMapping(path = "getProductosFiltrados/{idSeccion}")
	@ResponseBody
	public CollectionModel<PersistentEntityResource> getProductosFiltrados(@PathVariable("idSeccion") Long idSeccion,@RequestBody String[] keywords,
			PersistentEntityResourceAssembler assembler) {
		List<Producto> listadoProductos = productoDAO.findAll();

		List<Producto> listadoProductosPorSeccion = new ArrayList<Producto>();

		if (idSeccion != 0) {
			for (Producto producto : listadoProductos) {
				if (producto.getSeccion().getId().equals(idSeccion)) {
					listadoProductosPorSeccion.add(producto);
				}
			}
		} else {
			System.out.println("EN ELSE");
			listadoProductosPorSeccion = listadoProductos;
		}

		List<Producto> productosFiltrados = new ArrayList<Producto>();
		if (keywords.length > 0) {
			for (Producto producto : listadoProductosPorSeccion) {
				for (String keyword : keywords) {
					if (producto.getDescripcion().toUpperCase().contains(keyword.toUpperCase())
							|| producto.getNombre().toUpperCase().contains(keyword.toUpperCase())) {
						productosFiltrados.add(producto);
						System.out.println(producto);
						break;
					}
				}
			}
		} else {
			productosFiltrados = listadoProductosPorSeccion;
		}
		return assembler.toCollectionModel(productosFiltrados);
	}

	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@PostMapping(path = "productos")
	@ResponseBody
	public PersistentEntityResource postProducto(@RequestBody Producto producto,
			PersistentEntityResourceAssembler assembler) {
		producto.setSeccion(seccionDAO.findById(producto.getSeccion().getId()).get());
		Producto productoGuardado = productoDAO.save(producto);
		return assembler.toModel(productoGuardado);
	}

	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@DeleteMapping(path = "productos/{id}")
	@ResponseBody
	public void deleteProducto(@PathVariable("id") Long id) {
		productoDAO.deleteById(id);
	}

	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@PatchMapping(path = "productos/{id}")
	@ResponseBody
	public PersistentEntityResource patchProducto(@RequestBody Producto producto, @PathVariable("id") Long id,
			PersistentEntityResourceAssembler assembler) {
		producto.setSeccion(seccionDAO.findById(producto.getSeccion().getId()).get());

		Producto productoModificado = productoDAO.save(producto);
		return assembler.toModel(productoModificado);
	}

	@PreAuthorize("hasRole('ROLE_ADMIN') OR hasRole('ROLE_USER')")
	@PostMapping("/addproducto/{id}")
	@ResponseBody
	public CollectionModel<PersistentEntityResource> addProducto(@RequestBody Producto producto,
			@PathVariable("id") Integer id, PersistentEntityResourceAssembler assembler) {
		Optional<Usuario> usuario = usuarioDAO.findById(id);
		boolean existe = false; // variable que indica si ya habia al menos una unidad de ese producto al carro
		// Recorrer la lista de ProductoSeleccionados para comprobar si ya habia al
		// menos una unidad agragada.
		// En ese caso incrementa la cantidad, sino crea un nuevo ProductoSeleccionado
		for (ProductoCarro productoSeleccionado : usuario.orElseThrow().getCarro()) {

			if (productoSeleccionado.getProducto().getId().equals(producto.getId())) {
				productoSeleccionado.setCantidad(productoSeleccionado.getCantidad() + 1);
				productoCarroDAO.save(productoSeleccionado);
				existe = true;
			}
		}
		if (!existe) {
			ProductoCarro productoSeleccionadoNuevo = new ProductoCarro();
			productoSeleccionadoNuevo.setCantidad(1);
			productoSeleccionadoNuevo.setProducto(producto);
			productoCarroDAO.save(productoSeleccionadoNuevo);
			usuario.orElseThrow().addProductoCarro(productoSeleccionadoNuevo);
			usuarioDAO.save(usuario.get());
		}
		return assembler.toCollectionModel(usuario.orElseThrow().getCarro());
	}

	@PreAuthorize("hasRole('ROLE_ADMIN') OR hasRole('ROLE_USER')")
	@GetMapping("/getcarro/{id}")
	@ResponseBody
	public CollectionModel<PersistentEntityResource> getCarro(@PathVariable("id") Integer id,
			PersistentEntityResourceAssembler assembler) {
		Optional<Usuario> usuario = usuarioDAO.findById(id);
		return assembler.toCollectionModel(usuario.orElseThrow().getCarro());
	}

	@PreAuthorize("hasRole('ROLE_ADMIN') OR hasRole('ROLE_USER')")
	@PostMapping("/borrardecarro/{id}")
	@ResponseBody
	public CollectionModel<PersistentEntityResource> deleteProducto(@RequestBody Producto producto,
			@PathVariable("id") Integer id, PersistentEntityResourceAssembler assembler) {
		Optional<Usuario> usuario = usuarioDAO.findById(id);
		List<ProductoCarro> productosCarro = usuario.orElseThrow().getCarro();
		for (ProductoCarro productoSeleccionado : productosCarro) {
			if (productoSeleccionado.getProducto().getId().equals(producto.getId())) {
				if (productoSeleccionado.getCantidad() > 1) {
					productoSeleccionado.setCantidad(productoSeleccionado.getCantidad() - 1);
					productoCarroDAO.save(productoSeleccionado);
				} else {
					productosCarro.remove(productoSeleccionado);
					productoCarroDAO.delete(productoSeleccionado);
					break;
				}
			}
		}
		return assembler.toCollectionModel(productosCarro);
	}

	@PreAuthorize("hasRole('ROLE_ADMIN') OR hasRole('ROLE_USER')")
	@GetMapping("/vaciarcarro/{id}")
	@ResponseBody
	public void clearCarro(@PathVariable("id") Integer id) {
		System.out.println("En metodo");
		Optional<Usuario> usuario = usuarioDAO.findById(id);
		usuario.orElseThrow().vaciarCarro();
		usuarioDAO.save(usuario.get());
	}

	@PreAuthorize("hasRole('ROLE_ADMIN') OR hasRole('ROLE_USER')")
	@GetMapping("/getProductosPublicados")
	@ResponseBody
	public CollectionModel<PersistentEntityResource> getProductosPublicados(
			PersistentEntityResourceAssembler assembler) {
		return assembler.toCollectionModel(productoDAO.findByPublicado(true));
	}
}
