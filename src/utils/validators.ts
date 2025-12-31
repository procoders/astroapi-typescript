/* c8 ignore file */
import {
  ActivePointType,
  ActivePointsQuery,
  AstrocartographyLinesRequest,
  AstrocartographyMapRequest,
  AstrocartographyOptions,
  AstrologyClientConfig,
  BaZiRequest,
  BirthData,
  BirthCardFlexibleRequest,
  BradleySiderographRequest,
  BusinessMultipleRequest,
  BusinessSingleRequest,
  BusinessTimingRequest,
  CompositeChartSVGRequest,
  ChineseHoroscopeRequest,
  ChineseHoroscopeSubject,
  ChineseSubject,
  ChineseYearlyRequest,
  CitySearchParams,
  CompareLocationsRequest,
  CompatibilityRequest,
  CompositeReportRequest,
  DailyCardParams,
  DateRange,
  DateTimeLocation,
  DirectionReportRequest,
  DirectionType,
  DrawCardsRequest,
  ElementalDignitiesRequest,
  CryptoTimingRequest,
  ForexTimingRequest,
  FixedStarsConjunctionsRequest,
  FixedStarsConfig,
  FixedStarPreset,
  FixedStarsPositionsRequest,
  FixedStarsReportRequest,
  GlobalDataRequest,
  HoroscopeTextFormat,
  HouseSystem,
  HousesRequest,
  KeywordsCategory,
  KeywordsRequest,
  LifeAreasLanguage,
  LifeAreasRequest,
  LocationAnalysisRequest,
  LocationFilters,
  LocationInput,
  LuckPillarsRequest,
  LunarCalendarParams,
  LunarEventsRequest,
  LunarAnalysisRequest,
  LunarReturnReportRequest,
  LunarReturnTransitRequest,
  LunarMansionsRequest,
  LunarPhasesRequest,
  MapRegion,
  MarketTimingRequest,
  MultipleSubjectsRequest,
  NatalReportRequest,
  NatalTransitRequest,
  GlobalAnalysisRequest,
  NatalChartSVGRequest,
  AnnualProfectionRequest,
  OptimalTimesRequest,
  PersonalTradingRequest,
  PersonalAnalysisRequest,
  ParanMapRequest,
  PersonalTextHoroscopeRequest,
  PersonalizedHoroscopeRequest,
  PetCompatibilityRequest,
  PetMultiSubjectRequest,
  PetOptions,
  PetSingleSubjectRequest,
  PowerZonesRequest,
  PrimaryActivePointType,
  PrimaryActivePointsQuery,
  ProfectionTimelineRequest,
  ProgressionReportRequest,
  ProgressionType,
  GannAnalysisRequest,
  QuintessenceRequest,
  RelocationChartRequest,
  RelocationOptions,
  RelationshipAnalysisRequest,
  SearchCriteria,
  SearchLocationsRequest,
  SimpleDate,
  SingleSubjectRequest,
  SynastryChartSVGRequest,
  SolarReturnReportRequest,
  SolarReturnTransitRequest,
  Subject,
  SunSign,
  SunSignHoroscopeRequest,
  SunSignMonthlyHoroscopeRequest,
  SunSignWeeklyHoroscopeRequest,
  SunSignYearlyHoroscopeRequest,
  SynastryChartRequest,
  SynastryReportRequest,
  TarotCardSearchParams,
  TarotGlossaryParams,
  TarotNatalReportRequest,
  TarotReportRequest,
  TarotTransitReportRequest,
  TreeOfLifeRequest,
  TextHoroscopeRequest,
  TextMonthlyHoroscopeRequest,
  TextWeeklyHoroscopeRequest,
  TimingAnalysisRequest,
  TraditionalAnalysisRequest,
  TransitChartSVGRequest,
  UpcomingEclipsesParams,
  VisualOptions,
  VoidOfCourseRequest,
  EclipseNatalCheckRequest,
  EclipseInterpretationRequest,
  SVGOptions,
} from '../types';
import { AstrologyError } from '../errors/AstrologyError';

const YEAR_RANGE: [number, number] = [1900, 2100];
const ISO_DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;
const DIRECTION_TYPE_SET = new Set<DirectionType>(['solar_arc', 'symbolic', 'profection', 'naibod']);
const PROGRESSION_TYPE_SET = new Set<ProgressionType>(['secondary', 'primary', 'tertiary', 'minor']);
const MONTH_PATTERN = /^\d{4}-(0[1-9]|1[0-2])$/;
const SUN_SIGN_SET = new Set<SunSign>([
  'Aries',
  'Taurus',
  'Gemini',
  'Cancer',
  'Leo',
  'Virgo',
  'Libra',
  'Scorpio',
  'Sagittarius',
  'Capricorn',
  'Aquarius',
  'Pisces',
  'Ari',
  'Tau',
  'Gem',
  'Can',
  'Vir',
  'Lib',
  'Sco',
  'Sag',
  'Cap',
  'Aqu',
  'Pis',
]);
const HOROSCOPE_TEXT_FORMATS = new Set<HoroscopeTextFormat>(['paragraph', 'bullets', 'short', 'long']);
const CHINESE_GENDERS = new Set(['male', 'female']);
const ACTIVE_POINT_TYPE_SET = new Set<ActivePointType>([
  'planet',
  'lunar-node',
  'angle',
  'special-point',
  'asteroid',
  'fixed-star',
]);
const PRIMARY_ACTIVE_POINT_TYPE_SET = new Set<PrimaryActivePointType>([
  'planet',
  'lunar-node',
  'angle',
  'special-point',
  'asteroid',
]);
const HOUSE_SYSTEM_CODES = new Set<HouseSystem>(['P', 'W', 'K', 'A', 'R', 'C', 'B', 'M', 'O', 'E', 'V', 'X', 'H', 'T', 'G']);
const KEYWORDS_CATEGORY_SET = new Set<KeywordsCategory>(['planets', 'lines', 'houses', 'aspects', 'themes']);
const LIFE_AREAS_LANGUAGES = new Set<LifeAreasLanguage>(['en', 'de', 'fr', 'es', 'ru']);
const CITY_SORT_BY_VALUES = new Set<CitySearchParams['sort_by']>(['population', 'name']);
const SORT_ORDER_VALUES = new Set<NonNullable<CitySearchParams['sort_order']>>(['asc', 'desc']);
const ASTRO_LINE_TYPES = new Set(['AC', 'MC', 'DS', 'IC']);
const CITY_SELECTION_ALGORITHMS = new Set(['round_robin', 'population', 'distance']);
const MAP_PROJECTIONS = new Set(['mercator', 'robinson', 'mollweide', 'equirectangular']);
const LEGEND_POSITIONS = new Set(['distributed', 'right', 'bottom']);
const CITY_LABEL_STYLES = new Set(['emoji', 'text', 'both']);
const LINE_LABEL_STYLES = new Set(['inline', 'legend', 'both']);
const COLOR_SCHEMES = new Set(['planetary', 'monochrome', 'custom']);
const LIFE_AREA_VALUES = new Set([
  'identity',
  'health',
  'finance',
  'career',
  'love',
  'relationships',
  'creativity',
  'spirituality',
  'home',
  'learning',
  'communication',
  'travel',
  'overall',
]);
const CHINESE_LANGUAGES = new Set(['en', 'fr', 'pt', 'it', 'zh', 'es', 'ru', 'tr', 'de', 'hi', 'uk']);
const BAZI_TRADITIONS = new Set(['classical', 'modern', 'simplified']);
const BAZI_ANALYSIS_DEPTH = new Set(['basic', 'standard', 'comprehensive', 'professional']);
const CHINESE_ANIMALS = new Set([
  'rat',
  'ox',
  'tiger',
  'rabbit',
  'dragon',
  'snake',
  'horse',
  'goat',
  'monkey',
  'rooster',
  'dog',
  'pig',
]);
const LUNAR_MANSION_SYSTEMS = new Set(['arabian_tropical', 'vedic_sidereal', 'chinese_sidereal']);
const TAROT_TRADITIONS = new Set(['universal', 'psychological', 'classical', 'hermetic']);
const TAROT_INTERPRETATION_DEPTHS = new Set(['keywords', 'basic', 'detailed', 'professional']);
const FIXED_STAR_PRESETS = new Set<FixedStarPreset>(['essential', 'traditional', 'behenian', 'extended']);
const NUMEROLOGY_SYSTEMS = new Set(['pythagorean', 'chaldean', 'both']);
const NUMEROLOGY_ANALYSIS_TYPES = new Set(['romantic', 'business', 'friendship']);
const BUSINESS_ACTIVITIES = new Set(['product_launch', 'meetings', 'negotiations', 'hiring', 'restructuring']);
const TRADING_STYLE_VALUES = new Set(['day_trading', 'swing', 'swing_trading', 'position_trading', 'investment']);
const FOREX_SESSIONS = new Set(['sydney', 'tokyo', 'london', 'newyork']);
const BRADLEY_PERIODS = new Set(['yearly', 'quarterly', 'monthly']);
const BRADLEY_MARKETS = new Set(['stocks', 'crypto', 'forex', 'commodities']);
const SVG_THEMES = new Set(['light', 'dark', 'dark-high-contrast', 'classic']);
const SVG_LANGUAGES = new Set(['en', 'fr', 'pt', 'it', 'zh', 'es', 'ru', 'tr', 'de', 'hi', 'uk']);
const ORB_MIN_MAX: [number, number] = [0, 10];

const ensureNumberInRange = (value: number | null | undefined, [min, max]: [number, number], field: string) => {
  if (value === null || value === undefined) {
    return;
  }

  if (Number.isNaN(value) || value < min || value > max) {
    throw new AstrologyError(`${field} must be between ${min} and ${max}.`, { details: { value } });
  }
};

const ensureIntegerInRange = (value: number | null | undefined, range: [number, number], field: string) => {
  if (value === null || value === undefined) {
    return;
  }

  if (!Number.isInteger(value)) {
    throw new AstrologyError(`${field} must be an integer.`, { details: { value } });
  }

  ensureNumberInRange(value, range, field);
};

const ensureFiniteNumber = (value: number, field: string) => {
  if (!Number.isFinite(value)) {
    throw new AstrologyError(`${field} must be a finite number.`, { details: { value } });
  }
};

const ensurePositiveNumber = (value: number, field: string) => {
  ensureFiniteNumber(value, field);
  if (value <= 0) {
    throw new AstrologyError(`${field} must be greater than zero.`, { details: { value } });
  }
};

const ensureNonNegativeNumber = (value: number, field: string) => {
  ensureFiniteNumber(value, field);
  if (value < 0) {
    throw new AstrologyError(`${field} must be zero or greater.`, { details: { value } });
  }
};

const ensureNonEmptyString = (value: unknown, field: string): string => {
  if (typeof value !== 'string' || !value.trim()) {
    throw new AstrologyError(`${field} must be a non-empty string.`, { details: { value } });
  }

  return value.trim();
};

const validateStringArray = (value: string[] | null | undefined, field: string): void => {
  if (!value) {
    return;
  }

  value.forEach((entry, index) => {
    if (typeof entry !== 'string' || !entry.trim()) {
      throw new AstrologyError(`${field}[${index}] must be a non-empty string.`, { details: { value: entry } });
    }
  });
};

const validateEnumStringArray = (
  value: string[] | null | undefined,
  allowed: Set<string>,
  field: string,
): void => {
  if (!value) {
    return;
  }

  value.forEach((entry, index) => {
    if (!allowed.has(entry)) {
      throw new AstrologyError(`${field}[${index}] must be one of ${Array.from(allowed).join(', ')}.`, {
        details: { value: entry },
      });
    }
  });
};

const ensureBoolean = (value: unknown, field: string): void => {
  if (typeof value !== 'boolean') {
    throw new AstrologyError(`${field} must be a boolean.`, { details: { value } });
  }
};

const ensureOptionalBoolean = (value: unknown, field: string): void => {
  if (value === undefined || value === null) {
    return;
  }

  ensureBoolean(value, field);
};

const validateChineseLanguageOption = (language: string | null | undefined, field: string): void => {
  if (!language) {
    return;
  }

  if (!CHINESE_LANGUAGES.has(language)) {
    throw new AstrologyError(`${field} must be one of ${Array.from(CHINESE_LANGUAGES).join(', ')}.`, {
      details: { value: language },
    });
  }
};

const ensureOptionalEnumString = (value: unknown, allowed: Set<string>, field: string): void => {
  if (value === undefined || value === null) {
    return;
  }

  if (typeof value !== 'string') {
    throw new AstrologyError(`${field} must be a string.`, { details: { value } });
  }

  if (!allowed.has(value)) {
    throw new AstrologyError(`${field} must be one of ${Array.from(allowed).join(', ')}.`, {
      details: { value },
    });
  }
};

const ensureChineseYear = (year: number, field: string): void => {
  ensureIntegerInRange(year, YEAR_RANGE, field);
};

