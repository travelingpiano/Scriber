export const fetchUsers= () => (
  fetch('http://127.0.0.1:8000/users', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Host': '127.0.0.1:8000',
    },
  })
);
