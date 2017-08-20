export const fetchUsers= () => {
  console.log('fetch users');
  return (
    // fetch('http://www.scriber.us/users', {
    fetch('https://scribr.herokuapp.com/api/users/', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        // 'Host': 'scriber.us',
        'Host': 'scribr.herokuapp.com',
      },
    })
  );
};

export const fetchUser= (id) => (
  // fetch(`http://www.scriber.us/users/${id}`, {
  fetch(`https://scribr.herokuapp.com/api/users/${id}/`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  })
);
