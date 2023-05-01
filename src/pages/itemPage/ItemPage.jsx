import React, { useEffect, useState, useRef } from "react";
import style from "./ItemPage.module.scss";
import { Header } from "../../components/Header/Header";
import axios from "axios";
import { useLoaderData } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Comments } from "../../components/Comments/Comments";
import { Footer } from "../../components/Footer/Footer";
import { AddComment } from "../../components/AddComment/AddComment";
import StarRatings from "react-star-ratings";
import { LoadingSpin } from "../../components/LoadingSpin/LoadingSpin";
import { useSelector } from "react-redux";
import { ExchangerAccountNavigation } from "../../components/ExchangerAccountNavigation/ExchangerAccountNavigation";
import { ImageComponent } from "../../components/ImageComponent/Image";
import { useDispatch } from "react-redux";
import { setUserRole } from "../../store/userAccountSlice/AccountSlice";


export const exchangeLoader = async ({ params }) => {
  const id = params.id;
  const res = await fetch(
    `http://146.59.87.222/api/exchangers/get?exchanger_id=${id}`
  );
  const item = await res.json();
  return { id, item };
};

export const ItemPage = () => {
  const dispatch = useDispatch();
  const { item } = useLoaderData();
  const navigateToSite = (url) => {
    window.open(`${url}`);
  };
  const navigate = useNavigate();
  const [review, setReview] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [load, setLoad] = useState(true);

  const { isExchangerRole } = useSelector((state) => ({
    isExchangerRole: state.AccountSlice.isExchangerRole,
  }));

  useEffect(() => {
    axios
      .get(
        `http://146.59.87.222/api/reviews/get?sort=desc&orderBy=id&limit=5&exchanger_id=${item.data.id}`
      )
      .then(function (response) {
        setReview(response.data.data);
      })

      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const ref = useRef(null)

  const ShowReviews = () => {
    setIsOpen(true);


  };
  const HideReviews = () => {
    setIsOpen(false);

  };
  let height = window.screen.height;

  setTimeout(() => {
    setLoad(false);
  }, 4000);

  const imageData = {
    basename: item.data.logo.basename,
    extension: item.data.logo.extension,
    height: item.data.logo.height,
    mimeType: item.data.logo.mimeType,
    path: item.data.logo.path,
    width: item.data.logo.width,
  };

  console.log(isExchangerRole);
  const role = localStorage.getItem("userRole");
  const jwt = localStorage.getItem("jwt");
  console.log(jwt);

  useEffect(() => {
    if (jwt !== null && role !== null && role === "exchanger") {
      dispatch(setUserRole(true));
    } else dispatch(setUserRole(false));
  }, [jwt, role]);


  return (
    <div className={style.itemPage}>
      {isOpen && (
        <AddComment HideReviews={HideReviews} id={item.data.id} h={height} />
      )}
      <Header />
      {isExchangerRole === true && <ExchangerAccountNavigation />}
      <div className={style.itemPage__container} ref={ref} >
        <div className={style.itemPage__container__exchangeInfo}>
          <ImageComponent imageInfo={imageData} />
          <h1 className={style.itemPage__container__header}>
            {item.data.name}
          </h1>
          <a
            href={item.data.site_url}
            className={style.itemPage__container__link}
          >
            {" "}
            {item.data.site_url}
          </a>
        </div>

        <div className={style.itemPage__container__items}>
          <div className={style.itemPage__container__items__item}>
            {load === true && <LoadingSpin />}

            <iframe
              src={item.data.iframe.src}
              className={
                load !== false ? style.itemPage__container__Iframe : style.show
              }
            />
          </div>
          <div className={style.itemPage__container__items__item2}>
            <div className={style.itemPage__container__items__item2__container}>
              <div
                className={
                  style.itemPage__container__items__item2__container__status
                }
              >
                <h1
                  className={
                    style.itemPage__container__items__item2__container__status__header
                  }
                >
                  Статус:
                </h1>
                <h1
                  style={{ borderColor: `${item.data.status.color}` }}
                  className={
                    style.itemPage__container__items__item2__container__status__header2
                  }
                >
                  {item.data.status.title}
                </h1>
              </div>
              <div
                className={
                  style.itemPage__container__items__item2__container__status
                }
              >
                <h1
                  className={
                    style.itemPage__container__items__item2__container__status__header
                  }
                >
                  Сумма резервов:
                </h1>
                <h1
                  className={
                    style.itemPage__container__items__item2__container__status__headerInfo
                  }
                >
                  {item.data.sum_reserves} &#8381;
                </h1>
              </div>
              <div
                className={
                  style.itemPage__container__items__item2__container__status
                }
              >
                <h1
                  className={
                    style.itemPage__container__items__item2__container__status__header
                  }
                >
                  Доступность:
                </h1>
                <h1
                  className={
                    style.itemPage__container__items__item2__container__status__headerInfo
                  }
                >
                  {item.data.access}
                </h1>
              </div>
              <div
                className={
                  style.itemPage__container__items__item2__container__status
                }
              >
                <h1
                  className={
                    style.itemPage__container__items__item2__container__status__header
                  }
                >
                  Курсов обменов:
                </h1>
                <h1
                  className={
                    style.itemPage__container__items__item2__container__status__headerInfo
                  }
                >
                  {item.data.count_reviews}
                </h1>
              </div>
              <div
                className={
                  style.itemPage__container__items__item2__container__status
                }
              >
                <h1
                  className={
                    style.itemPage__container__items__item2__container__status__header
                  }
                >
                  Возраст:
                </h1>
                <h1
                  className={
                    style.itemPage__container__items__item2__container__status__headerInfo
                  }
                >
                  {item.data.age}
                </h1>
              </div>
              <div
                className={
                  style.itemPage__container__items__item2__container__status
                }
              >
                <h1
                  className={
                    style.itemPage__container__items__item2__container__status__header
                  }
                >
                  Страна:
                </h1>
                <h1
                  className={
                    style.itemPage__container__items__item2__container__status__headerInfo
                  }
                >
                  {item.data.country}
                </h1>
              </div>
              <div
                className={
                  style.itemPage__container__items__item2__container__status
                }
              >
                <h1
                  className={
                    style.itemPage__container__items__item2__container__status__header
                  }
                >
                  Отзывы:
                </h1>
                <h1
                  className={
                    style.itemPage__container__items__item2__container__status__headerInfo
                  }
                >
                  0/69
                </h1>
              </div>
              <button
                className={style.itemPage__container__Addreview}
                onClick={() => ShowReviews()}
              >
                Оставить отзыв об обменнике →
              </button>
            </div>
          </div>
          <div className={style.itemPage__container__items__item3}>
            <h1 className={style.itemPage__container__items__item3__review}>
              Описание обменника от администратора Change.Pro{" "}
            </h1>
            <p className={style.itemPage__container__items__item3__text}>
              {item.data.description}
            </p>
            <div
              className={style.itemPage__container__items__item3__rating__box}
            >
              <StarRatings
                rating={item.data.rating}
                starRatedColor="yellow"
                numberOfStars={10}
                starDimension={15}
                starSpacing={3}
                name="rating"
              />
              <p className={style.itemPage__container__items__item3__rating}>
                Рейтинг на Change.Pro {item.data.rating} /10
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={style.itemPage__comments}>
        <h1 className={style.itemPage__reviews__header}>
          Отзывы {item.data.name}
        </h1>
        {review != null ? (
          review.map((item) => <Comments props={item} review={review} />)
        ) : (
          <div></div>
        )}
      </div>
      <Footer />
    </div>
  );
};
