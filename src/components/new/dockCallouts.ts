/**
 * DockBar's callouts. `at`: where the label sits, % of the 1200px frame;
 * `span`: the part of the bar it describes, % of the screenshot. If
 * public/images/dock-bar.jpg is replaced, re-measure both.
 */
export const CALLOUTS: { at: number; label: string; align: 'left' | 'center' | 'right'; span: [number, number] }[] = [
    { at: 6, label: 'The space you’re in', align: 'left', span: [0, 14] },
    { at: 49.6, label: 'Dev server running on :3000', align: 'center', span: [45, 55] },
    { at: 71, label: 'Repo folders, with their branch', align: 'center', span: [66, 94.1] },
    { at: 96.7, label: 'Edit, or switch layout', align: 'right', span: [94.2, 100] },
];
