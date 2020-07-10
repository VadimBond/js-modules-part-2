import { getResource } from "../services/requests";

const showMoreStyles = (trigger, wrapper) => {

  const btn = document.querySelector(trigger);

  btn.addEventListener("click", (e) => {
    e.preventDefault();

    getResource("http://localhost:3000/styles")  //  json-server or src/assets/db.json (res.styles)
      .then(res => createCards(res))
      .catch(err => console.log(err));

    btn.remove();
  });

  function createCards(response) {
    response.forEach(({ src, title, link }) => {
      const card = document.createElement("div");

      card.classList.add("animated", "fadeInUp", "col-sm-3", "col-sm-offset-0", "col-xs-10", "col-xs-offset-1");

      card.innerHTML = `
        <div class=styles-block>
          <img src=${src} alt="style">
          <h4>${title}</h4>
          <a href=${link}>Подробнее</a>
        </div>
      `;

      document.querySelector(wrapper).append(card);
    });
  }

};

export default showMoreStyles;
