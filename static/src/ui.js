navigator.mediaDevices.getUserMedia({
        audio: true
    })
    .then(stream => {
        handlerFunction(stream)
    })

function handlerFunction(stream) {
    rec = new MediaRecorder(stream);
    rec.ondataavailable = e => {
        audioChunks.push(e.data);
        if (rec.state == "inactive") {
            let blob = new Blob(audioChunks, {
                type: 'audio/mp3'
            });
            recordedAudio.src = URL.createObjectURL(blob);
            alert("This is audio:", (blob));
            recordedAudio.controls = true;
            recordedAudio.autoplay = true;
            sendData(blob)
            sendAudio(blob)
        }
    }
}

function sendData(data) {}
record.onclick = e => {
    record.disabled = true;
    // record.style.backgroundColor = "blue"
    stopRecord.disabled = false;
    audioChunks = [];
    rec.start();
}
stopRecord.onclick = e => {
    record.disabled = false;
    stop.disabled = true;
    // record.style.backgroundColor = "red"
    rec.stop();
}

// function uploadAudio(blob) {
//     let data = new FormData();
//     data.append('file', audioBlob);
//     return axios
//         .post("http://127.0.0.1:5000/audioRecog", data, {
//             headers: {
//                 'Content-Type': 'multipart/form-data',
//             },
//         })
//         .then(res => {
//             console.log(res)
//             return res
//         });
// }

function sendAudio(blob){
    var wavFile = new File([ blob ], "audio.wav");   
    var form    = new FormData();
    form.append("myAudio", wavFile);

    $.ajax(
        {
            url: "http://127.0.0.1:5000/audioRecog",
            type: "POST",
            data: form,
            contentType: false,
            processData: false,
            success: function(getData)
            {
                console.log(getData);
            }
        });
}