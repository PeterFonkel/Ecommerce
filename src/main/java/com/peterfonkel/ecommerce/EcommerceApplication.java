package com.peterfonkel.ecommerce;

import org.springframework.boot.SpringApplication;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Import;
import org.springframework.context.annotation.ImportResource;

import com.peterfonkel.ecommerce.ClaseConfiguracionJava;

@SpringBootApplication
@ImportResource({ "classpath:config/jpa-config.xml" })
@Import({ ClaseConfiguracionJava.class })
public class EcommerceApplication {

	public static void main(String[] args) {
		SpringApplication.run(EcommerceApplication.class, args);
		System.out.println("API arrancada");
	}

}
