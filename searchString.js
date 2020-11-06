//  load a book from disk
docStat=document.getElementById("docStat")




function loadBook(filename,displayName)
{   let currentBook="";
    let url="Books/"+filename;
    
    docStat.innerHTML="";

    

    // reset our UI
    document.getElementById("filename").innerText=displayName;
    document.getElementById("searchstat").innerText="";
    document.getElementById("keyword").value="";


    //  create  a server request to load a book
    var xhr=new XMLHttpRequest();
    // true means asynchronous
    xhr.open("GET",url,true);
    xhr.send();
//  5 states in xhr 0-4
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4 && xhr.status==200)
        {
            currentBook=xhr.responseText;
            let li=document.createElement("li");
            li.innerHTML="Document Length: "+currentBook.length;
            docStat.appendChild(li)
            getDocStats(currentBook);
            
            //  the html will remove  any white spaces. So to bring back we will use regular expressions
            currentBook=currentBook.replace(/(?:\r\n|\r|\n)/g,'<br>');
           



            document.getElementById("fileContent").innerHTML=currentBook;
            var elmnt= document.getElementById("fileContent");
            elmnt.scrollTop=0;
        }
    }
    
    
}



function getDocStats(fileContent)
{
    let mostUsed=document.getElementById("mostUsed");
    let leastUsed=document.getElementById("leastUsed")
    mostUsed.innerHTML='';
    leastUsed.innerHTML='';
    var arr=[];
    var word='';
    for(let i=0;i<fileContent.length;i++)
    {
        if (fileContent[i]==" " || fileContent[i]==","  ||fileContent[i]=="" || fileContent[i]=="\n" || fileContent[i]=='"' || fileContent[i]=="\t" || fileContent[i]=="\r" || fileContent[i]=="\r\n" || fileContent[i]==`'` || fileContent[i]==`(`|| fileContent[i]==`)` || fileContent[i]==':' || fileContent[i]=='-' || fileContent[i]==`!`|| fileContent[i]==`*`  || fileContent[i]==`.`|| fileContent[i]==`?`|| fileContent[i]==`;` || fileContent[i]==`[`|| fileContent[i]==`]`)

        {
            if (word.length!=0)
            {
            arr.push(word.toLowerCase());
            word='';
            }
        }
        else
        {
            word+=fileContent[i];
        }
    }
    if (word.length!=0)
    {
        arr.push(word.toLowerCase());
    }
    
    
    var fre={};
    var res_max;
    for (i=0;i<arr.length;i++)
    {
        if(fre[arr[i]]>0)
        {
            fre[arr[i]]+=1;
        }
        
        else
        {
            fre[arr[i]]=1;
        }
    } 
    let li1=document.createElement("li");
    li1.innerHTML="Word Count: "+arr.length;
    docStat.appendChild(li1)

    var neg={"the":1,".":1,"a":1,"and":1,"she":1,"to":1,"from":1,"up":1}
     
    for(let i=0;i<5;i++)
    
    {
        let max=0;
        let k;
        for (let  key in fre)
        {
            if ((fre[key]>max) && (!neg[key])  && key.length>5)
            {   
                max=fre[key];
                k=key;
            }
        }
        let li = document.createElement('li');
        li.innerHTML=k+":"+fre[k];
        mostUsed.appendChild(li)
        neg[k]=1;
        
    

    }
    for(let i=0;i<5;i++)
    
    {
        let min=100000000;
        let k;
        for (let  key in fre)
        {
            if ((fre[key]<min) && (!neg[key])  && key.length>5)
            {   
                min=fre[key];
                k=key;
            }
        }
        let li = document.createElement('li');
        li.innerHTML=k+":"+fre[k];
        leastUsed.appendChild(li)
        neg[k]=1;
        
    

    }
  

    
   
    for(key in res_max)
    {    let li = document.createElement('li');
        li.innerHTML=key+":"+res_max[key];
        mostUsed.appendChild(li)

    }




}


function performMark()
{
    // read the keyword
    var keyword = document.getElementById("keyword").value;
    var display = document.getElementById("fileContent");

    var newContent = "";

    //find all the currently marked items
    let spans = document.querySelectorAll('mark');

    //<mark>Harry</mark>
    // to replace outer html with inner
    for (let i = 0; i < spans.length; i++)
    {
        spans[i].outerHTML = spans[i].innerHTML;
    }
    
    var re=new RegExp(keyword,"gi");
    var replaceText="<mark id='markme'>$&</mark>";
    var bookContent=display.innerHTML;

     //add the mark to the book content
     newContent = bookContent.replace(re, replaceText);

     display.innerHTML=newContent;
     var count =document.querySelectorAll('mark').length;
     document.getElementById("searchstat").innerHTML = "found " + count + " matches";

     if (count > 0) 
     {
        var element = document.getElementById("markme");
        element.scrollIntoView();
     }

     




    
}