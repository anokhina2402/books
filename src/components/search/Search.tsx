import React, { useState } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  getData,
  setQ,
  setCategory,
  setSort,
  search,
  getQ,
  getCategory,
  getSort,
  clearData
} from './searchSlice';
import './Search.css';

export function Search() {

  const q = useAppSelector(getQ);
  const category = useAppSelector(getCategory);
  const sort = useAppSelector(getSort);

  const dispatch = useAppDispatch();

  return (
      <div className="books-search-container row justify-content-center p-4">
        <div className="col-lg-7 col-md-10">
          <form onSubmit={(event) => {event.preventDefault(); dispatch(clearData()); dispatch(search({q: q, category: category, sort: sort, startIndex: 0}));}}>
            <div className="col-lg-10 col-md-12 col-10 text-center mb-1">
              <h1>Search for books</h1>
            </div>
            <div className="mx-sm-4">
              <div className="input-group mb-3">
                <input type="text" className="form-control books-search-input" placeholder="Enter the title of the book" name="q" onChange={(e) => dispatch(setQ(e.target.value))}/>
                <div className="input-group-append">
                  <button type="submit" className="button-none"><i className="books-icon books-icon-search"></i></button>
                </div>
              </div>
            </div>
            <div className="row justify-content-around">
              <div className="form-group row col-md-6  mb-2">
                <label className="col-sm-4 col-form-label">Categories</label>
                <div className="col-sm-8">
                  <select className="form-select books-select" name="category" defaultValue="all" onChange={(e) => dispatch(setCategory(e.target.value))}>
                    <option value="all">all</option>
                    <option value="art">art</option>
                    <option value="biography">biography</option>
                    <option value="computers">computers</option>
                    <option value="history">history</option>
                    <option value="medical">medical</option>
                    <option value="poetry">poetry</option>
                  </select>
                </div>
              </div>
              <div className="form-group row  col-md-6  mb-2">
                <label className="col-sm-4 col-form-label">Sorting by</label>
                <div className="col-sm-8">
                  <select className="form-select books-select"  name="sort" defaultValue="relevance" onChange={(e) => dispatch(setSort(e.target.value))}>
                    <option value="relevance">relevance</option>
                    <option value="newest">newest</option>
                  </select>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
  );
}
