import React, { useCallback, useState } from "react";
import Image from "next/image";
import { PlusOutlined } from "@ant-design/icons";

const PostImages = ({ images }) => {
  const [showImagesZoom, setShowImagesZoom] = useState(false);

  const onZoom = useCallback(() => {
    setShowImagesZoom(true);
  }, []);

  const onClose = useCallback(() => {
    setShowImagesZoom(false);
  }, []);

  if (images.length === 1) {
    return (
      <>
        <Image
          src={images[0].src}
          width="50%"
          height="100%"
          alt={images[0].src}
          onClick={onZoom}
        />
        {/*{showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}*/}
      </>
    );
  }
  if (images.length === 2) {
    return (
      <>
        <div>
          <Image
            src={images[0].src}
            alt={images[0].src}
            width="50%"
            height="100%"
            onClick={onZoom}
          />
          <Image
            src={images[1].src}
            alt={images[1].src}
            width="50%"
            height="100%"
            onClick={onZoom}
          />
        </div>
        {/*{showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}*/}
      </>
    );
  }
  return (
    <>
      <div>
        <Image
          src={images[0].src}
          alt={images[0].src}
          width="50%"
          height="100%"
          onClick={onZoom}
        />
        <div
          role="presentation"
          style={{
            display: "inline-block",
            width: "50%",
            textAlign: "center",
            verticalAlign: "middle",
          }}
          onClick={onZoom}
        >
          <PlusOutlined />
          <br />
          {images.length - 1}
          개의 사진 더보기
        </div>
      </div>
      {/*{showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}*/}
    </>
  );
};
export default PostImages;
