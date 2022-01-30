package com.peterfonkel.ecommerce.login.jwt;

import org.slf4j.Logger;

import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.filter.OncePerRequestFilter;

import com.peterfonkel.ecommerce.login.usuarios.UserDetailsServiceImpl;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Clase que filtra las llamadas http verificando que tiene un token valido.
 * 
 * @author albal
 *
 */
public class JwtTokenFilter extends OncePerRequestFilter {

	private final static Logger logger = LoggerFactory.getLogger(JwtTokenFilter.class);

	@Autowired
	JwtProvider jwtProvider;

	@Autowired
	UserDetailsServiceImpl userDetailsServiceImpl;

	/**
	 * Filtrado de llamadas HTTP, permite que accedan solo las que tengan un token
	 * JWT valido.
	 */
	@Override
	protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain chain)
			throws ServletException, IOException {
		try {
			String token = getToken(req);

			System.out.println("Token: " + token);
//            logger.debug("Token de acceso", token);

			String email = jwtProvider.getEmailFromToken(token);

			logger.info("Ha accedido con email: ", email);

			UserDetails userDetails = userDetailsServiceImpl.loadUserByUsername(email);

			UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(email, null,
					userDetails.getAuthorities());

			SecurityContextHolder.getContext().setAuthentication(auth);
		} catch (Exception e) {
			logger.error("Token no valido,  fail en el metodo Filter");
		}
		chain.doFilter(req, res);
	}

	/**
	 * Obtener el JWT de una llamada HTTP
	 * 
	 * @param req llamada http
	 * @return null o el token de la llamada
	 */
	private String getToken(HttpServletRequest req) {
		String authReq = req.getHeader("Authorization");
		if (authReq != null && authReq.startsWith("Bearer "))
			return authReq.replace("Bearer ", "");
		return null;
	}
}
