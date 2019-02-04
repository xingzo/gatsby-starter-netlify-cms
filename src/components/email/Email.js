import React from 'react'
import * as emailjs from 'emailjs-com';

const sendDownloadEmail = (track, toEmail) => {
  const downloadLink = track.downloadLink;
  const title = track.title;

  const templateParams = {
      to_email: toEmail,
      title: title,
      download_link: downloadLink,
  };

  // construct email
  emailjs.send('mailjet','download_link_email', templateParams, 'user_laCQpZaEticaZhli0FVsh')
  .then((response) => {
     console.log('SUCCESS!', response.status, response.text);
     return response.status
  }, (err) => {
     console.log('FAILED...', err);
  });

}

export default sendDownloadEmail
