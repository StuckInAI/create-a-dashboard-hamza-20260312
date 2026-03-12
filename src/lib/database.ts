import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from '@/entities/User';
import { Activity } from '@/entities/Activity';
import { Stats } from '@/entities/Stats';
import path from 'path';

const DB_PATH = process.env.DATABASE_PATH
  ? path.resolve(process.env.DATABASE_PATH)
  : path.resolve('./dashboard.sqlite');

let dataSource: DataSource | null = null;

export async function getDataSource(): Promise<DataSource> {
  if (dataSource && dataSource.isInitialized) {
    return dataSource;
  }

  dataSource = new DataSource({
    type: 'better-sqlite3',
    database: DB_PATH,
    synchronize: true,
    logging: false,
    entities: [User, Activity, Stats],
  });

  await dataSource.initialize();

  // Seed if empty
  const statsRepo = dataSource.getRepository(Stats);
  const count = await statsRepo.count();
  if (count === 0) {
    await seedDatabase(dataSource);
  }

  return dataSource;
}

async function seedDatabase(ds: DataSource): Promise<void> {
  const userRepo = ds.getRepository(User);
  const activityRepo = ds.getRepository(Activity);
  const statsRepo = ds.getRepository(Stats);

  const users = [
    { name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin' },
    { name: 'Bob Smith', email: 'bob@example.com', role: 'User' },
    { name: 'Carol White', email: 'carol@example.com', role: 'Manager' },
    { name: 'David Brown', email: 'david@example.com', role: 'User' },
    { name: 'Eva Martinez', email: 'eva@example.com', role: 'User' },
    { name: 'Frank Lee', email: 'frank@example.com', role: 'Analyst' },
    { name: 'Grace Kim', email: 'grace@example.com', role: 'User' },
    { name: 'Henry Wilson', email: 'henry@example.com', role: 'Manager' },
    { name: 'Iris Chen', email: 'iris@example.com', role: 'User' },
    { name: 'Jack Taylor', email: 'jack@example.com', role: 'User' },
    { name: 'Karen Davis', email: 'karen@example.com', role: 'Analyst' },
    { name: 'Leo Garcia', email: 'leo@example.com', role: 'User' },
  ];

  const savedUsers = await userRepo.save(users);

  const activityTypes = ['order', 'signup', 'payment'] as const;
  const activityTemplates = [
    { type: 'order' as const, templates: ['New order #%d placed', 'Order #%d confirmed', 'Order #%d shipped'] },
    { type: 'signup' as const, templates: ['%s signed up', 'New user %s registered', '%s joined the platform'] },
    { type: 'payment' as const, templates: ['Payment of $%d received', 'Invoice #%d paid', 'Subscription renewed for %s'] },
  ];

  const activities = [];
  for (let i = 0; i < 30; i++) {
    const typeData = activityTemplates[i % 3];
    const user = savedUsers[i % savedUsers.length];
    let description = '';
    const template = typeData.templates[i % typeData.templates.length];
    if (typeData.type === 'order') {
      description = template.replace('%d', String(1000 + i));
    } else if (typeData.type === 'signup') {
      description = template.replace('%s', user.name);
    } else {
      description = template.replace('%d', String(100 + i * 25)).replace('%s', user.name);
    }

    const daysAgo = Math.floor(i / 3);
    const hoursAgo = (i % 3) * 8;
    const ts = new Date();
    ts.setDate(ts.getDate() - daysAgo);
    ts.setHours(ts.getHours() - hoursAgo);

    activities.push({
      description,
      type: typeData.type,
      userId: user.id,
      timestamp: ts,
    });
  }

  await activityRepo.save(activities);

  const stats = [
    { label: 'Total Users', value: savedUsers.length, change: 12.5 },
    { label: 'Revenue', value: 48250, change: 8.2 },
    { label: 'Orders', value: 1284, change: -3.1 },
    { label: 'Active Sessions', value: 573, change: 5.7 },
  ];

  await statsRepo.save(stats);
}
