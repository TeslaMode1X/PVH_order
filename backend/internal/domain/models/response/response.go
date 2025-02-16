package response

type (
	ErrorResponse struct {
		Error string `json:"error"`
	} // @name ErrorResponseModel

	SuccessResponse struct {
		Data interface{} `json:"data"`
	} // @name SuccessResponseModel
)
