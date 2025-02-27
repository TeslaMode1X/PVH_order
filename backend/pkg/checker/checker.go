package checker

import (
	"bytes"
	"github.com/TeslaMode1X/PVH_order/internal/service/file"
	"github.com/pkg/errors"
	"image/jpeg"
	"image/png"
)

func DetectImageType(imageData []byte) (file.ImageType, error) {
	_, err := png.Decode(bytes.NewReader(imageData))
	if err == nil {
		return file.PngImageType, nil
	}

	_, err = jpeg.Decode(bytes.NewReader(imageData))
	if err == nil {
		return file.JpgImageType, nil
	}

	return file.UnknownImageType, errors.New("unknown image type")
}
