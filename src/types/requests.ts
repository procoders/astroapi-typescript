import { AxiosRequestConfig } from 'axios';
import type { components } from './generated/api';

type Schemas = components['schemas'];

export type Language =
  | 'en'
  | 'es'
  | 'fr'
  | 'de'
  | 'it'
  | 'pt'
  | 'ru'
  | 'zh'
  | 'ja'
  | 'hi'
  | 'uk'
  | 'tr';

export type Tradition =
  | 'universal'
  | 'classical'
  | 'psychological'
  | 'event_oriented'
  | 'vedic'
  | 'chinese';

export type ReportTradition =
  | 'universal'
  | 'psychological'
  | 'event_oriented'
  | 'classical';

export type HouseSystem = 'P' | 'W' | 'K' | 'A' | 'R' | 'C' | 'O' | 'M' | 'B' | 'E' | 'V' | 'X' | 'H' | 'T' | 'G';

export type ZodiacType = 'Tropic' | 'Sidereal';

export type PerspectiveType = 'geocentric' | 'heliocentric' | 'draconic' | 'barycentric';

export type DetailLevel = 'basic' | 'standard' | 'full' | 'professional';

export type FixedStarPreset = 'essential' | 'traditional' | 'behenian' | 'extended';

export interface FixedStarsConfig {
  presets?: FixedStarPreset[];
  custom_orbs?: Record<string, number> | null;
  include_parans?: boolean;
  include_heliacal?: boolean;
  include_interpretations?: boolean;
}

export interface DateTimeLocation {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second?: number;
  latitude?: number | null;
  longitude?: number | null;
  city?: string | null;
  country_code?: string | null;
  timezone?: string | null;
}

export interface BirthData {
  year: number;
  month?: number | null;
  day?: number | null;
  hour?: number | null;
  minute?: number | null;
  second?: number | null;
  city?: string | null;
  country_code?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  timezone?: string | null;
}

export interface Subject {
  name?: string | null;
  birth_data: BirthData;
  email?: string | null;
  notes?: string | null;
}

export interface ChartOptions {
  house_system?: HouseSystem;
  zodiac_type?: ZodiacType;
  active_points?: string[];
  precision?: number;
  return_year?: number | null;
  return_date?: string | null;
  target_date?: string | null;
  perspective?: PerspectiveType | null;
  fixed_stars?: FixedStarsConfig | null;
}

export interface ReportOptions {
  tradition?: ReportTradition;
  language?: Language;
}

export interface DataOptions {
  house_system?: HouseSystem;
  language?: Language;
  tradition?: Tradition;
  perspective?: PerspectiveType;
  detail_level?: DetailLevel;
  include_interpretations?: boolean;
  include_raw_data?: boolean;
  use_cache?: boolean;
  precision_mode?: boolean;
  zodiac_type?: ZodiacType;
  active_points?: string[];
  precision?: number;
}

export interface StandardOptions {
  house_system?: HouseSystem;
  language?: Language;
  tradition?: Tradition;
  zodiac_type?: ZodiacType;
  active_points?: string[];
  precision?: number;
  perspective?: PerspectiveType;
}

export type ActivePointType =
  | 'planet'
  | 'lunar-node'
  | 'angle'
  | 'special-point'
  | 'asteroid'
  | 'fixed-star';

export type PrimaryActivePointType = Exclude<ActivePointType, 'fixed-star'>;

export interface ActivePointsQuery {
  type?: ActivePointType;
}

export interface PrimaryActivePointsQuery {
  type?: PrimaryActivePointType;
}

export interface HousesRequest {
  house_system?: HouseSystem;
}

export type KeywordsCategory = 'planets' | 'lines' | 'houses' | 'aspects' | 'themes';

export interface KeywordsRequest {
  category?: KeywordsCategory;
}

export type LifeAreasLanguage = 'en' | 'de' | 'fr' | 'es' | 'ru';

export interface LifeAreasRequest {
  language?: LifeAreasLanguage;
}

