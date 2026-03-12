import 'reflect-metadata';
import { NextResponse } from 'next/server';
import { getDataSource } from '@/lib/database';
import { Activity } from '@/entities/Activity';

export async function GET() {
  try {
    const ds = await getDataSource();
    const activityRepo = ds.getRepository(Activity);
    const activities = await activityRepo.find({
      order: { timestamp: 'DESC' },
      take: 20,
    });
    return NextResponse.json(activities);
  } catch (error) {
    console.error('Error fetching activities:', error);
    return NextResponse.json(
      { error: 'Failed to fetch activities' },
      { status: 500 }
    );
  }
}
