package io.github.mixaniki.security;

import com.nimbusds.jose.jwk.JWK;
import com.nimbusds.jose.jwk.JWKSet;
import com.nimbusds.jose.jwk.RSAKey;
import com.nimbusds.jose.jwk.source.ImmutableJWKSet;
import com.nimbusds.jose.jwk.source.JWKSource;
import com.nimbusds.jose.proc.SecurityContext;
import io.github.mixaniki.security.repository.UserRepository;
import io.github.mixaniki.security.service.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtEncoder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
import org.springframework.security.oauth2.server.resource.web.BearerTokenAuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;

import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;

@Configuration
@EnableMethodSecurity(jsr250Enabled = true)
public class SecurityConfig {

    @Value("${jwt.public.key}")
    RSAPublicKey publicKey;

    @Value("${jwt.private.key}")
    RSAPrivateKey privateKey;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests((authorize) -> authorize
                                .requestMatchers(HttpMethod.GET, "/api/cities/*").permitAll()
                                .requestMatchers(HttpMethod.GET, "/api/cities/").permitAll()
                                .requestMatchers(HttpMethod.GET, "/api/teams/**").permitAll()
                                .requestMatchers(HttpMethod.GET, "/api/players/*").permitAll()
                                .requestMatchers(HttpMethod.GET, "/api/players/team/*").permitAll()
                                .requestMatchers(HttpMethod.GET, "/api/players/team/*/teamsize").permitAll()
                                .requestMatchers(HttpMethod.GET, "/api/players/").permitAll()
                                .requestMatchers(HttpMethod.GET, "api/championships/").permitAll()
                                .requestMatchers(HttpMethod.GET, "api/championships/*").permitAll()
                                .requestMatchers(HttpMethod.GET, "api/championships/championship/*").permitAll()
                                .requestMatchers(HttpMethod.GET, "api/championships/team/*").permitAll()
                                .requestMatchers(HttpMethod.GET, "api/participations/participation").permitAll()
                                .requestMatchers(HttpMethod.GET, "api/participations/").permitAll()
                                .requestMatchers(HttpMethod.PUT, "api/participations/participation").denyAll()
                                .requestMatchers(HttpMethod.PUT, "api/paticipations/*").denyAll()
                                .requestMatchers(HttpMethod.GET, "api/rounds/round").permitAll()
                                .requestMatchers(HttpMethod.GET, "api/token").permitAll()
                                .requestMatchers(HttpMethod.GET, "api/rounds").permitAll()
                                .requestMatchers(HttpMethod.POST, "api/rounds/add").denyAll()
                                .requestMatchers(HttpMethod.GET, "api/games/game").permitAll()
                                .requestMatchers(HttpMethod.GET, "api/games/games").permitAll()
                                .requestMatchers(HttpMethod.GET, "api/games/").permitAll()
                                .requestMatchers(HttpMethod.POST, "api/games/add").denyAll()
                                .requestMatchers(HttpMethod.GET, "api/games/").permitAll()
                                .requestMatchers(HttpMethod.GET, "/*").permitAll()
                                .requestMatchers(HttpMethod.GET, "/**").permitAll()
                                .requestMatchers(HttpMethod.GET, "/static/**").permitAll()
                                .requestMatchers(HttpMethod.GET, "/static/js/*").permitAll()
                                .requestMatchers(HttpMethod.GET, "/static/css/*").permitAll()
                                .requestMatchers(HttpMethod.GET, "/favicon.ico").permitAll()


                                .requestMatchers(HttpMethod.GET, "api/teamScorePerQuarters").permitAll()
                                .requestMatchers(HttpMethod.GET, "api/teamScorePerQuarters/teamScorePerQuarter").permitAll()

                                .requestMatchers(HttpMethod.GET, "/api/players/team/*/teamsize").permitAll()
                                .anyRequest().authenticated()
                )
                .csrf(csrf -> csrf.ignoringRequestMatchers("**")
                )
                .httpBasic(Customizer.withDefaults())
                .oauth2ResourceServer(customizer -> customizer.jwt(Customizer.withDefaults()))
                .sessionManagement((session) -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .exceptionHandling((exceptions) -> exceptions
                        .authenticationEntryPoint(new BearerTokenAuthenticationEntryPoint())
                );
        return http.build();
    }

    @Bean
    UserDetailsService userDetailsService(final UserRepository userRepository) {
        return new UserDetailsServiceImpl(userRepository);
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    JwtDecoder jwtDecoder() {
        return NimbusJwtDecoder.withPublicKey(this.publicKey).build();
    }

    @Bean
    JwtEncoder jwtEncoder() {
        JWK jwk = new RSAKey.Builder(this.publicKey).privateKey(this.privateKey).build();
        JWKSource<SecurityContext> jwks = new ImmutableJWKSet<>(new JWKSet(jwk));
        return new NimbusJwtEncoder(jwks);
    }

    @Bean
    public JwtAuthenticationConverter jwtAuthenticationConverter() {

        JwtGrantedAuthoritiesConverter grantedAuthoritiesConverter = new JwtGrantedAuthoritiesConverter();
        grantedAuthoritiesConverter.setAuthorityPrefix("");

        JwtAuthenticationConverter authConverter = new JwtAuthenticationConverter();
        authConverter.setJwtGrantedAuthoritiesConverter(grantedAuthoritiesConverter);
        return authConverter;
    }

}