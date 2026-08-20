const API = " http://localhost:3000/list_names";

function Start() {
  getListNumberName(ShowListNumberName);
  handledisplay();


}

Start();


// Get List number name
function getListNumberName(callback) {
  fetch(API)
    .then((resolves) => {
      return resolves.json();
    })
    .then(callback)
}

// Show List Number name
function ShowListNumberName(resolve) {
  var html = resolve.map((resolve) => {
    return `<li>
            <b> Id: </b> ${resolve.id} || <b> Name: </b> ${resolve.name}
            </li>`;
  }).join(" ")

  ClickShowList(html)
}
// click show 
function ClickShowList(resulthtml) {
  var element_img = document.querySelector(".content2_img");
  var element_ul = document.querySelector(".content3_ul");
  let bl = true;

  element_img.addEventListener("click", () => {
    if (bl) {
      element_ul.style.display = "block";
      element_ul.innerHTML = resulthtml;
      bl = false;
    }
    else {
      element_ul.style.display = "none";
      bl = true
    }


  })



}

// handle image display (xử lý )
function handledisplay() {
  var elementButton = document.querySelector(".div_button");
  var elementimg = document.querySelector(".div_head_img");
  var elementButtons = document.querySelector(".buttons")
  elementButton.addEventListener("click", (e) => {
    elementButton.style.display = "none";
    elementimg.style.display = "block";
    elementButtons.style.display = "block";
  })
  handlehidden();

}

function handlehidden() {
  var elementButtons = document.querySelector(".buttons")
  var elementButton = document.querySelector(".div_button");
  var elementimg = document.querySelector(".div_head_img");
  elementButtons.addEventListener("click", () => {
    elementButton.style.display = "flex";
    elementimg.style.display = "none";
    elementButtons.style.display = "none";
  })
}
