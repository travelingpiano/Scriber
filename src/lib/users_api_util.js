export const fetchUsers= () => (
  // fetch('http://www.scriber.us/users', {
  fetch('http://127.0.0.1:8000/users', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      // 'Host': 'scriber.us',
      'Host': '127.0.0.1',
    },
  })
);

export const fetchUser= (id) => (
  // fetch(`http://www.scriber.us/users/${id}`, {
  fetch(`http://127.0.0.1:8000/users/${id}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  })
);