export type AstrocartographyOptions = Schemas['AstrocartographyOptions'];
export type VisualOptions = Schemas['VisualOptions'];
export type MapRegion = Schemas['MapRegion'];
export type LocationInput = Schemas['LocationInput'];
export type SearchCriteria = Schemas['SearchCriteria'];
export type LocationFilters = Schemas['LocationFilters'];
export type AstrocartographyLinesRequest = Schemas['AstrocartographyLinesRequest'];
export type AstrocartographyMapRequest = Schemas['AstrocartographyMapRequest'];
export type ParanMapRequest = Schemas['ParanMapRequest'];
export type LocationAnalysisRequest = Schemas['LocationAnalysisRequest'];
export type CompareLocationsRequest = Schemas['CompareLocationsRequest'];
export type PowerZonesRequest = Schemas['PowerZonesRequest'];
export type SearchLocationsRequest = Schemas['SearchLocationsRequest'];
export type RelocationChartRequest = Schemas['RelocationChartRequest'];
export type RelocationOptions = Schemas['RelocationOptions'];
export type ChineseSubject = Schemas['ChineseSubject'];
export type ChineseBirthData = Schemas['ChineseBirthData'];
export type BaZiRequest = Schemas['BaZiRequest'];
export type MultipleSubjectsRequest = Schemas['MultipleSubjectsRequest'];
export type SingleSubjectRequest = Schemas['SingleSubjectRequest'];
export type PetOptions = Schemas['PetOptions'];
export type PetSingleSubjectRequest = Schemas['PetSingleSubjectRequest'];
export type PetCompatibilityRequest = Schemas['PetCompatibilityRequest'];
export type PetMultiSubjectRequest = Schemas['PetMultiSubjectRequest'];
export type MarketTimingRequest = Schemas['MarketTimingRequest'];
export type CryptoTimingRequest = Schemas['CryptoTimingRequest'];
export type BradleySiderographRequest = Schemas['BradleySiderographRequest'];
export type ForexTimingRequest =
  Schemas['Body_analyze_forex_timing_api_v3_insights_financial_forex_timing_post'];
export type BusinessMultipleRequest = Schemas['BusinessMultipleRequest'];
export type BusinessSingleRequest = Schemas['BusinessSingleRequest'];
export type BusinessTimingRequest =
  Schemas['Body_calculate_business_timing_api_v3_insights_business_business_timing_post'];
export type GannAnalysisRequest =
  Schemas['Body_calculate_gann_cycles_api_v3_insights_financial_gann_analysis_post'];
export type NatalChartSVGRequest = Schemas['NatalChartSVGRequest'];
export type SynastryChartSVGRequest = Schemas['SynastryChartSVGRequest'];
export type CompositeChartSVGRequest = Schemas['CompositeChartSVGRequest'];
export type TransitChartSVGRequest = Schemas['TransitChartSVGRequest'];
export type SVGOptions = Schemas['SVGOptions'];
export type GlobalAnalysisRequest = Schemas['GlobalAnalysisRequest'];
export type PersonalAnalysisRequest = Schemas['PersonalAnalysisRequest'];
export type LuckPillarsRequest = Schemas['LuckPillarsRequest'];
export type ChineseYearlyRequest = Schemas['ChineseYearlyRequest'];
export type EclipseNatalCheckRequest = Schemas['EclipseNatalCheckRequest'];
export type EclipseInterpretationRequest = Schemas['EclipseInterpretationRequest'];
export type LunarPhasesRequest = Schemas['LunarPhasesRequest'];
export type LunarEventsRequest = Schemas['LunarEventsRequest'];
export type LunarMansionsRequest = Schemas['LunarMansionsRequest'];
export type VoidOfCourseRequest = Schemas['VoidOfCourseRequest'];

export interface UpcomingEclipsesParams {
  count?: number;
}

export interface LunarCalendarParams {
  month?: number | null;
}

export interface DataRequest {
  subject: Subject;
  options?: DataOptions | null;
}

export type PlanetaryPositionsRequest = DataRequest;

export interface GlobalDataRequest {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
  options?: DataOptions | null;
}

export interface LunarMetricsRequest {
  datetime_location: DateTimeLocation;
  language?: Language;
}

export interface SimpleDate {
  year: number;
  month: number;
  day: number;
}

