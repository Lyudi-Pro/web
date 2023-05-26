import React, { useRef, useEffect, useState } from "react";
import style from "./allExchange.module.scss";
import { useLoaderData } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Marks } from "../../components/Marks/Marks";
import validateInputValueForSearch from "./js/searchValidatorhelper";
export const exchangersLoader = async () => {
  const res = await fetch(
    `https://change.pro/api/exchangers/currencies/get?orderBy=amount&sort=asc`
  );
  const item = await res.json();
  return { item };
};

export const AllEchangers = () => {
  const { item } = useLoaderData();
  const [result, setResultExchangers] = useState([]);
  const [inputVal, setInputVal] = useState("");
  const [inputVal2, setInputVal2] = useState("");
  const [variants, setVariants] = useState([]);
  const [variants2, setVariants2] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [searchResult2, setSearchResult2] = useState([]);
  const [selected, setSelected] = useState([]);
  const [selected2, setSelected2] = useState([]);
  const ref = useRef(null);
  const ref2 = useRef(null);

  const { currentTo, currentFrom } = useSelector((state) => ({
    currentTo: state.itemsSlice.currentTo,
    currentFrom: state.itemsSlice.currentFrom,
  }));

  const changeValueForSearch = (e) => {
    const newVal = validateInputValueForSearch(e.target.value);
    setInputVal(newVal);
  };
  const changeValue2ForSearch = (e) => {
    const newVal = validateInputValueForSearch(e.target.value);
    setInputVal2(newVal);
  };

  useEffect(() => {
    if (selected.length == 0) {
      setResultExchangers(item.data);
      const getCurrenciesAll = setInterval(() => {
        axios
          .get(
            `https://change.pro/api/exchangers/currencies/get?orderBy=amount&sort=asc`
          )
          .then(function (response) {
            setResultExchangers(response.data.data);
          });
      }, 5000);
      return () => clearInterval(getCurrenciesAll);
    }
  }, [item, selected, selected2]);

  useEffect(() => {
    axios
      .get(`https://change.pro/api/exchangers/currencies/list`)
      .then(function (response) {
        setVariants(response.data.data);
      })
      .catch(function (error) {});
  }, []);

  useEffect(() => {
    axios
      .get(`https://change.pro/api/exchangers/currencies/list`)
      .then(function (response) {
        setVariants2(response.data.data);
      })
      .catch(function (error) {});
  }, []);

  const openItemSite = (url) => {
    window.open(`${url}`);
  };

  useEffect(() => {
    setSearchResult(
      variants.filter((item) =>
        item.currency.toLowerCase().includes(inputVal.toLocaleLowerCase())
      )
    );
  }, [inputVal, variants]);

  useEffect(() => {
    setSearchResult2(
      variants2.filter((item) =>
        item.currency.toLowerCase().includes(inputVal2.toLocaleLowerCase())
      )
    );
  }, [inputVal2, variants2]);

  const currencyFromMainMenu = React.useMemo(() => currentFrom, [currentFrom]);
  const currencyToMainMenu = React.useMemo(() => currentTo, [currentTo]);

  useEffect(() => {
    if (currencyFromMainMenu != undefined && currencyToMainMenu != undefined) {
      axios
        .get(
          `https://change.pro/api/exchangers/currencies/get?orderBy=out&sort=desc&from=${currencyFromMainMenu}&to=${currencyToMainMenu}&limit=50`
        )
        .then(function (response) {
          setResultExchangers(response.data.data);
        })
        .then(function (response) {})
        .catch(function (error) {});
    }
    axios
      .get(
        `https://change.pro/api/exchangers/currencies/get?orderBy=out&sort=desc&from=${selected}&to=${selected2}&limit=50`
      )
      .then(function (response) {
        setResultExchangers(response.data.data);
      })
      .then(function (response) {})
      .catch(function (error) {});
    const get = setInterval(() => {
      axios
        .get(
          `https://change.pro/api/exchangers/currencies/get?orderBy=out&sort=desc&from=${selected}&to=${selected2}&limit=50`
        )
        .then(function (response) {
          setResultExchangers(response.data.data);
        })
        .then(function (response) {})
        .catch(function (error) {});
    }, 3000);

    return () => clearInterval(get);
  }, [selected, selected2, currencyFromMainMenu, currencyToMainMenu]);

  const setFrom = (e) => {
    setSelected(e.target.textContent);
  };

  const setTo = (e) => {
    setSelected2(e.target.textContent);
  };

  useEffect(() => {
    if (selected.length != 0 && ref.current != null) {
      ref.current.classList.add(`${style.hide}`);
    }
    if (selected2.length != 0 && ref2.current != null) {
      ref2.current.classList.add(`${style.hide}`);
    }
  }, [selected, selected2]);

  
  return (
    <div className={style.Exchangers}>
      <div className={style.Exchangers__content}>
        <div className={style.Exchangers__content__body}>
          <div className={style.Exchangers__content__body__seacrh}>
            <div className={style.Exchangers__content__body__seacrh__fields}>
              <div className={style.Exchangers__content__body__seacrh__input}>
                <div
                  className={
                    style.Exchangers__content__body__seacrh__input__controlls
                  }
                >
                  <input
                    onChange={(e) => changeValueForSearch(e)}
                    className={
                      style.Exchangers__content__body__seacrh__input__field
                    }
                    placeholder="Отдаете"
                    name="currencyFrom"
                  />
                  <button
                    className={
                      style.Exchangers__content__body__seacrh__input__btn
                    }
                  />
                </div>
                {inputVal.length != 0 && searchResult.length != 0 && (
                  <div
                    ref={ref}
                    className={
                      style.Exchangers__content__body__seacrh__input__results
                    }
                  >
                    {searchResult.map((item) => (
                      <h1 onClick={(e) => setFrom(e)}>{item.currency}</h1>
                    ))}
                  </div>
                )}
              </div>
              <div
                className={
                  style.Exchangers__content__body__seacrh__fields__separate
                }
              ></div>
              <div className={style.Exchangers__content__body__seacrh__input}>
                <div
                  className={
                    style.Exchangers__content__body__seacrh__input__controlls
                  }
                >
                  <input
                    onChange={(e) => changeValue2ForSearch(e)}
                    className={
                      style.Exchangers__content__body__seacrh__input__field
                    }
                    placeholder="Получаете"
                    name="currencyTo"
                  />
                  <button
                    className={
                      style.Exchangers__content__body__seacrh__input__btn
                    }
                  />
                </div>
                {inputVal2.length != 0 && searchResult2.length != 0 && (
                  <div
                    ref={ref2}
                    className={
                      style.Exchangers__content__body__seacrh__input__results
                    }
                  >
                    {searchResult2.map((item) => (
                      <h1 onClick={(e) => setTo(e)}>{item.currency}</h1>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className={style.Exchangers__content__body__seacrh__selected}>
            <span
              className={
                style.Exchangers__content__body__seacrh__selected__name
              }
            >
              {currencyFromMainMenu != ''
                ? `${currencyFromMainMenu}`
                : `${selected}`}
            </span>
            <span
              className={
                style.Exchangers__content__body__seacrh__selected__name
              }
            >
              {
              currencyToMainMenu != ''
                ? `${currencyToMainMenu}`
                : `${selected2}`}
            </span>
          </div>
          <nav className={style.Exchangers__content__body__nav}>
            <h1 className={style.Exchangers__content__body__nav__name}>
              Обменники
            </h1>
            <h1 className={style.Exchangers__content__body__nav__from}>
              Отдаете ↑
            </h1>
            <h1 className={style.Exchangers__content__body__nav__to}>
              Получаете ↓
            </h1>
            <h1 className={style.Exchangers__content__body__nav__reserve}>
              Резерв
            </h1>
            <h1 className={style.Exchangers__content__body__nav__comments}>
              Отзывы
            </h1>
            <h1 className={style.Exchangers__content__body__nav__status}>
              Статус
            </h1>
          </nav>
          {result.map((item) => (
            <div className={style.Exchangers__content__body__block}>
              <div className={style.Exchangers__content__body__block__name}>
                <Link
                  to={`/${item.exchanger.id}`}
                  className={style.Exchangers__content__body__block__goToPage}
                />
                <p onClick={() => openItemSite(item.exchanger.site_url)}>
                  {item.exchanger.name}
                </p>
              </div>
              {item.marks.length != 0 && <Marks prop={item.marks} />}
              <div className={style.Exchangers__content__body__block__from}>
                <p>1</p>
                <p>{item.from}</p>
              </div>
              <div className={style.Exchangers__content__body__block__to}>
                <p>{(Math.round(item.out * 100) / 100).toFixed(2)}</p>
                <p>{item.to}</p>
              </div>
              <div className={style.Exchangers__content__body__block__reserve}>
                <p>{(Math.round(item.amount * 100) / 100).toFixed(2)}</p>
              </div>
              <div className={style.Exchangers__content__body__block__comments}>
                <p>{item.exchanger.user_reviews}</p>
                <p
                  className={
                    style.Fillters__categories__body__content__comment__header
                  }
                  style={
                    item.exchanger.count_reviews == 0
                      ? { color: "red" }
                      : { color: "white" }
                  }
                >
                  ({item.exchanger.count_reviews})
                </p>
              </div>
              <div
                className={style.Fillters__categories__body__content__status}
              >
                <p
                  className={
                    style.Fillters__categories__body__content__status__header
                  }
                >
                  {item.exchanger.status.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
