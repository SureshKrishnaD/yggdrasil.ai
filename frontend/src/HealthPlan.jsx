import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./HealthPlan.css";

export default function HealthPlan() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // Replace these with your backend shape
  const [risk, setRisk] = useState({
    score: null,    // numeric 0..1 or percent
    label: "",      // e.g. "Low", "Moderate", "High"
    details: "",    // long description
    factors: [],    // optional array of risk factors
  });

  const [plan, setPlan] = useState({
    title: "",
    items: [],      // array of {id, title, description}
  });

  useEffect(() => {
    // Example: replace with real API calls.
    // fetch("/api/risk").then(r=>r.json()).then(setRiskData)
    async function fetchData() {
      try {
        // simulate network
        await new Promise((r) => setTimeout(r, 700));

        // MOCK: replace with your fetched data
        setRisk({
          score: 0.89,
          label: "Low",
          details:
            "Overall low risk based on current assessment. Continue monitoring and maintain healthy habits.",
          factors: [
            "Good sleep quality",
            "Moderate physical activity",
            "Low reported stress"
          ]
        });

        setPlan({
          title: "Recommended Health Plan",
          items: [
            { id: 1, title: "Sleep", description: "Maintain 7-8 hours nightly." },
            { id: 2, title: "Activity", description: "Light exercise 30 min / day." },
            { id: 3, title: "Mindfulness", description: "Daily 10 min breathing practice." },
            { id: 4, title: "Diet", description: "Balanced meals, reduce caffeine." }
          ]
        });
      } catch (err) {
        console.error("Failed to fetch risk/plan", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="risk-page">
      <button className="back-pill" onClick={() => navigate(-1)}>
        <FaArrowLeft /> <span>Back</span>
      </button>

      <header className="risk-header">
        <h1 className="risk-title">Risk Analysis</h1>
        <p className="risk-sub">Personalized results & suggested plan</p>
      </header>

      <main className="risk-grid">
        {/* LEFT: Risk card */}
        <aside className="risk-card">
          {loading ? (
            <div className="loader">Loading risk…</div>
          ) : (
            <>
              <div className="risk-score">
                <div className="score-value">{(risk.score ?? 0).toFixed(2)}</div>
                <div className="score-label">{risk.label}</div>
              </div>

              <div className="risk-details">
                <h3>Summary</h3>
                <p>{risk.details}</p>

                {risk.factors && risk.factors.length > 0 && (
                  <>
                    <h4>Key factors</h4>
                    <ul className="factors-list">
                      {risk.factors.map((f, i) => (
                        <li key={i}>{f}</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </>
          )}
        </aside>

        {/* RIGHT: Plan card */}
        <section className="plan-card">
          {loading ? (
            <div className="loader">Loading plan…</div>
          ) : (
            <>
              <h3 className="plan-title">{plan.title}</h3>

              <div className="plan-items">
                {plan.items && plan.items.length ? (
                  plan.items.map((it) => (
                    <article key={it.id} className="plan-item">
                      <div className="plan-item-head">
                        <div className="plan-item-title">{it.title}</div>
                      </div>
                      <div className="plan-item-desc">{it.description}</div>
                    </article>
                  ))
                ) : (
                  <p className="no-plan">No plan recommendations available.</p>
                )}
              </div>
            </>
          )}
        </section>
      </main>
    </div>
  );
}