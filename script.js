
var button = document.getElementById("myBtn");
var charNum = document.querySelector("input[name='charNum']");
var gotNames = document.getElementById("gotNames");
var gotTitles = document.getElementById("gotTitles");
var gotSpouse = document.getElementById("gotSpouse");
var name;
var titles;
var spouse;
var spouseName;
var houseBtn = document.getElementById("houseBtn");
var houseNum = document.querySelector("input[name='houses']");
var houseTag = document.getElementById("houseName");
var regionTag = document.getElementById("region");
var leaderTag = document.getElementById("leader");
var heirTag = document.getElementById("heir");
var house;
var region;
var leader;
var heir;

button.addEventListener('click', e => {
axios.get(`https://www.anapioficeandfire.com/api/characters/${charNum.value}`)
.then(response => {
  name = response.data.name;
  gotNames.textContent = `NAME - ${name}`;
});
});

button.addEventListener('click', e => {
axios.get(`https://www.anapioficeandfire.com/api/characters/${charNum.value}`)
.then(response => {
  titles = response.data.titles;
  gotTitles.textContent = `TITLES - ${titles}`;
});
});

button.addEventListener('click', e => {
axios.get(`https://www.anapioficeandfire.com/api/characters/${charNum.value}`)
.then(response => {
  spouse = response.data.spouse;

  axios.get(spouse)
  .then(response => {
      spouseName = response.data.name;
      gotSpouse.textContent = `SPOUSE - ${spouseName}`;
  });
});
});

houseBtn.addEventListener('click', e => {
  axios.get(`https://www.anapioficeandfire.com/api/houses/${houseNum.value}`)
  .then(response => {
    house = response.data.name;
    houseTag.textContent = `NAME - ${house}`
  })
})

houseBtn.addEventListener('click', e => {
  axios.get(`https://www.anapioficeandfire.com/api/houses/${houseNum.value}`)
  .then(response => {
    region = response.data.region;
    regionTag.textContent = `REGION - ${region}`
  })
})

houseBtn.addEventListener('click', e => {
  axios.get(`https://www.anapioficeandfire.com/api/houses/${houseNum.value}`)
  .then(response => {
    leader = response.data.currentLord;

      axios.get(leader)
      .then(response => {
          let leaderName = response.data.name;
          leaderTag.textContent = `LEADER - ${leaderName}`;
    })
  })
})

houseBtn.addEventListener('click', e => {
  axios.get(`https://www.anapioficeandfire.com/api/houses/${houseNum.value}`)
  .then(response => {
    heir = response.data.heir;

    axios.get(heir)
    .then(response => {
        let heirName = response.data.name;
        heirTag.textContent = `HEIR - ${heirName}`
    })
  })
})
