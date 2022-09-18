const santaForm = document.forms[0];

santaForm.onsubmit = async (event) => {
  event.preventDefault();
  const wish = document.getElementById('wish').value;

  if (wish.length > 100) {
    document.getElementById('error').textContent =
      'Wish length is more than 100';
  } else {
    document.getElementById('error').textContent = '';
    event.currentTarget.submit();
  }
};
