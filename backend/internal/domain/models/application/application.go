package application

type Object struct {
	ID          string `json:"id"`
	Name        string `json:"name"`
	PhoneNumber string `json:"phone_number"`
	Email       string `json:"email"`
	Description string `json:"description"`
} // @Name ApplicationRead

type Create struct {
	Name        string `json:"name"`
	PhoneNumber string `json:"phone_number"`
	Email       string `json:"email"`
	Description string `json:"description"`
} // @Name ApplicationCreation
