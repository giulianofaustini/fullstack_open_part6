import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNotificationDispatch } from '../NotificationContext';

import { createAnecdotes } from '../requests';

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const dispatch = useNotificationDispatch();

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdotes,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes']);
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote));
      dispatch({
        type: 'SET_NOTIFICATION',
        payload: `'${newAnecdote.content}' has been created`,
      });
      console.log(`Created new anecdote in newAnecdoteMutation is : ${newAnecdote.content}`)
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NOTIFICATION' });
      }, 5000);
    },
    onError: (err) => {
      dispatch({
        type: 'SET_NOTIFICATION',
        payload: err.response.data.error,
      });
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    
    if (content.length < 5) {
      dispatch({
        type: 'SET_NOTIFICATION',
        payload: 'The anecdote must be at least 5 characters long. Try again',
      });
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NOTIFICATION' });
      }, 5000);
    } else {
      newAnecdoteMutation.mutate({ content, votes: 0 });
    }
  };

  return (
    <div>
      <h3>Create New Anecdote</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
