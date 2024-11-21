package com.login.demo.config.filter;

import com.auth0.jwt.interfaces.DecodedJWT;
import com.login.demo.service.UserSecService;
import com.login.demo.utils.JwtUtils;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.servlet.HandlerExceptionResolver;

import java.io.IOException;
import java.util.Collection;

//mediante el extends establecemos que es un filtro que se tiene que ejecutar siempre
public class JwtTokenValidator extends OncePerRequestFilter {
    private JwtUtils jwtUtils;

    public JwtTokenValidator(JwtUtils jwtUtils) {
        this.jwtUtils = jwtUtils;
    }

    @Override
    //importante: el nonnull debe ser de sringframework, no lombok
    protected void doFilterInternal(@NonNull HttpServletRequest request,
                                    @NonNull HttpServletResponse response,
                                    @NonNull FilterChain filterChain) throws ServletException, IOException {

        String jwtToken = request.getHeader(HttpHeaders.AUTHORIZATION);

        if (jwtToken != null) {
            //en el encabezado antes del token viene la palabra bearer (esquema de autenticación)
            //por lo que debemos sacarlo
            jwtToken = jwtToken.substring(7); //son 7 letras + 1 espacio
            DecodedJWT decodedJWT = jwtUtils.validateToken(jwtToken);

            //si el token es válido, le concedemos el acceso
            String username = jwtUtils.extractUsername(decodedJWT);
            //me devuelve claim, necesito pasarlo a String
            String authorities = jwtUtils.getSpecificClaim(decodedJWT, "authorities").asString();

            //Si todo está ok, hay que setearlo en el Context Holder
            //Para eso tengo que convertirlos a GrantedAuthority
            Collection<? extends GrantedAuthority> authoritiesList = AuthorityUtils.commaSeparatedStringToAuthorityList(authorities);

            //Si se valida el token, le damos acceso al usuario en el context holder
            SecurityContext context = SecurityContextHolder.getContext();
            Authentication authentication = new UsernamePasswordAuthenticationToken(username, null, authoritiesList);
            context.setAuthentication(authentication);
            SecurityContextHolder.setContext(context);

        }

        // si no viene token, va al siguiente filtro
        //si no viene el token, eso arroja error
        filterChain.doFilter(request, response);
    }
}
