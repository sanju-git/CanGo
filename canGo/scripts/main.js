$("#form").submit(submitForm);

function openForm(e) {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}

let employees = [];

function submitForm(e) {
  e.preventDefault();
  var form = $("#form");
  var arr = $.map(form.serializeArray(), function (v, k) {
    return [v.value]
  });

  let employeeObj = {
    email: arr[0],
    name: arr[1],
    employeeId: arr[2],
    desgination: arr[3]
  };
  employees.push(employeeObj);
  renderEmployee(employeeObj);
  document.getElementById("myForm").style.display = "none";
  $("#form")[0].reset();
  return false; 
}

function renderEmployees() {
  employees.forEach(employee => {
   renderEmployee(employee)
  });

}

function renderEmployee(employee) {
  let table = $("#employees-table");
  table.append("<tr data-email='"+employee.email+"' data-name='"+employee.name+"' data-employeeId='"+employee.employeeId+"' data-designation='"+employee.desgination+"' ><td>"+employee.email+"</td><td>"+employee.name+"</td> <td>"+employee.employeeId+"</td> <td>"+employee.desgination+"</td> <td><button class='btn btn-info btn-xs btn-edit'>Edit</button> &nbsp; <button class='btn btn-danger btn-xs btn-delete'>Delete</button> &nbsp;</td></tr>");
}

$("body").on("click", ".btn-delete", function(){
  $(this).parents("tr").remove();
});

$("body").on("click", ".btn-edit", function(){
  var email = $(this).parents("tr").attr('data-email');
  var name = $(this).parents("tr").attr('data-name');
  var id = $(this).parents("tr").attr('data-employeeId');
  var desgination = $(this).parents("tr").attr('data-designation');

  $(this).parents("tr").find("td:eq(0)").html('<input name="edit_email" value="'+email+'">');
  $(this).parents("tr").find("td:eq(1)").html('<input name="edit_name" value="'+name+'">');
  $(this).parents("tr").find("td:eq(2)").html('<input name="edit_id" value="'+id+'">');
  $(this).parents("tr").find("td:eq(3)").html('<input name="edit_designation" value="'+desgination+'">');

  $(this).parents("tr").find("td:eq(4)").prepend("<button class='btn btn-info btn-xs btn-update'>Update</button> &nbsp;<button class='btn btn-warning btn-xs btn-cancel'>Cancel</button>")
  $(this).hide();
});

$("body").on("click", ".btn-cancel", function(){
  var email = $(this).parents("tr").attr('data-email');
  var name = $(this).parents("tr").attr('data-name');
  var id = $(this).parents("tr").attr('data-employeeId');
  var desgination = $(this).parents("tr").attr('data-designation');

  $(this).parents("tr").find("td:eq(0)").text(email);
  $(this).parents("tr").find("td:eq(1)").text(name);
  $(this).parents("tr").find("td:eq(2)").text(id);
  $(this).parents("tr").find("td:eq(3)").text(desgination);
  

  $(this).parents("tr").find(".btn-edit").show();
  $(this).parents("tr").find(".btn-update").remove();
  $(this).parents("tr").find(".btn-cancel").remove();
});

$("body").on("click", ".btn-update", function(){
  var email = $(this).parents("tr").find("input[name='edit_email']").val();
  var name = $(this).parents("tr").find("input[name='edit_name']").val();
  var id = $(this).parents("tr").find("input[name='edit_id']").val();
  var desgination = $(this).parents("tr").find("input[name='edit_designation']").val();

  $(this).parents("tr").find("td:eq(0)").text(email);
  $(this).parents("tr").find("td:eq(1)").text(name);
  $(this).parents("tr").find("td:eq(2)").text(id);
  $(this).parents("tr").find("td:eq(3)").text(desgination);

  $(this).parents("tr").attr('data-email', email);
  $(this).parents("tr").attr('data-name', name);
  $(this).parents("tr").attr('data-empoyeeId', id);
  $(this).parents("tr").attr('data-designation', desgination);

  $(this).parents("tr").find(".btn-edit").show();
  $(this).parents("tr").find(".btn-cancel").remove();
  $(this).parents("tr").find(".btn-update").remove();
});

