$(window).ready(function() {
  // Quotes
  var quotes = [
    {name: "Futurama", quote: "Presented in double vision (where drunk)"},
    {name: "Futurama", quote: "Proadly made on Earth"},
    {name: "Futurama", quote: "Condemned by the Space Pope"},
    {name: "Futurama", quote: "Not Y3K Compliant"},
    {name: "Futurama", quote: "Touch eyeballs to screen for cheap laser surgery"},
    {name: "Futurama", quote: "Deciphered From Crop Circles"},
    {name: "Futurama", quote: "Known to cause insanity in laboratory mice"},
    {name: "Futurama", quote: "Put on 3-D monocle now"},
    {name: "Futurama", quote: "Made From 100% Recycled Pixels"},
  ];

  var idx = Math.floor(Math.random()*quotes.length);

  var quoteEl  = $("#quote");
  quoteEl.html("\""+quotes[idx].quote+"\"");

  // Make image open in a new window.
  $("img").each(function() {
    var el = $(this);
    var url = el.attr("src");
    el.wrap('<a target="_blank" href='+url+'>');
  });

  // Force external links to open in new window.
  $("a").each(function() {
    var el = $(this);
    var href = el.attr("href");
    if( href && href.match(/^(https:\/\/|http:\/\/)/) ) {
      el.attr("target", "_blank");
    }
  });
});

$(document).on("click", ".expander", function() {
  var el = $(this).closest(".article");
  if(el.hasClass("collapse")) {
    el.removeClass("collapse");
  } else {
    var st = $(window).scrollTop();
    var ah = el.height()
    el.addClass("collapse");
    $(window).scrollTop(st-ah+250)
  }
  return false;
});

