docker-up:
	docker compose up --build
wire:
	wire ./internal/di
swag:
	swag init -g cmd/app/main.go --parseDependency --parseInternal --parseDepth 1