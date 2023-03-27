document.getElementById("submit2").addEventListener("click", function(event) {
    event.preventDefault();
    var data = document.getElementById("test2_ID").value;
    alert(data)
    if (data)
      show_data(data);
    else
      alert("Veuillez entrer des données valides")
  });

  function show_data(data) {
    $.ajax({
      type: "POST",
      contentType: "application/json",
      url: "/input",
      data: JSON.stringify({ "test": data}),
      dataType: "json",
      success: function(result) {
        location.reload();
      },
      error: function(xhr, textStatus, errorThrown) {
        alert("Error: " + errorThrown);
      }
    });
  }
  

 