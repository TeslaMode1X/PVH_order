package interfaces

import (
	"github.com/TeslaMode1X/PVH_order/internal/service/file"
	"net/http"
)

type FileService interface {
	UploadImage(img []byte, imgType file.ImageType, filePath file.PathType) (string, error)
	RemoveFile(fileName string) error
	GenRandomFileName() (string, error)
}

type FileHandler interface {
	GetStaticImage() http.Handler
}
