let tags = [ ];
let tags1 = [ ];

let i=0;
let done = 0;
let store = [];
let create_rows = []; //for the table data

let create_rows1 = []; //for the table data


var db = new Dexie("alldata");
      db.version(1).stores({
          world_Case:"country_name,date,death,recovered,confirmed",
          us_state: "state_name, positive, negative,total,inicu"


      });
      
let api = "https://covidtracking.com/api/v1/states/current.json";
let api2= "https://pomber.github.io/covid19/timeseries.json";
      //data fetching of COVID-19
fetch(api)
  .then(response => response.json())
      
  .then(json => {
          data = json;
          db.us_state.clear();
                for (country_name in data) { 
                         let option = document.createElement("option");              
                             
                              
                         option.value = data[country_name].state;   
                    store.push(data[country_name].state);
                        document.querySelector("#listName").appendChild(option);  

                        db.us_state.add({
                          state_name: data[country_name].state
                        })  ;
        
        } 

});


document.querySelector("#WorldCases")                             
        .addEventListener("click",(e) => {
      fetch(api2)
  .then(response => response.json())
      
  .then(json => {
          data1 = json;
           db.world_Case.clear();
                for (country_name in data1) { 
                        let option = document.createElement("option");              

          option.value = country_name;        
            console.log(country_name);        
        document.querySelector("#listName1").appendChild(option);    
        
       db.world_Case.add({
                          country_name: country_name
                        })  ;
        } 

});

});


 document.querySelector("#addC1")                             
        .addEventListener("click",(e) => {                             
          let countryName = document.querySelector("#country_name1").value; 
          //check for name as well if the names are in the list or no
  
          tags1.push(countryName);                            
          let option = document.createElement("p");  
          option.innerText = tags1;
        console.log(tags1);              
      });
        
      ///create a chart for this
        
         

  <!-----------------------Generating Table using https://material.io/develop/web/components/data-tables/ website example----  -->  

      
          
              function table_generator1(){
                let table_Head1 = document.createElement("th");
                table_Head1.classList.add("mdc-data-table__header-cell", "mdc-data-table__header-cell--numeric");
                let rows1 = document.createElement("tr");
                rows1.classList.add("mdc-data-table__header-row");
                let date1 = table_Head1.cloneNode(true);
                date1.textContent = "Date"
                rows1.appendChild(date1);
                document.querySelector("table thead").appendChild(rows1);
    
                let dates1 = data1[tags1[0]].map
                (item => 
                {

                   db.world_Case.add({
                          date: item["date"]
                        })  ;
                    return item["date"]
                })
                
                  create_rows1.push(dates1);    
                for (let country of tags1) 
                {             
                    let header_countries_n = table_Head1.cloneNode(true);   
                    header_countries_n.textContent = country;           
                    rows1.appendChild(header_countries_n);                 
                    let header_countries_n1 = table_Head1.cloneNode(true);   
                    header_countries_n1.textContent = "Death";           
                    rows1.appendChild(header_countries_n1);                 
                  
                      let header_countries_n2 = table_Head1.cloneNode(true);   
                    header_countries_n2.textContent = "Recovered";           
                    rows1.appendChild(header_countries_n2);   
                    
                  let countriesData1 =  data1[country].map
                  (item => {

                    db.world_Case.add({
                          confirmed: item["confirmed"]
                        })  ;
                      return item["confirmed"];                  
                  });
                  create_rows1.push(countriesData1);                    
                
                  
                    let countriesData2 =  data1[country].map
                  (item => {
                    db.world_Case.add({
                          death: item["deaths"]
                        })  ;
                      return item["deaths"];                  
                  });
                  create_rows1.push(countriesData2);                    
                
                  
                    let countriesData3 =  data1[country].map
                  (item => {

                     db.world_Case.add({
                          recovered: item["recovered"]
                        })  ;
                  
                      return item["recovered"];                  
                  });
                  create_rows1.push(countriesData3);                                                         
                }
                  
              
console.log("this one");

                  <!--- creating rows for data --->
                for (let i=0; i< create_rows1[0].length; i++) {      
                  let tbl_rows1 =  document.createElement("tr");  
                  tbl_rows1.classList.add("mdc-data-table__row"); 

                    for (let j=0; j < create_rows1.length; j++) { 
                       

                   let body_data1 = document.createElement("td")       
                   body_data1.classList.add("mdc-data-table__cell")    
                   if (j > 0) {                                 
                     body_data1.classList.add("mdc-data-table__cell--numeric"); 
                   } 
                   body_data1.textContent = create_rows1[j][i];             
                   tbl_rows1.appendChild(body_data1);                   
                  }
                  document.querySelector("table tbody").appendChild(tbl_rows1);                      
                }
              }
