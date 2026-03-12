import 'reflect-metadata';
import { NextResponse } from 'next/server';
import { getDataSource } from '@/lib/database';
import { User } from '@/entities/User';

export async function GET() {
  try {
    const ds = await getDataSource();
    const userRepo = ds.getRepository(User);
    const users = await userRepo.find({
      order: { createdAt: 'DESC' },
    });
    return NextResponse.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}
