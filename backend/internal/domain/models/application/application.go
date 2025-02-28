package application

type Object struct {
	ID          string `json:"id"`
	Name        string `json:"name"`
	PhoneNumber string `json:"phone_number"`
} // @Name ApplicationRead

type Create struct {
	Name        string `json:"name"`
	PhoneNumber string `json:"phone_number"`
} // @Name ApplicationCreation
