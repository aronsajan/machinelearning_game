from flask import Flask
import pickle
from sklearn.neighbors import KNeighborsClassifier
import numpy as np

app = Flask(__name__)

model = pickle.load(open('./trained_model.pkl','rb'))

@app.route('/get_action/<obj_distance>')
def getAction(obj_distance):
    return str(model.predict([[obj_distance]]))
    



