/*
This file is used by all the ".asp" files to check the field constains like
null,date,number,etc., 
*/
var ie=(document.all)?true:false;
var ns=(document.layers)?true:false;
var moz = (document.getElementById) ? true : false;


function checkFields(frmName,arrFieldName,arrCheckType,arrMessage) 
{
//document.xyz.length 
        
var nTotalFields=frmName.length;
var sCheckName;
var nFieldPosition;
var bValidField=false;
var sFieldName;
var sFieldValue;
var nLoop;
         
	for(nLoop=0;nLoop<nTotalFields;nLoop++) 
	{
         
		sCheckName="N";
        nFieldPosition=0;
        sFieldName=frmName.elements[nLoop].name;
         
        for(nFieldLoop=0;nFieldLoop<arrFieldName.length;nFieldLoop++) 
        {
			if(sFieldName==arrFieldName[nFieldLoop]) 
			{
				sCheckName="Y";
				sFieldValue=frmName.elements[nLoop].value;
				nFieldPosition=nFieldLoop;
			}   // end if
		 } // end for nFieldLoop
                    
		if(sCheckName=="Y") 
		{
              
			var sCheckType=arrCheckType[nFieldPosition];
			bValidField=false;
			switch (sCheckType.substr(0,4)) 
			{
				
				case "null" : 
					bValidField=funCheckNull(sFieldValue);
                    break;
				case "numb" : 
					bValidField=funCheckNumber(sFieldValue);
	                break;
				case "rang" :   
					bValidField=funCheckRange(sFieldValue,sCheckType.substr(6,(sCheckType.length-1)))
                    break;
				case "mail" :
					bValidField=funCheckMail(sFieldValue);
					break;
				case "date" :
					bValidField=funCheckDate(sFieldValue);
					break;
				case "tele" :
					bValidField=funCheckTele(sFieldValue);
					break; 									   
					//Added by solo for checking text field length
 				case "leng" :   
					bValidField=funCheckLength(sFieldValue,sCheckType.substr(6,(sCheckType.length-1)))
                    break;                                   
				case "dat2" :
					bValidField=funCheckDat2(sFieldValue);
					break;
			}	// end switch
			if(bValidField) 
			{
				alert(arrMessage[nFieldPosition]);
				frmName.elements[nLoop].focus();
				break; 
			}
		} // end if  
	}// end Main for loop
	if(bValidField) 
	{
		return false;  
	}
    else 
    {
		return true;
	}
		
} // end Main function
        
function funCheckNull(sFieldValue) 
{

	 // cheking for Null
		 
	var bValidFlag;
    if (sFieldValue=="") 
    {
		bValidFlag=true;
	}
    else 
    { 
		bValidFlag=false;
	}
    return bValidFlag;
        
}  // end of funCheckNull      

function funCheckNumber(sFieldValue) 
{

	 // cheking for number
	var nLoop;	 
		
	var bValidFlag=false;
        
    if(sFieldValue.length!=0) 
    {
		for(nFunLoop=0;nFunLoop<sFieldValue.length;nFunLoop++) 
		{
        
          if ((sFieldValue.charAt(nFunLoop) < "0") ||(sFieldValue.charAt(nFunLoop) > "9")) 
          {
			bValidFlag=true;
          } //end if
		} // end for
	}
    else
    {
		bValidFlag=true;
	} 
    return bValidFlag;
        
} // end of funCheckNumber                 

function funCheckfloat(sFieldValue) 
{

	 // cheking for float
	var nLoop;	 
		
	var bValidFlag=false;
        
    if(sFieldValue.length!=0) 
    {
		for(nFunLoop=0;nFunLoop<sFieldValue.length;nFunLoop++) 
		{
		  if ((parseInt(sFieldValue.charAt(nFunLoop)) < 0) ||(parseInt(sFieldValue.charAt(nFunLoop)) > 9))
          {
			if((sFieldValue.charAt(nFunLoop)!="."))
			{
				bValidFlag=true;
			}
          } //end if
		} // end for
	}
    else
    {
		bValidFlag=true;
	} 
    return bValidFlag;
        
} // end of funCheckfloat    
      
