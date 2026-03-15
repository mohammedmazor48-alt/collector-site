import fs from 'fs';
import path from 'path';
import type { DocIndex, Stats, DocDetail } from './types';

const DATA_DIR = path.join(process.cwd(), 'data');

export async function getIndexData(): Promise<DocIndex[]> {
  try {
    const filePath = path.join(DATA_DIR, 'index.json');
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error('Failed to load index.json:', error);
    return [];
  }
}

export async function getStatsData(): Promise<Stats | null> {
  try {
    const filePath = path.join(DATA_DIR, 'stats.json');
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error('Failed to load stats.json:', error);
    return null;
  }
}

export async function getDocById(id: string): Promise<DocDetail | null> {
  try {
    const filePath = path.join(DATA_DIR, 'docs', `${id}.json`);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error(`Failed to load doc ${id}:`, error);
    return null;
  }
}

export async function getAllDocIds(): Promise<string[]> {
  try {
    const docsDir = path.join(DATA_DIR, 'docs');
    const files = fs.readdirSync(docsDir);
    return files
      .filter((file) => file.endsWith('.json'))
      .map((file) => file.replace('.json', ''));
  } catch (error) {
    console.error('Failed to list doc IDs:', error);
    return [];
  }
}
