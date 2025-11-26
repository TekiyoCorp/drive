"use client";

import Container from "@/components/global/container";
import Wrapper from "@/components/global/wrapper";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { SlidersHorizontal, X } from "lucide-react";
import LiquidGlass from "../common/liquid-glass";
import {
  CatalogueFilterOptionsSummary,
  CatalogueFiltersState,
  CatalogueRangeField,
  CatalogueRangeValue,
  CatalogueSelectField,
} from "./filter-config";

interface CatalogueFilterProps {
  appliedFilters: CatalogueFiltersState;
  draftFilters: CatalogueFiltersState;
  isPanelOpen: boolean;
  isLoading: boolean;
  options: CatalogueFilterOptionsSummary;
  onOpenPanel: () => void;
  onCancelPanel: () => void;
  onValidateFilters: () => void;
  onSelectOption: (field: CatalogueSelectField, value: string | null) => void;
  onRangeChange: (field: CatalogueRangeField, boundary: "min" | "max", value: number | null) => void;
  onResetDraftFilters: () => void;
}

const numberFormatter = new Intl.NumberFormat("fr-FR");

const formatNumericValue = (value: number, unit?: string) => {
  const suffix = unit ? ` ${unit}` : "";
  return `${numberFormatter.format(value)}${suffix}`;
};

const formatRangeSummary = (label: string, range: CatalogueRangeValue, unit?: string) => {
  const { min, max } = range;
  if (min === null && max === null) {
    return null;
  }

  if (min !== null && max !== null) {
    return `${label} ${formatNumericValue(min, unit)} - ${formatNumericValue(max, unit)}`;
  }

  if (min !== null) {
    return `${label} ≥ ${formatNumericValue(min, unit)}`;
  }

  return `${label} ≤ ${formatNumericValue(max as number, unit)}`;
};

const getAppliedSummaries = (filters: CatalogueFiltersState) => {
  const summaries: string[] = [];

  if (filters.brand) {
    summaries.push(`Marque ${filters.brand}`);
  }

  if (filters.energy) {
    summaries.push(`Énergie ${filters.energy}`);
  }

  if (filters.transmission) {
    summaries.push(`Transmission ${filters.transmission}`);
  }

  const priceSummary = formatRangeSummary("Budget", filters.price, "€");
  if (priceSummary) {
    summaries.push(priceSummary);
  }

  const yearSummary = formatRangeSummary("Année", filters.year);
  if (yearSummary) {
    summaries.push(yearSummary);
  }

  const kmSummary = formatRangeSummary("KM", filters.km, "km");
  if (kmSummary) {
    summaries.push(kmSummary);
  }

  return summaries;
};

const PANEL_TOP_OFFSET = 96;

