import React, { useRef, useState, useEffect } from "react";
import style from "./Fillters.module.scss";
import { Calculator } from "../Calculator/Calculator";
import { Statistics } from "../Statistics/Statistics";
import axios from "axios";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setitemexchangeReducer } from "../../store/itemsSlice/itemsSlice";

export const Fillters = () => {
  const dispatch = useDispatch();
  const NavProps = [
    "Курсы обмена",
    "Калькулятор",
    "Оповещение",
    "Двойной обмен",
    "Статистика",
    "Настроить",
  ];
  const ref = useRef(null);
  const [open, setOpen] = useState(false);
  const { itemExchangeRates, exchangeId, exchange } = useSelector((state) => ({
    itemExchangeRates: state.itemsSlice.itemExchangeRates,
    exchangeId: state.itemsSlice.exchangeId,
    exchange: state.itemsSlice.exchange,
  }));

  const handleSelect = (e) => {
    const btnElements = document.querySelectorAll(
      `.${style.Fillters__navigation__item}`
    );
    e.target.classList.add(`${style.active}`);
    for (let i of btnElements) {
      if (i != e.target) {
        i.classList.remove(`${style.active}`);
      }
    }
    if (e.target.textContent == "Калькулятор") {
      ref.current.classList.add(`${style.Fillters__open}`);
    } else ref.current.classList.remove(`${style.Fillters__open}`);
    if (e.target.textContent == "Статистика") {
      setOpen(true);
    } else setOpen(false);
  };

  useEffect(() => {
    axios
      .get(`http://146.59.87.222/api/exchangers/get?exchanger_id=${exchangeId}`)
      .then(function (response) {
        dispatch(setitemexchangeReducer(response.data.data.name));
      })
      .catch(function (error) {});
  }, [exchangeId]);

  return (
    <div className={style.Fillters}>
      <nav className={style.Fillters__navigation}>
        <ul className={style.Fillters__navigation__items}>
          {NavProps.map((item) => (
            <li
              className={style.Fillters__navigation__item}
              onClick={(e) => handleSelect(e)}
            >
              {item}
            </li>
          ))}
        </ul>
      </nav>
      <div ref={ref} className={style.Fillters__inActive}>
        <Calculator />
      </div>
      {open != false ? (
        <Statistics />
      ) : (
        <div>
          <div className={style.Fillters__categories}>
            <h1 className={style.Fillters__categories__header}>Обменник ↑↓</h1>
            <h1 className={style.Fillters__categories__header}>Отдаете ↑</h1>
            <h1 className={style.Fillters__categories__header}>Получаете ↓</h1>
            <h1 className={style.Fillters__categories__header}>Резерв</h1>
            <h1 className={style.Fillters__categories__header}>Отзывы</h1>
          </div>
          <div className={style.Fillters__categories__body}>
            {itemExchangeRates.map((item) => (
              <div className={style.Fillters__categories__body__content}>
                <h1
                  className={style.Fillters__categories__body__content__header}
                >
                  {exchange}
                </h1>
                <div
                  className={
                    style.Fillters__categories__body__content__giveItAway
                  }
                >
                  <h1
                    className={
                      style.Fillters__categories__body__content__giveItAway__header
                    }
                  >
                    {Math.trunc(item.out)}
                  </h1>
                  <h1
                    className={
                      style.Fillters__categories__body__content__giveItAway__header
                    }
                  >
                    {item.from}
                  </h1>
                  <h1
                    className={
                      style.Fillters__categories__body__content__giveItAway__header
                    }
                  >
                    {item.minamount}
                  </h1>
                </div>
                <h1
                  className={style.Fillters__categories__body__content__header}
                >
                  {item.to}
                </h1>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