function funCheckRange(sFieldValue,sRange) 
{

	 // cheking for Range
					 
	var nLowerValue;
    var nUpperValue;
    var nDividePosition;
    var bValidFlag=false;
    var bNumberFlag=false;
			        
	bNumberFlag=funCheckNumber(sFieldValue);
			         
    if (bNumberFlag) 
    {
		bValidFlag=true;
	}
    else
    {
		nDividePosition=sRange.indexOf(",");
        nLowerValue=parseInt(sRange.substr(0,nDividePosition));
        nUpperValue=parseInt(sRange.substr(nDividePosition+1,sRange.length-1));
					                        
        if ((parseInt(sFieldValue) < nLowerValue) || (parseInt(sFieldValue) > nUpperValue)) 
        {
			bValidFlag=true; 
		}
    }
    return bValidFlag;
			         
} // end of funCheckRange

function funCheckLength(sFieldValue,sRange) 
{
//Function added by solo to check for max length of a text or textarea field
	 // cheking for Range

	var nLowerValue;
    var nUpperValue;
    var nDividePosition;
    var bValidFlag=false;

	nDividePosition=sRange.indexOf(",");
    nLowerValue=parseInt(sRange.substr(0,nDividePosition));
    nUpperValue=parseInt(sRange.substr(nDividePosition+1,sRange.length-1));
	
    if ((parseInt(sFieldValue.length) < nLowerValue) || (parseInt(sFieldValue.length) > nUpperValue)) 
    {
		bValidFlag=true; 
	}

    return bValidFlag;
			         
} // end of funCheckLength
         
function funCheckMail1(sFieldValue) 
{
	
	 // cheking for Mail
		 
	var nAtPosition=0;            
    var nDotPosition=0;
    var nLength;
    var bValidFlag=false;
    var nLessPos=0;
      
	sFieldValue=funTrim(sFieldValue);
	if (sFieldValue.indexOf("<") != -1)
	{
		return true;
	}
	if (sFieldValue.indexOf(">") != -1)
	{
		return true;
	}	
	if (sFieldValue.indexOf(" ") != -1)
	{
		bValidFlag=true;
	}
	else
	{  
		if (sFieldValue.length<3) 
		{
			bValidFlag=true; 
		}
		else
		{
			nAtPosition=sFieldValue.indexOf("@");
			nDotPosition=sFieldValue.indexOf(".",nAtPosition);
                          
			if ((nAtPosition < 1) || (nDotPosition <=nAtPosition+1)|| (nDotPosition==sFieldValue.length-1)) 
			{
				bValidFlag=true; 
			}
		}
	}               
    return bValidFlag;
         
} // end of funCheckMail

function funCheckDate(sFieldValue)
{

	 // cheking for Date
		 
	var dGivenDate;
	var dGenDate;
	var bValidFlag=false;
        
    dGivenDate=new Date(sFieldValue);
    window.alert(dGivendate);
    dGenDate=new Date(sFieldValue);
    dGivenDate=sFieldValue;
		
	if ((parseInt(dGivenDate.substr(0,2)))!=dGenDate.getDate()) 
	{
		bValidFlag=true;   
	}                  
		 
	return bValidFlag;
	    
} // end of funCheckDate

