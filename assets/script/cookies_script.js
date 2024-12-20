/* Make sure page has loaded */
document.addEventListener("DOMContentLoaded", function() {
  const cookiePopup = document.getElementById("cookie-popup");
  const acceptBtn = document.getElementById("accept-cookies");

  /* Check if the user has consented */
  if (!getCookie("userAcceptedCookies")) {
      cookiePopup.style.display = "block";
  }

  /* When user clicks accept, the cookie is set and the popup disappears */
  acceptBtn.addEventListener("click", function() {
      setCookie("userAcceptedCookies", true, 365);
      cookiePopup.style.display = "none";
  });

  /* Set the cookie */
  function setCookie(cookieKey, cookieValue, exdays) {
      const cookieDate = new Date();
      const expiryDaysInMs = exdays * 24 * 60 * 60 * 1000;
      cookieDate.setTime(cookieDate.getTime() + expiryDaysInMs);
      const expires = "expires=" + cookieDate.toUTCString();
      document.cookie = cookieKey + "=" + cookieValue + ";" + expires + ";path=/";
  }

  /* Get the cookie */
  function getCookie(cookieKey) {
      const name = cookieKey + "=";
      const myCookie = document.cookie.split(';');
      for (let i = 0; i < myCookie.length; i++) {
          let theCookie = myCookie[i].trim();
          if (theCookie.indexOf(name) === 0) {
              return theCookie.substring(name.length, theCookie.length);
          }
      }
      return null; // Return null if cookie is not found
  }
});
