/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./api.js":
/*!****************!*\
  !*** ./api.js ***!
  \****************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   fetchGet: () => (/* binding */ fetchGet),\n/* harmony export */   fetchPost: () => (/* binding */ fetchPost),\n/* harmony export */   registerUser: () => (/* binding */ registerUser),\n/* harmony export */   toggleLike: () => (/* binding */ toggleLike),\n/* harmony export */   userLogin: () => (/* binding */ userLogin)\n/* harmony export */ });\n/* harmony import */ var _date_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./date.js */ \"./date.js\");\n\n\nconst host = \"https://wedev-api.sky.pro/api/v2/dmitrii-the-best-sass/comments/\";\nconst mainUser = \"https://wedev-api.sky.pro/api/user/login\";\nconst newUser = \"https://wedev-api.sky.pro/api/user\";\n\nconst fetchGet = () => {\n  return fetch(host, {\n    method: \"GET\",\n  }).then((response) => {\n    if (response.status === 401) {\n      throw new Error(\"No authorization\");\n    } else if (response.status === 500) {\n      throw new Error(\"Server error\");\n    } else {\n      return response.json();\n    }\n  });\n};\n\n//отпраляем новые данные\nconst fetchPost = (token, inputTextElement, inputNameElement) => {\n  return fetch(host, {\n    method: \"POST\",\n    body: JSON.stringify({\n      name: inputNameElement.value,\n      date: (0,_date_js__WEBPACK_IMPORTED_MODULE_0__.getCurrentDate)(new Date()),\n      text: inputTextElement.value\n        .replaceAll(\"&\", \"&amp;\")\n        .replaceAll(\"<\", \"&lt;\")\n        .replaceAll(\">\", \"&gt;\")\n        .replaceAll('\"', \"&quot;\")\n        .replaceAll(\"QUOTE_BEGIN\", \"<div class='comment-quote'><b>\")\n        .replaceAll(\"QUOTE_END\", \"</b></div>\"),\n      isLiked: false,\n      likes: 0,\n      propertyColorLike: \"like-button no-active-like\",\n      forceError: true,\n    }),\n    headers: {\n      Authorization: token,\n    },\n  }).then((response) => {\n    if (response.status === 500) {\n      throw new Error(\"Server error\");\n    } else if (response.status === 400) {\n      throw new Error(\"Bad request\");\n    } else {\n      return response.json();\n    }\n  });\n};\n\n//https://github.com/GlebkaF/webdev-hw-api/blob/main/pages/api/user/README.md\nconst userLogin = ({ login, password }) => {\n  return fetch(mainUser, {\n    method: \"POST\",\n    body: JSON.stringify({\n      login,\n      password,\n    }),\n  }).then((response) => {\n    if (response.status === 500) {\n      throw new Error(\"Server error\");\n    } else if (response.status === 400) {\n      throw new Error(\"No authorization\");\n    } else {\n      return response.json();\n    }\n  });\n};\n\nconst registerUser = ({ login, password, name }) => {\n  return fetch(newUser, {\n    method: \"POST\",\n    body: JSON.stringify({\n      login,\n      password,\n      name,\n    }),\n  }).then((response) => {\n    if (response.status === 500) {\n      throw new Error(\"Server error\");\n    } else if (response.status === 400) {\n      throw new Error(\"This user already exists\");\n    } else {\n      return response.json();\n    }\n  });\n};\n\n//likes\nconst toggleLike = ({ id, token }) => {\n  return fetch(\n    `https://wedev-api.sky.pro/api/v2/dmitrii-the-best-sass/comments/${id}/toggle-like`,\n    {\n      method: \"POST\",\n      headers: {\n        Authorization: token,\n      },\n    }\n  ).then((response) => {\n    return response.json();\n  });\n};\n\n\n//# sourceURL=webpack://webdev-dom-homework/./api.js?");

/***/ }),

