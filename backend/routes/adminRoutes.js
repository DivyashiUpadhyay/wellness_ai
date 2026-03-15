import express from "express";
import Event from "../models/Event.js";

const router = express.Router();

router.get("/analytics", async (req, res) => {

  try {

    const events = await Event.find();

    let totalStress = 0;

    events.forEach(e => {
      totalStress += e.stress_score;
    });

    const avgStress = Math.round(totalStress / events.length);

    const riskDistribution = {
      low: 0,
      medium: 0,
      high: 0
    };

    events.forEach(e => {

      if (e.stress_score < 40) riskDistribution.low++;
      else if (e.stress_score < 65) riskDistribution.medium++;
      else riskDistribution.high++;

    });

    res.json({
      avgStress,
      riskDistribution
    });

  } catch (err) {

    console.error(err);
    res.status(500).json({ error: "Analytics failed" });

  }

});

export default router;