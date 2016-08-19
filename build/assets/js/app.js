var API_ENDPOINT = "http://api.devmemuy.com:5010";

$('#mainLoad').fadeIn(1000);

var rand = function() {
    return Math.random().toString(36).substr(2);
};

var token = function() {
    return rand() + rand();
};

var socket = io(API_ENDPOINT),
    currentRoom = null,
    roomOnPath,
    identifier = token(),
    qrcodeObj = null;

socket.on('connect_error', function() {
    console.log('Failed to connect to server');
});

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
        })
    } else {
        qrcodeObj.makeCode(room)
    }
}

tryRoom = function(room, type) {
    socket.emit('tryRoom', room, {type: type})
}

adjustPreviewAfterSave = function(element, fileObj) {
    var fileElement = $(element),
        link = fileObj.location

    //console.log(fileElement.innerHTML, fileObj);
    fileElement.find('.file-link').attr('href', link)
}

addFile = function(fileObj) {
    //console.log(fileObj);
    var mockFile = {name: fileObj.originalName, size: fileObj.size}
    myDropzone.emit("addedfile", mockFile);
    myDropzone.emit("complete", mockFile);

    adjustPreviewAfterSave(mockFile.previewElement, fileObj)
}

roomOnPath = window.location.pathname.replace('/', '');
roomTimeLeft = 1000;

if (roomOnPath == '') {
    socket.emit('newRoom')
} else {
    tryRoom(roomOnPath, 'url')
}

socket.on('roomData', function(roomObj) {
    console.log(roomObj);
    var roomName = roomObj.room;
    currentRoom = roomName;
    roomTimeLeft = roomObj.timeLeft;
    $('#roomName').val(roomName);
    $('#spaceStats').html(roomObj.usedSpace / 1000 + "/" + roomObj.maxSpace / 1000 + "mb");
    generateQRCode(roomName);

    window.history.pushState({}, 'Memuy', '/' + roomName);

    setInterval(function() {
        var time = secondsToTime(roomTimeLeft);
        var result = (time.hours < 10 ? "0" + time.hours : time.hours) + "h " + (time.minutes < 10 ? "0" + time.minutes : time.minutes) + "m " + (time.seconds  < 10 ? "0" + time.seconds : time.seconds) + "s";
        // console.log(result);
        $('#timeLeft').html(result);
        roomTimeLeft--;
    }, 1000);

    setTimeout(function() {
        $('#mainLoad').fadeOut(750, function() {
            if (roomObj.files.length === 0) {
                $("#cloud").fadeIn(1000);
            }

            roomObj.files.forEach(function(file) {
                addFile(file)
            });
        });
    }, 750);

});

socket.on('newFile', function(res) {
    console.log('teste2');
    if (res.identifier != identifier) {
        console.log('teste3');
        addFile(res.file)
    }
})

socket.on('roomError', function(errorCode) {
    var msg

    if (errorCode == 4041) {
        //msg = 'Foi mal! Não estou encontrando esta sala. Por questões de segurança não é possível personalizar o nome de uma sala. Clique <a href="#" class="gotoNewRoom">aqui</a> para entrar em uma nova sala.'
        msg = 'Sorry! I cannot find this room and for security reasons it\'s not possible to personalize the name of the rooms. Click <a href="#" class="gotoNewRoom">here</a> to go to a new random room.';
    } else if (errorCode == 4042) {
        //msg = 'Foi mal! Não encontrei esta sala.'
        msg = 'Sorry! I cannot find this room. :('
    }

    $('#msg').html(msg).show()
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

function enableDraggingScreen() {
    $('#draggingFile').css('display', 'block');
    $('body').css('overflow', 'hidden');
}

function disableDraggingScreen() {
    $('#draggingFile').css('display', 'none');
    $('body').css('overflow', 'auto');
}


var counter = 0;

var myDropzone = new Dropzone(document.body, {
    method: 'post',
    url: API_ENDPOINT + "/files",
    maxFilesize: 5000,
    previewsContainer: ".dropzone-previews",
    previewTemplate: document.querySelector('#template-container').innerHTML,
    clickable: '.send-file',
    sending: function(file, xhr, formData) {
        console.log('teste20');
        formData.append('roomName', currentRoom)
        formData.append('identifier', identifier)
    },
    success: function(file, res) {
        console.log('teste1');
        $(file.previewElement).attr('id', 'file-' + res.file._id)
        adjustPreviewAfterSave(file.previewElement, res.file)
    },
    uploadprogress: function(file, progress, bytesSent) {
        console.log('teste25', progress);
        $(file.previewElement).find('.file-progress').html(progress)
    },
    dragenter: function(event) {
        event.preventDefault(); // needed for IE
        counter++;
        enableDraggingScreen();
    },
    dragleave: function(event) {
        console.log(2, counter);
        counter--;
        if (counter === 0) {
            disableDraggingScreen();
        }

    },
    dragend: function(event) {
        console.log(3);
        disableDraggingScreen();
    },
    drop: function(event) {
        console.log(3);
        disableDraggingScreen();
    }
});
