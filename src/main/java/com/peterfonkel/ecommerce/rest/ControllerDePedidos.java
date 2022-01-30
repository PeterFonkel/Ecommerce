package com.peterfonkel.ecommerce.rest;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
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

import com.peterfonkel.ecommerce.entities.Pedido;
import com.peterfonkel.ecommerce.entities.Producto;
import com.peterfonkel.ecommerce.entities.ProductoCarro;
import com.peterfonkel.ecommerce.login.usuarios.UsuarioDAO;
import com.peterfonkel.ecommerce.login.usuarios.entidades.Usuario;
import com.peterfonkel.ecommerce.repositories.PedidoDAO;
import com.peterfonkel.ecommerce.repositories.ProductoCarroDAO;
import com.peterfonkel.ecommerce.repositories.ProductoDAO;

@PreAuthorize("authenticated")
@RepositoryRestController
@RequestMapping(path = "/pedidos/search")
@CrossOrigin
public class ControllerDePedidos {

	@Autowired
	ProductoDAO productoDAO;

	@Autowired
	PedidoDAO pedidoDAO;

	@Autowired
	ProductoCarroDAO productoCarroDAO;

	@Autowired
	UsuarioDAO usuarioDAO;

	@Autowired
	public ControllerDePedidos(ProductoDAO productoDAO, PedidoDAO pedidoDAO, UsuarioDAO usuarioDAO,
			ProductoCarroDAO productoCarroDAO) {
		this.pedidoDAO = pedidoDAO;
		this.usuarioDAO = usuarioDAO;
		this.productoCarroDAO = productoCarroDAO;
		this.productoCarroDAO = productoCarroDAO;

	}

	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@GetMapping(path = "pedidos")
	@ResponseBody
	public CollectionModel<PersistentEntityResource> getPedidos(PersistentEntityResourceAssembler assembler) {
		List<?> listadoPedidos = pedidoDAO.findAll();
		return assembler.toCollectionModel(listadoPedidos);
	}

	@PreAuthorize("hasRole('ROLE_ADMIN') OR hasRole('ROLE_USER')")
	@GetMapping(path = "pedidos/{id}")
	@ResponseBody
	public CollectionModel<PersistentEntityResource> getPedidosDeUsuario(@PathVariable("id") Integer id,
			PersistentEntityResourceAssembler assembler) {
		Usuario usuario = usuarioDAO.findById(id).get();
		return assembler.toCollectionModel(usuario.getPedidos());
	}

	@PreAuthorize("hasRole('ROLE_ADMIN') OR hasRole('ROLE_USER')")
	@PostMapping(path = "nuevopedido/{id}")
	@ResponseBody
	public PersistentEntityResource postPedido(@PathVariable("id") Integer id, @RequestBody Pedido pedido,
			PersistentEntityResourceAssembler assembler) {
		Usuario usuario = usuarioDAO.findById(id).get();
		pedido.setFechaPedido(Instant.now());
		pedido.setUsuario(usuario);
		Pedido pedidoGuardado = pedidoDAO.save(pedido);
		usuario.addPedido(pedidoGuardado);

		for (ProductoCarro productoCarro : pedido.getCarro()) {
			productoCarro = productoCarroDAO.findById(productoCarro.getId()).get();
			Producto producto = productoDAO.findById((productoCarro.getProducto().getId())).get();
			productoCarro.setProducto(producto);
			producto.addProductoCarro(productoCarro);
			productoCarro.setPedido(pedidoGuardado);
			productoCarroDAO.save(productoCarro);
		}

		usuarioDAO.save(usuario);
		pedidoDAO.save(pedidoGuardado);

		return assembler.toModel(pedidoGuardado);
	}

	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@DeleteMapping(path = "pedidos/{id}")
	@ResponseBody
	public void deletePedido(@PathVariable("id") Long id) {
		Pedido pedido = pedidoDAO.getById(id);
		List<ProductoCarro> productosCarro = pedido.getCarro();
		for (ProductoCarro productoCarro : productosCarro) {
			productoCarroDAO.delete(productoCarro);
		}
		pedido.setCarro(new ArrayList<ProductoCarro>());
		pedidoDAO.save(pedido);
		pedidoDAO.deleteById(id);
	}

	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@PatchMapping(path = "pedidos/{id}")
	@ResponseBody
	public PersistentEntityResource patchPedido(@RequestBody Pedido pedido, @PathVariable("id") Long id,
			PersistentEntityResourceAssembler assembler) {
		pedidoDAO.deleteById(id);
		Pedido pedidoModificado = pedidoDAO.save(pedido);
		return assembler.toModel(pedidoModificado);
	}