/***/ "./components/loginComponent.js":
/*!**************************************!*\
  !*** ./components/loginComponent.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   renderLoginComponent: () => (/* binding */ renderLoginComponent)\n/* harmony export */ });\n/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../api.js */ \"./api.js\");\n\n\nconst renderLoginComponent = ({\n  comments,\n  appEl: appElement,\n  setToken,\n  setName,\n  getAPI,\n}) => {\n  let isLoginMode = true;\n\n  const commentsHtmlNotEdit = comments\n    .map((comment, index) => {\n      return `<li class=\"comment\" data-index=\"${index}\">\n          <div class=\"comment-header\" data-index=\"${index}\">\n            <div>${comment.name}\n            </div>\n            <div>${comment.dateСreation}</div>\n          </div>\n          <div class=\"comment-body\">\n            <div data-index=\"${index}\" class=\"comment-text\" >\n              ${comment.text}\n            </div>\n          </div>\n          <div class=\"comment-footer\">\n            <div class=\"editor\">\n            </div>\n            <div class=\"likes\">\n              <span class=\"likes-counter\"> ${comment.likesNumber}</span>\n              <button data-index=\"${index}\" class='${comment.propertyColorLike}'></button>\n            </div>\n          </div>\n        </li>`;\n    })\n    .join(\"\");\n\n  const appHTML = `<div class=\"container\">\n\n      <ul class=\"comments\">\n       ${commentsHtmlNotEdit}\n      </ul>    \n      <div>Чтобы добавить комментарий, <a  id=\"login-link\" class=\"form-link\" href=\"#\">авторизуйтесь</a></div>\n    </div>`;\n\n  appElement.innerHTML = appHTML;\n\n  document.getElementById(\"login-link\").addEventListener(\"click\", () => {\n    const renderForm = () => {\n      const appHTML = `<div class=\"container\">\n         <div class=\"form-add-login\">\n     <h3 class=\"form-title\">Форма ${isLoginMode ? \"входа\" : \"регистрации\"}</h3>\n     <div class=\"form-row\">\n\n     ${\n       isLoginMode\n         ? \"\"\n         : `<input type=\"text\" id=\"name-input\" class=\"input\" placeholder=\"Введите ваше имя\" />`\n     }\n         <input type=\"text\" id=\"login-input\" class=\"input\" placeholder=\"Введите логин\"/>        \n         <input type=\"password\" id=\"password-input\" class=\"input\" placeholder=\"Введите пароль\"/>\n     </div>\n     \n     <button class=\"button\" id=\"login-button\">${\n       isLoginMode ? \"Войти\" : \"Зарегистрироваться\"\n     }</button>\n     <a  class=\"register-link\" href=\"#\">${\n       isLoginMode ? \"Зарегистрироваться\" : \"Войти\"\n     }</a>  \n     </div>\n       </div>`;\n\n      appElement.innerHTML = appHTML;\n\n      document.querySelector(\".register-link\").addEventListener(\"click\", () => {\n        isLoginMode = !isLoginMode;\n        renderForm();\n      });\n\n      document.getElementById(\"login-button\").addEventListener(\"click\", () => {\n        if (isLoginMode) {\n          const login = document.getElementById(\"login-input\").value;\n          const password = document.getElementById(\"password-input\").value;\n\n          if (!login) {\n            alert(\"Введите логин\");\n            return;\n          }\n          if (!password) {\n            alert(\"Введите пароль\");\n            return;\n          }\n\n          (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.userLogin)({\n            login: login,\n            password: password,\n          })\n            .then((user) => {\n              console.log(user);\n              setToken(`Bearer ${user.user.token}`);\n              setName(user.user.name);\n              console.log(`Bearer ${user.user.token}`);\n              console.log(user.user.name);\n              getAPI();\n            })\n            .catch((error) => {\n              if (error.message === \"Server error\") {\n                alert(\"The server has just fallen down. Try a little later.\");\n                fetchArrPromise();\n              } else if (error.message === \"No authorization\") {\n                alert(error.message);\n              } else {\n                alert(\n                  \"Looks like, the Internet has broken down, try again later\"\n                );\n                console.log(error);\n              }\n            });\n        } else {\n          const name = document.getElementById(\"name-input\").value;\n          const login = document.getElementById(\"login-input\").value;\n          const password = document.getElementById(\"password-input\").value;\n\n          if (!name) {\n            alert(\"Введите имя\");\n            return;\n          }\n          if (!login) {\n            alert(\"Введите логин\");\n            return;\n          }\n          if (!password) {\n            alert(\"Введите пароль\");\n            return;\n          }\n\n          (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.registerUser)({\n            login: login,\n            password: password,\n            name: name,\n          })\n            .then((user) => {\n              console.log(user);\n              setToken(`Bearer ${user.user.token}`);\n\n              getAPI();\n            })\n            .catch((error) => {\n              if (error.message === \"Server error\") {\n                alert(\"The server has just fallen down. Try a little later.\");\n                fetchArrPromise();\n              } else if (error.message === \"No authorization\") {\n                alert(error.message);\n              } else {\n                alert(\n                  \"Looks like, the Internet has broken down, try again later\"\n                );\n                console.log(error);\n              }\n            });\n        }\n      });\n    };\n    renderForm();\n  });\n};\n\n\n//# sourceURL=webpack://webdev-dom-homework/./components/loginComponent.js?");

