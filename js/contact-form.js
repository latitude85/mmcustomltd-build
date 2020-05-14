/*
--------------------------------
Ajax Contact Form
--------------------------------
+ https://github.com/mehedidb/Ajax_Contact_Form
+ A Simple Ajax Contact Form developed in PHP with HTML5 Form validation.
+ Has a fallback in jQuery for browsers that do not support HTML5 form validation.
+ version 1.0.1
+ Copyright 2016 Mehedi Hasan Nahid
+ Licensed under the MIT license
+ https://github.com/mehedidb/Ajax_Contact_Form
*/

(function ($, window, document, undefined) {
    'use strict';

    const convertFormData = (rawData) => {
        let data = {};
        for (const el of rawData) {
            data[el.name] = el.value;
        }
        return data;
    }

    $('#contact-form').submit(function (e) {
        e.preventDefault();

        // Clean error class
        $('.alert').remove();

        // Get data from form
        var $form = $(this);
        var serializedForm = $form.serializeArray();

        function getFormField(fieldName) {
            // We use filter over find because find isn't supported in any version
            // of IE and the polyfill is simple enough that we can just do this.
            return serializedForm.filter(function (field) {
                return field.name === fieldName;
            })[0].value;
        }

        // Prepare data
        const data = {
            account: 'mmcustomltd',
            template: 'contact',
            data: {
                email: getFormField('from_email'),
                body: {
                    firstName: getFormField('first_name'),
                    lastName: getFormField('last_name'),
                    phoneNumber: getFormField('from_telephone'),
                    emailAddress: getFormField('from_email'),
                    message: getFormField('message'),
                }
            }
        };

        console.log(data);

        // Disable button
        $(this).find('button').attr('disabled', true);
        $(this).find('button').html('Sending message...');

        // Send email
        $.ajax({
            type: $(this).attr('method'),
            url: $(this).attr('action'),
            data: JSON.stringify(data),
            dataType: 'json',
            contentType: "application/json",
            crossDomain: true
        }).done((data) => {
            // Add success message
            $(this).prepend('<div class="alert alert-success">Message has been sent!</div>');
            $(this).trigger("reset");
            // Enable button
            $(this).find('button').attr('disabled', false);
            $(this).find('button').html('Send message <i class="icofont icofont-paper-plane"></i>');
            // Reset form
            $(this).trigger("reset");
        }).fail((err) => {
            // Add error message
            $(this).prepend('<div class="alert alert-danger">Sorry, something went wrong. Please try again later.</div>');
            // Enable button
            $(this).find('button').attr('disabled', false);
            $(this).find('button').html('Send message <i class="icofont icofont-paper-plane"></i>');
            // Reset form
            $(this).trigger("reset");
        });
    });
}(jQuery, window, document));
