import React, { useState } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  getCategory,
  getData,
  getStartIndex,
  getQ,
  getSort,
  search,
  setStartIndex,
  setCurrentBook,
  getCurrentBook,
  getStatus
} from '../search/searchSlice';
import './Books.css';

export function Books() {

  const data = useAppSelector(getData);
  const q = useAppSelector(getQ);
  const category = useAppSelector(getCategory);
  const sort = useAppSelector(getSort);
  const startIndex = useAppSelector(getStartIndex);
  const currentBook = useAppSelector(getCurrentBook);
  const status = useAppSelector(getStatus);

  const dispatch = useAppDispatch();

  function BookList() {
    const listItems = data && data.items && data.items.map((item: any) =>
        <div className="book-item-container py-4 col-xl-3 col-md-4 col-6 col-lg-4"  key={item.id}>
          <div className="book-item-head">
            <a className="book-item-thumb" onClick={(event) => dispatch(setCurrentBook(item.id))}>
              <img className="result-item-image" src={item.volumeInfo && item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.smallThumbnail}/>
            </a>
          </div>
          <div className="book-item-body">
            <a className="book-item-title" onClick={(event) => dispatch(setCurrentBook(item.id))}>
              {item.volumeInfo && item.volumeInfo.title}
            </a>
            <div className="book-item-category b_light">{item.volumeInfo && item.volumeInfo.categories && item.volumeInfo.categories[0]}</div>
            <div className="book-item-author b_light">{item.volumeInfo && item.volumeInfo.authors && item.volumeInfo.authors.join(',')}</div>
          </div>
        </div>
    );
    return (
        <div className="book-items row mb-4">{listItems}</div>
    );
  }

  function CurrentBook() {
    return (
        <div className="current-book-container row p-4">
          <div className="current-book-img-container col-md-6 col-12 col-lg-6  p-2">
            <img className="current-book-image" src={currentBook.volumeInfo && currentBook.volumeInfo.imageLinks && currentBook.volumeInfo.imageLinks.medium}/>
          </div>
          <div className="current-book-body col-md-6 col-12 col-lg-6  p-2">
            <p className="current-book-title h2">
              {currentBook.volumeInfo && currentBook.volumeInfo.title}
            </p>
            <div className="current-book-category b_light">{currentBook.volumeInfo && currentBook.volumeInfo.categories && currentBook.volumeInfo.categories.join(' / ')}</div>
            <div className="current-book-author b_light">{currentBook.volumeInfo && currentBook.volumeInfo.authors && currentBook.volumeInfo.authors.join(', ')}</div>
            <div className="current-book-description" dangerouslySetInnerHTML={{__html: currentBook.volumeInfo && currentBook.volumeInfo.description}}></div>
          </div>
        </div>
    );
  }

  return (
    <div>
      {status === 'loading' &&
        <div className="loader"></div>
      }
      {typeof data.totalItems !== 'undefined' && !currentBook.id &&
      <div className="text-center">
        <p className="text-center h3 p-4">{data.totalItems > 0 ? `Found ${data.totalItems} ${data.totalItems > 1 ? 'books' : 'book'}` : 'Nothing found '}</p>
      </div>
      }
      {currentBook.id ?
          <CurrentBook/>
          :
          <BookList/>
      }
      {data.items && data.items.length > 0 && data.items.length < data.totalItems && !currentBook.id &&
        <div className="b_load_more text-center">
          <button className="btn b_btn b_btn_more" onClick={(event) => {
            dispatch(setStartIndex(startIndex + 30));
            dispatch(search({q: q, category: category, sort: sort, startIndex: startIndex + 30}));
          }}>Load more
          </button>
        </div>
      }
    </div>
  );
}
