import sys

from flask import Flask, request, jsonify
# from sklearn.externals
import joblib
import pandas as pd
import numpy as np
import traceback
from scipy.sparse import csr_matrix
from flask_cors import CORS

md = pd.read_csv('mentor_dataset.csv')
ratings = md[md['rating'].notnull()]['rating'].astype('int')
experiences = md[md['experience'].notnull()]['experience'].astype('int')

def weighted_rating(x):
    C = experiences.mean()
    # print(md,ratings,experiences,C)
    m = ratings.mean()
    # print(x)
    v = x['rating']
    R = x['experience']
    return (v/(v+m) * R) + (m/(m+v) * C)

app = Flask(__name__)
CORS(app)

@app.route('/search', methods=['POST'])
def search():
    try:
        json_ = request.json
        print(json_[0])
        query = pd.DataFrame(json_)
        print(query)
        name = []
        for i in query["name"]:
            name += [i]
        name = name[0]
        print(name)
        mentors = pd.read_csv("mentor_dataset.csv")
        for i in range(mentors.shape[0]):
            if (mentors.mentorName[i]).lower() == name.lower():
                id = mentors.mentorId[i]
                name = mentors.mentorName[i]
                fields = mentors.field[i]
                field = fields.replace('|', ', ')
                rating = mentors.rating[i]
                experience = mentors.experience[i]
                contact = mentors.contact[i]
                break
        print(id, name, field,rating,experience,contact)
        print(type(id))
        result = {'id': int(id), 'name': name, 'field': field,'rating':int(rating),'experience':int(experience),'contact':contact}
        # result['id'] = int(id)
        # result['name'] = name
        # result['field'] = field
        return jsonify([result])
    except:
        return jsonify({'trace': traceback.format_exc()})

@app.route('/predict', methods=['POST'])
def predict():  # put application's code here
    # if True:
    try:
        md = pd.read_csv('mentor_dataset.csv')
        ratings = md[md['rating'].notnull()]['rating'].astype('int')
        experiences = md[md['experience'].notnull()]['experience'].astype('int')
        C = experiences.mean()
        # print(md,ratings,experiences,C)
        m = ratings.mean()

        qualified = md[(md['rating'] >= m) & (md['rating'].notnull()) & (md['experience'].notnull())][
            ['mentorId','mentorName', 'rating', 'experience', 'contact', 'field']]
        qualified['rating'] = qualified['rating'].astype('int')
        qualified['experience'] = qualified['experience'].astype('int')

        qualified['wr'] = qualified.apply(weighted_rating, axis=1)

        qualified = qualified.sort_values('wr', ascending=False).head(250)

        # print(qualified.head(15))
        s = md.apply(lambda x: pd.Series(x['field']), axis=1).stack().reset_index(level=1, drop=True)
        s.name = 'field'
        gen_md = md.drop('field', axis=1).join(s)


        json_ = request.json
        print(json_[0])
        query = pd.DataFrame(json_)
        print(query)
        int_features = []
        for i in query["Profession"]:
            int_features += [i]
        # int_features = [x for x in request.form.values()]
        field = int_features[0]
        print(int_features)
        print(field)

        df = gen_md[gen_md['field'] == field]
        ratings = df[df['rating'].notnull()]['rating'].astype('int')
        experiences = df[df['experience'].notnull()]['experience'].astype('int')
        C = experiences.mean()
        m = ratings.mean()

        qualified = df[(df['rating'] >= m) & (df['rating'].notnull()) & (df['experience'].notnull())][
            ['mentorId','mentorName', 'rating', 'experience', 'contact','field']]
        qualified['rating'] = qualified['rating'].astype('int')
        qualified['experience'] = qualified['experience'].astype('int')

        qualified['wr'] = qualified.apply(
            lambda x: (x['rating'] / (x['rating'] + m) * x['experience']) + (m / (m + x['rating']) * C), axis=1)
        qualified = qualified.sort_values('wr', ascending=False).head(250)
        print(qualified)
        # return {}
        result = []
        for i in range(0, len(qualified)):
            temp = {'id':0,'name': '', 'rating': 0,'experience':0,'contact':'','field':'','wr':''}
            # temp['id'] = i
            temp['id'] = int(qualified['mentorId'].iloc[i])
            temp['name'] = qualified['mentorName'].iloc[i]
            temp['rating'] = int(qualified['rating'].iloc[i])
            temp['experience'] = int(qualified['experience'].iloc[i])
            temp['contact'] = qualified['contact'].iloc[i]
            temp['field'] = str(qualified['field'].iloc[i])
            temp['wr'] = str(qualified['wr'].iloc[i])
            result.append(temp)
        print(result)
        return jsonify(result)
    except:
        return jsonify({'trace': traceback.format_exc()})
