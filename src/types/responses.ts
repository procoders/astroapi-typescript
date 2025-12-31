import type { components } from './generated/api';
import type {
  ActivePointType,
  KeywordsCategory,
  LifeAreasLanguage,
  Subject,
} from './requests';

type Schemas = components['schemas'];

export type PlanetaryPosition = Schemas['PlanetaryPosition'];

export interface PlanetaryPositionsResponse {
  positions: PlanetaryPosition[];
}

export type HouseCusp = Schemas['HouseCusp'];

export type Aspect = Schemas['Aspect'];

export interface ChartData {
  planetary_positions: PlanetaryPosition[];
  house_cusps: HouseCusp[];
  aspects: Aspect[];
  fixed_stars?: Record<string, unknown> | null;
}

export type LunarMetricsResponse = Schemas['LunarMetricsResponse'];

export type CompositeChartResponse = Schemas['CompositeChartResponse'];

export type SynastryChartResponse = Schemas['SynastryChartResponse'];


export type SunSignWeeklyHoroscopeResponse = Record<string, unknown>;

export type SunSignMonthlyHoroscopeResponse = Record<string, unknown>;

export type SunSignYearlyHoroscopeResponse = Record<string, unknown>;

export type HoroscopeTextResponse = Record<string, unknown>;

export type ChineseHoroscopeResponse = Record<string, unknown>;
export type BaZiResponse = Record<string, unknown>;
export type ChineseCompatibilityResponse = Record<string, unknown>;
export type LuckPillarsResponse = Record<string, unknown>;
export type MingGuaResponse = Record<string, unknown>;
export type ChineseElementsResponse = Record<string, unknown>;
export type ChineseSolarTermsResponse = Record<string, unknown>;
export type ChineseYearlyForecastResponse = Record<string, unknown>;
export type ChineseZodiacResponse = Record<string, unknown>;
export type EclipseUpcomingResponse = Schemas['EclipseUpcomingResponse'];
export type EclipseNatalCheckResponse = Schemas['EclipseNatalCheckResponse'];
export type EclipseInterpretationResponse = Schemas['EclipseInterpretationResponse'];
export type LunarPhasesResponse = Record<string, unknown>;
export type LunarEventsResponse = Record<string, unknown>;
export type LunarMansionsResponse = Record<string, unknown>;
export type VoidOfCourseResponse = Record<string, unknown>;
export type LunarCalendarResponse = Record<string, unknown>;
export type NumerologyCoreResponse = Record<string, unknown>;
export type NumerologyComprehensiveResponse = Record<string, unknown>;
export type NumerologyCompatibilityResponse = Record<string, unknown>;
export type TarotGlossaryResponse = Schemas['TarotGlossaryResponse'];
export type TarotReportResponse = Schemas['TarotReportResponse'];
export type TreeOfLifeResponse = Schemas['TreeOfLifeResponse'];
export type QuintessenceResponse = Schemas['QuintessenceResponse'];
export type ElementalDignitiesResponse = Schemas['ElementalDignitiesResponse'];
export type TimingAnalysisResponse = Schemas['TimingAnalysisResponse'];
export type OptimalTimesResponse = Schemas['OptimalTimesResponse'];
export type TarotTransitReportResponse = Schemas['TransitReportResponse'];
export type TarotNatalReportResponse = Schemas['app__api__v3__schemas__tarot_models__NatalReportResponse'];
export type TarotSynastryReportResponse = Schemas['app__api__v3__schemas__tarot_models__SynastryReportResponse'];
export type TarotDrawResponse = Record<string, unknown>;
export type TarotDailyCardResponse = Record<string, unknown>;
export type TarotCardSearchResponse = Record<string, unknown>;
export type TarotCardDetailResponse = Record<string, unknown>;
export type BirthCardResponse = Schemas['BirthCardResponse'];
export type PetPersonalityResponse = Schemas['PetPersonalityResponse'];
export type PetCompatibilityResponse = Schemas['PetCompatibilityResponse'];
export type PetTrainingWindowsResponse = Schemas['PetTrainingWindowsResponse'];
export type PetHealthSensitivitiesResponse = Schemas['PetHealthSensitivitiesResponse'];
export type MultiPetDynamicsResponse = Schemas['MultiPetDynamicsResponse'];
export type InsightsResponse = Record<string, unknown>;
export type MarketTimingResponse = Record<string, unknown>;
export type PersonalTradingResponse = Record<string, unknown>;
export type GannAnalysisResponse = Record<string, unknown>;
export type BradleySiderographResponse = Record<string, unknown>;
export type CryptoTimingResponse = Record<string, unknown>;
export type ForexTimingResponse = Record<string, unknown>;
export type BusinessInsightsResponse = Record<string, unknown>;
export type SvgString = string;
export type FixedStarsPositionsResponse = Record<string, unknown>;
export type FixedStarsConjunctionsResponse = Record<string, unknown>;
export type FixedStarsReportResponse = Record<string, unknown>;
export type FixedStarsPresetsResponse = Record<string, unknown>;
export type GlobalAnalysisResponse = Schemas['GlobalAnalysisResponse'];
export type PersonalAnalysisResponse = Schemas['PersonalAnalysisResponse'];

