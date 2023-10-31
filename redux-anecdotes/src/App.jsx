import { useEffect } from "react";
import anecdoteService from "./services/anecdotes";

import { AnecdoteForm } from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import { useDispatch } from "react-redux";
// import { setAnecdotes } from "./reducers/anecdoteReducer";

import {initializeAnecdotes} from './reducers/anecdoteReducer'

const App = () => {
  // console.log('Fetching anecdotes...')
  const dispatch = useDispatch();

  useEffect(() =>{
    dispatch(initializeAnecdotes())
  })

  // useEffect(() => {
  //   anecdoteService
  //     .getAll()
  //     .then((anecdotes) => {
  //       console.log('Anecdotes fetched:', anecdotes)
  //       dispatch(setAnecdotes(anecdotes))
  //     });
      
  // }, []);

  return (
    <div>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