/***/ }),

/***/ "./date.js":
/*!*****************!*\
  !*** ./date.js ***!
  \*****************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getCurrentDate: () => (/* binding */ getCurrentDate)\n/* harmony export */ });\nconst getCurrentDate = (date) => {\n  return (\n    date.getDate().toString().padStart(2, \"0\") +\n    \".\" +\n    (date.getMonth() + 1).toString().padStart(2, \"0\") +\n    \".\" +\n    date.getFullYear().toString().slice(-2) +\n    \" \" +\n    date.toLocaleTimeString().slice(0, -3)\n  );\n};\n\n\n//# sourceURL=webpack://webdev-dom-homework/./date.js?");

/***/ }),

/***/ "./lib/formatDate/formatDate.js":
/*!**************************************!*\
  !*** ./lib/formatDate/formatDate.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   formatDateToRu: () => (/* binding */ formatDateToRu),\n/* harmony export */   formatDateToUs: () => (/* binding */ formatDateToUs)\n/* harmony export */ });\n// Файл lib/formatDate/formatDate.js\n\n// Приводим дату к формату ДД/ММ/ГГГГ ЧЧ:ММ\nconst formatDateToRu = (date) => {\n  return `${date.getDate() < 10 ? \"0\" + date.getDate() : date.getDate()}/${\n    date.getMonth() < 10 ? \"0\" + (date.getMonth() + 1) : date.getMonth() + 1\n  }/${date.getFullYear()} ${\n    date.getHours() < 10 ? \"0\" + date.getHours() : date.getHours()\n  }:${date.getMinutes() < 10 ? \"0\" + date.getMinutes() : date.getMinutes()}`;\n};\n\n// Приводим дату к формату ММ-ДД-ГГГГ ЧЧ:ММ\nconst formatDateToUs = (date) => {\n  return `${\n    date.getMonth() < 10 ? \"0\" + (date.getMonth() + 1) : date.getMonth() + 1\n  }-${\n    date.getDate() < 10 ? \"0\" + date.getDate() : date.getDate()\n  }-${date.getFullYear()} ${\n    date.getHours() < 10 ? \"0\" + date.getHours() : date.getHours()\n  }:${date.getMinutes() < 10 ? \"0\" + date.getMinutes() : date.getMinutes()}`;\n};\n\n\n//# sourceURL=webpack://webdev-dom-homework/./lib/formatDate/formatDate.js?");

/***/ }),

/***/ "./listComments.js":
/*!*************************!*\
  !*** ./listComments.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getListComments: () => (/* binding */ getListComments)\n/* harmony export */ });\nconst getListComments = (comment, index) => {\n  return `<li class=\"comment\" data-index=\"${index}\">\n<div class=\"comment-header\" data-index=\"${index}\">\n  <div>${comment.name}</div>\n  <div>${comment.dateСreation}</div>\n</div>\n<div class=\"comment-body\">\n  <div data-index=\"${index}\" class=\"comment-text\">${comment.text}</div>\n</div>\n<div class=\"comment-footer\">\n  <div class=\"likes\">\n    <span class=\"likes-counter\"> ${comment.likesNumber}</span>\n    \n    <button data-index=\"${index}\" data-id=\"${comment.id}\" class='${comment.propertyColorLike}'></button>\n  </div>\n</div>\n</li>`;\n};\n\n\n\n\n//# sourceURL=webpack://webdev-dom-homework/./listComments.js?");

/***/ }),