function funCheckDat2(sFieldValue)
{
	
	 // cheking for Date
	//datepassed = new Date(sFieldValue);

	//This checks if the format is correct (mm/dd/yyyy)
	//bValidFlag=!validateformat(sFieldValue); // validates the format
	retvalidateformat=validateformat(sFieldValue); // validates the format

	//split the date text
	splitdate  = sFieldValue.split("/");

	//This check if date is greater then current date
//	retcurrdategr = currdat_validate(datepassed.getDate() + 1 ,datepassed.getMonth(),datepassed.getYear());
//	alert(retcurrdategr);
	
	//this checks if date has valid no of days
	retvaliddays = validDate(splitdate[1], splitdate[0] -1 , splitdate[2]);
//	alert((retvaliddays && retvalidateformat));
	if (retvaliddays && retvalidateformat)
		{
			bValidFlag = false;
		}
	else
		{
			bValidFlag = true;
		}
	return bValidFlag;
	    
} // end of funCheckDat2
	    
function funTrim(sFieldValue) 
{
		// Used for trim the given value
		   
		var nLeft;
		var nRight;
		var nLength;
		
		if (sFieldValue.length==0) 
			{
				return sFieldValue;
			}
		else
			{
				nLeft=0;
				nLength=sFieldValue.length;
				while ( (sFieldValue.charAt(nLeft)==" ") && (nLeft < nLength))
				{
					nLeft=nLeft+1;
				}
				if (nLeft !=nLength) 
				{
					nRight=nLength-1;
					while ((sFieldValue.charAt(nRight)==" ") && (nRight > 0 ))
					{
						nRight=nRight-1;
					}
					if (nRight > nLeft) 
					{
						nLength=nRight-nLeft+1;
						sFieldValue=sFieldValue.substr(nLeft,nLength);
					}
				}
				else
				{
				sFieldValue="";
				}
				//alert("***"+sFieldValue+nLeft)
				return sFieldValue;
			}
} // end of funTrim
	
function funCheckTele(sFieldValue)
{
		// cheking for Telephone
		
		var bValidFlag=false;
		var nLoop;
		sFieldValue=funTrim(sFieldValue);
		if (sFieldValue.length==0) 
			{
				return true;
			}
		else
			{	nLength=sFieldValue.length;   
				for(nLoop=0;nLoop<nLength;nLoop++)
					{	cChar=sFieldValue.charAt(nLoop);
						if ( ((cChar>="0") && (cChar <="9")) || (cChar==" ") || (cChar=="(") || (cChar==")") || (cChar=="-") || (cChar=="+") )
							{
								cchar=0;
							}
						else
							{
								bValidFlag=true;
							}
					}
				return bValidFlag;
			}		
} // end of funCheckTele


function nextfocus(fldname)
{	
	if(ie)
	{
		if(eval(event.keyCode)==9)
		{
			fldname.focus();
			return(false);	
		}	
	}
	else
	{	
		fldname.focus();	
	}
	return(true);
 }

function validDate(sd,sm,sy)
{
	var month = parseInt(sm); // parse date into variables
	var day = parseInt(sd);
	var year = parseInt(sy);
	
	if(parseInt(month)>12)return false;
		
	if ((month==4 || month==6 || month==9 || month==11) && parseInt(day)>30) 	
	{
		//alert("Month "+month+" doesn't have more than 30 days!")
		return false;
	}
	if (month == 2)
	{
		 // check for february 29th
		var isleap = (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0));
		if (day>29 || (day==29 && !isleap))return false;
   
	}
   	if((month == 1 || month == 3 || month==5 || month==7 || month==8 || month==10 || month==12 ) && parseInt(day)>31)return false;
	
	
return true;
}



