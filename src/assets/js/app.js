//var API_ENDPOINT = "http://api.devmemuy.com:5010";
var API_ENDPOINT = "https://api.memuy.com/";
var IMAGE_MIMETYPES = ["image/jpeg", "image/png"];

/**
 *  Utils
 **/

String.prototype.trunc = function(n) {
    return this.substr(0, n - 1) + (this.length > n ? '&hellip;' : '');
};

var rand = function() {
    return Math.random().toString(36).substr(2);
};

var token = function() {
    return rand() + rand();
};

secondsToTime = function(seconds) {
    var hours = parseInt( seconds / 3600 ) % 24;
    var minutes = parseInt( seconds / 60 ) % 60;
    var seconds = seconds % 60;

    return {
        seconds,
        minutes,
        hours
    };
};

generateQRCode = function(room) {
    if (qrcodeObj == null) {
        qrcodeObj = new QRCode(document.getElementById("qrcode"), {
            text: room,
            width: 128,
            height: 128,
            colorDark : "#000000",
            colorLight : "#ffffff",
            correctLevel : QRCode.CorrectLevel.H
        });
    } else {
        qrcodeObj.makeCode(room);
    }
};

sizeOf = function(bytes) {
    if (bytes == 0) {
        return "0.00 b";
    }
    var e = Math.floor(Math.log(bytes) / Math.log(1000));
    return parseFloat((bytes / Math.pow(1000, e)).toFixed(1)) + ' kmgtp'.charAt(e) + 'b';
};

/**
 *  Important stuff
 **/

// Show loading icon
$('#mainLoad').fadeIn(1000);

// Open socket connection
var socket = io(API_ENDPOINT),
    currentRoom = null,
    roomOnPath,
    identifier = token(),
    qrcodeObj = null;

socket.on('connect_error', function() {
    console.log('Failed to connect to server');
});

roomOnPath = window.location.pathname.replace('/', '');
roomTimeLeft = 1000;
numberOfFiles = 0;

tryRoom = function(room, type) {
    socket.emit('tryRoom', room, {type: type})
}

if (roomOnPath == '') {
    socket.emit('newRoom')
} else {
    tryRoom(roomOnPath, 'url')
}

adjustPreviewAfterSave = function(element, fileObj) {
    var fileElement = $(element),
        link = fileObj.location

    fileElement.find('.file-link').attr('href', link)
}

addUploadedFile = function(fileObj) {
    var cFileObj = {
        elementId: "file-" + fileObj._id,
        name: fileObj.originalName,
        mimetype: fileObj.mimetype,
        size: fileObj.size,
        location: fileObj.location,
        thumbnail: false,
        status: "uploaded"
    };

    if (IMAGE_MIMETYPES.indexOf(fileObj.mimetype) !== -1) {
        cFileObj.thumbnail = {
            type: "url",
            data: fileObj.location
        };
    }

    addFile(cFileObj);
};

addFile = function(fileObj) {
    if (numberOfFiles == 0) {
        $("#cloud").fadeOut(750);
        $("#file-send-file").fadeIn(10);
    }

    $("#file-send-file").after(generateFilePreview(fileObj));
}

socket.on('roomData', function(roomObj) {
    // console.log(roomObj);
    var roomName = roomObj.room;
    currentRoom = roomName;
    roomTimeLeft = roomObj.timeLeft;
    $('#roomName').val(roomName);
    $('#spaceStats').html(sizeOf(roomObj.usedSpace) + "/" + sizeOf(roomObj.maxSpace));
    generateQRCode(roomName);

    window.history.pushState({}, 'Memuy', '/' + roomName);

    setInterval(function() {
        var time = secondsToTime(roomTimeLeft);
        var result = (time.hours < 10 ? "0" + time.hours : time.hours) + "h " + (time.minutes < 10 ? "0" + time.minutes : time.minutes) + "m " + (time.seconds  < 10 ? "0" + time.seconds : time.seconds) + "s";
        // console.log(result);
        $('#timeLeft').html(result);
        roomTimeLeft--;
    }, 1000);

    numberOfFiles = roomObj.files.length;

    setTimeout(function() {
        $('#mainLoad').fadeOut(500, function() {
            if (roomObj.files.length === 0) {
                $("#cloud").fadeIn(1000).css("display","flex");
            } else {
                $("#file-send-file").fadeIn(10);
            }

            roomObj.files.forEach(function(file) {
                addUploadedFile(file)
            });
        });
    }, 750);

});

