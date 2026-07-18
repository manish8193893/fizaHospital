import '../styles/foldercomponent.css';

interface FolderComponentProps {
    title: string;
    value: number;
    subText?: string;
    active?: boolean;
    onClick?: () => void;
}

export default function FolderComponent({
    title,
    value,
    subText,
    active = false,
    onClick,
}: FolderComponentProps) {
    return (
        <div
            className={`folder-component ${active ? 'folder-component-active' : ''}`}
            onClick={onClick}
        >
            <div className="folder-component-bg">
                {active ? (
                    <img src="/Assets/Icons/FolderBlueIcon.svg" alt="FolderBlueIcon" className="folder-component-icon" />
                ) : (
                    <img src="/Assets/Icons/FolderLightBlueIcon.svg" alt="FolderWhiteIcon" className="folder-component-icon" />
                )}
            </div>

            <div className="folder-component-content">
                <div className="folder-component-top">
                </div>

                <div className="folder-component-bottom">
                    <div className="folder-component-value-section">
                        <p className="folder-component-title">{title}</p>
                        <p className="folder-component-value">{value}</p>
                        <p className="folder-component-subtext">{subText}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}