export interface DateRange {
  start_date: SimpleDate;
  end_date: SimpleDate;
}

export interface NatalChartRequest {
  subject: Subject;
  options?: ChartOptions | null;
}

export interface CompositeChartRequest {
  subject1: Subject;
  subject2: Subject;
  options?: ChartOptions | null;
}

export interface SynastryChartRequest {
  subject1: Subject;
  subject2: Subject;
  options?: ChartOptions | null;
}

export interface TransitChartRequest {
  natal_subject: Subject;
  transit_datetime: DateTimeLocation;
  options?: ChartOptions | null;
  orbs?: Record<string, unknown> | null;
}

export interface SolarReturnRequest {
  subject: Subject;
  return_year: number;
  return_location?: DateTimeLocation | null;
  options?: ChartOptions | null;
}

export interface LunarReturnRequest {
  subject: Subject;
  return_date: string;
  return_location?: DateTimeLocation | null;
  options?: ChartOptions | null;
}

export type ProgressionType = 'secondary' | 'primary' | 'tertiary' | 'minor';

export interface ProgressionRequest {
  subject: Subject;
  target_date: string;
  progression_type: ProgressionType;
  location?: DateTimeLocation | null;
  options?: ChartOptions | null;
}

export type DirectionType = 'solar_arc' | 'symbolic' | 'profection' | 'naibod';

export interface DirectionRequest {
  subject: Subject;
  target_date: string;
  direction_type: DirectionType;
  arc_rate?: number | null;
  options?: ChartOptions | null;
}

export interface SolarReturnTransitRequest extends SolarReturnRequest {
  date_range: DateRange;
  orb: number;
  report_options?: ReportOptions | null;
}

export interface LunarReturnTransitRequest extends LunarReturnRequest {
  date_range: DateRange;
  orb: number;
  report_options?: ReportOptions | null;
}

export interface NatalTransitRequest {
  subject: Subject;
  date_range?: DateRange | null;
  orb: number;
  report_options?: ReportOptions | null;
}

export type SunSign =
  | 'Aries'
  | 'Taurus'
  | 'Gemini'
  | 'Cancer'
  | 'Leo'
  | 'Virgo'
  | 'Libra'
  | 'Scorpio'
  | 'Sagittarius'
  | 'Capricorn'
  | 'Aquarius'
  | 'Pisces'
  | 'Ari'
  | 'Tau'
  | 'Gem'
  | 'Can'
  | 'Vir'
  | 'Lib'
  | 'Sco'
  | 'Sag'
  | 'Cap'
  | 'Aqu'
  | 'Pis';

export type HoroscopeTextFormat = 'paragraph' | 'bullets' | 'short' | 'long';

export interface SunSignHoroscopeRequest {
  sign: SunSign;
  date: string;
  language?: Language;
  tradition?: ReportTradition;
  minimum_strength?: number;
}

export interface SunSignWeeklyHoroscopeRequest {
  sign: SunSign;
  start_date?: string | null;
  language?: Language;
  tradition?: ReportTradition;
}

export interface SunSignMonthlyHoroscopeRequest {
  sign: SunSign;
  month?: string | null;
  year?: number | null;
  language?: Language;
  tradition?: ReportTradition;
}

export interface SunSignYearlyHoroscopeRequest {
  sign: SunSign;
  year?: number | null;
  language?: Language;
  tradition?: ReportTradition;
}

export interface TextHoroscopeRequest {
  sign: SunSign;
  date?: string | null;
  language?: Language;
  tradition?: ReportTradition;
  format?: HoroscopeTextFormat;
  use_emoji?: boolean;
}

export interface TextWeeklyHoroscopeRequest {
  sign: SunSign;
  start_date?: string | null;
  language?: Language;
  tradition?: ReportTradition;
  format?: HoroscopeTextFormat;
  use_emoji?: boolean;
}

export interface TextMonthlyHoroscopeRequest {
  sign: SunSign;
  month?: string | null;
  year?: number | null;
  language?: Language;
  tradition?: ReportTradition;
  format?: HoroscopeTextFormat;
  use_emoji?: boolean;
}