const normalizeChineseAnimal = (animal: string, field: string): string => {
  if (typeof animal !== 'string' || !animal.trim()) {
    throw new AstrologyError(`${field} must be a non-empty string.`);
  }

  const normalized = animal.trim().toLowerCase();
  if (!CHINESE_ANIMALS.has(normalized)) {
    throw new AstrologyError(`${field} must be one of ${Array.from(CHINESE_ANIMALS).join(', ')}.`, {
      details: { value: animal },
    });
  }

  return normalized;
};

const validateOptionalTimezone = (timezone: string | null | undefined, field: string): void => {
  if (timezone === undefined || timezone === null) {
    return;
  }

  if (typeof timezone !== 'string' || !timezone.trim()) {
    throw new AstrologyError(`${field} must be a non-empty string.`, { details: { value: timezone } });
  }
};

const validateDaysAhead = (
  value: number | null | undefined,
  field: string,
  min = 0,
  max = 365,
): void => {
  if (value === null || value === undefined) {
    return;
  }

  ensureIntegerInRange(value, [min, max], field);
};

const ensureNameContainsLetter = (value: unknown, field: string): string => {
  if (typeof value !== 'string' || !value.trim()) {
    throw new AstrologyError(`${field} must be a non-empty string.`, { details: { value } });
  }

  if (!/[A-Za-z]/u.test(value)) {
    throw new AstrologyError(`${field} must contain at least one letter.`, { details: { value } });
  }

  return value.trim();
};

const extractOptionsObject = (options: unknown): Record<string, unknown> | null => {
  if (options === null || options === undefined) {
    return null;
  }

  if (typeof options !== 'object' || Array.isArray(options)) {
    throw new AstrologyError('options must be an object when provided.', { details: { value: options } });
  }

  return options as Record<string, unknown>;
};

const validateSubjectArray = (
  subjects: Subject[] | null | undefined,
  minimum: number,
  context: string,
): Subject[] => {
  if (!subjects || subjects.length < minimum) {
    throw new AstrologyError(`${context} must include at least ${minimum} subject(s).`);
  }

  subjects.forEach((subject, index) => validateSubject(subject, `${context}[${index}]`));
  return subjects;
};

const validateIsoDateInternal = (value: string, field: string) => {
  if (!ISO_DATE_REGEX.test(value)) {
    throw new AstrologyError(`${field} must be in YYYY-MM-DD format.`, { details: { value } });
  }
};

const validateSunSignValue = (sign: string, field: string): void => {
  if (!SUN_SIGN_SET.has(sign as SunSign)) {
    throw new AstrologyError(`${field} must be a valid sun sign.`, { details: { value: sign } });
  }
};

const validateHoroscopeTextFormatValue = (
  format: HoroscopeTextFormat | undefined,
  field: string,
): void => {
  if (format !== undefined && !HOROSCOPE_TEXT_FORMATS.has(format)) {
    throw new AstrologyError(`${field} must be one of ${Array.from(HOROSCOPE_TEXT_FORMATS).join(', ')}.`, {
      details: { value: format },
    });
  }
};

const validateOptionalIsoDateString = (value: string | null | undefined, field: string): void => {
  if (value) {
    validateIsoDateInternal(value, field);
  }
};

const extractChineseGender = (subject: ChineseHoroscopeSubject | ChineseSubject): string | null => {
  if ('gender' in subject && subject.gender) {
    return subject.gender;
  }

  const birthData = subject.birth_data as { gender?: string | null } | undefined;
  return birthData?.gender ?? null;
};

const validateChineseSubject = (subject: ChineseHoroscopeSubject | ChineseSubject, context: string): void => {
  if (!subject) {
    throw new AstrologyError(`${context} is required.`);
  }

  const { birth_data: birthData } = subject;
  if (!birthData) {
    throw new AstrologyError(`${context}.birth_data is required.`);
  }

  ensureIntegerInRange(birthData.year, YEAR_RANGE, `${context}.birth_data.year`);
  ensureIntegerInRange(birthData.month ?? null, [1, 12], `${context}.birth_data.month`);
  ensureIntegerInRange(birthData.day ?? null, [1, 31], `${context}.birth_data.day`);
  ensureIntegerInRange(birthData.hour ?? null, [0, 23], `${context}.birth_data.hour`);
  ensureIntegerInRange(birthData.minute ?? null, [0, 59], `${context}.birth_data.minute`);
  ensureIntegerInRange((birthData as { second?: number | null }).second ?? null, [0, 59], `${context}.birth_data.second`);

  if ('latitude' in birthData && birthData.latitude !== undefined) {
    ensureNumberInRange((birthData.latitude as number | null) ?? null, [-90, 90], `${context}.birth_data.latitude`);
  }

  if ('longitude' in birthData && birthData.longitude !== undefined) {
    ensureNumberInRange((birthData.longitude as number | null) ?? null, [-180, 180], `${context}.birth_data.longitude`);
  }

  const gender = extractChineseGender(subject);
  if (gender && !CHINESE_GENDERS.has(gender)) {
    throw new AstrologyError(`${context}.gender must be 'male' or 'female'.`, { details: { value: gender } });
  }
};

const validateSimpleDate = (date: SimpleDate, context: string): void => {
  ensureIntegerInRange(date.year, YEAR_RANGE, `${context}.year`);
  ensureIntegerInRange(date.month, [1, 12], `${context}.month`);
  ensureIntegerInRange(date.day, [1, 31], `${context}.day`);
};

export const validateConfig = (config: AstrologyClientConfig): void => {
  if (config.apiKey !== undefined && !config.apiKey.trim()) {
    throw new AstrologyError('Astrology API key cannot be empty when provided.');
  }

  if (config.logger !== undefined && typeof config.logger !== 'function') {
    throw new AstrologyError('Logger must be a function when provided.');
  }
};

export const validateBirthData = (birthData: BirthData): void => {
  ensureIntegerInRange(birthData.year, YEAR_RANGE, 'birth_data.year');
  ensureIntegerInRange(birthData.month ?? null, [1, 12], 'birth_data.month');
  ensureIntegerInRange(birthData.day ?? null, [1, 31], 'birth_data.day');
  ensureIntegerInRange(birthData.hour ?? null, [0, 23], 'birth_data.hour');
  ensureIntegerInRange(birthData.minute ?? null, [0, 59], 'birth_data.minute');
  ensureIntegerInRange(birthData.second ?? null, [0, 59], 'birth_data.second');
  ensureNumberInRange(birthData.latitude ?? null, [-90, 90], 'birth_data.latitude');
  ensureNumberInRange(birthData.longitude ?? null, [-180, 180], 'birth_data.longitude');
};

export const validateSubject = (subject: Subject, context: string): void => {
  if (!subject) {
    throw new AstrologyError(`${context}: subject is required.`);
  }

  if (!subject.birth_data) {
    throw new AstrologyError(`${context}: subject.birth_data is required.`);
  }

  validateBirthData(subject.birth_data);
};

export const validateDateTimeLocation = (value: DateTimeLocation, context: string): void => {
  ensureIntegerInRange(value.year, YEAR_RANGE, `${context}.year`);
  ensureIntegerInRange(value.month, [1, 12], `${context}.month`);
  ensureIntegerInRange(value.day, [1, 31], `${context}.day`);
  ensureIntegerInRange(value.hour, [0, 23], `${context}.hour`);
  ensureIntegerInRange(value.minute, [0, 59], `${context}.minute`);
  ensureIntegerInRange(value.second ?? null, [0, 59], `${context}.second`);
  ensureNumberInRange(value.latitude ?? null, [-90, 90], `${context}.latitude`);
  ensureNumberInRange(value.longitude ?? null, [-180, 180], `${context}.longitude`);
};

export const validatePersonalizedHoroscopeRequest = (
  request: PersonalizedHoroscopeRequest,
): void => {
  validateSubject(request.subject, 'PersonalizedHoroscopeRequest');
  if (request.date) {
    validateIsoDateString(request.date, 'PersonalizedHoroscopeRequest.date');
  }
};

export const validateGlobalDataRequest = (
  request: GlobalDataRequest,
  context: string,
): void => {
  ensureIntegerInRange(request.year, YEAR_RANGE, `${context}.year`);
  ensureIntegerInRange(request.month, [1, 12], `${context}.month`);
  ensureIntegerInRange(request.day, [1, 31], `${context}.day`);
  ensureIntegerInRange(request.hour, [0, 23], `${context}.hour`);
  ensureIntegerInRange(request.minute, [0, 59], `${context}.minute`);
  ensureIntegerInRange(request.second, [0, 59], `${context}.second`);
};

export const validateSunSignHoroscopeRequest = (
  request: SunSignHoroscopeRequest,
  context = 'SunSignHoroscopeRequest',
): void => {
  validateSunSignValue(request.sign, `${context}.sign`);
  validateIsoDateInternal(request.date, `${context}.date`);
  if (request.minimum_strength !== undefined) {
    ensureNumberInRange(request.minimum_strength, [0, 5], `${context}.minimum_strength`);
  }
};

export const validateSunSignWeeklyHoroscopeRequest = (
  request: SunSignWeeklyHoroscopeRequest,
  context = 'SunSignWeeklyHoroscopeRequest',
): void => {
  validateSunSignValue(request.sign, `${context}.sign`);
  validateOptionalIsoDateString(request.start_date ?? undefined, `${context}.start_date`);
};

export const validateSunSignMonthlyHoroscopeRequest = (
  request: SunSignMonthlyHoroscopeRequest,
  context = 'SunSignMonthlyHoroscopeRequest',
): void => {
  validateSunSignValue(request.sign, `${context}.sign`);
  if (request.month) {
    if (!MONTH_PATTERN.test(request.month)) {
      throw new AstrologyError(`${context}.month must be in YYYY-MM format.`, {
        details: { value: request.month },
      });
    }
  }
  ensureIntegerInRange(request.year ?? null, YEAR_RANGE, `${context}.year`);
};

export const validateSunSignYearlyHoroscopeRequest = (
  request: SunSignYearlyHoroscopeRequest,
  context = 'SunSignYearlyHoroscopeRequest',
): void => {
  validateSunSignValue(request.sign, `${context}.sign`);
  ensureIntegerInRange(request.year ?? null, YEAR_RANGE, `${context}.year`);
};

export const validateTextHoroscopeRequest = (
  request: TextHoroscopeRequest,
  context = 'TextHoroscopeRequest',
): void => {
  validateSunSignValue(request.sign, `${context}.sign`);
  validateOptionalIsoDateString(request.date ?? undefined, `${context}.date`);
  validateHoroscopeTextFormatValue(request.format, `${context}.format`);
  if (request.use_emoji !== undefined && typeof request.use_emoji !== 'boolean') {
    throw new AstrologyError(`${context}.use_emoji must be a boolean.`, { details: { value: request.use_emoji } });
  }
};

export const validateTextWeeklyHoroscopeRequest = (
  request: TextWeeklyHoroscopeRequest,
  context = 'TextWeeklyHoroscopeRequest',
): void => {
  validateSunSignValue(request.sign, `${context}.sign`);
  validateOptionalIsoDateString(request.start_date ?? undefined, `${context}.start_date`);
  validateHoroscopeTextFormatValue(request.format, `${context}.format`);
  if (request.use_emoji !== undefined && typeof request.use_emoji !== 'boolean') {
    throw new AstrologyError(`${context}.use_emoji must be a boolean.`, { details: { value: request.use_emoji } });
  }
};

export const validateTextMonthlyHoroscopeRequest = (
  request: TextMonthlyHoroscopeRequest,
  context = 'TextMonthlyHoroscopeRequest',
): void => {
  validateSunSignValue(request.sign, `${context}.sign`);
  if (request.month) {
    if (!MONTH_PATTERN.test(request.month)) {
      throw new AstrologyError(`${context}.month must be in YYYY-MM format.`, {
        details: { value: request.month },
      });
    }
  }
  ensureIntegerInRange(request.year ?? null, YEAR_RANGE, `${context}.year`);
  validateHoroscopeTextFormatValue(request.format, `${context}.format`);
  if (request.use_emoji !== undefined && typeof request.use_emoji !== 'boolean') {
    throw new AstrologyError(`${context}.use_emoji must be a boolean.`, { details: { value: request.use_emoji } });
  }
};

export const validatePersonalTextHoroscopeRequest = (
  request: PersonalTextHoroscopeRequest,
  context = 'PersonalTextHoroscopeRequest',
): void => {
  validateSubject(request.subject, `${context}.subject`);
  validateOptionalIsoDateString(request.date ?? undefined, `${context}.date`);
  validateHoroscopeTextFormatValue(request.format, `${context}.format`);
  if (request.use_emoji !== undefined && typeof request.use_emoji !== 'boolean') {
    throw new AstrologyError(`${context}.use_emoji must be a boolean.`, { details: { value: request.use_emoji } });
  }
};

export const validateChineseHoroscopeRequest = (
  request: ChineseHoroscopeRequest,
  context = 'ChineseHoroscopeRequest',
): void => {
  validateChineseSubject(request.subject, `${context}.subject`);
  ensureIntegerInRange(request.year ?? null, YEAR_RANGE, `${context}.year`);
};

