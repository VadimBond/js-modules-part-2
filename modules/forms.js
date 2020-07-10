import checkTextInputs from "./checkTextInputs";
import { postData } from "../services/requests";

const forms = () => {

  const myForms = document.querySelectorAll("form"),
        inputs = document.querySelectorAll("input"),
        textareas = document.querySelectorAll("textarea"),
        uploads = document.querySelectorAll("[name='upload']");
  
  checkTextInputs("[name='name']");
  checkTextInputs("[name='message']");
  
  const message = {
    loading: "Laster opp...",
    success: "Takk! Vi tar kontakt snart!",
    failure: "Noen feil oppdaget...",
    spinner: "assets/img/spinner.gif",
    ok: "assets/img/ok.png",
    fail: "assets/img/fail.png"
  };

  const path = {
    designer: "assets/server.php",
    question: "assets/question.php"
  };

  const clearInputs = () => {
    inputs.forEach(input => input.value = "");
    textareas.forEach(textarea => textarea.value = "");
    uploads.forEach(upload => upload.previousElementSibling.textContent = "Файл не выбран");
  };

  uploads.forEach(item => {
    item.addEventListener("input", () => {
      let dots;
      const arr = item.files[0].name.split(".");
      arr[0].length > 6 ? dots = "..." : dots = ".";
      const name = arr[0].slice(0, 6) + dots + arr[1];
      item.previousElementSibling.textContent = name;
    });
  });

  myForms.forEach(form => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const statusMessage = document.createElement("div");
      statusMessage.classList.add("status");
      form.parentNode.append(statusMessage);

      form.classList.add("animated", "fadeOutUp");
      setTimeout(() => {
        form.style.display = "none";
      }, 400);

      const statusImg = document.createElement("img");
      statusImg.setAttribute("src", message.spinner);
      statusImg.classList.add("animated", "fadeInUp");
      statusMessage.append(statusImg);

      const textMessage = document.createElement("div");
      textMessage.textContent = message.loading;
      statusMessage.append(textMessage);

      const formData = new FormData(form);
      let api;
      form.closest(".popup-design") || form.classList.contains("calc-form") ? (api = path.designer) : (api = path.question);
      
      postData(api, formData)
      .then(res => {
        console.log(res);
        statusImg.setAttribute("src", message.ok);
        textMessage.textContent = message.success;
      }).catch(() => {
        statusImg.setAttribute("src", message.fail);
        textMessage.textContent = message.failure;
      }).finally(() => {
        clearInputs();
        setTimeout(() => {
          statusMessage.remove();
          form.style.display ="block";
          form.classList.remove("fadeOutUp");
          form.classList.add("fadeInUp");
          document.querySelectorAll("[data-modal]").forEach(item => {
            item.style.display = "none";
          });
          document.body.style.overflow = "";
        }, 3000);
      });
    });
  });

};

export default forms;
