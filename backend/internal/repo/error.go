package repo

import "errors"

var (
	ErrUserNotFound     = errors.New("user not found")
	ErrPasswordNotMatch = errors.New("password not match")
)
