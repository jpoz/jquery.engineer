$(document).ready(function() {
  $('body').append($.engineer.template('awesome', {title: 'awesome', body: 'what up'}));
  $('body').append($.engineer.template('awesome', {title: 'awesome1', body: 'what up'}));
  $('body').append($.engineer.template('awesome', {title: 'awesome2', body: 'what up'}));
  $('body').append($.engineer.template('awesome', {title: 'awesome3', body: 'what up'}));
  $('body').append($.engineer.template('awesome', {title: 'awesome4', body: 'what up'}));
  $('body').append($.engineer.template('awesome', {title: 'awesome5', body: 'what up'}));
});