import React, { createContext, useContext, useState, startTransition, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { ImageSetting } from '../types';

function useStickyState<T>(defaultValue: T, key: string): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    try {
      const stickyValue = window.localStorage.getItem(`furniture_editor_${key}`);
      return stickyValue !== null ? JSON.parse(stickyValue) : defaultValue;
    } catch (e) {
      return defaultValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(`furniture_editor_${key}`, JSON.stringify(value));
    } catch (e) {
      console.warn(`Error saving ${key} to localStorage`, e);
    }
  }, [key, value]);

  return [value, setValue];
}


interface EditorContextType {
  mainImages: File[];
  setMainImages: React.Dispatch<React.SetStateAction<File[]>>;
  previewUrls: string[];
  setPreviewUrls: React.Dispatch<React.SetStateAction<string[]>>;
  imageSettings: ImageSetting[];
  setImageSettings: React.Dispatch<React.SetStateAction<ImageSetting[]>>;
  selectedShowroom: string;
  setSelectedShowroom: React.Dispatch<React.SetStateAction<string>>;
  logo: File | null;
  setLogo: React.Dispatch<React.SetStateAction<File | null>>;
  logoUrl: string | null;
  setLogoUrl: React.Dispatch<React.SetStateAction<string | null>>;
  numberText: string;
  setNumberText: React.Dispatch<React.SetStateAction<string>>;
  isProcessing: boolean;
  setIsProcessing: React.Dispatch<React.SetStateAction<boolean>>;
  previewIndex: number;
  setPreviewIndex: React.Dispatch<React.SetStateAction<number>>;
  selectedIndices: Set<number>;
  setSelectedIndices: React.Dispatch<React.SetStateAction<Set<number>>>;
  downloadFormat: 'jpeg' | 'png' | 'webp';
  setDownloadFormat: React.Dispatch<React.SetStateAction<'jpeg' | 'png' | 'webp'>>;
  activeTab: 'basic' | 'logo' | 'design';
  setActiveTab: React.Dispatch<React.SetStateAction<'basic' | 'logo' | 'design'>>;
  isFontDropdownOpen: boolean;
  setIsFontDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
  fontFamily: string;
  setFontFamily: React.Dispatch<React.SetStateAction<string>>;
  logoSize: number;
  setLogoSize: React.Dispatch<React.SetStateAction<number>>;
  enableLogoShadow: boolean;
  setEnableLogoShadow: React.Dispatch<React.SetStateAction<boolean>>;
  logoShadowColor: string;
  setLogoShadowColor: React.Dispatch<React.SetStateAction<string>>;
  logoShadowBlur: number;
  setLogoShadowBlur: React.Dispatch<React.SetStateAction<number>>;
  logoShadowIntensity: number;
  setLogoShadowIntensity: React.Dispatch<React.SetStateAction<number>>;
  numberColor: string;
  setNumberColor: React.Dispatch<React.SetStateAction<string>>;
  numberBgColor: string;
  setNumberBgColor: React.Dispatch<React.SetStateAction<string>>;
  numberSize: number;
  setNumberSize: React.Dispatch<React.SetStateAction<number>>;
  letterSpacing: number;
  setLetterSpacing: React.Dispatch<React.SetStateAction<number>>;
  lineHeight: number;
  setLineHeight: React.Dispatch<React.SetStateAction<number>>;
  fontWeight: 'normal' | 'bold';
  setFontWeight: React.Dispatch<React.SetStateAction<'normal' | 'bold'>>;
  fontStyle: 'normal' | 'italic';
  setFontStyle: React.Dispatch<React.SetStateAction<'normal' | 'italic'>>;
  textDecoration: 'none' | 'underline' | 'line-through';
  setTextDecoration: React.Dispatch<React.SetStateAction<'none' | 'underline' | 'line-through'>>;
  textTransform: 'none' | 'uppercase' | 'lowercase';
  setTextTransform: React.Dispatch<React.SetStateAction<'none' | 'uppercase' | 'lowercase'>>;
  padX: number;
  setPadX: React.Dispatch<React.SetStateAction<number>>;
  padY: number;
  setPadY: React.Dispatch<React.SetStateAction<number>>;
  customRadius: number;
  setCustomRadius: React.Dispatch<React.SetStateAction<number>>;
  brightness: number;
  setBrightness: React.Dispatch<React.SetStateAction<number>>;
  contrast: number;
  setContrast: React.Dispatch<React.SetStateAction<number>>;
  saturation: number;
  setSaturation: React.Dispatch<React.SetStateAction<number>>;
  warmth: number;
  setWarmth: React.Dispatch<React.SetStateAction<number>>;
  numberStyle: 'solid' | 'transparent' | 'outline';
  setNumberStyle: React.Dispatch<React.SetStateAction<'solid' | 'transparent' | 'outline'>>;
  numberOutlineThickness: number;
  setNumberOutlineThickness: React.Dispatch<React.SetStateAction<number>>;
  numberOutlineBlur: number;
  setNumberOutlineBlur: React.Dispatch<React.SetStateAction<number>>;
  enableWatermark: boolean;
  setEnableWatermark: React.Dispatch<React.SetStateAction<boolean>>;
  watermarkText: string;
  setWatermarkText: React.Dispatch<React.SetStateAction<string>>;
  watermarkStyle: 'diagonal' | 'grid' | 'horizontal' | 'custom';
  setWatermarkStyle: React.Dispatch<React.SetStateAction<'diagonal' | 'grid' | 'horizontal' | 'custom'>>;
  watermarkOpacity: number;
  setWatermarkOpacity: React.Dispatch<React.SetStateAction<number>>;
  watermarkSize: number;
  setWatermarkSize: React.Dispatch<React.SetStateAction<number>>;
  watermarkColor: string;
  setWatermarkColor: React.Dispatch<React.SetStateAction<string>>;
  watermarkFontFamily: string;
  setWatermarkFontFamily: React.Dispatch<React.SetStateAction<string>>;
  watermarkFontWeight: 'normal' | 'bold';
  setWatermarkFontWeight: React.Dispatch<React.SetStateAction<'normal' | 'bold'>>;
  watermarkFontStyle: 'normal' | 'italic';
  setWatermarkFontStyle: React.Dispatch<React.SetStateAction<'normal' | 'italic'>>;
  watermarkTextDecoration: 'none' | 'underline' | 'line-through';
  setWatermarkTextDecoration: React.Dispatch<React.SetStateAction<'none' | 'underline' | 'line-through'>>;
  watermarkTextTransform: 'none' | 'uppercase' | 'lowercase';
  setWatermarkTextTransform: React.Dispatch<React.SetStateAction<'none' | 'uppercase' | 'lowercase'>>;
  watermarkLetterSpacing: number;
  setWatermarkLetterSpacing: React.Dispatch<React.SetStateAction<number>>;
  watermarkCustomAngle: number;
  setWatermarkCustomAngle: React.Dispatch<React.SetStateAction<number>>;
  watermarkIsGrid: boolean;
  setWatermarkIsGrid: React.Dispatch<React.SetStateAction<boolean>>;
  watermarkGridSpacing: number;
  setWatermarkGridSpacing: React.Dispatch<React.SetStateAction<number>>;
  updateSetting: <K extends keyof ImageSetting>(key: K, value: ImageSetting[K], globalSetter?: Function) => void;
  removeImage: (index: number) => void;
}

