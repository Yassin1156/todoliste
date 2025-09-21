
export let accounts = JSON.parse(localStorage.getItem('accounts')) || [];
export let currentAccountIndex = Number(localStorage.getItem('currentAccountIndex')) || 0;

if (accounts.length === 0) {
  accounts.push({email: '',password:'', projects: []});
  saveAccounts();
}

function addAccount () {
  const accountEmail = document.getElementById('email').value;
  const accountIndex = accounts.findIndex (a => a.email === accountEmail);
  const accountPassword = document.getElementById('password').value;
  if(accountIndex !== -1) {
    currentAccountIndex = accountIndex;
    if (accountPassword === accounts[currentAccountIndex].password) {
      window.location.href = './index.html';
    } else {
      alert('Falsches Passwort');
    }
  } else {
    accounts.push({
      email: accountEmail,
      password: accountPassword,
      projects: []
    });
    currentAccountIndex = accounts.length -1;
    saveAccounts();
    window.location.href = './index.html';
  }
  saveAccounts();
}

export function saveAccounts () {
  localStorage.setItem('accounts', JSON.stringify(accounts));
  localStorage.setItem('currentAccountIndex', String(currentAccountIndex));
}
window.addAccount = addAccount;