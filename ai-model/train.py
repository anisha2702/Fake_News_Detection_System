import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
import pickle
import os

def train_and_save_model(real_news_path, fake_news_path, model_dir):
    """
    Trains a fake news detection model and saves it with the TF-IDF vectorizer.
    """
    # Load datasets
    real_news = pd.read_csv(real_news_path)
    fake_news = pd.read_csv(fake_news_path)

    # Add labels
    real_news['label'] = 0  # 0 for real news
    fake_news['label'] = 1  # 1 for fake news

    # Combine datasets
    df = pd.concat([real_news, fake_news], ignore_index=True)

    # Data Preprocessing
    df['text'] = df['text'].str.lower()
    df['text'] = df['text'].str.replace(r'[^a-zA-Z\s]', '', regex=True)

    # Split features and labels
    X = df['text']
    y = df['label']

    # Train-test split
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Vectorization
    vectorizer = TfidfVectorizer(stop_words='english', max_features=5000)
    X_train_vectorized = vectorizer.fit_transform(X_train)
    X_test_vectorized = vectorizer.transform(X_test)

    # Train model
    model = LogisticRegression(max_iter=200)
    model.fit(X_train_vectorized, y_train)

    # Evaluate model
    accuracy = model.score(X_test_vectorized, y_test)
    print(f"✅ Model Accuracy on Test Set: {accuracy * 100:.2f}%")
    
    # Save model + vectorizer
    if not os.path.exists(model_dir):
        os.makedirs(model_dir)

    with open(os.path.join(model_dir, 'model.pkl'), 'wb') as f:
        pickle.dump(model, f)
    
    with open(os.path.join(model_dir, 'vectorizer.pkl'), 'wb') as f:
        pickle.dump(vectorizer, f)

    print("🎉 Model and Vectorizer saved successfully.")

if __name__ == '__main__':
    real_news_file = 'True.csv'
    fake_news_file = 'Fake.csv'
    model_save_dir = 'trained_models'
    
    train_and_save_model(real_news_file, fake_news_file, model_save_dir)
