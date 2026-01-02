import pandas as pd
from sklearn.ensemble import RandomForestClassifier
import pickle
import os
from features import extract_features 

# 1. Base Safe Data (Simulated Features)
# Features: [url_length, dots, has_at, slashes, is_ip, is_shortened]
safe_data = [
    [15, 1, 0, 2, 0, 0], [20, 1, 0, 2, 0, 0], [25, 2, 0, 3, 0, 0], 
    [18, 1, 0, 2, 0, 0], [22, 1, 0, 2, 0, 0], [30, 2, 0, 3, 0, 0]
]

# 2. Dynamic Phishing Data from File
phishing_urls = []
try:
    with open('datasets/phishing_training.txt', 'r') as f:
        phishing_urls = [line.strip() for line in f.readlines() if line.strip()]
    print(f"Loaded {len(phishing_urls)} phishing examples for training.")
except FileNotFoundError:
    print("Warning: Training dataset not found. Using default internal examples.")
    phishing_urls = ["http://paypal-secure.com", "http://login-apple-id.com"]

# 3. Extract Features for Real Data
phishing_features = []
print("Extracting features from datasets...")
for url in phishing_urls:
    feats = extract_features(url)
    phishing_features.append(feats)

# 4. Fallback Hardcoded Data (if extraction fails or list empty)
if not phishing_features:
    phishing_features = [
        [80, 4, 1, 6, 0, 1], [90, 5, 1, 7, 0, 0], [110, 6, 1, 8, 1, 0],
        [55, 3, 1, 5, 0, 1], [120, 5, 1, 9, 0, 0]
    ]

# 5. Combine Datasets
X = safe_data + phishing_features
y = [0] * len(safe_data) + [1] * len(phishing_features)
columns = ['url_length', 'dots', 'has_at', 'slashes', 'is_ip', 'is_shortened']
df = pd.DataFrame(X, columns=columns)

# 6. Train Model
print(f"Training Random Forest with {len(X)} total samples...")
model = RandomForestClassifier(n_estimators=100, class_weight={0: 1, 1: 20}, random_state=42)
model.fit(df, y)

# 7. Save Artifacts
with open('classifier.pkl', 'wb') as f:
    pickle.dump(model, f)

print("Model Retrained & Saved Successfully!")
print("NOTE: The new blacklist logic in app.py will essentially block these specific URLs even without the ML model.")