export const validateBaZiRequest = (request: BaZiRequest, context = 'BaZiRequest'): void => {
  validateChineseSubject(request.subject, `${context}.subject`);
  ensureOptionalBoolean(request.include_luck_pillars, `${context}.include_luck_pillars`);
  ensureOptionalBoolean(request.include_annual_pillars, `${context}.include_annual_pillars`);
  if (request.current_year !== undefined && request.current_year !== null) {
    ensureChineseYear(request.current_year, `${context}.current_year`);
  }
  validateChineseLanguageOption(request.language, `${context}.language`);
  if (!BAZI_TRADITIONS.has(request.tradition)) {
    throw new AstrologyError(`${context}.tradition must be one of ${Array.from(BAZI_TRADITIONS).join(', ')}.`, {
      details: { value: request.tradition },
    });
  }
  if (!BAZI_ANALYSIS_DEPTH.has(request.analysis_depth)) {
    throw new AstrologyError(
      `${context}.analysis_depth must be one of ${Array.from(BAZI_ANALYSIS_DEPTH).join(', ')}.`,
      { details: { value: request.analysis_depth } },
    );
  }

  const gender = extractChineseGender(request.subject);
  if (request.include_luck_pillars && !gender) {
    throw new AstrologyError(`${context}.subject.gender is required when include_luck_pillars is true.`);
  }
};

export const validateChineseCompatibilityRequest = (
  request: MultipleSubjectsRequest,
  context = 'ChineseCompatibilityRequest',
): void => {
  if (!request.subjects || request.subjects.length < 2) {
    throw new AstrologyError(`${context}.subjects must include at least two entries.`);
  }

  request.subjects.forEach((subject, index) => validateSubject(subject, `${context}.subjects[${index}]`));
};

export const validateLuckPillarsRequest = (
  request: LuckPillarsRequest,
  context = 'LuckPillarsRequest',
): void => {
  validateChineseSubject(request.subject, `${context}.subject`);
  ensureOptionalBoolean(request.include_annual_pillars, `${context}.include_annual_pillars`);
  ensureIntegerInRange(request.years_ahead ?? null, [1, 120], `${context}.years_ahead`);
  if (request.current_year !== undefined && request.current_year !== null) {
    ensureChineseYear(request.current_year, `${context}.current_year`);
  }
  validateChineseLanguageOption(request.language, `${context}.language`);

  const gender = extractChineseGender(request.subject);
  if (!gender) {
    throw new AstrologyError(`${context}.subject.gender is required for luck pillars calculation.`);
  }
};

export const validateMingGuaRequest = (request: SingleSubjectRequest, context = 'MingGuaRequest'): void => {
  if (!request || !request.subject) {
    throw new AstrologyError(`${context}.subject is required.`);
  }

  validateSubject(request.subject, `${context}.subject`);
};

export const validateChineseYearlyRequest = (
  request: ChineseYearlyRequest,
  context = 'ChineseYearlyRequest',
): void => {
  validateChineseSubject(request.subject, `${context}.subject`);
  if (request.forecast_year !== undefined && request.forecast_year !== null) {
    ensureChineseYear(request.forecast_year, `${context}.forecast_year`);
  }
  ensureOptionalBoolean(request.include_monthly, `${context}.include_monthly`);
  ensureOptionalBoolean(request.include_advice, `${context}.include_advice`);
  validateChineseLanguageOption(request.language, `${context}.language`);
};

export const validateChineseYearElementsParams = (
  params: { include_predictions?: boolean; language?: string } | undefined,
  context = 'ChineseElementsRequest',
):
  | {
      include_predictions?: boolean;
      language?: string;
    }
  | undefined => {
  if (!params) {
    return undefined;
  }

  ensureOptionalBoolean(params.include_predictions, `${context}.include_predictions`);
  validateChineseLanguageOption(params.language, `${context}.language`);
  return params;
};

export const validateChineseSolarTermsParams = (
  params: { timezone?: string | null; language?: string } | undefined,
  context = 'ChineseSolarTermsRequest',
):
  | {
      timezone?: string;
      language?: string;
    }
  | undefined => {
  if (!params) {
    return undefined;
  }

  validateOptionalTimezone(params.timezone ?? undefined, `${context}.timezone`);
  const normalized: { timezone?: string; language?: string } = {};
  if (params.timezone !== undefined && params.timezone !== null) {
    normalized.timezone = params.timezone.trim();
  }
  if (params.language !== undefined && params.language !== null) {
    validateChineseLanguageOption(params.language, `${context}.language`);
    normalized.language = params.language;
  }

  return normalized;
};

export const validateChineseYearElementsYear = (
  year: number,
  context = 'ChineseElementsRequest.year',
): void => {
  ensureChineseYear(year, context);
};

export const validateChineseSolarTermsYear = (
  year: number,
  context = 'ChineseSolarTermsRequest.year',
): void => {
  ensureChineseYear(year, context);
};

export const normalizeChineseZodiacAnimal = (
  animal: string,
  context = 'ChineseZodiacRequest.animal',
): string => normalizeChineseAnimal(animal, context);

export const validateChineseZodiacParams = (
  params: { year?: number | null; language?: string } | undefined,
  context = 'ChineseZodiacRequest',
): void => {
  if (params?.year !== undefined && params.year !== null) {
    ensureChineseYear(params.year, `${context}.year`);
  }

  validateChineseLanguageOption(params?.language, `${context}.language`);
};

const validateEclipseId = (eclipseId: string, field: string): void => {
  if (typeof eclipseId !== 'string' || !eclipseId.trim()) {
    throw new AstrologyError(`${field} must be a non-empty string.`, { details: { value: eclipseId } });
  }
};

export const validateUpcomingEclipsesParams = (
  params: UpcomingEclipsesParams | undefined,
  context = 'UpcomingEclipsesParams',
): UpcomingEclipsesParams | undefined => {
  if (!params) {
    return undefined;
  }

  if (params.count !== undefined && params.count !== null) {
    ensureIntegerInRange(params.count, [1, 50], `${context}.count`);
  }

  return params;
};

export const validateEclipseNatalCheckRequest = (
  request: EclipseNatalCheckRequest,
  context = 'EclipseNatalCheckRequest',
): void => {
  validateSubject(request.subject, `${context}.subject`);
  validateOptionalDateRange(request.date_range ?? undefined, `${context}.date_range`);
  ensurePositiveNumber(request.max_orb, `${context}.max_orb`);
};

export const validateEclipseInterpretationRequest = (
  request: EclipseInterpretationRequest,
  context = 'EclipseInterpretationRequest',
): void => {
  validateEclipseId(request.eclipse_id, `${context}.eclipse_id`);
  if (request.birth_data) {
    validateSubject(request.birth_data, `${context}.birth_data`);
  }
};

const validateNumerologySubject = (subject: Subject, context: string): void => {
  validateSubject(subject, context);
  if (subject.name === undefined || subject.name === null) {
    throw new AstrologyError(`${context}.name is required for numerology calculations.`);
  }

  ensureNameContainsLetter(subject.name, `${context}.name`);
};

const validateNumerologySystem = (system: unknown, context: string): void => {
  if (system === undefined || system === null) {
    return;
  }

  if (typeof system !== 'string') {
    throw new AstrologyError(`${context} must be a string.`, { details: { value: system } });
  }

  if (!NUMEROLOGY_SYSTEMS.has(system)) {
    throw new AstrologyError(`${context} must be one of ${Array.from(NUMEROLOGY_SYSTEMS).join(', ')}.`, {
      details: { value: system },
    });
  }
};

const validateNumerologyAnalysisType = (analysisType: unknown, context: string): void => {
  if (analysisType === undefined || analysisType === null) {
    return;
  }

  if (typeof analysisType !== 'string') {
    throw new AstrologyError(`${context} must be a string.`, { details: { value: analysisType } });
  }

  if (!NUMEROLOGY_ANALYSIS_TYPES.has(analysisType)) {
    throw new AstrologyError(
      `${context} must be one of ${Array.from(NUMEROLOGY_ANALYSIS_TYPES).join(', ')}.`,
      { details: { value: analysisType } },
    );
  }
};

const validateNumerologyCoreOptions = (
  options: unknown,
  context: string,
  allowTargetYear: boolean,
): void => {
  const opts = extractOptionsObject(options);
  if (!opts) {
    return;
  }

  if ('system' in opts) {
    validateNumerologySystem(opts.system, `${context}.system`);
  }

  if (allowTargetYear && 'target_year' in opts && opts.target_year !== undefined && opts.target_year !== null) {
    if (typeof opts.target_year !== 'number') {
      throw new AstrologyError(`${context}.target_year must be a number.`, { details: { value: opts.target_year } });
    }
    ensureIntegerInRange(opts.target_year, YEAR_RANGE, `${context}.target_year`);
  }
};

export const validateNumerologyCoreRequest = (
  request: SingleSubjectRequest,
  context = 'NumerologyCoreRequest',
): void => {
  if (!request?.subject) {
    throw new AstrologyError(`${context}.subject is required.`);
  }

  validateNumerologySubject(request.subject, `${context}.subject`);
  validateNumerologyCoreOptions(request.options ?? null, `${context}.options`, true);
};

export const validateNumerologyComprehensiveRequest = (
  request: SingleSubjectRequest,
  context = 'NumerologyComprehensiveRequest',
): void => {
  if (!request?.subject) {
    throw new AstrologyError(`${context}.subject is required.`);
  }

  validateNumerologySubject(request.subject, `${context}.subject`);
  validateNumerologyCoreOptions(request.options ?? null, `${context}.options`, true);
};

export const validateNumerologyCompatibilityRequest = (
  request: MultipleSubjectsRequest,
  context = 'NumerologyCompatibilityRequest',
): void => {
  if (!request.subjects || request.subjects.length !== 2) {
    throw new AstrologyError(`${context}.subjects must include exactly two entries.`);
  }

  request.subjects.forEach((subject, index) =>
    validateNumerologySubject(subject, `${context}.subjects[${index}]`),
  );

  const opts = extractOptionsObject(request.options ?? null);
  if (opts) {
    if ('analysis_type' in opts) {
      validateNumerologyAnalysisType(opts.analysis_type, `${context}.options.analysis_type`);
    }
  }
};

const validateFixedStarsCustomOrbs = (
  customOrbs: Record<string, number> | null | undefined,
  context: string,
): void => {
  if (customOrbs === undefined || customOrbs === null) {
    return;
  }

  if (typeof customOrbs !== 'object' || Array.isArray(customOrbs)) {
    throw new AstrologyError(`${context} must be an object when provided.`, { details: { value: customOrbs } });
  }

  Object.entries(customOrbs).forEach(([key, value]) => {
    if (typeof value !== 'number' || Number.isNaN(value)) {
      throw new AstrologyError(`${context}.${key} must be a finite number.`, { details: { value } });
    }
    ensureNonNegativeNumber(value, `${context}.${key}`);
  });
};

const validateFixedStarsConfig = (config: FixedStarsConfig | undefined, context: string): void => {
  if (!config || typeof config !== 'object') {
    throw new AstrologyError(`${context} is required.`);
  }

  const presets = config.presets ?? [];
  if (!Array.isArray(presets)) {
    throw new AstrologyError(`${context}.presets must be an array.`, { details: { value: presets } });
  }

  presets.forEach((preset, index) => {
    if (!FIXED_STAR_PRESETS.has(preset)) {
      throw new AstrologyError(`${context}.presets[${index}] must be one of ${Array.from(FIXED_STAR_PRESETS).join(', ')}.`, {
        details: { value: preset },
      });
    }
  });

  validateFixedStarsCustomOrbs(config.custom_orbs ?? null, `${context}.custom_orbs`);
  ensureOptionalBoolean(config.include_parans, `${context}.include_parans`);
  ensureOptionalBoolean(config.include_heliacal, `${context}.include_heliacal`);
  ensureOptionalBoolean(config.include_interpretations, `${context}.include_interpretations`);
};

export const validateFixedStarsPositionsRequest = (
  request: FixedStarsPositionsRequest,
  context = 'FixedStarsPositionsRequest',
): void => {
  if (!request || typeof request !== 'object') {
    throw new AstrologyError(`${context} is required.`);
  }

  validateSubject(request.subject, `${context}.subject`);
  validateFixedStarsConfig(request.fixed_stars, `${context}.fixed_stars`);
};

export const validateFixedStarsConjunctionsRequest = (
  request: FixedStarsConjunctionsRequest,
  context = 'FixedStarsConjunctionsRequest',
): void => {
  validateFixedStarsPositionsRequest(request, context);
  ensureOptionalBoolean(request.include_oppositions, `${context}.include_oppositions`);
};

export const validateFixedStarsReportRequest = (
  request: FixedStarsReportRequest,
  context = 'FixedStarsReportRequest',
): void => {
  validateFixedStarsPositionsRequest(request, context);
};

export const validateSingleSubjectRequest = (
  request: SingleSubjectRequest,
  context = 'SingleSubjectRequest',
): void => {
  if (!request || typeof request !== 'object') {
    throw new AstrologyError(`${context} is required.`);
  }

  validateSubject(request.subject, `${context}.subject`);
  extractOptionsObject(request.options ?? null);
};

