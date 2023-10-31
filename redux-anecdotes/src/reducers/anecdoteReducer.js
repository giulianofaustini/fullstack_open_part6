import { createSlice } from "@reduxjs/toolkit";

import anecdoteService from '../services/anecdotes'

// const anecdotesAtStart = [
//   "If it hurts, do it more often",
//   "Adding manpower to a late software project makes it later!",
//   "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
//   "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
//   "Premature optimization is the root of all evil.",
//   "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
// ];
// const getId = () => (100000 * Math.random()).toFixed(0);
// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0,
//   };
// };

// export const initialState = anecdotesAtStart.map(asObject);

const anecdoteSlice = createSlice({
  name: "anecdote",
  initialState: [],
  reducers: {
    //    voteAnecdote(state, action) {
    //     console.log('state in vote anecdote slice:', JSON.parse( JSON.stringify(state)))
    //     console.log('action in vote anecdote slice:', action)
    //   const id = action.payload.id;
    //   const updateAnecdotesByVote = state.map((anecdote) =>
    //     anecdote.id !== id
    //       ? anecdote
    //       : { ...anecdote, votes: anecdote.votes + 1 }
    //   );
    //   updateAnecdotesByVote.sort((a, b) => b.votes - a.votes);
    //   return updateAnecdotesByVote; 
    // },
    // createAnecdote(state, action) {
    //   console.log('state in create anecdote slice:', JSON.parse( JSON.stringify(state)))
    //   console.log('action in create anecdote slice:', action)
    //   state.push(action.payload)
    //   console.log('state in create anecdote slice:', JSON.parse( JSON.stringify(state)))
    // },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
  },
}
});

export const {  appendAnecdote, setAnecdotes} = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    const sortedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes)
    dispatch(setAnecdotes(sortedAnecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = (id, content, updatedVotes) => {
  return async (dispatch, getState) => {
    const state = getState();
    const anecdotes = state.anecdotes;
    console.log('these are the anecdotes in vote anecdotes before the votes being uppdated:' , anecdotes)
    const anecdoteToUpdate = anecdotes.find((a) => a.id === id);
    console.log('this is the selected anecdote in vote anecdotes to be updated:' , anecdoteToUpdate)
    if (anecdoteToUpdate) {
      await anecdoteService.updateVotes(id, content, updatedVotes);
      const updatedAnecdotes = anecdotes.map((a) =>
        a.id === id ? { ...a, votes: updatedVotes } : a
      );
      const updateAnecdotesByVote = updatedAnecdotes.sort((a , b) => b.votes - a.votes)

      dispatch(setAnecdotes(updateAnecdotesByVote));
    }
  };
};



export default anecdoteSlice.reducer;











// export const voteAnecdote = (id) => {
//   return {
//     type: 'VOTE',
//     data: { id }
//   }
// }

// export const createAnecdote = (content) => {
//   return {
//     type: 'CREATE_ANECDOTE',
//     data: {
//       content,
//       id: getId(),
//       votes: 0
//     }
//   }
// }

// const reducer = (state = initialState, action) => {
//   console.log('state now: ', state)
//   console.log('action', action)

//   switch (action.type) {
//     case 'VOTE':
//       const id = action.data.id
//       const updateAnecdotesByVote = state.map((anecdote) => (
//         anecdote.id !== id ? anecdote : { ...anecdote, votes: anecdote.votes + 1}
//       ))
//       updateAnecdotesByVote.sort(( a , b ) => b.votes - a.votes )
//       return updateAnecdotesByVote

//       case 'CREATE_ANECDOTE': {
//         return [...state, action.data]
//       }

//     default :
//     return state
//   }
// }

// export default reducer
