/**
 * Splits a blog post's markdown into the pieces the article page lays out
 * (the roundup, comparison-first design). The markdown stays the single
 * source of truth: posts are written in the shape src/config/blog-posts/README.md
 * describes, and anything this doesn't recognise renders as plain markdown
 * in reading order, so a post that isn't a roundup still reads top to bottom.
 *
 *   intro paragraphs            lede (first) + intro (rest); "Full disclosure" pulled out
 *   "The short version" table   price and style tags for each tool card
 *   ## / ### with "What it's best at" + "Where others beat it"   a tool card
 *   "Which one should you pick?" list   the pick cards at the top
 *   **Try …:** paragraph        the closing call to action
 *   ## FAQ with **Q** / A pairs  the accordion
 */

export type Tool = {
    id: string;
    name: string;
    level: 2 | 3;
    us: boolean;
    price?: string;
    style?: string;
    /** Markdown before "What it's best at" (may hold lists). */
    summary: string;
    best: string;
    beats: string;
    /** Markdown after "Where others beat it", e.g. a link to a /vs page. */
    after: string;
};

export type Pick = { want: string; name: string; note?: string; toolId?: string };

export type Block =
    | { kind: 'markdown'; md: string }
    | { kind: 'group'; title: string; md: string }
    | { kind: 'tool'; tool: Tool };

export type ParsedPost = {
    lede: string;
    intro: string;
    disclosure?: string;
    picks: Pick[];
    blocks: Block[];
    tools: Tool[];
    faq: { q: string; a: string }[];
    /** Markdown after the FAQ pairs, e.g. "Looking for a launcher instead? See …". */
    afterFaq: string;
    cta?: string;
};

const BEST = /^\*\*What (?:it's|they're|it’s|they’re) best at:\*\*\s*/i;
const BEATS = /^\*\*Where others beat (?:it|them):\*\*\s*/i;
const CTA = /^\*\*Try (?:CoolDesk free|it):\*\*\s*/i;
const PICK = /^- \*\*["“](.+?)["”]\*\*\s*→\s*(.+)$/;

