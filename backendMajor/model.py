# Import dependencies
import pandas as pd
import numpy as np
from scipy.sparse import csr_matrix
import pandas as pd
from sklearn.neighbors import NearestNeighbors
import seaborn as sns
mentors = pd.read_csv("mentors.csv")
ratings = pd.read_csv("ratings.csv")
final_dataset = ratings.pivot(index='mentorId',columns='userId',values='rating')
final_dataset.fillna(0,inplace=True)
no_user_voted = ratings.groupby('mentorId')['rating'].agg('count')
no_mentors_voted = ratings.groupby('userId')['rating'].agg('count')
final_dataset = final_dataset.loc[no_user_voted[no_user_voted > 10].index,:]
final_dataset=final_dataset.loc[:,no_mentors_voted[no_mentors_voted > 50].index]
sample = np.array([[0,0,3,0,0],[4,0,0,0,2],[0,0,0,0,1]])
sparsity = 1.0 - ( np.count_nonzero(sample) / float(sample.size) )
csr_sample = csr_matrix(sample)
csr_data = csr_matrix(final_dataset.values)
final_dataset.reset_index(inplace=True)
knn = NearestNeighbors(metric='cosine', algorithm='brute', n_neighbors=20, n_jobs=-1)
knn.fit(csr_data)


#Save your model
#from joblib
import joblib
joblib.dump(knn,'model.pkl')
print("Model dumped!")

# Load the model that you just saved
knn = joblib.load('model.pkl')