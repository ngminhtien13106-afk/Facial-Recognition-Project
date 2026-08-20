const API = "http://localhost:3000/list_names";

function Start() {
  getListNumberName(ShowListNumberName);
  handledisplay();
  handleinfomation();


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
  var element_ul = document.querySelector(".head_list_ul");
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
// open img
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
//  cancel img
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
// handle information

let currentPerson = null;
let currentData = null;
function handleinfomation() {
  var element_person = document.querySelectorAll(".person");
  var element_information = document.querySelector(".div_information");

  element_person.forEach(function (curr) {
    curr.addEventListener("click", () => {

      currentPerson = curr.dataset.person;
      fetch(API)
        .then((resolve) => {
          return resolve.json();
        })
        .then((data) => {
          const personData = data.find((item) => {
            return item.person === currentPerson;
          })
          currentData = personData;
          element_information.style.display = "block";
          if (personData) {
            // Đã có dữ liệu
            showInformation(personData);
          } else {
            // Chưa có dữ liệu
            clearInformation();
          }
        })


    })
  })



  cancelInformation();


}

function showInformation(data) {

  document.querySelector(".input-1").value = data.id || "";
  document.querySelector(".input-2").value = data.name || "";
  document.querySelector(".input-3").value = data.age || "";
  document.querySelector(".input-4").value = data.Address || "";


}
// cancel display information
function cancelInformation() {
  var element_cancel = document.querySelector(".cancel")
  var element_information = document.querySelector(".div_information");

  element_cancel.addEventListener("click", () => {
    element_information.style.display = "none";

  })
}

function clearInformation() {

  document.querySelector(".input-1").value = "";
  document.querySelector(".input-2").value = "";
  document.querySelector(".input-3").value = "";
  document.querySelector(".input-4").value = "";

}

// add information 
document.querySelector(".btn-add").addEventListener("click", addinformation);
function addinformation() {
  const id = document.querySelector(".input-1").value;
  const name = document.querySelector(".input-2").value;
  const age = document.querySelector(".input-3").value;
  const Address = document.querySelector(".input-4").value;
  const newPerson = {
    person: currentPerson,
    id: id,
    name: name,
    age: age,
    Address: Address
  };
  var options = {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newPerson)
  }
  fetch(API, options)
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      currentData = res;

      alert("Thêm thành công");
      document.querySelector(".div_information").style.display = "none";
    })
}
// updata information
document.querySelector(".btn-put").addEventListener("click", updatainformation);
function updatainformation() {
  const id = document.querySelector(".input-1").value;
  const name = document.querySelector(".input-2").value;
  const age = document.querySelector(".input-3").value;
  const Address = document.querySelector(".input-4").value;
  const newPerson = {
    person: currentPerson,
    id: id,
    name: name,
    age: age,
    Address: Address
  };
  var options = {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newPerson)
  }
  fetch(API + "/" + id, options)
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      currentData = res;

      alert("Updata thành công");
      document.querySelector(".div_information").style.display = "none";
    })
}
// delete information
document.querySelector(".btn-delete").addEventListener("click", deleteinformation);
function deleteinformation() {
  const id = document.querySelector(".input-1").value;
  const name = document.querySelector(".input-2").value;
  const age = document.querySelector(".input-3").value;
  const Address = document.querySelector(".input-4").value;
  const newPerson = {
    person: currentPerson,
    id: id,
    name: name,
    age: age,
    Address: Address
  };
  var options = {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newPerson)
  }
  fetch(API + "/" + id, options)
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      currentData = res;

      alert("Delete thành công");
      document.querySelector(".div_information").style.display = "none";

    })
}