const EditorContext = createContext<EditorContextType | undefined>(undefined);

export const EditorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [mainImages, setMainImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [imageSettings, setImageSettings] = useState<ImageSetting[]>([]);

  const [selectedShowroom, setSelectedShowroom] = useStickyState<string>('', 'selectedShowroom');

  const [logo, setLogo] = useState<File | null>(null);
  const [logoUrl, setLogoUrl] = useStickyState<string | null>(null, 'logoUrl');

  const [numberText, setNumberText] = useStickyState<string>('', 'numberText');
  const [isProcessing, setIsProcessing] = useState(false);
  const [previewIndex, setPreviewIndex] = useState(0);
  const [selectedIndices, setSelectedIndices] = useState<Set<number>>(new Set());

  const [downloadFormat, setDownloadFormat] = useState<'jpeg' | 'png' | 'webp'>('jpeg');
  const [activeTab, setActiveTab] = useState<'basic' | 'logo' | 'design'>('basic');
  const [isFontDropdownOpen, setIsFontDropdownOpen] = useState(false);

  // Global States (act as fallbacks) - Now using localStorage for persistence
  const [fontFamily, setFontFamily] = useStickyState('Montserrat', 'fontFamily');
  const [logoSize, setLogoSize] = useStickyState(15, 'logoSize');
  const [enableLogoShadow, setEnableLogoShadow] = useStickyState(false, 'enableLogoShadow');
  const [logoShadowColor, setLogoShadowColor] = useStickyState('#FFFFFF', 'logoShadowColor');
  const [logoShadowBlur, setLogoShadowBlur] = useStickyState(15, 'logoShadowBlur');
  const [logoShadowIntensity, setLogoShadowIntensity] = useStickyState(1, 'logoShadowIntensity');
  const [numberColor, setNumberColor] = useStickyState('#000000', 'numberColor');
  const [numberBgColor, setNumberBgColor] = useStickyState('#FFD700', 'numberBgColor');
  const [numberSize, setNumberSize] = useStickyState(48, 'numberSize');
  const [letterSpacing, setLetterSpacing] = useStickyState(0, 'letterSpacing');
  const [lineHeight, setLineHeight] = useStickyState(1.2, 'lineHeight');
  const [fontWeight, setFontWeight] = useStickyState<'normal' | 'bold'>('bold', 'fontWeight');
  const [fontStyle, setFontStyle] = useStickyState<'normal' | 'italic'>('normal', 'fontStyle');
  const [textDecoration, setTextDecoration] = useStickyState<'none' | 'underline' | 'line-through'>('none', 'textDecoration');
  const [textTransform, setTextTransform] = useStickyState<'none' | 'uppercase' | 'lowercase'>('none', 'textTransform');
  const [padX, setPadX] = useStickyState(25, 'padX');
  const [padY, setPadY] = useStickyState(15, 'padY');
  const [customRadius, setCustomRadius] = useStickyState(12, 'customRadius');
  const [brightness, setBrightness] = useStickyState(100, 'brightness');
  const [contrast, setContrast] = useStickyState(100, 'contrast');
  const [saturation, setSaturation] = useStickyState(100, 'saturation');
  const [warmth, setWarmth] = useStickyState(0, 'warmth');
  const [numberStyle, setNumberStyle] = useStickyState<'solid' | 'transparent' | 'outline'>('solid', 'numberStyle');
  const [numberOutlineThickness, setNumberOutlineThickness] = useStickyState(5, 'numberOutlineThickness');
  const [numberOutlineBlur, setNumberOutlineBlur] = useStickyState(0, 'numberOutlineBlur');

  const [enableWatermark, setEnableWatermark] = useStickyState(false, 'enableWatermark');
  const [watermarkText, setWatermarkText] = useStickyState('', 'watermarkText');
  const [watermarkStyle, setWatermarkStyle] = useStickyState<'diagonal' | 'grid' | 'horizontal' | 'custom'>('horizontal', 'watermarkStyle');
  const [watermarkOpacity, setWatermarkOpacity] = useStickyState(15, 'watermarkOpacity');
  const [watermarkSize, setWatermarkSize] = useStickyState(48, 'watermarkSize');
  const [watermarkColor, setWatermarkColor] = useStickyState('#ffffff', 'watermarkColor');
  const [watermarkFontFamily, setWatermarkFontFamily] = useStickyState('Montserrat', 'watermarkFontFamily');
  const [watermarkFontWeight, setWatermarkFontWeight] = useStickyState<'normal' | 'bold'>('bold', 'watermarkFontWeight');
  const [watermarkFontStyle, setWatermarkFontStyle] = useStickyState<'normal' | 'italic'>('normal', 'watermarkFontStyle');
  const [watermarkTextDecoration, setWatermarkTextDecoration] = useStickyState<'none' | 'underline' | 'line-through'>('none', 'watermarkTextDecoration');
  const [watermarkTextTransform, setWatermarkTextTransform] = useStickyState<'none' | 'uppercase' | 'lowercase'>('none', 'watermarkTextTransform');
  const [watermarkLetterSpacing, setWatermarkLetterSpacing] = useStickyState(0, 'watermarkLetterSpacing');
  const [watermarkCustomAngle, setWatermarkCustomAngle] = useStickyState(-30, 'watermarkCustomAngle');
  const [watermarkIsGrid, setWatermarkIsGrid] = useStickyState(false, 'watermarkIsGrid');
  const [watermarkGridSpacing, setWatermarkGridSpacing] = useStickyState(200, 'watermarkGridSpacing');

  // Core logic to handle multi-select batch updating
  const updateSetting = <K extends keyof ImageSetting>(key: K, value: ImageSetting[K], globalSetter?: Function) => {
    const isAllSelected = selectedIndices.size > 0 && selectedIndices.size === mainImages.length;

    startTransition(() => {
      // If all images are selected, update globally and clear overrides
      if (isAllSelected && globalSetter) {
        globalSetter(value);
        const newSettings = [...imageSettings];
        newSettings.forEach(setting => {
          if (setting && key in setting) {
            delete setting[key];
          }
        });
        setImageSettings(newSettings);
      } else {
        // If only some images are selected, update overrides for JUST those images
        if (selectedIndices.size === 0) return;
        const newSettings = [...imageSettings];
        selectedIndices.forEach(idx => {
          if (!newSettings[idx]) newSettings[idx] = {} as any;
          newSettings[idx][key] = value;
        });
        setImageSettings(newSettings);
      }
    });
  };

  const removeImage = (indexToRemove: number) => {
    startTransition(() => {
      // Release memory for the preview URL
      const urlToRevoke = previewUrls[indexToRemove];
      if (urlToRevoke) URL.revokeObjectURL(urlToRevoke);

      setMainImages(prev => prev.filter((_, i) => i !== indexToRemove));
      setPreviewUrls(prev => prev.filter((_, i) => i !== indexToRemove));
      setImageSettings(prev => prev.filter((_, i) => i !== indexToRemove));

      setSelectedIndices(prev => {
        const newSet = new Set<number>();
        prev.forEach(idx => {
          if (idx < indexToRemove) newSet.add(idx);
          if (idx > indexToRemove) newSet.add(idx - 1);
        });
        if (newSet.size === 0 && mainImages.length > 1) {
          // If we deleted the only selected image, select the closest one
          const nextIdx = Math.min(indexToRemove, mainImages.length - 2);
          if (nextIdx >= 0) newSet.add(nextIdx);
        }
        return newSet;
      });

      setPreviewIndex(prev => {
        if (prev === indexToRemove) {
          return Math.min(indexToRemove, mainImages.length - 2) >= 0 ? Math.min(indexToRemove, mainImages.length - 2) : 0;
        }
        if (prev > indexToRemove) {
          return prev - 1;
        }
        return prev;
      });
    });
  };

  return (
    <EditorContext.Provider value={{
      mainImages, setMainImages,
      previewUrls, setPreviewUrls,
      imageSettings, setImageSettings,
      selectedShowroom, setSelectedShowroom,
      logo, setLogo,
      logoUrl, setLogoUrl,
      numberText, setNumberText,
      isProcessing, setIsProcessing,
      previewIndex, setPreviewIndex,
      selectedIndices, setSelectedIndices,
      downloadFormat, setDownloadFormat,
      activeTab, setActiveTab,
      isFontDropdownOpen, setIsFontDropdownOpen,
      fontFamily, setFontFamily,
      logoSize, setLogoSize,
      enableLogoShadow, setEnableLogoShadow,
      logoShadowColor, setLogoShadowColor,
      logoShadowBlur, setLogoShadowBlur,
      logoShadowIntensity, setLogoShadowIntensity,
      numberColor, setNumberColor,
      numberBgColor, setNumberBgColor,
      numberSize, setNumberSize,
      letterSpacing, setLetterSpacing,
      lineHeight, setLineHeight,
      fontWeight, setFontWeight,
      fontStyle, setFontStyle,
      textDecoration, setTextDecoration,
      textTransform, setTextTransform,
      padX, setPadX,
      padY, setPadY,
      customRadius, setCustomRadius,
      brightness, setBrightness,
      contrast, setContrast,
      saturation, setSaturation,
      warmth, setWarmth,
      numberStyle, setNumberStyle,
      numberOutlineThickness, setNumberOutlineThickness,
      numberOutlineBlur, setNumberOutlineBlur,
      enableWatermark, setEnableWatermark,
      watermarkText, setWatermarkText,
      watermarkStyle, setWatermarkStyle,
      watermarkOpacity, setWatermarkOpacity,
      watermarkSize, setWatermarkSize,
      watermarkColor, setWatermarkColor,
      watermarkFontFamily, setWatermarkFontFamily,
      watermarkFontWeight, setWatermarkFontWeight,
      watermarkFontStyle, setWatermarkFontStyle,
      watermarkTextDecoration, setWatermarkTextDecoration,
      watermarkTextTransform, setWatermarkTextTransform,
      watermarkLetterSpacing, setWatermarkLetterSpacing,
      watermarkCustomAngle, setWatermarkCustomAngle,
      watermarkIsGrid, setWatermarkIsGrid,
      watermarkGridSpacing, setWatermarkGridSpacing,
      updateSetting,
      removeImage
    }}>
      {children}
    </EditorContext.Provider>
  );
};

export const useEditorContext = () => {
  const context = useContext(EditorContext);
  if (context === undefined) {
    throw new Error('useEditorContext must be used within an EditorProvider');
  }
  return context;
};