export const validateMultipleSubjectsRequest = (
  request: MultipleSubjectsRequest,
  context = 'MultipleSubjectsRequest',
  minimumSubjects = 2,
  maximumSubjects?: number,
): void => {
  if (!request || typeof request !== 'object') {
    throw new AstrologyError(`${context} is required.`);
  }

  const subjects = validateSubjectArray(request.subjects, minimumSubjects, `${context}.subjects`);

  if (maximumSubjects !== undefined && subjects.length > maximumSubjects) {
    throw new AstrologyError(`${context}.subjects must not exceed ${maximumSubjects} entries.`, {
      details: { value: subjects.length },
    });
  }

  extractOptionsObject(request.options ?? null);
};

const validatePetOptions = (options: PetOptions | null | undefined, context: string): void => {
  if (options === undefined || options === null) {
    return;
  }

  ensureNonEmptyString(options.pet_type, `${context}.pet_type`);
  ensureNonEmptyString(options.training_type, `${context}.training_type`);
  ensureNonEmptyString(options.language, `${context}.language`);

  if (options.breed !== undefined && options.breed !== null) {
    ensureNonEmptyString(options.breed, `${context}.breed`);
  }
};

const validateSvgOptions = (options: SVGOptions | null | undefined, context: string): void => {
  if (options === undefined || options === null) {
    return;
  }

  if (typeof options !== 'object' || Array.isArray(options)) {
    throw new AstrologyError(`${context} must be an object when provided.`, { details: { value: options } });
  }

  if (options.theme !== undefined && options.theme !== null) {
    const theme = ensureNonEmptyString(options.theme, `${context}.theme`);
    if (!SVG_THEMES.has(theme)) {
      throw new AstrologyError(`${context}.theme must be one of ${Array.from(SVG_THEMES).join(', ')}.`, {
        details: { value: options.theme },
      });
    }
  }

  if (options.language !== undefined && options.language !== null) {
    const language = ensureNonEmptyString(options.language, `${context}.language`);
    if (!SVG_LANGUAGES.has(language)) {
      throw new AstrologyError(`${context}.language must be one of ${Array.from(SVG_LANGUAGES).join(', ')}.`, {
        details: { value: options.language },
      });
    }
  }
};

export const validatePetSingleSubjectRequest = (
  request: PetSingleSubjectRequest,
  context = 'PetSingleSubjectRequest',
): void => {
  if (!request || typeof request !== 'object') {
    throw new AstrologyError(`${context} is required.`);
  }

  validateSubject(request.subject, `${context}.subject`);
  if (request.owner) {
    validateSubject(request.owner, `${context}.owner`);
  }
  extractOptionsObject(request.options ?? null);
  validatePetOptions(request.pet_options ?? null, `${context}.pet_options`);
};

export const validatePetCompatibilityRequest = (
  request: PetCompatibilityRequest,
  context = 'PetCompatibilityRequest',
): void => {
  if (!request || typeof request !== 'object') {
    throw new AstrologyError(`${context} is required.`);
  }

  const subjects = validateSubjectArray(request.subjects, 2, `${context}.subjects`);
  if (subjects.length !== 2) {
    throw new AstrologyError(`${context}.subjects must include exactly two entries.`);
  }

  validatePetOptions(request.options ?? null, `${context}.options`);
};

export const validatePetMultiSubjectRequest = (
  request: PetMultiSubjectRequest,
  context = 'PetMultiSubjectRequest',
): void => {
  if (!request || typeof request !== 'object') {
    throw new AstrologyError(`${context} is required.`);
  }

  validateSubjectArray(request.subjects, 2, `${context}.subjects`);
  extractOptionsObject(request.options ?? null);
  validatePetOptions(request.pet_options ?? null, `${context}.pet_options`);
};

export const validateNatalChartSvgRequest = (
  request: NatalChartSVGRequest,
  context = 'NatalChartSVGRequest',
): void => {
  if (!request || typeof request !== 'object') {
    throw new AstrologyError(`${context} is required.`);
  }

  validateSubject(request.subject, `${context}.subject`);
  extractOptionsObject(request.options ?? null);
  validateSvgOptions(request.svg_options ?? null, `${context}.svg_options`);
};

export const validateSynastryChartSvgRequest = (
  request: SynastryChartSVGRequest,
  context = 'SynastryChartSVGRequest',
): void => {
  if (!request || typeof request !== 'object') {
    throw new AstrologyError(`${context} is required.`);
  }

  validateSubject(request.subject1, `${context}.subject1`);
  validateSubject(request.subject2, `${context}.subject2`);
  extractOptionsObject(request.options ?? null);
  validateSvgOptions(request.svg_options ?? null, `${context}.svg_options`);
};

export const validateCompositeChartSvgRequest = (
  request: CompositeChartSVGRequest,
  context = 'CompositeChartSVGRequest',
): void => {
  if (!request || typeof request !== 'object') {
    throw new AstrologyError(`${context} is required.`);
  }

  validateSubject(request.subject1, `${context}.subject1`);
  validateSubject(request.subject2, `${context}.subject2`);
  extractOptionsObject(request.options ?? null);
  validateSvgOptions(request.svg_options ?? null, `${context}.svg_options`);
};

export const validateTransitChartSvgRequest = (
  request: TransitChartSVGRequest,
  context = 'TransitChartSVGRequest',
): void => {
  if (!request || typeof request !== 'object') {
    throw new AstrologyError(`${context} is required.`);
  }

  validateSubject(request.natal_subject, `${context}.natal_subject`);
  if (!request.transit_datetime) {
    throw new AstrologyError(`${context}.transit_datetime is required.`);
  }
  validateDateTimeLocation(request.transit_datetime, `${context}.transit_datetime`);
  extractOptionsObject(request.options ?? null);
  validateSvgOptions(request.svg_options ?? null, `${context}.svg_options`);
};

const validateOrbsConfig = (orbs: Record<string, unknown> | null | undefined, context: string): void => {
  if (orbs === undefined || orbs === null) {
    return;
  }

  if (typeof orbs !== 'object' || Array.isArray(orbs)) {
    throw new AstrologyError(`${context} must be an object when provided.`, { details: { value: orbs } });
  }

  Object.entries(orbs).forEach(([key, value]) => {
    if (typeof value !== 'number' || Number.isNaN(value)) {
      throw new AstrologyError(`${context}.${key} must be a finite number.`, { details: { value } });
    }
    ensureNumberInRange(value, ORB_MIN_MAX, `${context}.${key}`);
    if (value <= 0) {
      throw new AstrologyError(`${context}.${key} must be greater than zero.`, { details: { value } });
    }
  });
};

export const validateGlobalAnalysisRequest = (
  request: GlobalAnalysisRequest,
  context = 'GlobalAnalysisRequest',
): void => {
  if (!request || typeof request !== 'object') {
    throw new AstrologyError(`${context} is required.`);
  }

  if (request.calculation_time !== undefined && request.calculation_time !== null) {
    if (typeof request.calculation_time !== 'object' || Array.isArray(request.calculation_time)) {
      throw new AstrologyError(`${context}.calculation_time must be an object when provided.`, {
        details: { value: request.calculation_time },
      });
    }
    validateDateTimeLocation(request.calculation_time, `${context}.calculation_time`);
  }

  extractOptionsObject(request.options ?? null);
  validateOrbsConfig(request.orbs ?? null, `${context}.orbs`);
};

export const validatePersonalAnalysisRequest = (
  request: PersonalAnalysisRequest,
  context = 'PersonalAnalysisRequest',
): void => {
  if (!request || typeof request !== 'object') {
    throw new AstrologyError(`${context} is required.`);
  }

  validateSubject(request.subject, `${context}.subject`);

  if (request.calculation_time !== undefined && request.calculation_time !== null) {
    if (typeof request.calculation_time !== 'object' || Array.isArray(request.calculation_time)) {
      throw new AstrologyError(`${context}.calculation_time must be an object when provided.`, {
        details: { value: request.calculation_time },
      });
    }
    validateDateTimeLocation(request.calculation_time, `${context}.calculation_time`);
  }

  extractOptionsObject(request.options ?? null);
  validateOrbsConfig(request.orbs ?? null, `${context}.orbs`);
};

export const validateMarketTimingRequest = (
  request: MarketTimingRequest,
  context = 'MarketTimingRequest',
): void => {
  if (!request || typeof request !== 'object') {
    throw new AstrologyError(`${context} is required.`);
  }

  validateStringArray(request.markets, `${context}.markets`);
  if (!Array.isArray(request.markets) || request.markets.length === 0) {
    throw new AstrologyError(`${context}.markets must contain at least one market.`);
  }

  if (request.start_date) {
    validateIsoDateString(request.start_date, `${context}.start_date`);
  }
  if (request.end_date) {
    validateIsoDateString(request.end_date, `${context}.end_date`);
  }

  if (request.start_date && request.end_date) {
    const start = Date.parse(request.start_date);
    const end = Date.parse(request.end_date);
    if (Number.isNaN(start) || Number.isNaN(end)) {
      throw new AstrologyError(`${context} contains invalid date range.`, {
        details: { start_date: request.start_date, end_date: request.end_date },
      });
    }
    if (end < start) {
      throw new AstrologyError(`${context}.end_date must not be earlier than start_date.`, {
        details: { start_date: request.start_date, end_date: request.end_date },
      });
    }
    const diffDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    if (diffDays > 90) {
      throw new AstrologyError(`${context} date range cannot exceed 90 days.`, {
        details: { start_date: request.start_date, end_date: request.end_date },
      });
    }
  }

  ensureNonEmptyString(request.language, `${context}.language`);
};

export const validateCryptoTimingRequest = (
  request: CryptoTimingRequest,
  context = 'CryptoTimingRequest',
): void => {
  if (!request || typeof request !== 'object') {
    throw new AstrologyError(`${context} is required.`);
  }

  ensureNonEmptyString(request.cryptocurrency, `${context}.cryptocurrency`);
  ensureIntegerInRange(request.analysis_period_days, [1, 365], `${context}.analysis_period_days`);
  if (typeof request.include_volatility_forecast !== 'boolean') {
    throw new AstrologyError(`${context}.include_volatility_forecast must be a boolean.`, {
      details: { value: request.include_volatility_forecast },
    });
  }
  ensureNonEmptyString(request.language, `${context}.language`);
};

export const validateGannAnalysisRequest = (
  request: GannAnalysisRequest,
  context = 'GannAnalysisRequest',
): void => {
  if (!request || typeof request !== 'object') {
    throw new AstrologyError(`${context} is required.`);
  }

  ensureNonEmptyString(request.symbol, `${context}.symbol`);
  ensureIntegerInRange(request.forecast_days, [1, 365], `${context}.forecast_days`);

  if (request.reference_date) {
    validateIsoDateString(request.reference_date, `${context}.reference_date`);
  }
};

export const validateBradleySiderographRequest = (
  request: BradleySiderographRequest,
  context = 'BradleySiderographRequest',
): void => {
  if (!request || typeof request !== 'object') {
    throw new AstrologyError(`${context} is required.`);
  }

  ensureNonEmptyString(request.language, `${context}.language`);
  if (request.birth_data) {
    validateDateTimeLocation(request.birth_data, `${context}.birth_data`);
  }

  if (request.period) {
    const period = ensureNonEmptyString(request.period, `${context}.period`).toLowerCase();
    if (!BRADLEY_PERIODS.has(period)) {
      throw new AstrologyError(`${context}.period must be one of ${Array.from(BRADLEY_PERIODS).join(', ')}.`, {
        details: { value: request.period },
      });
    }
  }

  if (request.market) {
    const market = ensureNonEmptyString(request.market, `${context}.market`).toLowerCase();
    if (!BRADLEY_MARKETS.has(market)) {
      throw new AstrologyError(`${context}.market must be one of ${Array.from(BRADLEY_MARKETS).join(', ')}.`, {
        details: { value: request.market },
      });
    }
  }

  ensureIntegerInRange(request.year ?? null, YEAR_RANGE, `${context}.year`);

  if (request.analysis_date) {
    if (typeof request.analysis_date !== 'object' || Array.isArray(request.analysis_date)) {
      throw new AstrologyError(`${context}.analysis_date must be an object when provided.`, {
        details: { value: request.analysis_date },
      });
    }

    Object.entries(request.analysis_date).forEach(([key, value]) => {
      if (typeof value !== 'number' || Number.isNaN(value)) {
        throw new AstrologyError(`${context}.analysis_date.${key} must be a finite number.`, {
          details: { value },
        });
      }
    });
  }
};

export const validateForexTimingRequest = (
  request: ForexTimingRequest,
  context = 'ForexTimingRequest',
): void => {
  if (!request || typeof request !== 'object') {
    throw new AstrologyError(`${context} is required.`);
  }

  ensureNonEmptyString(request.pair, `${context}.pair`);
  const session = ensureNonEmptyString(request.trading_session, `${context}.trading_session`).toLowerCase();
  if (!FOREX_SESSIONS.has(session)) {
    throw new AstrologyError(
      `${context}.trading_session must be one of ${Array.from(FOREX_SESSIONS).join(', ')}.`,
      { details: { value: request.trading_session } },
    );
  }

  ensureIntegerInRange(request.forecast_days, [1, 60], `${context}.forecast_days`);
};

