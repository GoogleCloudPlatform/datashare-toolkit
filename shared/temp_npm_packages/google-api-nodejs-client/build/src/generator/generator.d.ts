import { Schema } from 'googleapis-common';
import { ChangeSet } from './download';
export interface GeneratorOptions {
    debug?: boolean;
    includePrivate?: boolean;
}
export declare class Generator {
    private env;
    private options;
    private state;
    /**
     * Generator for generating API endpoints
     * @param options Options for generation
     */
    constructor(options?: GeneratorOptions);
    /**
     * Log output of generator. Works just like console.log.
     */
    private log;
    /**
     * Write to the state log, which is used for debugging.
     * @param id DiscoveryRestUrl of the endpoint to log
     * @param message
     */
    private logResult;
    /**
     * Generate all APIs and write to files.
     */
    generateAllAPIs(discoveryUrl: string, useCache: boolean): Promise<ChangeSet[]>;
    generateIndex(metadata: Schema[]): Promise<void>;
    /**
     * Generate API file given discovery URL
     * @param apiDiscoveryUri URL or filename of discovery doc for API
     */
    generateAPI(apiDiscoveryUrl: string): Promise<void>;
    private generate;
    /**
     * Render a nunjucks template, format it, and write to disk
     */
    private render;
}