export interface PersonalTextHoroscopeRequest {
  subject: Subject;
  date?: string | null;
  language?: Language;
  tradition?: ReportTradition;
  format?: HoroscopeTextFormat;
  use_emoji?: boolean;
}

export interface ChineseHoroscopeSubject {
  name?: string | null;
  birth_data: {
    year: number;
    month?: number | null;
    day?: number | null;
    hour?: number | null;
    minute?: number | null;
    gender?: 'male' | 'female' | null;
  };
}

export interface ChineseHoroscopeRequest {
  subject: ChineseHoroscopeSubject;
  year?: number | null;
  language?: Language;
}

export interface NatalReportRequest {
  subject: Subject;
  tradition?: ReportTradition;
  language?: Language;
  fixed_stars?: FixedStarsConfig | null;
}

export interface SynastryReportRequest {
  subject1: Subject;
  subject2: Subject;
  options?: ChartOptions | null;
  report_options?: ReportOptions | null;
  fixed_stars?: FixedStarsConfig | null;
}

export interface CompositeReportRequest {
  subject1: Subject;
  subject2: Subject;
  options?: ChartOptions | null;
  report_options?: ReportOptions | null;
  fixed_stars?: FixedStarsConfig | null;
}

export interface TraditionalAnalysisRequest {
  subject: Subject;
  options?: ChartOptions | null;
  orbs?: Record<string, unknown> | null;
}

export interface AnnualProfectionRequest {
  subject: Subject;
  current_date?: string | null;
  current_age?: number | null;
}

export interface ProfectionTimelineRequest {
  subject: Subject;
  start_age: number;
  end_age: number;
}

export interface FixedStarsPositionsRequest {
  subject: Subject;
  fixed_stars: FixedStarsConfig;
}

export interface FixedStarsConjunctionsRequest extends FixedStarsPositionsRequest {
  include_oppositions?: boolean;
}

export type FixedStarsReportRequest = FixedStarsPositionsRequest;

export interface CompatibilityRequest {
  subjects?: Subject[] | null;
  options?: StandardOptions | null;
  compatibility_options?: Record<string, unknown> | null;
}

export interface PersonalTradingOptions {
  trading_style?: string | null;
  analysis_period_days?: number | null;
  include_lunar_cycles?: boolean | null;
  language?: Language | null;
}

export interface PersonalTradingRequest {
  subject?: Subject | null;
  options?: PersonalTradingOptions | null;
  birth_data?: BirthData | null;
  analysis_period_days?: number | null;
  include_lunar_cycles?: boolean | null;
  trading_style?: string | null;
  language?: Language | null;
}

export interface ProgressionReportRequest extends ProgressionRequest {
  report_options?: ReportOptions | null;
}

export interface DirectionReportRequest extends DirectionRequest {
  report_options?: ReportOptions | null;
}

export interface LunarReturnReportRequest extends LunarReturnRequest {
  report_options?: ReportOptions | null;
}

export interface SolarReturnReportRequest extends SolarReturnRequest {
  report_options?: ReportOptions | null;
}

export interface LunarAnalysisRequest {
  datetime_location: DateTimeLocation;
  tradition?: string;
  language?: string;
}

export interface RelationshipAnalysisRequest {
  subjects: [Subject, Subject, ...Subject[]];
  options?: StandardOptions | null;
  report_options?: ReportOptions | null;
}

export interface CitySearchParams {
  search?: string;
  country_code?: string;
  sort_by?: 'population' | 'name';
  sort_order?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
}

export interface GlossaryRequestConfig {
  params?: CitySearchParams;
  signal?: AbortSignal;
  axiosOptions?: AxiosRequestConfig;
}

export interface PersonalizedHoroscopeRequest {
  subject: Subject;
  date?: string | null;
  horoscope_type?: 'daily' | 'weekly' | 'monthly' | 'yearly';
  language?: Language;
  tradition?: ReportTradition;
  include_transits?: boolean;
  house_system?: HouseSystem;
  include_progressions?: boolean;
  minimum_strength?: number;
}