const validateDepartments = (
  departments: NonNullable<BusinessMultipleRequest['options']>['departments'] | undefined | null,
  subjectCount: number,
  context: string,
): void => {
  if (!departments) {
    return;
  }

  if (!Array.isArray(departments)) {
    throw new AstrologyError(`${context} must be an array when provided.`, { details: { value: departments } });
  }

  departments.forEach((entry, index) => {
    const entryContext = `${context}[${index}]`;
    if (typeof entry === 'string') {
      ensureNonEmptyString(entry, entryContext);
      return;
    }

    if (!entry || typeof entry !== 'object' || Array.isArray(entry)) {
      throw new AstrologyError(`${entryContext} must be a string or object describing a department.`, {
        details: { value: entry },
      });
    }

    const { name, type, members } = entry as Record<string, unknown>;
    if (name !== undefined && name !== null) {
      ensureNonEmptyString(name, `${entryContext}.name`);
    }
    if (type !== undefined && type !== null) {
      ensureNonEmptyString(type, `${entryContext}.type`);
    }
    if (members !== undefined && members !== null) {
      if (!Array.isArray(members)) {
        throw new AstrologyError(`${entryContext}.members must be an array when provided.`, {
          details: { value: members },
        });
      }

      members.forEach((memberIndex, memberArrayIndex) => {
        if (!Number.isInteger(memberIndex)) {
          throw new AstrologyError(`${entryContext}.members[${memberArrayIndex}] must be an integer index.`, {
            details: { value: memberIndex },
          });
        }
        if (memberIndex < 0 || (subjectCount > 0 && memberIndex >= subjectCount)) {
          throw new AstrologyError(
            `${entryContext}.members[${memberArrayIndex}] must reference a valid subject index.`,
            { details: { value: memberIndex, subjectCount } },
          );
        }
      });
    }
  });
};

const validateBusinessOptions = (
  options: BusinessMultipleRequest['options'] | BusinessSingleRequest['options'],
  context: string,
  subjectCount: number,
): void => {
  if (!options) {
    return;
  }

  const opts = extractOptionsObject(options);
  if (!opts) {
    return;
  }

  if ('house_system' in opts && opts.house_system !== undefined && opts.house_system !== null) {
    const houseSystem = String(opts.house_system) as HouseSystem;
    if (!HOUSE_SYSTEM_CODES.has(houseSystem)) {
      throw new AstrologyError(`${context}.house_system must be a supported value.`, {
        details: { value: opts.house_system },
      });
    }
  }

  if ('language' in opts && opts.language !== undefined && opts.language !== null) {
    ensureNonEmptyString(opts.language, `${context}.language`);
  }

  if ('tradition' in opts && opts.tradition !== undefined && opts.tradition !== null) {
    ensureNonEmptyString(opts.tradition, `${context}.tradition`);
  }

  if ('perspective' in opts && opts.perspective !== undefined && opts.perspective !== null) {
    ensureNonEmptyString(opts.perspective, `${context}.perspective`);
  }

  if ('detail_level' in opts && opts.detail_level !== undefined && opts.detail_level !== null) {
    ensureNonEmptyString(opts.detail_level, `${context}.detail_level`);
  }

  ['include_interpretations', 'include_raw_data', 'use_cache', 'precision_mode'].forEach((flag) => {
    if (flag in opts && opts[flag] !== undefined && opts[flag] !== null && typeof opts[flag] !== 'boolean') {
      throw new AstrologyError(`${context}.${flag} must be a boolean.`, { details: { value: opts[flag] } });
    }
  });

  if ('team_name' in opts && opts.team_name !== undefined && opts.team_name !== null) {
    ensureNonEmptyString(opts.team_name, `${context}.team_name`);
  }
  if ('department_focus' in opts && opts.department_focus !== undefined && opts.department_focus !== null) {
    ensureNonEmptyString(opts.department_focus, `${context}.department_focus`);
  }

  if ('departments' in opts) {
    const { departments } = opts as {
      departments?: NonNullable<BusinessMultipleRequest['options']>['departments'] | null;
    };
    validateDepartments(departments ?? null, subjectCount, `${context}.departments`);
  }
};

export const validateBusinessMultipleRequest = (
  request: BusinessMultipleRequest,
  context = 'BusinessMultipleRequest',
  minimumSubjects = 2,
): void => {
  if (!request || typeof request !== 'object') {
    throw new AstrologyError(`${context} is required.`);
  }

  const subjects = validateSubjectArray(request.subjects, minimumSubjects, `${context}.subjects`);
  validateBusinessOptions(request.options ?? null, `${context}.options`, subjects.length);
};

export const validateBusinessSingleRequest = (
  request: BusinessSingleRequest,
  context = 'BusinessSingleRequest',
): void => {
  if (!request || typeof request !== 'object') {
    throw new AstrologyError(`${context} is required.`);
  }

  validateSubject(request.subject, `${context}.subject`);
  validateBusinessOptions(request.options ?? null, `${context}.options`, 1);
};

export const validateBusinessTimingRequest = (
  request: BusinessTimingRequest,
  context = 'BusinessTimingRequest',
): void => {
  if (!request || typeof request !== 'object') {
    throw new AstrologyError(`${context} is required.`);
  }

  if (!Array.isArray(request.activities) || request.activities.length === 0) {
    throw new AstrologyError(`${context}.activities must include at least one entry.`);
  }

  request.activities.forEach((activity, index) => {
    const normalized = ensureNonEmptyString(activity, `${context}.activities[${index}]`).toLowerCase();
    if (!BUSINESS_ACTIVITIES.has(normalized)) {
      throw new AstrologyError(
        `${context}.activities[${index}] must be one of ${Array.from(BUSINESS_ACTIVITIES).join(', ')}.`,
        { details: { value: activity } },
      );
    }
  });

  if (request.start_date) {
    validateIsoDateString(request.start_date, `${context}.start_date`);
  }
  if (request.end_date) {
    validateIsoDateString(request.end_date, `${context}.end_date`);
  }

  if (request.start_date && request.end_date) {
    const start = Date.parse(request.start_date);
    const end = Date.parse(request.end_date);
    if (Number.isNaN(start) || Number.isNaN(end)) {
      throw new AstrologyError(`${context} contains invalid date range.`, {
        details: { start_date: request.start_date, end_date: request.end_date },
      });
    }
    if (end < start) {
      throw new AstrologyError(`${context}.end_date must not be earlier than start_date.`, {
        details: { start_date: request.start_date, end_date: request.end_date },
      });
    }

    const diffDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    if (diffDays > 90) {
      throw new AstrologyError(`${context} date range cannot exceed 90 days.`, {
        details: { start_date: request.start_date, end_date: request.end_date },
      });
    }
  }

  if (request.company_data) {
    validateDateTimeLocation(request.company_data, `${context}.company_data`);
  }

  ensureNonEmptyString(request.language, `${context}.language`);
};

export const validatePersonalTradingRequest = (
  request: PersonalTradingRequest,
  context = 'PersonalTradingRequest',
): void => {
  if (!request || typeof request !== 'object') {
    throw new AstrologyError(`${context} is required.`);
  }

  const hasSubject = request.subject !== undefined && request.subject !== null;
  const hasBirthData = request.birth_data !== undefined && request.birth_data !== null;

  if (!hasSubject && !hasBirthData) {
    throw new AstrologyError(`${context} requires either subject or birth_data.`);
  }

  if (hasSubject) {
    validateSubject(request.subject as Subject, `${context}.subject`);
  }

  if (hasBirthData) {
    validateBirthData(request.birth_data as BirthData);
  }

  const normalizeTradingStyle = (style: string | null | undefined, field: string) => {
    if (style === undefined || style === null) {
      return;
    }
    const normalized = ensureNonEmptyString(style, field).toLowerCase();
    if (!TRADING_STYLE_VALUES.has(normalized)) {
      throw new AstrologyError(`${field} must be one of ${Array.from(TRADING_STYLE_VALUES).join(', ')}.`, {
        details: { value: style },
      });
    }
  };

  const validateAnalysisDays = (value: number | null | undefined, field: string) => {
    if (value === null || value === undefined) {
      return;
    }
    ensureIntegerInRange(value, [1, 90], field);
  };

  const validateLanguageValue = (value: string | null | undefined, field: string) => {
    if (value === null || value === undefined) {
      return;
    }
    ensureNonEmptyString(value, field);
  };

  validateAnalysisDays(request.analysis_period_days ?? null, `${context}.analysis_period_days`);
  ensureOptionalBoolean(request.include_lunar_cycles, `${context}.include_lunar_cycles`);
  normalizeTradingStyle(request.trading_style, `${context}.trading_style`);
  validateLanguageValue(request.language, `${context}.language`);

  const options = extractOptionsObject(request.options ?? null);
  if (options) {
    const typedOptions = options as {
      analysis_period_days?: number | null;
      include_lunar_cycles?: boolean | null;
      trading_style?: string | null;
      language?: string | null;
    };
    validateAnalysisDays(typedOptions.analysis_period_days ?? null, `${context}.options.analysis_period_days`);
    ensureOptionalBoolean(typedOptions.include_lunar_cycles, `${context}.options.include_lunar_cycles`);
    normalizeTradingStyle(typedOptions.trading_style, `${context}.options.trading_style`);
    validateLanguageValue(typedOptions.language, `${context}.options.language`);
  }
};

export const validateTarotGlossaryParams = (
  params: TarotGlossaryParams | undefined,
  context = 'TarotGlossaryParams',
): TarotGlossaryParams | undefined => {
  if (!params) {
    return undefined;
  }

  if (params.house !== undefined && params.house !== null) {
    ensureIntegerInRange(params.house, [1, 12], `${context}.house`);
  }

  const normalized: TarotGlossaryParams = {};

  if (params.arcana !== undefined) {
    normalized.arcana = params.arcana === null ? null : ensureNonEmptyString(params.arcana, `${context}.arcana`);
  }

  if (params.suit !== undefined) {
    normalized.suit = params.suit === null ? null : ensureNonEmptyString(params.suit, `${context}.suit`);
  }

  if (params.element !== undefined) {
    normalized.element = params.element === null ? null : ensureNonEmptyString(params.element, `${context}.element`);
  }

  if (params.planet !== undefined) {
    normalized.planet = params.planet === null ? null : ensureNonEmptyString(params.planet, `${context}.planet`);
  }

  if (params.sign !== undefined) {
    normalized.sign = params.sign === null ? null : ensureNonEmptyString(params.sign, `${context}.sign`);
  }

  if (params.house !== undefined) {
    normalized.house = params.house;
  }

  return normalized;
};

export const validateTarotCardSearchParams = (
  params: TarotCardSearchParams | undefined,
  context = 'TarotCardSearchParams',
): TarotCardSearchParams | undefined => {
  if (!params) {
    return undefined;
  }

  const normalized: TarotCardSearchParams = {};

  if (params.keyword !== undefined) {
    normalized.keyword = params.keyword === null ? null : ensureNonEmptyString(params.keyword, `${context}.keyword`);
  }

  if (params.life_area !== undefined) {
    normalized.life_area =
      params.life_area === null ? null : ensureNonEmptyString(params.life_area, `${context}.life_area`);
  }

  if (params.element !== undefined) {
    normalized.element = params.element === null ? null : ensureNonEmptyString(params.element, `${context}.element`);
  }

  if (params.planet !== undefined) {
    normalized.planet = params.planet === null ? null : ensureNonEmptyString(params.planet, `${context}.planet`);
  }

  if (params.sign !== undefined) {
    normalized.sign = params.sign === null ? null : ensureNonEmptyString(params.sign, `${context}.sign`);
  }

  if (params.arcana !== undefined) {
    normalized.arcana = params.arcana === null ? null : ensureNonEmptyString(params.arcana, `${context}.arcana`);
  }

  if (params.page !== undefined && params.page !== null) {
    ensureIntegerInRange(params.page, [1, Infinity], `${context}.page`);
    normalized.page = params.page;
  }

  if (params.page_size !== undefined && params.page_size !== null) {
    ensureIntegerInRange(params.page_size, [1, 78], `${context}.page_size`);
    normalized.page_size = params.page_size;
  }

  return normalized;
};

