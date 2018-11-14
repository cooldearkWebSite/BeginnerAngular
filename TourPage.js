var myapp=angular.module("myapp",["ngRoute"]);// ngRoute is used by router
myapp.config(function($routeProvider){// Need to declare this function,routeProvider then you can route your page
	$routeProvider.when("/",{// In this line, when "/" this meaning is "Main page" , you get in this web first glance is TourPage1.html 
		templateUrl:"TourPage1.html"
	})
	.when("/Donuts",{//In this line is declare event, when you trigger enhance about "/Dounts" this event ,then will lead you to TourDonuts.html
		templateUrl:"TourDonuts.html"
	})
	
});

myapp.controller("myctrl",function($interval,$scope,$element,$document){//In this line is declare different views to use different controller.
	var that=this;
	that.errorMessage="";
	that.emailRestriction=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	var myImgTimes=0;
	slideImg();
	function slideImg(){
		var x=$element[0].getElementsByClassName("mySlides");
		for(var a=0;a<x.length;a++){//Let all mySlides of id display be none.
			x[a].style.display="none";
		}
		myImgTimes++;
		if(myImgTimes>x.length){
			myImgTimes=1;
		}
		x[myImgTimes-1].style.display="block";
		setTimeout(slideImg,4000);
	}
	
	that.buyTicket=function(place){
		var takeId=$document[0].getElementById("BuyTicketPopUP");
		takeId.style.display="block";
		if(place=="newyork"){
			that.choicePlace="New York";
		}else if(place=="paris"){
			that.choicePlace="Paris";
		}else if(place=="san"){
			that.choicePlace="San Frasco";
		}
	}
	
	that.cancel=function(item){
		if(item==1){
			var showId=$document[0].getElementById("BuyTicketPopUP");
			showId.style.display="none";
		}else if(item==2){
			var showId=$document[0].getElementById("confirmTablePopUp");
			showId.style.display="none";
		}
		
	}
	
	that.confirm=function(quantity,email,event){
		if((quantity==0)){
			that.errorMessage="Quantity between 1~99!";
		}else{
			that.errorMessage="";
			that.totalPrice=quantity*15;
			var takeId=$document[0].getElementById("confirmTablePopUp");
			takeId.style.display="block";
		}
	}
	
	
	that.submit=function(){
		var show=$document[0].getElementById("completePopUp");
		var getSubBtn=$document[0].getElementById("submitBtn");
		var getCancelBtn=$document[0].getElementById("cancelBtn");
		getSubBtn.disabled=true;//Prevent not to double click button
		getCancelBtn.disabled=true;
		setTimeout(function(){
			show.style.display="block";
			getSubBtn.disabled=false;
			getCancelBtn.disabled=false;
		},2000);
		
	}
	
	that.contactSend=function(name,email){
		var showpop=$document[0].getElementById("contactPopup");
		showpop.style.display="block";
	}
	
	that.ok=function(){
		var show=$document[0].getElementById("completePopUp");
		var BuyTicketPopup=$document[0].getElementById("BuyTicketPopUP");
		var confirmPopUp=$document[0].getElementById("confirmTablePopUp");
		show.style.display="none";
		BuyTicketPopup.style.display="none";
		confirmPopUp.style.display="none";
		that.ticketQuantity=0;
		that.sendMail="";
	}
	
	that.showgoogleMap=function(){
		var x=$document[0].getElementById("myGoogleMap");	
		var  myCenter=new google.maps.LatLng(25.0317939, 121.5589027);
		  var mapOptions= {
		    center:myCenter,
		    zoom:12, scrollwheel: true, draggable: true,
		    mapTypeId:google.maps.MapTypeId.ROADMAP
		  };
		  var map=new google.maps.Map(x,mapOptions);

		  var marker = new google.maps.Marker({
		    position: myCenter
		  });

	  marker.setMap(map);
	}
	
	that.contactCancel=function(){
		var disabledcontact=$document[0].getElementById("contactContentDiv");
		var contactShow=$document[0].getElementById("contactPopup");
		contactShow.style.display="none";
		
	}
	
	window.onkeydown=function(event){
		var BuyTicketPopup=$document[0].getElementById("BuyTicketPopUP");
		var confirmPopUp=$document[0].getElementById("confirmTablePopUp");
		var contactPopUp=$document[0].getElementById("contactPopup");
		if(event.keyCode==27){
			if(BuyTicketPopup.style.display=="block" && confirmPopUp.style.display=="block"){
				confirmPopUp.style.display="none";
			}else{
				contactPopUp.style.display="none";
				BuyTicketPopup.style.display="none";
			}
			
		}
	}
	
});

