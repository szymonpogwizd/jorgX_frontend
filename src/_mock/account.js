const storedEmail = localStorage.getItem('email');

const account = {
  displayName: storedEmail || 'Default Username',
  photoURL: '/assets/images/avatars/avatar_default.jpg',
};

export default account;