export type DrawCardsRequest = Schemas['DrawCardsRequest'];
export type TarotReportRequest = Schemas['TarotReportRequest'];
export type TreeOfLifeRequest = Schemas['TreeOfLifeRequest'];
export type QuintessenceRequest = Schemas['QuintessenceRequest'];
export type ElementalDignitiesRequest = Schemas['ElementalDignitiesRequest'];
export type TimingAnalysisRequest = Schemas['TimingAnalysisRequest'];
export type OptimalTimesRequest = Schemas['OptimalTimesRequest'];
export type TarotTransitReportRequest = Schemas['TransitReportRequest'];
export type TarotNatalReportRequest = Schemas['app__api__v3__schemas__tarot_models__NatalReportRequest'];
export type BirthCardFlexibleRequest = Schemas['BirthCardFlexibleRequest'];

export interface TarotGlossaryParams {
  arcana?: string | null;
  suit?: string | null;
  element?: string | null;
  planet?: string | null;
  sign?: string | null;
  house?: number | null;
}

export interface TarotCardSearchParams {
  keyword?: string | null;
  life_area?: string | null;
  element?: string | null;
  planet?: string | null;
  sign?: string | null;
  arcana?: string | null;
  page?: number;
  page_size?: number;
}

export interface DailyCardParams {
  user_id: string;
  life_area?: string | null;
  birth_year?: number | null;
  birth_month?: number | null;
  birth_day?: number | null;
  birth_hour?: number | null;
  birth_minute?: number | null;
  city?: string | null;
  country_code?: string | null;
}

export type SupportedRequest =
  | PlanetaryPositionsRequest
  | LunarMetricsRequest
  | NatalChartRequest
  | CompositeChartRequest
  | SynastryChartRequest
  | TransitChartRequest
  | SolarReturnRequest
  | LunarReturnRequest
  | ProgressionRequest
  | DirectionRequest
  | SolarReturnTransitRequest
  | LunarReturnTransitRequest
  | NatalTransitRequest
  | BaZiRequest
  | MultipleSubjectsRequest
  | LuckPillarsRequest
  | ChineseYearlyRequest
  | SingleSubjectRequest
  | EclipseNatalCheckRequest
  | EclipseInterpretationRequest
  | LunarPhasesRequest
  | LunarEventsRequest
  | LunarMansionsRequest
  | VoidOfCourseRequest
  | SunSignHoroscopeRequest
  | SunSignWeeklyHoroscopeRequest
  | SunSignMonthlyHoroscopeRequest
  | SunSignYearlyHoroscopeRequest
  | TextHoroscopeRequest
  | TextWeeklyHoroscopeRequest
  | TextMonthlyHoroscopeRequest
  | PersonalTextHoroscopeRequest
  | ChineseHoroscopeRequest
  | NatalReportRequest
  | SynastryReportRequest
  | CompositeReportRequest
  | CompatibilityRequest
  | AstrocartographyLinesRequest
  | AstrocartographyMapRequest
  | ParanMapRequest
  | LocationAnalysisRequest
  | CompareLocationsRequest
  | PowerZonesRequest
  | SearchLocationsRequest
  | RelocationChartRequest
  | ProgressionReportRequest
  | DirectionReportRequest
  | LunarReturnReportRequest
  | SolarReturnReportRequest
  | LunarAnalysisRequest
  | RelationshipAnalysisRequest
  | PersonalizedHoroscopeRequest
  | TraditionalAnalysisRequest
  | AnnualProfectionRequest
  | ProfectionTimelineRequest
  | PetSingleSubjectRequest
  | PetCompatibilityRequest
  | PetMultiSubjectRequest
  | MarketTimingRequest
  | CryptoTimingRequest
  | BradleySiderographRequest
  | ForexTimingRequest
  | BusinessMultipleRequest
  | BusinessSingleRequest
  | BusinessTimingRequest
  | GannAnalysisRequest
  | PersonalTradingRequest
  | NatalChartSVGRequest
  | SynastryChartSVGRequest
  | CompositeChartSVGRequest
  | TransitChartSVGRequest
  | GlobalAnalysisRequest
  | PersonalAnalysisRequest;

