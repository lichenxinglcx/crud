let studentsList = [];
function getStudents(){

    //FetchAPI
    //Fetch always return Promise with resolve
    fetch('http://localhost:3000/contacts').then(response =>{
        //console.log(response);
        if(response.ok){
          // console.log(response.json());
            return response.json();
            
        }
        else{
            if(response.status == 404){
                return Promise.reject(new Error('InValid URL..'))
            }
           else if(response.status == 500){
                return Promise.reject(new Error('Some Internal Error Occured...'));
            }
           else if(response.status == 401){
            return Promise.reject(new Error('UnAuthorized User..'));
           }
        }
        
    }).then(studentsListResponse =>{
        studentsList = studentsListResponse;
       // console.log('studentsList', studentsList);
       displayReposToHTML(studentsListResponse);
    }).catch(error =>{
        let errorEle = document.getElementById('errMessage');
        errorEle.innerText = error.message;
    })

}


function displayReposToHTML(studentsListResponse){
    //logic
    //console.log('Response',repositoriesList);
  // let tableEle =  document.getElementById('repo-list-table');
    let tableEle = document.getElementById('allmessage');               //get table node

    let tbodyEle = tableEle.getElementsByTagName('tbody')[0];               //get tbody node
  //console.log(tbodyEle);
    let tbodyEleInnerHTMLString = '';

    studentsListResponse.forEach(student =>{                                //add message to html for each student
   //     console.log(repo.web_url + '--'+repo.owner.username );
     tbodyEleInnerHTMLString += `
                <tr>
                    <td>${student.name}</td>
                    <td>${student.email}</td>
                    <td>${student.contactno}</td>
                    <td><button class='btn btn-primary' onclick='updateStudent(${student.id})'>Update</button></td>
                    <td ><i class='fa fa-trash' style='color:red;font-size:1.2em;cursor:pointer' onclick='deleteStudent(${student.id})'></i></td>
                    </tr>
     `;   
    });

    tbodyEle.innerHTML = tbodyEleInnerHTMLString;
   
    
}


//adding student to db
function addStudent(event){
    event.preventDefault();
  //  console.log('addStudent');
 let name =  document.getElementById('name').value;                         //create object student
 let email = document.getElementById('email').value;
 let contactno = document.getElementById('contactno').value;

 let student = {
     name : name,
     email : email,
     contactno: contactno
 }

 //console.log(name + ' --' + email + " ---" + contactno);
  fetch('http://localhost:3000/contacts',{                                  //post new message to json
      method: 'POST',
      headers:{
        'content-type': 'application/json'
      },
      body:JSON.stringify(student)
  }).then(response =>{
      if(response.ok){
          return response.json();                                           
      }
      else{
          return Promise.reject(new Error('Some internal error occured...')) //error handle
      }
  }).then(addedStudent =>{
      console.log('addedStudent -->', addedStudent);
    //   let tableEle = document.getElementsByTagName('table')[0];

    //   let tbodyEle = tableEle.getElementsByTagName('tbody')[0];

    //   console.log(tbodyEle.innerHTML);
        let tbodyEle = document.getElementById('table-body');
        console.log(tbodyEle);
  }).catch(error=>{
    //ADd this to html
    let errorEle = document.getElementById('errMessage');
        errorEle.innerText = error.message;
  })
}

function deleteStudent(id){
    console.log('delete Student--',id);
    
    fetch(`http://localhost:3000/contacts/${id}`,{                          //delete by id from json
        method:'DELETE'
    }).then(response =>{
        if(response.ok){
            return response.json();
        }
    }).then(result =>{
        console.log('result from delete',result);
        //write the code for DOM manipulation
    })
}


function updateStudent(id){
    let newgroup=document.getElementById("newgroup");                   //get newgroup node
    let confirm=document.getElementById("confirm");                     //get confirm button
    let hide=document.getElementById("cancle");                       //get cancle button

    var add=function(){                                                 //show newgroup div
        newgroup.style.display="block";
    }
    add();

    var hiding=function(){
        newgroup.style.display="none";
    }
    hide.onclick=hiding;                                              //hide newgroup div

    let name=document.getElementById("newname").value;                  //create new data object
    let email=document.getElementById("newemail").value;
    let contactno=document.getElementById("newcontactno").value;

    const data={
        name: name,
        email: email,
        contactno: contactno
    }

    confirm.onclick=function(){                                          //add action to confirm
     fetch(`http://localhost:3000/contacts/${id}`,{
        method:'PUT',
        headers:{
            'Content-type':'application/json'
        },
        body:JSON.stringify(data)
        })
    }
}


function search(studentsListResponse){
    studentsListResponse=studentsList;

    let tableEle = document.getElementById('keymessage');               //get table node

    let tbodyEle = tableEle.getElementsByTagName('tbody')[0];               //get tbody node
  //console.log(tbodyEle);
    let tbodyEleInnerHTMLString = '';

    let keyname=document.getElementById("search").value;

    console.log(keyname);

    

    studentsListResponse.forEach(student =>{                                //add message to html for chosen student
   //     console.log(repo.web_url + '--'+repo.owner.username );
   if(keyname==student.name){                                               //choose student
     tbodyEleInnerHTMLString += `
                <tr>
                    <td>${student.name}</td>
                    <td>${student.email}</td>
                    <td>${student.contactno}</td>
                </tr>
     `;   
    }
    });


    tbodyEle.innerHTML = tbodyEleInnerHTMLString;
}



