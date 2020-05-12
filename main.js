
let i, j;
let time;  // time beetween each letter writing
let textSpeed;  // text speed calculated with the time beetween the writing of each letter
let bag; // bag : place of your objects
let dialog; // dialog : array containing the dialogs
let isWriting;
let buttonsOn;  // button displayed
let colore; // default color
let mode;  // default type mode
let gameOver;
let gameStarted = false;

let indicator;
let title;

function setup() {
	isWriting = false;
	buttonsOn = false;

	colore = text.defaultSettings.color;
	document.body.style.background = text.defaultSettings.bgColor;
	mode = text.defaultSettings.typeMode;

	if(mode.startsWith('fast')) {
		mode = 'fast';  // Change mode to fast (slide) if the current mode is typeWriting
		document.getElementById('mode').innerHTML = 'Type mode : Slide';  // Write the type mode on page
	}
	else {
		mode = 'type';  // Change mode to type if the current mode is slide
		document.getElementById('mode').innerHTML = 'Type mode : TypeWriter';  // Write the type mode on page
	}

	time = 50;
	textSpeed = 100 - (time * 100 / 250);

	i = 0;
	j = 0;

	gameOver = false;

	bag = [];
	dialog = [];

	indicator = text.defaultSettings.indicator;

	document.getElementById("storyTitle").innerHTML = text.title;
	document.getElementById("titel").innerHTML = text.title;
	document.getElementById('speed').innerHTML = 'Text speed : '+ textSpeed +' %';

	gameStarted = true;

	setPath('start'); // Go to the first dialog set
	setTimeout(continu, 1500);

}

function typeWriter(txt, elem) {  // Type writing animation
	  window.scrollBy(0, 1000); // Always scroll the page to see the text
	  isWriting = true;  // Text is writing, do not play any dialog
	  if (j < txt.length) {
			if(txt.charAt(j) == 'µ')
				elem.innerHTML += '<br>'; // Replace µ with a line jump
			else elem.innerHTML += txt.charAt(j);
			j++;
			setTimeout(function() {typeWriter(txt, elem);}, time);
	  }
	  else {
			elem.innerHTML += ' ' + indicator;  // Add the indicator the end of the dialog
			isWriting = false;  // text is not writing anymore
	  }
}

function say(text, colore) {  // Function to write the text on the screen
  let f = document.createElement("span");  // Create a <span>
  f.style.color = colore;  // Set the color text
  if(mode.startsWith('type')) {
	  f.innerHTML = '<br>'; // Return to line before writing
	  j = 0;
	  document.getElementsByTagName('header')[0].appendChild(f); // Add f (the span element) to the header
	  typeWriter(text, f);  // Use typeWrite animation to write
  }
  else if(mode.startsWith('fast')) {
	  f.setAttribute('class',"w3-animate-left");  // Use the left slide animation of w3
	  text = text.replace(/µ/g, '<br>')  // Replace all the µ with line jumps
	  f.innerHTML = '<br>' + text; // Return to line then write the text
	  document.getElementsByTagName('header')[0].appendChild(f); // Add f (the span element) to the header
  }
  window.scrollBy(0, 1000);  // Always scroll the page to see the text
}

document.addEventListener('keypress', function(key) {
	if(gameStarted) {
		if(key.key === "p") {
			if(time - 5 > 0)  // Do not go under 0 for time
			  time -= 5;  // If it's okay, decrease the time and increase the text speed
			textSpeed = 100 - (time * 100 / 250); // Calcul text speed
			document.getElementById('speed').innerHTML = 'Text speed : '+ textSpeed +' %'; // Calcul text speed
		}
		else if(key.key == "m") {
			if(time + 5 < 250)  // Do not go over 250 for time
				time += 5; // If it's okay, increase the time and decrease the text speed
			textSpeed = 100 - (time * 100 / 250); // Calcul text speed
			document.getElementById('speed').innerHTML = 'Text speed : '+ textSpeed +' %'; // Calcul text speed
		}
		else if(key.key === "l") {
			if(mode == 'type') {
			  mode = 'fast';  // Change mode to fast (slide) if the current mode is typeWriting
			  document.getElementById('mode').innerHTML = 'Type mode : Slide';  // Write the type mode on page
			}
			else {
			  mode = 'type';  // Change mode to type if the current mode is slide
			  document.getElementById('mode').innerHTML = 'Type mode : TypeWriter';  // Write the type mode on page
			}
		}
		else if(key.keyCode !== 122 && key.keyCode !== 27)  // Any key pressed but not F11 and echap
	    continu(); // Go for the play
	}
});

