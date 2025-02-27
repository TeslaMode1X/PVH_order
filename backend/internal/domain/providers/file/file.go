package providers

import (
	fileHdl "github.com/TeslaMode1X/PVH_order/internal/api/handler/file"
	"github.com/TeslaMode1X/PVH_order/internal/domain/interfaces"
	fileSvc "github.com/TeslaMode1X/PVH_order/internal/service/file"
	"github.com/google/wire"
	"log/slog"
	"sync"
)

var (
	hdl     *fileHdl.Handler
	hdlOnce sync.Once

	svc     *fileSvc.Service
	svcOnce sync.Once
)

var ProviderSet = wire.NewSet(
	ProvideFileHandler,
	ProvideFileService,

	wire.Bind(new(interfaces.FileHandler), new(*fileHdl.Handler)),
	wire.Bind(new(interfaces.FileService), new(*fileSvc.Service)),
)

func ProvideFileHandler(svc interfaces.FileService, log *slog.Logger) *fileHdl.Handler {
	hdlOnce.Do(func() {
		hdl = &fileHdl.Handler{
			Svc: svc,
			Log: log,
		}
	})

	return hdl
}

func ProvideFileService() *fileSvc.Service {
	svcOnce.Do(func() {
		svc = &fileSvc.Service{}
	})

	return svc
}
