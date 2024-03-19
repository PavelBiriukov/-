import React from 'react';
import { BrowserRouter, Route, Routes, } from 'react-router-dom';
import PostPage from './components/PostPage/PostPage';
import Posts from './components/Posts/Posts';
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Posts/>} />
        <Route path="/posts/:id" element={<PostPage />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;