function validDate1(sd,sm,sy)
{
	var strMonthArray = new Array(12);
	strMonthArray[0] = "Jan";
	strMonthArray[1] = "Feb";
	strMonthArray[2] = "Mar";
	strMonthArray[3] = "Apr";
	strMonthArray[4] = "May";
	strMonthArray[5] = "Jun";
	strMonthArray[6] = "Jul";
	strMonthArray[7] = "Aug";
	strMonthArray[8] = "Sep";
	strMonthArray[9] = "Oct";
	strMonthArray[10] = "Nov";
	strMonthArray[11] = "Dec";

	var month = strMonthArray[parseInt(sm)]; // parse date into variables
	
	var day = parseInt(sd);
	var year = parseInt(sy);
	
	// Extra validation
		if(parseInt(sm) > 11 || parseInt(sd) > 31)
		{
			return false;
		}
	//
	
	if ((month=="Apr" || month=="Jun" || month=="Sep" || month=="Nov") && parseInt(day)==31) 	
	{
		//alert("Month "+month+" doesn't have 31 days!")
		return false;
	}
	if (month == "Feb")
	{
		 // check for february 29th
		var isleap = (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0));
		if (day>29 || (day==29 && !isleap))
		{
			//alert("February " + year + " doesn't have " + day + " days!");
			return false;
   		}
	}
return true;
}


function returnmonths(sm)
{
	var month = sm; // parse date into variables
	if (month == "Jan")
		monthnum=1
	if (month == "Feb")
		monthnum=2;
	if (month == "Mar")
		monthnum=3;
	if (month == "Apr")
		monthnum=4;
	if (month == "May")
		monthnum=5;
	if (month == "Jun")
		monthnum=6;
	if (month == "Jul")
		monthnum=7;
	if (month == "Aug")
		monthnum=8;
	if (month == "Sep")
		monthnum=9;
	if (month == "Oct")
		monthnum=10;
	if (month == "Nov")
		monthnum=11;
	if (month == "Dec")
		monthnum=12;
		
return monthnum;
}

function isValidTwoDate(val,nam,val1,nam1)
{
	var date1=val // lesser date
	var name1=nam
	var date2=val1 // greater date
	var name2=nam1
	var err=0
	var chkflg=0
	
	var datePat = /^(\d{1,2})(\/|-)(\d{1,2})\2(\d{2}|\d{4})$/; // accepts 2/4 digit year
	var matchArray = date1.match(datePat); // is the format ok?
	if (matchArray == null)
 	{
		return false;
	}
	month=matchArray[1]; // parse date into variables 
	day=matchArray[3]; 
	year=matchArray[4];
	
	var datePat1 = /^(\d{1,2})(\/|-)(\d{1,2})\2(\d{2}|\d{4})$/; // accepts 2/4 digit year
	var matchArray1 = date2.match(datePat1); // is the format ok?
	if (matchArray1 == null)
 	{
		return false;
	}
	month1=matchArray1[1]; // parse date into variables 
	day1=matchArray1[3]; 
	year1=matchArray1[4];
	
	
	if(parseInt(year) > parseInt(year1) )
	{
		err=1
	}
	if(parseInt(year) == parseInt(year1))
	{
		if(parseInt(month) > parseInt(month1))
		{
			chkflg=1
			err=1				
		}
		if(parseInt(month) == parseInt(month1))
		{
			 if(parseInt(day) > parseInt(day1))
			{
				chkflg=1
				err=1	
			}	
		}
		if(chkflg==1)
		{
			err=1		
		}
			
	}

	if(err==1)
	{
		return false;
	}
	else if(err==0)
	{
		return true;
	}

}

function y2k(number) { return (number < 1000) ? number + 1900 : number; }

function isDate (day,month,year) {
    var today = new Date();
    year = ((!year) ? y2k(today.getYear()):year);
    month = ((!month) ? today.getMonth():month-1);
    if (!day) return false
    var test = new Date(year,month,day);
    if ( (y2k(test.getYear()) == year) &&
         (month == test.getMonth()) &&
         (day == test.getDate()) )
        return true;
    else
        return false
}

function show_isDate(day,month,year)
{
if (isDate(day,month,year))
    return true;
else
   
    return false;
}


