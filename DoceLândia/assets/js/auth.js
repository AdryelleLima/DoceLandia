/**
 * auth.js - Handles Authentication logic for DoceLândia
 * Stores users and session state in localStorage
 */

const STORAGE_KEYS = {
  USER: 'docelandia_user',
  USERS_DB: 'docelandia_users_db'
};

// Initialize default test user if DB is empty
(function initUsersDB() {
  const users = localStorage.getItem(STORAGE_KEYS.USERS_DB);
  if (!users) {
    const defaultUsers = [
      {
        name: 'Cliente Exemplo',
        email: 'cliente@docelandia.com',
        password: '123'
      }
    ];
    localStorage.setItem(STORAGE_KEYS.USERS_DB, JSON.stringify(defaultUsers));
  }
})();

/**
 * Gets currently logged in user object or null
 */
function getLoggedInUser() {
  const userJson = localStorage.getItem(STORAGE_KEYS.USER);
  return userJson ? JSON.parse(userJson) : null;
}

/**
 * Registers a new user
 */
function registerUser(name, email, password) {
  if (!name || !email || !password) {
    M.toast({ html: 'Por favor, preencha todos os campos!', classes: 'c-toast-pastel-red' });
    return false;
  }

  const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS_DB) || '[]');
  const exists = users.find(u => u.email.toLowerCase() === email.toLowerCase());

  if (exists) {
    M.toast({ html: 'E-mail já cadastrado! Faça login.', classes: 'c-toast-pastel-red' });
    return false;
  }

  const newUser = { name, email, password };
  users.push(newUser);
  localStorage.setItem(STORAGE_KEYS.USERS_DB, JSON.stringify(users));

  // Log in automatically
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify({ name: newUser.name, email: newUser.email }));
  M.toast({ html: 'Cadastro realizado com sucesso! Bem-vindo(a) 🍬', classes: 'c-toast-success' });
  
  setTimeout(() => {
    window.location.href = 'index.html';
  }, 1000);
  return true;
}

/**
 * Logs in user with email & password
 */
function loginUser(email, password) {
  if (!email || !password) {
    M.toast({ html: 'Preencha o e-mail e a senha!', classes: 'c-toast-pastel-red' });
    return false;
  }

  const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS_DB) || '[]');
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

  if (!user) {
    M.toast({ html: 'Usuário não cadastrado!', classes: 'c-toast-pastel-red' });
    return false;
  }

  if (user.password !== password) {
    M.toast({ html: 'Senha inválida ou e-mail incorreto.', classes: 'c-toast-pastel-red' });
    return false;
  }

  // Save active session
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify({ name: user.name, email: user.email }));
  M.toast({ html: `Bem-vindo(a) de volta, ${user.name}! 🍬`, classes: 'c-toast-success' });

  // Redirect after success
  setTimeout(() => {
    const redirectUrl = sessionStorage.getItem('redirect_after_login') || 'index.html';
    sessionStorage.removeItem('redirect_after_login');
    window.location.href = redirectUrl;
  }, 1000);
  return true;
}

/**
 * Reset password request simulation
 */
function resetPasswordUser(email) {
  if (!email) {
    M.toast({ html: 'Digite seu e-mail cadastrado!', classes: 'c-toast-pastel-red' });
    return false;
  }

  const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS_DB) || '[]');
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

  if (!user) {
    M.toast({ html: 'Usuário não cadastrado!', classes: 'c-toast-pastel-red' });
    return false;
  }

  M.toast({ html: 'Link de recuperação enviado para seu e-mail! 📬', classes: 'c-toast-success' });
  setTimeout(() => {
    window.location.href = 'login.html';
  }, 1500);
  return true;
}

/**
 * Logs user out
 */
function logoutUser() {
  localStorage.removeItem(STORAGE_KEYS.USER);
  M.toast({ html: 'Você saiu da sua conta.', classes: 'c-toast-success' });
  setTimeout(() => {
    window.location.href = 'index.html';
  }, 800);
}
