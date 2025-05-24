let myLeads = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn");
const ulEl = document.getElementById("ul-el");
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads"));


if(leadsFromLocalStorage){
    myLeads=leadsFromLocalStorage;
    renderLeads(myLeads);
}

function renderLeads(array){
    
    let listItems="";
    for(let i=0; i<array.length; i++){
        listItems += `<li> <a href="${array[i]}" target="_blank" rel="noopener noreferrer">  ${array[i]} </a> </li>`;
    }
    ulEl.innerHTML=listItems;
}

inputBtn.addEventListener("click", function(){
    myLeads.push(inputEl.value);
    inputEl.value="";

    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    renderLeads(myLeads);
})

tabBtn.addEventListener("click", function(){

    chrome.tabs.query({active: true, currentWindow:true}, function(tabs){
        myLeads.push(tabs[0].url);
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        renderLeads(myLeads);
    })


})

deleteBtn.addEventListener("dblclick", function(){
    localStorage.clear();
    myLeads = [];     
    renderLeads(myLeads);
})