function currdat_validate(day,month,year)
{
	var currDate=new Date();
	var currday=currDate.getDate();
	//var currmonth=currDate.getMonth()+1;
	var currmonth=currDate.getMonth();
	var curryear=currDate.getYear();
	bcdate=true;

	if(parseInt(year) < parseInt(curryear))
	{
		bcdate=false			
	}
		
	if((parseInt(year) == parseInt(curryear)))
	{
		if(parseInt(month) == parseInt(currmonth))
		{
			if (parseInt(day) < parseInt(currday))
			{
				bcdate= false;
			}
		}
		if(parseInt(month) < parseInt(currmonth))
		{
			bcdate= false;
		}
	}
	
	if(bcdate == true) return true;
	else return false;
	
}	
	
function validateformat(dateStr)
{
	var datePat = /^(\d{1,2})(\/|-)(\d{1,2})\2(\d{4})$/;
	var matchArray = dateStr.match(datePat); // is the format ok?
	if (matchArray == null)
 	{
		return false;
	}
	else
	{
		return true;
	}
}


//Start of funCheckString
function funCheckString(sFieldValue) // Allows only "A-Z", "a-z", "0-9", "-", "_" ,"&" , "/", "\", ":", ";", ",", "'", "."  Bug fixed Dt:21st May,2002.doc Error Code: buyer_reg_modes.asp006
{alert("a");
	var nLoop;	 
	var bValidFlag=false;
	var sFieldValue1 = funTrim(sFieldValue)
    if(sFieldValue1.length!=0) 
    {
		for(nFunLoop=0;nFunLoop<sFieldValue1.length;nFunLoop++) 
		{
          if ((((sFieldValue1.charCodeAt(nFunLoop) >= 65) && (sFieldValue1.charCodeAt(nFunLoop) <= 90)) || ((sFieldValue1.charCodeAt(nFunLoop) >= 97) && (sFieldValue1.charCodeAt(nFunLoop) <= 122)) || ((sFieldValue1.charCodeAt(nFunLoop) >= 48) && (sFieldValue1.charCodeAt(nFunLoop) <= 57)) || (sFieldValue1.charCodeAt(nFunLoop) == 95) || (sFieldValue1.charCodeAt(nFunLoop) == 45) || (sFieldValue1.charCodeAt(nFunLoop) == 38) || (sFieldValue1.charCodeAt(nFunLoop) == 32) || (sFieldValue1.charCodeAt(nFunLoop) == 47) ||  (sFieldValue1.charCodeAt(nFunLoop) == 92) ||  (sFieldValue1.charCodeAt(nFunLoop) == 58) ||  (sFieldValue1.charCodeAt(nFunLoop) == 59) ||  (sFieldValue.charCodeAt(nFunLoop) == 44) || (sFieldValue1.charCodeAt(nFunLoop) == 39) || (sFieldValue1.charCodeAt(nFunLoop) == 46) ) == false) 
          {
			bValidFlag=true;
			break;
          } //end if
		} // end for
	}
    else
    {
		bValidFlag=true;
	} 
	alert(bValidFlag);
    return bValidFlag;
} // end of funCheckString


//Start of funCheckAlphaNum
function funCheckAlphaNum(sFieldValue) // Allows only "A-Z", "a-z", "0-9"
{
	var nLoop;	 
	var bValidFlag=false;
	var sFieldValue1 = funTrim(sFieldValue)
    if(sFieldValue1.length!=0) 
    {
		for(nFunLoop=0;nFunLoop<sFieldValue1.length;nFunLoop++) 
		{
          if ((((sFieldValue1.charCodeAt(nFunLoop) >= 65) && (sFieldValue1.charCodeAt(nFunLoop) <= 90)) || ((sFieldValue1.charCodeAt(nFunLoop) >= 97) && (sFieldValue1.charCodeAt(nFunLoop) <= 122)) || ((sFieldValue1.charCodeAt(nFunLoop) >= 48) && (sFieldValue1.charCodeAt(nFunLoop) <= 57)) ) == false) 
          {
			bValidFlag=true;
			break;
          } //end if
		} // end for
	}
    else
    {
		bValidFlag=true;
	} 
    return bValidFlag;
} // end of funCheckAlphaNum



