import React, { useState } from 'react';
import axios from 'axios';

const UpdateQuestion = () => {
  const [questionid, setQuestionId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tag, setTag] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/update-question/${questionid}`, {
        title,
        description,
        tag,
      });
      setMessage(response.data.msg);
      // Clear form after successful submission (optional)
      setQuestionId('');
      setTitle('');
      setDescription('');
      setTag('');
    } catch (error) {
      setMessage(error.response.data.msg || 'Something went wrong');
    }
  };

  return (
    <div>
      <h2>Update Question</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Question ID:</label>
          <input
            type="text"
            value={questionid}
            onChange={(e) => setQuestionId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Tag:</label>
          <input
            type="text"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            required
          />
        </div>
        <button type="submit">Update Question</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UpdateQuestion;
