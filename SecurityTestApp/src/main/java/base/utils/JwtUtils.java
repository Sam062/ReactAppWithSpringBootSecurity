package base.utils;

import java.util.Date;
import java.util.concurrent.TimeUnit;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import base.service.UserDetailsImpl;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;

@Component
public class JwtUtils {

	private static final String SECRET = "SECRET";
	private static final String ISSUER = "ISSUER";

	public String generateToken(Authentication authentication) {
		UserDetailsImpl principal = (UserDetailsImpl) authentication.getPrincipal();

		return Jwts.builder().setSubject(principal.getUsername()).setIssuer(ISSUER)
				.setIssuedAt(new Date(System.currentTimeMillis()))
				.setExpiration(new Date(System.currentTimeMillis() + TimeUnit.HOURS.toMillis(1)))
				.signWith(SignatureAlgorithm.HS256, SECRET).compact();
	}

//	public String generateToken(String subject) {
//		try {
//			return Jwts.builder().setId("VOICERA").setSubject(subject).setIssuer(ISSUER)
//					.setIssuedAt(new Date(System.currentTimeMillis()))
//					.setExpiration(new Date(System.currentTimeMillis() + TimeUnit.HOURS.toMillis(1)))
//					.signWith(SignatureAlgorithm.HS256, Base64.getEncoder().encode(SECRET.getBytes())).compact();
//		} catch (Exception e) {
//			System.out.println("Error: couldn't generate token");
//			e.printStackTrace();
//			return null;
//		}
//	}

//	public Claims getClaims(String token) {
//		try {
//			return Jwts.parser().setSigningKey(Base64.getEncoder().encode(SECRET.getBytes())).parseClaimsJws(token)
//					.getBody();
//		} catch (SignatureException e) {
//			System.out.println("Invalid signature!");
//			return null;
//		} catch (MalformedJwtException e) {
//			System.out.println("token malformed!");
//			return null;
//		} catch (ExpiredJwtException e) {
//			System.out.println("token expired!");
//			e.printStackTrace();
//			return null;
//		} catch (UnsupportedJwtException e) {
//			System.out.println("token unsupported!");
//			return null;
//		} catch (IllegalArgumentException e) {
//			System.out.println("Claims String is empty!");
//			return null;
//		} catch (Exception e) {
//			e.printStackTrace();
//			return null;
//		}
//	}

//	public Date getExpDate(String token) {
//		return getClaims(token) != null ? getClaims(token).getExpiration() : null;
//	}

	public String getUserNameFromToken(String token) {
		System.out.println("USer name from token : "+Jwts.parser().setSigningKey(SECRET).parseClaimsJws(token).getBody().getSubject());
		return Jwts.parser().setSigningKey(SECRET).parseClaimsJws(token).getBody().getSubject();
	}

//	public boolean isValidToken(String token) {
//		try {
//			// extDate > CurrDate
//			return getClaims(token) != null
//					? getClaims(token).getExpiration().after(new Date(System.currentTimeMillis()))
//					: false;
//		} catch (Exception e) {
//			e.printStackTrace();
//			return false;
//		}
//	}

	public Boolean validateToken(String token) {
		try {
			Jwts.parser().setSigningKey(SECRET).parseClaimsJws(token);
			return true;
		} catch (SignatureException e) {
			System.out.println("Invalid signature!");
			return null;
		} catch (MalformedJwtException e) {
			System.out.println("token malformed!");
			return null;
		} catch (ExpiredJwtException e) {
			System.out.println("token expired!");
			e.printStackTrace();
			return null;
		} catch (UnsupportedJwtException e) {
			System.out.println("token unsupported!");
			return null;
		} catch (IllegalArgumentException e) {
			System.out.println("Claims String is empty!");
			return null;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

}