	@PreAuthorize("hasRole('ROLE_ADMIN') OR hasRole('ROLE_USER')")
	@PostMapping("/addproducto/{id}")
	@ResponseBody
	public CollectionModel<PersistentEntityResource> addProducto(@RequestBody Producto producto,
			@PathVariable("id") Long id, PersistentEntityResourceAssembler assembler) {
		Pedido pedido = pedidoDAO.findById(id).get();
		boolean existe = false; // variable que indica si ya habia al menos una unidad de ese producto al carro
		// Recorrer la lista de ProductoSeleccionados para comprobar si ya habia al
		// menos una unidad agragada.
		// En ese caso incrementa la cantidad, sino crea un nuevo ProductoSeleccionado
		for (ProductoCarro productoSeleccionado : pedido.getCarro()) {

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
			pedido.addProductoAPedido(productoSeleccionadoNuevo);
			pedidoDAO.save(pedido);
		}
		return assembler.toCollectionModel(pedido.getCarro());
	}

	@PreAuthorize("hasRole('ROLE_ADMIN') OR hasRole('ROLE_USER')")
	@GetMapping("/getproductospedido/{id}")
	@ResponseBody
	public CollectionModel<PersistentEntityResource> getProductosPedido(@PathVariable("id") Long id,
			PersistentEntityResourceAssembler assembler) {
		Pedido pedido = pedidoDAO.findById(id).get();
		return assembler.toCollectionModel(pedido.getCarro());
	}

	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@PostMapping("/borrardepedido/{id}")
	@ResponseBody
	public CollectionModel<PersistentEntityResource> deleteProducto(@RequestBody Producto producto,
			@PathVariable("id") Long id, PersistentEntityResourceAssembler assembler) {
		Pedido pedido = pedidoDAO.findById(id).get();
		List<ProductoCarro> productosPedido = pedido.getCarro();
		for (ProductoCarro productoCarro : productosPedido) {
			if (productoCarro.getProducto().getId().equals(producto.getId())) {
				if (productoCarro.getCantidad() > 1) {
					productoCarro.setCantidad(productoCarro.getCantidad() - 1);
					productoCarroDAO.save(productoCarro);
				} else {
					productosPedido.remove(productoCarro);
					productoCarroDAO.delete(productoCarro);
					break;
				}
			}
		}
		return assembler.toCollectionModel(productosPedido);
	}

	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@PostMapping("/enviarpedido")
	@ResponseBody
	public PersistentEntityResource enviarPedido(@RequestBody Pedido pedido,
			PersistentEntityResourceAssembler assembler) {
		Pedido pedidoEnApi = pedidoDAO.findById(pedido.getId()).get();
		pedidoEnApi.setFechaEnvio(Instant.now());
		pedidoDAO.save(pedidoEnApi);
		return assembler.toModel(pedidoEnApi);
	}

	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@PostMapping("/entregarpedido")
	@ResponseBody
	public PersistentEntityResource entregarPedido(@RequestBody Pedido pedido,
			PersistentEntityResourceAssembler assembler) {
		Pedido pedidoEnApi = pedidoDAO.findById(pedido.getId()).get();
		pedidoEnApi.setFechaEntrega(Instant.now());
		pedidoDAO.save(pedidoEnApi);
		return assembler.toModel(pedidoEnApi);
	}
}
