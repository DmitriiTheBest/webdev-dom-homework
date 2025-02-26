import { userLogin, registerUser } from "../api.js";
import _ from "lodash";

export const renderLoginComponent = ({
  comments,
  appEl: appElement,
  setToken,
  setName,
  getAPI,
}) => {
  let isLoginMode = true;

  const commentsHtmlNotEdit = comments
    .map((comment, index) => {
      return `<li class="comment" data-index="${index}">
          <div class="comment-header" data-index="${index}">
            <div>${comment.name}
            </div>
            <div>${comment.dateСreation}</div>
          </div>
          <div class="comment-body">
            <div data-index="${index}" class="comment-text" >
              ${comment.text}
            </div>
          </div>
          <div class="comment-footer">
            <div class="editor">
            </div>
            <div class="likes">
              <span class="likes-counter"> ${comment.likesNumber}</span>
              <button data-index="${index}" class='${comment.propertyColorLike}'></button>
            </div>
          </div>
        </li>`;
    })
    .join("");

  const appHTML = `<div class="container">

      <ul class="comments">
       ${commentsHtmlNotEdit}
      </ul>    
      <div>Чтобы добавить комментарий, <a  id="login-link" class="form-link" href="#">авторизуйтесь</a></div>
    </div>`;

  appElement.innerHTML = appHTML;

  document.getElementById("login-link").addEventListener("click", () => {
    const renderForm = () => {
      const appHTML = `<div class="container">
         <div class="form-add-login">
     <h3 class="form-title">Форма ${isLoginMode ? "входа" : "регистрации"}</h3>
     <div class="form-row">

     ${
       isLoginMode
         ? ""
         : `<input type="text" id="name-input" class="input" placeholder="Введите ваше имя" />`
     }
         <input type="text" id="login-input" class="input" placeholder="Введите логин"/>        
         <input type="password" id="password-input" class="input" placeholder="Введите пароль"/>
     </div>
     
     <button class="button" id="login-button">${
       isLoginMode ? "Войти" : "Зарегистрироваться"
     }</button>
     <a  class="register-link" href="#">${
       isLoginMode ? "Зарегистрироваться" : "Войти"
     }</a>  
     </div>
       </div>`;

      appElement.innerHTML = appHTML;

      document.querySelector(".register-link").addEventListener("click", () => {
        isLoginMode = !isLoginMode;
        renderForm();
      });

      document.getElementById("login-button").addEventListener("click", () => {
        if (isLoginMode) {
          const login = document.getElementById("login-input").value;
          const password = document.getElementById("password-input").value;

          if (!login) {
            alert("Введите логин");
            return;
          }
          if (!password) {
            alert("Введите пароль");
            return;
          }

          userLogin({
            login: login,
            password: password,
          })
            .then((user) => {
              console.log(user);
              setToken(`Bearer ${user.user.token}`);
              setName(user.user.name);
              console.log(`Bearer ${user.user.token}`);
              console.log(user.user.name);
              getAPI();
            })
            .catch((error) => {
              if (error.message === "Server error") {
                alert("The server has just fallen down. Try a little later.");
                fetchArrPromise();
              } else if (error.message === "No authorization") {
                alert(error.message);
              } else {
                alert(
                  "Looks like, the Internet has broken down, try again later"
                );
                console.log(error);
              }
            });
        } else {
          const name = document.getElementById("name-input").value;
          const login = document.getElementById("login-input").value;
          const password = document.getElementById("password-input").value;

          if (!name) {
            alert("Введите имя");
            return;
          }
          if (!login) {
            alert("Введите логин");
            return;
          }
          if (!password) {
            alert("Введите пароль");
            return;
          }

          registerUser({
            login: login,
            password: password,
            // name: name,
            name: _.capitalize(name),
          })
            .then((user) => {
              console.log(user);
              setToken(`Bearer ${user.user.token}`);

              getAPI();
            })
            .catch((error) => {
              if (error.message === "Server error") {
                alert("The server has just fallen down. Try a little later.");
                fetchArrPromise();
              } else if (error.message === "No authorization") {
                alert(error.message);
              } else {
                alert(
                  "Looks like, the Internet has broken down, try again later"
                );
                console.log(error);
              }
            });
        }
      });
    };
    renderForm();
  });
};
