import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { AppShell } from "@/components/wazen/AppShell";
import { Button } from "@/components/ui/button";
import {
  AddIcon,
  DeleteIcon,
  EditIcon,
  GainIcon,
  LossIcon,
  MetalsIcon,
  PortfolioIcon,
  PropertyIcon,
  SpinnerIcon,
  StocksIcon,
  ICON_STROKE,
} from "@/components/wazen/icons";
import {
  DisclosurePanel,
  EmptyState,
  Panel,
  StatCard,
} from "@/components/wazen/dashboard/primitives";
import { AssetFormDialog } from "@/components/wazen/assets/AssetFormDialog";
import { useAssetValuations, useAssets, useDeleteAsset } from "@/hooks/use-wazen-assets";
import { useProfile } from "@/hooks/use-wazen-auth";
import { useLivePortfolioValuation } from "@/hooks/use-wazen-market-data";
import type { AssetLiveValuation } from "@/lib/market-data.functions";
import {
  annualRentOf,
  canOwnAssets,
  costBasis,
  gainOf,
  gainPercentOf,
  marketValue,
  portfolioSeries,
  portfolioTotals,
  unitOf,
  valuationsFor,
} from "@/lib/assets";
import type { Asset, AssetKind } from "@/lib/assets";
import { formatDate, formatMoney } from "@/lib/finance";
import { useWazenLocale } from "@/components/wazen/WazenLocale";

