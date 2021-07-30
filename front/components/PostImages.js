import React, { useCallback, useState } from "react";
import Image from "next/image";
import { PlusOutlined } from "@ant-design/icons";

import ImagesZoom from "./ImagesZoom";

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
          role="presentation"
          src={`http://localhost:3065/${images[0].src}`}
          width={200}
          height={200}
          alt={images[0].src}
          onClick={onZoom}
        />
        {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
      </>
    );
  }
  if (images.length === 2) {
    return (
      <>
        <div>
          <Image
            role="presentation"
            src={`http://localhost:3065/${images[0].src}`}
            alt={images[0].src}
            width={200}
            height={200}
            onClick={onZoom}
          />
          <Image
            role="presentation"
            src={`http://localhost:3065/${images[1].src}`}
            alt={images[1].src}
            width={200}
            height={200}
            onClick={onZoom}
          />
        </div>
        {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
      </>
    );
  }
  return (
    <>
      <div>
        <Image
          role="presentation"
          src={`http://localhost:3065/${images[0].src}`}
          alt={images[0].src}
          width={200}
          height={200}
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
      {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
    </>
  );
};

export default PostImages;
