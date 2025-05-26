$(document).ready(function () {
    $("#addMore").click(function () {
      const row = `
      <tr class="formRow">
        <td><input type="text" name="name[]" required></td>
        <td><input type="email" name="email[]" required></td>
        <td><input type="text" name="mobile[]" maxlength="10" required></td>
        <td>
          <select name="gender[]" required>
            <option value="">Select</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </td>
        <td><button type="button" class="deleteRow">Delete</button></td>
      </tr>`;
      $("#formBody").append(row);
    });
  
    $(document).on("click", ".deleteRow", function () {
      if ($(".formRow").length > 1) {
        $(this).closest("tr").remove();
      } else {
        alert("At least one row is required.");
      }
    });
  
    $("#userForm").on("submit", function (e) {
      e.preventDefault();
  
      let valid = true;
      $("input[name='mobile[]']").each(function () {
        const val = $(this).val();
        if (!/^\d{10}$/.test(val)) {
          alert("Each mobile number must be 10 digits.");
          valid = false;
          return false;
        }
      });
  
      if (!valid) return;
  
      const formData = $(this).serializeArray();
      const finalData = [];
  
      for (let i = 0; i < formData.length; i += 4) {
        finalData.push({
          name: formData[i].value,
          email: formData[i + 1].value,
          mobile: formData[i + 2].value,
          gender: formData[i + 3].value,
        });
      }
  
      $.ajax({
        url: "http://localhost/Dynamic-form/public/api/submit-form",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(finalData),
        success: function (res) {
          $("#message").text(res.message).css("color", "green");
        },
        // error: function (xhr) {
        //   $("#message").text(xhr.responseJSON.message).css("color", "red");
        // }
        error: function (xhr) {
            let errorMsg = "An error occurred.";
          
            // Try to parse JSON response safely
            try {
              const response = JSON.parse(xhr.responseText);
              if (response.message) {
                errorMsg = response.message;
              }
            } catch (e) {
              errorMsg = xhr.statusText || "Server error";
            }
          
            $("#message").text(errorMsg).css("color", "red");
          }
          
      });
    });
  });
  