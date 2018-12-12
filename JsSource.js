/**
Name:Feng Lin
Course: ISTE-340
*/
data.back; //Get data from data js file
//Attribute
var choose=[];
var myDiv;
var selectList;
var array
var first=true;
var second=true;
var third=true;
var get=null;
var getName;
var getPhone;
var getResult;
var checkEmpty;

function init(){

// If IEversion lower or equal to IE8, it will redirect
if(navigator.appVersion.indexOf("MSIE 8.")!=-1){
	alert("This is an old browser. To use this page get a new one");
	window.document.location.href="http://outdatedbrowser.com/en";
}



//Set the head for the web page
myDiv = document.getElementById("myDiv");
var head=document.createElement('h1');
	var headtext=document.createTextNode("Welcome to Habachi");
	head.appendChild(headtext);
	myDiv.appendChild(head);
//Create first select list.
var hEle=document.createElement('h4');
	hEle.setAttribute('style','color:black');
	var text=document.createTextNode(data[habachi][0]);
	hEle.appendChild(text);
	myDiv.appendChild(hEle);
    selectList = document.createElement("select");
selectList.setAttribute("id", "mySelect");
selectList.setAttribute("onchange","getSecondStep(mySelect.value)");
myDiv.appendChild(selectList);
OptionList(habachi);

//Store first select from user to local storage
if(get!=null && array.length>0 && first==true){
document.getElementById("mySelect").value=array[0];
getSecondStep(array[0]);
first=false;

}


}
//Create a second select list
function getSecondStep(test){	
RemoveList(1);
ToStore(mySelect.value)
console.log(test);
if(test!=checkEmpty){
    var hEle=document.createElement('h4');
	hEle.setAttribute('style','color:black');
	var text=document.createTextNode(data[test][0]);
	hEle.appendChild(text);
	myDiv.appendChild(hEle);	
   selectList = document.createElement("select");
selectList.setAttribute("id", "mySelect1");
selectList.setAttribute("onchange","getFinalStep(mySelect1.value)");
myDiv.appendChild(selectList);
OptionList(test);

//Store second select from user to local storage
if(get!=null && array.length>1 && second==true){
	document.getElementById("mySelect1").value=array[1];
	getFinalStep(array[1]);
	second=false;
}


}
}

//Create third select list
function getFinalStep(test){
	RemoveList(2);
	ToStore(mySelect1.value)
	console.log(test);
	if(test!=checkEmpty){
	var hEle=document.createElement('h4');
	hEle.setAttribute('style','color:black');
	var text=document.createTextNode(data[test][0]);
	hEle.appendChild(text);
	myDiv.appendChild(hEle);	
    selectList = document.createElement("select");
selectList.setAttribute("id", "mySelect2");
selectList.setAttribute("onchange","ToStore(mySelect2.value)");
myDiv.appendChild(selectList);
OptionList(test);
//Store third select from user to local storage
if(get!=null && array.length>2 && third==true){
	document.getElementById("mySelect2").value=array[2];
ToStore(array[2]);
	third=false;
}

}

}

//Create option list.
function OptionList(test){

	for (var i = 1; i < data[test].length; i++) {
    var option = document.createElement("option");
    option.setAttribute("value", data[test][i]);
    option.text = data[test][i]	;
    selectList.appendChild(option);
	}	
}

// it will remove select list when user changing select.
function RemoveList(x){
	var RemoveSelects=document.getElementsByTagName('select');
	var RemoveHead=document.getElementsByTagName('h4');
	var len=RemoveSelects.length;	
	if(x<len){
		for(var i=len-1; i>=x; i--){
			myDiv.removeChild(RemoveSelects[i]);	
			myDiv.removeChild(RemoveHead[i]);
		}
	}
}

//Store user select to array.
function ToStore(x){
var Selects=document.getElementsByTagName('select');
var len=Selects.length;
var arrlen=choose.length;	
var RemoveChooce=document.getElementById('choose');
var RemoveImage=document.getElementById('image');
console.log(choose);
console.log(len);
console.log(arrlen);
if(x!=checkEmpty){
	choose.push(x);
}
if(len==1 && arrlen>0){
	choose.splice(0,arrlen);
}
if(len==2 && arrlen>1){
	choose.splice(1,arrlen-1);
}
if(len==3 && arrlen>2){
	choose.splice(2,1);
	if (RemoveChooce!=null){
	  myDiv.removeChild(RemoveChooce);
	   myDiv.removeChild(RemoveImage);
	}
}
if(choose.length ==3)
{
	getFinal();
}
else
{
	if (RemoveChooce!=null &&len!=3){
	  myDiv.removeChild(RemoveChooce);
	  myDiv.removeChild(RemoveImage);
	}
}
if(window.localStorage){
localStorage.setItem("choose", JSON.stringify(choose));
}
}

//Show out the word and image of whhich user order.
function getFinal(){
 var hEle=document.createElement('p');
	hEle.setAttribute('id','choose');
	var text=document.createTextNode("Thank you! you order is "+choose[0]+" part "+choose[2]+" of "+choose[1]);
	hEle.appendChild(text);
	myDiv.appendChild(hEle);
	var imgEle=document.createElement('img');
	imgEle.setAttribute('id','image');
	imgEle.setAttribute('src','image/'+choose[2]+'.jpg');
	myDiv.appendChild(imgEle);
	ShowUp();
}

//Show up word slowly.
function ShowUp(){
  var elem = document.getElementById("choose");   
  var pos = 0;
  var id = setInterval(frame, 130);
  function frame() {
    if (pos == 1) {
      clearInterval(id);
    } else {
      pos=pos+0.1;
		elem.style.opacity = pos; 
      
    }
  }
}