socket.on('newFile', function(res) {
    if (res.identifier != identifier) {
        addUploadedFile(res.file)
    }
})

socket.on('roomError', function(errorCode) {
    // var msg
    //
    // if (errorCode == 4041) {
    //     //msg = 'Foi mal! Não estou encontrando esta sala. Por questões de segurança não é possível personalizar o nome de uma sala. Clique <a href="#" class="gotoNewRoom">aqui</a> para entrar em uma nova sala.'
    //     msg = 'Sorry! I cannot find this room and for security reasons it\'s not possible to personalize the name of the rooms. Click <a href="#" class="gotoNewRoom">here</a> to go to a new random room.';
    // } else if (errorCode == 4042) {
    //     //msg = 'Foi mal! Não encontrei esta sala.'
    //     msg = 'Sorry! I cannot find this room. :('
    // }

    $('#error-page').css("display", "flex");
})

$('body').on('click', '.goToNewRoom', function () {
    window.location.href = "/";
});

$('form').submit(function(){
    var newRoom = $('#m').val()
    if (currentRoom == newRoom) {
        return false
    }
    tryRoom(newRoom, 'form')
    $('#m').val('')
    return false
});

/**
 *  Dropzone
 **/

var dragCounter = 0;

function generateFilePreview(file) {
    var filePreview = "";
    var uploadingClass = (file.status === "uploading" ? "uploading" : "");

    filePreview += "<div class=\"file "+ uploadingClass + "\" id=\"" + file.elementId + "\">";
        filePreview += "<div class=\"avatar\">";
            if (file.thumbnail) {
                filePreview += "<div class=\"avatar-img\" style=\"background-image: url(" + file.thumbnail.data + ");\"></div>";
            } else {
                filePreview += "<div class=\"avatar-icon\"><span class=\"icon-file-o\"></span></div>";
            }
        filePreview += "</div>";
        filePreview += "<div class=\"info\">";
            filePreview += "<a href=\"" + file.location + "\" target=\"_blank\" class=\"file-link\">" + file.name + "</a>";
            filePreview += "<span>" + sizeOf(file.size) + "</span>";
        filePreview += "</div>";
        filePreview += "<div class=\"upload-status\">Sending... <span class=\"progress\">56%</span></div>";
    filePreview += "</div>";

    return filePreview;
};

function enableDraggingScreen() {
    $('#draggingFile').css('display', 'block');
    $('body').css('overflow', 'hidden');
};

function disableDraggingScreen() {
    $('#draggingFile').css('display', 'none');
    $('body').css('overflow', 'auto');
};

var myDropzone = new Dropzone(document.body, {
    method: 'post',
    url: API_ENDPOINT + "files",
    maxFilesize: 5000,
    clickable: '.send-file',
    addedfile: function(file) {
        file.elementId = "file-" + token();

        var cFileObj = {
            elementId: file.elementId,
            name: file.name,
            mimetype: file.mimetype,
            size: file.size,
            location: "#",
            thumbnail: false,
            status: "uploading"
        };

        addFile(cFileObj);
    },
    thumbnail: function(file, dataUrl) {
        $("#" + file.elementId + " .avatar").html("<div class=\"avatar-img\" style=\"background-image: url(" + dataUrl + ");\"></div>");
    },
    sending: function(file, xhr, formData) {
        formData.append('roomName', currentRoom)
        formData.append('identifier', identifier)
    },
    uploadprogress: function(file, progress, bytesSent) {
        if (progress === 100) {
            $("#" + file.elementId).find('.upload-status').html("Processing...");
        } else {
            $("#" + file.elementId).find('.progress').html(progress.toFixed(1) + "%");
        }
    },
    success: function(file, res) {
        console.log("aha", file, res);
        $("#" + file.elementId).removeClass("uploading");
        $("#" + file.elementId).find('.file-link').attr("href", res.file.location);
        //$(file.previewElement).attr('id', 'file-' + res.file._id)
        //adjustPreviewAfterSave(file.previewElement, res.file)
    },
    dragenter: function(event) {
        event.preventDefault(); // needed for IE
        dragCounter++;
        enableDraggingScreen();
    },
    dragleave: function(event) {
        dragCounter--;
        if (dragCounter === 0) {
            disableDraggingScreen();
        }

    },
    dragend: function(event) {
        disableDraggingScreen();
    },
    drop: function(event) {
        disableDraggingScreen();
    }
});
