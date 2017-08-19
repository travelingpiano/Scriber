export const createTranscription = data => {
  return (
    // fetch('http://www.scriber.us/transcriptions/', {
    fetch('https://scribr.herokuapp.com/api/transcriptions/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        // 'Host': 'scriber.us'
        'Host': 'scribr.herokuapp.com'
      },
      body: JSON.stringify(data)
    })
  );
};

export const fetchTranscriptions = () => {
  console.log('fetching transcriptions');
  return (
    // fetch('http://www.scriber.us/transcriptions', {
    fetch('https://scribr.herokuapp.com/api/transcriptions/', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
  );
};

export const fetchTranscription = (id) => {
  let url = `https://scribr.herokuapp.com/api/transcriptions/${id}/`;
  console.log('fetch transcription');
  return (
    // fetch(`http://www.scriber.us/transcriptions/${id}/`, {

    fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
  );
};

export const deleteTranscription = (transcription) => (
  fetch(`https://scribr.herokuapp.com/api/transcriptions/${transcription.pk}/`,
    {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }
  )
);

export const updateTranscription = (transcription) => {
  let pk = JSON.parse(transcription).pk;
  return fetch(`https://scribr.herokuapp.com/api/transcriptions/${pk}/`,
    {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: transcription
    }
  );
};
