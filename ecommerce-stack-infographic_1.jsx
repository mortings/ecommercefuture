import { useState } from "react";

const COMPONENTS = [
  {
    id: "erp",
    label: "ERP",
    fullName: "Enterprise Resource Planning",
    icon: "⚙️",
    color: "#2563eb",
    today: {
      role: "Backbone of operations — manages finance, inventory, supply chain, manufacturing, and procurement. Owns transactional data like pricing, stock levels, and cost.",
      players: "SAP, Oracle, Microsoft Dynamics, Acumatica, NetSuite",
      pain: "Rigid, slow to adapt. Data trapped in silos. Manual data entry between systems. Batch-oriented, not real-time.",
    },
    future: {
      role: "Autonomous operational brain. AI agents read/write ERP data via MCP in real-time. Predictive demand planning, auto-replenishment, and dynamic cost optimization happen continuously.",
      shift: "From passive record-keeper to active participant. Agents negotiate with suppliers, adjust inventory allocations, and trigger procurement autonomously based on live demand signals.",
      protocol: "MCP servers expose ERP data to AI agents. UCP transactions feed back order data instantly. A2A enables multi-agent coordination across supply chain partners.",
      rank: 4,
      verdict: "stable",
      verdictLabel: "Steady — Still Essential",
      verdictNote: "ERP remains the operational backbone, but becomes a background data service. Agents consume ERP data via MCP, but ERP itself doesn't gain strategic leverage — it's table stakes, not a differentiator. Risk: commoditized into a dumb data pipe if vendors don't build native agent interfaces.",
    },
  },
  {
    id: "pim",
    label: "PIM",
    fullName: "Product Information Management",
    icon: "📦",
    color: "#7c3aed",
    today: {
      role: "Central hub for product data — pulls raw data from ERP/PLM, enriches with marketing content, SEO, digital assets, and syndicates to channels. Single source of truth for product information.",
      players: "Akeneo, Salsify, Pimcore, Syndigo, inriver, Contentserv",
      pain: "Manual enrichment workflows. Slow time-to-market. Inconsistent data across channels. Quality gates require human review.",
    },
    future: {
      role: "AI-native product knowledge graph. Agents auto-enrich product data with semantic attributes, generate multilingual descriptions, and maintain completeness scores autonomously.",
      shift: "From manual enrichment pipeline to self-healing, agent-enriched knowledge base. PIM becomes the semantic layer that AI shopping agents query to understand products deeply.",
      protocol: "MCP servers let agents query and enrich product data directly. Akeneo and Salsify already ship MCP servers and ACP connectors. Structured, semantic data becomes the competitive moat for AI discoverability.",
      rank: 1,
      verdict: "winner",
      verdictLabel: "🏆 Biggest Winner",
      verdictNote: "PIM becomes THE strategic asset. If AI agents can't understand your products, they won't recommend or sell them. Structured, semantic, agent-readable product data is the #1 competitive moat. PIM vendors like Akeneo and Salsify are already shipping MCP servers — they're first movers. Every other component depends on PIM data quality.",
    },
  },
  {
    id: "oms",
    label: "OMS",
    fullName: "Order Management System",
    icon: "📋",
    color: "#059669",
    today: {
      role: "Manages the full order lifecycle — routing, tracking, fulfillment, returns. Orchestrates inventory across warehouses, channels, and fulfillment partners.",
      players: "Fluent Commerce, Manhattan Associates, Brightpearl, Shopify OMS",
      pain: "Complex routing rules maintained manually. Returns processing is labor-intensive. Limited real-time visibility across fulfillment network.",
    },
    future: {
      role: "Autonomous fulfillment orchestrator. AI agents optimize routing in real-time based on cost, speed, carbon footprint, and customer preference. Returns handled by agents end-to-end.",
      shift: "From rule-based order routing to predictive, self-optimizing fulfillment. Agents negotiate delivery options, manage exceptions, and proactively communicate with customers.",
      protocol: "UCP defines standardized order and fulfillment data for agent transactions. MCP exposes order status for agent queries. AP2 handles payment settlement. Delivery APIs become agent-readable.",
      rank: 2,
      verdict: "winner",
      verdictLabel: "Rising Winner",
      verdictNote: "OMS gains massive strategic importance as the commerce engine unbundles. When agents compare two identical products, the merchant with faster, cheaper, more transparent fulfillment wins. Delivery becomes the tiebreaker in every agent decision. OMS absorbs order orchestration that previously sat in the commerce engine — routing, tracking, returns, and delivery promise — and becomes a direct protocol endpoint for AI agents. Agent-readable delivery APIs aren't a nice-to-have; they're the deal-breaker.",
    },
  },
  {
    id: "cms",
    label: "CMS",
    fullName: "Content Management System",
    icon: "📝",
    color: "#dc2626",
    today: {
      role: "Powers content and landing pages, editorial experiences, and brand storytelling. Headless CMS decouples content from presentation for omnichannel delivery.",
      players: "Contentful, Sanity, Storyblok, Strapi, Adobe Experience Manager",
      pain: "Content creation bottlenecks. Personalization requires complex rule sets. Content must be manually adapted for each channel and locale.",
    },
    future: {
      role: "Generative content engine. AI agents create, personalize, and optimize content in real-time for every surface — human browsers, AI shopping agents, and conversational interfaces alike.",
      shift: "From static page builder to dynamic experience orchestrator. Content is generated on-the-fly based on agent intent, user context, and real-time signals. Human editors become curators and approvers.",
      protocol: "Content must be structured for both human and agent consumption. GEO (Generative Engine Optimization) replaces SEO as the primary discoverability paradigm. Schema.org becomes critical.",
      rank: 8,
      verdict: "loser",
      verdictLabel: "⚠ Most Disrupted",
      verdictNote: "CMS faces existential pressure. Shopify's Agentic Storefronts prove the point: AI surfaces favor structured catalog data with clean attributes and real-time accuracy — not editorial pages or visual layouts. When products are discovered and purchased inside ChatGPT without ever visiting a website, the traditional CMS value prop (page building, visual editing) becomes irrelevant for a growing share of commerce. Survivors must pivot to structured content APIs and agent-readable formats.",
    },
  },
  {
    id: "commerce",
    label: "Commerce Engine",
    fullName: "Commerce Platform / Storefront",
    icon: "🛒",
    color: "#ea580c",
    today: {
      role: "Core transaction engine — catalog, cart, checkout, pricing logic. Headless/composable architectures decouple frontend from backend. Manages the buying experience.",
      players: "Shopify Plus, commercetools, BigCommerce, Adobe Commerce, Salesforce Commerce Cloud",
      pain: "Built for human browsers, not AI agents. Checkout flows assume visual interaction. Integration complexity across the stack. Replatforming is expensive.",
    },
    future: {
      role: "The hardest question in the agentic stack. Traditionally the core of e-commerce — catalog, cart, checkout, pricing — but agents are unbundling every one of these functions. Catalog → PIM via MCP. Orders → OMS directly. Payments → AP2/ACP with providers. Pricing → Promotions engine via API. What's left?",
      shift: "The commerce engine's monopoly on the buying journey is breaking apart. Smart players like Shopify see this — their 'Agentic Storefronts' and 'Agentic Plan' are really a pivot into becoming a PIM + OMS + payment orchestrator bundled as protocol infrastructure. They're not defending the storefront — they're escaping it. The question: do you need a commerce 'platform' at all, or just a thin orchestration layer over PIM, OMS, and Payments?",
      protocol: "UCP and ACP define cart and checkout as open protocols — any system can implement them. Shopify Catalog is essentially structured PIM syndication. The commerce engine's survival depends on being the trusted transaction orchestrator and merchant-of-record — but that's a much thinner, lower-margin role than today's full platform.",
      rank: 7,
      verdict: "loser",
      verdictLabel: "⚠ Under Attack — Unbundled",
      verdictNote: "Controversial call, but the logic is clear: every core function of the commerce engine is being absorbed by specialist components + open protocols. PIM owns the catalog. OMS owns fulfillment. Payments own settlement. Promotions own pricing. UCP/ACP define cart and checkout as protocol standards. Shopify's pivot to 'Agentic Storefronts' and 'Catalog' is revealing — they're not defending the commerce engine, they're escaping into protocol infrastructure and data syndication. The traditional commerce platform risks becoming a thin, commoditized orchestration layer. Survivors must own the trust layer (merchant of record, fraud, tax, compliance) or get unbundled.",
    },
  },
  {
    id: "promo",
    label: "Promotions",
    fullName: "Promotions & Pricing Engine",
    icon: "🏷️",
    color: "#0891b2",
    today: {
      role: "Manages discounts, coupons, loyalty rewards, bundle pricing, and campaign-driven offers. Rules-based engines determine which promotions apply at checkout.",
      players: "Talon.One, Voucherify, commercetools Promotions, custom engines",
      pain: "Static rule sets. Promotions don't adapt to real-time demand. Difficult to extend to AI channels. Loyalty programs siloed from agent interactions.",
    },
    future: {
      role: "Dynamic, agent-negotiated pricing. AI agents query available promotions, apply loyalty rewards, and even negotiate AI-mode-exclusive discounts on behalf of consumers.",
      shift: "From static coupon codes to real-time, context-aware pricing. Agents continuously optimize pricing based on competitor data, demand signals, and margin targets. Promotions become API-first.",
      protocol: "UCP already supports AI-mode exclusive discounts. Pricing microservices expose rules via MCP so agents can query and apply promotions accurately. Real-time margin protection becomes critical.",
      rank: 5,
      verdict: "stable",
      verdictLabel: "Evolves — Higher Stakes",
      verdictNote: "Promotions don't disappear but the game changes dramatically. Agents will ruthlessly optimize for best price, making promotion logic a margin battleground. Static coupon codes become obsolete — real-time, agent-queryable pricing APIs are the new requirement. Winners build smart margin-protection logic; losers get price-arbitraged into oblivion.",
    },
  },
  {
    id: "crm",
    label: "CRM / CDP",
    fullName: "Customer Data & Relationships",
    icon: "👤",
    color: "#be185d",
    today: {
      role: "Manages customer profiles, purchase history, segmentation, and marketing engagement. CDPs unify first-party data across touchpoints for personalization.",
      players: "Salesforce, HubSpot, Segment, Klaviyo, mParticle",
      pain: "Data fragmented across systems. Personalization is reactive, not predictive. Privacy regulations add complexity. Limited ability to act on insights in real-time.",
    },
    future: {
      role: "Predictive relationship intelligence. AI agents use customer context to personalize every interaction — but via zero-knowledge protocols that protect PII while enabling deep personalization.",
      shift: "From storing customer data to understanding customer intent. Agents forecast needs before customers recognize them. The CRM becomes the 'preference memory' that agents consult to act on behalf of users.",
      protocol: "Zero-Knowledge Agentic Interfaces (ZTAI) let agents personalize without exposing raw PII. UCP Identity Linking connects agent sessions to customer profiles securely. First-party data becomes the moat.",
      rank: 6,
      verdict: "loser",
      verdictLabel: "⚠ Under Threat",
      verdictNote: "Traditional CRM loses ground because AI agents themselves become the relationship layer. When a consumer's agent remembers preferences, negotiates on their behalf, and manages interactions — what's left for CRM? First-party data remains valuable, but the CRM's role shrinks to a preference API that agents query. The 'relationship' moves from brand-owned to agent-mediated.",
    },
  },
  {
    id: "payments",
    label: "Payments",
    fullName: "Payment Processing & Settlement",
    icon: "💳",
    color: "#4f46e5",
    today: {
      role: "Secure processing, authorization, and settlement of transactions. Manages multiple payment methods, fraud detection, and PCI compliance.",
      players: "Stripe, Adyen, PayPal, Shopify Payments, Checkout.com",
      pain: "Designed for human-initiated transactions. Fraud models assume human behavior patterns. Limited support for agent-initiated purchases.",
    },
    future: {
      role: "Agent-native payment infrastructure. Tokenized, consent-based transactions where AI agents execute purchases using pre-authorized credentials — no card numbers exposed.",
      shift: "From checkout forms to protocol-based settlement. Visa's Trusted Agent Protocol (TAP) verifies legitimate AI agents. Google's AP2 and Stripe's ACP handle agent payment flows natively.",
      protocol: "AP2 handles secure agent payment authorization. ACP (Stripe + OpenAI) manages checkout transactions. Visa TAP verifies agent legitimacy. Zero-trust architecture protects every transaction.",
      rank: 3,
      verdict: "winner",
      verdictLabel: "Critical Enabler",
      verdictNote: "Payments becomes the trust layer for the entire agentic ecosystem — and absorbs the checkout function that previously lived in the commerce engine. No agent commerce works without secure, tokenized payment protocols. Stripe (ACP), Visa (TAP), Google (AP2) are racing to own this layer. As the commerce engine unbundles, payment providers that nail agent-native flows become the de facto checkout infrastructure — those stuck on checkout forms get bypassed.",
    },
  },
  {
    id: "search",
    label: "Search & Discovery",
    fullName: "Product Search & Recommendations",
    icon: "🔍",
    color: "#ca8a04",
    today: {
      role: "Powers product search, filtering, faceted navigation, and recommendation engines. Personalization based on behavior and purchase history.",
      players: "Algolia, Bloomreach, Coveo, Nosto, Constructor.io",
      pain: "Keyword-dependent. Recommendations based on historical patterns. Doesn't understand natural language intent. Limited cross-system context.",
    },
    future: {
      role: "Semantic understanding engine. AI agents don't search — they reason. Product discovery becomes conversational, intent-driven, and context-aware across the entire shopping journey.",
      shift: "From keyword matching to semantic reasoning. GEO (Generative Engine Optimization) replaces traditional SEO. Vector embeddings and RAG enable agents to understand products at a conceptual level.",
      protocol: "MCP provides structured product data to agent reasoning. Shopify's Catalog API supports semantic search with vector embeddings. Answer Engine Optimization (AEO) becomes the new discoverability game.",
      rank: 9,
      verdict: "loser",
      verdictLabel: "⚠ Most at Risk",
      verdictNote: "Traditional search & discovery faces the biggest existential threat. Shopify's Agentic Storefronts make products discoverable in ChatGPT by default — no search engine, no app, no integration needed. AI agents don't use search bars, faceted filters, or recommendation widgets — they reason over structured catalog data via protocols. The entire search vendor category must pivot to semantic/vector infrastructure and GEO tooling, or become obsolete as the 'search box' disappears from the buying journey.",
    },
  },
];

