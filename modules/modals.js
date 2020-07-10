const modals = () => {

  let btnPressed = false;

  function bindModal(triggerSelector, modalSelector, closeSelector, destroy = false) {
    const triggers = document.querySelectorAll(triggerSelector),
          modal = document.querySelector(modalSelector),
          close = document.querySelector(closeSelector),
          modalWindows = document.querySelectorAll("[data-modal]"),
          scroll = calcScroll();
    
    triggers.forEach(trigger => {
      trigger.addEventListener("click", (e) => {
        if (e.target) {
          e.preventDefault();
        }

        btnPressed = true;

        if (destroy) {
          trigger.remove();
        }

        modalWindows.forEach(item => {
          item.style.display = "none";
          item.classList.add("animated", "fadeIn");
        });
  
        modal.style.display = "block";
        document.body.style.overflow = "hidden";
        document.body.style.marginRight = `${scroll}px`;
      });
    });

    close.addEventListener("click", () => {
      modalWindows.forEach(item => item.style.display = "none");
      modal.style.display = "none";
      document.body.style.overflow = "";
      document.body.style.marginRight = "";
    });

    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modalWindows.forEach(item => item.style.display = "none");
        modal.style.display = "none";
        document.body.style.overflow = "";
        document.body.style.marginRight = "";
      }
    });
  }

  function showModalByTime(selector,time = 60000) {
    setTimeout(() => {
      let isVisibility = false;
      const scrollLoc = calcScroll();

      document.querySelectorAll("[data-modal]").forEach(item => {
        if (getComputedStyle(item).display !== "none") {
          isVisibility = true;
        }
      });

      if (!isVisibility) {
        document.querySelector(selector).style.display = "block";
        document.body.style.overflow = "hidden";
        document.body.style.marginRight = `${scrollLoc}px`;
      }
    }, time);
  }

  function calcScroll() {
    const div = document.createElement("div");
    div.style.cssText = `
      width: 50px;
      height: 50px;
      overflow-y: scroll;
      visibility: hidden;
    `;
    document.body.append(div);

    const scrollWidth = div.offsetWidth - div.clientWidth;

    div.remove();

    return scrollWidth;
  }

  function showByScroll(selector) {  // once at end of page
    window.addEventListener("scroll", () => {
      const scrollHeight = 
        Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
      
      if (!btnPressed && 
        (window.pageYOffset + document.documentElement.clientHeight >= scrollHeight)) {
        
        document.querySelector(selector).click();
      }
    });
  }

  bindModal(".button-design", ".popup-design", ".popup-design .popup-close");
  bindModal(".button-consultation", ".popup-consultation", ".popup-consultation .popup-close");
  bindModal(".fixed-gift", ".popup-gift", ".popup-gift .popup-close", true);

  showModalByTime(".popup-consultation");
  showByScroll(".fixed-gift");
  
};

export default modals;
