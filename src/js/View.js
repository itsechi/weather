export const View = () => {
  const form = document.getElementById('form');
  const searchBtn = document.getElementById('searchBtn');

  const userInput = () => {
    let input = document.getElementById('inputCity').value;
    return input;
  };

  const clearInput = () => {
    document.getElementById('inputCity').value = '';
  };

  const renderError = () => {
    const errorMessage = document.getElementById('message');
    errorMessage.textContent = 'City not found';
  };

  const addHandler = handler => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      handler();
    });
    searchBtn.addEventListener('click', e => {
      e.preventDefault();
      handler();
    });
  };

  return { userInput, addHandler, clearInput, renderError };
};
