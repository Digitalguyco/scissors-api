import React, { useState } from 'react';
import api from './api';
import QRCode from 'react-qr-code';

const UrlShortenerForm = () => {
  const [long_url, setOriginalUrl] = useState('');
  const [short_url, setCustomShorturl] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await api.post('/shorturl/shorturl', {
        long_url,
        short_url,
      });
      const { data } = response;
      setShortenedUrl(data.shortened_url);

      // Handle the response
      console.log(response.data);
      setOriginalUrl('');
      setCustomShorturl('');
      
    } catch (error) {
      // Handle the error
      
      console.error(error);
    }
  };

  const handleCopyClick = () => {
    navigator.clipboard.writeText(shortenedUrl);
    alert("Url copied to clipboard!");
  };

  return (
      <div className='container wrapper mt-5 text-center'>
          
          <form onSubmit={handleSubmit}>
          <div className='inputField'>
          <h2>Shorten URL</h2>        
        <div className="mb-3">
          <input
            type="url"
            value={long_url}
            onChange={(e) => setOriginalUrl(e.target.value)}
            className="form-control" id="url" placeholder="Paste url to shorten"/>
        </div>
        <div className="mb-3">
          <input
            type="custom shortcode"
            value={short_url}
            onChange={(e) => setCustomShorturl(e.target.value)}
            className="form-control" id="Custom shortcode" placeholder="Custom shortcode"/>
        </div>
        
        <button type="button" className="btn btn-outline-primary" onClick={handleSubmit}>Shorten</button>
        </div>
      </form>
      {shortenedUrl && (
        <div className='container'>
        
        <div className="input-group">
            <input type="text" class="form-control col-3" id="myGeneratedLink" value={shortenedUrl} readonly />
            <div className="input-group-append">
              <button className="btn btn-outline-secondary" type="button" onClick={handleCopyClick}>Copy</button>
              <div>
            <QRCode value={shortenedUrl} fgColor="seagreen"/>

            </div>
            </div> 
              </div>
    
      </div>
        
       
      )}
    </div>
  );
};

export default UrlShortenerForm;
