package com.peterfonkel.ecommerce.login.jwt;

import org.slf4j.Logger;

import org.slf4j.LoggerFactory;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Punto de entrada de llamadas HTTP, comprueba si se realizan con un token en
 * la cabecera (Authentication)
 * 
 * @author albal
 *
 */
@Component
public class JwtEntryPoint implements AuthenticationEntryPoint {

	private final static Logger logger = LoggerFactory.getLogger(JwtEntryPoint.class);

	/**
	 * comprueba la cabecera de las llamadas http
	 */
	@Override
	public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException e)
			throws IOException, ServletException {
		logger.error("fail en el metodo commence");
		response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "credenciales erroneas");
	}
}
