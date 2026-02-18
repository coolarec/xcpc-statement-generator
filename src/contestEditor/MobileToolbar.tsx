import { type FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faGear, faFilePdf, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import type { ContestWithImages } from "@/types/contest";

interface MobileToolbarProps {
  contestData: ContestWithImages;
  activeId: string;
  onSelectProblem: (key: string) => void;
  onAddProblem: () => void;
  onOpenSettings: () => void;
  onExportPdf: () => void;
  onExportCurrentProblem?: () => void;
  exportDisabled: boolean;
}

const MobileToolbar: FC<MobileToolbarProps> = ({
  contestData,
  activeId,
  onSelectProblem,
  onAddProblem,
  onOpenSettings,
  onExportPdf,
  onExportCurrentProblem,
  exportDisabled,
}) => {
  const { t } = useTranslation();

  const currentProblem = contestData.problems.find(p => p.key === activeId);
  const problemLabel = activeId === 'config' ? t('editor:contestConfig')
    : activeId === 'images' ? t('editor:imageManagement')
    : currentProblem ? `${String.fromCharCode(65 + contestData.problems.indexOf(currentProblem))}. ${currentProblem.problem.display_name}`
    : t('editor:selectProblem');

  return (
    <div className="h-12 flex items-center justify-between px-3 bg-white border-b border-gray-200">
      {/* Problem Selector */}
      <div className="dropdown dropdown-bottom">
        <label tabIndex={0} className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg text-sm max-w-[160px] cursor-pointer">
          <span className="truncate">{problemLabel}</span>
          <FontAwesomeIcon icon={faChevronDown} className="text-xs text-gray-400" />
        </label>
        <ul tabIndex={0} className="dropdown-content menu p-2 shadow-lg bg-white rounded-box w-56 max-h-[60vh] overflow-y-auto border border-gray-200 mt-1">
          <li>
            <button onClick={() => onSelectProblem('config')} className="text-sm">
              <FontAwesomeIcon icon={faGear} className="w-4" />
              {t('editor:contestConfig')}
            </button>
          </li>
          {contestData.problems.map((problem, index) => (
            <li key={problem.key}>
              <button onClick={() => onSelectProblem(problem.key!)} className="text-sm">
                <span className="w-5 h-5 flex items-center justify-center bg-gray-100 rounded text-xs font-medium">
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="truncate">{problem.problem.display_name}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1">
        <button
          className="btn btn-ghost btn-sm btn-square"
          onClick={onAddProblem}
          title={t('editor:addProblem')}
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>

        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-sm btn-square">
            <FontAwesomeIcon icon={faFilePdf} />
          </label>
          <ul tabIndex={0} className="dropdown-content menu p-2 shadow-lg bg-white rounded-box w-40 border border-gray-200 mt-1">
            <li>
              <button
                onClick={onExportPdf}
                disabled={exportDisabled}
                className="text-sm"
              >
                {t('common:exportPdf')}
              </button>
            </li>
            {onExportCurrentProblem && activeId !== 'config' && activeId !== 'images' && (
              <li>
                <button
                  onClick={onExportCurrentProblem}
                  disabled={exportDisabled}
                  className="text-sm"
                >
                  {t('common:exportProblem')}
                </button>
              </li>
            )}
          </ul>
        </div>

        <button
          className="btn btn-ghost btn-sm btn-square"
          onClick={onOpenSettings}
          title={t('common:settings')}
        >
          <FontAwesomeIcon icon={faGear} />
        </button>
      </div>
    </div>
  );
};

export default MobileToolbar;
