document.addEventListener('DOMContentLoaded', function(){
    var courseId
    var deleteForm = document.forms['delete-course-form']
    var btnDeleteCourse = document.getElementById('btn-delete-course')
    var checkboxAll= $('#checkbox-all')  
    var containerForm = document.forms['container-form']
    var courseItemCheckbox = $('input[name="courseIds[]"]')
    var checkAllSubmitBtn = $('.check-all-submit-btn')
    //when dialog confirm clicked
    $('#delete-course-modal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget) 
        courseId = button.data('id') 
    })

    //when delete course btn clicked
    btnDeleteCourse.onclick = function(){
        deleteForm.action = '/courses/' + courseId + '?_method=DELETE' 
        deleteForm.submit()
    }
    //checkbox all clicked
    checkboxAll.change(function(){
      var isCheckdAll = $(this).prop('checked')
      courseItemCheckbox.prop('checked', isCheckdAll)
      renderCheckAllSubmitBtn()
    })
    //course item checkbox changed
    courseItemCheckbox.change(function(){
      var isCheckedAll = courseItemCheckbox.filter(':checked').length === courseItemCheckbox.length
      checkboxAll.prop('checked', isCheckedAll) 
      renderCheckAllSubmitBtn()
      })
    //Check all submit button clicked

    // {{!-- checkAllSubmitBtn.on('submit',function(e){
    //   var isSubmitable = $(this).hasClass('disabled')
    //   if (isSubmitable){
    //     e.preventDefault();
    //   }
    // }) 
    // --}}


    //re-render check all submit btn
    function renderCheckAllSubmitBtn(){
      var checkedCount = $('input[name="courseIds[]"]:checked').length;
      if (checkedCount > 0){
        checkAllSubmitBtn.attr('disabled', false)
      } else {
        checkAllSubmitBtn.attr('disabled', true)
      }
      
    }

})

