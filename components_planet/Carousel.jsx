import { useState } from "react";

export default function Carousel() {
  const [isActive, setIsActive] = useState(3);

  const handleClick = (i) => {
    if (isActive != i) {
      setIsActive(i);
    }
  };

  return (
    <div data-v-07142c5e="" className="carousel-pager">
      <a href="/index.html">
        <button
          className={isActive == 0 ? "active" : ""}
          onClick={() => handleClick(0)}
        >
          <div className="carousel-pager-item"></div>
        </button>
      </a>
      <a href="/siteWeb1/index.html">
        <button
          className={isActive == 1 ? "active" : ""}
          onClick={() => handleClick(1)}
        >
          <div className="carousel-pager-item"></div>
        </button>
      </a>
      <a href="/agap2/agap2.html">
        <button
          className={isActive == 2 ? "active" : ""}
          onClick={() => handleClick(2)}
        >
          <div className="carousel-pager-item"></div>
        </button>
      </a>
      <a href="/planet/index.html">
      <button
        className={isActive == 3 ? "active" : ""}
        onClick={() => handleClick(3)}
      >
        <div className="carousel-pager-item"></div>
      </button>
      </a>
    </div>
  );
}
