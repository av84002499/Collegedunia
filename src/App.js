import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [CDRank, setCDRank] = useState('');
  const [Colleges, setColleges] = useState('');
  const [CourseFees, setCourseFees] = useState('');
  const [Placement, setPlacement] = useState('');
  const [UserReviews, setUserReviews] = useState('');
  const [Ranking, setRanking] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3000/posts')
      .then(res => {
        setData(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Create a new user object
      const newUser = {
        CDRank,
        Colleges,
        CourseFees,
        Placement,
        UserReviews,
        Ranking
      };

      // Send a POST request to the server to add the new user
      const response = await axios.post('http://localhost:3000/posts', newUser);

      // Update the data state with the new user returned by the server
      setData([...data, response.data]);

      // Clear the input fields after submission
      setCDRank('');
      setColleges('');
      setCourseFees('');
      setPlacement('');
      setUserReviews('');
      setRanking('');
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder='CDRank' value={CDRank} onChange={e => setCDRank(e.target.value)} />
          <input type="text" placeholder='Colleges' value={Colleges} onChange={e => setColleges(e.target.value)} />
          <input type="text" placeholder='CourseFees' value={CourseFees} onChange={e => setCourseFees(e.target.value)} />
          <input type="text" placeholder='Placement' value={Placement} onChange={e => setPlacement(e.target.value)} />
          <input type="text" placeholder='UserReviews' value={UserReviews} onChange={e => setUserReviews(e.target.value)} />
          <input type="text" placeholder='Ranking' value={Ranking} onChange={e => setRanking(e.target.value)} />
          <button type="submit">Add</button>
        </form>
        <hr />
      </div>
      <table>
        <thead>
          <tr>
            <th>CDRank</th>
            <th>Colleges</th>
            <th>CourseFees</th>
            <th>Placement</th>
            <th>UserReviews</th>
            <th>Ranking</th>
          </tr>
        </thead>
        <tbody>
          {data.map(user => (
            <tr key={user.id}>
              <td>{user.CDRank}</td>
              <td>{user.Colleges}</td>
              <td>{user.CourseFees}</td>
              <td>{user.Placement}</td>
              <td>{user.UserReviews}</td>
              <td>{user.Ranking}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
