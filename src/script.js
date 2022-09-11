let userList = document.querySelector(".users");
let val = document.querySelector("#prev");
let loader = document.querySelector(".loader");

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
  loader.style.display = 'block'

  // send the request
  request.send();

  request.addEventListener("load", function () {
  loader.style.display = 'none'

    let { results } = JSON.parse(request.responseText);
    response = results[0];
    let _data = '';
    const html = response[pageNo]?.map((item) => {
      let info = `<tr>
        <td>${item.row}</td>
        <td>${item.gender}</td>
        <td>${item?.age}</td>
       </tr>`;
       _data += info;
    });
    userList.innerHTML = _data;
  });
  document.getElementById("view").innerHTML = `Showing page ${pageNo}`
}

function next() {
  pageNo = pageNo + 1;
  buttonController()
  if (pageNo % 2 == 1) {
    getUserInfo(pageNo);
  console.log('page',pageNo) ;
  } else {
    console.log('page',pageNo) ;
    let _data = '';
    const html = response[pageNo]?.map((item) => {
      let info = `<tr>
        <td>${item?.row}</td>
        <td>${item?.gender}</td>
        <td>${item?.age}</td>
       </tr>`;
       _data += info;
    });
    userList.innerHTML = _data;
  }

  document.getElementById("view").innerHTML = `Showing page ${pageNo}`

}

function previous() {
  if (pageNo > 1) {
    console.log('page',pageNo) ;

    pageNo = pageNo - 1;
    getUserInfo(pageNo)
    let _data = '';
    const html = response[pageNo]?.map((item) => {
      let info = `<tr>
        <td>${item?.row}</td>
        <td>${item?.gender}</td>
        <td>${item?.age}</td>
       </tr>`;
       _data += info;
    });
    userList.innerHTML = _data;
  }
  buttonController()
  document.getElementById("view").innerHTML = `Showing page ${pageNo}`
}

function buttonController () {
    if (pageNo === 1) {
        val.setAttribute("disabled", true)
    } else {
        val.removeAttribute("disabled")
    }
}
