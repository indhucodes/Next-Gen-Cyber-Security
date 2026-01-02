import re
import math

class LocalBrain:
    def __init__(self):
        self.suspicious = [
            'login', 'signin', 'verify', 'update', 'account', 'secure', 'banking', 
            'confirm', 'service', 'auth', 'wallet', 'alert', 'notification', 'support'
        ]
        
    def analyze(self, url):
        score = 0
        reasons = []
        url = url.lower()
        
        # 1. Keywords
        found = [w for w in self.suspicious if w in url]
        if found:
            score += 30 * len(found)
            reasons.append(f"Suspicious terminology: {', '.join(found[:3])}")
            
        # 2. IP Address
        if re.search(r'\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}', url):
            score += 50
            reasons.append("Direct IP usage")
            
        # 3. Length
        if len(url) > 75:
            score += 20
            reasons.append("Abnormal URL length")
            
        # 4. Obfuscation
        if '@' in url:
            score += 40
            reasons.append("Credential harvesting pattern (@)")
        if url.count('.') > 4:
            score += 15
            reasons.append("Excessive subdomain layering")
            
        final_score = min(score, 100)
        
        if final_score > 60: verdict = "Malicious"
        elif final_score > 30: verdict = "Suspicious"
        else: verdict = "Safe"
        
        return {
            "score": final_score,
            "verdict": verdict,
            "engine": "Shield.AI Cortex (Offline)",
            "reasons": reasons
        }
