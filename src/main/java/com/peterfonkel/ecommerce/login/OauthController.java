package com.peterfonkel.ecommerce.login;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.peterfonkel.ecommerce.login.dto.TokenDto;
import com.peterfonkel.ecommerce.login.jwt.JwtProvider;
import com.peterfonkel.ecommerce.login.roles.RolService;
import com.peterfonkel.ecommerce.login.usuarios.UsuarioService;
import com.peterfonkel.ecommerce.login.usuarios.entidades.Usuario;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Collections;

@RestController
@RequestMapping("/oauth")
@CrossOrigin
public class OauthController {

	@Value("${google.clientId}")
	String googleClientId;

	@Value("${secretPsw}")
	String secretPsw;

	@Autowired
	PasswordEncoder passwordEncoder;

	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	JwtProvider jwtProvider;

	@Autowired
	UsuarioService usuarioService;

	@Autowired
	RolService rolService;

	private final static Logger logger = LoggerFactory.getLogger(JwtProvider.class);

	@PostMapping("/google")
	public ResponseEntity<TokenDto> google(@RequestBody TokenDto tokenDto) throws IOException {

		final NetHttpTransport transport = new NetHttpTransport();
		final JacksonFactory jacksonFactory = JacksonFactory.getDefaultInstance();

		// metodo que verifica con google con mi IDClienteGoogle
		GoogleIdTokenVerifier.Builder verifier = new GoogleIdTokenVerifier.Builder(transport, jacksonFactory)
				.setAudience(Collections.singletonList(googleClientId));

		// sera lo que devuelva
		final GoogleIdToken googleIdToken = GoogleIdToken.parse(verifier.getJsonFactory(), // metodo verifier anterior
				tokenDto.getValue()); // token recibido del cliente

		// lo que devuelve google tras la autenticacion con toda la informacion
		final GoogleIdToken.Payload payload = googleIdToken.getPayload();
		logger.info("Informacion del usuario de la autoridad de autenticacion: ", payload);

		// compruebo mi usuario en la BD
		Usuario usuario = new Usuario();
		String mail = payload.getEmail();
		if (usuarioService.existsEmail(mail)) {
			logger.info("Ya existe el usuario: ", mail);
		} else {
			logger.warn("El usuario: ", mail, " no esta autorizado");
		}
		TokenDto tokenRes = login(mail);

		return new ResponseEntity(tokenRes, HttpStatus.OK);
	}

	private TokenDto login(String mail) {
		Authentication authentication = authenticationManager
				.authenticate(new UsernamePasswordAuthenticationToken(mail, secretPsw));
		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = jwtProvider.generateToken(authentication);
		TokenDto tokenDto = new TokenDto();
		tokenDto.setValue(jwt);
		System.out.println(tokenDto);
		return tokenDto;
	}

}
