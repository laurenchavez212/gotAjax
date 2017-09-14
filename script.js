$(document).ready(function(){
  var chars;

  function renderPage(params){
    var params = params || {};

    resetCharacters();

    if(params.single){
      console.log("single");
      chars.push(params.single);
    } else if(params.add) {
      console.log("add");
      initializeCharacters();
      chars.push(params.add);
    } else {
      console.log("general");
      initializeCharacters();
    }

    chars.forEach(function(char){
      $.get(`https://www.anapioficeandfire.com/api/characters/${char}`, function(data){
        // get the array of titles and join into a comma separated list.
        let titles = data.titles.join(", ");

        // make a "component" that we will insert into the div
        let card_content= `
          <div class="charCard">
            <div class="innerCharCard">
              <h1>${data.name}</h1>
              <p> TITLES: </p>
              <p> ${titles} </p>
              spouse_placeholder
            </div>
          </div>`;

          // if there's a spouse, replace our spouse_placeholder with the actual spouse.
          if(data.spouse){
            $.get(data.spouse,function(spouseData){
                let spouse_name = '<p> SPOUSE - '+spouseData.name+' </p>';
                card_content = card_content.replace("spouse_placeholder",spouse_name);
                $(".container").append(card_content);

            });
          // if not, just replace spouse placeholder with an empty string.
          } else {
            card_content = card_content.replace("spouse_placeholder","");
            $(".container").append(card_content);
          }


      });
    })

  }// end function renderPage

  function renderHouses(){
    $.get('https://www.anapioficeandfire.com/api/houses', function(data){
      var random_house_array = [];

      while(random_house_array.length < 3){
        console.log("looping");
          // get a random house
          let random_house_number = Math.floor(Math.random() * data.length);
          if (!random_house_array.includes(random_house_number)){
            random_house_array.push(random_house_number);
          }
      }

      random_house_array.forEach(function(house_id){
        let the_house = data[house_id];

        if (the_house.heir){
          $.get(the_house.heir, function(heir){
            // grab the id from the heir
            let heir_id = heir.url ? heir.url.split("/").slice(-1).join("") : null;

            let house_and_heir_component =
            `<div class="houseCard">
              <h4>${the_house.name}</h4>
              Heir: <a href="#" class="heir_link" id="${heir_id}">${heir.name}</a>
              Region: ${the_house.region}
            </div>`;

            $(".houses_container").append(house_and_heir_component);
          });
        } else {
          let house_component =
          `<div class="houseCard">
            <h4>${the_house.name}</h4>
            Region: ${the_house.region}
          </div>`;
          $(".houses_container").append(house_component);
        }
      })
    });
  }


  renderPage();
  renderHouses();

  // functions
  function initializeCharacters(){
    chars = [148,1052,150];
  }

  function resetCharacters(){
    chars = [];
    $(".container").html("");
  }

  // event handlers
  $("#search_button").click(function(){
     let user_provided_id = $("#searchBox").val();
     if(user_provided_id){
       renderPage({single: user_provided_id});
     }
  })

  $("#clear_button").click(function(){
    $("#searchBox").val("");
    resetCharacters();
    renderPage();
  })

  $(document).on('click', '.heir_link', function(e){
    let my_id = e.target.id;
    renderPage({add:my_id});
    e.preventDefault();
  })






}) // end document.ready
