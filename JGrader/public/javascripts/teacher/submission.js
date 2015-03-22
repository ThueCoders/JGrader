// Created by Brian Singer and Greg Carlin in 2015.
// Copyright (c) 2015 JGrader. All rights reserved.

$('#input-expand').click(function() {
  var inputExpand = $('#input-expand');
  inputExpand.toggleClass('fa-caret-square-o-right');
  inputExpand.toggleClass('fa-caret-square-o-down');
  $('#input-text').toggle();
});

var disabled = false;
$('#execute').click(function() {
  if(!disabled) {
    $('#output-text').html('<span class="fa fa-refresh fa-spin"></span>');
    var fileID = $('.tab-content .active').attr('id');
    var url = document.URL;
    if(url.charAt(url.length-1) != '/') url += '/';
    $.post(url + 'run/' + fileID, {stdin: $('#input-text').val()}, function(data, textStatus, jqXHR) {
      if(data.code == 0) {
        $('#output-text').html(data.out + '\n\n<span class="stderr">' + data.err + '</span>');
      } else {
        alert('An error has occurred, please reload the page and try again.');
      }
    });
  }
});

$('#download').click(function() {
  var fileID = $('.tab-content .active').attr('id');
  var url = document.URL;
  if(url.charAt(url.length-1) != '/') url += '/';
  var win = window.open(url + 'download/' + fileID, '_blank');
  win.focus();
});

$('#test').click(function() {
  // TODO retrieve and display test case results
});

$('.nav-tabs a[data-toggle="tab"]').click(function() {
  if($(this).attr('data-canrun') == 'true') {
    $('#execute span').tooltip();
    $('#execute').removeClass('disabled');
    $('#test span').tooltip();
    $('#test').removeClass('disabled');
    disabled = false;
  } else {
    $('#execute span').tooltip('destroy');
    $('#execute').addClass('disabled');
    $('#test span').tooltip('destroy');
    $('#test').addClass('disabled');
    disabled = true;
  }
});

$(window).load(function() {
  if($('.nav-tabs .active a[data-toggle="tab"]').attr('data-canrun') == 'false') {
    $('#execute span').tooltip('destroy');
    $('#execute').addClass('disabled');
    $('#test span').tooltip('destroy');
    $('#test').addClass('disabled');
    disabled = true;
  }
});