/***/ "./main.js":
/*!*****************!*\
  !*** ./main.js ***!
  \*****************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getAPI: () => (/* binding */ getAPI)\n/* harmony export */ });\n/* harmony import */ var _date_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./date.js */ \"./date.js\");\n/* harmony import */ var _renderComments_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./renderComments.js */ \"./renderComments.js\");\n/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./api.js */ \"./api.js\");\n/* harmony import */ var _listComments_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./listComments.js */ \"./listComments.js\");\n/* harmony import */ var _lib_formatDate_formatDate_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./lib/formatDate/formatDate.js */ \"./lib/formatDate/formatDate.js\");\n\n\n\n\n\n\n\n\nconst commentsLoading = document.querySelector(\".data-loading\");\n\nlet comments = [];\n\nfunction getAPI() {\n  return (0,_api_js__WEBPACK_IMPORTED_MODULE_2__.fetchGet)()\n    .then((responseData) => {\n      const appComments = responseData.comments.map((comment) => {\n        return {\n          id: comment.id,\n          name: comment.author.name,\n          dateСreation: (0,_date_js__WEBPACK_IMPORTED_MODULE_0__.getCurrentDate)(new Date(comment.date)),\n          text: comment.text,\n          likeComment: comment.isLiked,\n          likesNumber: comment.likes,\n          propertyColorLike: \"like-button no-active-like\",\n        };\n      });\n      comments = appComments;\n      return (0,_renderComments_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(comments, _listComments_js__WEBPACK_IMPORTED_MODULE_3__.getListComments);\n    })\n    .then((response) => {\n      commentsLoading.style.display = \"none\";\n    })\n    .catch((error) => {\n      if (error.message === \"Server error\") {\n        alert(\"Server has broken down, please try again later\");\n        fetchArrPromise();\n      } else if (error.message === \"No authorization\") {\n        console.log(error);\n      } else {\n        alert(\"Looks like your Internet has gone, try again later\");\n        console.log(error);\n      }\n    });\n}\n\ngetAPI();\n\n\n//# sourceURL=webpack://webdev-dom-homework/./main.js?");

/***/ }),

