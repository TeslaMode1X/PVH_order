package auth

type Login struct {
	Email    string `json:"email"`
	Password string `json:"password"`
} // @Name LoginModel

type Registration struct {
	UserName string `json:"username"`
	Email    string `json:"email"`
	Password string `json:"password"`
} // @Name RegistrationModel

type User struct {
	ID    string `json:"id"`
	Name  string `json:"name"`
	Email string `json:"email"`
	Role  string `json:"role"`
} // @Name UserModel
