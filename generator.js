
let text = {};
text.defaultSettings = {};
text.story = {
  "start" : []
};

function generate() {

    storyList = story.split("\n");

    let textPart = "start";

    for(let i = 0; i < storyList.length; i++) {
      let line = storyList[i];
      if(!line.startsWith("#") && !(line === "" || typeof(line) === 'undefined')) {
        line.replace("\r", "");
        if(line.startsWith("- Title : ")) {
          text.title = line.replace("- Title : ", "");
        }
        else if(line.startsWith("- Color : ")) {
          text.defaultSettings["color"] = line.replace("- Color : ", "");
        }
        else if(line.startsWith("- Background-color : ")) {
          text.defaultSettings["bgColor"] = line.replace("- Background-color : ", "");
        }
        else if(line.startsWith("- Typemode : ")) {
          text.defaultSettings["typeMode"] = line.replace("- Typemode : ", "");
        }
        else if(line.startsWith("- Indicator : ")) {
          text.defaultSettings["indicator"] = line.replace("- Indicator : ", "");
        }
        else if(line.startsWith("!")) {
          line = line.replace("!", "");
          line = line.replace("\r", "");
          textPart = line;
          text.story[textPart] = [];
        }
        else {
          if(line.startsWith(">")) {
            text.story[textPart].push("");
          }
          else {
            let lastIndex = text.story[textPart].length - 1;
            if(lastIndex === -1) lastIndex = 0;
            if(line !== "\r" && !line.startsWith("[")) text.story[textPart][lastIndex] += "µ" + line;
            else if(line.startsWith("[")) text.story[textPart][lastIndex] += line;
          }
        }
      }
    }

    document.getElementById("menu").style.display = "none";
    document.getElementById("game").style.display = "block";

    setup();

    return false;
}
