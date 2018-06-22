package sample.security

import org.springframework.boot.autoconfigure.condition.ConditionalOnWebApplication
import org.springframework.context.annotation.Configuration
import org.springframework.core.annotation.Order
import org.springframework.http.HttpStatus
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.security.web.authentication.HttpStatusEntryPoint
import org.springframework.web.cors.CorsConfiguration
import org.springframework.web.cors.CorsConfigurationSource
import org.springframework.web.cors.UrlBasedCorsConfigurationSource

@Configuration
open class SecurityConfig {
    companion object {
        @ConditionalOnWebApplication
        @Configuration
        @Order(101)
        open class LoginConfiguration(
                private val userLoginDetailsService: AuthenticationUserDetailsService,
                private val passwordEncoder: PasswordEncoder) : WebSecurityConfigurerAdapter() {
            override fun configure(auth: AuthenticationManagerBuilder) {
                auth.userDetailsService(userLoginDetailsService)
                        .passwordEncoder(passwordEncoder)
            }

            override fun configure(http: HttpSecurity) {
                http.requestMatchers()
                        .antMatchers("/api/login")

                http.authorizeRequests()
                        .anyRequest()
                        .authenticated()

                http.httpBasic()
                        .authenticationEntryPoint(HttpStatusEntryPoint(HttpStatus.BAD_REQUEST))

                http.csrf().disable()

                http.cors().configurationSource(corsConfigurationSource())
            }

            private fun corsConfigurationSource(): CorsConfigurationSource {
                val corsConfiguration = CorsConfiguration()
                corsConfiguration.addAllowedMethod(CorsConfiguration.ALL)
                corsConfiguration.addAllowedHeader(CorsConfiguration.ALL)
                corsConfiguration.addAllowedOrigin("http://localhost:3000")
                corsConfiguration.allowCredentials = true

                val corsConfigurationSource = UrlBasedCorsConfigurationSource()
                corsConfigurationSource.registerCorsConfiguration("/**", corsConfiguration)

                return corsConfigurationSource
            }
        }

        @ConditionalOnWebApplication
        @Configuration
        @Order(102)
        open class TokenConfiguration : WebSecurityConfigurerAdapter() {
            override fun configure(http: HttpSecurity) {
                http.authorizeRequests()
                        .antMatchers("/graphql")
                        .permitAll()

                http.csrf().disable()
            }
        }
    }
}