# else:
    #     print('Train the model first')
    #     return ('No model here to use')

@app.route('/predicter', methods=['POST'])
def predicter():  # put application's code here
    if knn:
        try:
            mentors = pd.read_csv("mentors.csv")
            ratings = pd.read_csv("ratings.csv")
            final_dataset = ratings.pivot(index='mentorId', columns='userId', values='rating')
            final_dataset.fillna(0, inplace=True)
            no_user_voted = ratings.groupby('mentorId')['rating'].agg('count')
            no_mentors_voted = ratings.groupby('userId')['rating'].agg('count')
            final_dataset = final_dataset.loc[no_user_voted[no_user_voted > 10].index, :]
            final_dataset = final_dataset.loc[:, no_mentors_voted[no_mentors_voted > 50].index]
            sample = np.array([[0, 0, 3, 0, 0], [4, 0, 0, 0, 2], [0, 0, 0, 0, 1]])
            sparsity = 1.0 - (np.count_nonzero(sample) / float(sample.size))
            csr_sample = csr_matrix(sample)
            csr_data = csr_matrix(final_dataset.values)
            final_dataset.reset_index(inplace=True)
            json_ = request.json
            print(json_[0])
            query = pd.DataFrame(json_)
            print(query)
            int_features = []
            for i in query["Profession"]:
                int_features += [i]
            # int_features = [x for x in request.form.values()]
            interest = int_features[0]
            print(int_features)
            print(interest)
            n_mentors_to_reccomend = 10
            mentor_list = mentors[mentors['field'].str.contains(interest)]
            if len(mentor_list):
                mentor_idx = mentor_list.iloc[0]['mentorId']
                mentor_idx = final_dataset[final_dataset['mentorId'] == mentor_idx].index[0]
                distances, indices = knn.kneighbors(csr_data[mentor_idx], n_neighbors=n_mentors_to_reccomend + 1)
                rec_mentor_indices = sorted(list(zip(indices.squeeze().tolist(), distances.squeeze().tolist())),
                                            key=lambda x: x[1])[:0:-1]
                recommend_frame = []
                for val in rec_mentor_indices:
                    mentor_idx = final_dataset.iloc[val[0]]['mentorId']
                    idx = mentors[mentors['mentorId'] == mentor_idx].index
                    recommend_frame.append({'Mentor': mentors.iloc[idx]['mentorName'].values[0]})
                df = pd.DataFrame(recommend_frame, index=range(1, n_mentors_to_reccomend + 1))
                print(df)
                result = []
                print(type(df['Mentor']))
                for i in range(1, len(df) + 1):
                    temp = {'id': 0, 'name': ''}
                    temp['id'] = i
                    temp['name'] = df['Mentor'][i]
                    result.append(temp)
                print(result)
            return jsonify(result)
        except:
            return jsonify({'trace': traceback.format_exc()})
    else:
        print('Train the model first')
        return ('No model here to use')

if __name__ == '__main__':
    try:
        port = int(sys.argv[1])  # This is for a command-line input
    except:
        port = 12346  # If you don't provide any port the port will be set to 12345

    knn = joblib.load("model.pkl")  # Load "model.pkl"
    print('Model loaded')

    # app.run(port=port, debug=True,host= '192.168.1.39')
    app.run(port=port, debug=True)

