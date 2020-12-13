import React from "react";
import { connect } from "react-redux";
import { updateAnecdote } from "../reducers/anecdoteReducer";
import { createNotification } from "../reducers/notificationReducer";

const AnecdoteList = (props) => {
  const anecdotes = props.anecdotes.filter((el) =>
    el.content.toLowerCase().includes(props.filter.toLowerCase())
  );
  return (
      <div>
    {anecdotes.map(anecdote =>
      <div key={anecdote.id}>
        <div>{anecdote.content}</div>
        <div>
          has {anecdote.votes}
          <button onClick={() => props.vote(anecdote.id, props)}>vote</button>
        </div>
      </div>
    )}
      </div>
  );
};

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    vote: (id, props) => {
      const anecdote = props.anecdotes.find((el) => el.id === id);
      dispatch(updateAnecdote({ ...anecdote, votes: anecdote.votes + 1 }));
      dispatch(
        createNotification(
          `Thanks, you voted '${
            props.anecdotes.find((el) => el.id === id).content
          }'`,
          5
        )
      );
    },
  };
};

const ConnectedAnecdoteList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)

export default ConnectedAnecdoteList;
