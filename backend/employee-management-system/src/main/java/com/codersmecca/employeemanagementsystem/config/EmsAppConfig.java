package com.codersmecca.employeemanagementsystem.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class EmsAppConfig {

    @Bean
    public OpenAPI createOpenAPIBean() {
        //http://localhost:8080/swagger-ui/index.html
        Info info = new Info();
        info.title("Info title").description("Info description").termsOfService("Info termsOfService")
                .contact(new Contact().name("Contact name").url("Contact url").email("Contact email"))
                .license(new License().name("License name").url("License url"))
                .version("Info version");

        return new OpenAPI().info(info);
    }

    @Bean //this solution is global
    public WebMvcConfigurer createCorsConfigurerBean() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**").allowedOrigins("http://localhost:3000");
            }
        };
    }

}
