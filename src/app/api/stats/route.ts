import 'reflect-metadata';
import { NextResponse } from 'next/server';
import { getDataSource } from '@/lib/database';
import { Stats } from '@/entities/Stats';

export async function GET() {
  try {
    const ds = await getDataSource();
    const statsRepo = ds.getRepository(Stats);
    const stats = await statsRepo.find({
      order: { id: 'ASC' },
    });
    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}
