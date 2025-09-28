import { useState } from "react";
import type { FormEvent } from "react";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Sparkles,
  Star,
  StarHalf,
  TrendingUp,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { TooltipProps } from "recharts";

import { cn } from "@/lib/utils";

type SentimentBreakdown = {
  positive: number;
  neutral: number;
  negative: number;
};

type FeatureScore = {
  label: string;
  score: number;
};

type Analysis = {
  asin: string;
  productName: string;
  productCategory: string;
  sourceUrl: string;
  rating: number;
  reviewCount: number;
  monthlyMentions: number;
  sentiment: SentimentBreakdown;
  highlights: string[];
  painPoints: string[];
  opportunity: string[];
  keyTakeaway: string;
  createdAt: string;
  featureScores: FeatureScore[];
};

type SentimentDatum = {
  name: string;
  key: keyof SentimentBreakdown;
  value: number;
};

type StatCardProps = {
  icon: LucideIcon;
  label: string;
  value: string;
  description: string;
  intent?: "default" | "positive" | "warning";
};

type HistoryCardProps = {
  analysis: Analysis;
  index: number;
  onSelect: (url: string) => void;
};

type OpportunityProps = {
  opportunities: string[];
  monthlyMentions: number;
};

type SignalsCardProps = {
  highlights: string[];
  painPoints: string[];
};

type InsightSectionProps = {
  data: FeatureScore[];
};

type SecurityPoint = {
  title: string;
  description: string;
};

type FaqItem = {
  question: string;
  answer: string;
};

const SAMPLE_URL = "https://www.amazon.com/dp/B0C1X9Z8JD";
const EXAMPLE_URLS = [
  { label: "Echo Pop", url: "https://www.amazon.com/dp/B0BZD2ZL8L" },
  { label: "Kindle Scribe", url: "https://www.amazon.com/dp/B09BS26B8T" },
  { label: "Cosori Air Fryer", url: "https://www.amazon.com/dp/B07R6MKJZH" },
];
const SENTIMENT_COLORS: Record<keyof SentimentBreakdown, string> = {
  positive: "#34d399",
  neutral: "#facc15",
  negative: "#f87171",
};
const FEATURE_BAR_COLORS = ["#38bdf8", "#818cf8", "#a855f7", "#f97316", "#facc15"];

const DEFAULT_ANALYSIS = analyzeAmazonUrl(SAMPLE_URL);

