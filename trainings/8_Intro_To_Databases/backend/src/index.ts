import Koa from "koa";
import Router from "@koa/router";
import BodyParser from "koa-bodyparser";
import Cors from "@koa/cors";

import * as db from "./db";

const router: Router = new Router();

const app: Koa = new Koa();
app.use(Cors({ origin: "*" }));

interface ITodo {
  id: string;
  name: string;
  description?: string;
}

router.get("/", async (ctx: Koa.ParameterizedContext) => {
  ctx.body = "Hello, World!";
  ctx.status = 200;
});

router.get("/todos/", async (ctx: Koa.ParameterizedContext) => {
  const { rows } = await db.query(`SELECT * FROM "todos";`);

  ctx.body = rows;
  ctx.status = 200;
});

router.post("/todos/", async (ctx: Koa.ParameterizedContext) => {
  const {
    name,
    description
  }: { name: string; description?: string } = ctx.request.body;

  if (!name) {
    ctx.throw(400, "Invalid todo provided.");
    return;
  }

  const { rows } = await db.query(
    `INSERT INTO "todos" ("name", "description")
                  VALUES ($1, $2)
                  RETURNING *`,
    [name, description]
  );

  ctx.body = rows[0];
  ctx.status = 200;
});

router.get("/todos/:id", async (ctx: Koa.ParameterizedContext) => {
  const { id } = ctx.params;

  const { rows } = await db.query(`SELECT * FROM "todos" WHERE id=$1`, [id]);

  if (rows[0]) {
    ctx.body = rows[0];
    ctx.status = 200;
  } else {
    ctx.body = {};
    ctx.status = 404;
  }
});

router.patch("/todos/:id", async (ctx: Koa.ParameterizedContext) => {
  const { id } = ctx.params;
  const {
    name,
    description
  }: { name?: string; description?: string } = ctx.request.body;

  const result = await db.query(`SELECT * FROM "todos" WHERE id=$1`, [id]);

  const todo: ITodo | undefined = result.rows[0];

  if (!todo) {
    ctx.throw(`Todo (${id}) not found`, 404);
    return;
  }

  const { rows } = await db.query(
    `UPDATE "todos" SET name=$1, description=$2 WHERE id=$3 RETURNING *`,
    [name || todo.name, description || todo.description, id]
  );

  ctx.body = rows[0];
  ctx.status = rows[0] ? 200 : 404;
});

router.delete("/todos/:id", async (ctx: Koa.ParameterizedContext) => {
  const { id } = ctx.params;

  const { rows } = await db.query(
    `DELETE FROM "todos" WHERE id=$1 RETURNING *`,
    [id]
  );

  ctx.body = rows[0];
  ctx.status = rows[0] ? 200 : 404;
});

app.use(BodyParser());
app.use(async (ctx: Koa.ParameterizedContext, next: () => Promise<any>) => {
  const start: number = new Date().getTime();
  await next();
  const delta: number = new Date().getTime() - start;
  console.log(`${ctx.method} ${ctx.url} ${delta}ms`);
});
app.use(router.allowedMethods());
app.use(router.routes());

app.listen(8000, () => {
  console.log("Listening on 8000...");
});
