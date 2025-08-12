import Folder from "./Folder"
import explorer from '../../data/fileExplorer.json'
import useTransitionTree from "../../hooks/use-transition-tree"
import { useEffect, useState } from "react"
import { ExplorerItem, InsertNodeParams } from "./types"

function FileExplorer() {
    const { insertNode } = useTransitionTree()
    const [explorerData, setExplorerData] = useState<ExplorerItem>(explorer)
    const handleInsertNode = (folderId: number | string, item: string, isFolder: boolean) => {
        let finalExplorer = insertNode({ tree: explorer, folderId, item, isFolder } as InsertNodeParams)
        setExplorerData(finalExplorer)
    }
    useEffect(() => {
      console.log(explorerData);
    }, [explorerData])
    
    return (<>
        <Folder callbackHandler={handleInsertNode} explorerData={explorerData} />
    </>)
}

export default FileExplorer