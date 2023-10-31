import { useSelector, useDispatch  } from 'react-redux';
import { voteAnecdote } from "../reducers/anecdoteReducer";
// import { setNotification, clearNotification } from '../reducers/notificationReducer';
import { setTimeoutNot } from '../reducers/notificationReducer';


const AnecdoteList = () => {
  const dispatch = useDispatch();
    
  const anecdotes = useSelector(state => state.anecdotes);
  const filter = useSelector(state => state.filter);
  console.log('Filter in Redux state:', filter);
  console.log("Anecdotes in AnecdoteList:", anecdotes);
    
  const filteredAnecdotes = anecdotes.filter((anecdote) =>
  anecdote && anecdote.content && typeof anecdote.content === 'string' &&
  anecdote.content.toLowerCase().includes(filter.toLowerCase())
);
  

  // console.log("Content of filtered anecdotes:");
  // filteredAnecdotes.forEach((anecdote) => {
  //   console.log(anecdote.content);
  // });

  const vote = (id) => {
    const votedAnecdote = anecdotes.find((anecdote) => anecdote.id === id);
    if (votedAnecdote) {
      console.log("vote", id);
      dispatch(voteAnecdote(id, votedAnecdote.content, votedAnecdote.votes + 1)); 
      dispatch(setTimeoutNot(`Vote for "${votedAnecdote.content}" added` , 1));
      
    }
  };
  

  return (
    <div>
         <h2>Anecdotes</h2>
      {filteredAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList



