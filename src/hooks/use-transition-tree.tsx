import { ExplorerItem, InsertNodeParams } from "../components/fileExplorer/types";

function useTransitionTree() {
    function insertNode({tree, folderId, item, isFolder}:InsertNodeParams):ExplorerItem {
        let tempTree = {...tree}
        if(tempTree.id == folderId){
            tempTree.items.unshift({
                id : new Date().getTime(),
                name:item,
                isFolder,
                items:[]
            })
        return tempTree
        }
        let latestNode = []
        latestNode = tree.items.map((obj:ExplorerItem) => {
            return insertNode({tree:obj, folderId, item, isFolder})
        })
        return {...tree, items:latestNode}
    }
    return {insertNode}
}

export default useTransitionTree