//               
//      
//      
//  
//  
//      <!-------------------------------------generate_chart https://material.io/develop/web/components/data-tables/ website example -->
//        
//
//      
//      
    function generate_chart() {
        let date = ["Date"];  
        let chart = [];    
        for (let country of tags1) {
          date.push(country);  
        }
        chart.push(date); 
    

        for (var i = 0; i < data1[tags1[0]].length; i++) {
          let row_data = [];         
          row_data.push(data1[tags1[0]][i]["date"]); 
          for (let country of tags1) {
            row_data.push(data1[country][i]["confirmed"]);  
          }
          chart.push(row_data);                       
        }

        let options = {
          width: window.innerWidth,
          height: window.innerHeight,           
        title: 'Cases Chart',
        curveType: 'none',
        };
        let dataChart = google.visualization.arrayToDataTable(chart);
        
        let chart1 = new google.visualization.LineChart(document.querySelector('#Chart'));

        chart1.draw(dataChart, options);
    }          

//
//      
//      <!-------------------BUTTONS AND OPERATIONS -------->
         document.querySelector("#Generate_Table1")                             
        .addEventListener("click",(e) => {                             
          table_generator1();
         generate_chart();
            
         });
//      
    document.querySelector("#Clear")                             
        .addEventListener("click",(e) => {                             
        let table_body = document.querySelector("table tbody");
                let last_child = table_body.lastElementChild;  
                while (last_child ) {  //loop through until null                      
                    table_body.removeChild(last_child );       
                    last_child  = table_body.lastElementChild; 
                }
        //we need one more loop to remove header will do exact same thing except we will be selecting thead instead of tbody
        
                let table_head = document.querySelector("table thead");
                let last_child1 = table_head.lastElementChild;  
                while (last_child1 ) {  //loop through until null                      
                    table_head.removeChild(last_child1);       
                    last_child1  = table_head.lastElementChild; 
                }
            
         });






      document.querySelector("#addC")                             
        .addEventListener("click",(e) => {                             
          let countryName = document.querySelector("#country_name").value; 
          //check for name as well if the names are in the list or no
  
          tags.push(countryName);                            
          let option = document.createElement("p");  
          option.innerText = tags;
          console.log(tags);

      });
        
      ///create a chart for this
        
         

  <!-----------------------Generating Table using https://material.io/develop/web/components/data-tables/ website example----  -->  

      
          
              function table_generator(){
              
                let table_Head = document.createElement("th");
                table_Head.classList.add("mdc-data-table__header-cell", "mdc-data-table__header-cell--numeric");
                let rows = document.createElement("tr");
                rows.classList.add("mdc-data-table__header-row");
                let date = table_Head.cloneNode(true);
                date.textContent = tags[0]
               // rows.appendChild(date);
                document.querySelector("table thead").appendChild(rows);
                 let dates = 0;
                  for(i =0 ; i < 55; i++)
                      {
                            
                          if(store[i]==tags[0])
                              {
                                    create_rows.push(data[i].totalTestResults);

                                  create_rows.push(data[i].positive);
                                    create_rows.push(data[i].negative);
                                  if(data[i].hospitalizedCurrently==null)
                                      {
                                          data[i].hospitalizedCurrently = 0
                                      }
                                  create_rows.push(data[i].hospitalizedCurrently);
                                  if(data[i].inIcuCurrently==null)
                                      {
                                          data[i].inIcuCurrently=0;
                                      }
                                  create_rows.push(data[i].inIcuCurrently);

                                    create_rows.push(data[i].death);
                                  create_rows.push(data[i].dateModified);

                                        db.us_state.add({
                          positive: data[i].positive,
                          negative: data[i].negative,
                          total: data[i].hospitalizedCurrently,
                          inicu: data[i].inIcuCurrently
                        })  ;

                              }
                          
                      }
                  

                
//                  create_rows.push(dates);    
                console.log(create_rows);   

                for (let country of tags) 
                {   
                    let header_countries3 = table_Head.cloneNode(true);   
                header_countries3.textContent = "Total";  
                  let header_countries = table_Head.cloneNode(true);   
                  header_countries.textContent = "Positive";  
                let header_countries1 = table_Head.cloneNode(true);   
                header_countries1.textContent = "Negative";  
            let header_countries2 = table_Head.cloneNode(true);   
                header_countries2.textContent = "hospitalizedCurrently"; 
                    
                          let header_countries6 = table_Head.cloneNode(true);   
                header_countries6.textContent = "InICUcurrently"; 
                let header_countries4 = table_Head.cloneNode(true);   
                header_countries4.textContent = "Deaths";  
                    let header_countries5 = table_Head.cloneNode(true);   
                header_countries5.textContent = "DateModified";  
                    

                rows.appendChild(header_countries3);  
                 rows.appendChild(header_countries);     
                rows.appendChild(header_countries1);       
                     rows.appendChild(header_countries2); 
                     rows.appendChild(header_countries6); 
                    
                 rows.appendChild(header_countries4);     
                rows.appendChild(header_countries5);      



                }
                  <!--- creating rows for data --->
                for (let i=1; i<= 1; i++) {      
                  let tbl_rows =  document.createElement("tr");  
                  tbl_rows.classList.add("mdc-data-table__row"); 
                  for (let j=0; j < create_rows.length; j++) {      
                   let body_data = document.createElement("td")       
                   body_data.classList.add("mdc-data-table__cell")    
                   if (j > 0) { 
                                             console.log(create_rows[i]);

                     body_data.classList.add("mdc-data-table__cell--numeric"); 
                   } 
                  body_data.textContent = create_rows[j];             
                   tbl_rows.appendChild(body_data);                   
                  }
                  document.querySelector("table tbody").appendChild(tbl_rows);                      
                }
              } 
      
      
  
  
      <!-------------------------------------generate_chart https://material.io/develop/web/components/data-tables/ website example -->
        

      