export type TransitChartResponse = Schemas['TransitChartResponse'];

export type SolarReturnChartResponse = Schemas['SolarReturnChartResponse'];

export type LunarReturnChartResponse = Schemas['LunarReturnChartResponse'];

export type SolarReturnTransitChartResponse = Schemas['SolarReturnTransitChartResponse'];

export type LunarReturnTransitChartResponse = Schemas['LunarReturnTransitChartResponse'];

export type ProgressionChartResponse = Schemas['ProgressionChartResponse'];

export type DirectionChartResponse = Schemas['DirectionChartResponse'];

export type NatalTransitChartResponse = Schemas['NatalTransitChartResponse'];

export type TransitEvent = Schemas['TransitEvent'];

export type InterpretedTransitEvent = Schemas['InterpretedTransitEvent'];

export interface Interpretation {
  title: string;
  text: string;
}

export interface ReportInterpretation {
  factor: string;
  text: string;
}

export interface ReportSection {
  title: string;
  interpretations: ReportInterpretation[];
}

export interface NatalChartResponse {
  subject_data: Record<string, unknown>;
  chart_data: ChartData;
}

export interface NatalReportResponse {
  subject: Record<string, unknown>;
  interpretations: Interpretation[];
}

export interface SynastryReportResponse {
  report_title: string;
  sections: ReportSection[];
}

export interface ActivePoint {
  id: string;
  description: string;
  type: ActivePointType;
  strength?: number | null;
  [key: string]: unknown;
}

export interface ActivePointsResponse {
  items: ActivePoint[];
  [key: string]: unknown;
}

export type PrimaryActivePointsResponse = ActivePointsResponse;

export interface CountryReference {
  name: string;
  iso: string;
  capital?: string | null;
  population?: number | null;
  continent?: string | null;
  currency?: string | null;
  [key: string]: unknown;
}

export interface CountriesResponse {
  items: CountryReference[];
  total?: number;
  [key: string]: unknown;
}

export interface ElementReference {
  id: string;
  description: string;
  [key: string]: unknown;
}

export interface ElementsResponse {
  items: ElementReference[];
  [key: string]: unknown;
}

export interface FixedStarReference {
  id: string;
  description: string;
  [key: string]: unknown;
}

export interface FixedStarsResponse {
  items: FixedStarReference[];
  [key: string]: unknown;
}

export interface HouseSystemReference {
  id: string;
  description: string;
  [key: string]: unknown;
}

export interface HouseSystemsResponse {
  items: HouseSystemReference[];
  [key: string]: unknown;
}

export interface HouseInfo {
  number: number;
  name: string;
  themes?: string[];
  primary_theme?: string | null;
  life_areas?: string[];
  traditional_meaning?: string;
  modern_keywords?: string[];
  [key: string]: unknown;
}

export interface AvailableHouseSystem {
  code: string;
  name: string;
  description: string;
  category?: string | null;
  usage?: string | null;
  is_default?: boolean;
  [key: string]: unknown;
}

export interface HousesResponse {
  house_system: string;
  houses: HouseInfo[];
  available_systems?: AvailableHouseSystem[];
  [key: string]: unknown;
}

export interface KeywordCollection {
  id: string;
  name: string;
  keywords: string[];
  total_keywords?: number;
  [key: string]: unknown;
}

export interface KeywordsResponse {
  category: KeywordsCategory;
  total_concepts?: number;
  keywords: KeywordCollection[];
  [key: string]: unknown;
}

export interface LanguageReference {
  id: string;
  description: string;
  [key: string]: unknown;
}

export interface LanguagesResponse {
  items: LanguageReference[];
  [key: string]: unknown;
}

export interface LifeArea {
  id: string;
  name: string;
  description: string;
  keywords?: string[];
  category?: string;
  emoji?: string | null;
  primary_planets?: string[];
  secondary_planets?: string[];
  primary_houses?: number[];
  secondary_houses?: number[];
  preferred_lines?: string[];
  strength_weight?: number;
  [key: string]: unknown;
}

export interface LifeAreasResponse {
  language: LifeAreasLanguage;
  total_areas: number;
  life_areas: LifeArea[];
  [key: string]: unknown;
}

export interface ThemeReference {
  id: string;
  description: string;
  [key: string]: unknown;
}

export interface ThemesResponse {
  items: ThemeReference[];
  [key: string]: unknown;
}

export type TraditionalAnalysisResponse = Record<string, unknown>;
export type DignitiesAnalysisResponse = Record<string, unknown>;
export type TraditionalLotsResponse = Record<string, unknown>;
export type ProfectionsAnalysisResponse = Record<string, unknown>;
export type AnnualProfectionResponse = Record<string, unknown>;
export type ProfectionTimelineResponse = Record<string, unknown>;
export type TraditionalGlossaryResponse = Record<string, unknown>;
export type TraditionalCapabilitiesResponse = Record<string, unknown>;

export interface ZodiacTypeReference {
  id: string;
  description: string;
  [key: string]: unknown;
}

export interface ZodiacTypesResponse {
  items: ZodiacTypeReference[];
  [key: string]: unknown;
}

export type AstrocartographyLinesResponse = Schemas['AstrocartographyLinesResponse'];
export type AstrocartographyMapResponse = Schemas['AstrocartographyMapResponse'];
export type ParanMapResponse = Schemas['ParanMapResponse'];
export type LocationAnalysisResponse = Schemas['LocationAnalysisResponse'];
export type CompareLocationsResponse = Schemas['CompareLocationsResponse'];
export type PowerZonesResponse = Schemas['PowerZonesResponse'];
export type LineMeaningsResponse = Schemas['LineMeaningsResponse'];
export type SearchLocationsResponse = Schemas['SearchLocationsResponse'];
export type RelocationChartResponse = Schemas['RelocationChartResponse'];
export type SupportedFeaturesResponse = Schemas['SupportedFeaturesResponse'];

export type CompositeReportResponse = Schemas['CompositeReportResponse'];
export type RelationshipScoreResponse = Schemas['RelationshipScoreResponse'];
export type NatalTransitReportResponse = Schemas['NatalTransitReportResponse'];
export type ProgressionReportResponse = Schemas['ProgressionReportResponse'];
export type DirectionReportResponse = Schemas['DirectionReportResponse'];
export type LunarReturnReportResponse = Schemas['LunarReturnReportResponse'];
export type SolarReturnReportResponse = Schemas['SolarReturnReportResponse'];
export type LunarReturnTransitReportResponse = Schemas['LunarReturnTransitReportResponse'];
export type SolarReturnTransitReportResponse = Schemas['SolarReturnTransitReportResponse'];
export type LunarAnalysisResponse = Schemas['LunarAnalysisResponse'];

export interface LifeAreaInsight {
  area: string;
  title: string;
  prediction: string;
  rating: number;
  keywords?: string[];
  reasoning?: string;
}

export interface PlanetaryInfluence {
  planet: string;
  aspect_type: string;
  description: string;
  strength: number;
  natal_planet?: string;
  aspect_name?: string;
  orb?: number;
  reasoning?: string;
}

export interface LuckyElements {
  colors?: string[];
  numbers?: number[];
  stones?: string[];
  directions?: string[];
  times?: string[];
}

export interface MoonInsight {
  phase: string;
  sign: string;
  prediction: string;
  illumination?: number;
}

export interface PersonalDailyHoroscopeResponse {
  date: string;
  overall_theme: string;
  overall_rating: number;
  life_areas: LifeAreaInsight[];
  planetary_influences: PlanetaryInfluence[];
  lucky_elements?: LuckyElements;
  moon?: MoonInsight;
  tips?: string[];
}

