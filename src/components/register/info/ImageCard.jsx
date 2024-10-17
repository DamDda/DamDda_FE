import { DndContext, DragOverlay } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import SortableItem from "./SortableItem";

const ImageCard = (props) => {
  const {
    productImages,
    currentImageIndex,
    handlePrevImage,
    handleNextImage,
    setCurrentImageIndex,
    handleProductImageChange,
    handleDragStart,
    closestCenter,
    handleDragEnd,
    rectSortingStrategy,
    handleRemoveImage,
    activeId,
  } = props;

  return (
    <div className="image-section">
      <div className="image-preview">
        {productImages.length > 0 && (
          <>
            <img
              className="image-thumbnail"
              src={
                productImages[currentImageIndex].file === null
                  ? `http://localhost:9000/${productImages[currentImageIndex].url}`
                  : productImages[currentImageIndex].url
              }
              alt={`미리보기 ${currentImageIndex}`}
            />
            <IconButton
              onClick={handlePrevImage}
              style={{
                position: "absolute",
                top: "50%",
                left: "10px",
                transform: "translateY(-50%)",
              }}
            >
              <ArrowBack />
            </IconButton>
            <IconButton
              onClick={handleNextImage}
              style={{
                position: "absolute",
                top: "50%",
                right: "10px",
                transform: "translateY(-50%)",
              }}
            >
              <ArrowForward />
            </IconButton>
          </>
        )}
      </div>

      {/* 이미지 목록 */}
      {productImages.length > 0 && (
        <div className="image-list">
          <DndContext
            onDragStart={handleDragStart}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={productImages}
              strategy={rectSortingStrategy}
            >
              <div className="image-item">
                {productImages.map((image, index) => (
                  <SortableItem
                    key={image.url}
                    url={image.url}
                    index={index}
                    title={image.title}
                    onRemove={handleRemoveImage}
                    onClick={() => setCurrentImageIndex(index)} // 목록에서 클릭한 이미지로 변경
                  />
                ))}
                {/* DragOverlay로 잔상 처리 */}
                <DragOverlay>
                  {activeId ? (
                    <div className="image-overlay">
                      <img
                        className="image-image"
                        src={
                          productImages.find((item) => item.url === activeId)
                            .url
                        }
                        alt="Drag Image"
                      />
                    </div>
                  ) : null}
                </DragOverlay>
              </div>
            </SortableContext>
          </DndContext>
        </div>
      )}

      {/* 이미지 업로드 버튼 */}
      <Button variant="outlined" component="label">
        이미지 업로드
        <input
          type="file"
          hidden
          multiple
          onChange={handleProductImageChange}
        />
      </Button>
    </div>
  );
};

export default ImageCard;
