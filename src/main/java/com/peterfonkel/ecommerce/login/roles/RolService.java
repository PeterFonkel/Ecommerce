package com.peterfonkel.ecommerce.login.roles;

import org.slf4j.Logger;

import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.peterfonkel.ecommerce.login.roles.enums.RolNombre;

import java.util.Optional;

@Service
@Transactional
public class RolService {

	private final static Logger logger = LoggerFactory.getLogger(RolService.class);

	@Autowired
	RolDAO rolRepository;

	public Optional<Rol> getByRolNombre(RolNombre rolNombre) {
		logger.info("Rol en service: " + rolNombre);
		return rolRepository.findByRolNombre(rolNombre);
	}

	public boolean existsRolNombre(RolNombre rolNombre) {
		return rolRepository.existsByRolNombre(rolNombre);
	}

	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public void save(Rol rol) {
		rolRepository.save(rol);
	}
}
