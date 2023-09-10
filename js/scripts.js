$(document).ready(function() {
  
  $.ajax({
    url: "php/getAll.php",
    type: 'GET',
    dataType: 'json',

    success: function(result) {

      console.log(JSON.stringify(result));

      if (result.status.name == "ok") {

        for (const iterator of result.data) {

        $("#personnel-tab-pane").append(
          `<table class="table table-hover">
              
              <tr>
                <td class="align-middle text-nowrap">
                  ${iterator.lastName}, ${iterator.firstName}
                </td>
                <td class="align-middle text-nowrap d-none d-md-table-cell">
                  ${iterator.department}
                </td>
                <td class="align-middle text-nowrap d-none d-md-table-cell">
                  ${iterator.location}
                </td>
                <td class="align-middle text-nowrap d-none d-md-table-cell">
                  ${iterator.email}
                </td>
                <td class="text-end text-nowrap">
                  <button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#editPersonnelModal" data-id="${iterator.id}">
                    <i class="fa-solid fa-pencil fa-fw"></i>
                  </button>
                  <button type="button" class="btn btn-primary btn-sm deletePersonnelBtn" data-id="23">
                    <i class="fa-solid fa-trash fa-fw"></i>
                  </button>
                </td>
              </tr>
      
            </table>`


        )
        }
        

      }
    
    },
    error: function(jqXHR, textStatus, errorThrown) {
      // your error code
      console.log(jqXHR);
    }
  }); 

  $.ajax({
    url: "php/getAllDepartmentsWithLocations.php",
    type: 'GET',
    dataType: 'json',

    success: function(result) {

      console.log(JSON.stringify(result));

      if (result.status.name == "ok") {

        for (const iterator of result.data) {

        $("#departments-tab-pane").append(
          `<table class="table table-hover">
          <tr>
            <td class="align-middle text-nowrap department">
              ${iterator.department}
            </td>
            <td class="align-middle text-nowrap d-none d-md-table-cell">
            ${iterator.location}
            </td>
            <td class="align-middle text-end text-nowrap">
              <button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#deleteDepartmentModal" data-id="${iterator.id}">
                <i class="fa-solid fa-pencil fa-fw"></i>
              </button>
              <button type="button" class="btn btn-primary btn-sm deleteDepartmentBtn" data-id="${iterator.id}">
                <i class="fa-solid fa-trash fa-fw"></i>
              </button>
            </td>
          </tr> 
  
        </table>`
        )
        
        }

        $(".deleteDepartmentBtn").on("click", function(e) {


          let words = $('#personnel-tab-pane').text();
          let nearestDep = $(e.target).closest('td.department');
          let query = nearestDep.text();

          console.log(words);
          console.log(nearestDep);
          console.log(query);

          if(words.indexOf(query) !== -1){
            alert("You can't delete this department, there are Employees in them")

          } else {

               
          alert("Are you sure you want to delete?");

              $.ajax({
              url: "php/deleteDepartmentByID.php",
              type: 'POST',
              data: {id: $(e.target).attr("data-id")},
              dataType: 'json',
          
              success: function(result) {
          
                console.log(JSON.stringify(result));

                //console.log(e.target.closest('button').getAttribute('data-id'));
                console.log($(e.target).attr("data-id"));

              
          
                if (result.status.name == "ok") {
          
                  alert("Department deleted"); 
                
                }
              },
              error: function(jqXHR, textStatus, errorThrown) {
                // your error code
                console.log(jqXHR);
              }
            }); 
            
          }
                
          });       
        
      }
    
    },
    error: function(jqXHR, textStatus, errorThrown) {
      // your error code
      console.log(jqXHR);
    }
  }); 



  $.ajax({
    url: "php/getAllDepartments.php",
    type: 'GET',
    dataType: 'json',

    success: function(result) {

      console.log(JSON.stringify(result));

      if (result.status.name == "ok") {

        for (const iterator of result.data) {

          $("#addPersonnelDepartment").append(`<option value="${iterator.id}">${iterator.name}</option>`)   
};
      }
    
    },
    error: function(jqXHR, textStatus, errorThrown) {
      // your error code
      console.log(jqXHR);
    }
  }); 

  $.ajax({
    url: "php/getAllLocations.php",
    type: 'GET',
    dataType: 'json',

    success: function(result) {

      console.log(JSON.stringify(result));

      if (result.status.name == "ok") {

        for (const iterator of result.data) {

          $("#locations-tab-pane").append(

        `<table class="table table-hover">
        <tr>
          <td class="align-middle text-nowrap">
            ${iterator.name}
          </td>
          <td class="align-middle text-end text-nowrap">
            <button type="button" class="btn btn-primary btn-sm">
              <i class="fa-solid fa-pencil fa-fw"></i>
            </button>
            <button type="button" class="btn btn-primary btn-sm deleteLocationBtn">
              <i class="fa-solid fa-trash fa-fw"></i>
            </button>
          </td>
        </tr>

      </table> `

  )

    $("#addDepartmentLocation").append(`<option value="${iterator.id}">${iterator.name}</option>`
  )   
};

        

      }
    
    },
    error: function(jqXHR, textStatus, errorThrown) {
      // your error code
      console.log(jqXHR);
    }
  }); 
  $("#searchInp").on("keyup", function (e) {
    e.preventDefault();
        var query = $(this).val().toLowerCase();
        if(query){
          // loop through all elements to find match
          $.each($('table'), function(){
            var words = $(this).find('td').text().toLowerCase();
            if(words.indexOf(query) == -1){
              $(this).hide();
            } else {
              $(this).show();
            }
          });
        } else {
          // empty query so show everything
          $('table').show();
        }
      });
      
    
    $("#refreshBtn").click(function () {
      
      if ($("#personnelBtn").hasClass("active")) {
        
        alert("refresh personnel table");
        
      } else {
        
        if ($("#departmentsBtn").hasClass("active")) {
          
          alert("refresh department table");
          
        } else {
          
          alert("refresh location table");
          
        }
        
      }
      
    });
    
    $("#editPersonnelModal").on("show.bs.modal", function (e) {
      
      $.ajax({
        url:'php/getPersonnelByID.php',
        type: "POST",
        dataType: "json",
        data: {
          id: $(e.relatedTarget).attr("data-id") // Retrieves the data-id attribute from the calling button
        },
        success: function (result) {
          var resultCode = result.status.code;
    
          if (resultCode == 200) {
            // Update the hidden input with the employee id so that
            // it can be referenced when the form is submitted
    
            $("#editPersonnelEmployeeID").val(result.data.personnel[0].id);
    
            $("#editPersonnelFirstName").val(result.data.personnel[0].firstName);
            $("#editPersonnelLastName").val(result.data.personnel[0].lastName);
            $("#editPersonnelJobTitle").val(result.data.personnel[0].jobTitle);
            $("#editPersonnelEmailAddress").val(result.data.personnel[0].email);
    
            $("#editPersonnelDepartment").html("");
    
            $.each(result.data.department, function () {
              $("#editPersonnelDepartment").append(
                $("<option>", {
                  value: this.id,
                  text: this.name
                })
              );
            });
    
            $("#editPersonnelDepartment").val(result.data.personnel[0].departmentID);
            
          } else {
            $("#editPersonnelModal .modal-title").replaceWith(
              "Error retrieving data"
            );
          }
        },
        error: function (jqXHR, textStatus, errorThrown) {
          $("#editPersonnelModal .modal-title").replaceWith(
            "Error retrieving data"
          );
        }
      });
    });
    
    // Executes when the form button with type="submit" is clicked
    
    $("#editPersonnelForm").on("submit", function (e) {
      // stop the default browser behviour
    
      e.preventDefault();on
    
      // AJAX call to save form data
      
    });
  
    $('#personnelBtn').on("click", function() {
      $("#addBtn").attr("data-bs-target","#addPersonnelModal");
    });
  
    $('#departmentsBtn').on("click", function() {
      $("#addBtn").attr("data-bs-target","#addDepartmentModal");
    });
  
    $('#locationsBtn').on("click", function() {
      $("#addBtn").attr("data-bs-target","#addLocationModal");
    });
  
    $('#addDepartmentForm').on('submit', function(e){
  
      e.preventDefault();
  
        $.ajax({
          url: "php/insertDepartment.php",
          type: 'POST',
          data: {name: $('#addDepartmentName:input').val(),
          locationID: $('#addDepartmentLocation:input').val()},
          dataType: 'json',
      
          success: function(result) {
      
            console.log(JSON.stringify(result));
      
            if (result.status.name == "ok") {
      
              alert("Department Added");
              $('#addDepartmentModal').modal("hide");
      
            }        
          },
          error: function(jqXHR, textStatus, errorThrown) {
            // your error code
            console.log(jqXHR);
          }
        }); 
  
        /*let i = 1
  
        while (i = 1) {
          $('#addDepartmentModal').hide()
          break;
  
        }*/
  
        
  
      });
  
      $('#addLocationForm').on('submit', function(e){
  
        e.preventDefault();
    
          $.ajax({
            url: "php/insertLocation.php",
            type: 'POST',
            data: {name: $('#addLocation').val()},
            dataType: 'json',
        
            success: function(result) {
        
              console.log(JSON.stringify(result));
        
              if (result.status.name == "ok") {
        
                alert("Location added");
                $('#addLocationModal').modal("hide");      
              }
              
            
    
          
            
            },
            error: function(jqXHR, textStatus, errorThrown) {
              // your error code
              console.log(jqXHR);
            }
          });         
        });
  
        $('#addPersonnelForm').on('submit', function(e){
  
          e.preventDefault();
      
            $.ajax({
              url: "php/insertEmployee.php",
              type: 'POST',
              data: {firstName: $('#addPersonnelFirstName').val(),
                    lastName: $('#addPersonnelLastName').val(),
                    jobTitle: $('#addPersonnelJobTitle').val(),
                    email: $('#addPersonnelEmailAddress').val(),
                    departmentID: $('#addPersonnelDepartment').val()
                  },
              dataType: 'json',
          
              success: function(result) {
          
                console.log(JSON.stringify(result));
          
                if (result.status.name == "ok") {
          
                  alert("Employee added"); 
                  $('#addPersonnelModal').modal("hide");     
                }
              },
              error: function(jqXHR, textStatus, errorThrown) {
                // your error code
                console.log(jqXHR);
              }
            });         
          });
  
          $("#deleteDepartmentBtn").on("click", function() {
  
            alert("Ellie");
  
          }); 

});


