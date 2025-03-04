(()=>{"use strict";var t=document.querySelector("#card-template").content;function e(t,e,n){t(e).catch((function(t){console.log(t)})),n.remove()}function n(t,e,n,r){n.classList.contains("card__like-button_is-active")?(n.classList.remove("card__like-button_is-active"),t(e,"DELETE").then((function(t){return t.json()})).then((function(t){return r.textContent=t.likes.length})).catch((function(t){console.log(t)}))):(n.classList.add("card__like-button_is-active"),t(e,"PUT").then((function(t){return t.json()})).then((function(t){return r.textContent=t.likes.length})).catch((function(t){console.log(t)})))}function r(e,n,r,o,c,u,a){var i=t.querySelector(".card").cloneNode(!0),l=i.querySelector(".card__delete-button"),s=i.querySelector(".card__like-button"),p=i.querySelector(".card__image"),d=i.querySelector(".card__count");return c===e.owner._id?l.addEventListener("click",(function(){return n(a,e._id,i)})):l.remove(),p.src=e.link,p.alt=e.name,d.textContent=e.likes.length,i.querySelector(".card__title").textContent=e.name,p.addEventListener("click",(function(){return o(e.link,e.name)})),s.addEventListener("click",(function(){return r(u,e._id,s,d)})),i}function o(t){t.classList.add("popup_is-opened"),t.addEventListener("click",a),document.addEventListener("keydown",u)}function c(t){t.classList.remove("popup_is-opened"),t.removeEventListener("click",a),document.removeEventListener("keydown",u)}function u(t){"Escape"===t.key&&c(document.querySelector(".popup_is-opened"))}function a(t){t.currentTarget===t.target&&c(t.target)}function i(t){t.querySelector(".popup__close").addEventListener("click",(function(){c(t)}))}var l=["inputSelector","submitButtonSelector","inactiveButtonClass"],s=["inputErrorClass","errorClass"],p=["inputSelector","submitButtonSelector","inactiveButtonClass","inputErrorClass","errorClass"];function d(t,e){if(null==t)return{};var n,r,o=function(t,e){if(null==t)return{};var n={};for(var r in t)if({}.hasOwnProperty.call(t,r)){if(-1!==e.indexOf(r))continue;n[r]=t[r]}return n}(t,e);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(t);for(r=0;r<c.length;r++)n=c[r],-1===e.indexOf(n)&&{}.propertyIsEnumerable.call(t,n)&&(o[n]=t[n])}return o}var f=function(t,e,n){_(t)?(e.classList.add("".concat(n)),e.disabled=!0):(e.classList.remove("".concat(n)),e.disabled=!1)},_=function(t){return t.some((function(t){return!t.validity.valid}))},m=function(t,e,n){var r=n.inputErrorClass,o=n.errorClass;d(n,s),e.validity.patternMismatch?y(t,e,e.setCustomValidity(e.dataset.errorMessage),r,o):y(t,e,e.setCustomValidity(""),r,o),e.validity.valid?v(t,e,r,o):y(t,e,e.validationMessage,r,o)},y=function(t,e,n,r,o){var c=t.querySelector(".".concat(e.id,"-error"));e.classList.add("".concat(r)),e.classList.contains("popup__input_type_url")?c.classList.add("".concat(o)):(c.classList.add("".concat(o)),c.textContent=n)},v=function(t,e,n,r){var o=t.querySelector(".".concat(e.id,"-error"));e.classList.remove("".concat(n)),e.classList.contains("popup__input_type_url")?o.classList.remove("".concat(r)):(o.classList.remove("".concat(r)),o.textContent="")};function S(t,e){var n=e.inputSelector,r=e.submitButtonSelector,o=e.inactiveButtonClass,c=e.inputErrorClass,u=e.errorClass;d(e,p),function(t){t.classList.contains("form__reset")&&t.reset()}(t),function(t,e,n){var r=t.querySelector("".concat(e));r.classList.add("".concat(n)),r.disabled=!0}(t,r,o),function(t,e,n,r){Array.from(t.querySelectorAll("".concat(r))).forEach((function(r){var o=t.querySelector(".".concat(r.id,"-error"));r.classList.remove("".concat(n)),o.classList.remove("".concat(e))}))}(t,u,c,n)}var h={baseUrl:"https://nomoreparties.co/v1/wff-cohort-33",headers:{authorization:"49202977-389f-45b9-b90d-4254929483bb","Content-Type":"application/json"}},b=function(t){return t.ok?t.json():Promise.reject("Что то пошло не так, код ошибки - ".concat(t.status))};function q(t){return fetch("".concat(h.baseUrl,"/cards/").concat(t),{method:"DELETE",headers:h.headers})}var C=function(t,e){return fetch("".concat(h.baseUrl,"/cards/likes/").concat(t),{method:e,headers:h.headers})};function g(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=Array(e);n<e;n++)r[n]=t[n];return r}var L,E,k,x=document.querySelector(".places__list"),A=document.forms["edit-profile"],O=document.forms["new-place"],j=document.forms.update,w=document.querySelector(".profile__edit-button"),B=document.querySelector(".popup_type_edit"),U=document.querySelector(".profile__add-button"),P=document.querySelector(".popup_type_new-card"),T=document.querySelector(".popup_type_image"),D=document.querySelector(".popup__caption"),I=document.querySelector(".popup__input_type_card-name"),M=document.querySelector(".popup__input_type_url"),N=document.querySelector(".popup__image"),J=document.querySelector(".profile__title"),z=document.querySelector(".profile__description"),H=document.querySelector(".popup__input_type_name"),V=document.querySelector(".popup__input_type_description"),$=document.querySelector(".profile__image"),F=document.querySelector(".popup_type_update"),G=document.querySelector(".update__avatar-button"),K=null,Q={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};function R(t,e){N.src=t,N.alt=e,D.textContent=e,o(T)}E=(L=Q).formSelector,k=d(L,["formSelector"]),Array.from(document.querySelectorAll("".concat(E))).forEach((function(t){t.addEventListener("submit",(function(t){t.preventDefault()})),function(t,e){var n=e.inputSelector,r=e.submitButtonSelector,o=e.inactiveButtonClass,c=d(e,l),u=Array.from(t.querySelectorAll("".concat(n))),a=t.querySelector("".concat(r));f(u,a,o),u.forEach((function(e){e.addEventListener("input",(function(){m(t,e,c),f(u,a,o)}))}))}(t,k)})),Promise.all([fetch("".concat(h.baseUrl,"/cards"),{headers:h.headers}).then(b),fetch("".concat(h.baseUrl,"/users/me"),{headers:{authorization:"49202977-389f-45b9-b90d-4254929483bb"}}).then(b)]).then((function(t){var o,c,u=(c=2,function(t){if(Array.isArray(t))return t}(o=t)||function(t,e){var n=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=n){var r,o,c,u,a=[],i=!0,l=!1;try{if(c=(n=n.call(t)).next,0===e){if(Object(n)!==n)return;i=!1}else for(;!(i=(r=c.call(n)).done)&&(a.push(r.value),a.length!==e);i=!0);}catch(t){l=!0,o=t}finally{try{if(!i&&null!=n.return&&(u=n.return(),Object(u)!==u))return}finally{if(l)throw o}}return a}}(o,c)||function(t,e){if(t){if("string"==typeof t)return g(t,e);var n={}.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?g(t,e):void 0}}(o,c)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),a=u[0],i=u[1];K=i._id,J.textContent=i.name,z.textContent=i.about,$.src=i.avatar,function(t){t.forEach((function(t){x.append(r(t,e,n,R,K,C,q))}))}(a)})).catch((function(t){console.log(t)})),A.addEventListener("submit",(function(t){var e,n;t.preventDefault(),t.target.querySelector(".button").textContent="Сохранить...",J.textContent=H.value,z.textContent=V.value,(e=H.value,n=V.value,fetch("".concat(h.baseUrl,"/users/me"),{method:"PATCH",headers:h.headers,body:JSON.stringify({name:e,about:n})}).then(b)).catch((function(t){return console.log(t)})).finally(t.target.querySelector(".button").textContent="Сохранить"),c(B)})),j.addEventListener("submit",(function(t){var e;t.preventDefault(),t.target.querySelector(".button").textContent="Сохранить...",(e=j.querySelector(".popup__input_type_url").value,fetch("".concat(h.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:h.headers,body:JSON.stringify({avatar:e})}).then(b)).catch((function(t){return console.log(t)})).finally(t.target.querySelector(".button").textContent="Сохранить"),$.src=j.querySelector(".popup__input_type_url").value,c(F)})),O.addEventListener("submit",(function(t){var o,u;t.preventDefault(),t.target.querySelector(".button").textContent="Сохранить...",(o=I.value,u=M.value,fetch("".concat(h.baseUrl,"/cards"),{method:"POST",headers:h.headers,body:JSON.stringify({name:o,link:u})})).then((function(t){return t.json()})).then((function(t){x.prepend(r(t,e,n,R,K,C,q))})).catch((function(t){console.log(t)})).finally(t.target.querySelector(".button").textContent="Сохранить"),S(P.querySelector(".popup__form"),Q),c(P)})),w.addEventListener("click",(function(){o(B),S(B.querySelector(".popup__form"),Q),H.value=J.textContent,V.value=z.textContent})),G.addEventListener("click",(function(){o(F),S(F.querySelector(".popup__form"),Q)})),U.addEventListener("click",(function(){S(P.querySelector(".popup__form"),Q),o(P)})),i(F),i(B),i(P),i(T)})();