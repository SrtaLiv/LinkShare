package com.login.demo.utils;


import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.Claim;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.interfaces.JWTVerifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Component
public class JwtUtils {

    //Con estas configuraciones aseguramos la autenticidad del token a crear
    @Value("${security.jwt.private.key}")
    private String privateKey;

    @Value("${security.jwt.user.generator}")
    private String userGenerator;

    //Para encriptar, vamos a necesitar esta clave secreta y este algoritmo
    public String createToken (Authentication authentication) {
        Algorithm algorithm = Algorithm.HMAC256(this.privateKey);

        //esto está dentro del security context holder
        String username = authentication.getPrincipal().toString();

        //también obtenemos los permisos/autorizaciones
        //la idea es traer los permisos separados por coma
        String authorities = authentication.getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));

        //a partir de esto generamos el token
        String jwtToken = JWT.create()
                .withIssuer(this.userGenerator) //acá va el usuario que genera el token
                .withSubject(username) // a quien se le genera el token
                .withClaim("authorities", authorities) //claims son los datos contraidos en el JWT
                .withIssuedAt(new Date()) //fecha de generación del token
                .withExpiresAt(new Date(System.currentTimeMillis() + 1800000)) //fecha de expiración, tiempo en milisegundos
                .withJWTId(UUID.randomUUID().toString()) //id al token - que genere una random
                .withNotBefore(new Date (System.currentTimeMillis())) //desde cuando es válido (desde ahora en este caso)
                .sign(algorithm); //nuestra firma es la que creamos con la clave secreta

        return jwtToken;
    }

    //método para decodificar
    public DecodedJWT validateToken(String token) {

        try {
            Algorithm algorithm = Algorithm.HMAC256(this.privateKey); //algoritmo + clave privada
            JWTVerifier verifier = JWT.require(algorithm)
                    .withIssuer(this.userGenerator)
                    .build();

            //si está todo ok, no genera excepción y hace el return
            DecodedJWT decodedJWT = verifier.verify(token);
            return decodedJWT;
        }
        catch (JWTVerificationException exception) {
            throw new JWTVerificationException("Invalid token. Not authorized");
        }
    }

    public String extractUsername (DecodedJWT decodedJWT) {
        return decodedJWT.getSubject().toString();
    }

    //devuelvo un claim en particular
    public Claim getSpecificClaim (DecodedJWT decodedJWT, String claimName) {
        return decodedJWT.getClaim(claimName);
    }

    //devuelvo todos los claims
    public Map<String, Claim> returnAllClaims (DecodedJWT decodedJWT){
        return decodedJWT.getClaims();
    }
}