// Just checks for spaces and enter keys in the text area
function checkEnterKey(sText)
{
	var sFlag;
	var sCntrlValue = funTrim(sText);
	sFlag = true;
	for(sLoop=0;sLoop<sCntrlValue.length;sLoop++)
	{	
		if((sCntrlValue.charCodeAt(sLoop) != 13) && (sCntrlValue.charCodeAt(sLoop) != 10) && (sCntrlValue.charCodeAt(sLoop) != 32 ) && (sCntrlValue.charCodeAt(sLoop) != 255 ) )
		{
			sFlag = false;
			break;
		}
	}
	return sFlag;
}
// End 

// This function checks for a valid  eMail id and returns true if the value is not a valid mail id

function funCheckMail(checkThisEmail)
{
   
    var myEMailIsValid = false;
    var myAtSymbolAt = checkThisEmail.indexOf('@');
    var myDotAt = checkThisEmail.indexOf('.');
    var myLastDotAt = checkThisEmail.lastIndexOf('.');
    var mySpaceAt = checkThisEmail.indexOf(' ');
    var myLength = checkThisEmail.length;


    //Check for the special characters entry
    //Check for consequtive dots
    //Check for Double at the rates

    for(var i=0;i<checkThisEmail.length;i++){

          //Check for the special characters entry
		
          if(!((checkThisEmail.charAt(i)>="A" && checkThisEmail.charAt(i) <="Z") || (checkThisEmail.charAt(i) >= "a" && checkThisEmail.charAt(i) <= "z") ||(checkThisEmail.charAt(i)>="0" &&  checkThisEmail.charAt(i)<="9") || (checkThisEmail.charAt(i) == "_") || (checkThisEmail.charAt(i) ==  "@")  || (checkThisEmail.charAt(i) == ".") || (checkThisEmail.charAt(i) ==  "/") || (checkThisEmail.charAt(i) == "-")))
	{
                  myEMailIsValid = true;
                  break;
          }

          //Check for consequtive dots
          if( (checkThisEmail.charAt(i) == "." & checkThisEmail.charAt(i+1) =="." ))
	{ 
                  myEMailIsValid = true;
                  break;
          }

          //Check for Double at the rates

          if(checkThisEmail.charAt(i)=="@")
	{

                  if(myAtSymbolAt != i){
                          myEMailIsValid = true;
                          break;
                  }


          }

          if(checkThisEmail.charAt(i)==".")
	{
                  if(myAtSymbolAt == (i+1) || myDotAt == 0 || myAtSymbolAt == (i-1))
		{
                          myEMailIsValid = true;
                          break;
                  }
          }
    }


    //Check for characters before and after '/' and '_'
    //Check for index of  '/' , '_' and '-' fall after '@'

    for(var i=0;i<checkThisEmail.length;i++){

          if( ( checkThisEmail.charAt(i)=="/") || (checkThisEmail.charAt(i)=="_") || ( checkThisEmail.charAt(i)=="-"))
	{		

              if( !(((checkThisEmail.charAt(i+1)>="A" && checkThisEmail.charAt(i+1)<="Z") || (checkThisEmail.charAt(i+1) >= "a"  && checkThisEmail.charAt(i+1)<= "z")  || (checkThisEmail.charAt(i+1)>="0" &&  checkThisEmail.charAt(i+1)<="9")  )  &&  ((checkThisEmail.charAt(i-1)>="A" && checkThisEmail.charAt(i-1)<="Z")  || (checkThisEmail.charAt(i-1) >= "a" && checkThisEmail.charAt(i-1)<= "z") ||  (checkThisEmail.charAt(i-1)>="0" &&  checkThisEmail.charAt(i-1)<="9")  )) ) 
             {
              alert(checkThisEmail.charAt(i+1))
				 myEMailIsValid = true;
                break;
              }
          }

    }



    // at least one @ must be present and not before position 2
    // @yellow.com : NOT valid
    // x@yellow.com : VALID


    if (myAtSymbolAt < 1 )
    {myEMailIsValid = true}


    // at least one . (dot) afer the @ is required
    // x@yellow : NOT valid
    // x.y@yellow : NOT valid
    // x@yellow.org : VALID

    if ((myDotAt == (myAtSymbolAt+1)) || (myLastDotAt < myAtSymbolAt))
    {myEMailIsValid = true}

    // at least two characters [com, uk, fr, ...] must occur after the last . (dot)
    // x.y@yellow. : NOT valid
    // x.y@yellow.a : NOT valid
    // x.y@yellow.ca : VALID

    if (myLength - myLastDotAt <= 2)
    {myEMailIsValid = true}


    // no empty space " " is permitted (one may trim the email)
    // x.y@yell ow.com : NOT valid

    if (mySpaceAt != -1)
    {myEMailIsValid = true}

    return myEMailIsValid
} // end of fnCheckMail

