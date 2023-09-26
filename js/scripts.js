$(document).ready(function() {
  
  $.ajax({
    url: "php/getAll.php",
    type: 'GET',
    dataType: 'json',

    success: function(result) {

      console.log(JSON.stringify(result));

      if (result.status.name == "ok") {

        for (const iterator of result.data) {

        $("#personnelTable").append(
            `<tr>
                <td class="align-middle text-nowrap">
                  ${iterator.lastName}, ${iterator.firstName}
                </td>
                <td class="align-middle text-nowrap d-none d-md-table-cell">
                  ${iterator.jobTitle}
                </td>
                <td class="align-middle text-nowrap d-none d-md-table-cell personnelDepartmentCol">
                  ${iterator.department}
                </td>
                <td class="align-middle text-nowrap d-none d-md-table-cell personnelLocationCol">
                  ${iterator.location}
                </td>
                <td class="align-middle text-nowrap d-none d-md-table-cell">
                  ${iterator.email}
                </td>
                <td class="text-end text-nowrap">
                  <button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#editPersonnelModal" data-id="${iterator.id}">
                    <i class="fa-solid fa-pencil fa-fw"></i>
                  </button>
                  <button type="button" class="btn btn-primary btn-sm deletePersonnelBtn" data-id="${iterator.id}">
                    <i class="fa-solid fa-trash fa-fw"></i>
                  </button>
                </td>
              </tr>`


        )
        }
        $(".deletePersonnelBtn").click(function () {
          $.ajax({
            url: "php/getPersonnelByID.php",
            type: "POST",
            dataType: "json",
            data: {
              id: $(this).attr("data-id") // Retrieves the data-id attribute from the calling button
            },
            success: function (result) {
              var resultCode = result.status.code;
        
              if (resultCode == 200) {
                $("#areYouSurePersonnelName").text(
                  result.data["personnel"][0].firstName +
                    " " +
                    result.data["personnel"][0].lastName
                );
        
                $("#areYouSurePersonnelModal").modal("show");

                $("#yesDeletePersonnelBtn").click(function () {
                  console.log(result.data.personnel[0].id);
                               
                  $.ajax({
                    url: "php/deletePersonnelByID.php",
                    type: "POST",
                    dataType: "json",
                    data: {
                      id: result.data.personnel[0].id
                    },
                    success: function (result) {
                      if (result.status.code == 200) {
                       
                      } 
                    },
                    
                  });
                });

              } else {
                $("#areYouSurePersonnelModal .modal-title").replaceWith(
                  "Error retrieving data"
                );
                $("#areYouSurePersonnelModal").modal("show");
              }
            },
            error: function (jqXHR, textStatus, errorThrown) {
              $("#deleteEmployeeName .modal-title").replaceWith(
                "Error retrieving data"
              );
            }
          });
        });

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

        $("#departmentsTable").append(
          `<tr>
            <td class="align-middle text-nowrap department">
              ${iterator.department}
            </td>
            <td class="align-middle text-nowrap d-none d-md-table-cell">
            ${iterator.location}
            </td>
            <td class="align-middle text-end text-nowrap">
              <button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#editDepartmentModal" data-id="${iterator.id}">
                <i class="fa-solid fa-pencil fa-fw"></i>
              </button>
              <button type="button" class="btn btn-primary btn-sm deleteDepartmentBtn"  data-id="${iterator.id}">
                <i class="fa-solid fa-trash fa-fw"></i>
              </button>
            </td>
          </tr>`
        )
        
        }

        $(".deleteDepartmentBtn").click(function () {
      
          $.ajax({
            url: "php/checkDepartment.php",
            type: "POST",
            dataType: "json",
            data: {
              id: $(this).attr("data-id") // Retrieves the data-id attribute from the calling button
            },
            success: function (result) {
              if (result.status.code == 200) {
                if (result.data[0].departmentCount == 0) {
                  $("#areYouSureDeptName").text(result.data[1].departmentName);
        
                  $("#areYouSureDeleteDepartmentModal").modal("show");
                } else {
                  $("#cantDeleteDeptName").text(result.data[1].departmentName);
                  $("#pc").text(result.data[0].departmentCount);
        
                  $("#cantDeleteDepartmentModal").modal("show");
                }
                $("#yesDeleteDepartmentBtn").click(function () {
                               
                  $.ajax({
                    url: "php/deleteDepartmentByID.php",
                    type: "POST",
                    dataType: "json",
                    data: {
                      id: result.data[1].departmentID
                    },
                    success: function (result) {
                      if (result.status.code == 200) {
                       
                      } 
                    },
                    
                  });
                });
            
              } 
            },
            error: function(jqXHR, textStatus, errorThrown) {
              // your error code
              console.log(jqXHR);
            }
          });
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

          $("#locationsTable").append(

        `<tr>
          <td class="align-middle text-nowrap">
            ${iterator.name}
          </td>
          <td class="align-middle text-end text-nowrap">
            <button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#editLocationModal" data-id="${iterator.id}">
              <i class="fa-solid fa-pencil fa-fw"></i>
            </button>
            <button type="button" class="btn btn-primary btn-sm deleteLocationBtn" data-id="${iterator.id}">
              <i class="fa-solid fa-trash fa-fw"></i>
            </button>
          </td>
        </tr>`

  )

    $("#addDepartmentLocation").append(`<option value="${iterator.id}">${iterator.name}</option>`
  )   
  $("#editDepartmentLocation").append(`<option value="${iterator.id}">${iterator.name}</option>`
  )  
};

$(".deleteLocationBtn").click(function () {
      
  $.ajax({
    url: "php/checkLocation.php",
    type: "POST",
    dataType: "json",
    data: {
      id: $(this).attr("data-id") // Retrieves the data-id attribute from the calling button
    },
    success: function (result) {
      if (result.status.code == 200) {
        if (result.data[0].locationCount == 0) {
          $("#areYouSureLocationName").text(result.data[1].locationName);

          $("#areYouSureDeleteLocationModal").modal("show");
        } else {
          $("#cantDeleteLocationName").text(result.data[1].locationName);
          $("#personnelLocationCount").text(result.data[0].locationCount);

          $("#cantDeleteLocationModal").modal("show");
        }
        $("#yesDeleteLocationBtn").click(function () {
                       
          $.ajax({
            url: "php/deleteLocationByID.php",
            type: "POST",
            dataType: "json",
            data: {
              id: result.data[1].locationID
            },
            success: function (result) {
              if (result.status.code == 200) {
               
              } 
            },
            
          });
        });
    
      } 
    },
    error: function(jqXHR, textStatus, errorThrown) {
      // your error code
      console.log(jqXHR);
    }
  });
});   

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
          $.each($('tr'), function(){
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
      location.reload(true)
      /*if ($("#personnelBtn").hasClass("active")) {
        alert("refresh personnel table");
        
        $("#personnelBtn").addClass('active')        
      } else {
        
        if ($("#departmentsBtn").hasClass("active")) {          
          alert("refresh department table");
          
        } else {
          
          alert("refresh location table");
          
        }
        
      }*/
      
      
    });
        
     /* $("#departments-tab-pane").on(click, function ()  {
        console.log("HHHHH")
        $("#filterBtn").attr("diabled"); 
               
        })*/
     
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
    
    /*$("#editPersonnelForm").on("submit", function (e) {
      // stop the default browser behviour
    
      e.preventDefault();on
    
      // AJAX call to save form data
      
    });*/

    $("#editDepartmentModal").on("show.bs.modal", function (e) {
      console.log($(e.relatedTarget).attr("data-id"))
      
      $.ajax({
        url:'php/getDepartmentByID.php',
        type: "POST",
        dataType: "json",
        data: {
          id: $(e.relatedTarget).attr("data-id") // Retrieves the data-id attribute from the calling button
        },
        success: function (result) {
          var resultCode = result.status.code;
    
          if (resultCode == 200) {
    
            $("#editDepartmentName").val(result.data[0].name);          
    
    
            $("#editDepartmentLocation").val(result.data[0].locationID);
            
            $('#editDepartmentForm').on('submit', function(e){
  
              e.preventDefault();
              console.log(result.data[0].id);
          
                $.ajax({
                  url: "php/updateDepartmentByID.php",
                  type: 'POST',
                  data: {name: $('#editDepartmentName:input').val(),
                  locationID: $('#editDepartmentLocation:input').val(),
                  id: result.data[0].id},
                  dataType: 'json',
              
                  success: function(result) {     
                    console.log(JSON.stringify(result));
              
                    if (result.status.name == "ok") {
      
                      $('#editDepartmentModal').modal("hide");
              
                    }        
                  },
                  error: function(jqXHR, textStatus, errorThrown) {
                    // your error code
                    console.log(jqXHR);
                  }
                });       
              });
            
          } else {
            $("#editDepartmentModal .modal-title").replaceWith(
              "Error retrieving data"
            );
          }
        },
        error: function (jqXHR, textStatus, errorThrown) {
          $("#editDepartmentModal .modal-title").replaceWith(
            "Error retrieving data"
          );
        }
      });
    });

    $("#editLocationModal").on("show.bs.modal", function (e) {
      console.log($(e.relatedTarget).attr("data-id"))
      
      $.ajax({
        url:'php/getLocationByID.php',
        type: "POST",
        dataType: "json",
        data: {
          id: $(e.relatedTarget).attr("data-id") // Retrieves the data-id attribute from the calling button
        },
        success: function (result) {
          var resultCode = result.status.code;
    
          if (resultCode == 200) {
    
            $("#editLocationName").val(result.data[0].name);          
    
            
            $('#editLocationForm').on('submit', function(e){
  
              e.preventDefault();
              console.log(result.data[0].id);
          
                $.ajax({
                  url: "php/updateLocationByID.php",
                  type: 'POST',
                  data: {name: $('#editLocationName:input').val(),
                  id: result.data[0].id},
                  dataType: 'json',
              
                  success: function(result) {     
                    console.log(JSON.stringify(result));
              
                    if (result.status.name == "ok") {
              
                      $('#editLocationModal').modal("hide");
              
                    }        
                  },
                  error: function(jqXHR, textStatus, errorThrown) {
                    // your error code
                    console.log(jqXHR);
                  }
                });       
              });
            
          } else {
            $("#editLocationModal .modal-title").replaceWith(
              "Error retrieving data"
            );
          }
        },
        error: function (jqXHR, textStatus, errorThrown) {
          $("#editLocationModal .modal-title").replaceWith(
            "Error retrieving data"
          );
        }
      });
    });
  
    $('#personnelBtn').on("click", function() {
      $("#addBtn").attr("data-bs-target","#addPersonnelModal");
      $("#filterBtn").attr("data-bs-toggle","modal");
    });
  
    $('#departmentsBtn').on("click", function() {
      $("#addBtn").attr("data-bs-target","#addDepartmentModal");
      $("#filterBtn").attr("data-bs-toggle","false");
    });
  
    $('#locationsBtn').on("click", function() {
      $("#addBtn").attr("data-bs-target","#addLocationModal");
      $("#filterBtn").attr("data-bs-toggle","false");
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
            console.log($('#addDepartmentName:input').val())
            console.log($('#addDepartmentLocation:input').val())      
            console.log(JSON.stringify(result));
      
            if (result.status.name == "ok") {
      
              $('#addDepartmentModal').modal("hide");
      
            }        
          },
          error: function(jqXHR, textStatus, errorThrown) {
            // your error code
            console.log(jqXHR);
          }
        });       
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
        
                $('#addLocationModal').modal("hide");      
              }
              
            
    
          
            
            },
            error: function(jqXHR, textStatus, errorThrown) {
              // your error code
              console.log(jqXHR);
            }
          });         
        });
  
        $('#editPersonnelForm').on('submit', function(e){
  
          e.preventDefault();

          console.log('firstName:', $('#editPersonnelFirstName:input').val(),
          'lastName:', $('#editPersonnelLastName:input').val(),
          'jobTitle:', $('#editPersonnelJobTitle:input').val(),
          'email:', $('#editPersonnelEmailAddress:input').val(),
          'departmentID:', $('#addPersonnelDepartment:input').val(), 'id:', $('#editPersonnelEmployeeID:input').val())
      
            $.ajax({
              url: "php/updatePersonnelByID.php",
              type: 'POST',
              data: {firstName: $('#editPersonnelFirstName:input').val(),
                    lastName: $('#editPersonnelLastName:input').val(),
                    jobTitle: $('#editPersonnelJobTitle:input').val(),
                    email: $('#editPersonnelEmailAddress:input').val(),
                    departmentID: $('#editPersonnelDepartment:input').val(),
                    id: $('#editPersonnelEmployeeID:input').val()
                  },
              dataType: 'json',

              success: function(result) {
          
                console.log(JSON.stringify(result));
          
                if (result.status.name == "ok") {
          
                  $('#editPersonnelModal').modal("hide");     
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
  
            console.log('firstName:', $('#addPersonnelFirstName:input').val(),
            'lastName:', $('#addPersonnelLastName:input').val(),
            'jobTitle:', $('#addPersonnelJobTitle:input').val(),
            'email:', $('#addPersonnelEmailAddress:input').val(),
            'departmentID:', $('#addPersonnelDepartment:input').val())
        
              $.ajax({
                url: "php/insertPersonnel.php",
                type: 'POST',
                data: {firstName: $('#addPersonnelFirstName:input').val(),
                      lastName: $('#addPersonnelLastName:input').val(),
                      jobTitle: $('#addPersonnelJobTitle:input').val(),
                      email: $('#addPersonnelEmailAddress:input').val(),
                      departmentID: $('#addPersonnelDepartment:input').val()
                    },
                dataType: 'json',
  
                success: function(result) {
            
                  console.log(JSON.stringify(result));
            
                  if (result.status.name == "ok") {
             
                    $('#addPersonnelModal').modal("hide");     
                  }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                  // your error code
                  console.log(jqXHR);
                }
              });         
            });
      

     $("#filterModal").on("show.bs.modal", function() {
      $.ajax({
        url: "php/getLocationsAndDepartments.php",
        type: 'GET',
        dataType: 'json',
    
        success: function(result) {
    
          console.log(JSON.stringify(result));
    
          if (result.status.name == "ok") {
    
            for (const iterator of result.data.department) {
    
              $("#filterDepartment").append(`<option value="${iterator.id}">${iterator.name}</option>`)   
            };

            for (const iterator of result.data.location) {
    
           $("#filterLocation").append(`<option value="${iterator.id}">${iterator.name}</option>`) 
           
           }
        
           $('#filterDepartment').on('change', function() {
           if($('#filterDepartment').find(":selected").val() !== 'none') {
            $('#filterLocation').attr('disabled', true)
           } else {
            $('#filterLocation').attr('disabled', false)
           };


           var query = $('#filterDepartment').find(":selected").text();
           if(query){
          // loop through all elements to find match
          $.each($('#personnelTable').find('tr'), function(){
            var words = $(this).find('.personnelDepartmentCol').text();
            if(words.indexOf(query) == -1){
              $(this).hide();
            } else {
              $(this).show();
            }
          })
        }

          })

          $('#filterLocation').on('change', function() {
            if($('#filterLocation').find(":selected").val() !== 'none') {
             $('#filterDepartment').attr('disabled', true)
            } else{
              $('#filterDepartment').attr('disabled', false)
            };

            var query = $('#filterLocation').find(":selected").text();
            if(query){
           // loop through all elements to find match
           $.each($('#personnelTable').find('tr'), function(){
             var words = $(this).find('.personnelLocationCol').text();
             if(words.indexOf(query) == -1){
               $(this).hide();
             } else {
               $(this).show();
             }
           })
         }
           })

          }
        
        },
        error: function(jqXHR, textStatus, errorThrown) {
          // your error code
          console.log(jqXHR);
        }
      }); 
     })
});


