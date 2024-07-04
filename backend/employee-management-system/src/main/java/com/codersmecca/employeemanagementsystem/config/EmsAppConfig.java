package com.codersmecca.employeemanagementsystem.config;

import com.codersmecca.employeemanagementsystem.constants.EmsAppConstant;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.List;

@Configuration
public class EmsAppConfig {

    public static final String X_REQUESTED_WITH = "X-Requested-With";

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

    /*
    //Approach_1: Global CorsFilter
    @Bean
    public WebMvcConfigurer createCorsConfigurerBean() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**").allowedOrigins("http://localhost:3000");
            }
        };
    }*/

    //Approach_2: Global CorsFilter
    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        corsConfiguration.setAllowCredentials(true);
        corsConfiguration.setAllowedHeaders(EmsAppConstant.ALLOWED_HEADERS_LIST);
        corsConfiguration.setAllowedMethods(EmsAppConstant.ALLOWED_METHODS_LIST);
        corsConfiguration.setAllowedOrigins(List.of("http://localhost:3000", "http://127.0.0.1:3000"));
        corsConfiguration.setExposedHeaders(EmsAppConstant.EXPOSED_HEADERS_LIST);

        UrlBasedCorsConfigurationSource urlBasedCorsConfigurationSource = new UrlBasedCorsConfigurationSource();
        urlBasedCorsConfigurationSource.registerCorsConfiguration("/**", corsConfiguration);
        return new CorsFilter(urlBasedCorsConfigurationSource);
    }

}
