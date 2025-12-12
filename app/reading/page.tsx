import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

interface ReadingEntry {
    url: string;
    title: string;
    author: string | null;
    publishedDate: string | null;
    addedDate: string;
    thoughts?: string;
}

export default function ReadingPage() {
    // Read data at build time
    const dataPath = join(process.cwd(), 'data', 'reading.json');

    let readings: ReadingEntry[] = [];

    try {
        if (existsSync(dataPath)) {
            const fileContent = readFileSync(dataPath, 'utf-8');
            readings = fileContent.trim() ? JSON.parse(fileContent) : [];
        }
    } catch (error) {
        console.error('Error reading reading.json:', error);
        readings = [];
    }

    return (
        <section>
            <h1 className="font-semibold text-2xl mb-8 tracking-tighter">Reading Log</h1>
            <p className="text-neutral-600 dark:text-neutral-400 mb-8">
                Articles, papers, and posts I've read, in reverse chronological order.
            </p>

            <div className="space-y-6">
                {readings.map((entry, index) => (
                    <div key={index} className="flex flex-col">
                        <div className="flex w-full justify-between items-baseline gap-4">
                            <a
                                href={entry.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-medium text-neutral-900 dark:text-neutral-100 hover:underline truncate"
                            >
                                {entry.title}
                            </a>
                            <div className="shrink-0 text-xs text-neutral-500 dark:text-neutral-400 font-mono uppercase">
                                {entry.author && <span>{entry.author}</span>}
                                {entry.author && entry.publishedDate && <span className="mx-2">•</span>}
                                {entry.publishedDate && (
                                    <span>{new Date(entry.publishedDate).toLocaleDateString('en-US', {
                                        month: 'short',
                                        day: 'numeric',
                                        year: 'numeric'
                                    })}</span>
                                )}
                            </div>
                        </div>

                        {entry.thoughts && (
                            <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                                {entry.thoughts}
                            </p>
                        )}

                        <div className="text-xs text-neutral-400 dark:text-neutral-500 mt-1 font-mono">
                            Read on {new Date(entry.addedDate).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                            })}
                        </div>
                    </div>
                ))}

                {readings.length === 0 && (
                    <p className="text-neutral-600 dark:text-neutral-400">Nothing yet. Hmm...</p>
                )}
            </div>
        </section >
    );
}