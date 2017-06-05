$(document).ready(function() {
  var baseURL = "https://en.wikipedia.org/w/api.php?action=opensearch&search=";
  var endURL = "&format=json&callback=?";
  var url;
  
  function displayArticle(content) {
    $("#articlesPlaceholder").append(content);
  }
  
  // Random button
  $("#ramdomArticle").click(function(){
    window.open("https://en.wikipedia.org/wiki/Special:Random");
  });
  
  $("#searchArticle").click(function(){
    //clean articlePlaceholder
    $("#articlesPlaceholder").html(" ");
    // if empty strinh alert user
    if ($("#inputSearch").val() === "") {
      //displayArticle("<div class='jumbotron'><p>Empty search</h1></p>");
      return;
    }
    // get articles
    var url = baseURL + $("#inputSearch").val() + endURL;
    $.getJSON(url)
      .done(function(data){
        for( i = 0 ; i < data[1].length ; i++ ) {
          displayArticle("<div class='panel panel-default'><div class='panel-body'><h2><a target='_blank' href=" + data[3][i] + ">"+ data[1][i] + "</a></h2><p class='lead'>" + data[2][i] + "</p>" + "</div></div>");
        }
      })
      .fail(function(){
        displayArticle("<div class='jumbotron'><h1>Error getting request</h1></div>");
      });
  });
  
});