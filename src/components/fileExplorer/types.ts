// Explorer item interface
export interface ExplorerItem {
    id: number | string;
    name: string;
    isFolder: boolean;
    items: ExplorerItem[];
}

// Insert node params interface
export interface InsertNodeParams {
    tree: ExplorerItem;
    folderId: number | string;
    item: string;
    isFolder: boolean;
}

// Props interface for Folder
export interface FolderProps {
    explorerData: ExplorerItem;
    callbackHandler: (id: number | string, value: string, isFolder: boolean) => void;
}

// State interface for showExplorer
export interface ShowExplorerState {
    isVisible: boolean;
    isFolder: 'folder' | 'file' | null;
}