package com.peterfonkel.ecommerce.login.jwt;

import io.jsonwebtoken.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import com.peterfonkel.ecommerce.login.usuarios.UsuarioPrincipal;

import java.util.Date;

/**
 * Clase que gestiona las tareas relacionadas con el token JWT.
 * 
 * @author albal
 *
 */
@Component
public class JwtProvider {

	private final static Logger logger = LoggerFactory.getLogger(JwtProvider.class);

	/**
	 * clave secreta utilizada para encriptar las contrasenias, se capta de
	 * properties/variables de entorno
	 */
	@Value("${jwt.secret}")
	String secret;

	/**
	 * tiempo de expiracion seteado para los JWT
	 */
	@Value("${jwt.expiration}")
	int expiration;

	/**
	 * Generacion de un token con la clave secreta y tiempo de expiracion.
	 * 
	 * @param authentication
	 * @return JWT
	 */
	public String generateToken(Authentication authentication) {
		UsuarioPrincipal usuarioPrincipal = (UsuarioPrincipal) authentication.getPrincipal();
		return Jwts.builder().setSubject(usuarioPrincipal.getUsername())
				.setIssuedAt(new Date(System.currentTimeMillis()))
				.setExpiration(new Date(System.currentTimeMillis() + expiration))
				.signWith(SignatureAlgorithm.HS512, secret).compact();
	}

	/**
	 * Decodificar un token JWT con la clave secreta y obtener el usuario.
	 * 
	 * @param token
	 * @return string email para un JWT
	 */
	public String getEmailFromToken(String token) {
		return Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody().getSubject();
	}

	/**
	 * Comprobar si un token es valido.
	 * 
	 * @param token
	 * @return booleano si el token valido
	 */
	public boolean validateToken(String token) {
		try {
			Jwts.parser().setSigningKey(secret).parseClaimsJws(token);
			return true;
		} catch (MalformedJwtException | UnsupportedJwtException | ExpiredJwtException | IllegalArgumentException
				| SignatureException e) {
			logger.error("error comprobando el token");
			e.printStackTrace();
		}
		return false;
	}

}
