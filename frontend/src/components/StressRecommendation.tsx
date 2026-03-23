import { Heart, TrendingDown, Shield } from "lucide-react";

type StressLevel = "Low" | "Moderate" | "High";

interface StressRecommendationProps {
  level: StressLevel;
}

const recommendations: Record<StressLevel, { icon: typeof Heart; title: string; items: string[]; accent: string }> = {
  High: {
    icon: Heart,
    title: "Take Action — Build Better Habits",
    accent: "var(--stress-high)",
    items: [
      "Prioritize 7–8 hours of sleep — it's the single biggest lever for reducing stress.",
      "Break study sessions into 25-minute focused blocks with 5-minute breaks (Pomodoro technique).",
      "Add 20 minutes of physical activity daily — even a brisk walk resets your nervous system.",
      "Limit caffeine after 2 PM and avoid screens 1 hour before bed.",
      "Talk to a counselor or trusted friend — you don't have to handle it alone.",
    ],
  },
  Moderate: {
    icon: TrendingDown,
    title: "Stay Ahead — Small Tweaks to Improve",
    accent: "var(--stress-moderate)",
    items: [
      "Add an extra 30 minutes of sleep — the difference between 6.5 and 7 hours is significant.",
      "Schedule short breaks between study sessions to prevent mental fatigue buildup.",
      "Practice 5 minutes of deep breathing or meditation before bed.",
      "Plan your week on Sunday evening so workload feels more predictable.",
      "Stay connected — social time isn't wasted time, it's a stress buffer.",
    ],
  },
  Low: {
    icon: Shield,
    title: "Great Balance — Keep It Up",
    accent: "var(--stress-low)",
    items: [
      "Maintain your current sleep schedule — consistency matters more than duration.",
      "Continue balancing study with rest — you've found a sustainable rhythm.",
      "Stay physically active to keep stress resilience high long-term.",
      "Check in with yourself weekly — catching early signs prevents bigger problems.",
      "Help a friend who might be struggling — your habits can inspire others.",
    ],
  },
};

const StressRecommendation = ({ level }: StressRecommendationProps) => {
  const rec = recommendations[level];
  const Icon = rec.icon;

  return (
    <div className="animate-fade-up" style={{ animationDelay: "0.2s" }}>
      <div className="flex items-center gap-2.5 mb-4">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: `hsl(${rec.accent} / 0.15)` }}
        >
          <Icon className="w-4 h-4" style={{ color: `hsl(${rec.accent})` }} />
        </div>
        <h3 className="text-sm font-semibold text-foreground">{rec.title}</h3>
      </div>
      <ul className="space-y-3">
        {rec.items.map((item, i) => (
          <li
            key={i}
            className="flex gap-3 text-sm text-secondary-foreground animate-fade-up"
            style={{ animationDelay: `${0.3 + i * 0.08}s`, textWrap: "pretty" }}
          >
            <span
              className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
              style={{ backgroundColor: `hsl(${rec.accent})` }}
            />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StressRecommendation;
