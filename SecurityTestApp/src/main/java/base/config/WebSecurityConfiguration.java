package base.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import base.filter.AuthTokenFilter;

@EnableWebSecurity
@Configuration
//@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfiguration {

	@Autowired
	private UserDetailsService userDetailsService;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private AuthTokenFilter authTokenFilter;

	@Autowired
	private InvalidUserAuthEntryPoint invalidUserAuthEntryPoint;

	@Bean
	public AuthenticationManager authenticationManager(HttpSecurity http) throws Exception {
		return http.getSharedObject(AuthenticationManagerBuilder.class).userDetailsService(userDetailsService)
				.passwordEncoder(passwordEncoder).and().build();
	}

	@Bean
	SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
		// URL Access Types
		httpSecurity.cors().and().csrf().disable().authorizeHttpRequests()
				.requestMatchers("/test", "/signin" , "/signup").permitAll()
				.requestMatchers("/admin").hasAnyAuthority("ADMIN")
				.requestMatchers("/user").hasAnyAuthority("ADMIN", "USER")
				.requestMatchers("/reviewer").hasAnyAuthority("ADMIN","REVIEWER")
				.anyRequest().authenticated()
//				 Exception details
				.and()
				.exceptionHandling()
				.authenticationEntryPoint(invalidUserAuthEntryPoint)
				.and()
				.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
				// register filter for 2nd request onwards
				.and()
				.addFilterBefore(authTokenFilter, UsernamePasswordAuthenticationFilter.class);

		return httpSecurity.build();
	}

}
