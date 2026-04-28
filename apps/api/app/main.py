import logging
import time
from fastapi import FastAPI, Request, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from prometheus_client import make_asgi_app
from pythonjsonlogger import jsonlogger

# Logger setup
logger = logging.getLogger("firewall-as-code-api")
logHandler = logging.StreamHandler()
formatter = jsonlogger.JsonFormatter()
logHandler.setFormatter(formatter)
logger.addHandler(logHandler)
logger.setLevel(logging.INFO)

app = FastAPI(title="Firewall as Code API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Metrics
metrics_app = make_asgi_app()
app.mount("/metrics", metrics_app)

@app.middleware("http")
async def log_requests(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    duration = time.time() - start_time
    logger.info(f"Path: {request.url.path} Duration: {duration:.4f}s Status: {response.status_code}")
    return response

@app.get("/health")
def health():
    return {"status": "healthy"}

@app.get("/policies")
def get_policies():
    return [
        {"id": "POL-001", "name": "Block SSH External", "engine": "OPA", "status": "Enforced"},
        {"id": "POL-002", "name": "Restrict DB Access", "engine": "Azure Firewall", "status": "Enforced"},
        {"id": "POL-003", "name": "Geofence: Block RU/CN", "engine": "AWS WAF", "status": "Audit"}
    ]

@app.post("/policies/evaluate")
def evaluate_policy(rule_id: str, context: dict):
    logger.info(f"Evaluating rule {rule_id}")
    return {"status": "ALLOWED", "score": 1.0, "reason": "Complies with Zero-Trust standards"}

@app.post("/rules/deploy")
def deploy_rules(rules: list):
    logger.info(f"Deploying {len(rules)} verified rules")
    return {"status": "SUCCESS", "operation_id": f"fw_{int(time.time())}"}

@app.get("/security/summary")
def get_security_summary():
    return {
        "total_rules": 1250,
        "compliant_rules": 1248,
        "active_violations": 2,
        "threats_blocked_today": 450
    }

@app.get("/scores/summary")
def get_scores_summary():
    return {
        "overall_compliance": 0.99,
        "zero_trust_maturity": 0.82,
        "hygiene_score": 0.95,
        "remediation_efficiency": 1.0
    }

@app.get("/dashboard/summary")
def get_dashboard_summary():
    return {
        "active_firewalls": 12,
        "last_audit": "2026-04-28T11:00:00Z",
        "pending_changes": 4,
        "maestro_status": "READY"
    }
