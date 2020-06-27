/*This method evaluates XPath(XML Path Language) expressions against an XML based document (including HTML documents), 
and returns a XPathResult object, which can be a single node or a set of nodes.*/
function getElementByXpath(path) {
  return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}
// Checking page title to see if Tracer is the right element to use for our purpose
if (document.title.indexOf("Tracer") != -1) {
//Create a new button element
		var btn = document.createElement("button");
		var buttonLeft = document.createElement('span');
	    buttonLeft.setAttribute('class', 'buttonLeft');
//Set button properties or attribs
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
		btn.title = "Unselect Pega";
		btn.appendChild(buttonLeft);
		btn.appendChild(buttonMiddle);
		btn.appendChild(buttonRight);
//Perform the action on the onclick event
btn.onclick = function() {
	    var ruleSetList = getElementByXpath("//*[@id=\"RuleSetDisplay\"]/table/tbody/tr/td/table/tbody/tr/td/table/tbody").rows;
//Loop all the rulesets checkboxes from the Tracer screen and apply the logic
for (var i = ruleSetList.length - 2; i >= 0; i--) {
			var ruleSetName = ruleSetList[i].cells[0].innerText.trim();
			var enableAllRS=  ruleSetList[i].cells[0].innerText.trim();
//This is to uncheck the Enable All Rulesets checkbox and refresh the list of rulesets
			if (enableAllRS.match("Enable All Rulesets") && ruleSetList[i].cells[1].lastChild.checked==true){
					try{
					ruleSetList[i].cells[1].lastChild.checked = false;
					} catch (e){
					ruleSetList[i].cells[0].firstChild.checked = false;
					}
// This loop is to check in case we have the "Enable all Rulesets" checkbox got selected
				for(j=ruleSetList.length - 3; j >= 0; j--)
				{
					var rsname=ruleSetList[j].cells[0].innerText.trim();
					ruleSetList[j].cells[1].lastChild.style.display = "";
				   if(rsname.match("Pega")){
					//ruleSetList[j].cells[1].lastChild.style.display = "";
					try{
						ruleSetList[j+1].cells[1].lastChild.checked = false;
						} 
					catch (e){
						ruleSetList[j+1].cells[0].firstChild.checked = false;
						}
				 
					   };
				}

			}; 
//This is for unselecting the checkboxes having the name starts with Pega 
		    if (ruleSetName.match("Pega")){
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
