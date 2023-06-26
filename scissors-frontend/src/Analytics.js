import React, { useEffect, useState } from 'react';
import api from './api';
import { useParams } from 'react-router-dom';




function AnalyticsPage() {
  const [analytics_data, setAnalyticsdata] = useState([]);
  const [error, setError] = useState(null);
  const { short_url } = useParams();


  

  useEffect(() => {
    const fetchAnalyticsImage = async () => {
      try {
        const response = await api.get(`/analytics/${short_url}`);
        const { data } = response;

        setAnalyticsdata(data.analytics_data)
        
      } catch (error) {
        setError('Failed to fetch analytics data');
        console.error('Failed to fetch analytics data:', error);
      }
    };
    fetchAnalyticsImage();

  }, [short_url]);


  return (
    <section>
    <h2 className='text-center mt-5'> Analytics for {short_url}</h2>
   {analytics_data.length > 0 ? (
        analytics_data.map( data => <div key={analytics_data.id} className='container'>
          <ul className='list-group'>
            <li className='list-group-item d-flex justify-content-between align-items-center'>click count: <span class="badge bg-primary rounded-pill">{data.click_count}</span></li>
            <li className='list-group-item d-flex justify-content-between align-items-center'>click time: {data.click_timestamp}</li>
            <li className='list-group-item d-flex justify-content-between align-items-center'>user agent: {data.user_agent}</li>
            <li className='list-group-item d-flex justify-content-between align-items-center'>user ip: {data.ip_address}</li>
          </ul>
        </div>)
      ) : (
        <p className='text-center'>Loading analytics data...</p>
      )}
      {error && <p>{error}</p>}
      
   </section>
  );
}

export default AnalyticsPage;