document.addEventListener('click', function() {
	if(gameStarted) continu();
});

function continu() {  // Let's play
  if(!isWriting && !buttonsOn && !gameOver) {  // If text is not writing and the button are not displayed
		if(dialog[i].includes('[color] ')) {  // If the dialog contains "color : "
		  colore = dialog[i].replace("[color] ", ""); // Update the color
		  i++;  // Go to next dialog
			continu();
		}
		else if(dialog[i].includes('[bgColor] ')) { // If the dialog contains "bgColor : "
		  document.body.style.background = dialog[i].replace("[bgColor] ", "");  // Update the bg color
		  i++;  // Go to next dialog
			continu();
		}

		else if(dialog[i].includes('[ask] ')) { // If the dialog contains "[ask]"
		  ask(dialog[i].replace('[ask] ', '').split("|")[0], dialog[i].replace('[ask] ', '').split("|")[1]); // Ask function with the first proposition (before the | and the second after)
		}
		else if(dialog[i].includes('[goto] ')) { // If the dialog contains "goto : "
		  setPath(dialog[i].replace('[goto] ', ''));  // set the right path
		  continu();  // Continue the game
		}
		else if(dialog[i] === "[removeAll]") removeAll(); // If the dialog is ".removeAll." remove everyyhing on the page
		else if(dialog[i].includes("[win] ")) { // If the dialog contains ".win."
		  win(dialog[i].replace('[win] ', '')); // Display the message left
		}
		else if(dialog[i].includes("[die] ")) { // If the dialog is ".die." Kill the player
		  death(dialog[i].replace('[die] ', '')); // Display the message left
		}
		else {
		  say(dialog[i], colore); i++; // Finally, say the dialog.
		}
  }
}

function ask(one, two) {  // Function to ask the player
  var button1 = document.getElementById("button1");  // Take the buttons as HTML element
  var button2 = document.getElementById("button2");

  button1.innerHTML = one;  // Write the choices
  button2.innerHTML = two;

  button1.style.display = "block"; // Display the buttons
  button2.style.display = "block";

  buttonsOn = true;  // Buttons displayed

  button1.onclick = function(){setPath(one); continu()};
  button2.onclick = function(){setPath(two); continu()};

}

function death(texte) {  // Kill the player
	document.getElementById("endMessage").innerHTML = texte;
  document.getElementById("myModal").style.display = "block"; // Display the death modal
	gameOver = true;
}

function win(texte) {  // Make the player win. text is the ending message
  var monolog = new Monolog({ // Create the monolog of monolog.js and monolog.css
		loader  : false,
		content: "<h1 style='text-align: center;'>" + texte + "</h1>",  // Write the text inside
		close: false
  });
  monolog.show();  // Show the monolog
	gameOver = true;
}

function removeAll() { document.body.innerHTML = ""; i++ }  // Empty the html body and continue

function setPath(set) {  // Set the dialog for the chosen path (set)

  i = 0;  // Reset i
  document.getElementById('button1').style.display = "none";
  document.getElementById('button2').style.display = "none";
  buttonsOn = false;

	set = set.replace("\r", "");

	if(typeof(text.story[set]) !== 'undefined')
		dialog = text.story[set];
	else {
		dialog = [
			"The story encountered an error.                           µThis path doesn't exist...                               µPlease ask to the writer.",
			"µThe concerned path is " + set,
			"[die] What a poor end ..."
		];
		console.log(set);
	}

  isWriting = false;
}
