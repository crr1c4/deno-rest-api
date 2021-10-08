import type { RouterContext } from 'https://deno.land/x/oak@v9.0.1/mod.ts';
import { Bson } from 'https://deno.land/x/mongo@v0.27.0/mod.ts';
import { notesCollection } from '../collections.ts';
import type { RequestBody } from '../collections.ts';

export const editNote = async (ctx: RouterContext) => {
  const { title, description }: RequestBody = await ctx.request.body().value;
  const { id } = ctx.params;

  try {
    const { modifiedCount } = await notesCollection.updateOne(
      { _id: new Bson.ObjectId(id) },
      {
        $set: {
          title,
          description,
        },
      }
    );

    if (!modifiedCount) {
      ctx.response.status = 404;
      ctx.response.body = { message: 'Note doesn´t exist' };
    }

    ctx.response.status = 201;
    ctx.response.body = {
      message: 'Updated note!',
    };
  } catch (err) {
    ctx.response.status = 500;
    ctx.response.body = { message: 'Unknown error' };
    console.error(err);
  } finally {
    const note = await notesCollection.findOne({ _id: new Bson.ObjectId(id) });
    ctx.response.body = {
      message: 'Note updated!',
      note,
    };
  }
};