export const validateDailyCardParams = (params: DailyCardParams, context = 'DailyCardParams'): DailyCardParams => {
  if (!params || typeof params !== 'object') {
    throw new AstrologyError(`${context} is required.`);
  }

  const normalized: DailyCardParams = {
    user_id: ensureNonEmptyString(params.user_id, `${context}.user_id`),
  };

  if (params.life_area !== undefined) {
    normalized.life_area =
      params.life_area === null ? null : ensureNonEmptyString(params.life_area, `${context}.life_area`);
  }

  if (params.birth_year !== undefined && params.birth_year !== null) {
    ensureIntegerInRange(params.birth_year, YEAR_RANGE, `${context}.birth_year`);
    normalized.birth_year = params.birth_year;
  }

  if (params.birth_month !== undefined && params.birth_month !== null) {
    ensureIntegerInRange(params.birth_month, [1, 12], `${context}.birth_month`);
    normalized.birth_month = params.birth_month;
  }

  if (params.birth_day !== undefined && params.birth_day !== null) {
    ensureIntegerInRange(params.birth_day, [1, 31], `${context}.birth_day`);
    normalized.birth_day = params.birth_day;
  }

  if (params.birth_hour !== undefined && params.birth_hour !== null) {
    ensureIntegerInRange(params.birth_hour, [0, 23], `${context}.birth_hour`);
    normalized.birth_hour = params.birth_hour;
  }

  if (params.birth_minute !== undefined && params.birth_minute !== null) {
    ensureIntegerInRange(params.birth_minute, [0, 59], `${context}.birth_minute`);
    normalized.birth_minute = params.birth_minute;
  }

  if (params.city !== undefined) {
    normalized.city = params.city === null ? null : ensureNonEmptyString(params.city, `${context}.city`);
  }

  if (params.country_code !== undefined) {
    normalized.country_code =
      params.country_code === null ? null : ensureNonEmptyString(params.country_code, `${context}.country_code`);
  }

  return normalized;
};

export const validateDrawCardsRequest = (
  request: DrawCardsRequest,
  context = 'DrawCardsRequest',
): DrawCardsRequest => {
  if (!request || typeof request !== 'object') {
    throw new AstrologyError(`${context} is required.`);
  }

  ensureIntegerInRange(request.count, [1, 78], `${context}.count`);
  ensureOptionalBoolean(request.exclude_reversed, `${context}.exclude_reversed`);
  ensureOptionalBoolean(request.exclude_majors, `${context}.exclude_majors`);
  ensureOptionalBoolean(request.exclude_minors, `${context}.exclude_minors`);

  if (request.life_area !== undefined) {
    request.life_area =
      request.life_area === null ? null : ensureNonEmptyString(request.life_area, `${context}.life_area`);
  }

  return request;
};

const validateTarotReportBase = (
  request: TarotReportRequest,
  expectedSpread: TarotReportRequest['spread_type'],
  context: string,
  { requirePartnerBirthData = false }: { requirePartnerBirthData?: boolean } = {},
): void => {
  if (!request || typeof request !== 'object') {
    throw new AstrologyError(`${context} is required.`);
  }

  if (request.spread_type !== expectedSpread) {
    throw new AstrologyError(`${context}.spread_type must be '${expectedSpread}'.`, {
      details: { value: request.spread_type },
    });
  }

  if (request.life_area !== undefined && request.life_area !== null) {
    ensureNonEmptyString(request.life_area, `${context}.life_area`);
  }

  if (request.birth_data) {
    validateDateTimeLocation(request.birth_data, `${context}.birth_data`);
  }

  if (request.partner_birth_data) {
    validateDateTimeLocation(request.partner_birth_data, `${context}.partner_birth_data`);
  } else if (requirePartnerBirthData) {
    throw new AstrologyError(`${context}.partner_birth_data is required for this spread.`);
  }

  ensureBoolean(request.use_reversals, `${context}.use_reversals`);
  ensureOptionalEnumString(request.tradition, TAROT_TRADITIONS, `${context}.tradition`);
  ensureBoolean(request.include_dignities, `${context}.include_dignities`);
  ensureBoolean(request.include_timing, `${context}.include_timing`);
  ensureBoolean(request.include_astro_context, `${context}.include_astro_context`);
  ensureBoolean(request.include_birth_cards, `${context}.include_birth_cards`);
  ensureOptionalEnumString(request.interpretation_depth, TAROT_INTERPRETATION_DEPTHS, `${context}.interpretation_depth`);
  ensureNonEmptyString(request.language, `${context}.language`);
};

export const validateTarotReportRequest = (
  request: TarotReportRequest,
  expectedSpread: TarotReportRequest['spread_type'],
  context = 'TarotReportRequest',
) => {
  validateTarotReportBase(request, expectedSpread, context);
};

export const validateTarotSynastryReportRequest = (
  request: TarotReportRequest,
  context = 'TarotSynastryReportRequest',
) => {
  validateTarotReportBase(request, 'synastry', context, { requirePartnerBirthData: true });
};

export const validateTreeOfLifeRequest = (request: TreeOfLifeRequest, context = 'TreeOfLifeRequest'): void => {
  if (!request || typeof request !== 'object') {
    throw new AstrologyError(`${context} is required.`);
  }

  if (request.spread_type !== 'tree_of_life') {
    throw new AstrologyError(`${context}.spread_type must be 'tree_of_life'.`, {
      details: { value: request.spread_type },
    });
  }

  ensureNonEmptyString(request.life_area, `${context}.life_area`);
  ensureBoolean(request.include_timing, `${context}.include_timing`);
  ensureBoolean(request.include_dignities, `${context}.include_dignities`);
  ensureBoolean(request.include_astro_context, `${context}.include_astro_context`);
  ensureOptionalEnumString(request.interpretation_depth, TAROT_INTERPRETATION_DEPTHS, `${context}.interpretation_depth`);
  ensureNonEmptyString(request.language, `${context}.language`);

  if (request.birth_data) {
    validateDateTimeLocation(request.birth_data, `${context}.birth_data`);
  }
};

export const validateQuintessenceRequest = (
  request: QuintessenceRequest,
  context = 'QuintessenceRequest',
): QuintessenceRequest => {
  if (!request || typeof request !== 'object') {
    throw new AstrologyError(`${context} is required.`);
  }

  const cards = request.cards ?? [];
  if (!Array.isArray(cards) || cards.length === 0) {
    throw new AstrologyError(`${context}.cards must include at least one card.`);
  }

  cards.forEach((card, index) => {
    ensureNonEmptyString(card, `${context}.cards[${index}]`);
  });

  ensureOptionalBoolean(request.include_interpretation, `${context}.include_interpretation`);

  return request;
};

export const validateElementalDignitiesRequest = (
  request: ElementalDignitiesRequest,
  context = 'ElementalDignitiesRequest',
): ElementalDignitiesRequest => {
  if (!request || typeof request !== 'object') {
    throw new AstrologyError(`${context} is required.`);
  }

  if (!Array.isArray(request.cards) || request.cards.length === 0) {
    throw new AstrologyError(`${context}.cards must include at least one entry.`);
  }

  const cards = request.cards as Array<NonNullable<ElementalDignitiesRequest['cards']>[number]>;

  cards.forEach((card, index) => {
    if (!card || typeof card !== 'object' || Array.isArray(card)) {
      throw new AstrologyError(`${context}.cards[${index}] must be an object.`);
    }

    ensureNonEmptyString(card.id, `${context}.cards[${index}].id`);
    ensureIntegerInRange(card.position, [1, 78], `${context}.cards[${index}].position`);
  });

  if (request.spread_type !== undefined && request.spread_type !== null) {
    ensureNonEmptyString(request.spread_type, `${context}.spread_type`);
  }

  return request;
};

export const validateTimingAnalysisRequest = (
  request: TimingAnalysisRequest,
  context = 'TimingAnalysisRequest',
): TimingAnalysisRequest => {
  if (!request || typeof request !== 'object') {
    throw new AstrologyError(`${context} is required.`);
  }

  if (!Array.isArray(request.cards) || request.cards.length === 0) {
    throw new AstrologyError(`${context}.cards must include at least one entry.`);
  }

  request.cards.forEach((card, index) => ensureNonEmptyString(card, `${context}.cards[${index}]`));

  if (request.birth_data) {
    validateDateTimeLocation(request.birth_data, `${context}.birth_data`);
  }

  if (request.question_type !== undefined && request.question_type !== null) {
    ensureNonEmptyString(request.question_type, `${context}.question_type`);
  }

  return request;
};

export const validateOptimalTimesRequest = (
  request: OptimalTimesRequest,
  context = 'OptimalTimesRequest',
): OptimalTimesRequest => {
  if (!request || typeof request !== 'object') {
    throw new AstrologyError(`${context} is required.`);
  }

  if (!request.birth_data) {
    throw new AstrologyError(`${context}.birth_data is required.`);
  }
  validateDateTimeLocation(request.birth_data, `${context}.birth_data`);

  ensureNonEmptyString(request.question_type, `${context}.question_type`);

  if (!request.date_range || typeof request.date_range !== 'object') {
    throw new AstrologyError(`${context}.date_range is required.`);
  }

  const start = request.date_range.start_date ?? request.date_range.start;
  const end = request.date_range.end_date ?? request.date_range.end;

  if (typeof start !== 'string') {
    throw new AstrologyError(`${context}.date_range.start_date is required.`);
  }
  if (typeof end !== 'string') {
    throw new AstrologyError(`${context}.date_range.end_date is required.`);
  }

  validateIsoDateString(start, `${context}.date_range.start_date`);
  validateIsoDateString(end, `${context}.date_range.end_date`);

  return request;
};

export const validateBirthCardFlexibleRequest = (
  request: BirthCardFlexibleRequest,
  context = 'BirthCardFlexibleRequest',
): BirthCardFlexibleRequest => {
  if (!request || typeof request !== 'object') {
    throw new AstrologyError(`${context} is required.`);
  }

  const hasSubject = request.subject && typeof request.subject === 'object';
  const hasBirthDate = request.birth_date !== undefined && request.birth_date !== null;

  if (!hasSubject && !hasBirthDate) {
    throw new AstrologyError(`${context} must include either subject or birth_date.`);
  }

  if (hasBirthDate && request.birth_date !== null) {
    if (typeof request.birth_date !== 'string') {
      throw new AstrologyError(`${context}.birth_date must be a string if provided.`, {
        details: { value: request.birth_date },
      });
    }
    validateIsoDateString(request.birth_date, `${context}.birth_date`);
  }

  if (hasSubject && request.subject !== null) {
    validateSubject(request.subject as unknown as Subject, `${context}.subject`);
  }

  if (request.include_interpretation !== undefined && request.include_interpretation !== null) {
    ensureBoolean(request.include_interpretation, `${context}.include_interpretation`);
  }

  return request;
};

export const validateTarotTransitReportRequest = (
  request: TarotTransitReportRequest,
  context = 'TarotTransitReportRequest',
): TarotTransitReportRequest => {
  if (!request || typeof request !== 'object') {
    throw new AstrologyError(`${context} is required.`);
  }

  if (!request.birth_data) {
    throw new AstrologyError(`${context}.birth_data is required.`);
  }
  validateDateTimeLocation(request.birth_data, `${context}.birth_data`);

  if (request.life_area !== undefined && request.life_area !== null) {
    ensureNonEmptyString(request.life_area, `${context}.life_area`);
  }

  ensureBoolean(request.include_timing, `${context}.include_timing`);
  ensureOptionalEnumString(request.interpretation_depth, TAROT_INTERPRETATION_DEPTHS, `${context}.interpretation_depth`);
  ensureNonEmptyString(request.language, `${context}.language`);

  return request;
};

export const validateTarotNatalReportRequest = (
  request: TarotNatalReportRequest,
  context = 'TarotNatalReportRequest',
): TarotNatalReportRequest => {
  if (!request || typeof request !== 'object') {
    throw new AstrologyError(`${context} is required.`);
  }

  if (!request.birth_data) {
    throw new AstrologyError(`${context}.birth_data is required.`);
  }
  validateDateTimeLocation(request.birth_data, `${context}.birth_data`);

  if (request.life_area !== undefined && request.life_area !== null) {
    ensureNonEmptyString(request.life_area, `${context}.life_area`);
  }

  ensureBoolean(request.include_timing, `${context}.include_timing`);
  ensureOptionalEnumString(request.interpretation_depth, TAROT_INTERPRETATION_DEPTHS, `${context}.interpretation_depth`);
  ensureNonEmptyString(request.language, `${context}.language`);

  return request;
};

export const validateTarotCardId = (cardId: string, context = 'cardId'): string => ensureNonEmptyString(cardId, context);

export const validateLunarPhasesRequest = (
  request: LunarPhasesRequest,
  context = 'LunarPhasesRequest',
): void => {
  validateDateTimeLocation(request.datetime_location, `${context}.datetime_location`);
  validateDaysAhead(request.days_ahead ?? undefined, `${context}.days_ahead`);
};

export const validateLunarEventsRequest = (
  request: LunarEventsRequest,
  context = 'LunarEventsRequest',
): void => {
  validateDateTimeLocation(request.datetime_location, `${context}.datetime_location`);
  validateDaysAhead(request.days_ahead ?? undefined, `${context}.days_ahead`, 0, 365);
};

