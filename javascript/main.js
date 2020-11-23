// Add Doc Ready to make sure contentDiv is not null
var contentDiv = document.getElementById("content");
var positionX = 0;
var speed = 100;
var margin = 300;
var hiddenObjects = [];
var romoActive = false;
var lunaActive = false;


contentDiv.addEventListener("mousemove", (event) =>{
    positionX = event.clientX;
    //console.log("X = " + positionX);
    // console.log("Y = " + event.clientY);

});

function scroller() 
{
  var divSize = window.innerWidth;
  var centerX = divSize / 2;
  var scrollX = Math.abs(divSize - positionX - margin) / (divSize - centerX - margin) * speed; // Hardcode safe zone = 200px
  
  var currentPosition = parseInt(window.getComputedStyle(contentDiv).backgroundPosition.split(" ")[0].replace("px",""));

  var backgroundPos = 0;
  if (positionX < centerX - margin) 
  {
     // console.log("currentPosition", currentPosition);

    //console.log("scrollX", scrollX);
      if (currentPosition < 0) 
      {
        contentDiv.style.backgroundPosition = Math.ceil(currentPosition + scrollX) + 'px 0px';
        backgroundPos = Math.ceil(currentPosition + scrollX);
        adjustHiddenObjects(backgroundPos);
      }
  } else if (positionX > centerX + margin) 
  {
      if (currentPosition > -4000 + (divSize)) 
      {
        contentDiv.style.backgroundPosition = Math.floor(currentPosition - scrollX) + 'px 0px';
        backgroundPos = Math.floor(currentPosition - scrollX);
        adjustHiddenObjects(backgroundPos);
      }
  }

}

setInterval(scroller, 50);

function adjustHiddenObjects(backgroundPos) 
{
    for (var i = 0; i < hiddenObjects.length; i++) {
    // console.log(parseInt(hiddenObjects[i].dataset.x) + backgroundPos);

    hiddenObjects[i].style.left = (parseInt(hiddenObjects[i].dataset.x) + backgroundPos) + "px"; 
  }
}


// Cat Logic
// OrgY = 864
var catPlacements = [
  {x: 358, y: 353, img: '//drive.google.com/uc?id=18FkJtD2XrMS2y088kHWLI2HPH8vkbRfF', type: 'Romo'}, 
  {x: 470, y: 433, img: '//drive.google.com/uc?id=1-02Vb-9NxIA4CU1MGcwV6lRiHWh_uTa0', type: 'Luna'}, 
  {x: 1180,y: 315, img: '//drive.google.com/uc?id=18FkJtD2XrMS2y088kHWLI2HPH8vkbRfF', type: 'Romo'}, // Continue here
  {x: 1483,y: 205, img: '//drive.google.com/uc?id=1-02Vb-9NxIA4CU1MGcwV6lRiHWh_uTa0', type: 'Luna'}, 
  {x: 2292,y: 183, img: '//drive.google.com/uc?id=18FkJtD2XrMS2y088kHWLI2HPH8vkbRfF', type: 'Romo'}, 
  {x: 2582,y: 265, img: '//drive.google.com/uc?id=1-02Vb-9NxIA4CU1MGcwV6lRiHWh_uTa0', type: 'Luna'}, 
  {x: 3083,y: 375, img: '//drive.google.com/uc?id=18FkJtD2XrMS2y088kHWLI2HPH8vkbRfF', type: 'Romo'}
];

function getRandomElementFromArray(array) 
{
  var randomInt = getRndInteger(0, array.length);
  var currentElement = array[randomInt];
  return currentElement;
}

function hiddenObjectClickHandler(event) 
{
  var romoGifSource = '1HLeksP1ecQntTedZTH3PzPhoD0f4afD-';
  var lunaGifSource = '10oqUdT_fxfDEbhMd4hhhiM09GfjhYnKM';

  // TODO Make this based off of each cat
  randSrc = getRandomElementFromArray([romoGifSource, lunaGifSource]);

  var src = '//drive.google.com/uc?id=' + randSrc; // 
  swal({
         title: "You found me!",
         icon: src,
         content:true,
  });
}

// Recal size on browser resize cat & cat position


function introModal () 
{

  var src = '//drive.google.com/uc?id=' + '1LEZEoRJsf2eFXRlcDlc3PolL_hfOyln3'; // 
  swal({
    title: "Welcome to your very own find the Gals Game",
    icon: src,
    content:true,
    buttons: false,
    timer: 2200,  
  });

}

function createHiddenObject(props) 
{
  let element = document.createElement('div');
  element.style.position = "absolute";
  element.style.left = props.x + "px";
  element.style.top = props.y + "px"; // HARDCODED - accomated to diff window sizes
  // HARDCODE SIZE put in array if sizes are diff
  element.style.width = "62px";
  element.style.height = "84px";
  element.dataset.x = props.x;
  element.dataset.y = props.y;


  element.addEventListener('click', hiddenObjectClickHandler); // Can Add Gal type here need to figure out event, galTypepassing
  element.style.backgroundImage = "url('" + props.img +"')";

  
  contentDiv.appendChild(element);


  hiddenObjects.push(element);
}

// 0-6
function getRndInteger(min, max) 
{
  return Math.floor(Math.random() * (max - min) ) + min;
}

function getRandomCats() 
{
  var currentCat = getRandomElementFromArray(catPlacements);
  var lunaAndRomo = [currentCat];

  if (currentCat.type == "Luna") 
  {
    lunaActive = true;
  } 
  else 
  {
    romoActive = true;
  }
  // Get new Cat
  // check to see if type is missing cat
  // get new cat
  while (lunaActive !== true || romoActive !== true) 
  {
    var newCat = getRandomElementFromArray(catPlacements);
    if (newCat.type == "Luna" && !lunaActive) 
    {
      lunaActive = true;
      lunaAndRomo.push(newCat);
    } 
    else if (newCat.type == "Romo" && !romoActive)
    {
      romoActive = true;
      lunaAndRomo.push(newCat);
    }
    //
  }
  console.log(lunaAndRomo);
  return lunaAndRomo; 
}

function generateAndPlaceCats() 
{
  var placements = getRandomCats();
  for (var i = 0; i < placements.length; i++) {
    createHiddenObject(placements[i]);
  }
}

// Hack use event loader in the future.... Ask Ricardo more!
// setTimeout(function(){ createHiddenObject(catPlacements[6]); }, 800);
setTimeout(function(){ generateAndPlaceCats(); }, 800);
setTimeout(function(){ introModal(); }, 200);