const CatalogueFilter = ({
  appliedFilters,
  draftFilters,
  isPanelOpen,
  isLoading,
  options,
  onOpenPanel,
  onCancelPanel,
  onValidateFilters,
  onSelectOption,
  onRangeChange,
  onResetDraftFilters,
}: CatalogueFilterProps) => {
  const appliedSummaries = getAppliedSummaries(appliedFilters);
  const activeAppliedCount = appliedSummaries.length;

  const handleRangeClear = (field: CatalogueRangeField) => {
    onRangeChange(field, "min", null);
    onRangeChange(field, "max", null);
  };

  const handleSelectValue = (field: CatalogueSelectField, value: string) => {
    const currentValue = draftFilters[field];
    onSelectOption(field, currentValue === value ? null : value);
  };

  const renderSelectSection = (
    title: string,
    field: CatalogueSelectField,
    values: string[]
  ) => {
    if (!values.length) {
      return null;
    }

    return (
      <section
        key={field}
        className="border border-white/10 rounded-3xl p-6 bg-white/[0.02]"
      >
        <div className="flex items-center justify-between gap-4">
          <p className="text-lg font-semibold">{title}</p>
          {draftFilters[field] && (
            <button
              type="button"
              onClick={() => onSelectOption(field, null)}
              className="text-xs uppercase tracking-[0.2em] text-white/60 hover:text-white transition-colors"
            >
              Effacer
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-3 mt-5">
          <FilterChip
            label="Tous"
            selected={!draftFilters[field]}
            onClick={() => onSelectOption(field, null)}
          />
          {values.map(value => (
            <FilterChip
              key={`${field}-${value}`}
              label={value}
              selected={draftFilters[field] === value}
              onClick={() => handleSelectValue(field, value)}
            />
          ))}
        </div>
      </section>
    );
  };

  const renderRangeSection = (
    field: CatalogueRangeField,
    title: string,
    description: string,
    unit?: string,
    suggested?: CatalogueRangeValue
  ) => {
    const currentRange = draftFilters[field];
    const hasValue = currentRange.min !== null || currentRange.max !== null;

    return (
      <section
        key={field}
        className="border border-white/10 rounded-3xl p-6 bg-white/[0.02]"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-lg font-semibold">{title}</p>
            <p className="text-sm text-white/70 mt-1">
              {description}
            </p>
          </div>
          {hasValue && (
            <button
              type="button"
              onClick={() => handleRangeClear(field)}
              className="text-xs uppercase tracking-[0.2em] text-white/60 hover:text-white transition-colors"
            >
              Effacer
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <RangeInput
            label="Min"
            unit={unit}
            value={currentRange.min}
            placeholder={suggested?.min}
            onChange={value => onRangeChange(field, "min", value)}
          />
          <RangeInput
            label="Max"
            unit={unit}
            value={currentRange.max}
            placeholder={suggested?.max}
            onChange={value => onRangeChange(field, "max", value)}
          />
        </div>
      </section>
    );
  };

  return (
    <>
      <Wrapper className="flex items-center justify-between w-full !px-0">
        <Container animation="fadeRight" delay={0.1} className="w-full">
          <LiquidGlass className="border border-white/40 rounded-[40px] !w-full !items-start">
            <button
              type="button"
              onClick={onOpenPanel}
              className="flex flex-row items-center justify-between gap-4 text-base font-medium px-8 py-4 w-full"
            >
              <div className="flex items-center gap-3">
                <SlidersHorizontal className="size-5" />
                <span>Filtres</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-white/70">
                {activeAppliedCount > 0 ? (
                  <>
                    <span>{activeAppliedCount} actif(s)</span>
                    <div className="flex flex-wrap gap-2 max-w-[280px] justify-end">
                      {appliedSummaries.slice(0, 3).map(summary => (
                        <span
                          key={summary}
                          className="px-3 py-1 rounded-full border border-white/30 text-xs uppercase tracking-wide"
                        >
                          {summary}
                        </span>
                      ))}
                      {activeAppliedCount > 3 && (
                        <span className="text-xs text-white/50">
                          +{activeAppliedCount - 3}
                        </span>
                      )}
                    </div>
                  </>
                ) : (
                  <span>Affinez votre recherche</span>
                )}
              </div>
            </button>
          </LiquidGlass>
        </Container>
      </Wrapper>

      <AnimatePresence>
        {isPanelOpen && (
          <motion.button
            type="button"
            aria-label="Fermer les filtres"
            key="filters-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 bottom-0 bg-black/60 backdrop-blur-[10px] z-[9998]"
            style={{
              top: `${PANEL_TOP_OFFSET}px`,
              height: `calc(100vh - ${PANEL_TOP_OFFSET}px)`,
            }}
            onClick={onCancelPanel}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isPanelOpen && (
          <motion.div
            key="filters-panel"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
            className="fixed inset-x-0 bottom-0 right-0 w-full bg-[#050505]/95 z-[9999] text-white"
            style={{
              padding: "50px",
              top: `${PANEL_TOP_OFFSET}px`,
              height: `calc(100vh - ${PANEL_TOP_OFFSET}px)`,
            }}
          >
            <div className="flex flex-col h-full">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-white/50">
                    Filtres catalogue
                  </p>
                  <h1 className="text-[36px] leading-[44px] font-semibold mt-2">
                    Affinez votre sélection
                  </h1>
                </div>
                <button
                  type="button"
                  onClick={onCancelPanel}
                  className="p-2 border border-white/20 rounded-full hover:bg-white/10 transition-colors"
                >
                  <X className="size-5" />
                </button>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 mt-8 text-sm text-white/70">
                <p>
                  Sélectionnez des filtres pour mettre à jour le catalogue en temps réel.
                </p>
                <button
                  type="button"
                  onClick={onResetDraftFilters}
                  className="uppercase tracking-[0.3em] text-xs text-white/60 hover:text-white transition-colors"
                >
                  Réinitialiser
                </button>
              </div>

              <div className="mt-8 flex-1 overflow-y-auto pr-3 pb-6">
                <div className="flex flex-col gap-6">
                  {renderSelectSection("Marque", "brand", options.brands)}
                  {renderRangeSection(
                    "price",
                    "Budget",
                    "Définissez une fourchette de prix idéale",
                    "€",
                    options.priceRange
                  )}
                  {renderRangeSection(
                    "year",
                    "Année",
                    "Choisissez la période de mise en circulation",
                    undefined,
                    options.yearRange
                  )}
                  {renderRangeSection(
                    "km",
                    "Kilométrage",
                    "Limitez le kilométrage parcouru",
                    "km",
                    options.kmRange
                  )}
                  {renderSelectSection("Énergie", "energy", options.energies)}
                  {renderSelectSection("Transmission", "transmission", options.transmissions)}
                </div>
              </div>

              <div className="mt-auto pt-10 flex items-center justify-end gap-4">
                <button
                  type="button"
                  onClick={onCancelPanel}
                  className="px-6 py-3 rounded-full border border-white/30 text-sm font-medium hover:bg-white/10 transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="button"
                  onClick={onValidateFilters}
                  disabled={isLoading}
                  className={cn(
                    "px-8 py-3 rounded-full text-sm font-semibold transition-colors",
                    isLoading
                      ? "bg-white/60 text-black/70 cursor-not-allowed"
                      : "bg-white text-black hover:bg-white/90"
                  )}
                >
                  {isLoading ? "Chargement..." : "Valider"}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

interface FilterChipProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

const FilterChip = ({ label, selected, onClick }: FilterChipProps) => (
  <button
    type="button"
    onClick={onClick}
    className={cn(
      "px-4 py-2 rounded-full border text-sm transition-colors",
      selected
        ? "bg-white text-black border-white"
        : "border-white/20 text-white hover:border-white/60"
    )}
  >
    {label}
  </button>
);

interface RangeInputProps {
  label: string;
  value: number | null;
  placeholder?: number | null;
  unit?: string;
  onChange: (value: number | null) => void;
}

const RangeInput = ({ label, value, placeholder, unit, onChange }: RangeInputProps) => {
  const placeholderText =
    placeholder !== null && placeholder !== undefined
      ? numberFormatter.format(placeholder)
      : undefined;

  return (
    <label className="flex flex-col gap-2 text-sm text-white/60">
      <span>{label}</span>
      <div className="relative">
        <input
          type="number"
          inputMode="numeric"
          value={value ?? ""}
          onChange={(event) => {
            const rawValue = event.target.value;
            if (rawValue === "") {
              onChange(null);
              return;
            }
            const parsed = Number(rawValue);
            onChange(Number.isNaN(parsed) ? null : parsed);
          }}
          className="w-full bg-white/5 border border-white/20 rounded-2xl px-4 py-3 text-base text-white placeholder:text-white/30 focus:border-white/60 focus:outline-none"
          placeholder={placeholderText}
        />
        {unit && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 text-sm pointer-events-none">
            {unit}
          </span>
        )}
      </div>
    </label>
  );
};

export default CatalogueFilter;