export const Route = createFileRoute("/_authenticated/assets")({
  head: () => ({
    meta: [
      { title: "Assets & portfolio — Wazen" },
      {
        name: "description",
        content:
          "Track the shares, gold, silver and property you own in Wazen, with purchase prices, current value, gain or loss and rental income.",
      },
      { property: "og:title", content: "Assets & portfolio — Wazen" },
      {
        property: "og:description",
        content:
          "Track the shares, gold, silver and property you own in Wazen, with purchase prices, current value, gain or loss and rental income.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AssetsPage,
});

const KIND_ORDER: AssetKind[] = ["stock", "gold", "silver", "real_estate"];

const KIND_META: Record<
  AssetKind,
  { key: "kindStock" | "kindGold" | "kindSilver" | "kindRealEstate"; icon: typeof StocksIcon }
> = {
  stock: { key: "kindStock", icon: StocksIcon },
  gold: { key: "kindGold", icon: MetalsIcon },
  silver: { key: "kindSilver", icon: MetalsIcon },
  real_estate: { key: "kindRealEstate", icon: PropertyIcon },
};

function AssetsPage() {
  const { t, locale } = useWazenLocale();
  const { data: profile, isLoading: profileLoading } = useProfile();
  const assets = useAssets();
  const valuations = useAssetValuations();
  const remove = useDeleteAsset();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Asset | null>(null);

  const currency = profile?.base_currency ?? "KWD";
  const allowed = canOwnAssets(profile?.life_stage);
  const rows = assets.data ?? [];
  const history = valuations.data ?? [];
  const liveValuation = useLivePortfolioValuation(rows);
  const liveMap = new Map<string, AssetLiveValuation>();
  for (const item of liveValuation.data ?? []) {
    liveMap.set(item.id, item);
  }
  const totals = portfolioTotals(rows, liveValuation.data);

  if (profileLoading || assets.isLoading || valuations.isLoading) {
    return (
      <AppShell>
        <div className="flex min-h-[40vh] items-center justify-center">
          <SpinnerIcon className="size-6 animate-spin text-muted-foreground" />
        </div>
      </AppShell>
    );
  }

  if (!allowed) {
    return (
      <AppShell>
        <Panel title={t("assets")}>
          <EmptyState
            icon={<PortfolioIcon className="size-5" strokeWidth={ICON_STROKE} />}
            title={t("assetsNotAvailable")}
            description={t("assetsSubtitle")}
          />
        </Panel>
      </AppShell>
    );
  }

  const series = portfolioSeries(rows, history).map((point) => ({
    label: new Intl.DateTimeFormat(locale, { month: "short", year: "2-digit" }).format(
      new Date(`${point.date}T00:00:00`),
    ),
    value: Number(point.value.toFixed(3)),
  }));

  async function onRemove(asset: Asset) {
    if (!window.confirm(t("confirmRemoveAsset"))) return;
    try {
      await remove.mutateAsync(asset.id);
      toast.success(t("assetRemoved"));
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t("somethingWentWrong"));
    }
  }

  return (
    <AppShell>
      <div className="space-y-8 wazen-enter">
        <section className="wazen-card">
          <p className="wazen-label">{t("portfolio")}</p>
          <h1 className="mt-3 text-3xl sm:text-4xl">{t("assets")}</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">{t("assetsSubtitle")}</p>
          {rows.some((a) => a.kind === "stock" || a.kind === "gold" || a.kind === "silver") ? (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {liveValuation.isLoading ? (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/50 px-2.5 py-1 text-xs text-muted-foreground">
                  <SpinnerIcon className="size-3 animate-spin text-muted-foreground" />
                  {t("updatingMarketRates")}
                </span>
              ) : liveValuation.isError ? (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/50 px-2.5 py-1 text-xs text-muted-foreground">
                  <span className="size-1.5 rounded-full bg-muted-foreground/60" />
                  {t("liveRatesUnavailable")}
                </span>
              ) : totals.hasLiveValuation ? (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-chart-2/30 bg-chart-2/10 px-2.5 py-1 text-xs font-medium text-chart-2">
                  <span className="size-1.5 rounded-full bg-chart-2 animate-pulse" />
                  {t("liveValuationActive")}
                </span>
              ) : null}
            </div>
          ) : null}
          <div className="mt-6">
            <Button
              onClick={() => {
                setEditing(null);
                setDialogOpen(true);
              }}
            >
              <AddIcon className="size-4" strokeWidth={ICON_STROKE} />
              {t("addAsset")}
            </Button>
          </div>
        </section>

        <div className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 sm:gap-4 lg:grid-cols-4">
          <StatCard
            label={t("totalAssetValue")}
            amount={totals.value}
            currency={currency}
            hint={totals.hasLiveValuation ? t("liveMarketValue") : t("notSpendable")}
            className="min-[420px]:col-span-2 lg:col-span-1"
            icon={<PortfolioIcon className="size-4" strokeWidth={ICON_STROKE} />}
          />
          <StatCard label={t("investedAmount")} amount={totals.cost} currency={currency} />
          <StatCard
            label={t("unrealisedGain")}
            amount={totals.gain}
            currency={currency}
            tone={totals.gain >= 0 ? "positive" : "negative"}
            hint={`${totals.gainPercent.toFixed(1)}%`}
          />
          <StatCard
            label={t("annualRentalIncome")}
            amount={totals.annualRentalIncome}
            currency={currency}
            tone="gold"
          />
        </div>

        <Panel title={t("portfolioTrend")}>
          {series.length < 2 ? (
            <EmptyState
              icon={<PortfolioIcon className="size-5" strokeWidth={ICON_STROKE} />}
              title={t("noAssets")}
              description={t("noAssetsDescription")}
            />
          ) : (
            <div className="h-52 w-full min-w-0 sm:h-56">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={series} margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
                  <XAxis
                    dataKey="label"
                    tickLine={false}
                    axisLine={false}
                    fontSize={10}
                    interval="preserveStartEnd"
                    minTickGap={24}
                  />
                  <YAxis hide />
                  <Tooltip
                    formatter={(value) => formatMoney(Number(value), currency)}
                    contentStyle={{
                      borderRadius: "0.75rem",
                      border: "1px solid var(--border)",
                      background: "var(--card)",
                      color: "var(--card-foreground)",
                      fontSize: "0.8rem",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="var(--chart-1)"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </Panel>

        {rows.length === 0 ? (
          <Panel title={t("assets")}>
            <EmptyState
              icon={<PortfolioIcon className="size-5" strokeWidth={ICON_STROKE} />}
              title={t("noAssets")}
              description={t("noAssetsDescription")}
            />
          </Panel>
        ) : (
          KIND_ORDER.filter((kind) => rows.some((asset) => asset.kind === kind)).map((kind) => {
            const meta = KIND_META[kind];
            const Icon = meta.icon;
            return (
              <Panel
                key={kind}
                title={t(meta.key)}
                action={<Icon className="size-5 text-muted-foreground" strokeWidth={ICON_STROKE} />}
              >
                <ul className="grid gap-4">
                  {rows
                    .filter((asset) => asset.kind === kind)
                    .map((asset) => (
                      <AssetRow
                        key={asset.id}
                        asset={asset}
                        history={valuationsFor(history, asset.id)}
                        live={liveMap.get(asset.id)}
                        isLiveLoading={liveValuation.isLoading}
                        onEdit={() => {
                          setEditing(asset);
                          setDialogOpen(true);
                        }}
                        onRemove={() => onRemove(asset)}
                      />
                    ))}
                </ul>
              </Panel>
            );
          })
        )}
      </div>

      <AssetFormDialog
        open={dialogOpen}
        asset={editing}
        currency={currency}
        onClose={() => {
          setDialogOpen(false);
          setEditing(null);
        }}
      />
    </AppShell>
  );
}

function AssetRow({
  asset,
  history,
  live,
  isLiveLoading,
  onEdit,
  onRemove,
}: {
  asset: Asset;
  history: { valued_on: string; unit_value: number }[];
  live?: AssetLiveValuation;
  isLiveLoading?: boolean;
  onEdit: () => void;
  onRemove: () => void;
}) {
  const { t } = useWazenLocale();
  const unit = unitOf(asset.kind);
  const isMarketKind = asset.kind === "stock" || asset.kind === "gold" || asset.kind === "silver";
  const isLive = Boolean(live?.priceAvailable && live.liveMarketValue !== null);
  const effectiveMarketValue =
    isLive && live?.liveMarketValue !== null ? live.liveMarketValue : marketValue(asset);
  const effectiveCostBasis = costBasis(asset);
  const effectiveGain = isLive && live?.gain !== null ? live.gain : gainOf(asset);
  const effectiveGainPercent =
    isLive && live?.gainPercent !== null ? live.gainPercent : gainPercentOf(asset);
  const effectiveUnitPrice =
    isLive && live?.liveUnitPrice !== null ? live.liveUnitPrice : Number(asset.current_unit_value);
  const positive = effectiveGain >= 0;
  const points = history.map((row) => ({ label: row.valued_on, value: Number(row.unit_value) }));

  return (
    <li className="rounded-2xl border border-border bg-secondary/35 p-5">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
        <div className="min-w-0">
          <p className="break-words text-base flex flex-wrap items-center gap-1.5">
            <span>{asset.name}</span>
            {asset.symbol ? (
              <span className="text-xs text-muted-foreground">{asset.symbol}</span>
            ) : null}
            {isLive ? (
              <span className="inline-flex items-center gap-1 rounded-full border border-chart-2/30 bg-chart-2/10 px-2 py-0.5 text-[10px] font-medium text-chart-2">
                <span className="size-1.5 rounded-full bg-chart-2 animate-pulse" />
                {t("liveRates")}
              </span>
            ) : isLiveLoading && isMarketKind ? (
              <span className="inline-flex items-center gap-1 text-[10px] text-muted-foreground">
                <SpinnerIcon className="size-3 animate-spin text-muted-foreground" />
              </span>
            ) : isMarketKind ? (
              <span className="inline-flex items-center gap-1 rounded-full border border-border bg-secondary/60 px-2 py-0.5 text-[10px] text-muted-foreground">
                {t("recordedRate")}
              </span>
            ) : null}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {unit === "property"
              ? (asset.property_type ?? t("kindRealEstate"))
              : unit === "grams"
                ? `${Number(asset.quantity)} g${asset.purity ? ` · ${asset.purity}` : ""}`
                : `${Number(asset.quantity)} × ${formatMoney(Number(asset.unit_cost), asset.currency)}`}
            {" · "}
            {t("purchaseDate")}: {formatDate(asset.purchase_date)}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={onEdit}
            aria-label={t("editAsset")}
            title={t("editAsset")}
          >
            <EditIcon className="size-4" strokeWidth={ICON_STROKE} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onRemove}
            aria-label={t("deleteAsset")}
            title={t("deleteAsset")}
          >
            <DeleteIcon className="size-4" strokeWidth={ICON_STROKE} />
          </Button>
        </div>
      </div>

      <DisclosurePanel
        title={t("valueHistory")}
        summary={formatMoney(effectiveMarketValue, asset.currency)}
        className="mt-4"
      >
        <dl className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 lg:grid-cols-4">
          <Cell
            label={t("investedAmount")}
            value={formatMoney(effectiveCostBasis, asset.currency)}
          />
          <Cell
            label={t("totalAssetValue")}
            value={formatMoney(effectiveMarketValue, asset.currency)}
          />
          <Cell
            label={t("unrealisedGain")}
            value={`${formatMoney(effectiveGain, asset.currency)} · ${effectiveGainPercent.toFixed(1)}%`}
            tone={positive ? "positive" : "negative"}
            icon={
              positive ? (
                <GainIcon className="size-3.5" strokeWidth={ICON_STROKE} />
              ) : (
                <LossIcon className="size-3.5" strokeWidth={ICON_STROKE} />
              )
            }
          />
          {asset.kind === "real_estate" ? (
            <Cell
              label={t("annualRentalIncome")}
              value={formatMoney(annualRentOf(asset), asset.currency)}
            />
          ) : (
            <Cell
              label={
                unit === "grams"
                  ? t("currentValueGram")
                  : unit === "shares"
                    ? t("currentValueShare")
                    : t("currentValueProperty")
              }
              value={formatMoney(effectiveUnitPrice, asset.currency)}
            />
          )}
        </dl>

        {points.length > 1 ? (
          <div className="mt-4">
            <p className="wazen-label">{t("valueHistory")}</p>
            <div className="mt-2 h-16 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={points} margin={{ top: 4, right: 4, left: 4, bottom: 0 }}>
                  <Tooltip
                    formatter={(value) => formatMoney(Number(value), asset.currency)}
                    labelFormatter={(label) => formatDate(String(label))}
                    contentStyle={{
                      borderRadius: "0.75rem",
                      border: "1px solid var(--border)",
                      background: "var(--card)",
                      color: "var(--card-foreground)",
                      fontSize: "0.75rem",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke={positive ? "var(--chart-2)" : "var(--destructive)"}
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        ) : null}

        {live?.notes ? (
          <p className="mt-3 text-xs text-muted-foreground font-mono bg-secondary/50 rounded-lg px-3 py-1.5 inline-block">
            {live.notes}
          </p>
        ) : null}

        {asset.notes ? <p className="mt-3 text-xs text-muted-foreground">{asset.notes}</p> : null}
      </DisclosurePanel>
    </li>
  );
}

function Cell({
  label,
  value,
  tone,
  icon,
}: {
  label: string;
  value: string;
  tone?: "positive" | "negative";
  icon?: React.ReactNode;
}) {
  const toneClass =
    tone === "positive" ? "text-chart-2" : tone === "negative" ? "text-destructive" : "";
  return (
    <div className="min-w-0">
      <dt className="wazen-label">{label}</dt>
      <dd
        className={`wazen-number mt-1 flex min-w-0 items-center gap-1.5 break-words text-sm ${toneClass}`}
      >
        {icon}
        {value}
      </dd>
    </div>
  );
}