function openWindow(newURL, newWidth, newHeight, resize, scrollbars)
{
  // Declare and initialize top and left variables
  var calcLeft = 10;
  var calcTop = 10;
  if (scrollbars=="") {scrollbars="no"}
  
         
  // Update properties if comp. browser
  if (parseInt(navigator.appVersion) >= 4){
  calcTop = screen.availHeight /2 - newHeight / 2;
  calcLeft = screen.availWidth / 2 - newWidth / 2;}

  // Open the new window using top and left properties
  popup_win = window.open(newURL, 'remote', 'status=no,toolbar=no,menubar=no,location=no,scrollbars=' + scrollbars + ',width=' + newWidth + ',height=' + newHeight + ',left=' + calcLeft + ',top=' + calcTop + ',resizable=yes');
  //popup_win.opener.name = "opener";
  popup_win.focus()
} 

//shows the card and sets the focus for "IE" browser
function icheck(divname,fldname)
{		
	divname.style.visibility="visible";								
	fldname.focus();
	return(false);
}

//shows the card and sets the focus for "NS" browser
function ncheck(divname,fldname)
{
	divname.visibility="show";	
	fldname.focus();
	return(false);
}

//shows the card and sets the focus for "mozilla" browser
function mcheck(divname,fldname)
{
  document.getElementById(divname).style.visibility = "visible";
  fldname.focus();
  return(false);
}

// This function hides the card only if the card exists
function  hideCards(sCardId,sBrowser)
{
		
	if(document.all(sCardId)  != null)
	{
		if(sBrowser == "ie")
		{
			eval(sCardId+".style.visibility='hidden'");
		}
		else if(sBrowser == "ns" )
		{
			eval("document."+sCardId+".visibility='hide'");
		}
		else
		{
			document.getElementById(sCardId).style.visibility = "hidden";
		}
	}	
}

// Replaces all the < > for displaying the html elements in the form similar to server.htmlencode of asp
function replaceHtmlContent(sValue)
{
	var oldfContent = sValue;
	var newContent = ""
	for(i=0;i<oldfContent.length;i++)
	{
		var sTempChar="";
				
		if(oldfContent.charAt(i) == "<")
		{
			sTempChar="&lt;";
		}
		else if(oldfContent.charAt(i) == ">")
		{
			sTempChar="&gt;";
		}
		else 
		{
			sTempChar = oldfContent.charAt(i);
		}
		newContent= newContent + sTempChar;
	}
	return newContent;
}

//Remove special character
function isProper(formField) 
{
	var result = true;
	var string = formField.length;
	//alert(string);
	//var iChars = "*|,\":<>[]{}`\';()@&$#%";
	var iChars = "!@#$%^&*()+=-[]\\\';,./{}|\":<>?";
	for (var i = 0; i < string; i++) 
	{
		if (iChars.indexOf(formField.charAt(i)) != -1)
		return false;
	}
	return true;
}