const CONNECTIONS_TODAY = [
  { from: "erp", to: "pim", label: "Raw product data" },
  { from: "pim", to: "commerce", label: "Enriched catalog" },
  { from: "pim", to: "cms", label: "Product content" },
  { from: "commerce", to: "oms", label: "Orders" },
  { from: "oms", to: "erp", label: "Fulfillment data" },
  { from: "crm", to: "commerce", label: "Customer segments" },
  { from: "promo", to: "commerce", label: "Discount rules" },
  { from: "search", to: "commerce", label: "Search results" },
  { from: "commerce", to: "payments", label: "Transactions" },
  { from: "cms", to: "commerce", label: "Landing pages" },
];

const PROTOCOLS = [
  { name: "UCP", full: "Universal Commerce Protocol", by: "Google + Shopify", desc: "Full shopping journey — discovery, cart, checkout, fulfillment. The 'common language' for agent-to-merchant transactions." },
  { name: "ACP", full: "Agentic Commerce Protocol", by: "OpenAI + Stripe", desc: "Checkout and payment execution within AI interfaces. Live in ChatGPT today." },
  { name: "MCP", full: "Model Context Protocol", by: "Anthropic", desc: "Universal data plumbing — agents access tools, databases, and APIs. 97M+ SDK downloads, 10K+ servers." },
  { name: "AP2", full: "Agent Payments Protocol", by: "Google", desc: "Secure payment authorization for agent transactions. Integrates Visa, Mastercard, PayPal." },
  { name: "A2A", full: "Agent-to-Agent Protocol", by: "Google", desc: "Multi-agent coordination. Enables agents from different systems to collaborate on complex tasks." },
  { name: "TAP", full: "Trusted Agent Protocol", by: "Visa", desc: "Verifies legitimate AI agents to prevent fraud in autonomous transactions." },
];

