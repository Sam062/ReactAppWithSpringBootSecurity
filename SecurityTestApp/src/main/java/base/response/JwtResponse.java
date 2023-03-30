package base.response;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class JwtResponse {

	private String token;
	private String type = "Bearer";
	private Integer id;
	private String name;
	private String email;
	private List<String> roles;

}