export const validateLunarMansionsRequest = (
  request: LunarMansionsRequest,
  context = 'LunarMansionsRequest',
): void => {
  validateDateTimeLocation(request.datetime_location, `${context}.datetime_location`);
  validateDaysAhead(request.days_ahead ?? undefined, `${context}.days_ahead`, 0, 365);

  if (request.system !== undefined && request.system !== null) {
    if (!LUNAR_MANSION_SYSTEMS.has(request.system)) {
      throw new AstrologyError(
        `${context}.system must be one of ${Array.from(LUNAR_MANSION_SYSTEMS).join(', ')}.`,
        { details: { value: request.system } },
      );
    }
  }
};

export const validateVoidOfCourseRequest = (
  request: VoidOfCourseRequest,
  context = 'VoidOfCourseRequest',
): void => {
  validateDateTimeLocation(request.datetime_location, `${context}.datetime_location`);
  validateDaysAhead(request.days_ahead ?? undefined, `${context}.days_ahead`, 0, 365);
  ensureOptionalBoolean(request.use_modern_planets, `${context}.use_modern_planets`);
};

export const validateLunarCalendarYear = (year: number, context = 'LunarCalendarRequest.year'): void => {
  ensureChineseYear(year, context);
};

export const validateLunarCalendarParams = (
  params: LunarCalendarParams | undefined,
  context = 'LunarCalendarRequest',
): LunarCalendarParams | undefined => {
  if (!params) {
    return undefined;
  }

  if (params.month !== undefined && params.month !== null) {
    ensureIntegerInRange(params.month, [1, 12], `${context}.month`);
  }

  return params;
};

export const validateIsoDateString = (value: string, field: string): void => {
  validateIsoDateInternal(value, field);
};

export const validateReturnYear = (year: number, field: string): void => {
  ensureIntegerInRange(year, YEAR_RANGE, field);
};

export const validateOptionalDateTimeLocation = (
  value: DateTimeLocation | null | undefined,
  context: string,
): void => {
  if (value) {
    validateDateTimeLocation(value, context);
  }
};

export const validateDateRange = (range: DateRange, context: string): void => {
  if (!range) {
    throw new AstrologyError(`${context} is required.`);
  }

  if (!range.start_date || !range.end_date) {
    throw new AstrologyError(`${context} must include start_date and end_date.`);
  }

  validateSimpleDate(range.start_date, `${context}.start_date`);
  validateSimpleDate(range.end_date, `${context}.end_date`);
};

export const validateOptionalDateRange = (
  range: DateRange | null | undefined,
  context: string,
): void => {
  if (range) {
    validateDateRange(range, context);
  }
};

export const validateProgressionTypeValue = (
  progressionType: ProgressionType,
  field: string,
): void => {
  if (!PROGRESSION_TYPE_SET.has(progressionType)) {
    throw new AstrologyError(`${field} must be one of ${Array.from(PROGRESSION_TYPE_SET).join(', ')}.`, {
      details: { value: progressionType },
    });
  }
};

export const validateDirectionTypeValue = (directionType: DirectionType, field: string): void => {
  if (!DIRECTION_TYPE_SET.has(directionType)) {
    throw new AstrologyError(`${field} must be one of ${Array.from(DIRECTION_TYPE_SET).join(', ')}.`, {
      details: { value: directionType },
    });
  }
};

export const validateOrbValue = (orb: number, field: string): void => {
  ensurePositiveNumber(orb, field);
};

export const validateArcRate = (arcRate: number | null | undefined, field: string): void => {
  if (arcRate === null || arcRate === undefined) {
    return;
  }

  ensurePositiveNumber(arcRate, field);
};

export const validateNatalReportRequest = (
  request: NatalReportRequest,
  context = 'NatalReportRequest',
): void => {
  validateSubject(request.subject, `${context}.subject`);
};

export const validateSynastryReportRequest = (
  request: SynastryReportRequest,
  context = 'SynastryReportRequest',
): void => {
  validateSubject(request.subject1, `${context}.subject1`);
  validateSubject(request.subject2, `${context}.subject2`);
};

export const validateCompositeReportRequest = (
  request: CompositeReportRequest,
  context = 'CompositeReportRequest',
): void => {
  validateSubject(request.subject1, `${context}.subject1`);
  validateSubject(request.subject2, `${context}.subject2`);
};

export const validateCompatibilityRequest = (
  request: CompatibilityRequest,
  context = 'CompatibilityRequest',
): void => {
  const subjects = request.subjects;
  if (!subjects || subjects.length < 2) {
    throw new AstrologyError(`${context}.subjects must include at least two entries.`);
  }

  subjects.forEach((subject, index) => validateSubject(subject, `${context}.subjects[${index}]`));
};

export const validateSynastryChartRequest = (
  request: SynastryChartRequest,
  context = 'SynastryChartRequest',
): void => {
  validateSubject(request.subject1, `${context}.subject1`);
  validateSubject(request.subject2, `${context}.subject2`);
};

export const validateRelationshipAnalysisRequest = (
  request: RelationshipAnalysisRequest,
  context = 'RelationshipAnalysisRequest',
): void => {
  const subjects = request.subjects;
  if (!subjects || subjects.length < 2) {
    throw new AstrologyError(`${context}.subjects must include at least two entries.`);
  }

  subjects.forEach((subject, index) => validateSubject(subject, `${context}.subjects[${index}]`));
};

export const validateTraditionalAnalysisRequest = (
  request: TraditionalAnalysisRequest,
  context = 'TraditionalAnalysisRequest',
): void => {
  if (!request || typeof request !== 'object') {
    throw new AstrologyError(`${context} is required.`);
  }

  validateSubject(request.subject, `${context}.subject`);

  if (request.orbs !== undefined && request.orbs !== null) {
    if (typeof request.orbs !== 'object' || Array.isArray(request.orbs)) {
      throw new AstrologyError(`${context}.orbs must be an object when provided.`, {
        details: { value: request.orbs },
      });
    }

    Object.entries(request.orbs).forEach(([key, value]) => {
      if (typeof value !== 'number' || Number.isNaN(value)) {
        throw new AstrologyError(`${context}.orbs.${key} must be a finite number.`, {
          details: { value },
        });
      }
      ensureNonNegativeNumber(value, `${context}.orbs.${key}`);
    });
  }
};

export const validateAnnualProfectionRequest = (
  request: AnnualProfectionRequest,
  context = 'AnnualProfectionRequest',
): void => {
  if (!request || typeof request !== 'object') {
    throw new AstrologyError(`${context} is required.`);
  }

  validateSubject(request.subject, `${context}.subject`);

  if (request.current_date !== undefined && request.current_date !== null) {
    if (typeof request.current_date !== 'string') {
      throw new AstrologyError(`${context}.current_date must be a string.`, {
        details: { value: request.current_date },
      });
    }
    validateIsoDateString(request.current_date, `${context}.current_date`);
  }

  if (request.current_age !== undefined && request.current_age !== null) {
    if (typeof request.current_age !== 'number' || Number.isNaN(request.current_age)) {
      throw new AstrologyError(`${context}.current_age must be a number.`, {
        details: { value: request.current_age },
      });
    }
    ensureIntegerInRange(request.current_age, [0, 120], `${context}.current_age`);
  }
};

export const validateProfectionTimelineRequest = (
  request: ProfectionTimelineRequest,
  context = 'ProfectionTimelineRequest',
): void => {
  if (!request || typeof request !== 'object') {
    throw new AstrologyError(`${context} is required.`);
  }

  validateSubject(request.subject, `${context}.subject`);
  ensureIntegerInRange(request.start_age, [0, 120], `${context}.start_age`);
  ensureIntegerInRange(request.end_age, [0, 120], `${context}.end_age`);

  if (request.end_age < request.start_age) {
    throw new AstrologyError(`${context}.end_age must be greater than or equal to start_age.`, {
      details: { start_age: request.start_age, end_age: request.end_age },
    });
  }
};

export const validateProgressionReportRequest = (
  request: ProgressionReportRequest,
  context = 'ProgressionReportRequest',
): void => {
  validateSubject(request.subject, `${context}.subject`);
  validateIsoDateInternal(request.target_date, `${context}.target_date`);
  validateProgressionTypeValue(request.progression_type, `${context}.progression_type`);
  validateOptionalDateTimeLocation(request.location ?? null, `${context}.location`);
};

export const validateDirectionReportRequest = (
  request: DirectionReportRequest,
  context = 'DirectionReportRequest',
): void => {
  validateSubject(request.subject, `${context}.subject`);
  validateIsoDateInternal(request.target_date, `${context}.target_date`);
  validateDirectionTypeValue(request.direction_type, `${context}.direction_type`);
  validateArcRate(request.arc_rate, `${context}.arc_rate`);
};

export const validateLunarReturnReportRequest = (
  request: LunarReturnReportRequest,
  context = 'LunarReturnReportRequest',
): void => {
  validateSubject(request.subject, `${context}.subject`);
  validateIsoDateInternal(request.return_date, `${context}.return_date`);
  validateOptionalDateTimeLocation(request.return_location ?? null, `${context}.return_location`);
};

export const validateSolarReturnReportRequest = (
  request: SolarReturnReportRequest,
  context = 'SolarReturnReportRequest',
): void => {
  validateSubject(request.subject, `${context}.subject`);
  validateReturnYear(request.return_year, `${context}.return_year`);
  validateOptionalDateTimeLocation(request.return_location ?? null, `${context}.return_location`);
};

export const validateNatalTransitRequest = (
  request: NatalTransitRequest,
  context = 'NatalTransitRequest',
): void => {
  validateSubject(request.subject, `${context}.subject`);
  validateOrbValue(request.orb, `${context}.orb`);
  validateOptionalDateRange(request.date_range ?? undefined, `${context}.date_range`);
};

export const validateSolarReturnTransitRequest = (
  request: SolarReturnTransitRequest,
  context = 'SolarReturnTransitRequest',
): void => {
  validateSubject(request.subject, `${context}.subject`);
  validateReturnYear(request.return_year, `${context}.return_year`);
  validateOptionalDateTimeLocation(request.return_location ?? null, `${context}.return_location`);
  validateDateRange(request.date_range, `${context}.date_range`);
  validateOrbValue(request.orb, `${context}.orb`);
};

export const validateLunarReturnTransitRequest = (
  request: LunarReturnTransitRequest,
  context = 'LunarReturnTransitRequest',
): void => {
  validateSubject(request.subject, `${context}.subject`);
  validateIsoDateInternal(request.return_date, `${context}.return_date`);
  validateOptionalDateTimeLocation(request.return_location ?? null, `${context}.return_location`);
  validateDateRange(request.date_range, `${context}.date_range`);
  validateOrbValue(request.orb, `${context}.orb`);
};

export const validateLunarAnalysisRequest = (
  request: LunarAnalysisRequest,
  context = 'LunarAnalysisRequest',
): void => {
  validateDateTimeLocation(request.datetime_location, `${context}.datetime_location`);
  if (request.tradition !== undefined && request.tradition !== null && !String(request.tradition).trim()) {
    throw new AstrologyError(`${context}.tradition cannot be empty when provided.`);
  }
  if (request.language !== undefined && request.language !== null && !String(request.language).trim()) {
    throw new AstrologyError(`${context}.language cannot be empty when provided.`);
  }
};

export const validateCitySearchParams = (
  params: CitySearchParams | undefined,
  context = 'CitySearchParams',
): void => {
  if (!params) {
    return;
  }

  if (params.sort_by && !CITY_SORT_BY_VALUES.has(params.sort_by)) {
    throw new AstrologyError(
      `${context}.sort_by must be one of ${Array.from(CITY_SORT_BY_VALUES).join(', ')}.`,
      { details: { value: params.sort_by } },
    );
  }

  if (params.sort_order && !SORT_ORDER_VALUES.has(params.sort_order)) {
    throw new AstrologyError(
      `${context}.sort_order must be one of ${Array.from(SORT_ORDER_VALUES).join(', ')}.`,
      { details: { value: params.sort_order } },
    );
  }

  ensureIntegerInRange(params.limit ?? null, [1, 1000], `${context}.limit`);
  ensureIntegerInRange(params.offset ?? null, [0, Number.MAX_SAFE_INTEGER], `${context}.offset`);
};

export const validateActivePointsQuery = (
  query: ActivePointsQuery | undefined,
  context = 'ActivePointsQuery',
): void => {
  if (!query || query.type === undefined || query.type === null) {
    return;
  }

  if (!ACTIVE_POINT_TYPE_SET.has(query.type)) {
    throw new AstrologyError(`${context}.type must be one of ${Array.from(ACTIVE_POINT_TYPE_SET).join(', ')}.`, {
      details: { value: query.type },
    });
  }
};

export const validatePrimaryActivePointsQuery = (
  query: PrimaryActivePointsQuery | undefined,
  context = 'PrimaryActivePointsQuery',
): void => {
  if (!query || query.type === undefined || query.type === null) {
    return;
  }

  if (!PRIMARY_ACTIVE_POINT_TYPE_SET.has(query.type)) {
    throw new AstrologyError(
      `${context}.type must be one of ${Array.from(PRIMARY_ACTIVE_POINT_TYPE_SET).join(', ')}.`,
      { details: { value: query.type } },
    );
  }
};

