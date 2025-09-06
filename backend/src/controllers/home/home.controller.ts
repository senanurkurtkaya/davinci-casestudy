import { Controller, Get } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

type User = { id: number; name: string; username: string; email: string };
type Post = { userId: number; id: number; title: string; description: string };

function readJson<T = any>(p: string): T {
  const raw = fs.readFileSync(p, 'utf-8');
  return JSON.parse(raw);
}

@Controller()
export class HomeController {
  @Get()
  getHome() {
    const dataDir = path.resolve(process.cwd(), 'src', 'data');

    const postsPath = path.join(dataDir, 'posts.json');
    const usersPath = path.join(dataDir, 'users.json');

    const posts: Post[] = readJson<Post[]>(postsPath);
    const users: User[] = readJson<User[]>(usersPath);

    const usersCount = Array.isArray(users) ? users.length : 0;
    const postsCount = Array.isArray(posts) ? posts.length : 0;

    // posts per user
    const countsMap = new Map<number, number>();
    for (const p of posts) countsMap.set(p.userId, (countsMap.get(p.userId) || 0) + 1);

    const postsPerUser = [...countsMap.entries()]
      .map(([userId, count]) => {
        const u = users.find(x => x.id === userId);
        return { userId, username: u?.username ?? `user-${userId}`, name: u?.name ?? '', count };
      })
      .sort((a, b) => b.count - a.count);

    const topAuthor = postsPerUser[0] ?? null;

    const sampleUser = users[0] ?? null;
    const samplePost = posts[0] ?? null;

    // küçük bir ilişki örneği: ilk kullanıcının ilk postu
    const firstUsersPost = sampleUser
      ? posts.find(p => p.userId === sampleUser.id) ?? null
      : null;

    return {
      app: 'Case Study API',
      message: 'Fake data ile çalışan NestJS backend 🚀',
      stats: {
        usersCount,
        postsCount,
        topAuthor,       // { userId, username, name, count }
      },
      samples: {
        sampleUser,      // ilk kullanıcı
        samplePost,      // ilk post
        firstUsersPost,  // sampleUser’a ait ilk post
      },
      endpoints: [
        { method: 'GET', path: '/' },
        { method: 'GET', path: '/users' },
        { method: 'GET', path: '/users/:id' },
        { method: 'POST', path: '/users' },
        { method: 'GET', path: '/posts' },
        { method: 'GET', path: '/posts/:id' },
        { method: 'POST', path: '/posts' },
      ],
      paginationExamples: {
        postsPage1: '/posts?page=1&limit=10',
        postsPage2: '/posts?page=2&limit=10',
      },
      usefulLinks: {
        docs: '/docs',
        health: '/health',
      },
    };
  }
}
