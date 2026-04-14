from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import numpy as np
from datetime import datetime
import math

app = FastAPI(
    title="YesYouCan AI Insights Engine",
    description="ML predictions, ESG scoring, anomaly detection",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ─── Models ──────────────────────────────────────────────────────────────────

class EmissionDataPoint(BaseModel):
    month: int
    scope1: float
    scope2: float
    scope3: float

class EmissionPredictionRequest(BaseModel):
    historical: List[EmissionDataPoint]
    months_ahead: int = 3

class RiskScoringRequest(BaseModel):
    likelihood: int
    impact: int
    category: str
    age_days: int = 0
    has_treatment: bool = False

class SupplierScoringRequest(BaseModel):
    environmental_score: float
    social_score: float
    governance_score: float
    cyber_hygiene_score: float
    tier: str  # critical / major / minor
    certifications: List[str] = []

class AnomalyRequest(BaseModel):
    values: List[float]
    threshold_sigma: float = 2.0


# ─── Health ───────────────────────────────────────────────────────────────────

@app.get("/health")
def health():
    return {"status": "ok", "service": "YesYouCan AI Engine", "timestamp": datetime.utcnow().isoformat()}


# ─── Emissions Prediction (Linear Regression) ────────────────────────────────

@app.post("/predict/emissions")
def predict_emissions(req: EmissionPredictionRequest):
    """Simple linear regression on historical emissions to forecast future months."""
    if len(req.historical) < 3:
        raise HTTPException(400, "Need at least 3 data points")

    months = np.array([d.month for d in req.historical], dtype=float)
    s1 = np.array([d.scope1 for d in req.historical])
    s2 = np.array([d.scope2 for d in req.historical])
    s3 = np.array([d.scope3 for d in req.historical])

    def linear_fit(x, y):
        n = len(x)
        m = (n * np.sum(x * y) - np.sum(x) * np.sum(y)) / (n * np.sum(x**2) - np.sum(x)**2)
        b = (np.sum(y) - m * np.sum(x)) / n
        return m, b

    m1, b1 = linear_fit(months, s1)
    m2, b2 = linear_fit(months, s2)
    m3, b3 = linear_fit(months, s3)

    last_month = int(max(months))
    predictions = []
    for i in range(1, req.months_ahead + 1):
        pm = last_month + i
        predictions.append({
            "month": pm,
            "scope1": max(0, round(m1 * pm + b1, 2)),
            "scope2": max(0, round(m2 * pm + b2, 2)),
            "scope3": max(0, round(m3 * pm + b3, 2)),
            "total": max(0, round((m1 + m2 + m3) * pm + (b1 + b2 + b3), 2)),
            "confidence": 0.75 - (i * 0.05),
        })

    trend = "decreasing" if (m1 + m2 + m3) < -0.01 else "increasing" if (m1 + m2 + m3) > 0.01 else "stable"
    return {"predictions": predictions, "trend": trend, "model": "linear_regression"}


# ─── Risk Scoring (Weighted) ─────────────────────────────────────────────────

@app.post("/score/risk")
def score_risk(req: RiskScoringRequest):
    """Enhanced risk scoring with category weights and age factor."""
    base_score = req.likelihood * req.impact

    category_weights = {
        "cybersecurity": 1.3, "compliance": 1.2, "financial": 1.15,
        "third_party": 1.1, "operational": 1.0, "strategic": 0.95,
        "environmental": 0.9, "reputational": 0.85,
    }
    weight = category_weights.get(req.category, 1.0)

    # Age factor: older unresolved risks increase score
    age_factor = 1 + min(0.3, req.age_days / 365 * 0.3)

    # Treatment discount
    treatment_discount = 0.85 if req.has_treatment else 1.0

    adjusted_score = base_score * weight * age_factor * treatment_discount
    priority = "critical" if adjusted_score >= 20 else "high" if adjusted_score >= 12 else "medium" if adjusted_score >= 6 else "low"

    recommendations = []
    if not req.has_treatment and base_score >= 9:
        recommendations.append("Assign a treatment plan immediately")
    if req.age_days > 90 and base_score >= 6:
        recommendations.append("Risk unresolved for 90+ days — escalate to management")
    if req.category == "cybersecurity" and req.impact >= 4:
        recommendations.append("Consider cyber insurance review")

    return {
        "base_score": base_score,
        "adjusted_score": round(adjusted_score, 2),
        "priority": priority,
        "recommendations": recommendations,
    }


# ─── Supplier ESG Scoring ────────────────────────────────────────────────────

@app.post("/score/supplier")
def score_supplier(req: SupplierScoringRequest):
    """Composite supplier ESG + risk scoring."""
    tier_weights = {"critical": 1.5, "major": 1.2, "minor": 1.0}
    tw = tier_weights.get(req.tier, 1.0)

    esg = (req.environmental_score * 0.35 + req.social_score * 0.30 + req.governance_score * 0.20 + req.cyber_hygiene_score * 0.15)
    cert_bonus = min(10, len(req.certifications) * 3)
    final_esg = min(100, esg + cert_bonus)
    risk_score = max(0, 100 - final_esg * tw)

    rating = "green" if final_esg >= 75 else "amber" if final_esg >= 50 else "red"
    recommendations = []
    if req.environmental_score < 60: recommendations.append("Request environmental certification (ISO 14001)")
    if req.cyber_hygiene_score < 60: recommendations.append("Conduct cybersecurity assessment")
    if req.social_score < 50: recommendations.append("Review labor practices and social policies")
    if not req.certifications: recommendations.append("Encourage ISO 27001 or equivalent certification")

    return {
        "esg_score": round(final_esg, 1),
        "risk_score": round(risk_score, 1),
        "rating": rating,
        "breakdown": {
            "environmental": req.environmental_score,
            "social": req.social_score,
            "governance": req.governance_score,
            "cyber": req.cyber_hygiene_score,
        },
        "recommendations": recommendations,
    }


# ─── Anomaly Detection ───────────────────────────────────────────────────────

@app.post("/detect/anomalies")
def detect_anomalies(req: AnomalyRequest):
    """Z-score based anomaly detection on time series data."""
    if len(req.values) < 3:
        raise HTTPException(400, "Need at least 3 values")

    arr = np.array(req.values)
    mean = float(np.mean(arr))
    std = float(np.std(arr))

    if std == 0:
        return {"anomalies": [], "mean": mean, "std": 0, "method": "z-score"}

    anomalies = []
    for i, v in enumerate(req.values):
        z = abs((v - mean) / std)
        if z >= req.threshold_sigma:
            anomalies.append({
                "index": i,
                "value": v,
                "z_score": round(z, 2),
                "deviation": round(v - mean, 2),
                "direction": "above" if v > mean else "below",
            })

    return {"anomalies": anomalies, "mean": round(mean, 2), "std": round(std, 2), "method": "z-score", "threshold_sigma": req.threshold_sigma}


# ─── Compliance Prediction ────────────────────────────────────────────────────

@app.post("/predict/compliance")
def predict_compliance(data: dict):
    """Predict compliance score improvement based on planned actions."""
    current_score = data.get("current_score", 70)
    planned_actions = data.get("planned_actions", [])
    action_weights = {"training": 5, "policy_update": 8, "tool_implementation": 12, "audit": 6, "remediation": 10}
    total_improvement = sum(action_weights.get(a, 5) for a in planned_actions)
    predicted = min(100, current_score + total_improvement * 0.7)
    months_to_target = math.ceil((data.get("target_score", 90) - predicted) / 3) if predicted < data.get("target_score", 90) else 0
    return {
        "current_score": current_score,
        "predicted_score": round(predicted, 1),
        "improvement": round(predicted - current_score, 1),
        "months_to_target": months_to_target,
        "confidence": 0.72,
    }
