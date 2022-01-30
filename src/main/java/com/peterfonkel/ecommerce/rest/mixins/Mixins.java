package com.peterfonkel.ecommerce.rest.mixins;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

public class Mixins {

	@JsonIgnoreProperties(value = { "password" })
	public abstract class Usuario {

	}
}
