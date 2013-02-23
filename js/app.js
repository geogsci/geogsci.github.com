window.onload = function() {
  // Quotes
  var quotes = [
    {name: "Gail",   quote: "You're gonna scream your guts out, you'll be so happy."},
    {name: "Matrix", quote: "Let off some steam, Bennett."},
    {name: "Matrix", quote: "Don't disturb my friend, he's dead tired."},
    {name: "Dutch", quote: "Run! Get to the chopper!"}
  ];

  var idx = Math.floor(Math.random()*quotes.length);

  var quoteEl  = $("#quote");
  quoteEl.html("\""+quotes[idx].quote+"\""+" - "+quotes[idx].name);

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
};

