import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

interface ReadingEntry {
    url: string;
    title: string;
    author: string | null;
    publishedDate: string | null;
    addedDate: string;
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
                    <div key={index} className="border-l-2 border-neutral-200 dark:border-neutral-800 pl-4">
                        <a
                            href={entry.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium text-lg hover:underline"
                        >
                            {entry.title}
                        </a>
                        <div className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                            {entry.author && <span>{entry.author}</span>}
                            {entry.author && entry.publishedDate && <span className="mx-2">•</span>}
                            {entry.publishedDate && (
                                <span>{new Date(entry.publishedDate).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}</span>
                            )}
                        </div>
                        <div className="text-xs text-neutral-500 dark:text-neutral-500 mt-1">
                            Added {new Date(entry.addedDate).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                            })}
                        </div>
                    </div>
                ))}

                {readings.length === 0 && (
                    <p className="text-neutral-600 dark:text-neutral-400">No reading entries yet.</p>
                )}
            </div>
        </section >
    );
}