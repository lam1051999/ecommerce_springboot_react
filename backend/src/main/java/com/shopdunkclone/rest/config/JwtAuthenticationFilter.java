package com.shopdunkclone.rest.config;

import com.google.gson.Gson;
import com.shopdunkclone.rest.model.ServiceResult;
import com.shopdunkclone.rest.util.JwtService;
import com.shopdunkclone.rest.util.TokenType;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.web.util.matcher.OrRequestMatcher;
import org.springframework.security.web.util.matcher.RequestMatcher;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;
    private static final RequestMatcher requestMatchersInclude = new OrRequestMatcher(
            new AntPathRequestMatcher("/api/v1/customer-infos/**")
    );

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response, @NonNull FilterChain filterChain) throws ServletException, IOException {
        if (!requestMatchersInclude.matches(request)) {
            filterChain.doFilter(request, response);
            return;
        } else {
            final String jwt = jwtService.resolveToken(request);
            if (jwt == null) {
                setUnAuthorizedResponse(response, new ServiceResult<>(ServiceResult.Status.FAILED, "Cannot extract token from header", null));
                return;
            }
            try {
                final String userName = jwtService.extractUsername(jwt, TokenType.TOKEN);
                if (userName != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                    UserDetails userDetails = userDetailsService.loadUserByUsername(userName);
                    if (jwtService.isTokenValid(jwt, userDetails, TokenType.TOKEN)) {
                        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                        authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                        SecurityContextHolder.getContext().setAuthentication(authToken);
                    } else {
                        setUnAuthorizedResponse(response, new ServiceResult<>(ServiceResult.Status.FAILED, "Token is invalid", null));
                        return;
                    }
                }
            } catch (Exception exception) {
                setUnAuthorizedResponse(response, new ServiceResult<>(ServiceResult.Status.FAILED, "Token is invalid", null));
                return;
            }
            filterChain.doFilter(request, response);
        }
    }

    public void setUnAuthorizedResponse(@NonNull HttpServletResponse response, ServiceResult<Object> result) throws IOException {
        String message = new Gson().toJson(result);
        response.setStatus(HttpStatus.UNAUTHORIZED.value());
        response.setContentType("application/json;charset=UTF-8");
        response.getOutputStream().write(message.getBytes());
    }
}