//      
//    function generate_chart() {
//        let date = ["Date"];  
//        let chart = [];    
//        for (let country of tags) {
//          date.push(country);  
//        }
//        chart.push(date); 
//    
//
//        for (var i = 0; i < data[tags[0]].length; i++) {
//          let row_data = [];         
//          row_data.push(data[tags[0]][i]["state"]); 
//          for (let country of tags) {
//            row_data.push(data[country][i]["positive"]);  
//          }
//          chart.push(row_data);                       
//        }
//
//        let options = {
//          width: window.innerWidth,
//          height: window.innerHeight,           
//        title: 'Cases Chart',
//        curveType: 'none',
//        };
//        let dataChart = google.visualization.arrayToDataTable(chart);
//        
//        let chart1 = new google.visualization.LineChart(document.querySelector('#Chart'));
//
//        chart1.draw(dataChart, options);
//    }          


      
      <!-------------------BUTTONS AND OPERATIONS -------->
         document.querySelector("#Generate_Table")                             
        .addEventListener("click",(e) => {                             
          table_generator();
           // generate_chart();
            
         });
      
//    document.querySelector("#Clear")                             
//        .addEventListener("click",(e) => {                             
//        let table_body = document.querySelector("table tbody");
//                let last_child = tbody.lastElementChild;  
//                while (last_child ) {  //loop through until null                      
//                    table_body.removeChild(last_child );       
//                    last_child  = tbody.lastElementChild; 
//                }
//        //we need one more loop to remove header will do exact same thing except we will be selecting thead instead of tbody
//        
//                let table_head = document.querySelector("table thead");
//                let last_child1 = tbody.lastElementChild;  
//                while (last_child1 ) {  //loop through until null                      
//                    table_head.removeChild(last_child1);       
//                    last_child1  = tbody.lastElementChild; 
//                }
//            
//         });
//      


//
//          function initMap() {
//               var map = new google.maps.Map(document.querySelector('#map'), {
//              zoom: 12,
//              center: {lat:50 , lng: 50}
//            });
//          
//        }

   
//<!---------------------------------GEOLOCATION-------------->>>>>>.
      
         const Show = (cl0, cl1, cl2, cl3,cl4) => {
		  document.querySelector(cl0).setAttribute("class", "viewS");
		  document.querySelector(cl1).setAttribute("class", "view");
		  document.querySelector(cl2).setAttribute("class", "view");
		  document.querySelector(cl3).setAttribute("class", "view");
		  document.querySelector(cl4).setAttribute("class", "view");

        return false;
	  }
      
    
         
         
         
    
      
      