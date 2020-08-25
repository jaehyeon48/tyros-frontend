import {
  CHECK_MARKET_STATUS,
  CHECK_MARKET_STATUS_ERROR,
  GET_STOCK_LIST,
  GET_STOCK_ERROR,
  ADD_STOCK,
  EDIT_DAILY_PL,
  EDIT_OVERALL_PL,
  LOGOUT,
} from '../actions/actionTypes';

const initialState = {
  stockList: [],
  isMarketOpen: null
};

const compare = (a, b) => {
  if (a.ticker > b.ticker) {
    return 1;
  }
  if (a.ticker < b.ticker) {
    return -1;
  }
  return 0;
}

export default function stockReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CHECK_MARKET_STATUS:
      return {
        ...state,
        isMarketOpen: payload
      };
    case GET_STOCK_LIST:
      return {
        ...state,
        stockList: payload
      };
    case GET_STOCK_ERROR:
      return {
        ...state,
        stockList: []
      };
    case EDIT_DAILY_PL:
      const tickerObjDaily = state.stockList.filter(stock => stock.ticker === payload.ticker);
      const otherStocksDaily = state.stockList.filter(stock => stock.ticker !== payload.ticker);
      tickerObjDaily[0].dailyPL = payload.dailyPL;
      const newStockListDaily = [...tickerObjDaily, ...otherStocksDaily].sort(compare);
      return {
        ...state,
        stockList: newStockListDaily
      };
    case EDIT_OVERALL_PL:
      const tickerObjOverall = state.stockList.filter(stock => stock.ticker === payload.ticker);
      const otherStocksOverall = state.stockList.filter(stock => stock.ticker !== payload.ticker);
      tickerObjOverall[0].overallPL = payload.overallPL;
      const newStockListOverall = [...tickerObjOverall, ...otherStocksOverall].sort(compare);
      return {
        ...state,
        stockList: newStockListOverall
      };
    case LOGOUT:
      return {
        stockList: [],
        isMarketOpen: null
      };
    case ADD_STOCK:
    case CHECK_MARKET_STATUS_ERROR:
    default:
      return state;
  }
}