export const validateHousesRequest = (request: HousesRequest | undefined, context = 'HousesRequest'): void => {
  if (!request || request.house_system === undefined || request.house_system === null) {
    return;
  }

  if (!HOUSE_SYSTEM_CODES.has(request.house_system)) {
    throw new AstrologyError(
      `${context}.house_system must be one of ${Array.from(HOUSE_SYSTEM_CODES).join(', ')}.`,
      { details: { value: request.house_system } },
    );
  }
};

export const validateKeywordsRequest = (
  request: KeywordsRequest | undefined,
  context = 'KeywordsRequest',
): void => {
  if (!request || request.category === undefined || request.category === null) {
    return;
  }

  if (!KEYWORDS_CATEGORY_SET.has(request.category)) {
    throw new AstrologyError(
      `${context}.category must be one of ${Array.from(KEYWORDS_CATEGORY_SET).join(', ')}.`,
      { details: { value: request.category } },
    );
  }
};

export const validateLifeAreasRequest = (
  request: LifeAreasRequest | undefined,
  context = 'LifeAreasRequest',
): void => {
  if (!request || request.language === undefined || request.language === null) {
    return;
  }

  if (!LIFE_AREAS_LANGUAGES.has(request.language)) {
    throw new AstrologyError(
      `${context}.language must be one of ${Array.from(LIFE_AREAS_LANGUAGES).join(', ')}.`,
      { details: { value: request.language } },
    );
  }
};

const validateMapRegion = (region: MapRegion | null | undefined, context: string): void => {
  if (!region) {
    return;
  }

  const [latitudeStart, latitudeEnd] = region.latitude_range;
  const [longitudeStart, longitudeEnd] = region.longitude_range;

  if (!Number.isFinite(latitudeStart) || latitudeStart < -90 || latitudeStart > 90) {
    throw new AstrologyError(`${context}.latitude_range[0] must be between -90 and 90.`, {
      details: { value: latitudeStart },
    });
  }

  if (!Number.isFinite(latitudeEnd) || latitudeEnd < -90 || latitudeEnd > 90) {
    throw new AstrologyError(`${context}.latitude_range[1] must be between -90 and 90.`, {
      details: { value: latitudeEnd },
    });
  }

  if (latitudeEnd <= latitudeStart) {
    throw new AstrologyError(`${context}.latitude_range must be in ascending order.`, {
      details: { latitudeStart, latitudeEnd },
    });
  }

  if (!Number.isFinite(longitudeStart) || longitudeStart < -180 || longitudeStart > 180) {
    throw new AstrologyError(`${context}.longitude_range[0] must be between -180 and 180.`, {
      details: { value: longitudeStart },
    });
  }

  if (!Number.isFinite(longitudeEnd) || longitudeEnd < -180 || longitudeEnd > 180) {
    throw new AstrologyError(`${context}.longitude_range[1] must be between -180 and 180.`, {
      details: { value: longitudeEnd },
    });
  }

  if (longitudeEnd <= longitudeStart) {
    throw new AstrologyError(`${context}.longitude_range must be in ascending order.`, {
      details: { longitudeStart, longitudeEnd },
    });
  }
};

const validateAstrocartographyOptions = (
  options: AstrocartographyOptions | null | undefined,
  context: string,
): void => {
  if (!options) {
    return;
  }

  if (!Array.isArray(options.planets) || options.planets.length === 0) {
    throw new AstrologyError(`${context}.planets must include at least one planet.`);
  }

  validateStringArray(options.planets, `${context}.planets`);

  if (!Array.isArray(options.line_types) || options.line_types.length === 0) {
    throw new AstrologyError(`${context}.line_types must include at least one line type.`);
  }

  options.line_types.forEach((lineType, index) => {
    if (!ASTRO_LINE_TYPES.has(lineType)) {
      throw new AstrologyError(`${context}.line_types[${index}] must be one of ${Array.from(ASTRO_LINE_TYPES).join(', ')}.`, {
        details: { value: lineType },
      });
    }
  });

  if (!MAP_PROJECTIONS.has(options.map_projection)) {
    throw new AstrologyError(`${context}.map_projection must be one of ${Array.from(MAP_PROJECTIONS).join(', ')}.`, {
      details: { value: options.map_projection },
    });
  }

  if (!CITY_SELECTION_ALGORITHMS.has(options.city_selection_algorithm)) {
    throw new AstrologyError(
      `${context}.city_selection_algorithm must be one of ${Array.from(CITY_SELECTION_ALGORITHMS).join(', ')}.`,
      { details: { value: options.city_selection_algorithm } },
    );
  }

  ensureNonNegativeNumber(options.coordinate_precision, `${context}.coordinate_precision`);
  ensureNonNegativeNumber(options.line_orb_tolerance, `${context}.line_orb_tolerance`);
  ensureIntegerInRange(options.max_cities_per_country, [0, Number.MAX_SAFE_INTEGER], `${context}.max_cities_per_country`);
  ensureIntegerInRange(options.max_cities_per_line, [0, Number.MAX_SAFE_INTEGER], `${context}.max_cities_per_line`);

  if (options.region) {
    validateMapRegion(options.region, `${context}.region`);
  }
};

const validateVisualOptions = (options: VisualOptions | null | undefined, context: string): void => {
  if (!options) {
    return;
  }

  ensurePositiveNumber(options.width, `${context}.width`);
  ensurePositiveNumber(options.height, `${context}.height`);
  ensurePositiveNumber(options.line_width, `${context}.line_width`);
  ensureNonNegativeNumber(options.city_min_population, `${context}.city_min_population`);
  ensureNonNegativeNumber(options.city_search_radius_km, `${context}.city_search_radius_km`);
  ensureIntegerInRange(options.max_power_zones, [0, Number.MAX_SAFE_INTEGER], `${context}.max_power_zones`);
  ensureNumberInRange(options.min_power_zone_strength, [0, 1], `${context}.min_power_zone_strength`);
  ensureIntegerInRange(options.planet_emoji_count, [0, Number.MAX_SAFE_INTEGER], `${context}.planet_emoji_count`);

  if (!LEGEND_POSITIONS.has(options.legend_position)) {
    throw new AstrologyError(`${context}.legend_position must be one of ${Array.from(LEGEND_POSITIONS).join(', ')}.`, {
      details: { value: options.legend_position },
    });
  }

  if (!CITY_LABEL_STYLES.has(options.city_label_style)) {
    throw new AstrologyError(`${context}.city_label_style must be one of ${Array.from(CITY_LABEL_STYLES).join(', ')}.`, {
      details: { value: options.city_label_style },
    });
  }

  if (!LINE_LABEL_STYLES.has(options.line_label_style)) {
    throw new AstrologyError(`${context}.line_label_style must be one of ${Array.from(LINE_LABEL_STYLES).join(', ')}.`, {
      details: { value: options.line_label_style },
    });
  }

  if (!COLOR_SCHEMES.has(options.color_scheme)) {
    throw new AstrologyError(`${context}.color_scheme must be one of ${Array.from(COLOR_SCHEMES).join(', ')}.`, {
      details: { value: options.color_scheme },
    });
  }
};

const validateLocationInput = (location: LocationInput | null | undefined, context: string): void => {
  if (!location) {
    throw new AstrologyError(`${context} is required.`);
  }

  const hasCity = typeof location.city === 'string' && location.city.trim().length > 0;
  const hasLatitude = location.latitude !== undefined && location.latitude !== null;
  const hasLongitude = location.longitude !== undefined && location.longitude !== null;

  if (location.city !== undefined && typeof location.city === 'string' && !location.city.trim()) {
    throw new AstrologyError(`${context}.city must be a non-empty string when provided.`);
  }

  if (location.country_code !== undefined && typeof location.country_code === 'string' && !location.country_code.trim()) {
    throw new AstrologyError(`${context}.country_code must be a non-empty string when provided.`);
  }

  if (hasLatitude !== hasLongitude) {
    throw new AstrologyError(`${context} must include both latitude and longitude when providing coordinates.`);
  }

  if (!hasCity && !hasLatitude) {
    throw new AstrologyError(`${context} must include a city or geographic coordinates.`);
  }

  if (hasLatitude && typeof location.latitude === 'number') {
    ensureNumberInRange(location.latitude, [-90, 90], `${context}.latitude`);
  }

  if (hasLongitude && typeof location.longitude === 'number') {
    ensureNumberInRange(location.longitude, [-180, 180], `${context}.longitude`);
  }
};

const validateSearchCriteria = (criteria: SearchCriteria | null | undefined, context: string): void => {
  if (!criteria) {
    return;
  }

  if (!LIFE_AREA_VALUES.has(criteria.life_area)) {
    throw new AstrologyError(`${context}.life_area must be one of ${Array.from(LIFE_AREA_VALUES).join(', ')}.`, {
      details: { value: criteria.life_area },
    });
  }

  validateStringArray(criteria.preferred_planets ?? undefined, `${context}.preferred_planets`);
  validateEnumStringArray(criteria.preferred_line_types ?? undefined, ASTRO_LINE_TYPES, `${context}.preferred_line_types`);
  ensureNumberInRange(criteria.minimum_score, [0, 10], `${context}.minimum_score`);
  ensurePositiveNumber(criteria.orb_tolerance, `${context}.orb_tolerance`);
};

const validateLocationFilters = (filters: LocationFilters | null | undefined, context: string): void => {
  if (!filters) {
    return;
  }

  validateStringArray(filters.countries ?? undefined, `${context}.countries`);
  validateStringArray(filters.continents ?? undefined, `${context}.continents`);
  validateStringArray(filters.climate_zones ?? undefined, `${context}.climate_zones`);
  validateStringArray(filters.languages ?? undefined, `${context}.languages`);
  validateStringArray(filters.exclude_cities ?? undefined, `${context}.exclude_cities`);

  ensureNonNegativeNumber(filters.min_population, `${context}.min_population`);

  if (filters.max_population !== undefined && filters.max_population !== null) {
    ensureNonNegativeNumber(filters.max_population, `${context}.max_population`);
    if (filters.max_population < filters.min_population) {
      throw new AstrologyError(`${context}.max_population must be greater than or equal to min_population.`, {
        details: { min_population: filters.min_population, max_population: filters.max_population },
      });
    }
  }
};

const validateRelocationOptions = (options: RelocationOptions | null | undefined, context: string): void => {
  if (!options) {
    return;
  }

  if (options.target_location) {
    validateLocationInput(options.target_location, `${context}.target_location`);
  }

  ensurePositiveNumber(options.orb_tolerance, `${context}.orb_tolerance`);
};

export const validateAstrocartographyLinesRequest = (
  request: AstrocartographyLinesRequest,
  context = 'AstrocartographyLinesRequest',
): void => {
  validateSubject(request.subject, `${context}.subject`);
  ensureIntegerInRange(request.coordinate_density, [1, Number.MAX_SAFE_INTEGER], `${context}.coordinate_density`);
  validateAstrocartographyOptions(request.options ?? null, `${context}.options`);
};

export const validateAstrocartographyMapRequest = (
  request: AstrocartographyMapRequest,
  context = 'AstrocartographyMapRequest',
): void => {
  validateSubject(request.subject, `${context}.subject`);
  validateAstrocartographyOptions(request.map_options ?? null, `${context}.map_options`);
  validateVisualOptions(request.visual_options ?? null, `${context}.visual_options`);
};

export const validateParanMapRequest = (request: ParanMapRequest, context = 'ParanMapRequest'): void => {
  validateSubject(request.subject, `${context}.subject`);
  validateVisualOptions(request.visual_options ?? null, `${context}.visual_options`);
};

export const validateLocationAnalysisRequest = (
  request: LocationAnalysisRequest,
  context = 'LocationAnalysisRequest',
): void => {
  validateSubject(request.subject, `${context}.subject`);
  validateLocationInput(request.location, `${context}.location`);
};

export const validateCompareLocationsRequest = (
  request: CompareLocationsRequest,
  context = 'CompareLocationsRequest',
): void => {
  validateSubject(request.subject, `${context}.subject`);

  if (!Array.isArray(request.locations) || request.locations.length < 2) {
    throw new AstrologyError(`${context}.locations must include at least two locations for comparison.`);
  }

  request.locations.forEach((location, index) =>
    validateLocationInput(location, `${context}.locations[${index}]`),
  );
};

export const validatePowerZonesRequest = (request: PowerZonesRequest, context = 'PowerZonesRequest'): void => {
  validateSubject(request.subject, `${context}.subject`);
};

export const validateSearchLocationsRequest = (
  request: SearchLocationsRequest,
  context = 'SearchLocationsRequest',
): void => {
  validateSubject(request.subject, `${context}.subject`);
  validateSearchCriteria(request.search_criteria ?? null, `${context}.search_criteria`);
  validateLocationFilters(request.location_filters ?? null, `${context}.location_filters`);
};

export const validateRelocationChartRequest = (
  request: RelocationChartRequest,
  context = 'RelocationChartRequest',
): void => {
  validateSubject(request.subject, `${context}.subject`);
  validateRelocationOptions(request.options ?? null, `${context}.options`);
};