myapp.controller("myDonuts",function($interval,$scope,$element,$document,$location,$anchorScroll){//In this line is declare another page contoller.
	/*
	 * 
	 * */
	$scope.scrollTo=function(id){
		$location.hash(id);
		$anchorScroll();
	}
	var that=this;
//	that.menuInputDate=new Date(2018,0,1);
	
	getNowDate();
	
	/*
	 * James 
	 * function:getNowDate
	 * pcik the month day
	 * 
	 * */
	
	
	function getNowDate(){
		var mydate=new Date();
		var  nowYearis=mydate.getFullYear();
		var nowMonthis=mydate.getMonth()+1;
		var canApplyMonth=[];
		for(var a=nowMonthis;a<=12;a++){
			canApplyMonth.push(a);
		}
		that.nowMonth=canApplyMonth;
		
		var nowDayis=mydate.getDate();
		var MonthLastDay=new Date(nowYearis,nowMonthis,0);
		var currentMonthLastDay=MonthLastDay.getDate();
		var days=[];
		
		for(var b=nowDayis;b<=currentMonthLastDay;b++){
			days.push(b);
		}
		that.nowDays=days;
	}
	

	
	
	that.sendPress=function(name,amount,myMonth,myDay,message){
		var date=new Date();
		var myyear=date.getFullYear();
		var x=$document[0].getElementById("sendPopup");
		x.style.display="block";
		that.BookingDate=myyear+"/"+myMonth+"/"+myDay;
		
		/*
		//***************************************
		var year=date.getFullYear();
		var month=date.getMonth()+1;
		if(month<10){
			month="0"+month;
		}
		var day=date.getDate();
		if(day<10){
			day="0"+day;
		}
		var hours=date.getHours();
		if(hours<10){
			hours="0"+hours;
		}
		var minutes=date.getMinutes();
		if(minutes<10){
			minutes="0"+minutes;
		}
		that.testBookingDate=year+"-"+month+"-"+day+" "+hours+" : "+minutes;
		//input type 
		//*****************************************************
		*/
		
	}
	/*
	 *James 
	 * function:selectMonthChange
	 * prevent if choose current month , needs to restrict can choose day.
	 * */
	that.selectMonthChange=function(selectMonth){
		var nowDate=new Date();
		var year=nowDate.getFullYear();
		var month=nowDate.getMonth()+1;
		if(selectMonth==month){
			getNowDate();	
		}else{
		var selectDate=new Date(year,selectMonth,0);
		var getSelectMonthDays=selectDate.getDate();
		var days=[];
		for(var a=1;a<=getSelectMonthDays;a++){
			days.push(a);
		}
		that.nowDays=days;
		}
	}
	
	that.selectCancel=function(){
		var a=$document[0].getElementById("sendPopup");
		a.style.display="none";
	}
	
	that.selectAccept=function(){
		var a=$document[0].getElementById("sendPopup");
		a.style.display="none";
		var show=setTimeout(function(){
			var b=$document[0].getElementById("sendPressSuccessOK");
			b.style.display="block";
		},1500);

	}
	
	that.sendPressSuccess=function(){
		var a=$document[0].getElementById("sendPressSuccessOK");
		a.style.display="none";
		that.menuInputName="";
		that.menuInputPeople="";
		that.selectMonth="";
		that.selectDay="";
		that.menuInputMessage="";
	}


});
