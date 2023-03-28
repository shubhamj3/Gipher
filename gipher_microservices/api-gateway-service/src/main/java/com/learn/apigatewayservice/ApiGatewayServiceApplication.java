package com.learn.apigatewayservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsWebFilter;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.Collections;


@SpringBootApplication
public class ApiGatewayServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(ApiGatewayServiceApplication.class, args);}

		@Bean
		public CorsWebFilter corsWebFilter() {
			final CorsConfiguration corsConfig = new CorsConfiguration();
			corsConfig.setAllowedOrigins(Collections.singletonList("*"));
			corsConfig.setMaxAge(3600L);
			corsConfig.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE"));
			corsConfig.addAllowedHeader("*");
			final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
			source.registerCorsConfiguration("/**", corsConfig);
			return new CorsWebFilter(source);
		}

		@Bean
		public RouteLocator apiRoutes(RouteLocatorBuilder builder) {

			return builder.routes()
					.route("user_route", route ->
							route.path("/api/v1/user/**")
									.uri("http://localhost:8000"))
					.route("gipher_route", route ->
							route.path("/api/v1/gipher/**")
									.uri("http://localhost:9090")
					)
					.build();
		}
}
