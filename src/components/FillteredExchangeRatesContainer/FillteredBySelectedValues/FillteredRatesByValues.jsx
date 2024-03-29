import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Marks } from "../../Marks/Marks";
import style from "./FillteredExchange.module.scss";
const EmptyCourses = React.lazy(() =>
  import("../../EmptyCourses/EmptyCourses")
);
export default function FillteredBySelectedValues({ itemExchangeRates }) {
  const navigate = useNavigate();
  const [screenSize, getDimension] = React.useState({
    dynamicWidth: window.innerWidth,
    dynamicHeight: window.innerHeight,
  });

  const setDimension = () => {
    getDimension({
      dynamicWidth: window.innerWidth,
      dynamicHeight: window.innerHeight,
    });
  };

  React.useEffect(() => {
    window.addEventListener("resize", setDimension);
    return () => {
      window.removeEventListener("resize", setDimension);
    };
  }, [screenSize]);

  const goToItemPage = ({ id }) => {
    navigate(`/ExchangerPage/${id}`);
  };

  return itemExchangeRates.length === 0 ? (
    <React.Suspense fallback={<h1>loading</h1>}>
      <EmptyCourses />
    </React.Suspense>
  ) : (
    <tbody className={style.table}>
      {itemExchangeRates.map((item) => (
        <tr className={style.table__row}>
          <td className={style.table__row__box}>
            <div className={style.table__row__box__exchanger}>
              <button
                onClick={() => goToItemPage(item.exchanger)}
                className={style.table__row__box__exchangerinfo}
              />
              <p onClick={() => openItemSite(item.exchanger.site_url)}>
                {item.exchanger.name}
              </p>
            </div>
          </td>

          <td className={style.table__row__box}>
            <div className={style.table__row__box__flexbox}>
              <p>{(Math.round(item.in * 100) / 100).toFixed(2)}</p>
              <p className={style.table__row__box__smalltext}>{item.from}</p>
            </div>
          </td>
          <td className={style.table__row__box}>
            <div className={style.table__row__box__flexbox}>
              <p>{(Math.round(item.out * 100) / 100).toFixed(2)}</p>
              <p className={style.table__row__box__smalltext}>{item.to}</p>
            </div>
          </td>
          <td className={style.table__row__box}>
            <p>{(Math.round(item.amount * 100) / 100).toFixed(2)}</p>
          </td>
          <td className={style.table__row__box}>
            <div className={style.table__row__box__comments}>
              <p>{item.exchanger.user_reviews}</p>
              /
              <p
              >
                ({item.exchanger.count_reviews})
              </p>
            </div>
          </td>
          <td className={style.table__row__box}>
            <p
              style={{
                color:
                  item.exchanger.status.title === "Работает"
                    ? "#00FF7F"
                    : "red",
              }}
            >
              {item.exchanger.status.title}
            </p>
          </td>
        </tr>
      ))}
    </tbody>
  );
}

/*          <td className={style.table__row__box}>
          {item.marks.length != 0 ? <Marks prop={item.marks} /> : 'меток нет'}
          </td>
                          style={{
                  color: item.exchanger.count_reviews == 0 && "red",
                }}*/
