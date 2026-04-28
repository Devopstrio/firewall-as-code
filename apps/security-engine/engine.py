import logging
import uuid
import time
import pandas as pd
import numpy as np

class FWACSecurityEngine:
    def __init__(self):
        self.logger = logging.getLogger("fwac-security-engine")

    def validate_rule_safety(self, source: str, destination: str, port: int, action: str):
        """
        Validates if a firewall rule adheres to institutional safety standards.
        """
        # Logic: Block "Any" source/destination for risky ports
        risky_ports = [22, 3389, 445, 139]
        
        is_risky = (source == "*" or source == "0.0.0.0/0") and port in risky_ports
        
        return {
            "is_safe": not is_risky,
            "risk_level": "CRITICAL" if is_risky else "LOW",
            "recommendation": "Restrict source to specific CIDR block" if is_risky else "None"
        }

    def detect_rule_shadowing(self, existing_rules: list, new_rule: dict):
        """
        Detects if a new rule is shadowed by an existing higher-priority rule.
        """
        # Simplified logic for demonstration
        for rule in existing_rules:
            if rule['priority'] < new_rule['priority'] and rule['action'] == new_rule['action']:
                if rule['source'] == "*" and rule['port'] == "*":
                    return True
        return False

    def calculate_hygiene_score(self, total_rules: int, orphaned_rules: int, shadowed_rules: int):
        """
        Calculates the institutional firewall hygiene score (0-100).
        """
        if total_rules == 0:
            return 100.0
            
        deductions = (orphaned_rules * 5) + (shadowed_rules * 2)
        score = max(0, 100 - (deductions / total_rules * 10))
        return round(score, 1)

if __name__ == "__main__":
    engine = FWACSecurityEngine()
    
    # 1. Rule Safety
    print("Safety Check (SSH Open):", engine.validate_rule_safety("*", "10.0.0.5", 22, "Allow"))
    print("Safety Check (Internal):", engine.validate_rule_safety("10.0.0.0/8", "10.0.0.5", 22, "Allow"))
    
    # 2. Shadowing
    existing = [{"priority": 100, "source": "*", "port": "*", "action": "Allow"}]
    new = {"priority": 200, "source": "10.0.0.1", "port": "80", "action": "Allow"}
    print("Is Shadowed:", engine.detect_rule_shadowing(existing, new))
    
    # 3. Hygiene Score
    print("Hygiene Score:", engine.calculate_hygiene_score(1000, 10, 25))
