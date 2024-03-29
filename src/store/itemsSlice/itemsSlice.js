import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  items2: [],
  filltered: [],
  filltered2: [],
  itemId: "",
  itemExchangeRates: [],
  exchangeId: "",
  exchange: "",
  item: "",
  variants: [],
  currentFrom: "",
  currentTo: "",
  result: [],
  result2: [],
  statistics: [],
  calculated: false,
  loginStatus: "",
  perHour:'',
  isTwice:false,
  twiceExchanger:[],
  stat:[],
  tooltip:undefined,
  exchangerMarks:'',
  isFilltersClear:true,
};

const itemsSlice = createSlice({
  name: "itemList",
  initialState,
  reducers: {
    setItemsReducer(state, action) {
      state.items = action.payload;
    },
    setItems2Reducer(state, action) {
      state.items2 = action.payload;
    },
    setitemIdReducer(state, action) {
      state.itemId = action.payload;
    },
    setitemExchangeRatesReducer(state, action) {
      state.itemExchangeRates = action.payload;
    },
    setitemexchangeIdReducer(state, action) {
      state.exchangeId = action.payload;
    },
    setitemexchangeReducer(state, action) {
      state.exchange = action.payload;
    },
    setItemReducer(state, action) {
      state.item = action.payload;
    },
    setVariantsReducer(state, action) {
      state.variants = action.payload;
    },
    setCurrentItemFromReducer(state, action) {
      state.currentFrom = action.payload;
    },
    setCurrentItemToReducer(state, action) {
      state.currentTo = action.payload;
    },
    setFillterItemsToReducer(state, action) {
      state.variants = state.variants.filter((item) =>
        item.to.toLowerCase().includes(action.payload.toLocaleLowerCase())
      );
    },
    setFillterItemsReducer(state, action) {
      state.filltered = state.items.filter((item) =>
        item.currency.toLowerCase().includes(action.payload.toLocaleLowerCase())
      );
    },
    setFillterItems2Reducer(state, action) {
      state.filltered2 = state.items2.filter((item) =>
        item.currency.toLowerCase().includes(action.payload.toLocaleLowerCase())
      );
    },
    setResult(state, action) {
      state.result = action.payload;
    },
    setResult2(state, action) {
      state.result2 = action.payload;
    },
    setCalculated(state, action) {
      state.calculated = action.payload;
    },
    setLoginStatus(state, action) {
      state.loginStatus = action.payload;
    },
    setStatisticPerHour(state, action) {
      state.perHour = action.payload;
    },
    setisTwice(state, action) {
      state.isTwice = action.payload;
    },
    setTwiceExchanger(state, action) {
      state.twiceExchanger = action.payload;
    },
    setStatistic(state, action) {
      state.stat = action.payload;
    },
    setTooltip(state, action) {
      state.tooltip = action.payload;
    },
    setEchangerMarks(state,action) {
      state.exchangerMarks = action.payload
    },
    setIsFilltersClear(state,action) {
      state.isFilltersClear = action.payload
    }
  },
});

export const {
  setItemsReducer,
  setItems2Reducer,
  setFillterItemsReducer,
  setFillterItems2Reducer,
  setitemIdReducer,
  setitemExchangeRatesReducer,
  setitemexchangeIdReducer,
  setitemexchangeReducer,
  setItemReducer,
  setVariantsReducer,
  setFillterItemsToReducer,
  setCurrentItemFromReducer,
  setCurrentItemToReducer,
  setResult,
  setResult2,
  setCalculated,
  setLoginStatus,
  setStatisticPerHour,
  setTwiceExchanger,
  setisTwice,
  setStatistic,
  setTooltip,
  setEchangerMarks,
  setIsFilltersClear
} = itemsSlice.actions;

export default itemsSlice.reducer;
