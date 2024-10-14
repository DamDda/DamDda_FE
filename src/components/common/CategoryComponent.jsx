  export const CategoryComponent = ({ text, onClick, imgUrl }) => {
    return (
      <button className="category-button-2" onClick={onClick} aria-label={text}>
        <div className="category-margin">
          <div className="category-background">
            <img className="category-image" alt={text} src={imgUrl} />
          </div>
        </div>
        <div className="category-container">
          <div className="category-text-wrapper">{text}</div>
        </div>
      </button>
    );
  };
  