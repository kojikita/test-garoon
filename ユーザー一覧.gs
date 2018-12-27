function getAllUserList() {
  var scriptProperties = PropertiesService.getScriptProperties();
  var SUB_DOMAIN = scriptProperties.getProperty("SUB_DOMAIN");
  var ACCOUNT = scriptProperties.getProperty("ACCOUNT");
  var PASSWORD = scriptProperties.getProperty("PASSWORD");
  
  var url = "https://" + SUB_DOMAIN + ".cybozu.com/g/api/v1/base/users";
  var passAuth = Utilities.base64Encode(ACCOUNT + ":" + PASSWORD);
  
  var headers = {
    "Content-Type": "application/json",
    "X-Cybozu-Authorization": passAuth
  };
  var options = {
     "method": "get",
     "headers": headers
  };
  
  var users=[];
  
  var offset = 0;
  var limit = 1000;
  var hasNext = true;
  
  while(hasNext) {
    var urlWithParam = url + "?offset=" + offset + "&limit=" + limit;
  
    var response = UrlFetchApp.fetch(urlWithParam, options);
    //Logger.log(response.getContentText());
  
    var content = response.getContentText();
    var jsonParsed = JSON.parse(content);
    
    users = users.concat(jsonParsed.users);
    hasNext = jsonParsed.hasNext;
    offset = offset + limit;
  }
  
  Logger.log(users);
}
