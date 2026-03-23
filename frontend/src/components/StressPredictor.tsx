import { useState } from "react";
import { Brain, Moon, BookOpen, GraduationCap, Activity } from "lucide-react";
import StressGauge from "./StressGauge";
import StressRecommendation from "./StressRecommendation";

type StressLevel = "Low" | "Moderate" | "High" | null;

const StressPredictor = () => {
	const [studyHours, setStudyHours] = useState("");
	const [sleepHours, setSleepHours] = useState("");
	const [gpa, setGpa] = useState("");
	const [prediction, setPrediction] = useState<StressLevel>(null);
	const [loading, setLoading] = useState(false);

	const clientPredict = (study: number, sleep: number, gpaVal: number): StressLevel => {
		let score = 0;
		if (study > 8) score += 3;
		else if (study > 5) score += 2;
		else if (study > 3) score += 1;

		if (sleep < 5) score += 3;
		else if (sleep < 7) score += 1;

		if (gpaVal < 2) score += 2;
		else if (gpaVal < 3) score += 1;

		if (score >= 5) return "High";
		if (score >= 3) return "Moderate";
		return "Low";
	};

	const handlePredict = async () => {
		const study = parseFloat(studyHours);
		const sleep = parseFloat(sleepHours);
		const gpaVal = parseFloat(gpa);

		if (isNaN(study) || isNaN(sleep) || isNaN(gpaVal)) return;

		setLoading(true);
		setPrediction(null);

		try {
			const res = await fetch("http://192.41.170.112:6122/predict", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ study_hours: study, sleep_hours: sleep, gpa: gpaVal }),
			});
			const data = await res.json();
			setPrediction(data.prediction);
		} catch {
			setPrediction(clientPredict(study, sleep, gpaVal));
		} finally {
			setLoading(false);
		}
	};

	const isValid = studyHours && sleepHours && gpa;

	return (
		<div className="min-h-screen bg-space stars flex items-center justify-center p-6">
			<div className="w-full max-w-md">
				{/* Header */}
				<div className="text-center mb-8 animate-fade-up">
					<div className="inline-flex items-center gap-2 rounded-full bg-primary/15 border border-primary/20 px-4 py-1.5 mb-4">
						<Brain className="w-4 h-4 text-primary" />
						<span className="text-sm font-medium text-primary">ML-Powered</span>
					</div>
					<h1 className="text-3xl font-bold tracking-tight text-foreground" style={{ lineHeight: 1.1 }}>
						Stress Level Predictor
					</h1>
					<p className="mt-3 text-muted-foreground text-sm max-w-xs mx-auto" style={{ textWrap: "pretty" }}>
						Enter your daily habits to predict your stress level using machine learning
					</p>
				</div>

				{/* Card */}
				<div
					className="bg-card/80 backdrop-blur-sm border border-border rounded-2xl shadow-[0_4px_32px_-8px_rgba(0,0,0,0.5)] p-6 animate-fade-up"
					style={{ animationDelay: "0.1s" }}
				>
					<div className="space-y-5">
						<InputField
							icon={<BookOpen className="w-4 h-4" />}
							label="Study Hours"
							sublabel="per day"
							value={studyHours}
							onChange={setStudyHours}
							min={0}
							max={24}
							step={0.5}
							placeholder="e.g. 6"
						/>
						<InputField
							icon={<Moon className="w-4 h-4" />}
							label="Sleep Hours"
							sublabel="per night"
							value={sleepHours}
							onChange={setSleepHours}
							min={0}
							max={24}
							step={0.5}
							placeholder="e.g. 7"
						/>
						<InputField
							icon={<GraduationCap className="w-4 h-4" />}
							label="GPA"
							sublabel="0 – 4.0 scale"
							value={gpa}
							onChange={setGpa}
							min={0}
							max={4}
							step={0.1}
							placeholder="e.g. 3.5"
						/>
					</div>

					<button
						onClick={handlePredict}
						disabled={!isValid || loading}
						className="mt-6 w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold py-3 rounded-xl
              transition-[transform,box-shadow] duration-200 ease-out
              hover:shadow-[0_6px_24px_-4px_hsl(170_90%_50%/0.4)]
              active:scale-[0.97]
              disabled:opacity-40 disabled:pointer-events-none"
					>
						{loading ? (
							<span className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
						) : (
							<>
								<Activity className="w-4 h-4" />
								Predict Stress Level
							</>
						)}
					</button>
				</div>

				{/* Result + Recommendation */}
				{prediction && (
					<div className="mt-6 space-y-5">
						<div className="bg-card/80 backdrop-blur-sm border border-border rounded-2xl shadow-[0_4px_32px_-8px_rgba(0,0,0,0.5)] p-8 animate-fade-up">
							<StressGauge level={prediction} />
						</div>
						<div className="bg-card/80 backdrop-blur-sm border border-border rounded-2xl shadow-[0_4px_32px_-8px_rgba(0,0,0,0.5)] p-6">
							<StressRecommendation level={prediction} />
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

interface InputFieldProps {
	icon: React.ReactNode;
	label: string;
	sublabel: string;
	value: string;
	onChange: (v: string) => void;
	min: number;
	max: number;
	step: number;
	placeholder: string;
}

const InputField = ({ icon, label, sublabel, value, onChange, min, max, step, placeholder }: InputFieldProps) => (
	<div>
		<div className="flex items-center gap-2 mb-1.5">
			<span className="text-muted-foreground">{icon}</span>
			<label className="text-sm font-medium text-foreground">{label}</label>
			<span className="text-xs text-muted-foreground">({sublabel})</span>
		</div>
		<input
			type="number"
			value={value}
			onChange={(e) => onChange(e.target.value)}
			min={min}
			max={max}
			step={step}
			placeholder={placeholder}
			className="w-full px-4 py-2.5 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground
        text-sm transition-[border-color,box-shadow] duration-150
        focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
		/>
	</div>
);

export default StressPredictor;
