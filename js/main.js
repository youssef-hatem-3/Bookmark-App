var siteNameInput = document.getElementById('siteNameInput');
var siteUrlInput = document.getElementById('siteUrlInput');
var addBtn = document.getElementById("addBtn");
var noteAlertName = document.getElementById("noteAlertName");
var noteALertUrl = document.getElementById("noteALertUrl");
var noteAlertUrlExisting = document.getElementById("noteAlertUrlExisting");

var urlsContainer ;
///////////////////////////////////////Display when open/////////////////////////
if(localStorage.getItem('myUrls') != null)
{
    urlsContainer = JSON.parse(localStorage.getItem('myUrls')); 
    displayProducts(urlsContainer);
}
else
{
    urlsContainer = [] ;
}
///////////////////////////////////////add///////////////////////////////////////
function addUrl(){
    var urlInfo = 
    {
        name: siteNameInput.value,
        urlSite: siteUrlInput.value
    }
    if( siteNameInput.value == ""  && siteUrlInput.value == ""  )
    {
        noteALertUrl.classList.replace('d-none','d-block');
        noteAlertName.classList.replace('d-none','d-block');
    }
    else if(siteNameInput.value == "")
    {
        noteAlertName.classList.replace('d-none','d-block');
    }
    else if(siteUrlInput.value == "")
    {
        noteALertUrl.classList.replace('d-none','d-block');
    }
    else if ( check() == true )
    {
        noteAlertUrlExisting.classList.replace('d-none','d-block')
    }
    else if ( validationUrl() == false )
    {
        noteALertUrl.classList.replace('d-none','d-block')
    }
    else
    {
        urlsContainer.push(urlInfo);
        localStorage.setItem('myUrls',JSON.stringify(urlsContainer)) 
        clearForm();
        displayProducts(urlsContainer);   
        noteAlertUrlExisting.classList.replace('d-block','d-none') 
        noteAlertName.classList.replace('d-block','d-none');
        noteALertUrl.classList.replace('d-block','d-none');
    }
}
addBtn.addEventListener('click',function(){
    addUrl();
})

///////////////////////////////////////clear///////////////////////////////////////
function clearForm() {
    siteNameInput.value = "";
    siteUrlInput.value = "";
}
///////////////////////////////////////Display///////////////////////////////////////
function displayProducts(list) {
    var cartoona = ``;
    for (var i = 0; i < list.length; i++) {
        cartoona += `<div class="container w-75 tableRow" >
        <div class="row py-4">
            <div class="col-3">
                <h3>${list[i].name}</h3>
            </div>
            <div class="col-3">
            <button onclick="window.location.href='https://${list[i].urlSite}/'" class=" visitBtn " >Visit</button>
                <button onclick="deleteProducts(${i})" class=" deleteBtn "> Delete</button>
            </div>
        </div>
    </div>`;
    }
    document.getElementById('content').innerHTML = cartoona;
}
///////////////////////////////////////Delete///////////////////////////////////////
function deleteProducts (deletedIndex) 
{
    urlsContainer.splice(deletedIndex,1)
    localStorage.setItem('myUrls',JSON.stringify(urlsContainer));
    displayProducts(urlsContainer);
}
//////////////////////////////////////Validation of URL/////////////////////////////
function validationUrl(){
var regex = /^www\.[a-z]{0,20}\.com$/ ;
if (regex.test(siteUrlInput.value) == true )
    {
        return true  ;
    }
else
    {
        return false ;
    }
}
///////////////////////////////////////Existing of URL/////////////////////////////////
function check(){
    for (var i = 0; i < urlsContainer.length; i++) {
        if(siteNameInput.value == urlsContainer[i].name)
        {
            return true ;
        }
        else
        {
            noteAlertUrlExisting.classList.add("none")
        }
    }
}
