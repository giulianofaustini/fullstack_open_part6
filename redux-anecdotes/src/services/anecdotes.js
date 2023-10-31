import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getOne = async(id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}


const createNew = async(content) => {
    const object = {content, votes: 0}
    const response = await axios.post(baseUrl, object)
    return response.data

}
const updateVotes = async (id, content, updatedVotes) => {
  const object = { content, votes: updatedVotes }
  const response = await axios.put(`${baseUrl}/${id}`, object);
  return response.data;
};



export default {getOne, getAll, createNew , updateVotes}


