function getElementByXpath(path) {
  return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}
// Checking page title
if (document.title.indexOf("Tracer") != -1) {
    //Creating Elements
    var btn = document.createElement("button");
    var buttonLeft = document.createElement('span');
    buttonLeft.setAttribute('class', 'buttonLeft');
//Create a button with a title and all
var buttonText = document.createElement('span');
buttonText.setAttribute('class', 'buttonText');
    var t = document.createTextNode("Unselect Pega Rulesets");
    buttonText.appendChild(t);

var buttonMiddle = document.createElement('span');
buttonMiddle.setAttribute('class', 'buttonMiddle');
buttonMiddle.appendChild(buttonText);

var buttonRight = document.createElement('span');
buttonRight.setAttribute('class', 'buttonRight');

    btn.type = "button";
    btn.title = "Unselect Pega"
    btn.appendChild(buttonLeft)
    btn.appendChild(buttonMiddle)
    btn.appendChild(buttonRight)
//Write the onclick event to perform the action
        btn.onclick = function() {
    var ruleSetList = getElementByXpath("//*[@id=\"RuleSetDisplay\"]/table/tbody/tr/td/table/tbody/tr/td/table/tbody").rows;
//Loop all the rulesets checkboxes from the Tracer screen and apply the logic
    for (var i = ruleSetList.length - 2; i >= 0; i--) {
    var ruleSetName = ruleSetList[i].cells[0].innerText.trim();

var enableAllRS=  ruleSetList[i].cells[0].innerText.trim();
//This is to uncheck the Enable All Rulesets checkbox and refresh the list of rulesets
if (enableAllRS.startsWith("Enable All Rulesets") && ruleSetList[i].cells[1].lastChild.checked==true){
try{
ruleSetList[i].cells[1].lastChild.checked = false;
} catch (e){
ruleSetList[i].cells[0].firstChild.checked = false;
}
for(j=ruleSetList.length - 3; j >= 0; j--)
{
ruleSetList[j].cells[1].lastChild.style.display = "";
}

    };
//This is for unselecting the checkboxes having the name starts with Pega 
    if (ruleSetName.startsWith("Pega-")){

try{
ruleSetList[i].cells[1].lastChild.checked = false;

} catch (e){
ruleSetList[i].cells[0].firstChild.checked = false;
}
 
    };
    } 
    };
    //Appending the new changes to DOM structure
    document.getElementById("RuleSetDisplay").children[0].appendChild(btn);
}
