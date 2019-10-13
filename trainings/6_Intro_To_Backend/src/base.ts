import Koa from 'koa';

const app: Koa = new Koa();

app.use(async (ctx: Koa.ParameterizedContext, next: () => Promise<any>) => {
  const start: number = new Date().getTime();
  await next();
  const delta: number = new Date().getTime() - start;
  console.log(`${ctx.method} ${ctx.url} ${delta}ms`);
});

app.use(async (ctx: Koa.ParameterizedContext) => {
  ctx.body = 'Hello, World!';
  ctx.status = 200;
});

app.listen(3000, () => {
  console.log('Listening on 3000...');
});
