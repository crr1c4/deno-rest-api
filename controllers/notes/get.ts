import type { RouterContext } from 'https://deno.land/x/oak@v9.0.1/mod.ts';
import { Bson } from 'https://deno.land/x/mongo@v0.27.0/mod.ts';
import { notesCollection, usersCollection } from '../collections.ts';

export const getNotes = async (ctx: RouterContext) => {
  const { username } = ctx.params;
  const user = await usersCollection.findOne({
    username,
  });

  if (!user) {
    ctx.response.status = 404;
    ctx.response.body = {
      message: 'User doesn´t exist',
    };
    return;
  }
  
  ctx.response.body = 200;
  ctx.response.body = await notesCollection.find({
    author: new Bson.ObjectId(user._id)
  }).toArray();
};
