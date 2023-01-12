from flask import Flask, render_template, request


app = Flask(__name__)

@app.route('/UI', methods=['GET','POST'])
def UI():
    return render_template("ui.html")

@app.route('/audioRecog', methods=['GET','POST'])
def audioRecog():
    print("audioRecog")
    audioFile=request.files.get("myAudio")
    path='./videos/sample.wav'
    audioFile.save(path)
    print(type(audioFile))
    return "I"


if __name__ == '__main__':
    app.run(debug=True)