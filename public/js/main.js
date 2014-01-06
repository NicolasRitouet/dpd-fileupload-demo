
var files = [];

var uploadFiles = function() {

    var fd = new FormData()
    for (var i in files) {
        fd.append("uploadedFile", files[i])
    }

    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/upload'); 
    xhr.onload = function() {
        $("#result").append("Upload successful!");
    };
    xhr.onerror = function(err) {
        alert("Error: ", err);
    }
    xhr.send(fd);

};

var setFiles = function(element) {
  console.log('files:', element.files);
  // Turn the FileList object into an Array
    files = [];
    for (var i = 0; i < element.files.length; i++) {
      files.push(element.files[i]);
    }
};

var getFiles = function() {
    dpd.upload.get(function(data, statusCode, headers, config) {
        $("#result").empty();
        for(var index in data) {
            $("#result").append(data[index].filename + "<button  class='btn btn-default btn-sm' onClick='deleteFile(&quot;" + data[index].id + "&quot;)'>Delete</button><br />");

        }
    });
}
getFiles();

var deleteFile = function(id) {
    dpd.upload.del(id, function(data, status) {
       $("#result").append("File removed!");
        getFiles();
    })
}