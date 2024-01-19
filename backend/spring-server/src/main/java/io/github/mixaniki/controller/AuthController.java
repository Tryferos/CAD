package io.github.mixaniki.controller;

import io.github.mixaniki.controller.dto.AuthResponseDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.util.stream.Collectors;

@RestController
@CrossOrigin()
public class AuthController {

    JwtEncoder encoder;
    UserDetailsService userDetailsService;

    @Autowired
    public AuthController(JwtEncoder encoder, UserDetailsService userDetailsService) {
        this.encoder = encoder;
        this.userDetailsService = userDetailsService;
    }

    @PostMapping("/api/token")
    public ResponseEntity<AuthResponseDto> token(Authentication authentication){
        Instant now = Instant.now();
        long expiry = 36000L; // 10 hours
        String scope = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(" "));
        JwtClaimsSet claimsSet = JwtClaimsSet.builder()
                .issuer("self")
                .issuedAt(now)
                .expiresAt(now.plusSeconds(expiry))
                .subject(authentication.getName())
                .claim("scope", scope)
                .build();

        String username = userDetailsService.loadUserByUsername(authentication.getName()).getUsername();
        String role = userDetailsService.loadUserByUsername(authentication.getName()).getAuthorities().toString();
        role = role.replace("[ROLE_", "").replace("]", "");

        return ResponseEntity.ok(new AuthResponseDto(this.encoder.encode(JwtEncoderParameters.from(claimsSet)).getTokenValue(), username, role));
    }

}