const VERDICT_STYLES = {
  winner: { bg: "linear-gradient(135deg, #065f46, #064e3b)", border: "#10b981", text: "#6ee7b7", icon: "▲", barColor: "#10b981" },
  stable: { bg: "linear-gradient(135deg, #1e3a5f, #1e293b)", border: "#3b82f6", text: "#93c5fd", icon: "■", barColor: "#3b82f6" },
  loser: { bg: "linear-gradient(135deg, #7f1d1d, #450a0a)", border: "#ef4444", text: "#fca5a5", icon: "▼", barColor: "#ef4444" },
};

const VERDICT_BADGE = {
  winner: { bg: "#065f46", border: "#10b981", text: "#6ee7b7", label: "WINNER" },
  stable: { bg: "#1e3a5f", border: "#3b82f6", text: "#93c5fd", label: "STEADY" },
  loser: { bg: "#7f1d1d", border: "#ef4444", text: "#fca5a5", label: "AT RISK" },
};

const ComponentCard = ({ comp, expanded, onClick, view, rankIndex }) => {
  const isExpanded = expanded === comp.id;
  const data = view === "today" ? comp.today : comp.future;
  const isFuture = view === "future";
  const badge = isFuture ? VERDICT_BADGE[data.verdict] : null;
  const verdictStyle = isFuture ? VERDICT_STYLES[data.verdict] : null;

  return (
    <div
      onClick={onClick}
      style={{
        background: isExpanded ? `linear-gradient(135deg, ${comp.color}12, ${comp.color}06)` : "var(--card-bg)",
        border: `1px solid ${isExpanded ? comp.color + "60" : "var(--border)"}`,
        borderRadius: 16,
        padding: isExpanded ? "24px" : "16px",
        cursor: "pointer",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {isExpanded && (
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 3,
          background: `linear-gradient(90deg, ${comp.color}, ${comp.color}80)`,
        }} />
      )}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: isExpanded ? 16 : 0 }}>
        {/* Rank number for future view */}
        {isFuture && (
          <div style={{
            width: 28, height: 28, borderRadius: 8, flexShrink: 0,
            background: verdictStyle.barColor + "20",
            border: `1.5px solid ${verdictStyle.barColor}60`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: 13,
            color: verdictStyle.barColor,
          }}>
            {data.rank}
          </div>
        )}
        <div style={{
          width: 44, height: 44, borderRadius: 12,
          background: `${comp.color}18`, display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 22, flexShrink: 0,
        }}>
          {comp.icon}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: 15, color: comp.color, letterSpacing: "0.5px" }}>
              {comp.label}
            </span>
            <span style={{ fontSize: 12, color: "var(--text-muted)", fontWeight: 400 }}>
              {comp.fullName}
            </span>
            {isFuture && badge && (
              <span style={{
                fontSize: 9, fontWeight: 800, letterSpacing: "1.2px",
                padding: "2px 8px", borderRadius: 6,
                background: badge.bg, color: badge.text,
                border: `1px solid ${badge.border}40`,
                fontFamily: "'JetBrains Mono', monospace",
              }}>
                {badge.label}
              </span>
            )}
          </div>
          {!isExpanded && (
            <div style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {isFuture ? data.verdictLabel : data.role.slice(0, 80) + "…"}
            </div>
          )}
        </div>
        <div style={{
          width: 28, height: 28, borderRadius: 8, background: "var(--bg-subtle)", display: "flex",
          alignItems: "center", justifyContent: "center", fontSize: 14, color: "var(--text-muted)",
          transform: isExpanded ? "rotate(180deg)" : "none", transition: "transform 0.3s ease", flexShrink: 0,
        }}>
          ▾
        </div>
      </div>

      {isExpanded && (
        <div style={{ animation: "fadeIn 0.3s ease" }}>
          <div style={{ fontSize: 13.5, lineHeight: 1.65, color: "var(--text-primary)", marginBottom: 16 }}>
            {data.role}
          </div>

          {view === "today" ? (
            <>
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.5px", color: "var(--text-muted)", marginBottom: 6 }}>Key Players</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {data.players.split(", ").map((p, i) => (
                    <span key={i} style={{
                      fontSize: 11, padding: "3px 10px", borderRadius: 20,
                      background: `${comp.color}12`, color: comp.color, fontWeight: 500,
                    }}>{p}</span>
                  ))}
                </div>
              </div>
              <div style={{
                background: "#fef3c7", borderRadius: 10, padding: "10px 14px",
                border: "1px solid #fcd34d40",
              }}>
                <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.5px", color: "#92400e", marginBottom: 4 }}>⚠ Current Pain Points</div>
                <div style={{ fontSize: 12.5, lineHeight: 1.55, color: "#78350f" }}>{data.pain}</div>
              </div>
            </>
          ) : (
            <>
              {/* Verdict Card */}
              <div style={{
                background: verdictStyle.bg, borderRadius: 12, padding: "14px 16px",
                border: `1px solid ${verdictStyle.border}40`, marginBottom: 12,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                  <span style={{ fontSize: 16, color: verdictStyle.text }}>{verdictStyle.icon}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: verdictStyle.text, fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.5px" }}>
                    #{data.rank} — {data.verdictLabel}
                  </span>
                </div>
                <div style={{ fontSize: 12.5, lineHeight: 1.6, color: verdictStyle.text + "dd" }}>{data.verdictNote}</div>
              </div>

              <div style={{
                background: `${comp.color}08`, borderRadius: 10, padding: "12px 14px",
                border: `1px solid ${comp.color}20`, marginBottom: 12,
              }}>
                <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.5px", color: comp.color, marginBottom: 4 }}>🔄 The Shift</div>
                <div style={{ fontSize: 12.5, lineHeight: 1.55, color: "var(--text-primary)" }}>{data.shift}</div>
              </div>
              <div style={{
                background: "linear-gradient(135deg, #0f172a, #1e293b)", borderRadius: 10, padding: "12px 14px",
                border: "1px solid #334155",
              }}>
                <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.5px", color: "#67e8f9", marginBottom: 4 }}>🔗 Protocol Layer</div>
                <div style={{ fontSize: 12.5, lineHeight: 1.55, color: "#e2e8f0" }}>{data.protocol}</div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default function EcommerceStackInfographic() {
  const [view, setView] = useState("today");
  const [expanded, setExpanded] = useState(null);
  const [showProtocols, setShowProtocols] = useState(false);

  return (
    <div style={{
      "--text-primary": "#0f172a",
      "--text-secondary": "#475569",
      "--text-muted": "#94a3b8",
      "--border": "#e2e8f0",
      "--card-bg": "#ffffff",
      "--bg-subtle": "#f1f5f9",
      "--bg-page": "#f8fafc",
      fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif",
      minHeight: "100vh",
      background: "var(--bg-page)",
      color: "var(--text-primary)",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,700&family=JetBrains+Mono:wght@500;700&display=swap');
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse { 0%, 100% { opacity: 0.5; } 50% { opacity: 1; } }
        @keyframes flowDash { to { stroke-dashoffset: -20; } }
      `}</style>

      {/* Header */}
      <div style={{ padding: "32px 24px 0", maxWidth: 900, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "3px", color: "#6366f1", marginBottom: 8 }}>
            The E-Commerce Technology Stack
          </div>
          <h1 style={{ fontSize: 32, fontWeight: 700, lineHeight: 1.2, margin: "0 0 8px", color: "#0f172a" }}>
            {view === "today" ? "Today's Architecture" : "The Agentic Future"}
          </h1>
          <p style={{ fontSize: 14, color: "var(--text-secondary)", maxWidth: 600, margin: "0 auto", lineHeight: 1.6 }}>
            {view === "today"
              ? "The modern composable commerce stack — modular, API-first, but still built for human-driven workflows and screen-based interactions."
              : "AI agents become the primary interface. Open protocols (UCP, ACP, MCP) replace screen-based browsing. Every component evolves from passive tool to autonomous participant."}
          </p>
        </div>

        {/* Toggle */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 28 }}>
          <div style={{
            display: "inline-flex", background: "#e2e8f0", borderRadius: 12, padding: 3, gap: 2,
          }}>
            {[
              { key: "today", label: "🏗️  Today", sub: "2024–2025" },
              { key: "future", label: "🤖  Agentic Future", sub: "2026+" },
            ].map(({ key, label, sub }) => (
              <button
                key={key}
                onClick={() => { setView(key); setExpanded(null); }}
                style={{
                  padding: "10px 24px", borderRadius: 10, border: "none", cursor: "pointer",
                  background: view === key ? "#ffffff" : "transparent",
                  boxShadow: view === key ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
                  fontFamily: "inherit", fontWeight: view === key ? 600 : 400,
                  fontSize: 14, color: view === key ? "#0f172a" : "#64748b",
                  transition: "all 0.2s ease",
                  display: "flex", flexDirection: "column", alignItems: "center", gap: 1,
                }}
              >
                {label}
                <span style={{ fontSize: 10, color: view === key ? "#6366f1" : "#94a3b8" }}>{sub}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Architecture Diagram */}
      <div style={{ padding: "0 24px", maxWidth: 900, margin: "0 auto 24px" }}>
        <div style={{
          background: view === "today" ? "linear-gradient(160deg, #f8fafc 0%, #eef2ff 100%)" : "linear-gradient(160deg, #0f172a 0%, #1e1b4b 100%)",
          borderRadius: 20, padding: "28px 24px", border: `1px solid ${view === "today" ? "#e2e8f0" : "#312e81"}`,
          position: "relative", overflow: "hidden",
        }}>
          {view === "future" && (
            <div style={{ position: "absolute", inset: 0, opacity: 0.05, backgroundImage: "radial-gradient(circle at 2px 2px, #818cf8 1px, transparent 0)", backgroundSize: "32px 32px" }} />
          )}

          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "2px", color: view === "today" ? "#6366f1" : "#a5b4fc", marginBottom: 4, textAlign: "center" }}>
              {view === "today" ? "Integration Architecture" : "Agentic Architecture"}
            </div>
            <div style={{ fontSize: 12, color: view === "today" ? "#64748b" : "#94a3b8", marginBottom: 20, textAlign: "center" }}>
              {view === "today" ? "API-first, composable, but human-orchestrated" : "Protocol-native, agent-orchestrated, autonomous"}
            </div>

            {view === "today" ? (
              /* TODAY: Hub-and-spoke layout */
              <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "center" }}>
                {/* Customer Layer */}
                <div style={{
                  display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap", width: "100%",
                  padding: "12px 16px", background: "#ffffff40", borderRadius: 14, border: "1px dashed #cbd5e1",
                }}>
                  <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.5px", color: "#64748b", width: "100%", textAlign: "center", marginBottom: 4 }}>
                    👤 Customer-Facing Layer
                  </div>
                  {["cms", "commerce", "search"].map((id) => {
                    const c = COMPONENTS.find((x) => x.id === id);
                    return (
                      <div key={id} style={{
                        padding: "8px 16px", borderRadius: 10, background: `${c.color}15`,
                        border: `1px solid ${c.color}30`, display: "flex", alignItems: "center", gap: 6,
                      }}>
                        <span style={{ fontSize: 16 }}>{c.icon}</span>
                        <span style={{ fontSize: 12, fontWeight: 600, color: c.color, fontFamily: "'JetBrains Mono', monospace" }}>{c.label}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Arrows */}
                <div style={{ display: "flex", gap: 6, alignItems: "center", color: "#94a3b8" }}>
                  <span style={{ fontSize: 18 }}>↕</span>
                  <span style={{ fontSize: 10, fontWeight: 500 }}>REST / GraphQL APIs</span>
                  <span style={{ fontSize: 18 }}>↕</span>
                </div>

                {/* Commerce Core */}
                <div style={{
                  display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap", width: "100%",
                  padding: "12px 16px", background: "#ffffff40", borderRadius: 14, border: "1px dashed #cbd5e1",
                }}>
                  <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.5px", color: "#64748b", width: "100%", textAlign: "center", marginBottom: 4 }}>
                    💡 Commerce Logic Layer
                  </div>
                  {["promo", "crm", "payments"].map((id) => {
                    const c = COMPONENTS.find((x) => x.id === id);
                    return (
                      <div key={id} style={{
                        padding: "8px 16px", borderRadius: 10, background: `${c.color}15`,
                        border: `1px solid ${c.color}30`, display: "flex", alignItems: "center", gap: 6,
                      }}>
                        <span style={{ fontSize: 16 }}>{c.icon}</span>
                        <span style={{ fontSize: 12, fontWeight: 600, color: c.color, fontFamily: "'JetBrains Mono', monospace" }}>{c.label}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Arrows */}
                <div style={{ display: "flex", gap: 6, alignItems: "center", color: "#94a3b8" }}>
                  <span style={{ fontSize: 18 }}>↕</span>
                  <span style={{ fontSize: 10, fontWeight: 500 }}>Batch sync / webhooks</span>
                  <span style={{ fontSize: 18 }}>↕</span>
                </div>

                {/* Data Layer */}
                <div style={{
                  display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap", width: "100%",
                  padding: "12px 16px", background: "#ffffff40", borderRadius: 14, border: "1px dashed #cbd5e1",
                }}>
                  <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.5px", color: "#64748b", width: "100%", textAlign: "center", marginBottom: 4 }}>
                    🗄️ Data & Operations Layer
                  </div>
                  {["pim", "erp", "oms"].map((id) => {
                    const c = COMPONENTS.find((x) => x.id === id);
                    return (
                      <div key={id} style={{
                        padding: "8px 16px", borderRadius: 10, background: `${c.color}15`,
                        border: `1px solid ${c.color}30`, display: "flex", alignItems: "center", gap: 6,
                      }}>
                        <span style={{ fontSize: 16 }}>{c.icon}</span>
                        <span style={{ fontSize: 12, fontWeight: 600, color: c.color, fontFamily: "'JetBrains Mono', monospace" }}>{c.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              /* FUTURE: Agent-centric layout */
              <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "center" }}>
                {/* Agent Layer */}
                <div style={{
                  padding: "14px 20px", borderRadius: 14,
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                  border: "1px solid #818cf8", textAlign: "center", width: "100%",
                }}>
                  <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "2px", color: "#c7d2fe", marginBottom: 4 }}>
                    🤖 AI Agent Layer
                  </div>
                  <div style={{ fontSize: 13, color: "#e0e7ff" }}>
                    Consumer agents • Brand agents • Service agents • Supplier agents
                  </div>
                </div>

                {/* Protocol Bus */}
                <div style={{
                  width: "100%", padding: "10px 16px", borderRadius: 12,
                  background: "linear-gradient(90deg, #06b6d4, #6366f1, #8b5cf6, #ec4899)",
                  display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap",
                  animation: "pulse 3s ease-in-out infinite",
                }}>
                  {["UCP", "ACP", "MCP", "AP2", "A2A"].map((p) => (
                    <span key={p} style={{
                      fontSize: 11, fontWeight: 700, color: "#ffffff",
                      fontFamily: "'JetBrains Mono', monospace", letterSpacing: "1px",
                    }}>{p}</span>
                  ))}
                </div>

                {/* Components as MCP-connected nodes */}
                <div style={{
                  display: "flex", justifyContent: "center", gap: 8, flexWrap: "wrap", width: "100%",
                  padding: "16px", background: "#ffffff08", borderRadius: 14, border: "1px solid #334155",
                }}>
                  <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.5px", color: "#67e8f9", width: "100%", textAlign: "center", marginBottom: 8 }}>
                    Every Component Exposes MCP Servers
                  </div>
                  {COMPONENTS.map((c) => (
                    <div key={c.id} style={{
                      padding: "8px 14px", borderRadius: 10, background: `${c.color}20`,
                      border: `1px solid ${c.color}50`, display: "flex", alignItems: "center", gap: 6,
                    }}>
                      <span style={{ fontSize: 14 }}>{c.icon}</span>
                      <span style={{ fontSize: 11, fontWeight: 600, color: c.color, fontFamily: "'JetBrains Mono', monospace" }}>{c.label}</span>
                    </div>
                  ))}
                </div>

                <div style={{ fontSize: 11, color: "#94a3b8", textAlign: "center", fontStyle: "italic", lineHeight: 1.5 }}>
                  No more layered hierarchy — agents orchestrate all components simultaneously via protocols
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Protocol Reference (future view) */}
      {view === "future" && (
        <div style={{ padding: "0 24px", maxWidth: 900, margin: "0 auto 24px" }}>
          <button
            onClick={() => setShowProtocols(!showProtocols)}
            style={{
              width: "100%", padding: "14px 20px", borderRadius: 14, border: "1px solid #312e81",
              background: "linear-gradient(135deg, #1e1b4b, #0f172a)", cursor: "pointer",
              display: "flex", justifyContent: "space-between", alignItems: "center",
              fontFamily: "inherit",
            }}
          >
            <span style={{ fontSize: 13, fontWeight: 600, color: "#a5b4fc" }}>
              🔗 Protocol Reference — UCP, ACP, MCP, AP2, A2A, TAP
            </span>
            <span style={{ color: "#6366f1", transform: showProtocols ? "rotate(180deg)" : "none", transition: "0.3s" }}>▾</span>
          </button>
          {showProtocols && (
            <div style={{
              display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 10,
              marginTop: 10, animation: "fadeIn 0.3s ease",
            }}>
              {PROTOCOLS.map((p) => (
                <div key={p.name} style={{
                  background: "#0f172a", border: "1px solid #1e293b", borderRadius: 12, padding: "14px 16px",
                }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 6 }}>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: 14, color: "#67e8f9" }}>{p.name}</span>
                    <span style={{ fontSize: 10, color: "#64748b" }}>{p.by}</span>
                  </div>
                  <div style={{ fontSize: 10, color: "#94a3b8", marginBottom: 6, fontWeight: 500 }}>{p.full}</div>
                  <div style={{ fontSize: 11.5, color: "#cbd5e1", lineHeight: 1.55 }}>{p.desc}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Winners & Losers Summary (future view) */}
      {view === "future" && (
        <div style={{ padding: "0 24px", maxWidth: 900, margin: "0 auto 24px" }}>
          <div style={{
            background: "#ffffff", borderRadius: 20, padding: "24px",
            border: "1px solid #e2e8f0", boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
          }}>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "2px", color: "#6366f1", marginBottom: 16, textAlign: "center" }}>
              Agentic Importance Ranking — Winners & Losers
            </div>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              {/* Winners */}
              <div style={{ flex: 1, minWidth: 200 }}>
                <div style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: "1.5px", color: "#059669", marginBottom: 10, display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ fontSize: 14 }}>▲</span> Winners — Gain Strategic Power
                </div>
                {[...COMPONENTS].filter(c => c.future.verdict === "winner").sort((a,b) => a.future.rank - b.future.rank).map(c => (
                  <div key={c.id} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8, padding: "8px 12px", borderRadius: 10, background: "#f0fdf4", border: "1px solid #bbf7d0" }}>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: 16, color: "#059669", width: 24 }}>#{c.future.rank}</span>
                    <span style={{ fontSize: 16 }}>{c.icon}</span>
                    <div>
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: 13, color: "#065f46" }}>{c.label}</span>
                      <span style={{ fontSize: 11, color: "#047857", marginLeft: 6 }}>{c.future.verdictLabel}</span>
                    </div>
                  </div>
                ))}
              </div>
              {/* Steady */}
              <div style={{ flex: 1, minWidth: 200 }}>
                <div style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: "1.5px", color: "#3b82f6", marginBottom: 10, display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ fontSize: 14 }}>■</span> Steady — Evolve or Stagnate
                </div>
                {[...COMPONENTS].filter(c => c.future.verdict === "stable").sort((a,b) => a.future.rank - b.future.rank).map(c => (
                  <div key={c.id} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8, padding: "8px 12px", borderRadius: 10, background: "#eff6ff", border: "1px solid #bfdbfe" }}>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: 16, color: "#3b82f6", width: 24 }}>#{c.future.rank}</span>
                    <span style={{ fontSize: 16 }}>{c.icon}</span>
                    <div>
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: 13, color: "#1e3a8a" }}>{c.label}</span>
                      <span style={{ fontSize: 11, color: "#2563eb", marginLeft: 6 }}>{c.future.verdictLabel}</span>
                    </div>
                  </div>
                ))}
              </div>
              {/* Losers */}
              <div style={{ flex: 1, minWidth: 200 }}>
                <div style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: "1.5px", color: "#ef4444", marginBottom: 10, display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ fontSize: 14 }}>▼</span> At Risk — Disrupted by Agents
                </div>
                {[...COMPONENTS].filter(c => c.future.verdict === "loser").sort((a,b) => a.future.rank - b.future.rank).map(c => (
                  <div key={c.id} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8, padding: "8px 12px", borderRadius: 10, background: "#fef2f2", border: "1px solid #fecaca" }}>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: 16, color: "#ef4444", width: 24 }}>#{c.future.rank}</span>
                    <span style={{ fontSize: 16 }}>{c.icon}</span>
                    <div>
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: 13, color: "#7f1d1d" }}>{c.label}</span>
                      <span style={{ fontSize: 11, color: "#dc2626", marginLeft: 6 }}>{c.future.verdictLabel}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Component Deep Dives */}
      <div style={{ padding: "0 24px 40px", maxWidth: 900, margin: "0 auto" }}>
        <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "2px", color: "#6366f1", marginBottom: 14, textAlign: "center" }}>
          {view === "today" ? "Stack Components — Tap to explore" : "Ranked by Agentic Importance — Tap to explore"}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {(view === "future" ? [...COMPONENTS].sort((a, b) => a.future.rank - b.future.rank) : COMPONENTS).map((comp, i) => (
            <ComponentCard
              key={comp.id}
              comp={comp}
              expanded={expanded}
              onClick={() => setExpanded(expanded === comp.id ? null : comp.id)}
              view={view}
              rankIndex={i}
            />
          ))}
        </div>
      </div>

      {/* Key Stats Banner */}
      <div style={{
        padding: "24px", maxWidth: 900, margin: "0 auto 32px",
      }}>
        <div style={{
          background: view === "today" ? "linear-gradient(135deg, #1e1b4b, #312e81)" : "linear-gradient(135deg, #0f172a, #1e293b)",
          borderRadius: 20, padding: "24px", border: "1px solid #4338ca",
        }}>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "2px", color: "#a5b4fc", marginBottom: 16, textAlign: "center" }}>
            {view === "today" ? "Market Context" : "The Agentic Commerce Horizon"}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16 }}>
            {view === "today" ? (
              <>
                <StatCard label="PIM Market by 2034" value="$59B" color="#7c3aed" />
                <StatCard label="Architecture Trend" value="Composable" color="#2563eb" />
                <StatCard label="Integration Pattern" value="API-First" color="#059669" />
                <StatCard label="Key Challenge" value="Data Silos" color="#dc2626" />
              </>
            ) : (
              <>
                <StatCard label="Agentic Commerce by 2030" value="$3–5T" color="#6366f1" />
                <StatCard label="MCP SDK Downloads" value="97M+" color="#06b6d4" />
                <StatCard label="AI Traffic Growth (Retail)" value="1,200%" color="#10b981" />
                <StatCard label="AI Conversion Lift" value="+31%" color="#f59e0b" />
              </>
            )}
          </div>
        </div>
      </div>

      {/* Summary */}
      <div style={{ padding: "0 24px 48px", maxWidth: 900, margin: "0 auto" }}>
        <div style={{
          background: "#ffffff", borderRadius: 20, padding: "24px",
          border: "1px solid #e2e8f0", boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
        }}>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "2px", color: "#6366f1", marginBottom: 12 }}>
            {view === "today" ? "The Bottom Line — Today" : "The Bottom Line — What's Coming"}
          </div>
          {view === "today" ? (
            <div style={{ fontSize: 14, lineHeight: 1.7, color: "#334155" }}>
              Today's e-commerce stack is modular and API-first — a major improvement over monolithic platforms. But it's still fundamentally <strong>human-orchestrated</strong>. Data flows between systems via APIs and webhooks, but a person decides what to enrich, when to promote, how to route orders, and what content to publish. The stack is powerful but passive — it waits for instructions.
              <br /><br />
              The architecture follows a layered model: <strong>ERP</strong> and <strong>PIM</strong> form the data foundation, the <strong>Commerce Engine</strong> and <strong>CMS</strong> power the customer experience, and <strong>OMS</strong>, <strong>Promotions</strong>, and <strong>Payments</strong> handle transaction logic. Each component connects via REST/GraphQL APIs, but integration is often fragile and requires ongoing maintenance.
            </div>
          ) : (
            <div style={{ fontSize: 14, lineHeight: 1.7, color: "#334155" }}>
              The agentic future is no longer theoretical — it's live. In March 2026, Shopify flipped the switch: <strong>millions of merchants</strong> can now sell inside ChatGPT, Copilot, Google AI Mode, and Gemini. But look closely at what Shopify actually built: a <strong>catalog syndication layer + payment orchestrator + fulfillment coordinator</strong> — not a traditional storefront. They're escaping the commerce engine, not defending it.
              <br /><br />
              The winners are clear: <strong>PIM</strong> (structured product data is the #1 competitive moat), <strong>OMS</strong> (delivery becomes the agent's tiebreaker), and <strong>Payments</strong> (the trust layer for all agent transactions). The most disrupted: <strong>Commerce Engines</strong> (unbundled by PIM + OMS + Payments + protocols), <strong>Search</strong> (agents reason, they don't search), <strong>CMS</strong> (agents consume data, not pages), and <strong>CRM</strong> (agents become the relationship layer). The new stack isn't layered — it's a <strong>protocol-native mesh</strong> where every component is directly agent-addressable.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, color }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: 26, fontWeight: 700, color, fontFamily: "'JetBrains Mono', monospace" }}>{value}</div>
      <div style={{ fontSize: 11, color: "#a5b4fc", marginTop: 2 }}>{label}</div>
    </div>
  );
}
