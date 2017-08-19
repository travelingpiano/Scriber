export const createTranscription = data => {
  return (
    // fetch('http://www.scriber.us/transcriptions/', {
    fetch('http://127.0.0.1:8000/api/transcriptions/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        // 'Host': 'scriber.us'
        'Host': '127.0.0.1'
      },
      body: JSON.stringify(data)
    })
  );
};

export const fetchTranscriptions = () => (
  // fetch('http://www.scriber.us/transcriptions', {
  fetch('http://127.0.0.1:8000/api/transcriptions/', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  })
);

export const fetchTranscription = (id) => {
  let url = `http://127.0.0.1:8000/api/transcriptions/${id}/`;
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
  fetch(`http://127.0.0.1:8000/api/transcriptions/${transcription.pk}/`,
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
  return fetch(`http://127.0.0.1:8000/api/transcriptions/${pk}/`,
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
