import React, { useEffect, useState } from 'react';
import api from './api';
import { Link } from 'react-router-dom';

function HistoryPage() {
  const [history, setHistory] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await api.get('shorturl/link_history');
      setHistory(response.data);
      console.log(response.data);
    } catch (error) {
      setError('Failed to fetch history');
      console.error('Failed to fetch history:', error);
    }
  };

  const handleDelete = async (short_url) => {
    try {
      await api.delete(`shorturl/delete/${short_url}`);
      setHistory((prevHistory) => {
        return prevHistory.filter((data) => data.short_url !== short_url);
      });
    } catch (error) {
      setError('Failed to delete link');
      console.error('Failed to delete link:', error);
    }
  };


  return (
    <div className='container mt-5 text-white wrapper'>
      <h1>Shortened URLs History</h1>
      {history.length > 0 ? (
        <div>
          <ul className='list-group'>
            {history.map(data => (
              <li className='list-group-item d-flex justify-content-between align-items-center' key={data.is}>
                <a className="badge badge-light" href={data.long_url}>{data.short_url}</a>
                <button className="btn btn-primary btn-sm text-sm" onClick={() => handleDelete(data.short_url)}>Delete</button>
                <Link to={`/analytics/${data.short_url}`}><button className="btn btn-primary text-sm">Analytics</button></Link>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No history available.</p>
      )}
      {error && <p>{error}</p>}
    </div>
  );
}

export default HistoryPage;
