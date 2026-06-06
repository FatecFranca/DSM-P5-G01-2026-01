import numpy as np
import pandas as pd
from sklearn import model_selection
from sklearn.svm import SVC
from flask import Flask, request, jsonify

# Carrega base
df = pd.read_csv("water_potability_500.csv", sep=",")
df = df.fillna(df.mean())

# Prepara dados
X = df[["ph", "Chloramines", "Turbidity"]].values
Y = df["Potability"].values

X_train, X_validation, Y_train, Y_validation = model_selection.train_test_split(
    X, Y, test_size=0.20, random_state=7
)

# Treina modelo
model = SVC(kernel="rbf", probability=True)
model.fit(X_train, Y_train)

# Cria API
app = Flask(__name__)

@app.route("/classificar", methods=["POST"])
def classificar():
    data = request.json
    ph = float(data.get("ph", 0))
    cloramina = float(data.get("cloramina", 0))
    turbidez = float(data.get("turbidez", 0))

    X_new = np.array([[ph, cloramina, turbidez]])
    pred = model.predict(X_new)[0]

    resultado = "Potável" if pred == 1 else "Imprópria"
    return jsonify({"resultado": resultado})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)