/** "CoolDesk (that's us)" → "CoolDesk"; keeps the heading otherwise. */
const cleanName = (h: string) => h.replace(/\s*\((?:that['’]s us|the classics|built in|Microsoft)\)\s*$/i, '').trim();
const firstWord = (s: string) => s.toLowerCase().replace(/[^a-z0-9 ]/g, ' ').trim().split(/\s+/)[0] ?? '';
export const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
/** "making a dock yours" → "Making a dock yours", once the label is gone. */
const cap = (s: string) => s.replace(/^([*_]*)(\p{Ll})/u, (_, m, c) => m + c.toUpperCase());
const stripLinks = (s: string) => s.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');

/** Paragraph-ish chunks separated by blank lines. */
const paragraphs = (md: string) =>
    md
        .split(/\n\s*\n/)
        .map((p) => p.trim())
        .filter(Boolean);

type Section = { level: 2 | 3; title: string; body: string };

function sections(md: string): { intro: string; list: Section[] } {
    const list: Section[] = [];
    const intro: string[] = [];
    let cur: Section | null = null;
    for (const line of md.split('\n')) {
        const m = /^(#{2,3}) (.+)$/.exec(line);
        if (m) {
            cur = { level: m[1].length as 2 | 3, title: m[2].trim(), body: '' };
            list.push(cur);
        } else if (cur) cur.body += `${line}\n`;
        else intro.push(line);
    }
    return { intro: intro.join('\n'), list };
}

/** Rows of the first markdown table in `md`, keyed by header. */
function table(md: string): Record<string, string>[] {
    const rows = md.split('\n').filter((l) => /^\|.*\|\s*$/.test(l.trim()));
    if (rows.length < 3) return [];
    const cells = (l: string) => l.trim().slice(1, -1).split('|').map((c) => c.trim());
    const head = cells(rows[0]).map((h) => h.toLowerCase());
    return rows.slice(2).map((r) => Object.fromEntries(cells(r).map((c, i) => [head[i], c])));
}

function toTool(s: Section, rows: Record<string, string>[]): Tool | null {
    const parts = paragraphs(s.body);
    const bi = parts.findIndex((p) => BEST.test(p));
    const wi = parts.findIndex((p) => BEATS.test(p));
    if (bi < 0 || wi < 0) return null;
    const name = cleanName(s.title);
    const row = rows.find((r) => firstWord(r.tool ?? '') === firstWord(name));
    return {
        id: slugify(name),
        name,
        level: s.level,
        us: /^cooldesk/i.test(name),
        price: row?.price,
        style: row?.style ?? row?.type,
        summary: parts.slice(0, bi).join('\n\n'),
        best: cap(parts[bi].replace(BEST, '')),
        beats: cap(parts[wi].replace(BEATS, '')),
        after: parts.slice(wi + 1).join('\n\n'),
    };
}

export function parsePost(content: string): ParsedPost {
    const md = content
        .replace(/^# .+(\r?\n|$)/, '')
        .replace(/^Tags:.*$/m, '')
        .trim();
    const { intro, list } = sections(md);

    const introParts = paragraphs(intro);
    const lede = introParts.shift() ?? '';
    const di = introParts.findIndex((p) => /^Full disclosure:/i.test(p));
    const disclosure = di >= 0 ? introParts.splice(di, 1)[0].replace(/^Full disclosure:\s*/i, '') : undefined;

    const short = list.find((s) => /^the short version$/i.test(s.title));
    const rows = short ? table(short.body) : [];

    let cta: string | undefined;
    const takeCta = (body: string) =>
        paragraphs(body)
            .filter((p) => {
                if (!CTA.test(p)) return true;
                cta = p.replace(CTA, '');
                return false;
            })
            .join('\n\n');

    const blocks: Block[] = [];
    const tools: Tool[] = [];
    let picks: Pick[] = [];
    let faq: { q: string; a: string }[] = [];
    let afterFaq = '';

    for (const s of list) {
        const body = takeCta(s.body);
        // The table only feeds the tool cards when there are cards to feed.
        if (s === short && rows.length && list.some((x) => toTool(x, rows))) continue;

        if (/^which one should you pick\??$/i.test(s.title)) {
            const lines = body.split('\n');
            const parsed = lines.map((l) => PICK.exec(l.trim())).filter((m): m is RegExpExecArray => !!m);
            if (parsed.length) {
                picks = parsed.map(([, want, rest]) => {
                    const plain = stripLinks(rest).split(/\s+—\s+/)[0].trim();
                    const paren = /^(.+?)\s*\((.+)\)$/.exec(plain);
                    return { want, name: paren ? paren[1] : plain, note: paren?.[2] };
                });
                const leftover = lines.filter((l) => !PICK.test(l.trim())).join('\n').trim();
                if (leftover) blocks.push({ kind: 'markdown', md: leftover });
                continue;
            }
        }

        if (/^faq$/i.test(s.title)) {
            const rest: string[] = [];
            for (const p of paragraphs(body)) {
                const m = /^\*\*(.+?)\*\*\s*\n([\s\S]+)$/.exec(p);
                if (m && m[1].trim().endsWith('?')) faq.push({ q: m[1].trim(), a: m[2].trim() });
                else rest.push(p);
            }
            afterFaq = rest.join('\n\n');
            continue;
        }

        const tool = toTool({ ...s, body }, rows);
        if (tool) {
            tools.push(tool);
            blocks.push({ kind: 'tool', tool });
        } else if (s.level === 2) {
            blocks.push({ kind: 'group', title: s.title, md: body });
        } else {
            blocks.push({ kind: 'markdown', md: `### ${s.title}\n\n${body}` });
        }
    }

    // Point each pick at its card; "Bonjourr or Tabliss" goes to Bonjourr.
    picks = picks.map((p) => ({ ...p, toolId: tools.find((t) => firstWord(t.name) === firstWord(p.name))?.id }));
    faq = faq.filter((f) => f.a);

    return { lede, intro: introParts.join('\n\n'), disclosure, picks, blocks, tools, faq, afterFaq, cta };
}
