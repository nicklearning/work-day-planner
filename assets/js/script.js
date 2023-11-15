// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(document).ready(function () {


  $(function () {
    // store user input in local storage
    $('.saveBtn').on('click', function () {
      var content = $(this).parent().children().eq(1).val();
      var parentId = $(this).parent().attr('id');
      localStorage.setItem(parentId, content);
    });

    var timeBlocks = $(".time-block") // returns the array of time blocks
    var currentHour = dayjs().hour(); // grab the current hour

    for (let index = 0; index < timeBlocks.length; index++) { // loop over the array of timeblocks and conditionally set the color
      const element = timeBlocks[index]; // selects a timebox
      var timeBlockHour = timeBlocks[index].id.substring(5, 7) // returns the hour of the timeblock

      if (timeBlockHour == currentHour) { // update classlist to for the present hour
        if (element.classList.contains('past')) {
          element.classList.replace('past', 'present');
        } else if (element.classList.contains('future')) {
          element.classList.replace('future', 'present')
        } else {
          continue;
        }
      } else if (timeBlockHour < currentHour) { // update the classlist for past hours
        if (element.classList.contains('present')) {
          element.classList.replace('present', 'past')
        } else if (element.classList.contains('future')) {
          element.classList.replace('future', 'past')
        } else {
          continue;
        }
      } else if (timeBlockHour > currentHour) { // update the classlist for future hours
        if (element.classList.contains('present')) {
          element.classList.replace('present', 'future');
        } else if (element.classList.contains('past')) {
          element.classList.replace('past', 'future');
        } else {
          continue;
        }
      } // end outer if statement
    } // end for loop


    // Add code to get any user input that was saved in localStorage and set
    // the values of the corresponding textarea elements. 
    for (let index = 0; index < timeBlocks.length; index++) {
      var timeBlockHour = timeBlocks[index].id.substring(5, 7)
      var textAreaContent = localStorage.getItem('hour-' + timeBlockHour);
      $("#hour-" + timeBlockHour).children().eq(1).val(textAreaContent);
    }

    // display the date in the header
    var today = dayjs();
    $("#currentDay").text(today.format('dddd, MMMM D'));
  });
});
