import { useEffect, useState } from 'react'
import './folder.css'
import { FolderProps, ShowExplorerState } from './types'

function Folder({ explorerData, callbackHandler }: FolderProps) {
    const [showExplorer, setShowExplorer] = useState<ShowExplorerState>({
        isVisible: false,
        isFolder: null
    })
    const showEventHandler = () => {
        setShowExplorer({ ...showExplorer, isVisible: !showExplorer.isVisible })
    }
    const addButtonEventHandler = (e: React.MouseEvent<HTMLButtonElement>, isFolder: boolean) => {
        e.stopPropagation()
        setShowExplorer({ isFolder: isFolder ? "folder" : "file", isVisible: true })
    }
    const createFileHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && (e.target as HTMLInputElement).value) {
            callbackHandler(explorerData.id, (e.target as HTMLInputElement).value, showExplorer.isFolder == 'folder')
            setShowExplorer({ isFolder: null, isVisible: true })
        }
    }
    return (explorerData.isFolder ?
        <div style={{ marginLeft: "25px" }}>
            <div onClick={showEventHandler} className="folder">
                <span>📁{explorerData.name}</span>
                <span>
                    <button onClick={(e) => addButtonEventHandler(e, true)}>+folder</button>
                    <button onClick={(e) => addButtonEventHandler(e, false)}>+file</button></span>
            </div>
            {showExplorer.isFolder && <input autoFocus onKeyDown={createFileHandler} />}
            <div style={{ display: showExplorer.isVisible ? 'block' : 'none' }}>
                {explorerData.items.map((exp: any) =>
                    <Folder key={exp.id} callbackHandler={callbackHandler} explorerData={exp} />
                )}
            </div>
        </div> :
        <div className="file">🗄️{explorerData.name}</div>
    )
}

export default Folder