const Index = () => {
  const [urlToAnalyze, setUrlToAnalyze] = useState<string>(SAMPLE_URL);
  const [analysis, setAnalysis] = useState<Analysis>(DEFAULT_ANALYSIS);
  const [history, setHistory] = useState<Analysis[]>([DEFAULT_ANALYSIS]);
  const [error, setError] = useState<string | null>(null);

  const sentimentData: SentimentDatum[] = [
    { name: "Positive", key: "positive", value: analysis.sentiment.positive },
    { name: "Neutral", key: "neutral", value: analysis.sentiment.neutral },
    { name: "Negative", key: "negative", value: analysis.sentiment.negative },
  ];

  const handleAnalyze = (value: string) => {
    const trimmed = value.trim();

    if (!trimmed) {
      setError("Paste an product URL to analyze.");
      return;
    }

    if (!isAmazonUrl(trimmed)) {
      setError("Enter a valid product detail page URL.");
      return;
    }

    const result = analyzeAmazonUrl(trimmed);
    setAnalysis(result);
    setHistory((prev) => [result, ...prev.filter((item) => item.asin !== result.asin)].slice(0, 5));
    setError(null);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleAnalyze(urlToAnalyze);
  };

  const handleExample = (exampleUrl: string) => {
    setUrlToAnalyze(exampleUrl);
    handleAnalyze(exampleUrl);
  };

  const netSentiment = analysis.sentiment.positive - analysis.sentiment.negative;
  const dominantSentiment =
    analysis.sentiment.positive > analysis.sentiment.negative
      ? "Positive tilt"
      : "Critical tilt";

  return (
    <div className="space-y-32 pb-24">
      <section id="product" className="relative overflow-hidden px-6 pb-20 pt-16 md:pt-24">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[minmax(0,1fr),minmax(0,0.95fr)]">
          <div className="space-y-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white/70">
              <Sparkles className="h-4 w-4 text-primary" />
              <span>Real-time Commercial Product Reviewer</span>
            </div>
            <div className="space-y-6">
              <h1 className="font-display text-4xl tracking-tight text-white sm:text-5xl lg:text-6xl">
                Understand any product URL in seconds
              </h1>
              <p className="max-w-xl text-base leading-relaxed text-white/70">
                Robixx Review Radar distills millions of verified reviews into digestible takeaways. Paste a
                product link to surface what shoppers praise, where they struggle, and how sentiment trends. Made Specially by Robixx
              </p>
            </div>
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl shadow-black/30"
            >
              <label className="sr-only" htmlFor="url-input">
                Product URL
              </label>
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  id="url-input"
                  type="url"
                  value={urlToAnalyze}
                  onChange={(event) => setUrlToAnalyze(event.target.value)}
                  placeholder="https://www.amazon.com/..."
                  className="flex-1 rounded-2xl border border-white/10 bg-slate-950/40 px-5 py-3 text-sm text-white placeholder:text-white/40 focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-br from-primary via-primary/90 to-secondary px-5 py-3 text-sm font-semibold text-slate-950 shadow-[0_20px_40px_rgba(255,179,71,0.35)] transition hover:-translate-y-0.5"
                >
                  Analyze URL
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
              {error && <p className="mt-3 text-sm text-rose-300">{error}</p>}
              <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-white/60">
                <span>Examples:</span>
                {EXAMPLE_URLS.map((example) => (
                  <button
                    key={example.url}
                    type="button"
                    onClick={() => handleExample(example.url)}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 transition hover:border-primary/40 hover:bg-primary/15 hover:text-white"
                  >
                    {example.label}
                  </button>
                ))}
              </div>
            </form>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <StatCard
                icon={TrendingUp}
                label="Net sentiment"
                value={`${netSentiment >= 0 ? "+" : ""}${netSentiment.toFixed(1)} pts`}
                description="Positive share minus negative share across the most recent review cohort."
                intent={netSentiment >= 0 ? "positive" : "warning"}
              />
              <StatCard
                icon={CheckCircle2}
                label="Avg rating"
                value={`${analysis.rating.toFixed(1)} / 5`}
                description={`${formatNumber(analysis.reviewCount)} verified product reviews in scope.`}
              />
              <StatCard
                icon={Clock}
                label="Mentions / month"
                value={formatNumber(analysis.monthlyMentions)}
                description="How often core review themes appear across Amazon & social chatter."
              />
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <ProductInsightCard analysis={analysis} dominantSentiment={dominantSentiment} />
            <SentimentCard
              analysis={analysis}
              data={sentimentData}
              dominantSentiment={dominantSentiment}
            />
            <SignalsCard highlights={analysis.highlights} painPoints={analysis.painPoints} />
            <OpportunityCard
              opportunities={analysis.opportunity}
              monthlyMentions={analysis.monthlyMentions}
            />
          </div>
        </div>
      </section>

      <section className="px-6" id="insights">
        <div className="mx-auto max-w-6xl space-y-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="space-y-4">
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.3em] text-white/50">
                Feature deep dive
              </span>
              <h2 className="font-display text-3xl text-white">Performance by review theme</h2>
              <p className="max-w-2xl text-sm text-white/70">
                Robixx Review Radar classifies every review into canonical themes so you can see which customer
                promises resonate. Scores are normalized to a 5-point scale and benchmarked against category
                averages.
              </p>
            </div>
            <div className="rounded-2xl border border-emerald-300/20 bg-emerald-300/10 px-4 py-3 text-xs text-emerald-100">
              <strong className="mr-2 font-semibold text-emerald-200">72%</strong> of listings with a
              similar sentiment mix improve add-to-cart rate after updating PDP messaging.
            </div>
          </div>
          <InsightSection data={analysis.featureScores} />
        </div>
      </section>

      <section className="px-6" id="how-it-works">
        <div className="mx-auto max-w-6xl">
          <div className="space-y-6 text-center">
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs uppercase tracking-[0.3em] text-white/50">
              Workflow
            </span>
            <h2 className="font-display text-3xl text-white sm:text-4xl">
              Three steps to transform a product URL into strategy
            </h2>
            <p className="mx-auto max-w-3xl text-sm text-white/70">
              Robixx Review Radar ingests the PDP, joins it with review sentiment, then arms your
              team with clear action items tailored to merchandising, marketing, and support.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {["Ingest", "Interpret", "Activate"].map((stage, index) => (
              <div
                key={stage}
                className="rounded-3xl border border-white/10 bg-white/5 p-6 text-left shadow-xl shadow-black/20"
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-2xl bg-white/10 text-white/80">
                    {index === 0 && <Sparkles className="h-5 w-5" />}
                    {index === 1 && <TrendingUp className="h-5 w-5" />}
                    {index === 2 && <CheckCircle2 className="h-5 w-5" />}
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-white/40">Step {index + 1}</p>
                    <h3 className="mt-1 text-lg font-semibold text-white">{stage}</h3>
                  </div>
                </div>
                <p className="mt-4 text-sm text-white/70">
                  {stepCopy[index]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6" id="security">
        <div className="mx-auto max-w-6xl rounded-3xl border border-white/10 bg-white/5 p-10 shadow-2xl shadow-black/30">
          <div className="grid gap-10 lg:grid-cols-[0.9fr,1.1fr]">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-3 py-1 text-xs uppercase tracking-[0.3em] text-white/50">
                <ShieldCheck className="h-4 w-4 text-secondary" />
                Trust & security
              </div>
              <h2 className="font-display text-3xl text-white">
                Enterprise-grade security for every imported URL
              </h2>
              <p className="text-sm text-white/70">
                Every Robixx Review Radar workspace includes granular access controls, secure credential storage, and
                audit trails so compliance teams can trace every insight back to its source.
              </p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {securityPoints.map((point) => (
                <div
                  key={point.title}
                  className="rounded-2xl border border-white/10 bg-slate-950/50 p-5 text-sm text-white/70"
                >
                  <h3 className="text-sm font-semibold text-white">{point.title}</h3>
                  <p className="mt-3 leading-relaxed">{point.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6" id="faq">
        <div className="mx-auto max-w-6xl space-y-12">
          <div className="space-y-3 text-center">
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs uppercase tracking-[0.3em] text-white/50">
              Support
            </span>
            <h2 className="font-display text-3xl text-white">Frequently asked questions</h2>
            <p className="mx-auto max-w-3xl text-sm text-white/70">
              Everything you need to know about how Robixx Review Radar ingests, processes, and protects Amazon listing
              intelligence for your team.
            </p>
          </div>
          <div className="grid gap-4">
            {faqItems.map((item) => (
              <div
                key={item.question}
                className="rounded-3xl border border-white/10 bg-white/5 p-6 text-left shadow-lg shadow-black/25"
              >
                <h3 className="text-lg font-semibold text-white">{item.question}</h3>
                <p className="mt-3 text-sm text-white/70">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6" id="about">
        <div className="mx-auto max-w-6xl rounded-3xl border border-white/10 bg-gradient-to-br from-primary/15 via-slate-950/60 to-secondary/20 p-10 shadow-2xl shadow-black/35">
          <div className="grid gap-10 lg:grid-cols-[1.2fr,0.8fr]">
            <div className="space-y-6">
              <h2 className="font-display text-3xl text-white">Built for marketplace operators</h2>
              <p className="text-sm text-white/70">
                Robixx Review Radar is made by team Robixx
              </p>
              <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.3em] text-white/50">
                <span className="rounded-full border border-white/10 px-3 py-1">Merchandising science</span>
                <span className="rounded-full border border-white/10 px-3 py-1">Voice of customer AI</span>
                <span className="rounded-full border border-white/10 px-3 py-1">Operational excellence</span>
              </div>
            </div>
            <HistoryList history={history} onSelect={handleExample} />
          </div>
        </div>
      </section>

      <section className="px-6" id="cta">
        <div className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-gradient-to-br from-secondary/25 via-primary/30 to-accent/25 p-10 text-center shadow-[0_40px_80px_rgba(8,12,20,0.6)]">
          <h2 className="font-display text-3xl text-white">Bring Robixx Review Radar to your next product review</h2>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button className="flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 shadow-[0_20px_40px_rgba(255,255,255,0.25)] transition hover:-translate-y-0.5">
              Request live demo
              <ArrowRight className="h-4 w-4" />
            </button>
            <button className="rounded-2xl border border-white/30 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/50 hover:bg-white/20">
              Download sample report
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

const StatCard = ({ icon: Icon, label, value, description, intent = "default" }: StatCardProps) => (
  <div
    className={cn(
      "rounded-3xl border border-white/10 bg-white/5 p-5 text-left shadow-xl shadow-black/25 transition hover:-translate-y-1 hover:shadow-2xl",
      intent === "positive" && "border-emerald-300/40 bg-emerald-300/15",
      intent === "warning" && "border-rose-300/40 bg-rose-300/15",
    )}
  >
    <div className="flex items-center gap-3">
      <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white/10 text-white/80">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-white/40">{label}</p>
        <p className="mt-1 text-lg font-semibold text-white">{value}</p>
      </div>
    </div>
    <p className="mt-4 text-xs text-white/60">{description}</p>
  </div>
);

const ProductInsightCard = ({
  analysis,
  dominantSentiment,
}: {
  analysis: Analysis;
  dominantSentiment: string;
}) => {
  const ratingConfidence = Math.min(98, 74 + Math.round(analysis.rating * 4));

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-2xl shadow-black/35">
      <div className="space-y-5">
        <div className="space-y-2">
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.3em] text-white/50">
            {analysis.productCategory}
          </span>
          <h2 className="font-display text-2xl text-white">{analysis.productName}</h2>
          <p className="text-sm text-white/70">{analysis.keyTakeaway}</p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-1 text-amber-300">
            {renderStars(analysis.rating)}
          </div>
          <p className="text-sm text-white/60">
            {analysis.rating.toFixed(1)} average • {formatNumber(analysis.reviewCount)} reviews
          </p>
        </div>
        <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.3em] text-white/40">
          <span className="rounded-full border border-white/10 px-3 py-1">{dominantSentiment}</span>
          <span className="rounded-full border border-white/10 px-3 py-1">
            Refreshed {formatDateTime(analysis.createdAt)}
          </span>
          <span className="rounded-full border border-white/10 px-3 py-1">
            ASIN {analysis.asin}
          </span>
        </div>
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-primary/25 via-primary/10 to-secondary/25 p-5">
          <p className="text-xs uppercase tracking-[0.3em] text-white/50">Confidence model</p>
          <p className="mt-3 text-3xl font-semibold text-white">{ratingConfidence}%</p>
          <p className="mt-2 text-xs leading-relaxed text-white/70">
            Synthesized from {formatNumber(analysis.reviewCount)} verified reviews and {formatNumber(analysis.monthlyMentions)}
            monthly marketplace mentions.
          </p>
          <div className="mt-4 space-y-2 text-xs text-white/70">
            {analysis.opportunity.slice(0, 2).map((item) => (
              <div key={item} className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const SentimentCard = ({
  analysis,
  data,
  dominantSentiment,
}: {
  analysis: Analysis;
  data: SentimentDatum[];
  dominantSentiment: string;
}) => (
  <div className="rounded-3xl border border-white/10 bg-slate-900/50 p-6 shadow-2xl shadow-black/35">
    <div className="flex items-center justify-between">
      <div>
        <h3 className="font-display text-xl text-white">Voice of customer sentiment</h3>
        <p className="mt-1 text-xs text-white/60">
          Distribution of positive, neutral, and negative language across the latest {formatNumber(analysis.reviewCount)}
          reviews.
        </p>
      </div>
      <span className="rounded-full border border-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.3em] text-white/45">
        {dominantSentiment}
      </span>
    </div>
    <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,0.6fr),minmax(0,1fr)]">
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius="55%"
              outerRadius="90%"
              startAngle={90}
              endAngle={-270}
              cornerRadius={8}
            >
              {data.map((entry) => (
                <Cell key={entry.key} fill={SENTIMENT_COLORS[entry.key]} />
              ))}
            </Pie>
            <Tooltip content={<SentimentTooltip />} wrapperStyle={{ outline: "none" }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="space-y-4">
        {data.map((entry) => (
          <div
            key={entry.key}
            className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
          >
            <div className="flex items-center gap-3">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: SENTIMENT_COLORS[entry.key] }}
              />
              <span className="text-sm font-semibold text-white">{entry.name}</span>
            </div>
            <span className="text-sm text-white/70">{entry.value}%</span>
          </div>
        ))}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
          {analysis.keyTakeaway}
        </div>
      </div>
    </div>
  </div>
);

const SignalsCard = ({ highlights, painPoints }: SignalsCardProps) => (
  <div className="rounded-3xl border border-white/10 bg-slate-900/50 p-6 shadow-2xl shadow-black/35">
    <div className="grid gap-6 lg:grid-cols-2">
      <div>
        <div className="flex items-center gap-2 text-sm font-semibold text-emerald-300">
          <CheckCircle2 className="h-4 w-4" />
          Positive signals
        </div>
        <ul className="mt-4 space-y-3 text-sm text-white/70">
          {highlights.map((item) => (
            <li key={item} className="flex gap-3">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-300/80" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <div className="flex items-center gap-2 text-sm font-semibold text-rose-300">
          <AlertTriangle className="h-4 w-4" />
          Watch-outs
        </div>
        <ul className="mt-4 space-y-3 text-sm text-white/70">
          {painPoints.map((item) => (
            <li key={item} className="flex gap-3">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-rose-300/80" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

const OpportunityCard = ({ opportunities, monthlyMentions }: OpportunityProps) => (
  <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-secondary/20 via-slate-900/60 to-primary/25 p-6 shadow-2xl shadow-black/35">
    <div className="flex items-center justify-between">
      <div>
        <h3 className="font-display text-xl text-white">Next best moves</h3>
        <p className="mt-1 text-xs text-white/65">
          Prioritized based on {formatNumber(monthlyMentions)} monthly mentions across emerging review themes.
        </p>
      </div>
      <span className="rounded-full border border-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.3em] text-white/45">
        Action plan
      </span>
    </div>
    <ul className="mt-5 space-y-3 text-sm text-white/75">
      {opportunities.map((item) => (
        <li
          key={item}
          className="flex gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 shadow-inner shadow-black/20"
        >
          <span className="mt-1 h-2 w-2 rounded-full bg-white/60" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

const InsightSection = ({ data }: InsightSectionProps) => (
  <div className="grid gap-8 lg:grid-cols-[minmax(0,0.6fr),minmax(0,1fr)]">
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/25">
      <h3 className="font-display text-xl text-white">Theme scoring</h3>
      <p className="mt-2 text-xs text-white/60">
        Each score shows how reviewers rate the promise versus their lived experience. Numbers are weighted by
        recent review velocity.
      </p>
      <div className="mt-6 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barSize={28}>
            <CartesianGrid strokeDasharray="3 6" stroke="rgba(255,255,255,0.08)" vertical={false} />
            <XAxis
              dataKey="label"
              tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              domain={[2.5, 5]}
              tickCount={6}
              tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip content={<FeatureTooltip />} wrapperStyle={{ outline: "none" }} />
            <Bar dataKey="score" radius={[10, 10, 10, 10]}>
              {data.map((_, index) => (
                <Cell key={_.label} fill={FEATURE_BAR_COLORS[index % FEATURE_BAR_COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
    <div className="space-y-5">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-white/70">
        <h3 className="text-lg font-semibold text-white">Category benchmarks</h3>
        <p className="mt-3 leading-relaxed">
          Build quality and durability outperform Amazon category medians by 8%. Value perception trails top
          quartile competitors—consider bundling accessories or clarifying long-term savings.
        </p>
      </div>
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-white/70">
        <h3 className="text-lg font-semibold text-white">Emerging signals</h3>
        <ul className="mt-3 space-y-3">
          <li className="flex gap-3">
            <Sparkles className="mt-1 h-4 w-4 text-secondary" />
            <span>Unprompted mentions of sustainability increased 42% month-over-month.</span>
          </li>
          <li className="flex gap-3">
            <TrendingUp className="mt-1 h-4 w-4 text-primary" />
            <span>Customers compare this listing with two new marketplace entrants—add a quick comparison grid.</span>
          </li>
          <li className="flex gap-3">
            <CheckCircle2 className="mt-1 h-4 w-4 text-emerald-300" />
            <span>Support satisfaction rises dramatically when agents cite the troubleshooting playbook.</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
);

const HistoryList = ({ history, onSelect }: { history: Analysis[]; onSelect: (url: string) => void }) => (
  <div className="space-y-4">
    <div className="flex items-center justify-between">
      <h3 className="font-display text-xl text-white">Recent analyses</h3>
      <span className="text-xs uppercase tracking-[0.3em] text-white/40">Auto saved</span>
    </div>
    <div className="space-y-3">
      {history.map((item, index) => (
        <HistoryCard key={`${item.asin}-${index}`} analysis={item} index={index} onSelect={onSelect} />
      ))}
    </div>
  </div>
);

const HistoryCard = ({ analysis, index, onSelect }: HistoryCardProps) => (
  <button
    type="button"
    onClick={() => onSelect(analysis.sourceUrl)}
    className="w-full rounded-3xl border border-white/10 bg-white/5 px-5 py-4 text-left text-sm text-white/70 transition hover:-translate-y-0.5 hover:border-primary/40 hover:bg-primary/15"
  >
    <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-white/40">
      <span>{index === 0 ? "Current" : `History ${index}`}</span>
      <Clock className="h-4 w-4 text-white/40" />
    </div>
    <p className="mt-3 text-sm font-semibold text-white">{analysis.productName}</p>
    <p className="mt-2 text-xs text-white/55">{analysis.sourceUrl}</p>
  </button>
);

const SentimentTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  if (!active || !payload || payload.length === 0) {
    return null;
  }

  const entry = payload[0];

  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/90 px-3 py-2 text-xs text-white">
      <p className="font-semibold">{entry.name}</p>
      <p className="mt-1 text-sm text-white/70">{entry.value}% share of voice</p>
    </div>
  );
};

const FeatureTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  if (!active || !payload || payload.length === 0) {
    return null;
  }

  const entry = payload[0];

  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/90 px-3 py-2 text-xs text-white">
      <p className="font-semibold">{entry.payload.label}</p>
      <p className="mt-1 text-sm text-white/70">{entry.value.toFixed(1)} / 5 rating</p>
    </div>
  );
};

const stepCopy = [
  "Paste an Amazon PDP and AmazeScope enriches it with catalog metadata, review firehose ingestion, and keyword trends.",
  "Our sentiment models distill millions of words into theme-specific scores, then benchmark against your category.",
  "Deliver a prioritized action plan to merchandising, marketing, and support teams—export as slide, task, or API.",
];

const securityPoints: SecurityPoint[] = [
  {
    title: "SOC 2 Type II controls",
    description: "Independent monitoring covers data transit, storage, and staff access across every workspace.",
  },
  {
    title: "PII redaction",
    description: "Sensitive reviewer details are scrubbed before insights are stored or exported to downstream tools.",
  },
  {
    title: "Granular permissions",
    description: "Invite agencies, analysts, and executives with role-based scopes, enforced through SSO and SCIM.",
  },
  {
    title: "Full audit log",
    description: "Track every URL import, insight export, and configuration update to satisfy compliance reviews.",
  },
];

const faqItems: FaqItem[] = [
  {
    question: "How fresh are the insights?",
    answer:
      "Amazon reviews sync continuously via API and page monitoring. Sentiment models refresh within 15 minutes, and benchmarks recalibrate nightly.",
  },
  {
    question: "Can we connect business intelligence tools?",
    answer:
      "Yes. Export to Google Sheets, Snowflake, Looker, or connect via API. Scheduled exports keep dashboards aligned with the latest sentiment shifts.",
  },
  {
    question: "Do you cover non-US marketplaces?",
    answer:
      "AmazeScope supports all major Amazon regions with localized sentiment models, including North America, Europe, India, and Japan.",
  },
  {
    question: "What does onboarding look like?",
    answer:
      "We stand up workspaces in under a day. A dedicated strategist reviews your catalog, sets alerts, and aligns KPI tracking with your business goals.",
  },
];

function renderStars(rating: number) {
  const stars = [] as JSX.Element[];
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.4 && rating - fullStars < 0.85;

  for (let index = 1; index <= 5; index += 1) {
    if (index <= fullStars) {
      stars.push(<Star key={index} className="h-5 w-5 fill-current" />);
    } else if (index === fullStars + 1 && hasHalf) {
      stars.push(<StarHalf key={index} className="h-5 w-5 fill-current" />);
    } else {
      stars.push(<Star key={index} className="h-5 w-5 text-white/25" />);
    }
  }

  return stars;
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US").format(value);
}

function formatDateTime(value: string) {
  return new Date(value).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function isAmazonUrl(value: string) {
  try {
    const parsed = new URL(value);
    return parsed.hostname.includes("amazon.") || parsed.hostname.includes("amzn.to");
  } catch (error) {
    return false;
  }
}

function analyzeAmazonUrl(url: string): Analysis {
  const asin = extractAsin(url);
  const productName = extractProductName(url);
  const seed = createSeed(`${asin}-${productName}`);

  let positive = 55 + (seed % 26);
  let negative = 8 + ((seed >> 2) % 16);
  let neutral = 100 - positive - negative;

  if (neutral < 12) {
    const adjustment = 12 - neutral;
    neutral += adjustment;
    positive = Math.max(positive - adjustment, 38);
  }

  const total = positive + negative + neutral;
  if (total !== 100) {
    const diff = 100 - total;
    positive += diff;
  }

  const net = positive - negative;
  const rating = Number(Math.min(4.9, Math.max(2.8, 3.45 + net / 45)).toFixed(1));
  const reviewCount = Math.max(220, Math.round(420 + (seed % 12) * 160));
  const monthlyMentions = Math.round(60 + ((seed >> 3) % 200));
  const categories = [
    "Smart Home",
    "Kitchen & Home",
    "Health & Wellness",
    "Workstation",
    "Gaming & Entertainment",
    "Audio & Music",
    "Travel Gear",
    "Personal Care",
  ];
  const productCategory = categories[seed % categories.length];
  const featureLabels = [
    "Build quality",
    "Value for money",
    "Ease of setup",
    "Durability",
    "Customer support",
  ];
  const featureScores = featureLabels.map((label, index) => {
    const raw = 3.1 + ((seed >> (index + 1)) % 18) / 10;
    return { label, score: Number(Math.min(4.9, raw).toFixed(1)) };
  });

  const highlightPool = [
    "Setup takes under ten minutes with the guided onboarding wizard.",
    "Customers praise the premium build and matte finish that resists fingerprints.",
    "AI-powered summaries help teams brief stakeholders without combing through every review.",
    "Shoppers repeatedly mention the impressive battery endurance under heavy workloads.",
    "Bundles well with Amazon Replenish subscriptions for recurring accessories.",
    "Voice control integrations feel more intuitive compared to previous generation models.",
    "Packaging upgrades cut down on returns caused by in-transit damage.",
  ];
  const painPointPool = [
    "Advanced automation templates require a brief learning curve for non-technical users.",
    "Replacement filters are pricier than comparable listings in the category.",
    "Mobile app notifications sometimes lag behind live review arrivals.",
    "Voice assistant occasionally misfires in noisier environments.",
    "Documented compatibility gaps with certain third-party accessories.",
    "Does not include a protective sleeve in-box, which several buyers expected.",
  ];
  const opportunityPool = [
    "Highlight the quick-start video in the gallery to accelerate onboarding confidence.",
    "Bundle a discounted accessory kit to address recurring compatibility requests.",
    "Launch a proactive email flow targeting durability improvements and care tips.",
    "Surface social proof quotes that emphasize reliability under daily use.",
    "Expand customer support availability around peak shopping windows.",
  ];

  const highlights = rotatePool(highlightPool, seed).slice(0, 3);
  const painPoints = rotatePool(painPointPool, seed + 7).slice(0, 3);
  const opportunities = rotatePool(opportunityPool, seed + 13).slice(0, 3);

  const keyTakeaway =
    net > 20
      ? "Reviewers are overwhelmingly positive—lean into premium positioning while reinforcing supply confidence."
      : net > 5
        ? "Sentiment trends upward with a few consistent friction points—address them in PDP messaging."
        : "Shoppers are split—reduce confusion with clearer expectations and guided comparisons.";

  return {
    asin,
    productName,
    productCategory,
    sourceUrl: url,
    rating,
    reviewCount,
    monthlyMentions,
    sentiment: {
      positive,
      neutral,
      negative,
    },
    highlights,
    painPoints,
    opportunity: opportunities,
    keyTakeaway,
    createdAt: new Date().toISOString(),
    featureScores,
  };
}

function extractAsin(url: string) {
  const match =
    url.match(/(?:dp|gp\/product|product\/|ASIN=)([A-Z0-9]{10})/i) ||
    url.match(/\/([A-Z0-9]{10})(?:[/?]|$)/i);
  if (match) {
    return match[1].toUpperCase();
  }

  const fallback = extractProductName(url)
    .replace(/[^A-Za-z0-9]/g, "")
    .toUpperCase()
    .padEnd(10, "X")
    .slice(0, 10);

  return fallback || "UNKNOWNASIN";
}

function extractProductName(url: string) {
  try {
    const { pathname } = new URL(url);
    const segments = pathname.split("/").filter(Boolean);
    const candidate = segments.find((segment) => segment.length > 4 && !segment.startsWith("dp"));
    if (candidate) {
      return toTitleCase(decodeURIComponent(candidate.replace(/[-_]+/g, " ")));
    }
  } catch (error) {
    return "Amazon Listing";
  }

  return "Amazon Listing";
}

function toTitleCase(value: string) {
  return value
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

function rotatePool<T>(items: T[], seed: number) {
  const offset = Math.abs(seed) % items.length;
  return [...items.slice(offset), ...items.slice(0, offset)];
}

function createSeed(input: string) {
  let hash = 0;
  for (let index = 0; index < input.length; index += 1) {
    hash = (hash << 5) - hash + input.charCodeAt(index);
    hash |= 0;
  }
  return Math.abs(hash);
}

export default Index;
