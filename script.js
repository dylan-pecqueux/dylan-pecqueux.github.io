//http://www.omdbapi.com/?apikey=836add35
//http://www.omdbapi.com/?t=hunger+games&apikey=836add35
/*
document.querySelector(".btn").addEventListener("click", function(event) {
  event.preventDefault();
})
*/

const showMovies = (title, year, poster, id) => {
  
  document.querySelector(".movies").innerHTML += `

    <div class="card card_show mb-3" style="width: 540px;">
      <div class="row g-0">
        <div class="col-md-4">
          <img class="card_img" src="${poster}">
        </div>
        <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">${title}</h5>
          <p class="card-text">${year}</p>
          <button class="btn btn-primary" onclick="showMore('${id}')">Read more</button>
        </div>
      </div>
    </div>
  </div>
  `

}

const modal = (title, description, poster, released) => {
  document.querySelector(".show").innerHTML += `
    <div id="myModal" class="modal">

      <div class="modal-content">
        <div class="element">
        <img class="img_modal" src="${poster}">
        <div class="description">
          <h3 class="text-primary">${title}</h3>
          <p>${released}</p>
          <p>${description}</p>
        </div>
        <span class="close">&times;</span>
        </div>
      </div>

    </div>  
  `
  document.querySelector(".close").addEventListener("click", () => {
    document.querySelector(".show").innerHTML = ""
  })
}


const addPlus = (value) => {
  return value.toLowerCase().split(" ").join("+");
}

const showMore = async function (id) {
  const response = await fetch(`http://www.omdbapi.com/?i=${id}&apikey=836add35`)
  const object = await response.json();
  try {
    modal(object.Title, object.Plot, object.Poster, object.Released);
  } catch (error) {
    console.error("error : ", error)
  }
}

const search = async function (event) {
  event.preventDefault();
  document.querySelector(".movies").innerHTML = "";
  const inputForm = document.searchForm.searchBar.value;
  const research = addPlus(inputForm);
  const response = await fetch(`http://www.omdbapi.com/?s=${research}&apikey=836add35`);
  const object = await response.json();
  try {
    object.Search.forEach(element => {
      showMovies(element.Title, element.Year, element.Poster, element.imdbID);
    })
    let observer = new IntersectionObserver(function (entries) {
      entries.forEach(element => {
        if(element.intersectionRatio > 0.5){
          element.target.classList.remove('not-visible');
          //observer.unobserve(element)
        } else {
          element.target.classList.add('not-visible')
        }
      })
    }, {
      threshold: [0.5]
    })
    let items = document.querySelectorAll('.card_show')
    items.forEach(item => {
      item.classList.add('not-visible')
      observer.observe(item)
    })
  } catch (error) {
    console.error("error : ", error)
  } 
  
}

