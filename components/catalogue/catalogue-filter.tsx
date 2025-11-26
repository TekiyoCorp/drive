"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Container from "@/components/global/container";
import Wrapper from "@/components/global/wrapper";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Search, SlidersHorizontal, X } from "lucide-react";
import LiquidGlass from "../common/liquid-glass";
import { Slider } from "../ui/slider";
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

  if (filters.location) {
    summaries.push(`Localisation ${filters.location}`);
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
  const [mounted, setMounted] = useState(false);
  const [locationSearch, setLocationSearch] = useState(draftFilters.location || "");
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
  const appliedSummaries = getAppliedSummaries(appliedFilters);
  const activeAppliedCount = appliedSummaries.length;

  // Vérifier que nous sommes côté client pour le Portal
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // Synchroniser locationSearch avec draftFilters.location
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLocationSearch(draftFilters.location || "");
  }, [draftFilters.location]);

  const handleRangeClear = (field: CatalogueRangeField) => {
    onRangeChange(field, "min", null);
    onRangeChange(field, "max", null);
  };

  const handleSelectValue = (field: CatalogueSelectField, value: string) => {
    const currentValue = draftFilters[field];
    onSelectOption(field, currentValue === value ? null : value);
  };

  const filteredLocations = options.locations.filter(location =>
    location.toLowerCase().includes(locationSearch.toLowerCase())
  );

  const handleLocationSelect = (location: string) => {
    onSelectOption("location", location);
    setLocationSearch(location);
    setShowLocationSuggestions(false);
  };

  const handleLocationInputChange = (value: string) => {
    setLocationSearch(value);
    setShowLocationSuggestions(true);
    if (!value) {
      onSelectOption("location", null);
    }
  };

  const renderSelectSection = (
    title: string,
    field: CatalogueSelectField,
    values: string[],
    index: number = 0
  ) => {
    if (!values.length) {
      return null;
    }

    return (
      <motion.section
        key={field}
        className="max-w-[500px]"
        style={{ fontFamily: "var(--font-base)", paddingBottom: "24px" }}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 50 }}
        transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
      >
        <div className="flex items-center justify-between gap-4">
          <p className="text-lg font-semibold">{title}</p>
          {draftFilters[field] && (
            <button
              type="button"
              onClick={() => onSelectOption(field, null)}
              className="text-xs capitalize text-white/60 hover:text-white transition-colors"
              style={{ letterSpacing: "-0.06em" }}
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
      </motion.section>
    );
  };

  const renderLocationSection = (index: number = 0) => {
    if (!options.locations.length) {
      return null;
    }

    return (
      <motion.section
        key="location"
        className="max-w-[500px]"
        style={{ fontFamily: "var(--font-base)", paddingBottom: "24px" }}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 50 }}
        transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
      >
        <div className="flex items-center justify-between gap-4">
          <p className="text-lg font-semibold">Localisation</p>
          {draftFilters.location && (
            <button
              type="button"
              onClick={() => {
                onSelectOption("location", null);
                setLocationSearch("");
              }}
              className="text-xs capitalize text-white/60 hover:text-white transition-colors"
              style={{ letterSpacing: "-0.06em" }}
            >
              Effacer
            </button>
          )}
        </div>

        <div className="relative mt-5">
          <LiquidGlass className="border border-white/50 border-x-0 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 h-5 w-5 z-10" />
            <input
              type="text"
              placeholder="Rechercher une ville"
              value={locationSearch || draftFilters.location || ""}
              onChange={(e) => handleLocationInputChange(e.target.value)}
              onFocus={() => setShowLocationSuggestions(true)}
              onBlur={() => {
                // Delay to allow click on suggestion
                setTimeout(() => setShowLocationSuggestions(false), 200);
              }}
              className="h-[39px] outline-none w-full pl-10 pr-4 bg-transparent text-white placeholder:text-white/50"
              style={{ fontFamily: "var(--font-base)" }}
            />
          </LiquidGlass>

          {showLocationSuggestions && filteredLocations.length > 0 && (
            <div className="absolute z-20 w-full mt-2 bg-[#050505]/95 backdrop-blur-[10px] border border-white/20 rounded-lg max-h-[200px] overflow-y-auto">
              {filteredLocations.map((location) => (
                <button
                  key={location}
                  type="button"
                  onClick={() => handleLocationSelect(location)}
                  className="w-full text-left px-4 py-2 hover:bg-white/10 transition-colors text-white"
                  style={{ fontFamily: "var(--font-base)" }}
                >
                  {location}
                </button>
              ))}
            </div>
          )}
        </div>
      </motion.section>
    );
  };

  const renderRangeSection = (
    field: CatalogueRangeField,
    title: string,
    description: string,
    unit?: string,
    suggested?: CatalogueRangeValue,
    index: number = 0
  ) => {
    const currentRange = draftFilters[field];
    const hasValue = currentRange.min !== null || currentRange.max !== null;
    
    // Valeurs pour le slider (min et max de la plage disponible)
    const rangeMin = suggested?.min ?? 0;
    const rangeMax = suggested?.max ?? (field === "price" ? 100000 : field === "year" ? new Date().getFullYear() : 300000);
    const step = field === "price" ? 1000 : field === "year" ? 1 : 1000;
    
    // Valeurs actuelles du slider (utiliser les valeurs du filtre ou les valeurs par défaut)
    const sliderMin = currentRange.min !== null ? currentRange.min : rangeMin;
    const sliderMax = currentRange.max !== null ? currentRange.max : rangeMax;
    
    // Valeur pour le slider (array avec min et max)
    const sliderValue = [sliderMin, sliderMax];

    const handleSliderChange = (values: number[]) => {
      const [newMin, newMax] = values;
      // Si la valeur est égale à la valeur min/max de la plage, on la met à null pour indiquer "pas de filtre"
      // Mais on garde la valeur si elle a été explicitement choisie
      onRangeChange(field, "min", newMin === rangeMin ? null : newMin);
      onRangeChange(field, "max", newMax === rangeMax ? null : newMax);
    };

    // Ajouter padding de 12px pour Budget (price), Année (year) et Kilométrage (km)
    const shouldAddPadding = field === "price" || field === "year" || field === "km";

    return (
      <motion.section
        key={field}
        className="max-w-[500px]"
        style={{ 
          fontFamily: "var(--font-base)",
          ...(shouldAddPadding && { padding: "12px" })
        }}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 50 }}
        transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
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
              className="text-xs capitalize text-white/60 hover:text-white transition-colors"
              style={{ letterSpacing: "-0.06em" }}
            >
              Effacer
            </button>
          )}
        </div>

        <div className="mt-6 space-y-4">
          {/* Affichage des valeurs actuelles */}
          <div className="flex items-center justify-between text-sm text-white/70">
            <div className="flex items-center gap-2">
              <span className="text-white/50">Min:</span>
              <span className="font-medium text-white">
                {numberFormatter.format(sliderMin)}{unit ? ` ${unit}` : ""}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-white/50">Max:</span>
              <span className="font-medium text-white">
                {numberFormatter.format(sliderMax)}{unit ? ` ${unit}` : ""}
              </span>
            </div>
          </div>

          {/* Slider avec deux thumbs (min et max) */}
          <Slider
            value={sliderValue}
            onValueChange={handleSliderChange}
            min={rangeMin}
            max={rangeMax}
            step={step}
            className="w-full"
          />
        </div>
      </motion.section>
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
                          className="px-3 py-1 rounded-full text-xs capitalize"
                          style={{ letterSpacing: "-0.06em" }}
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

      {/* Portal pour sortir du stacking context */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {isPanelOpen && (
              <>
                {/* Backdrop overlay avec blur */}
                <motion.button
                  type="button"
                  aria-label="Fermer les filtres"
                  key="filters-overlay"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="fixed inset-0 bg-black/60 backdrop-blur-[10px] z-[10000]"
                  onClick={onCancelPanel}
                />

                {/* Panel full screen avec slide from right */}
                <motion.div
                  key="filters-panel"
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
                  className="fixed top-0 left-0 right-0 bottom-0 w-screen h-screen bg-[#050505]/40 backdrop-blur-[10px] text-white z-[10001]"
                  style={{
                    fontFamily: "var(--font-base, 'InterDisplay', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, Roboto, sans-serif)",
                    padding: "50px",
                  }}
                >
            <div className="flex flex-col h-full">
              {/* Header avec bouton fermer en haut à droite */}
              <div className="flex items-start justify-end">
                <motion.button
                  type="button"
                  onClick={onCancelPanel}
                  className="p-2 border border-white/20 rounded-full hover:bg-white/10 transition-colors"
                  aria-label="Fermer le panneau de filtres"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  <X className="size-5" />
                </motion.button>
              </div>

              <motion.div 
                className="flex flex-wrap items-center justify-start gap-4 text-sm text-white/70" 
                style={{ fontFamily: "var(--font-base)", marginTop: "12px" }}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <button
                  type="button"
                  onClick={onResetDraftFilters}
                  className="capitalize text-xs text-white/60 hover:text-white transition-colors"
                  style={{ letterSpacing: "-0.06em" }}
                >
                  Réinitialiser
                </button>
              </motion.div>

              <motion.div 
                className="mt-8 flex-1 overflow-y-auto pr-3"
                style={{ paddingBottom: "24px" }}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                <div className="flex flex-col gap-6">
                  {renderSelectSection("Marque", "brand", options.brands, 0)}
                  {renderLocationSection(1)}
                  {renderRangeSection(
                    "price",
                    "Budget",
                    "Définissez une fourchette de prix idéale",
                    "€",
                    options.priceRange,
                    2
                  )}
                  {renderRangeSection(
                    "year",
                    "Année",
                    "Choisissez la période de mise en circulation",
                    undefined,
                    options.yearRange,
                    3
                  )}
                  {renderRangeSection(
                    "km",
                    "Kilométrage",
                    "Limitez le kilométrage parcouru",
                    "km",
                    options.kmRange,
                    4
                  )}
                  {renderSelectSection("Énergie", "energy", options.energies, 5)}
                  {renderSelectSection("Transmission", "transmission", options.transmissions, 6)}
                </div>
              </motion.div>

              {/* Boutons Valider/Annuler en bas à droite en fixed */}
              <div 
                className="fixed bottom-0 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:bottom-10 md:right-10 flex items-center justify-center z-[10002] w-full md:w-auto px-6 py-6 md:px-0 md:py-0" 
                style={{ fontFamily: "var(--font-base)", gap: "24px" }}
              >
                <motion.button
                  type="button"
                  onClick={onCancelPanel}
                  className="text-sm font-medium hover:opacity-70 transition-opacity"
                  style={{ height: "fit-content", width: "fit-content" }}
                  variants={{
                    hidden: { opacity: 0, x: 50 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.4, delay: 1.0 } },
                    exit: { opacity: 0, x: 50, transition: { duration: 0.45, delay: 0, ease: [0.32, 0.72, 0, 1] } }
                  }}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Annuler
                </motion.button>
                <motion.button
                  type="button"
                  onClick={onValidateFilters}
                  disabled={isLoading}
                  className={cn(
                    "text-sm font-semibold transition-all",
                    isLoading
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:opacity-90"
                  )}
                  style={{ 
                    height: "fit-content",
                    paddingLeft: "28px",
                    paddingRight: "28px",
                    paddingTop: "12px",
                    paddingBottom: "12px",
                    borderRadius: "100px",
                    backgroundColor: "white",
                    color: "black"
                  }}
                  variants={{
                    hidden: { opacity: 0, x: 50 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.4, delay: 1.0 } },
                    exit: { opacity: 0, x: 50, transition: { duration: 0.45, delay: 0, ease: [0.32, 0.72, 0, 1] } }
                  }}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isLoading ? "Chargement..." : "Valider"}
                </motion.button>
              </div>
            </div>
          </motion.div>
          </>
        )}
      </AnimatePresence>,
      document.body
      )}
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
    style={{ fontFamily: "var(--font-base)" }}
  >
    {label}
  </button>
);


export default CatalogueFilter;