export interface CityDetails {
  name: string;
  country_code: string;
  latitude: number;
  longitude: number;
  population: number;
  timezone?: string | null;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  limit: number;
  offset: number;
}

export type CountryInfo = CountryReference;

export interface GlossaryItem {
  id: string;
  description: string;
}

export type HouseSystemInfo = AvailableHouseSystem;

export type KeywordEntry = KeywordCollection;

export type LifeAreaDetails = LifeArea;

export type EnhancedPlanetaryPosition = Schemas['EnhancedPlanetaryPosition'];

export interface DignityOverview {
  dignified_planets?: string[];
  debilitated_planets?: string[];
  mutual_receptions?: Array<{
    planet1: string;
    planet2: string;
    reception_type?: string;
    strength?: string;
  }>;
}

export interface SectInfo {
  is_day_chart?: boolean;
  sect?: string | null;
  sect_ruler?: string | null;
  benefic_in_sect?: string | null;
  malefic_out_of_sect?: string | null;
}

export interface TraditionalPointPosition {
  sign: string;
  degree: number;
  absolute_longitude: number;
  house?: number | null;
}

export interface EnhancedPositionsResponse {
  positions: EnhancedPlanetaryPosition[];
  dignity_overview?: DignityOverview;
  sect_info?: SectInfo;
  traditional_points?: Record<string, TraditionalPointPosition>;
  [key: string]: unknown;
}

export type EnhancedAspect = Schemas['EnhancedAspect'];

export interface AspectsResponse {
  aspects: Aspect[];
}

export interface EnhancedAspectsResponse {
  aspects: EnhancedAspect[];
  reception_summary?: Record<string, unknown>;
  strongest_aspects?: Array<Record<string, unknown>>;
  mutual_receptions?: Array<Record<string, unknown>>;
  sect_overview?: Record<string, unknown>;
  [key: string]: unknown;
}

export interface HouseCuspsResponse {
  house_cusps: HouseCusp[];
}

export type GlobalPositionsResponse = PlanetaryPositionsResponse;

export interface NextAspectInfo {
  planet: string;
  aspect_type: string;
  hours_until: number;
  exact_time: string;
}

export interface PhaseInfo {
  phase_name: string;
  illumination_percent: number;
  moon_age_days: number;
  elongation_deg?: number;
  increasing_light?: boolean;
  void_of_course?: boolean;
  next_aspect?: NextAspectInfo | null;
}

export interface ElectionalGuidance {
  favorable_for?: string[];
  avoid_for?: string[];
  timing_quality?: string;
}

export interface LunarTriplicityDetails {
  is_in_triplicity?: boolean;
  ruler_primary?: string | null;
  ruler_secondary?: string | null;
  ruler_participant?: string | null;
  active_ruler?: string | null;
}

export interface LunarDignities {
  current_sign?: string;
  domicile?: boolean;
  exaltation?: boolean;
  exile?: boolean;
  fall?: boolean;
  triplicity?: LunarTriplicityDetails | null;
  term?: string | null;
  decan?: string | null;
  dignity_strength?: string | null;
}

export interface LunarNextSignChange {
  hours_until?: number;
  next_sign?: string;
  dignity_change?: string | null;
  timing_improvement?: string | null;
}

export interface TraditionalTiming {
  lunar_mansion?: string | null;
  mansion_number?: number | null;
  mansion_nature?: string | null;
  best_activities?: string[];
}

export interface TimingWindow {
  window_start: string;
  window_end: string;
  duration_hours: number;
  trigger: string;
  quality: string;
  best_for?: string[];
}

export interface EnhancedLunarMetricsResponse {
  phase_info: PhaseInfo;
  void_of_course: boolean;
  void_until?: string | null;
  void_duration_hours?: number | null;
  traditional_phase_meaning?: string;
  electional_guidance?: ElectionalGuidance;
  lunar_dignities?: LunarDignities;
  next_sign_change?: LunarNextSignChange;
  traditional_timing?: TraditionalTiming;
  upcoming_windows?: TimingWindow[];
  [key: string]: unknown;
}

export type CurrentMomentResponse = Subject;

