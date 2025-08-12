import { ExplorerItem } from '../components/fileExplorer/types';
import useTransitionTree from './use-transition-tree';

const simpleTree: ExplorerItem = {
    id: 'root',
    name: 'Root',
    isFolder: true,
    items: []
};

const nestedTree: ExplorerItem = {
    id: 'root',
    name: 'Root',
    isFolder: true,
    items: [
        {
            id: 'child1',
            name: 'Child1',
            isFolder: true,
            items: []
        }
    ]
};

test('inserts node into root folder', () => {
    const { insertNode } = useTransitionTree();
    const result = insertNode({
        tree: simpleTree,
        folderId: 'root',
        item: 'NewFolder',
        isFolder: true
    });
    expect(result.items.length).toBe(1);
    expect(result.items[0].name).toBe('NewFolder');
});

test('inserts node into nested folder', () => {
    const { insertNode } = useTransitionTree();
    const result = insertNode({
        tree: nestedTree,
        folderId: 'child1',
        item: 'NestedFile',
        isFolder: false
    });
    expect(result.items[0].items.length).toBe(1);
    expect(result.items[0].items[0].name).toBe('NestedFile');
});

test('does not insert if folderId not found', () => {
    const { insertNode } = useTransitionTree();
    const result = insertNode({
        tree: simpleTree,
        folderId: 'notfound',
        item: 'ShouldNotExist',
        isFolder: false
    });
    // The tree should remain unchanged
    expect(result).toEqual(simpleTree);
});