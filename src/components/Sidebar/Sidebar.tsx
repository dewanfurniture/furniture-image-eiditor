
import { useEditorContext } from '../../context/EditorContext';
import BasicSettings from './Tabs/BasicSettings';
import LogoSettings from './Tabs/LogoSettings';
import DesignSettings from './Tabs/DesignSettings';

export default function Sidebar() {
  const { activeTab, setActiveTab } = useEditorContext();

  const tabs = [
    { id: 'basic', label: 'বেসিক' },
    { id: 'logo', label: 'লোগো' },
    { id: 'design', label: 'ডিজাইন' },
  ];

  return (
    <div className="w-full lg:w-[340px] xl:w-[380px] 2xl:w-[400px] flex-shrink-0 flex flex-col h-full bg-[#F5F5F7] lg:bg-transparent">
      <div className="sticky top-0 z-20 bg-[#F5F5F7]/95 lg:bg-transparent backdrop-blur-md pt-2 pb-4 px-2 lg:px-0">
        <div className="flex bg-gray-200/50 p-1.5 rounded-2xl shadow-inner border border-gray-200/50">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as 'basic' | 'logo' | 'design')}
              className={`flex-1 py-2 text-sm font-semibold rounded-xl transition-all duration-300 ${
                activeTab === tab.id 
                  ? 'bg-white text-[#1d1d1f] shadow-sm shadow-black/5 ring-1 ring-black/5' 
                  : 'text-[#86868b] hover:text-[#1d1d1f] hover:bg-black/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto pr-2 pb-20 lg:pb-0" style={{ scrollbarWidth: 'thin' }}>
        {activeTab === 'basic' && <BasicSettings />}
        {activeTab === 'logo' && <LogoSettings />}
        {activeTab === 'design' && <DesignSettings />}
      </div>
    </div>
  );
}
