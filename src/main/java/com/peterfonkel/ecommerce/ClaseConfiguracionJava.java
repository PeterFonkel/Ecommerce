package com.peterfonkel.ecommerce;

import java.lang.reflect.Method;

import java.lang.reflect.Parameter;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.RepositorySearchesResource;
import org.springframework.hateoas.Link;
import org.springframework.hateoas.server.RepresentationModelProcessor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.peterfonkel.ecommerce.entities.Producto;
import com.peterfonkel.ecommerce.login.jwt.JwtProvider;
import com.peterfonkel.ecommerce.login.roles.Rol;
import com.peterfonkel.ecommerce.login.roles.RolDAO;
import com.peterfonkel.ecommerce.login.roles.enums.RolNombre;
import com.peterfonkel.ecommerce.login.usuarios.UsuarioDAO;
import com.peterfonkel.ecommerce.login.usuarios.entidades.Usuario;
import com.peterfonkel.ecommerce.rest.ControllerDeProductos;
import com.peterfonkel.ecommerce.rest.mixins.Mixins;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;

@Configuration
@ComponentScan("peterfonkel")
public class ClaseConfiguracionJava {

	private final static Logger logger = LoggerFactory.getLogger(JwtProvider.class);

//	No necesario de momento
//	/**
//	 * Bean que agrega los enlaces a los metodos personalizados en las diferentes clases para HATEOAS
//	 */
//	@Bean
//	RepresentationModelProcessor<RepositorySearchesResource> addSearchLinks(RepositoryRestConfiguration config) {
//		Map<Class<?>, Class<?>> controllersRegistrados = new HashMap<>();
//
//		// le indico la entidad donde tiene que insertar el enlace y el controlador
//		controllersRegistrados.put(Usuario.class, ControllerDeDocumentos.class);
//		controllersRegistrados.put(Usuario.class, ControllerDeFichasVIP.class);
//		
//		return new RepresentationModelProcessor<RepositorySearchesResource>() {
//
//			@SuppressWarnings("deprecation")
//			@Override
//			public RepositorySearchesResource process(RepositorySearchesResource searchResource) {
//
//				// si el enlace coincide lo insertara con el siguiente bloque
//				if (controllersRegistrados.containsKey(searchResource.getDomainType())) {
//					Method[] metodos = controllersRegistrados.get(searchResource.getDomainType()).getDeclaredMethods();
//					for (Method m : metodos) {
//						if (!m.isAnnotationPresent(ResponseBody.class))
//							continue;
//						try {
//							Object[] pathVars = Stream.of(m.getParameters())
//									.filter(p -> p.isAnnotationPresent(PathVariable.class))
//									.map(p -> "(" + p.getName() + ")").collect(Collectors.toList()).toArray();
//							URI uri = linkTo(m, pathVars).toUri();
//							String path = new URI(uri.getScheme(), uri.getUserInfo(), uri.getHost(), uri.getPort(),
//									config.getBasePath() + uri.getPath(), uri.getQuery(), uri.getFragment()).toString()
//											.replace("(", "{").replace(")", "}");
//							String requestParams = Stream.of(m.getParameters())
//									.filter(p -> p.isAnnotationPresent(RequestParam.class)).map(Parameter::getName)
//									.collect(Collectors.joining(","));
//							searchResource.add(new Link(path + "{?" + requestParams + "}", m.getName()));
//						} catch (URISyntaxException e) {
//							e.printStackTrace();
//						}
//					}
//				}
//
//				return searchResource;
//			}
//
//		};
//
//	}

	/**
	 * Bean configurador de mapeo de objetos delvueltos por la API
	 * 
	 * A partir de una clase Mixin, que contiene clases con la configuracion para la
	 * serializacion, se agrega a cada clase que se quiera serializar su
	 * "personalizador"
	 * 
	 * @return bean de configuracion para la serializacion
	 */
	@Bean
	public ObjectMapper getObjectMapper() {
		ObjectMapper mapper = new ObjectMapper();
		mapper.addMixIn(Usuario.class, Mixins.Usuario.class);
		return mapper;
	}

	@Autowired
	RolDAO rolDAO;

	@Autowired
	UsuarioDAO usuarioDAO;

	@Value("${secretPsw}")
	String secretPsw;

	@Value("${correoAdmin}")
	String correoAdmin;

	@Autowired
	PasswordEncoder passwordEncoder;

	/**
	 * bean que carga el usuario administrador en la BD para la primera
	 * inicializacion
	 * 
	 * capta el correo de los properties/variables de entorno
	 */
	@Bean
	public void inicializarBD() {
		logger.info("Iniciando la BD, cargando Roles iniciales y ADMIN");
		/*
		 * cargo los roles de enum.Rolnombre
		 */
		for (RolNombre rol : RolNombre.values()) {
			Rol rolNuevo = new Rol(rol);
			
			if (!rolDAO.existsByRolNombre(rol)) {
				System.out.println("ROLNUEVO: " + rolNuevo);
				rolDAO.save(rolNuevo);
			}
		}

		/*
		 * cargo el usuario administrador si no existe en la BD
		 */
		if (!usuarioDAO.existsByEmail(correoAdmin)) {
			Usuario usuarioAdmin = new Usuario(correoAdmin, passwordEncoder.encode(secretPsw));
			usuarioAdmin.setNombre("Peter Fonkel");
			Rol rolAdmin = rolDAO.findByRolNombre(RolNombre.ROLE_ADMIN).get();
			Set<Rol> roles = new HashSet<>();
			roles.add(rolAdmin);
			usuarioAdmin.agregarRoles(roles);
			usuarioDAO.save(usuarioAdmin);
		}
	}

	/**
	 * bean de configuracion del cors
	 * 
	 * @return
	 */
	@Bean
	CorsFilter corsFilter() {
		final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		final CorsConfiguration config = new CorsConfiguration();
		config.setAllowCredentials(false);
		config.setAllowedOrigins(Collections.singletonList("*"));
		config.setAllowedHeaders(Arrays.asList("Origin", "Content-Type", "Accept", "Authorization"));
		config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "OPTIONS", "DELETE", "PATCH"));
		source.registerCorsConfiguration("/**", config);

		return new CorsFilter(source);
	}

}
