// save reference to important DOM elements
var currentDayDisplayEl = $("#currentDay");
var timeBlock = $(".time-block");
var btnSave = $(".saveBtn");

// Wrap all code that interacts with the DOM in a call to jQuery to ensure that the code isn't run until the browser has finished rendering all the elements in the html.

$(document).ready(function () {
  function init() {
    displayCurrentDay();
    renderEvents();
    setColors();
  }

  // Add an event listener when save buttons are clicked and also save the event in local storage

  btnSave.on("click", function (event) {
    event.preventDefault();
    var eventId = $(this).parent(".time-block").attr("id");
    //console.log(eventID);
    var hourlyEvent = $(this)
      .parent(".time-block")
      .children(".description")
      .val()
      .trim();
    localStorage.setItem(eventId, hourlyEvent);
  });

  // Using the id attribute of each time-block to add or remove the past, present and future classes and setting colors for each time-block

  function setColors() {
    // getting current hour using dayjs
    var currentHour = dayjs().format("H");
    //console.log(currentHour);

    var hoursOfTheDay = [];
    for (var i = 0; i < timeBlock.length; i++) {
      hoursOfTheDay[i] = timeBlock[i].getAttribute("id").split("-")[1];
    }
    //console.log(hoursOfTheDay);
    for (var i = 0; i < hoursOfTheDay.length; i++) {
      var current = $(timeBlock[i]);
      //console.log(hoursOfTheDay[i]);
      //console.log(current);
      if (hoursOfTheDay[i] < currentHour) {
        current.addClass("past");
      } else if (hoursOfTheDay[i] === currentHour) {
        current.addClass("present");
      } else if (hoursOfTheDay[i] > currentHour) {
        current.addClass("future");
      }
    }
  }

  // retrieveing event saved in local storage

  function renderEvents() {
    for (var i = 9; i < 19; i++) {
      $(`#hour-${i}`)
        .children(".description")
        .val(localStorage.getItem(`hour-${i}`));
    }
  }

  // code to display the current date in the header of the page.

  function displayCurrentDay() {
    var today = dayjs().format("dddd, MMMM D");
    currentDayDisplayEl.text(today);
  }

  //initialisation
  init();
});
