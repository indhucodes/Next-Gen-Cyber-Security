# features.py
import re

def extract_features(url):
    """
    Extracts the 6 numeric features required by the Random Forest model.
    Must match the order in train_model.py:
    [url_length, dots, has_at, slashes, is_ip, is_shortened]
    """
    
    # 1. URL Length
    url_length = len(url)
    
    # 2. Count Dots
    dots = url.count('.')
    
    # 3. Check for '@' symbol (Common in phishing to hide destination)
    has_at = 1 if '@' in url else 0
    
    # 4. Count Slashes (Deep file paths often indicate phishing)
    slashes = url.count('/')
    
    # 5. Check if IP Address is used instead of domain
    # Regex checks for pattern like 192.168.1.1
    ip_pattern = r'(([01]?\d\d?|2[0-4]\d|25[0-5])\.([01]?\d\d?|2[0-4]\d|25[0-5])\.([01]?\d\d?|2[0-4]\d|25[0-5])\.([01]?\d\d?|2[0-4]\d|25[0-5]))'
    is_ip = 1 if re.search(ip_pattern, url) else 0
    
    # 6. Check for URL Shorteners (bit.ly, tinyurl, etc)
    shorteners = ['bit.ly', 'tinyurl', 'goo.gl', 'ow.ly', 't.co', 'is.gd']
    is_shortened = 0
    for s in shorteners:
        if s in url:
            is_shortened = 1
            break

    return [url_length, dots, has_at, slashes, is_ip, is_shortened]