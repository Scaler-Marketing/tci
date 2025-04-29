  document.addEventListener("DOMContentLoaded", function () {
    $('form[action^="https://submit-form.com"]').each(function (i, el) {
      var form = $(el);
      var submitButtonTarget = form.find("[type=submit]");
      var submitButtonTrigger = form.find("a");
      submitButtonTarget.css("display", "none");
      var buttonClass = "button-loading";
      var requiredFields = form.find('input, textarea, select').filter('[required]:visible');

      var botpoisonPublicKey = form.attr("ec-botpoison");
      var redirectUrl = form.attr("ec-redirect");
      var emailFrom = form.attr("ec-email-from");
      var subjectLine = form.attr("ec-email-subject");
      var inputName1 = form.attr("ec-subject-var1");
      var inputName2 = form.attr("ec-subject-var2");

      var inputEmailFrom = form.find("[name='_email.from']");
      var inputSubject = form.find("[name='_email.subject']");
      var inputPageUrl = form.find("[name='Page URL']");
      var inputFormName = form.find("[name='Form Name']");
      var inputHoneypot = form.find("[name='honey-tci-pot']"); // ✅ Matches your honeypot

      function loaderShow() {
        submitButtonTrigger.addClass(buttonClass);
      }

      function loaderHide() {
        submitButtonTrigger.removeClass(buttonClass);
      }

      // ✅ Auto-fill hidden inputs
      if (inputPageUrl.length) inputPageUrl.val(window.location.href);
      if (inputFormName.length) inputFormName.val(form.attr("data-name"));

      submitButtonTrigger.click(function () {
        var counter = 0;
        requiredFields.each(function () {
          if (!this.checkValidity()) {
            this.reportValidity();
            counter++;
          }
        });

        // 🚫 **Bot Detection: Block submission if honeypot is filled**
        if (
          (inputPageUrl.length && !inputPageUrl.val().trim()) || 
          (inputFormName.length && !inputFormName.val().trim()) || 
          (inputHoneypot.length && inputHoneypot.val().trim().length > 0)
        ) {
          console.log("🚫 Bot detected: Missing Page URL/Form Name or Honeypot is filled.");
          loaderHide();
          return;
        }

        if (counter === 0) {
          loaderShow();
          submitButtonTarget.click(); // ✅ Triggers Webflow’s actual submit

          if (inputEmailFrom.length) inputEmailFrom.val(emailFrom);

          if (inputName2) {
            var subjectVar1 = form.find("[data-name='" + inputName1 + "']").val();
            var subjectVar2 = form.find("[data-name='" + inputName2 + "']").val();
            if (inputSubject.length) inputSubject.val(subjectLine + " " + subjectVar1 + " " + subjectVar2);
          } else if (inputName1) {
            var subjectVar1 = form.find("[data-name='" + inputName1 + "']").val();
            if (inputSubject.length) inputSubject.val(subjectLine + " " + subjectVar1);
          } else {
            if (inputSubject.length) inputSubject.val(subjectLine);
          }

          setTimeout(function () {
            submitButtonTrigger.attr("disabled", true).css("cursor", "not-allowed");
            submitButtonTarget.attr("disabled", true).css("cursor", "not-allowed");
          }, 100);
        }
      });

      form.submit(function (e) {
        e.preventDefault();

        var counter = 0;
        requiredFields.each(function () {
          if (!this.checkValidity()) {
            counter++;
          }
        });

        // 🚫 **Block submission if honeypot is filled or fields are empty**
        if (
          (inputPageUrl.length && !inputPageUrl.val().trim()) || 
          (inputFormName.length && !inputFormName.val().trim()) || 
          (inputHoneypot.length && inputHoneypot.val().trim().length > 0)
        ) {
          console.log("🚫 Bot detected: Missing Page URL/Form Name or Honeypot is filled.");
          loaderHide();
          return;
        }

        var action = form.attr("action");
        var botpoison = new Botpoison({ publicKey: botpoisonPublicKey });

        botpoison.challenge()
          .then(function (result) {
            var data = form.serialize();
            data += "&_botpoison=" + result.solution;

            $.ajax({
              url: action,
              method: "POST",
              data: data,
              dataType: "json",
              success: function () {
                loaderHide();
                if (redirectUrl) {
                  window.location.href = redirectUrl;
                } else {
                  form.parent().children("form").css("display", "none");
                  form.parent().children(".w-form-done").css("display", "block");
                }
              },
              error: function () {
                loaderHide();
                form.parent().find(".w-form-fail").css("display", "block");
              },
            });
          })
          .catch(function () {
            loaderHide();
            form.parent().find(".w-form-fail").css("display", "block");
          });
      });
    });
  });