/***/ "./renderComments.js":
/*!***************************!*\
  !*** ./renderComments.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api.js */ \"./api.js\");\n/* harmony import */ var _main_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./main.js */ \"./main.js\");\n/* harmony import */ var _components_loginComponent_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/loginComponent.js */ \"./components/loginComponent.js\");\n/* harmony import */ var _listComments_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./listComments.js */ \"./listComments.js\");\n\n\n\n\n// import { formatDateToRu, formatDateToUs } from \"./lib/formatDate/formatDate.js\"\n\nlet token = null;\nlet name = null;\n\nconst renderApp = (comments, listComments) => {\n  const appElement = document.getElementById(\"app\");\n\n  if (!token) {\n    (0,_components_loginComponent_js__WEBPACK_IMPORTED_MODULE_2__.renderLoginComponent)({\n      comments,\n      appEl: appElement,\n      setToken: (newToken) => {\n        token = newToken;\n      },\n      setName: (newName) => {\n        name = newName;\n      },\n      getAPI: _main_js__WEBPACK_IMPORTED_MODULE_1__.getAPI,\n    });\n  } else {\n    const commentsHtml = comments\n      .map((comment, index) => listComments(comment, index))\n      .join(\"\");\n\n    const appHTML = `<div class=\"container\">\n\n  <ul class=\"comments\">\n   ${commentsHtml}\n  </ul>\n  \n  <div class=\"add-form\">\n    <input type=\"text\" readonly class=\"add-form-name\" value = \"${name}\" />\n    <textarea type=\"textarea\" class=\"add-form-text\" placeholder=\"Введите ваш коментарий\" rows=\"4\"></textarea>\n    <div class=\"add-form-row\">\n      <button class=\"add-form-button\">Написать</button>\n    </div>\n  </div>\n  <div class=\"comment-loading\">Comment is being loaded...</div>\n</div>`;\n\n    appElement.innerHTML = appHTML;\n\n    const formCommentElement = document.querySelector(\".add-form\");\n    const inputNameElement = document.querySelector(\".add-form-name\");\n    const inputTextElement = document.querySelector(\".add-form-text\");\n    const buttonElement = document.querySelector(\".add-form-button\");\n    const commentsElement = document.querySelector(\".comments\");\n    const commentLoadingElement = document.querySelector(\".comment-loading\");\n    const currentDate =\n      new Date().toLocaleDateString(\"default\", {\n        day: \"2-digit\",\n        month: \"2-digit\",\n        year: \"2-digit\",\n      }) +\n      \" \" +\n      new Date().toLocaleTimeString().slice(0, -3);\n\n    // //счетчик лайков у каждого комментария\n    // function getLikeButton() {\n    //   const likesButton = document.querySelectorAll(\".like-button\");\n    //   for (const like of likesButton) {\n    //     like.addEventListener(\"click\", (event) => {\n    //       event.stopPropagation();\n\n    //       const likeIndex = like.dataset.index;\n    //       const commentsElementLikeIndex = comments[likeIndex];\n    //       like.classList.add(\"-loading-like\");\n\n    //       if (commentsElementLikeIndex.likeComment) {\n    //         //commentsElementLikeIndex.likesNumber -= 1;\n    //         commentsElementLikeIndex.likeComment = false;\n    //         commentsElementLikeIndex.propertyColorLike =\n    //           \"like-button -no-active-like\";\n    //       } else {\n    //         //commentsElementLikeIndex.likesNumber += 1;\n    //         commentsElementLikeIndex.likeComment = true;\n    //         commentsElementLikeIndex.propertyColorLike =\n    //           \"like-button -active-like\";\n    //       }\n\n    //       const id = like.dataset.id;\n\n    //       toggleLike({ id, token });\n\n    //       delay(2000).then(() => {\n    //         getAPI();\n    //       });\n    //     });\n    //   }\n    // }\n    // getLikeButton();\n    function delay(interval = 300) {\n      return new Promise((resolve) => {\n        setTimeout(() => {\n          resolve();\n        }, interval);\n      });\n    }\n\n    function getLikeButton() {\n      const likesButton = document.querySelectorAll(\".like-button\");\n\n      for (const like of likesButton) {\n        like.addEventListener(\"click\", (event) => {\n          event.stopPropagation();\n          \n          const likeIndex = like.dataset.index;\n          const commentsElementLikeIndex = comments[likeIndex];\n\n          if (commentsElement.currentLike) {\n            commentsElement.likes -= 1;\n            commentsElement.currentLike = false;\n            like.classList.add(\"-no-active-like\");\n            like.classList.remove(\"-active-like\");\n            // renderComments(comments, getListComments);\n          } else {\n            commentsElement.likes += 1;\n            commentsElement.currentLike = true;\n            commentsElementLikeIndex.propertyColorLike =\n              \"like-button -active-like\";\n            // renderComments(comments, getListComments);\n          }\n          const id = like.dataset.id;\n\n          (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.toggleLike)({ id, token });\n\n          delay(2000).then(() => {\n            (0,_main_js__WEBPACK_IMPORTED_MODULE_1__.getAPI)();\n          });\n        });\n      }\n    }\n    getLikeButton();\n\n    buttonElement.addEventListener(\"click\", () => {\n      // добавление обработчика клика на кнопку добавления комментариев и установка даты\n      const currentDate =\n        new Date().toLocaleDateString(\"default\", {\n          day: \"2-digit\",\n          month: \"2-digit\",\n          year: \"2-digit\",\n        }) +\n        \" \" +\n        new Date().toLocaleTimeString().slice(0, -3);\n\n      // nameInputElement.classList.remove(\"error\");\n      inputNameElement.classList.remove(\"error\");\n      if (inputNameElement.value === \"\") {\n        inputNameElement.classList.add(\"error\");\n        return;\n      }\n\n      inputTextElement.classList.remove(\"error\");\n      if (inputTextElement.value === \"\") {\n        inputTextElement.classList.add(\"error\");\n        return;\n      }\n    });\n\n    getLikeButton();\n\n    //отпраляем новые данные\n    const postData = () => {\n      return (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.fetchPost)(token, inputTextElement, inputNameElement)\n        .then((response) => {\n          return (0,_main_js__WEBPACK_IMPORTED_MODULE_1__.getAPI)();\n        })\n        .then((data) => {\n          commentLoadingElement.classList.add(\"comment-loading\");\n          formCommentElement.classList.remove(\"comment-loading\");\n\n          inputNameElement.value = \"\";\n          inputTextElement.value = \"\";\n        })\n        .catch((error) => {\n          // Упавший интернет\n          // Если сервер сломался, то просим попробовать позже\n          if (error.message === \"Server error\") {\n            alert(\n              \"Ooops, the Server has just fallen down. Try a little later.\"\n            );\n            postData();\n          }\n          // Если пользователь ошибся с запросом, просим поправить\n          else if (error.message === \"Bad request\") {\n            alert(\n              \"The name and/or the comment are too short, minimum length is 3 symbols. Try again later.\"\n            );\n          } else {\n            alert(\"Looks like, the Internet has broken down, try again later\");\n            // console.log(error);\n          }\n\n          buttonElement.removeAttribute(\"disabled\");\n          commentLoadingElement.classList.add(\"comment-loading\");\n          formCommentElement.classList.remove(\"comment-loading\");\n\n          // console.log(error);\n        });\n    };\n\n    buttonElement.addEventListener(\"click\", () => {\n      commentLoadingElement.classList.remove(\"comment-loading\");\n      formCommentElement.classList.add(\"comment-loading\");\n      buttonElement.setAttribute(\"disabled\", true);\n\n      //отпраляем новые данные\n      postData(_api_js__WEBPACK_IMPORTED_MODULE_0__.fetchPost);\n    });\n  }\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (renderApp);\n\n\n//# sourceURL=webpack://webdev-dom-homework/./renderComments.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./main.js");
/******/ 	
/******/ })()
;