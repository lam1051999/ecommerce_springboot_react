package com.shopdunkclone.rest.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Scope;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
@Scope(value = "prototype")
public class JwtService {
    @Value("${token_secret_key}")
    private String TOKEN_SECRET_KEY;
    @Value("${refresh_token_secret_key}")
    private String REFRESH_TOKEN_SECRET_KEY;
    @Value("${token_duration_ms}")
    private long TOKEN_DURATION_MS;
    @Value("${refresh_token_duration_ms}")
    private long REFRESH_TOKEN_DURATION_MS;

    public String extractUsername(String token, TokenType tokenType) {
        return extractClaim(token, Claims::getSubject, tokenType);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimResolver, TokenType tokenType) {
        final Claims claims = extractAllClaims(token, tokenType);
        return claimResolver.apply(claims);
    }

    public String generateToken(UserDetails userDetails, TokenType tokenType) {
        return generateToken(new HashMap<>(), userDetails, tokenType);
    }

    public String generateToken(Map<String, Object> extraClaims, UserDetails userDetails, TokenType tokenType) {
        return Jwts.builder()
                .setClaims(extraClaims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + getDurationMs(tokenType)))
                .signWith(getSigningKey(tokenType), SignatureAlgorithm.HS256)
                .compact();
    }

    public boolean isTokenValid(String token, UserDetails userDetails, TokenType tokenType) {
        final String username = extractUsername(token, tokenType);
        return username.equals(userDetails.getUsername()) && !isTokenExpired(token, tokenType);
    }

    public boolean isTokenExpired(String token, TokenType tokenType) {
        return extractExpiration(token, tokenType).before(new Date());
    }

    private Date extractExpiration(String token, TokenType tokenType) {
        return extractClaim(token, Claims::getExpiration, tokenType);
    }

    private Claims extractAllClaims(String token, TokenType tokenType) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey(tokenType))
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    private Key getSigningKey(TokenType tokenType) {
        String secretKey = tokenType == TokenType.TOKEN ? TOKEN_SECRET_KEY : REFRESH_TOKEN_SECRET_KEY;
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    private long getDurationMs(TokenType tokenType) {
        return tokenType == TokenType.TOKEN ? TOKEN_DURATION_MS : REFRESH_TOKEN_DURATION_MS;
    }

    public String resolveToken(HttpServletRequest req) {
        String bearerToken = req.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}
