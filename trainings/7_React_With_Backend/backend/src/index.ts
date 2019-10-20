import Koa from "koa";
import Router from "@koa/router";
import BodyParser from "koa-bodyparser";
import Cors from "@koa/cors";

const uuidv4 = require("uuid/v4");

const router: Router = new Router();

const app: Koa = new Koa();
app.use(Cors({ origin: "*" }));

interface ITodo {
  id: string;
  name: string;
  description?: string;
}

let todoList: ITodo[] = [
  { id: "1", name: "Go to Grocery Store" },
  {
    id: "2",
    name: "Implement sick feature on mstacm.org",
    description: "You know"
  }
];

router.get("/", async (ctx: Koa.ParameterizedContext) => {
  ctx.body = "Hello, World!";
  ctx.status = 200;
});

router.get("/todos/", async (ctx: Koa.ParameterizedContext) => {
  ctx.body = todoList;
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

  const todo: ITodo = { id: uuidv4(), name, description };
  todoList.push(todo);
  ctx.body = todo;
  ctx.status = 200;
});

router.get("/todos/:id", async (ctx: Koa.ParameterizedContext) => {
  const { id } = ctx.params;

  const todo: ITodo | undefined = todoList.find((value: ITodo) => {
    return value.id === id;
  });

  if (todo) {
    ctx.body = todo;
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

  let todo: ITodo | undefined;

  todoList = todoList.map((obj: ITodo) => {
    if (obj.id === id) {
      todo = {
        id: obj.id,
        name: name || obj.name,
        description: description || obj.description
      };

      return todo;
    }
    return obj;
  });

  ctx.body = todo;
  ctx.status = todo ? 200 : 404;
});

router.delete("/todos/:id", async (ctx: Koa.ParameterizedContext) => {
  const { id } = ctx.params;

  const todo: ITodo | undefined = todoList.find((value: ITodo) => {
    return value.id === id;
  });

  todoList = todoList.filter((obj: ITodo) => {
    return obj.id !== id;
  });

  ctx.body = todo;
  ctx.status = todo ? 200 : 404;
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
