import React from 'react';
import { Search } from './components/search/Search';
import { Books } from './components/books/Books';
import './css/App.css';
import './css/icon.css'

function App() {
  return (
      <div className="App">
          <Search/>
          <Books/>
      </div>
  );
}

export default App;
