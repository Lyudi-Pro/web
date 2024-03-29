import React, { useEffect, useState, useRef } from "react";
import style from "./ItemPage.module.scss";
import axios from "axios";
import { useLoaderData } from "react-router-dom";
import { Comments } from "../../components/Comments/Comments";
import { Marks } from "../../components/Marks/Marks";
import { ItemPageExchangerDescription } from "../../components/ItemPageExchangerDecsription/ExchangerDescription";
import { ItemPageInfoBlock } from "../../components/ItemPageInfoBlock/ItemPageInfoBlock";

const ImageComponent = React.lazy(() =>
  import("../../components/ImageComponent/Image")
);
const AddComment = React.lazy(() =>
  import("../../components/AddComment/AddComment")
);
const ToggleToFavorite = React.lazy(() =>
  import("../../components/AddToFavorite/AddToFavorite")
);

export const exchangeLoader = async ({ params }) => {
  const id = params.id;
  const res = await fetch(
    `https://change.pro/api/exchangers/get?exchanger_id=${id}`
  );
  const item = await res.json();
  return { id, item };
};

export const ItemPage = () => {
  const { item } = useLoaderData();
  const [review, setReview] = useState();
  const [screenSize, getDimension] = React.useState({
    dynamicWidth: window.innerWidth,
    dynamicHeight: window.innerHeight,
  });
  const [isOpen, setIsOpen] = useState(false);
  const [hideBlocks, setHideBlocks] = useState(false);

  useEffect(() => {
    axios
      .get(
        `https://change.pro/api/reviews/get?sort=desc&orderBy=id&limit=5&exchanger_id=${item.data.id}`
      )
      .then(function (response) {
        setReview(response.data.data);
      })

      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const ref = useRef(null);
  const HideReviews = () => {
    setIsOpen(false);
  };
  const OpenIframe = () => {
    setHideBlocks(!hideBlocks);
  };

  useEffect(() => {
    if (hideBlocks === true) {
      IframeBlock.current.classList.add(`${style.open}`);
      iframebtn.current.classList.add(`${style.btnActive}`);
    }
    if (hideBlocks === false) {
      IframeBlock.current.classList.remove(`${style.open}`);
      iframebtn.current.classList.remove(`${style.btnActive}`);
    }
  }, [hideBlocks]);

  const IframeBlock = useRef(null);
  const iframebtn = useRef(null);
  const main = useRef(null);

  const ShowReviews = () => {
    setIsOpen(true);
    main.current.classList.add(`${style.pupActive}`);
  };

  useEffect(()=>{
  if(isOpen != true) {
    main.current.classList.remove(`${style.pupActive}`);
  }
  },[isOpen])

  const setDimension = () => {
    getDimension({
      dynamicWidth: window.innerWidth,
      dynamicHeight: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", setDimension);
    return () => {
      window.removeEventListener("resize", setDimension);
    };
  }, [screenSize]);

  return (
    <div className={style.itemPage} ref={main}>
      {isOpen && (
        <React.Suspense
          fallback={
            <h1
              style={{
                color: "white",
                textAlign: "center",
                fontSize: "15px",
              }}
            >
              ...Loading
            </h1>
          }
        >
          <AddComment HideReviews={HideReviews} id={item.data.id} />
        </React.Suspense>
      )}
      <div className={style.itemPage__container} ref={ref}>
        <div className={style.itemPage__container__exchangeInfo}>
          {Object.keys(item.data.logo).length !== 0 ? (
            <React.Suspense
              fallback={
                <h1
                  style={{
                    color: "white",
                    textAlign: "center",
                    fontSize: "15px",
                  }}
                >
                  ...Loading
                </h1>
              }
            >
              {" "}
              <ImageComponent imageInfo={item.data.logo} />
            </React.Suspense>
          ) : (
            <h1 className={style.empty__header}>{item.data.name}</h1>
          )}
          <h1 className={style.itemPage__container__header}>
            {item.data.name}
          </h1>
          <React.Suspense
          fallback={
            <h1
              style={{
                color: "white",
                textAlign: "center",
                fontSize: "15px",
              }}
            >
              ...Loading
            </h1>}>
            <ToggleToFavorite itemid={item.data.id}/>

            </React.Suspense>
        </div>
        <button
          className={style.itemPage__container__items__item__iframebtn}
          onClick={OpenIframe}
          ref={iframebtn}
        />
        <div className={style.itemPage__container__items}>
          <div
            className={style.itemPage__container__items__item}
            ref={IframeBlock}
          >
            {Object.keys(item.data.iframe.src).length === 0 ? (
              <h1 className={style.empty}>{item.data.name}</h1>
            ) : (
              <iframe
                src={item.data.iframe.src}
                className={style.itemPage__container__Iframe}
              />
            )}
          </div>
          {hideBlocks !== true && (
            <ItemPageInfoBlock item={item} ShowReviews={ShowReviews} />
          )}
          {hideBlocks !== true && <ItemPageExchangerDescription item={item} />}
        </div>
        <div className={style.itemPage__exchangermarks}>
          <h1>Метки обменника {item.data.name}:</h1>
          <div>
            {Object.keys(item.data.mark_types).length != 0 ? (
              <Marks prop={item.data.mark_types} />
            ) : (
              <p>меток нет</p>
            )}
          </div>
        </div>
      </div>
      <div className={style.itemPage__comments}>
        <h1 className={style.itemPage__reviews__header}>
          Отзывы {item.data.name}
        </h1>
        {review != null ? (
          review.map((item) => (
            
            <Comments props={item} key={item.id} review={setReview} w={screenSize.dynamicWidth < 1090 ? "70%" : "30%"} />
          ))
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};
