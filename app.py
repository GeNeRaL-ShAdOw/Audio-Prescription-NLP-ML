from flask import Flask, render_template

app = Flask(__name__)

@app.route('/UI', methods=['GET','POST'])
def UI():
    return render_template("ui.html")

if __name__ == '__main__':
    app.run(debug=True)