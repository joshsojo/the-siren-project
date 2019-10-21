import { all, call, put, takeLatest } from "redux-saga/effects";

import headlineTypes from "./headline.types";
import {
  fetchTopHeadlinesSuccess,
  fetchShuffledHeadlinesSuccess,
  fetchTopHeadlinesFailure,
  fetchSingleHeadlineSuccess,
  fetchSingleHeadlineFailure
} from "./headline.action";

const API_KEY = "5871814cd94a40fa9bca75cce204c2cd";

export function* shuffleHeadlines(headlines) {
  const filteredHeadlines = yield [];
  let randomNumbers = yield [];
  let numberOfTimes = yield 6;
  for (let i = 0; i < numberOfTimes; i++) {
    const rand1 = yield Math.floor(Math.random() * headlines.length);
    if (randomNumbers.includes(rand1)) {
      numberOfTimes += 1;
      continue;
    } else {
      randomNumbers.push(rand1);
      filteredHeadlines.push(headlines[rand1]);
    }
  }
  yield put(fetchShuffledHeadlinesSuccess(filteredHeadlines));
}

export function* fetchTopHeadlines() {
  try {
    const response = yield fetch(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
    );
    const result = yield response.json();
    if (result.status === "ok") {
      const articles = yield result.articles;
      yield shuffleHeadlines(articles);
      yield put(fetchTopHeadlinesSuccess(articles));
    }
  } catch (error) {
    yield put(fetchTopHeadlinesFailure(error));
    return;
  }
}

export function* fetchSingle({ payload: { headline, category } }) {
  const headlineCategory = yield category;
  const title = yield headline.title.toLowerCase();
  const headlineResult = yield headlineCategory.headlines.filter(
    headline => headline.title.toLowerCase() === title
  );
  if (!headlineResult) {
    return put(fetchSingleHeadlineFailure("Headline not found"));
  }
  const newHeadlineResult = headlineResult[0];
  yield put(fetchSingleHeadlineSuccess(newHeadlineResult));
}

export function* onFetchTopHeadlinesStart() {
  yield takeLatest(headlineTypes.FETCH_TOP_HEADLINES_START, fetchTopHeadlines);
}

export function* onFetchSingleHeadlineStart() {
  yield takeLatest(headlineTypes.FETCH_SINGLE_HEADLINE_START, fetchSingle);
}

export function* headlineSagas() {
  yield all([call(onFetchTopHeadlinesStart), call(onFetchSingleHeadlineStart)]);
}
