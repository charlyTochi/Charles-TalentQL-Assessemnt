let userList = document.querySelector(".users");
let val = document.querySelector("#prev");

let pageNo = 1;
let response = {};
function getUserInfo() {
    buttonController();
  // create an XMLHttpRequest Object
  let request = new XMLHttpRequest();

  //create the request
  request.open(
    "GET",
    `https://randomapi.com/api/8csrgnjw?key=LEIX-GF3O-AG7I-6J84&page=${pageNo}`
  );

  // send the request
  request.send();

  request.addEventListener("load", function () {
    let { results } = JSON.parse(request.responseText);

    response = results[0];

    const html = response[pageNo].map((item) => {
      return ` <tr>
        <td>${item.row}</td>
        <td>${item.gender}</td>
        <td>${item?.age}</td>
       </tr>
    `;
    });
    userList.innerHTML = html;
  });
}

function next() {
  pageNo = pageNo + 1;
  buttonController()
  if (pageNo % 2 == 1) {
    getUserInfo(pageNo);
  } else {
    const html = response[pageNo].map((item) => {
      return ` <tr>
        <td>${item?.row}</td>
        <td>${item?.gender}</td>
        <td>${item?.age}</td>
       </tr>
    `;
    });
    userList.innerHTML = html;
  }
}

function previous() {

  if (pageNo > 1) {
    pageNo = pageNo - 1;
    const html = response[pageNo].map((item) => {
      return ` <tr>
        <td>${item?.row}</td>
        <td>${item?.gender}</td>
        <td>${item?.age}</td>
       </tr>
    `;
    });
    userList.innerHTML = html;
  }
  buttonController()
}

function buttonController () {
    if (pageNo === 1) {
        val.setAttribute("disabled", true)
    } else {
        val.removeAttribute("disabled")
    }
}
