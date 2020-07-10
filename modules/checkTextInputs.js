const checkTextInputs = (selector) => {

  const textInputs = document.querySelectorAll(selector);

  textInputs.forEach(item => {
    item.addEventListener("keypress", (e) => {
      if (e.key.match(/[^а-яё 0-9]/gi)) {  // item.value = item.value.replace(/regexp/g, "");
        e.preventDefault();
      }
    });
  });

};

export default checkTextInputs;
