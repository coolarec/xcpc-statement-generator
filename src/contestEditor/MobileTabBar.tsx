import { type FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faEye } from "@fortawesome/free-solid-svg-icons";

interface MobileTabBarProps {
  activeTab: 'editor' | 'preview';
  onTabChange: (tab: 'editor' | 'preview') => void;
}

const MobileTabBar: FC<MobileTabBarProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="h-14 flex items-center justify-around bg-white border-t border-gray-200">
      <button
        className={`flex flex-col items-center gap-1 px-6 py-2 transition-colors ${
          activeTab === 'editor' ? 'text-[#1D71B7]' : 'text-gray-400'
        }`}
        onClick={() => onTabChange('editor')}
      >
        <FontAwesomeIcon icon={faPenToSquare} className="text-lg" />
        <span className="text-xs">{/* 编辑 */}</span>
      </button>
      <button
        className={`flex flex-col items-center gap-1 px-6 py-2 transition-colors ${
          activeTab === 'preview' ? 'text-[#1D71B7]' : 'text-gray-400'
        }`}
        onClick={() => onTabChange('preview')}
      >
        <FontAwesomeIcon icon={faEye} className="text-lg" />
        <span className="text-xs">{/* 预览 */}</span>
      </button>
    </div>
  );
};

export default MobileTabBar;
