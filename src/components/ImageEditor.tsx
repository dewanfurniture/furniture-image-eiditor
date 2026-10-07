
import { EditorProvider } from '../context/EditorContext';
import Sidebar from './Sidebar/Sidebar';
import CanvasPreview from './Preview/CanvasPreview';
import ImageGallery from './Gallery/ImageGallery';

export default function ImageEditor() {
  return (
    <EditorProvider>
      <div className="w-full h-full bg-[#F5F5F7]/80 text-[#1d1d1f] font-sans selection:bg-yellow-200 selection:text-gray-900 overflow-hidden">
        <div className="flex flex-col lg:flex-row w-full h-full mx-auto p-2 sm:p-4 gap-4 lg:gap-6">
          {/* Left Column: Sidebar Controls */}
          <Sidebar />

          {/* Middle Column: Canvas Preview */}
          <CanvasPreview />

          {/* Right Column: Image Gallery */}
          <ImageGallery />
        </div>
      </div>
    </EditorProvider>
  );
}
